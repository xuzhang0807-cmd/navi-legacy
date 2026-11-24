import { createCipheriv, createDecipheriv, createHmac, hkdfSync, randomBytes } from 'node:crypto';
import { equalSecret, opaqueId, sha256 } from './crypto.js';

export const stateLifetime = 10 * 60;
const scope = 'navi:manage';
const opaqueIdPattern = /^[A-Za-z0-9_-]{43}$/;
const tokenPattern = /^[A-Za-z0-9._~+/-]+={0,2}$/;

class BlogError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

function returnPath(value, origin) {
  if (!value?.startsWith('/') || value.startsWith('//') || /[\\\u0000-\u001f\u007f]/.test(value)) return '/';
  try {
    const url = new URL(value, origin);
    if (url.origin !== origin || /^\/(?:\/|%2f|%5c)/i.test(url.pathname)) return '/';
    const path = url.pathname + url.search + url.hash;
    return path.length <= 1800 ? path : '/';
  } catch {
    return '/';
  }
}

export function createBlogOAuth(config, now, request) {
  const { oauth } = config;
  if (!oauth) return null;
  const binding = JSON.stringify([oauth.issuer, oauth.clientId]);
  const derive = purpose => hkdfSync('sha256', config.authSecret, binding, purpose, 32);
  const stateKey = derive('navi:oauth-state:v1');
  const refreshKey = derive('navi:oauth-refresh:v1');
  const sign = payload => createHmac('sha256', stateKey).update(payload).digest('base64url');

  function stateFrom(cookie, returnedState) {
    if (!cookie || cookie.length > 4096 || !opaqueIdPattern.test(returnedState || '')) return null;
    const [encoded, signature, extra] = cookie.split('.');
    if (extra !== undefined || !signature || !equalSecret(signature, sign(encoded))) return null;
    try {
      const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
      if (!opaqueIdPattern.test(payload.state) || !opaqueIdPattern.test(payload.verifier)
        || !Number.isSafeInteger(payload.expiresAt) || payload.expiresAt <= now()
        || !equalSecret(payload.state, returnedState)) return null;
      return payload;
    } catch {
      return null;
    }
  }

  async function send(path, options) {
    try {
      return await request(oauth.internalOrigin + path, {
        ...options, redirect: 'error', signal: AbortSignal.timeout(5000),
      });
    } catch {
      throw new BlogError('BLOG_UNAVAILABLE');
    }
  }

  function sendForm(path, fields) {
    return send(path, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new URLSearchParams({ client_id: oauth.clientId, client_secret: oauth.clientSecret, ...fields }),
    });
  }

  async function readJson(response, identity = false) {
    if (response.status === 401 || response.status === 403 || response.status >= 500 || response.status === 429) {
      await response.body?.cancel().catch(() => {});
      if (response.status >= 500 || response.status === 429) throw new BlogError('BLOG_UNAVAILABLE');
      if (identity && response.status === 403) throw new BlogError('MISSING_PERMISSION');
      throw new BlogError('TOKEN_REJECTED');
    }
    let data;
    try {
      data = await response.json();
    } catch {
      throw new BlogError('BLOG_UNAVAILABLE');
    }
    if (!response.ok) {
      throw new BlogError(data?.error === 'invalid_grant' ? 'TOKEN_REJECTED' : 'LOGIN_FAILED');
    }
    return data;
  }

  async function tokens(fields) {
    const response = await sendForm('/oauth/token', { ...fields, resource: oauth.resource });
    const data = await readJson(response);
    for (const value of [data?.access_token, data?.refresh_token]) {
      if (typeof value !== 'string' || value.length > 8192 || !tokenPattern.test(value)) {
        throw new BlogError('BLOG_UNAVAILABLE');
      }
    }
    return data;
  }

  async function identity(accessToken) {
    const response = await send('/api/identity/me', {
      headers: { Accept: 'application/json', Authorization: `Bearer ${accessToken}` },
    });
    const data = await readJson(response, true);
    if (!Array.isArray(data?.scopes) || !data.scopes.includes(scope)) throw new BlogError('MISSING_PERMISSION');
    if (typeof data.sub !== 'string' || !data.sub.trim() || typeof data.name !== 'string' || !data.name.trim()) {
      throw new BlogError('BLOG_UNAVAILABLE');
    }
    return { subject: data.sub, name: data.name };
  }

  async function revoke(refreshToken) {
    try {
      const response = await sendForm('/oauth/revoke', { token: refreshToken, token_type_hint: 'refresh_token' });
      await response.body?.cancel();
    } catch {
      // A failed provider revoke never restores the local session.
    }
  }

  return {
    start(returnTo) {
      const state = opaqueId();
      const verifier = opaqueId();
      const encoded = Buffer.from(JSON.stringify({
        state, verifier, returnTo: returnPath(returnTo, config.publicOrigin),
        expiresAt: now() + stateLifetime * 1000,
      })).toString('base64url');
      const query = new URLSearchParams({
        response_type: 'code', client_id: oauth.clientId, redirect_uri: oauth.redirectUri,
        scope, resource: oauth.resource, code_challenge: sha256(verifier).toString('base64url'),
        code_challenge_method: 'S256', state,
      });
      return { location: `${oauth.issuer}/oauth/authorize?${query}`, stateCookie: `${encoded}.${sign(encoded)}` };
    },
    async callback({ cookie, state, code, error }) {
      const flow = stateFrom(cookie, state);
      if (!flow) throw new BlogError('STATE_MISMATCH');
      if (error || !code) throw new BlogError(error === 'access_denied' ? 'ACCESS_DENIED' : 'LOGIN_FAILED');
      const issued = await tokens({
        grant_type: 'authorization_code', code, code_verifier: flow.verifier, redirect_uri: oauth.redirectUri,
      });
      try {
        return {
          ...await identity(issued.access_token),
          refreshToken: issued.refresh_token,
          returnTo: returnPath(flow.returnTo, config.publicOrigin),
        };
      } catch (error) {
        await revoke(issued.refresh_token);
        throw error;
      }
    },
    refresh: refreshToken => tokens({ grant_type: 'refresh_token', refresh_token: refreshToken }),
    identity,
    revoke,
    encrypt(refreshToken, sessionHash) {
      const iv = randomBytes(12);
      const cipher = createCipheriv('aes-256-gcm', refreshKey, iv);
      cipher.setAAD(Buffer.from(sessionHash));
      const encrypted = Buffer.concat([cipher.update(refreshToken, 'utf8'), cipher.final()]);
      return [iv, cipher.getAuthTag(), encrypted].map(part => part.toString('base64url')).join('.');
    },
    decrypt(value, sessionHash) {
      const [iv, tag, encrypted] = value.split('.').map(part => Buffer.from(part, 'base64url'));
      const decipher = createDecipheriv('aes-256-gcm', refreshKey, iv, { authTagLength: 16 });
      decipher.setAAD(Buffer.from(sessionHash));
      decipher.setAuthTag(tag);
      return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
    },
  };
}

export function blogFailure(error) {
  return error instanceof BlogError ? error.code : undefined;
}
