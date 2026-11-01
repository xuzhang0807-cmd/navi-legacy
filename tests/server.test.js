import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, writeFile, rm, symlink } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { request as httpRequest } from 'node:http';
import { createDatabase } from '../server/database.js';
import { createNaviServer, clientAddress } from '../server/index.js';

const token = 'local-blog-integration-token-over-32-characters';
const auth = { AUTH_ENABLED: 'true', AUTH_USERNAME: 'owner', AUTH_PASSWORD: 'local-password', AUTH_SECRET: 'local-test-secret-over-32-characters', BLOG_NAVIGATION_TOKEN: token, NODE_ENV: 'test', PUBLIC_ORIGIN: '' };

async function environment(t, overrides = {}) {
  await mkdir('.tmp', { recursive: true });
  const directory = await mkdtemp(resolve('.tmp/server-'));
  const assets = join(directory, 'frontend');
  await mkdir(assets);
  await writeFile(join(assets, 'index.html'), '<!doctype html><title>Navi test</title>');
  const { server, database } = createNaviServer({ databasePath: join(directory, 'navi.sqlite'), assetDirectory: assets, env: { ...auth, ...overrides } });
  await new Promise(accept => server.listen(0, '127.0.0.1', accept));
  const origin = `http://127.0.0.1:${server.address().port}`;
  t.after(async () => {
    server.closeAllConnections();
    await new Promise(accept => server.close(accept));
    database.close();
    await rm(directory, { recursive: true, force: true });
  });
  let cookie;
  async function api(path, { method = 'GET', body, headers = {}, authenticated = false } = {}) {
    const response = await fetch(`${origin}${path}`, { method, headers: { ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}), ...(authenticated ? { Cookie: cookie } : {}), ...headers }, ...(body !== undefined ? { body: JSON.stringify(body) } : {}) });
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }
    return { response, data };
  }
  async function login() {
    const result = await api('/api/login', { method: 'POST', body: { username: auth.AUTH_USERNAME, password: auth.AUTH_PASSWORD } });
    assert.equal(result.data.success, true);
    cookie = result.response.headers.get('set-cookie').split(';')[0];
    return result.response;
  }
  return { directory, assets, server, database, origin, api, login };
}

test('SQLite D1 adapter persists data and rolls back failed atomic batches', async t => {
  await mkdir('.tmp', { recursive: true });
  const directory = await mkdtemp(resolve('.tmp/database-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const filename = join(directory, 'navi.sqlite');
  let db = createDatabase(filename);
  await db.batch([db.prepare('INSERT INTO groups (name, order_num) VALUES (?, ?)').bind('Kept', 1)]);
  await assert.rejects(db.batch([
    db.prepare('INSERT INTO groups (name, order_num) VALUES (?, ?)').bind('Rolled back', 2),
    db.prepare('INSERT INTO sites (group_id, name, url, order_num) VALUES (999, ?, ?, 1)').bind('Invalid', 'https://example.com'),
  ]));
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM groups').first('n'), 1);
  db.close();
  db = createDatabase(filename);
  assert.equal(db.prepare('SELECT name FROM groups').first('name'), 'Kept');
  db.close();
});

test('blog endpoint filters both privacy levels, strips notes and grants no write authority', async t => {
  const { database, api } = await environment(t);
  database.raw.exec(`INSERT INTO groups (id,name,order_num,is_public) VALUES (1,'Public',1,1),(2,'Private',2,0);
    INSERT INTO sites (group_id,name,url,notes,order_num,is_public) VALUES
      (1,'Public site','https://public.example','secret note',1,1),
      (1,'Private site','https://private.example','another note',2,0),
      (2,'Private group site','https://private-group.example','private note',1,1);`);
  for (const headers of [{}, { 'X-Blog-Authenticated': 'true', 'X-User-ID': 'admin' }]) {
    const { response, data } = await api('/api/integrations/blog/navigation', { headers });
    assert.equal(response.status, 200);
    assert.equal(data.visibility, 'public');
    assert.equal(data.groups.length, 1);
    assert.deepEqual(data.groups[0].sites.map(site => site.name), ['Public site']);
    assert.equal(Object.hasOwn(data.groups[0].sites[0], 'notes'), false);
    assert.match(response.headers.get('cache-control'), /no-store/);
  }
  const headers = { Authorization: `Bearer ${token}` };
  const privateResult = await api('/api/integrations/blog/navigation', { headers });
  assert.equal(privateResult.data.visibility, 'private');
  assert.equal(privateResult.data.groups.length, 2);
  assert.equal(privateResult.data.groups.flatMap(group => group.sites).length, 3);
  assert.equal(privateResult.data.groups.flatMap(group => group.sites).some(site => Object.hasOwn(site, 'notes')), false);
  assert.equal((await api('/api/integrations/blog/navigation', { headers: { Authorization: 'Bearer wrong' } })).response.status, 401);
  assert.equal((await api('/api/integrations/blog/navigation', { method: 'POST', headers })).response.status, 405);
  assert.equal((await api('/api/groups', { method: 'POST', headers, body: { name: 'Denied', order_num: 9 } })).response.status, 401);
  assert.equal((await api('/api/groups-with-sites', { headers })).data.length, 1);
});

test('real SQLite API supports local login, icon create/edit, ordering and private export/import', async t => {
  const { api, login } = await environment(t);
  const loginResponse = await login();
  assert.match(loginResponse.headers.get('set-cookie'), /HttpOnly/);
  assert.doesNotMatch(loginResponse.headers.get('set-cookie'), /; Secure/);
  const group = (await api('/api/groups', { method: 'POST', authenticated: true, body: { name: 'Private', order_num: 1, is_public: 0 } })).data;
  assert.equal((await api(`/api/groups/${group.id}`, { authenticated: true })).data.is_public, 0);
  const editedGroup = await api(`/api/groups/${group.id}`, { method: 'PUT', authenticated: true, body: { name: 'Still private' } });
  assert.equal(editedGroup.data.is_public, 0);
  const siteDraft = { group_id: group.id, name: 'Icon test', url: 'https://example.com', order_num: 1, is_public: 0, icon: 'GH' };
  const created = await api('/api/sites', { method: 'POST', authenticated: true, body: siteDraft });
  assert.equal(created.data.icon, 'GH');
  const id = created.data.id;
  assert.equal((await api(`/api/sites/${id}`, { authenticated: true })).data.is_public, 0);
  for (const [input, expected] of [['😀', '😀'], ['My App', 'My App'], ['https://icons.example/icon.png', 'https://icons.example/icon.png'], ['/posters/icon.png', '/posters/icon.png'], ['icons.example/icon.png', 'https://icons.example/icon.png'], ['data:image/png;base64,aGVsbG8=', 'data:image/png;base64,aGVsbG8=']]) {
    const result = await api(`/api/sites/${id}`, { method: 'PUT', authenticated: true, body: { icon: input } });
    assert.equal(result.response.status, 200);
    assert.equal(result.data.icon, expected);
    assert.equal(result.data.is_public, 0);
    const post = await api('/api/sites', { method: 'POST', authenticated: true, body: { ...siteDraft, name: input.slice(0, 20), icon: input } });
    assert.equal(post.data.icon, expected);
  }
  for (const icon of ['javascript:alert(1)', 'data:image/svg+xml;base64,PHN2Zz4=', 'https://user:pass@example.com/icon', 'long-icon-text']) {
    assert.equal((await api(`/api/sites/${id}`, { method: 'PUT', authenticated: true, body: { icon } })).response.status, 400);
    assert.equal((await api('/api/sites', { method: 'POST', authenticated: true, body: { ...siteDraft, icon } })).response.status, 400);
  }
  const order = await api('/api/group-orders', { method: 'PUT', authenticated: true, body: [{ id: group.id, order_num: 7 }] });
  assert.equal(order.response.status, 200);
  assert.equal(order.data.success, true);
  const exported = (await api('/api/export', { authenticated: true })).data;
  assert.equal(exported.groups[0].is_public, 0);
  assert.ok(exported.sites.every(site => site.is_public === 0));
  const legacyImport = await api('/api/import', { method: 'POST', authenticated: true, body: { version: '1', exportDate: new Date().toISOString(), groups: [{ id: 99, name: 'Legacy', order_num: 9 }], sites: [{ group_id: 99, name: 'Legacy private', url: 'https://legacy.example', order_num: 1 }], configs: {} } });
  assert.equal(legacyImport.data.success, true);
  assert.deepEqual((await api('/api/groups-with-sites')).data, []);
});

test('HTTP serving rejects foreign origins, large bodies, unsafe paths and missing assets', async t => {
  const { assets, directory, api, origin } = await environment(t);
  assert.equal((await api('/healthz')).data.ok, true);
  assert.match((await api('/')).data, /Navi test/);
  assert.match((await api('/nested/client/route')).data, /Navi test/);
  assert.equal((await api('/missing.js')).response.status, 404);
  const denied = await api('/api/auth/status', { headers: { Origin: 'https://evil.example' } });
  assert.equal(denied.response.status, 403);
  assert.equal(denied.response.headers.get('access-control-allow-origin'), null);
  const allowed = await api('/api/auth/status', { headers: { Origin: 'http://localhost:5173' } });
  assert.equal(allowed.response.headers.get('access-control-allow-origin'), 'http://localhost:5173');
  const large = await fetch(`${origin}/api/login`, { method: 'POST', body: 'x'.repeat(1024 * 1024 + 1) });
  assert.equal(large.status, 413);
  const outside = join(directory, 'outside.txt');
  await writeFile(outside, 'private-file');
  await symlink(outside, join(assets, 'leak.txt'));
  assert.equal((await api('/leak.txt')).response.status, 403);
  assert.equal((await api('/%2e%2e%2foutside.txt')).response.status, 403);
  for (const path of ['http://evil.example/api/auth/status', '//evil.example/', '/\\evil.example/']) {
    const status = await new Promise((accept, reject) => {
      const request = httpRequest(origin, { path }, response => { response.resume(); accept(response.statusCode); });
      request.on('error', reject);
      request.end();
    });
    assert.equal(status, 400);
  }
});

test('forwarded IPs are used only from configured trusted peers', () => {
  const incoming = { socket: { remoteAddress: '::ffff:172.20.0.1' }, headers: { 'x-real-ip': '203.0.113.17', 'x-forwarded-for': '192.0.2.99' } };
  assert.equal(clientAddress(incoming, {}), '172.20.0.1');
  assert.equal(clientAddress(incoming, { TRUST_PROXY: 'true' }), '172.20.0.1');
  assert.equal(clientAddress(incoming, { TRUST_PROXY: 'true', TRUSTED_PROXY_CIDRS: '172.20.0.1/32' }), '203.0.113.17');
  assert.equal(clientAddress(incoming, { TRUST_PROXY: 'true', TRUSTED_PROXY_CIDRS: '172.21.0.0/16' }), '172.20.0.1');
  assert.equal(clientAddress({ ...incoming, headers: { 'x-real-ip': 'fake' } }, { TRUST_PROXY: 'true', TRUSTED_PROXY_CIDRS: '172.20.0.1/32' }), '172.20.0.1');
});

test('production requires complete secrets and issues secure cookies behind an HTTPS origin', async t => {
  assert.throws(() => createNaviServer({ databasePath: ':memory:', env: { ...auth, NODE_ENV: 'production', AUTH_SECRET: 'short', PUBLIC_ORIGIN: 'https://navi.example' } }), /Production requires/);
  assert.throws(() => createNaviServer({ databasePath: ':memory:', env: { ...auth, NODE_ENV: 'production', PUBLIC_ORIGIN: 'http://navi.example' } }), /HTTPS origin/);
  const { login } = await environment(t, { NODE_ENV: 'production', PUBLIC_ORIGIN: 'https://navi.example' });
  assert.match((await login()).headers.get('set-cookie'), /; Secure/);
});
