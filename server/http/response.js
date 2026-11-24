import { HttpError } from './errors.js';

const noStore = 'private, no-store';

export function json(data, status = 200, headers = {}) {
  return Response.json(data, { status, headers: { 'Cache-Control': noStore, ...headers } });
}

export function noContent() {
  return new Response(null, { status: 204, headers: { 'Cache-Control': noStore } });
}

export function redirect(location) {
  return new Response(null, {
    status: 302, headers: { Location: location, 'Cache-Control': noStore, 'Referrer-Policy': 'no-referrer' },
  });
}

export function setCookie(response, config, name, value, maxAge, path = '/') {
  const secure = config.production ? '; Secure' : '';
  response.headers.append('Set-Cookie', `${name}=${value}; Max-Age=${maxAge}; Path=${path}; HttpOnly; SameSite=Lax${secure}`);
  return response;
}

export function errorResponse(error) {
  if (error instanceof HttpError) {
    return json({ error: { code: error.code, message: error.message } }, error.status, error.headers);
  }
  console.error('Navi request failed.', error.code || error.name);
  return json({ error: { code: 'INTERNAL_ERROR', message: '服务器请求失败' } }, 500);
}

export async function writeResponse(request, outgoing, response, allowedOrigin) {
  outgoing.statusCode = response.status;
  outgoing.setHeader('X-Content-Type-Options', 'nosniff');
  outgoing.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  for (const [name, value] of response.headers) {
    if (name !== 'set-cookie') outgoing.setHeader(name, value);
  }
  const cookies = response.headers.getSetCookie();
  if (cookies.length) outgoing.setHeader('Set-Cookie', cookies);
  if (allowedOrigin) {
    outgoing.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    outgoing.setHeader('Access-Control-Allow-Credentials', 'true');
    outgoing.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    outgoing.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Device-ID');
    outgoing.setHeader('Vary', 'Origin');
  }
  if (request.method === 'HEAD' || response.body === null) outgoing.end();
  else outgoing.end(Buffer.from(await response.arrayBuffer()));
}
