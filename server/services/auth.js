import { createHmac, hkdfSync } from 'node:crypto';
import { HttpError } from '../http/errors.js';
import { createBlogOAuth, blogFailure } from './blog-oauth.js';
import { equalSecret, opaqueId, sha256 } from './crypto.js';

const regularLifetime = 12 * 60 * 60;
const extendedLifetime = 30 * 24 * 60 * 60;
const recheckInterval = 5 * 60 * 1000;
const loginWindow = 15 * 60 * 1000;
const maxFailures = 5;
const sessionHash = cookie => /^[A-Za-z0-9_-]{43}$/.test(cookie || '') ? sha256(cookie).toString('hex') : null;

export const guestViewer = Object.freeze({ role: 'guest', user: null });
const unavailableViewer = Object.freeze({ ...guestViewer, blogUnavailable: true });
const ownerViewer = (name, method) => ({ role: 'admin', user: { name, method } });

function passwordSessionFingerprint(config) {
  const key = hkdfSync('sha256', config.authSecret, '', 'navi:password-session:v1', 32);
  const credentials = JSON.stringify([config.username, config.password]);
  return createHmac('sha256', key).update(credentials).digest('hex');
}

export function requireOwner(viewer, write) {
  if (viewer.role === 'admin') return;
  if (write && viewer.blogUnavailable) throw new HttpError(503, 'BLOG_UNAVAILABLE', '博客暂时无法验证会话');
  throw new HttpError(401, 'UNAUTHENTICATED', '请先登录');
}

export function createAuthService(config, store, now, request) {
  const blog = createBlogOAuth(config, now, request);
  const loginMethods = { blog: Boolean(blog), password: config.passwordLogin };
  const passwordFingerprint = config.passwordLogin ? passwordSessionFingerprint(config) : null;
  const refreshes = new Map();
  const failures = new Map();
  let nextCleanup = 0;

  function issue(method, name, duration, previousCookie, subject = null, refreshToken = null) {
    const cookie = opaqueId();
    const hash = sessionHash(cookie);
    const time = now();
    store.replace({
      hash, method, name, subject, expiresAt: time + duration * 1000,
      refreshToken: refreshToken === null ? null : blog.encrypt(refreshToken, hash),
      verifiedAt: method === 'blog' ? time : null,
      passwordFingerprint: method === 'password' ? passwordFingerprint : null,
    }, sessionHash(previousCookie), time);
    return { viewer: ownerViewer(name, method), cookie, duration };
  }

  async function recheck(session) {
    const hash = session.id_hash;
    let refreshToken;
    try {
      refreshToken = blog.decrypt(session.refresh_token, hash);
    } catch {
      store.remove(hash);
      return guestViewer;
    }
    try {
      const tokens = await blog.refresh(refreshToken);
      // Save the rotated token before looking up the identity. A transient identity
      // failure must not cause the next request to replay the previous refresh token.
      if (!store.rotate(hash, blog.encrypt(tokens.refresh_token, hash), now())) {
        await blog.revoke(tokens.refresh_token);
        return guestViewer;
      }
      const identity = await blog.identity(tokens.access_token);
      if (identity.subject !== session.subject) {
        store.remove(hash);
        return guestViewer;
      }
      return store.confirm(hash, identity.name, now()) ? ownerViewer(identity.name, 'blog') : guestViewer;
    } catch (error) {
      const failure = blogFailure(error);
      if (!failure) throw error;
      if (failure === 'TOKEN_REJECTED' || failure === 'MISSING_PERMISSION') {
        store.remove(hash);
        return guestViewer;
      }
      return store.find(hash, now()) ? unavailableViewer : guestViewer;
    }
  }

  return {
    describe(viewer) {
      return { authenticated: viewer.role === 'admin', role: viewer.role, user: viewer.user, loginMethods };
    },
    login(body, ip, previousCookie) {
      if (!config.passwordLogin) throw new HttpError(403, 'PASSWORD_LOGIN_DISABLED', '密码登录未启用');
      const time = now();
      if (time >= nextCleanup) {
        for (const [address, record] of failures) if (record.until <= time) failures.delete(address);
        nextCleanup = time + 60 * 1000;
      }
      const last = failures.get(ip);
      const record = last && last.until > time ? last : { count: 0, until: time + loginWindow };
      if (record.count >= maxFailures) {
        throw new HttpError(429, 'LOGIN_RATE_LIMITED', '登录尝试次数过多，请稍后再试',
          { 'Retry-After': String(Math.ceil((record.until - time) / 1000)) });
      }
      const { username, password, remember = false } = body ?? {};
      if (typeof username !== 'string' || !username || typeof password !== 'string' || !password || typeof remember !== 'boolean') {
        throw new HttpError(400, 'INVALID_INPUT', '请提供用户名、密码和有效的保持登录选项');
      }
      const validUsername = equalSecret(username, config.username);
      const validPassword = equalSecret(password, config.password);
      if (!validUsername || !validPassword) {
        record.count++;
        failures.set(ip, record);
        throw new HttpError(401, 'INVALID_CREDENTIALS', '用户名或密码错误');
      }
      failures.delete(ip);
      return issue('password', config.username, remember ? extendedLifetime : regularLifetime, previousCookie);
    },
    async viewer(cookie) {
      const hash = sessionHash(cookie);
      const time = now();
      const session = hash && store.find(hash, time);
      if (!session) return guestViewer;
      if (session.method === 'password') {
        if (passwordFingerprint === null || typeof session.password_fingerprint !== 'string'
          || !equalSecret(session.password_fingerprint, passwordFingerprint)) {
          store.remove(hash);
          return guestViewer;
        }
        return ownerViewer(config.username, 'password');
      }
      if (!blog) return guestViewer;
      if (time - session.verified_at < recheckInterval) return ownerViewer(session.user_name, 'blog');
      let pending = refreshes.get(hash);
      if (!pending) {
        pending = recheck(session).finally(() => refreshes.delete(hash));
        refreshes.set(hash, pending);
      }
      return pending;
    },
    startBlog(returnTo) {
      if (!blog) throw new HttpError(404, 'BLOG_LOGIN_DISABLED', '博客登录未配置');
      return blog.start(returnTo);
    },
    async finishBlog(flow, previousCookie) {
      if (!blog) return { location: '/?loginError=LOGIN_FAILED' };
      let result;
      try {
        result = await blog.callback(flow);
        return {
          ...issue('blog', result.name, extendedLifetime, previousCookie, result.subject, result.refreshToken),
          location: result.returnTo,
        };
      } catch (error) {
        if (result) await blog.revoke(result.refreshToken);
        const failure = blogFailure(error);
        if (!failure) console.error('Navi blog login failed.', error.code || error.name);
        const code = !failure || failure === 'TOKEN_REJECTED' ? 'LOGIN_FAILED' : failure;
        return { location: `/?loginError=${code}` };
      }
    },
    async logout(cookie) {
      const hash = sessionHash(cookie);
      const session = hash && store.remove(hash);
      if (session?.method !== 'blog' || !blog) return;
      try {
        await blog.revoke(blog.decrypt(session.refresh_token, hash));
      } catch {
        // Auth configuration may have changed since the session was created.
      }
    },
  };
}
