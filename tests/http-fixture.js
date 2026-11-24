import assert from 'node:assert/strict';
import { once } from 'node:events';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { request as httpRequest } from 'node:http';
import { join, resolve } from 'node:path';
import { Duplex } from 'node:stream';
import { createNaviServer } from '../server/app.js';

class MemorySocket extends Duplex {
  remoteAddress = '127.0.0.1';
  localPort = 49152;

  _read() {}
  _write(chunk, encoding, done) { this.peer.push(Buffer.from(chunk)); done(); }
  _final(done) { this.peer.push(null); done(); }
  _destroy(error, done) {
    if (!this.peer.destroyed) this.peer.push(null);
    done(error);
  }
  setTimeout() { return this; }
  setNoDelay() { return this; }
  setKeepAlive() { return this; }
}

let reportedMemoryTransport = false;

/** Exercise the real Node HTTP parser with paired streams if the sandbox forbids listen(). */
export async function serve(t, server) {
  let memory = false;
  const sockets = new Set();
  try {
    const listening = once(server, 'listening');
    server.listen(0, '127.0.0.1');
    await listening;
  } catch (error) {
    if (error.code !== 'EPERM' && error.code !== 'EACCES') throw error;
    memory = true;
    if (!reportedMemoryTransport) {
      t.diagnostic(`${error.message}\nExercising Node HTTP over in-memory streams.`);
      reportedMemoryTransport = true;
    }
  }
  const port = server.address()?.port ?? 49152;
  const origin = `http://127.0.0.1:${port}`;

  function connect() {
    const client = new MemorySocket();
    const peer = new MemorySocket();
    client.peer = peer;
    peer.peer = client;
    for (const socket of [client, peer]) {
      sockets.add(socket);
      socket.once('close', () => sockets.delete(socket));
    }
    server.emit('connection', peer);
    return client;
  }

  t.after(async () => {
    if (memory) {
      for (const socket of sockets) socket.destroy();
    } else {
      server.closeAllConnections();
      await new Promise((done, reject) => server.close(error => error ? reject(error) : done()));
    }
  });

  function request(path, { method = 'GET', headers = {}, body, chunks, signal } = {}) {
    return new Promise((done, reject) => {
      const outgoing = httpRequest({
        hostname: '127.0.0.1', port, path, method, signal,
        headers: { Connection: 'close', ...headers },
        ...(memory ? { createConnection: connect } : { agent: false }),
      }, incoming => {
        const parts = [];
        incoming.on('data', part => parts.push(part));
        incoming.on('error', reject);
        incoming.on('end', () => {
          const status = incoming.statusCode;
          const headers = new Headers();
          for (let i = 0; i < incoming.rawHeaders.length; i += 2) {
            headers.append(incoming.rawHeaders[i], incoming.rawHeaders[i + 1]);
          }
          const data = method === 'HEAD' || [204, 304].includes(status) ? null : Buffer.concat(parts);
          done(new Response(data, { status, headers }));
        });
      });
      outgoing.on('error', reject);
      for (const chunk of chunks ?? []) outgoing.write(chunk);
      outgoing.end(body);
    });
  }

  const localFetch = async (input, options) => {
    const url = new URL(input);
    assert.equal(url.origin, origin);
    const headers = Object.fromEntries(new Headers(options.headers));
    const body = options.body?.toString();
    if (options.body instanceof URLSearchParams) headers['content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    const response = await request(url.pathname + url.search, { ...options, headers, body });
    if (options.redirect === 'error' && response.status >= 300 && response.status < 400) throw new TypeError('Redirect refused');
    return response;
  };
  return { origin, request, fetch: memory ? localFetch : fetch, memory };
}

export const authEnv = {
  NODE_ENV: 'test',
  AUTH_USERNAME: 'owner',
  AUTH_PASSWORD: 'fixture-password',
  AUTH_SECRET: 'fixture-auth-secret-with-more-than-32-characters',
  BLOG_NAVIGATION_TOKEN: 'fixture-navigation-token-with-more-than-32-characters',
};

export function seedNavigation(database) {
  database.exec(`
    INSERT INTO groups (id, name, order_num, is_public) VALUES
      (1, 'Public group', 2, 1), (2, 'Private group', 1, 0), (3, 'Empty group', 3, 1);
    INSERT INTO sites (id, group_id, name, url, description, notes, order_num, is_public) VALUES
      (10, 1, 'Public site', 'https://public.example/', 'Public description', 'Owner note', 2, 1),
      (11, 1, 'Private site', 'https://private.example/', NULL, 'Private note', 1, 0),
      (20, 2, 'Private group site', 'https://private-group.example/', NULL, 'Group note', 1, 1);
    INSERT INTO owner_favorites (site_id) VALUES (11);
  `);
}

export function responseCookie(response, name) {
  return response.headers.getSetCookie().find(value => value.startsWith(`${name}=`))?.split(';', 1)[0];
}

export async function navi(t, { env = {}, databasePath, ...options } = {}) {
  await mkdir('.tmp', { recursive: true, mode: 0o700 });
  const directory = await mkdtemp(resolve('.tmp/navi-test-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const assets = join(directory, 'frontend');
  await mkdir(assets);
  await writeFile(join(assets, 'index.html'), '<!doctype html><title>Navi test</title>');
  const settings = { ...authEnv, ...env };
  const filename = databasePath ?? join(directory, 'navi.sqlite');
  const { server, database } = createNaviServer({
    databasePath: filename, assetDirectory: assets, env: settings, ...options,
  });
  const transport = await serve(t, server);
  t.after(() => database.close());
  let session;

  async function api(path, { method = 'GET', body, headers = {}, authenticated = false, chunks } = {}) {
    const isWrite = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);
    const requestHeaders = {
      ...(isWrite ? { Origin: settings.PUBLIC_ORIGIN || 'http://localhost:5173' } : {}),
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(authenticated ? { Cookie: session } : {}),
      ...headers,
    };
    for (const key of Object.keys(requestHeaders)) {
      if (requestHeaders[key] === undefined) delete requestHeaders[key];
    }
    const response = await transport.request(path, {
      method, headers: requestHeaders, body: body === undefined ? undefined : JSON.stringify(body), chunks,
    });
    const data = response.headers.get('content-type')?.includes('application/json') && method !== 'HEAD'
      ? await response.json() : await response.text();
    return { response, data };
  }

  async function login(remember = false, headers = {}) {
    const result = await api('/api/v1/auth/login', {
      method: 'POST', body: { username: settings.AUTH_USERNAME, password: settings.AUTH_PASSWORD, remember }, headers,
    });
    assert.equal(result.response.status, 200);
    session = responseCookie(result.response, 'navi_session');
    assert.ok(session, 'Password login returned a session cookie.');
    return { ...result, session };
  }

  const reopen = overrides => navi(t, { ...options, databasePath: filename, env: { ...settings, ...overrides } });
  return { ...transport, api, login, reopen, database, directory, assets };
}
