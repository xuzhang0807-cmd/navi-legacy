import { createServer } from 'node:http';
import { createHash, timingSafeEqual } from 'node:crypto';
import { readFile, realpath, stat } from 'node:fs/promises';
import { resolve, relative, extname, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { isIP } from 'node:net';
import worker from '../worker/index.js';
import { createDatabase } from './database.js';

const MAX_BODY_SIZE = 1024 * 1024;
const CONTENT_TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
const httpError = (status, message) => Object.assign(new Error(message), { status });
const json = (body, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'private, no-store' } });
const isWithin = (base, target) => { const path = relative(base, target); return path === '' || (path !== '..' && !path.startsWith(`..${sep}`) && !path.startsWith(sep)); };

const normalizeIp = value => value?.startsWith('::ffff:') ? value.slice(7) : value;
function isTrustedPeer(address, entries) {
  const ip = normalizeIp(address);
  return entries.split(',').some(entry => {
    const [base, prefix] = entry.trim().split('/');
    if (!base) return false;
    if (ip === base && (prefix === undefined || prefix === (isIP(base) === 6 ? '128' : '32'))) return true;
    if (isIP(ip) !== 4 || isIP(base) !== 4 || !/^\d+$/.test(prefix || '')) return false;
    const bits = Number(prefix);
    if (bits < 0 || bits > 32) return false;
    const asInteger = value => value.split('.').reduce((sum, part) => (sum << 8n) + BigInt(part), 0n);
    const shift = BigInt(32 - bits);
    return (asInteger(ip) >> shift) === (asInteger(base) >> shift);
  });
}

/** Only an explicitly trusted proxy may replace the TCP peer's address. */
export function clientAddress(incoming, env) {
  const peer = normalizeIp(incoming.socket.remoteAddress || '') || 'local';
  if (env.TRUST_PROXY === 'true' && isTrustedPeer(peer, env.TRUSTED_PROXY_CIDRS || '127.0.0.1/32,::1/128')) {
    const supplied = incoming.headers['x-real-ip'];
    if (typeof supplied === 'string' && isIP(supplied)) return supplied;
  }
  return peer;
}

function validateEnvironment(env) {
  if (env.NODE_ENV !== 'production') return;
  if (env.AUTH_ENABLED !== 'true' || !env.AUTH_USERNAME || !env.AUTH_PASSWORD || (env.AUTH_SECRET?.length ?? 0) < 32) {
    throw new Error('Production requires AUTH_ENABLED=true, AUTH_USERNAME, AUTH_PASSWORD and AUTH_SECRET (at least 32 characters).');
  }
  const publicUrl = new URL(env.PUBLIC_ORIGIN || 'http://invalid');
  if (publicUrl.protocol !== 'https:' || publicUrl.origin !== env.PUBLIC_ORIGIN) throw new Error('PUBLIC_ORIGIN must be an HTTPS origin, without a trailing slash.');
  if (env.BLOG_NAVIGATION_TOKEN && env.BLOG_NAVIGATION_TOKEN.length < 32) throw new Error('BLOG_NAVIGATION_TOKEN must contain at least 32 characters.');
}

function readBody(request) {
  if (Number(request.headers['content-length'] || 0) > MAX_BODY_SIZE) {
    request.resume();
    return Promise.reject(httpError(413, '请求体过大，最大允许 1MB'));
  }
  return new Promise((accept, reject) => {
    let size = 0;
    const chunks = [];
    const onData = chunk => {
      size += chunk.length;
      if (size > MAX_BODY_SIZE) {
        request.off('data', onData);
        request.resume();
        reject(httpError(413, '请求体过大，最大允许 1MB'));
      } else chunks.push(chunk);
    };
    request.on('data', onData);
    request.on('end', () => accept(Buffer.concat(chunks)));
    request.on('error', reject);
    request.on('aborted', () => reject(httpError(400, '请求已中断')));
  });
}

function integrationNavigation(request, env) {
  const authorization = request.headers.get('Authorization');
  let privateAccess = false;
  if (authorization) {
    const supplied = /^Bearer ([^\s]+)$/.exec(authorization)?.[1] ?? '';
    const configured = env.BLOG_NAVIGATION_TOKEN || '';
    privateAccess = Boolean(configured && supplied) && timingSafeEqual(
      createHash('sha256').update(supplied).digest(),
      createHash('sha256').update(configured).digest(),
    );
    if (!privateAccess) return json({ error: '无效的导航集成凭据' }, 401);
  }
  const groups = env.DB.prepare(`SELECT id, name, order_num, is_public FROM groups ${privateAccess ? '' : 'WHERE is_public = 1'} ORDER BY order_num, id`).all().results;
  const sites = env.DB.prepare(`SELECT id, group_id, name, url, icon, description, order_num, is_public FROM sites ${privateAccess ? '' : 'WHERE is_public = 1'} ORDER BY order_num, id`).all().results;
  const groupMap = new Map(groups.map(group => [group.id, { ...group, sites: [] }]));
  for (const site of sites) groupMap.get(site.group_id)?.sites.push(site);
  return json({ groups: [...groupMap.values()], visibility: privateAccess ? 'private' : 'public' });
}

async function staticResponse(pathname, directory) {
  let decoded;
  try { decoded = decodeURIComponent(pathname); } catch { return json({ error: 'Invalid path' }, 400); }
  if (decoded.includes('\0') || decoded.includes('\\')) return json({ error: 'Invalid path' }, 400);
  const base = resolve(directory);
  let filename = resolve(base, `.${decoded}`);
  if (!isWithin(base, filename)) return json({ error: 'Forbidden' }, 403);
  try {
    const info = await stat(filename);
    if (info.isDirectory()) filename = resolve(filename, 'index.html');
    const actual = await realpath(filename);
    if (!isWithin(await realpath(base), actual)) return json({ error: 'Forbidden' }, 403);
    filename = actual;
  } catch {
    if (extname(decoded)) return json({ error: 'Not found' }, 404);
    filename = resolve(base, 'index.html');
  }
  try {
    const body = await readFile(filename);
    return new Response(body, { headers: {
      'Content-Type': CONTENT_TYPES[extname(filename)] || 'application/octet-stream',
      'Cache-Control': extname(filename) === '.html' ? 'no-store' : (relative(base, filename).startsWith(`assets${sep}`) ? 'public, max-age=31536000, immutable' : 'public, max-age=3600'),
    } });
  } catch { return json({ error: 'Not found; run pnpm build first.' }, 404); }
}

/** The caller owns the returned database and should close it after server.close(). */
export function createNaviServer(options = {}) {
  const env = { AUTH_ENABLED: 'true', AUTH_REQUIRED_FOR_READ: 'false', ...process.env, ...options.env };
  validateEnvironment(env);
  const database = options.database ?? createDatabase(options.databasePath ?? env.DATABASE_PATH ?? '.local-data/navi.sqlite');
  env.DB = database;
  const assets = options.assetDirectory ?? env.ASSETS_DIRECTORY ?? resolve('frontend');
  const additionalOrigins = (env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean);
  if (additionalOrigins.some(origin => new URL(origin).origin !== origin)) throw new Error('ALLOWED_ORIGINS must contain complete origins without trailing slashes.');
  const server = createServer(async (incoming, outgoing) => {
    let response;
    let allowedOrigin;
    try {
      const requestOrigin = env.PUBLIC_ORIGIN || `http://${incoming.headers.host || 'localhost'}`;
      if (!incoming.url?.startsWith('/') || incoming.url.startsWith('//')) throw httpError(400, 'Invalid request target');
      const url = new URL(incoming.url, requestOrigin);
      if (url.origin !== new URL(requestOrigin).origin) throw httpError(400, 'Invalid request origin');
      const origin = incoming.headers.origin;
      const allowedOrigins = new Set([requestOrigin, ...additionalOrigins, ...(env.NODE_ENV !== 'production' ? ['http://localhost:5173', 'http://127.0.0.1:5173'] : [])]);
      allowedOrigin = origin && allowedOrigins.has(origin) ? origin : undefined;
      if (origin && !allowedOrigin) {
        response = json({ error: 'Origin is not allowed' }, 403);
      } else if (url.pathname === '/healthz' && ['GET', 'HEAD'].includes(incoming.method)) {
        database.prepare('SELECT 1').first();
        response = json({ ok: true });
      } else if (url.pathname.startsWith('/api/')) {
        if (incoming.method === 'OPTIONS') {
          response = new Response(null, { status: 204 });
        } else {
          const headers = new Headers();
          for (const [name, value] of Object.entries(incoming.headers)) if (value !== undefined && !['host', 'connection', 'transfer-encoding', 'cf-connecting-ip', 'x-forwarded-for', 'x-forwarded-proto'].includes(name)) headers.set(name, Array.isArray(value) ? value.join(', ') : value);
          // The proxy may supply the public HTTPS origin through PUBLIC_ORIGIN. Never trust a browser's forwarded IP.
          headers.set('CF-Connecting-IP', clientAddress(incoming, env));
          const body = ['GET', 'HEAD'].includes(incoming.method) ? undefined : await readBody(incoming);
          const request = new Request(url, { method: incoming.method, headers, ...(body?.length ? { body } : {}) });
          if (url.pathname === '/api/integrations/blog/navigation') {
            response = incoming.method === 'GET' ? integrationNavigation(request, env) : json({ error: 'Read-only endpoint' }, 405);
          } else {
            response = await worker.fetch(request, env);
          }
        }
      } else if (['GET', 'HEAD'].includes(incoming.method)) {
        response = await staticResponse(url.pathname, assets);
      } else response = json({ error: 'Method not allowed' }, 405);
    } catch (error) {
      response = json({ error: error.status ? error.message : '服务器请求失败' }, error.status || 500);
      if (!error.status) console.error('Navi request failed:', error);
    }
    outgoing.statusCode = response.status;
    for (const [key, value] of response.headers) if (!key.toLowerCase().startsWith('access-control-')) outgoing.setHeader(key, value);
    if (allowedOrigin) {
      outgoing.setHeader('Access-Control-Allow-Origin', allowedOrigin);
      outgoing.setHeader('Access-Control-Allow-Credentials', 'true');
      outgoing.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      outgoing.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Device-ID');
      outgoing.setHeader('Vary', 'Origin');
    }
    if (incoming.url?.startsWith('/api/')) outgoing.setHeader('Cache-Control', 'private, no-store');
    outgoing.setHeader('X-Content-Type-Options', 'nosniff');
    outgoing.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    if (incoming.method === 'HEAD') outgoing.end();
    else outgoing.end(Buffer.from(await response.arrayBuffer()));
  });
  server.requestTimeout = 15000;
  server.headersTimeout = 10000;
  server.maxHeadersCount = 80;
  return { server, database };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const { server, database } = createNaviServer();
  const port = Number(process.env.PORT || 8787);
  const host = process.env.HOST || '127.0.0.1';
  server.listen(port, host, () => console.log(`Navi listening on http://${host}:${port}`));
  for (const signal of ['SIGTERM', 'SIGINT']) process.once(signal, () => server.close(() => { database.close(); process.exit(0); }));
}
