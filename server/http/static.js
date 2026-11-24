import { readFile, realpath, stat } from 'node:fs/promises';
import { extname, relative, resolve, sep } from 'node:path';
import { HttpError } from './errors.js';

const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
};

function within(root, target) {
  const path = relative(root, target);
  return path !== '..' && !path.startsWith(`..${sep}`) && !path.startsWith(sep);
}

const notFound = () => new HttpError(404, 'NOT_FOUND', '静态资源不存在');

async function resolveFile(root, candidate) {
  try {
    const filename = await realpath(candidate);
    if (!within(root, filename)) throw new HttpError(403, 'FORBIDDEN_PATH', '禁止访问该路径');
    const info = await stat(filename);
    if (info.isFile()) return filename;
    if (info.isDirectory()) {
      const index = resolve(filename, 'index.html');
      const actual = await realpath(index);
      if (!within(root, actual)) throw new HttpError(403, 'FORBIDDEN_PATH', '禁止访问该路径');
      if ((await stat(actual)).isFile()) return actual;
    }
  } catch (error) {
    if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') throw error;
  }
  return null;
}

export async function serveStatic(pathname, directory) {
  const root = await realpath(directory).catch(error => {
    if (error.code === 'ENOENT') throw notFound();
    throw error;
  });
  const candidate = resolve(root, `.${pathname}`);
  if (!within(root, candidate)) throw new HttpError(403, 'FORBIDDEN_PATH', '禁止访问该路径');
  let file = await resolveFile(root, candidate);
  if (!file && !extname(pathname) && pathname !== '/assets' && !pathname.startsWith('/assets/')) {
    file = await resolveFile(root, resolve(root, 'index.html'));
  }
  if (!file) throw notFound();
  const extension = extname(file);
  const maxAge = relative(root, file).startsWith(`assets${sep}`) ? '31536000, immutable' : '3600';
  return new Response(await readFile(file), {
    headers: {
      'Content-Type': types[extension] || 'application/octet-stream',
      'Cache-Control': extension === '.html' ? 'no-store' : `public, max-age=${maxAge}`,
    },
  });
}
