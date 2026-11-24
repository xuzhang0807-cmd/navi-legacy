import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { setTimeout } from 'node:timers/promises';
import { authEnv, navi, responseCookie, seedNavigation, serve } from './http-fixture.js';

const publicIssuer = 'https://blog.example';
const clientId = 'fixture-navi-client';
const clientSecret = 'fixture-client-secret';
const startPath = '/api/v1/auth/blog/start';
const callbackPath = '/api/v1/auth/blog/callback';
const sessionPath = '/api/v1/session';
const navigationPath = '/api/v1/navigation';
const code = 'fixture-authorization-code';

function respond(response, status, data) {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(data));
}

async function fakeBlog(t) {
  const state = {
    scope: ['navi:manage'], name: 'Blog Owner', subject: 'blog-owner-id',
    tokenCalls: 0, refreshCalls: 0, identityCalls: 0, revokeCalls: 0, badRequests: 0, replays: 0,
  };
  let sequence = 0;
  let access;
  let refresh;
  const server = createServer(async (request, response) => {
    try {
      if (request.url === '/api/identity/me' && request.method === 'GET') {
        state.identityCalls++;
        if (!access || request.headers.authorization !== `Bearer ${access}`) return respond(response, 401, {});
        return respond(response, state.identityStatus || 200, { sub: state.subject, name: state.name, scopes: state.scope });
      }
      if (request.method !== 'POST' || !['/oauth/token', '/oauth/revoke'].includes(request.url)) {
        state.badRequests++;
        return respond(response, 404, {});
      }
      const parts = [];
      for await (const chunk of request) parts.push(chunk);
      const form = new URLSearchParams(Buffer.concat(parts).toString('utf8'));
      if (request.headers.authorization || !request.headers['content-type']?.startsWith('application/x-www-form-urlencoded')
        || form.get('client_id') !== clientId || form.get('client_secret') !== clientSecret) {
        state.badRequests++;
        return respond(response, 401, { error: 'invalid_client' });
      }
      if (request.url === '/oauth/revoke') {
        state.revokeCalls++;
        state.revokedCurrent = form.get('token') === refresh && form.get('token_type_hint') === 'refresh_token';
        return respond(response, state.revokeStatus || 200, {});
      }
      state.tokenCalls++;
      const grant = form.get('grant_type');
      if (grant === 'refresh_token') state.refreshCalls++;
      if (state.disconnect) return request.socket.destroy();
      if (state.tokenStatus) return respond(response, state.tokenStatus, { error: state.tokenError });
      if (form.get('resource') !== `${publicIssuer}/api/identity`) {
        state.badRequests++;
        return respond(response, 400, { error: 'invalid_target' });
      }
      if (grant === 'authorization_code') {
        const verifier = form.get('code_verifier') || '';
        const challenge = createHash('sha256').update(verifier).digest('base64url');
        if (!/^[A-Za-z0-9_-]{43}$/.test(verifier) || challenge !== state.challenge
          || form.get('code') !== code || form.get('redirect_uri') !== state.redirectUri) {
          state.badRequests++;
          return respond(response, 400, { error: 'invalid_grant' });
        }
      } else if (grant === 'refresh_token') {
        if (form.get('refresh_token') !== refresh) {
          state.replays++;
          return respond(response, 400, { error: 'invalid_grant' });
        }
      } else {
        state.badRequests++;
        return respond(response, 400, { error: 'unsupported_grant_type' });
      }
      sequence++;
      const issued = { access_token: `access-fixture-${sequence}`, refresh_token: `refresh-fixture-${sequence}` };
      access = issued.access_token;
      refresh = issued.refresh_token;
      state.latestRefresh = () => refresh;
      if (grant === 'refresh_token' && state.delayRefresh) await state.delayRefresh();
      return respond(response, 200, { ...issued, token_type: 'Bearer', scope: 'navi:manage', expires_in: 900 });
    } catch {
      return respond(response, 500, {});
    }
  });
  return { ...await serve(t, server), state };
}

async function scenario(t, overrides = {}) {
  let now = 1_000_000;
  const provider = await fakeBlog(t);
  const env = {
    BLOG_OAUTH_ISSUER: publicIssuer,
    BLOG_OAUTH_INTERNAL_URL: provider.origin,
    BLOG_OAUTH_CLIENT_ID: clientId,
    BLOG_OAUTH_CLIENT_SECRET: clientSecret,
    ...overrides,
  };
  const app = await navi(t, { env, now: () => now, fetch: provider.fetch });
  provider.state.redirectUri = `${env.PUBLIC_ORIGIN || 'http://localhost:5173'}${callbackPath}`;
  seedNavigation(app.database);

  async function start(returnTo = '/folder?q=导航#part') {
    const { response } = await app.api(`${startPath}?returnTo=${encodeURIComponent(returnTo)}`, {
      headers: { Host: 'malicious.example:9000', 'X-Forwarded-Proto': 'http', 'X-Forwarded-Host': 'malicious.example' },
    });
    assert.equal(response.status, 302);
    assert.equal(response.headers.get('cache-control'), 'private, no-store');
    assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
    const url = new URL(response.headers.get('location'));
    assert.equal(url.origin + url.pathname, `${publicIssuer}/oauth/authorize`);
    const query = url.searchParams;
    assert.equal(query.get('response_type'), 'code');
    assert.equal(query.get('client_id'), clientId);
    assert.equal(query.get('redirect_uri'), provider.state.redirectUri);
    assert.equal(query.get('scope'), 'navi:manage');
    assert.equal(query.get('resource'), `${publicIssuer}/api/identity`);
    assert.equal(query.get('code_challenge_method'), 'S256');
    assert.ok(/^[A-Za-z0-9_-]{43}$/.test(query.get('code_challenge')));
    assert.ok(/^[A-Za-z0-9_-]{43}$/.test(query.get('state')));
    assert.equal(query.has('client_secret'), false);
    provider.state.challenge = query.get('code_challenge');
    const header = response.headers.get('set-cookie');
    assert.ok(header.includes('HttpOnly') && header.includes('SameSite=Lax') && header.includes('Max-Age=600'));
    assert.equal(header.includes('; Secure'), overrides.NODE_ENV === 'production');
    return { state: query.get('state'), cookie: responseCookie(response, 'navi_oauth') };
  }

  async function callback(flow, { state = flow.state, cookie = flow.cookie, error } = {}) {
    const query = new URLSearchParams({ state, ...(error ? { error } : { code }) });
    const { response } = await app.api(`${callbackPath}?${query}`, { headers: { Cookie: cookie } });
    assert.equal(response.status, 302);
    assert.ok(response.headers.getSetCookie().some(value => value.startsWith('navi_oauth=; Max-Age=0')));
    return { response, location: response.headers.get('location'), cookie: responseCookie(response, 'navi_session') };
  }

  async function loginBlog(returnTo) {
    const result = await callback(await start(returnTo));
    assert.ok(result.cookie, 'A valid OAuth callback has a session cookie.');
    return result;
  }

  const get = (path, cookie) => app.api(path, { headers: { Cookie: cookie } });
  return { ...app, provider: provider.state, start, callback, loginBlog, get, advance: ms => { now += ms; } };
}

test('blog OAuth performs PKCE, creates a secure session and shares the owner favorites', async t => {
  const app = await scenario(t, {
    NODE_ENV: 'production', PUBLIC_ORIGIN: 'https://navi.example', AUTH_PASSWORD_LOGIN: 'false', AUTH_PASSWORD: '',
  });
  const session = await app.get(sessionPath);
  assert.deepEqual(session.data.loginMethods, { blog: true, password: false });
  const login = await app.loginBlog();
  assert.equal(login.location, '/folder?q=%E5%AF%BC%E8%88%AA#part');
  assert.ok(login.response.headers.getSetCookie().some(value => value.startsWith('navi_session=') && value.includes('; Secure')));
  assert.equal(app.provider.tokenCalls, 1);
  assert.equal(app.provider.identityCalls, 1);
  assert.equal(app.provider.badRequests, 0);
  const stored = app.database.prepare('SELECT * FROM sessions').get();
  assert.equal(stored.subject, 'blog-owner-id');
  assert.equal(stored.method, 'blog');
  assert.equal(stored.password_fingerprint, null);
  assert.ok(stored.refresh_token !== app.provider.latestRefresh(), 'The database stores ciphertext.');
  assert.ok(!stored.refresh_token.includes(app.provider.latestRefresh()), 'Plaintext refresh credential is absent.');
  assert.deepEqual(stored.refresh_token.split('.').map(part => Buffer.from(part, 'base64url').length).slice(0, 2), [12, 16]);
  assert.equal(stored.expires_at - stored.verified_at, 30 * 24 * 60 * 60 * 1000);
  assert.deepEqual((await app.get(sessionPath, login.cookie)).data.user, { name: 'Blog Owner', method: 'blog' });
  const navigation = await app.get(navigationPath, login.cookie);
  assert.equal(navigation.data.visibility, 'private');
  assert.deepEqual(navigation.data.favorites, [11]);
  const logout = await app.api('/api/v1/auth/logout', { method: 'POST', headers: { Cookie: login.cookie } });
  assert.equal(logout.response.status, 204);
  assert.equal(app.provider.revokeCalls, 1);
  assert.equal(app.provider.revokedCurrent, true);
  assert.equal((await app.get(sessionPath, login.cookie)).data.role, 'guest');
});

test('OAuth callback rejects mismatched, tampered, absent or expired state and handles explicit denial', async t => {
  const app = await scenario(t);
  const flow = await app.start();
  const mismatched = await app.callback(flow, { state: 'A'.repeat(43) });
  assert.equal(mismatched.location, '/?loginError=STATE_MISMATCH');
  const tamperedCookie = flow.cookie + 'a';
  assert.equal((await app.callback(flow, { cookie: tamperedCookie })).location, '/?loginError=STATE_MISMATCH');
  assert.equal((await app.callback(flow, { cookie: '' })).location, '/?loginError=STATE_MISMATCH');
  assert.equal((await app.callback(flow, { error: 'access_denied' })).location, '/?loginError=ACCESS_DENIED');
  app.advance(10 * 60 * 1000);
  assert.equal((await app.callback(flow)).location, '/?loginError=STATE_MISMATCH');
  assert.equal(app.provider.tokenCalls, 0);
  assert.equal(app.database.prepare('SELECT COUNT(*) AS n FROM sessions').get().n, 0);
});

test('OAuth returnTo only redirects to paths on the configured site', async t => {
  const app = await scenario(t);
  for (const target of ['//evil.example', '/\\evil.example', 'https://evil.example', '/foo/..//evil.example', '/%2Fevil.example']) {
    assert.equal((await app.loginBlog(target)).location, '/');
  }
});

test('OAuth requires the navi:manage capability from /api/identity/me', async t => {
  const app = await scenario(t);
  app.provider.scope = ['mcp:read'];
  for (const status of [200, 403]) {
    app.provider.identityStatus = status;
    const result = await app.callback(await app.start());
    assert.equal(result.location, '/?loginError=MISSING_PERMISSION');
    assert.equal(result.cookie, undefined);
  }
  assert.equal(app.database.prepare('SELECT COUNT(*) AS n FROM sessions').get().n, 0);
});

test('OAuth rechecks after five minutes and parallel requests share one refresh', async t => {
  const app = await scenario(t);
  const { cookie } = await app.loginBlog('/');
  app.advance(5 * 60 * 1000 - 1);
  assert.equal((await app.get(sessionPath, cookie)).data.role, 'admin');
  assert.equal(app.provider.refreshCalls, 0);

  app.advance(2);
  app.provider.name = 'New Blog Name';
  app.provider.delayRefresh = () => setTimeout(35);
  const results = await Promise.all(Array.from({ length: 8 }, () => app.get(sessionPath, cookie)));
  assert.ok(results.every(result => result.data.user?.name === 'New Blog Name'));
  assert.equal(app.provider.refreshCalls, 1);
  assert.equal(app.provider.identityCalls, 2);
  assert.equal(app.provider.replays, 0);
  assert.equal(app.provider.badRequests, 0);
  assert.deepEqual((await app.get(navigationPath, cookie)).data.favorites, [11]);
  app.advance(30 * 24 * 60 * 60 * 1000);
  assert.equal((await app.get(sessionPath, cookie)).data.role, 'guest');
  assert.equal(app.provider.refreshCalls, 1);
});

for (const [description, failure] of [
  ['invalid_grant', { tokenStatus: 400, tokenError: 'invalid_grant' }],
  ['token 401', { tokenStatus: 401 }],
  ['identity 401', { identityStatus: 401 }],
  ['identity 403', { identityStatus: 403 }],
]) {
  test(`OAuth ${description} revokes the local session and fails closed`, async t => {
    const app = await scenario(t);
    const { cookie } = await app.loginBlog('/');
    app.advance(5 * 60 * 1000 + 1);
    Object.assign(app.provider, failure);
    const publicNav = await app.get(navigationPath, cookie);
    assert.equal(publicNav.data.visibility, 'public');
    assert.deepEqual(publicNav.data.favorites, []);
    assert.equal((await app.get(sessionPath, cookie)).data.role, 'guest');
    assert.equal(app.database.prepare('SELECT COUNT(*) AS n FROM sessions').get().n, 0);
    const write = await app.api('/api/v1/groups', {
      method: 'POST', body: { name: 'Denied', isPublic: false }, headers: { Cookie: cookie },
    });
    assert.equal(write.response.status, 401);
  });
}

test('an unreachable blog keeps the session while denying private reads and writes', async t => {
  const app = await scenario(t);
  const { cookie } = await app.loginBlog('/');
  app.advance(5 * 60 * 1000 + 1);
  app.provider.disconnect = true;
  const publicNav = await app.get(navigationPath, cookie);
  assert.equal(publicNav.response.status, 200);
  assert.equal(publicNav.data.visibility, 'public');
  assert.ok(publicNav.data.groups.flatMap(group => group.sites).every(site => !Object.hasOwn(site, 'notes')));
  assert.equal((await app.get(sessionPath, cookie)).data.role, 'guest');
  assert.equal(app.database.prepare('SELECT COUNT(*) AS n FROM sessions').get().n, 1);
  const write = await app.api('/api/v1/groups', {
    method: 'POST', body: { name: 'Denied', isPublic: true }, headers: { Cookie: cookie },
  });
  assert.equal(write.response.status, 503);
  assert.equal(write.data.error.code, 'BLOG_UNAVAILABLE');
  const callback = await app.callback(await app.start('/'));
  assert.equal(callback.location, '/?loginError=BLOG_UNAVAILABLE');
  app.provider.disconnect = false;
  assert.equal((await app.get(sessionPath, cookie)).data.role, 'admin');
});

test('a refresh followed by an identity outage preserves the rotated token without reusing it', async t => {
  const app = await scenario(t);
  const { cookie } = await app.loginBlog('/');
  const original = app.database.prepare('SELECT verified_at, refresh_token FROM sessions').get();
  app.advance(5 * 60 * 1000 + 1);
  app.provider.identityStatus = 503;
  assert.equal((await app.get(sessionPath, cookie)).data.role, 'guest');
  const rotated = app.database.prepare('SELECT verified_at, refresh_token FROM sessions').get();
  assert.equal(rotated.verified_at, original.verified_at);
  assert.ok(rotated.refresh_token !== original.refresh_token, 'Rotation persists even if identity fails.');
  app.provider.identityStatus = 200;
  assert.equal((await app.get(sessionPath, cookie)).data.role, 'admin');
  assert.equal(app.provider.refreshCalls, 2);
  assert.equal(app.provider.replays, 0);
  app.provider.revokeStatus = 503;
  const logout = await app.api('/api/v1/auth/logout', { method: 'POST', headers: { Cookie: cookie } });
  assert.equal(logout.response.status, 204);
  assert.equal((await app.get(sessionPath, cookie)).data.role, 'guest');
  assert.equal(app.provider.revokedCurrent, true);
});

test('logout during refresh cannot restore the deleted session', async t => {
  const app = await scenario(t);
  const { cookie } = await app.loginBlog('/');
  app.advance(5 * 60 * 1000 + 1);
  const started = Promise.withResolvers();
  const release = Promise.withResolvers();
  app.provider.delayRefresh = () => { started.resolve(); return release.promise; };
  const recheck = app.get(sessionPath, cookie);
  await started.promise;
  try {
    const logout = await app.api('/api/v1/auth/logout', { method: 'POST', headers: { Cookie: cookie } });
    assert.equal(logout.response.status, 204);
    assert.equal(app.database.prepare('SELECT COUNT(*) AS n FROM sessions').get().n, 0);
  } finally {
    release.resolve();
  }
  assert.equal((await recheck).data.role, 'guest');
  assert.equal(app.provider.revokedCurrent, true);
  assert.equal(app.database.prepare('SELECT COUNT(*) AS n FROM sessions').get().n, 0);
});

test('password and blog sessions see the same owner favorites', async t => {
  const app = await scenario(t);
  const password = await app.login();
  const { cookie } = await app.loginBlog('/');
  const result = await app.api('/api/v1/favorites/10', { method: 'PUT', headers: { Cookie: cookie } });
  assert.equal(result.response.status, 204);
  for (const session of [password.session, cookie]) {
    const view = await app.get(navigationPath, session);
    assert.deepEqual([...view.data.favorites].sort((a, b) => a - b), [10, 11]);
  }
  assert.ok(authEnv.AUTH_USERNAME !== 'Blog Owner');
});

test('blog sessions can refresh after the local username and password change', async t => {
  const app = await scenario(t);
  const { cookie } = await app.loginBlog('/');
  app.advance(5 * 60 * 1000 + 1);
  const { api } = await app.reopen({ AUTH_USERNAME: 'updated-owner', AUTH_PASSWORD: 'updated-fixture-password' });
  const { response, data } = await api(sessionPath, { headers: { Cookie: cookie } });
  assert.equal(response.status, 200);
  assert.deepEqual(data.user, { name: 'Blog Owner', method: 'blog' });
  assert.equal(app.provider.refreshCalls, 1);
});
