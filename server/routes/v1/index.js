import { HttpError } from '../../http/errors.js';
import { clientAddress, cookie, readJson } from '../../http/request.js';
import { json, noContent, redirect, setCookie } from '../../http/response.js';
import { stateLifetime } from '../../services/blog-oauth.js';
import { requireOwner } from '../../services/auth.js';
import { positiveId } from '../../services/navigation-validation.js';

const sessionCookie = 'navi_session';
const stateCookie = 'navi_oauth';
const callbackPath = '/api/v1/auth/blog/callback';
const writes = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

function queryValue(query, key) {
  const values = query.getAll(key);
  return values.length === 1 ? values[0] : undefined;
}

function pathId(value) {
  return positiveId(/^[1-9]\d*$/.test(value) ? Number(value) : NaN);
}

export function createV1Routes(config, auth, navigation) {
  const session = (response, value, duration) => setCookie(response, config, sessionCookie, value, duration);
  const flow = (response, value, duration) => setCookie(response, config, stateCookie, value, duration, callbackPath);
  const owner = (handle, body = false) => ({ access: 'owner', body, handle });
  const viewer = handle => ({ access: 'viewer', handle });
  const routes = [
    [/^\/session$/, { GET: viewer(({ viewer }) => json(auth.describe(viewer))) }],
    [/^\/auth\/login$/, {
      POST: { body: true, handle({ request, body, currentSession }) {
        const login = auth.login(body, clientAddress(request, config), currentSession);
        return session(json(auth.describe(login.viewer)), login.cookie, login.duration);
      } },
    }],
    [/^\/auth\/logout$/, {
      POST: { async handle({ currentSession }) {
        await auth.logout(currentSession);
        return flow(session(noContent(), '', 0), '', 0);
      } },
    }],
    [/^\/auth\/blog\/start$/, {
      GET: { handle({ query }) {
        const login = auth.startBlog(queryValue(query, 'returnTo'));
        return flow(redirect(login.location), login.stateCookie, stateLifetime);
      } },
    }],
    [/^\/auth\/blog\/callback$/, {
      GET: { async handle({ request, query, currentSession }) {
        const login = await auth.finishBlog({
          cookie: cookie(request, stateCookie),
          state: queryValue(query, 'state'),
          code: queryValue(query, 'code'),
          error: queryValue(query, 'error'),
        }, currentSession);
        const response = flow(redirect(login.location), '', 0);
        return login.cookie ? session(response, login.cookie, login.duration) : response;
      } },
    }],
    [/^\/navigation$/, { GET: viewer(({ viewer }) => json(navigation.navigation(viewer))) }],
    [/^\/groups$/, { POST: owner(({ body }) => json(navigation.createGroup(body), 201), true) }],
    [/^\/groups\/order$/, {
      PUT: owner(({ body }) => {
        navigation.orderGroups(body);
        return noContent();
      }, true),
    }],
    [/^\/groups\/([^/]+)\/sites\/order$/, {
      PUT: owner(({ id, body }) => {
        navigation.orderSites(id, body);
        return noContent();
      }, true),
    }],
    [/^\/groups\/([^/]+)$/, {
      PATCH: owner(({ id, body }) => json(navigation.updateGroup(id, body)), true),
      DELETE: owner(({ id }) => {
        navigation.deleteGroup(id);
        return noContent();
      }),
    }],
    [/^\/sites$/, { POST: owner(({ body }) => json(navigation.createSite(body), 201), true) }],
    [/^\/sites\/([^/]+)$/, {
      PATCH: owner(({ id, body }) => json(navigation.updateSite(id, body)), true),
      DELETE: owner(({ id }) => {
        navigation.deleteSite(id);
        return noContent();
      }),
    }],
    [/^\/favorites\/([^/]+)$/, {
      PUT: owner(({ id }) => {
        navigation.favorite(id);
        return noContent();
      }),
      DELETE: owner(({ id }) => {
        navigation.unfavorite(id);
        return noContent();
      }),
    }],
    [/^\/export$/, { GET: owner(() => json(navigation.export(), 200, {
      'Content-Disposition': 'attachment; filename=navi-backup.json',
    })) }],
    [/^\/import$/, { POST: owner(({ body }) => json(navigation.import(body)), true) }],
  ];

  return async context => {
    const path = context.pathname.slice('/api/v1'.length);
    const { request, sameOrigin } = context;
    const route = routes.find(([pattern]) => pattern.test(path));
    if (!route) throw new HttpError(404, 'NOT_FOUND', '接口不存在');
    const [pattern, methods] = route;
    const selected = methods[request.method];
    if (!Object.hasOwn(methods, request.method)) {
      throw new HttpError(405, 'METHOD_NOT_ALLOWED', '不支持该请求方法', { Allow: Object.keys(methods).join(', ') });
    }
    const write = writes.has(request.method);
    if (write && !sameOrigin) throw new HttpError(403, 'ORIGIN_FORBIDDEN', '请求来源不受信任');
    const body = write ? await readJson(request, selected.body) : undefined;
    const currentSession = cookie(request, sessionCookie);
    if (selected.access) context.viewer = await auth.viewer(currentSession);
    if (selected.access === 'owner') requireOwner(context.viewer, write);
    const segment = pattern.exec(path)[1];
    return selected.handle({ ...context, currentSession, body, id: segment === undefined ? undefined : pathId(segment) });
  };
}
