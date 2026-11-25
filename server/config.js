import { isIP } from 'node:net';

const developmentOrigin = 'http://localhost:5173';
const defaultProxies = '127.0.0.1/32,::1/128';

function booleanSetting(env, key, fallback) {
  const value = env[key];
  if (value === undefined || value === '') return fallback;
  if (value === 'true') return true;
  if (value === 'false') return false;
  throw new Error(`${key} must be true or false.`);
}

function originSetting(value, key, httpsOnly = false) {
  const message = `${key} must be an ${httpsOnly ? 'HTTPS' : 'HTTP or HTTPS'} origin without a trailing slash.`;
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(message);
  }
  if (url.origin !== value || !['http:', 'https:'].includes(url.protocol) || (httpsOnly && url.protocol !== 'https:')) {
    throw new Error(message);
  }
  return url.origin;
}

function proxyEntries(value) {
  return value.split(',').map(entry => {
    const [address, prefix, ...rest] = entry.trim().split('/');
    const version = isIP(address);
    const validPrefix = prefix === undefined || (version === 6
      ? prefix === '128'
      : /^\d+$/.test(prefix) && Number(prefix) <= 32);
    if (!version || rest.length || !validPrefix) {
      throw new Error('TRUSTED_PROXY_CIDRS must contain IP addresses, IPv4 CIDRs or IPv6 /128 entries.');
    }
    return { address, prefix: prefix === undefined ? (version === 6 ? 128 : 32) : Number(prefix) };
  });
}

function oauthSettings(env, production, publicOrigin, authSecret) {
  const issuer = env.BLOG_OAUTH_ISSUER || '';
  const internalUrl = env.BLOG_OAUTH_INTERNAL_URL || '';
  const clientId = env.BLOG_OAUTH_CLIENT_ID || '';
  const clientSecret = env.BLOG_OAUTH_CLIENT_SECRET || '';
  if (![issuer, internalUrl, clientId, clientSecret].some(Boolean)) return null;
  if (![issuer, clientId, clientSecret].every(value => value.trim())) {
    if (!production) return null;
    throw new Error('Blog login requires BLOG_OAUTH_ISSUER, BLOG_OAUTH_CLIENT_ID and BLOG_OAUTH_CLIENT_SECRET.');
  }
  if (authSecret.trim().length < 32) throw new Error('Blog login requires AUTH_SECRET (at least 32 characters).');
  const publicIssuer = originSetting(issuer, 'BLOG_OAUTH_ISSUER', production);
  return {
    issuer: publicIssuer,
    internalOrigin: internalUrl ? originSetting(internalUrl, 'BLOG_OAUTH_INTERNAL_URL') : publicIssuer,
    clientId,
    clientSecret,
    resource: `${publicIssuer}/api/identity`,
    redirectUri: `${publicOrigin}/api/v1/auth/blog/callback`,
  };
}

export function readConfig(env = process.env) {
  const production = env.NODE_ENV === 'production';
  const publicOrigin = originSetting(env.PUBLIC_ORIGIN || (production ? '' : developmentOrigin), 'PUBLIC_ORIGIN', production);
  const authSecret = env.AUTH_SECRET || '';
  const blogNavigationToken = env.BLOG_NAVIGATION_TOKEN || '';
  const username = env.AUTH_USERNAME || '';
  const password = env.AUTH_PASSWORD?.trim() || '';
  const passwordLogin = booleanSetting(env, 'AUTH_PASSWORD_LOGIN', false);
  const trustProxy = booleanSetting(env, 'TRUST_PROXY', false);
  const port = Number(env.PORT || 8787);
  if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('PORT must be an integer from 0 to 65535.');
  if (production && (authSecret.trim().length < 32 || blogNavigationToken.trim().length < 32)) {
    throw new Error('Production requires AUTH_SECRET and BLOG_NAVIGATION_TOKEN (at least 32 characters each).');
  }
  if (passwordLogin && (!username.trim() || !password)) {
    throw new Error('Password login requires AUTH_USERNAME and AUTH_PASSWORD.');
  }
  if (passwordLogin && /^\$2[aby]?\$/.test(password)) {
    throw new Error('AUTH_PASSWORD requires a password. Replace the legacy bcrypt hash or disable password login.');
  }
  const oauth = oauthSettings(env, production, publicOrigin, authSecret);
  if (production && !passwordLogin && !oauth) throw new Error('Production requires at least one login method.');
  if (production && (authSecret === blogNavigationToken || oauth?.clientSecret === blogNavigationToken || oauth?.clientSecret === authSecret)) {
    throw new Error('AUTH_SECRET, BLOG_NAVIGATION_TOKEN and BLOG_OAUTH_CLIENT_SECRET must be distinct.');
  }
  return {
    production,
    publicOrigin,
    additionalOrigins: (env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean)
      .map(value => originSetting(value, 'ALLOWED_ORIGINS')),
    host: env.HOST || '127.0.0.1',
    port,
    databasePath: env.DATABASE_PATH || '.local-data/navi.sqlite',
    assetDirectory: env.ASSETS_DIRECTORY || 'frontend',
    trustProxy,
    trustedProxies: trustProxy ? proxyEntries(env.TRUSTED_PROXY_CIDRS || defaultProxies) : [],
    authSecret,
    username,
    password,
    passwordLogin,
    blogNavigationToken,
    oauth,
  };
}
