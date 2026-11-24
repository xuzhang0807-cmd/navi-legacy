import { createServer } from 'node:http';
import { readConfig } from './config.js';
import { openDatabase } from './db/index.js';
import { createNavigationStore } from './db/navigation.js';
import { createSessionStore } from './db/sessions.js';
import { HttpError } from './http/errors.js';
import { checkOrigin, requestTarget } from './http/request.js';
import { errorResponse, json, noContent, writeResponse } from './http/response.js';
import { serveStatic } from './http/static.js';
import { createBlogNavigationRoute } from './routes/integrations/blog.js';
import { createLegacyRoutes } from './routes/legacy/index.js';
import { createV1Routes } from './routes/v1/index.js';
import { createAuthService, guestViewer } from './services/auth.js';
import { createNavigationService } from './services/navigation.js';

const integrationPath = '/api/integrations/blog/navigation';
const readMethods = new Set(['GET', 'HEAD']);
const apiPath = path => path === '/api' || path.startsWith('/api/');

/** The caller closes the database after shutting down the HTTP server. */
export function createNaviServer(options = {}) {
  const config = readConfig(options.env);
  const database = openDatabase(options.databasePath ?? config.databasePath, { legacyOwner: config.username });
  let navigation, auth, health;
  try {
    const now = options.now ?? Date.now;
    auth = createAuthService(config, createSessionStore(database), now, options.fetch ?? fetch);
    navigation = createNavigationService(createNavigationStore(database), now);
    health = database.prepare('SELECT 1');
  } catch (error) {
    database.close();
    throw error;
  }
  const v1 = createV1Routes(config, auth, navigation);
  const legacy = createLegacyRoutes(auth, navigation);
  const blogNavigation = createBlogNavigationRoute(config, navigation);

  async function dispatch(context) {
    const { request, pathname } = context;
    if (pathname === '/healthz') {
      if (!readMethods.has(request.method)) {
        throw new HttpError(405, 'METHOD_NOT_ALLOWED', '该接口仅支持读取', { Allow: 'GET, HEAD' });
      }
      health.get();
      return json({ ok: true });
    }
    if (apiPath(pathname)) {
      if (request.method === 'OPTIONS') return noContent();
      if (pathname === integrationPath) return blogNavigation(context);
      if (pathname === '/api/v1' || pathname.startsWith('/api/v1/')) return v1(context);
      return legacy(context);
    }
    if (pathname.startsWith('/healthz/')) throw new HttpError(404, 'NOT_FOUND', '接口不存在');
    if (readMethods.has(request.method)) return serveStatic(pathname, options.assetDirectory ?? config.assetDirectory);
    throw new HttpError(405, 'METHOD_NOT_ALLOWED', '不支持该请求方法');
  }

  const server = createServer(async (request, outgoing) => {
    let response, allowedOrigin;
    try {
      const target = requestTarget(request.url, config.publicOrigin);
      const origin = checkOrigin(request, config);
      allowedOrigin = origin.allowedOrigin;
      if (request.headers.origin && !allowedOrigin) {
        if (target.pathname === integrationPath) response = json({ error: 'Origin is not allowed' }, 403);
        else throw new HttpError(403, 'ORIGIN_FORBIDDEN', '请求来源不受信任');
      } else {
        response = await dispatch({ request, ...target, ...origin, viewer: guestViewer });
      }
    } catch (error) {
      response = errorResponse(error);
    }
    request.resume();
    await writeResponse(request, outgoing, response, allowedOrigin);
  });
  server.requestTimeout = 15000;
  server.headersTimeout = 10000;
  server.maxHeadersCount = 80;
  return { server, database, host: config.host, port: config.port };
}
