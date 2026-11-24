import { json } from '../../http/response.js';
import { equalSecret } from '../../services/crypto.js';

export function createBlogNavigationRoute(config, navigation) {
  return context => {
    if (context.request.method !== 'GET') return json({ error: 'Read-only endpoint' }, 405);
    const authorization = context.request.headers.authorization;
    if (authorization) {
      const supplied = /^Bearer ([^\s]+)$/.exec(authorization)?.[1];
      if (!config.blogNavigationToken || !supplied || !equalSecret(supplied, config.blogNavigationToken)) {
        return json({ error: '无效的导航集成凭据' }, 401);
      }
      context.viewer = { role: 'blog-integration' };
    }
    return json(navigation.integration(context.viewer));
  };
}
