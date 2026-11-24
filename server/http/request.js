import { isIP } from 'node:net';
import { HttpError } from './errors.js';

const maxBodySize = 1024 * 1024;
const normalizeIp = ip => ip?.startsWith('::ffff:') ? ip.slice(7) : ip;
const ipv4Number = address => address.split('.').reduce((number, part) => number * 256 + Number(part), 0);

function trustedPeer(peer, { address, prefix }) {
  if (peer === address && (prefix === 32 || prefix === 128)) return true;
  if (isIP(peer) !== 4 || isIP(address) !== 4) return false;
  const subnetSize = 2 ** (32 - prefix);
  return Math.floor(ipv4Number(peer) / subnetSize) === Math.floor(ipv4Number(address) / subnetSize);
}

export function clientAddress(request, config) {
  const peer = normalizeIp(request.socket.remoteAddress) || 'local';
  const supplied = request.headers['x-real-ip'];
  if (config.trustProxy && config.trustedProxies.some(entry => trustedPeer(peer, entry))
    && typeof supplied === 'string' && isIP(supplied)) {
    return normalizeIp(supplied);
  }
  return peer;
}

export function requestTarget(target, publicOrigin) {
  const rawPath = target?.split('?', 1)[0];
  if (!rawPath?.startsWith('/') || rawPath.startsWith('//') || rawPath.includes('\\') || target.includes('#')) {
    throw new HttpError(400, 'INVALID_PATH', '请求路径无效');
  }
  let pathname;
  try {
    pathname = decodeURIComponent(rawPath);
  } catch {
    throw new HttpError(400, 'INVALID_PATH', '请求路径无效');
  }
  if (/[\\\u0000-\u001f\u007f]/.test(pathname)) throw new HttpError(400, 'INVALID_PATH', '请求路径无效');
  if (pathname.startsWith('//') || pathname.split('/').some(part => part === '..' || part === '.')) {
    throw new HttpError(403, 'FORBIDDEN_PATH', '禁止访问该路径');
  }
  return { pathname, query: new URL(target, publicOrigin).searchParams };
}

export function checkOrigin(request, config) {
  const origin = request.headers.origin;
  const port = request.socket.localPort;
  const developmentOrigins = !config.production ? [
    'http://localhost:5173', 'http://127.0.0.1:5173',
    ...(['localhost', '127.0.0.1', '[::1]'].map(host => `http://${host}:${port}`)),
  ] : [];
  const sameOrigin = origin === config.publicOrigin || developmentOrigins.includes(origin);
  const allowed = sameOrigin || config.additionalOrigins.includes(origin);
  return { allowedOrigin: allowed ? origin : undefined, sameOrigin };
}

export function cookie(request, key) {
  const prefix = `${key}=`;
  const matches = (request.headers.cookie || '').split(';').map(part => part.trim())
    .filter(part => part.startsWith(prefix));
  return matches.length === 1 ? matches[0].slice(prefix.length) : undefined;
}

const bodyTooLarge = () => new HttpError(413, 'BODY_TOO_LARGE', '请求体过大，最大允许 1 MiB');

export async function readJson(request, required) {
  if (Number(request.headers['content-length']) > maxBodySize) throw bodyTooLarge();
  const chunks = [];
  let size = 0;
  try {
    for await (const chunk of request.iterator({ destroyOnReturn: false })) {
      size += chunk.length;
      if (size > maxBodySize) throw bodyTooLarge();
      chunks.push(chunk);
    }
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(400, 'INVALID_BODY', '请求体读取失败');
  }
  if (size === 0) {
    if (required) throw new HttpError(400, 'INVALID_JSON', '请求体不能为空');
    return undefined;
  }
  const type = request.headers['content-type']?.split(';', 1)[0].trim().toLowerCase();
  if (type !== 'application/json') throw new HttpError(415, 'UNSUPPORTED_CONTENT_TYPE', '请求体必须使用 application/json');
  try {
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks, size)));
  } catch {
    throw new HttpError(400, 'INVALID_JSON', '请求体不是有效的 JSON');
  }
}
