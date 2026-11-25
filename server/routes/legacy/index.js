import { cookie } from '../../http/request.js';
import { json } from '../../http/response.js';
import { HttpError } from '../../http/errors.js';

export function createLegacyRoutes(auth, navigation) {
  return async context => {
    if (context.pathname !== '/api/groups-with-sites' && context.pathname !== '/api/auth/status') {
      throw new HttpError(404, 'NOT_FOUND', '接口不存在');
    }
    if (context.request.method !== 'GET') {
      throw new HttpError(405, 'METHOD_NOT_ALLOWED', '该接口仅支持读取', { Allow: 'GET' });
    }
    context.viewer = await auth.viewer(cookie(context.request, 'navi_session'));
    if (context.pathname === '/api/auth/status') return json({ authenticated: context.viewer.role !== 'guest' });
    return json(navigation.legacy(context.viewer));
  };
}
