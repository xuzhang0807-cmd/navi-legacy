import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash, createHmac, hkdfSync } from 'node:crypto';
import { mkdir, rm, symlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createNaviServer } from '../server/app.js';
import { readConfig } from '../server/config.js';
import { clientAddress } from '../server/http/request.js';
import { authEnv, navi, seedNavigation } from './http-fixture.js';

const v1 = '/api/v1';
const integrationPath = '/api/integrations/blog/navigation';
const newGroup = { name: 'Group', isPublic: true };
const newSite = { groupId: 1, name: 'Site', url: 'example.com', isPublic: false };
const loginBody = { username: authEnv.AUTH_USERNAME, password: authEnv.AUTH_PASSWORD };
const integrationHeaders = { Authorization: `Bearer ${authEnv.BLOG_NAVIGATION_TOKEN}` };

function expectError(result, status, code) {
  assert.equal(result.response.status, status);
  assert.equal(result.data.error.code, code);
  assert.equal(typeof result.data.error.message, 'string');
  assert.equal(result.response.headers.get('cache-control'), 'private, no-store');
}

test('v1 and read-only compatibility routes enforce both privacy levels and omit guest notes', async t => {
  const { api, database, login } = await navi(t, { env: { AUTH_ENABLED: 'false', AUTH_REQUIRED_FOR_READ: 'true' } });
  seedNavigation(database);
  const { data, response } = await api(`${v1}/navigation`, { headers: integrationHeaders });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'private, no-store');
  assert.deepEqual(data, {
    visibility: 'public',
    groups: [
      { id: 1, name: 'Public group', isPublic: true, order: 2, sites: [{
        id: 10, groupId: 1, name: 'Public site', url: 'https://public.example/',
        icon: null, description: 'Public description', isPublic: true, order: 2,
      }] },
      { id: 3, name: 'Empty group', isPublic: true, order: 3, sites: [] },
    ],
    favorites: [],
  });
  const legacy = (await api('/api/groups-with-sites', { headers: integrationHeaders })).data;
  assert.deepEqual(legacy.map(group => group.id), [1, 3]);
  assert.deepEqual(legacy[0].sites.map(site => site.id), [10]);
  assert.equal(legacy[0].sites[0].description, 'Public description');
  assert.equal(legacy[0].sites[0].is_public, 1);
  assert.equal(legacy[0].sites[0].icon, '');
  assert.equal(Object.hasOwn(legacy[0].sites[0], 'notes'), false);
  assert.deepEqual((await api('/api/auth/status')).data, { authenticated: false });
  expectError(await api(`${v1}/export`), 401, 'UNAUTHENTICATED');
  expectError(await api(`${v1}/groups`, { method: 'POST', body: newGroup, headers: integrationHeaders }), 401, 'UNAUTHENTICATED');

  await login();
  const owner = (await api(`${v1}/navigation`, { authenticated: true })).data;
  assert.equal(owner.visibility, 'private');
  assert.deepEqual(owner.groups.map(group => group.id), [2, 1, 3]);
  assert.deepEqual(owner.groups[1].sites.map(site => site.id), [11, 10]);
  assert.equal(owner.groups[1].sites[1].notes, 'Owner note');
  assert.equal(owner.groups[0].sites[0].notes, 'Group note');
  assert.deepEqual(owner.favorites, [11]);
  const combined = (await api('/api/groups-with-sites', { authenticated: true })).data;
  assert.equal(combined[0].is_public, 0);
  assert.equal(combined[1].sites[0].is_public, 0);
  assert.equal(combined[1].sites[1].notes, 'Owner note');
  assert.equal(typeof combined[0].created_at, 'string');
  assert.deepEqual((await api('/api/auth/status', { authenticated: true })).data, { authenticated: true });
  for (const path of ['/api/visitor-location', '/api/sites', '/api/preferences/visits', '/api/preferences/favorites']) {
    assert.equal((await api(path, { authenticated: true })).response.status, 404);
  }
  assert.equal((await api('/api/groups', { method: 'POST', authenticated: true, body: newGroup })).response.status, 404);
});

test('blog integration keeps exact snake_case fields, authorization semantics and note redaction', async t => {
  const { database, api, login } = await navi(t);
  seedNavigation(database);
  await login();
  for (const headers of [{}, { 'X-Blog-Authenticated': 'true', 'X-User-ID': 'admin' }]) {
    const result = await api(integrationPath, { headers, authenticated: true });
    assert.equal(result.response.status, 200);
    assert.equal(result.response.headers.get('cache-control'), 'private, no-store');
    assert.deepEqual(result.data, {
      groups: [
        { id: 1, name: 'Public group', order_num: 2, is_public: 1, sites: [{
          id: 10, group_id: 1, name: 'Public site', url: 'https://public.example/',
          icon: null, description: 'Public description', order_num: 2, is_public: 1,
        }] },
        { id: 3, name: 'Empty group', order_num: 3, is_public: 1, sites: [] },
      ],
      visibility: 'public',
    });
  }
  const { data } = await api(integrationPath, { headers: integrationHeaders });
  assert.equal(data.visibility, 'private');
  assert.deepEqual(data.groups.map(group => group.id), [2, 1, 3]);
  assert.deepEqual(data.groups.flatMap(group => group.sites).map(site => site.id), [20, 11, 10]);
  assert.ok(data.groups.flatMap(group => group.sites).every(site => !Object.hasOwn(site, 'notes')));
  for (const Authorization of ['Bearer wrong', 'Basic wrong', 'bearer wrong']) {
    const denied = await api(integrationPath, { headers: { Authorization }, authenticated: true });
    assert.equal(denied.response.status, 401);
    assert.deepEqual(denied.data, { error: '无效的导航集成凭据' });
  }
  const write = await api(integrationPath, { method: 'POST', headers: integrationHeaders });
  assert.equal(write.response.status, 405);
  assert.deepEqual(write.data, { error: 'Read-only endpoint' });
});

test('password sessions use SHA-256 IDs, expire at the configured lifetime and are revoked on logout', async t => {
  let now = 100_000;
  const { api, login, database } = await navi(t, { now: () => now });
  assert.deepEqual((await api(`${v1}/session`)).data, {
    authenticated: false, role: 'guest', user: null, loginMethods: { blog: false, password: true },
  });
  const regular = await login();
  const setCookie = regular.response.headers.get('set-cookie');
  assert.ok(setCookie.includes('HttpOnly') && setCookie.includes('SameSite=Lax') && setCookie.includes('Path=/'));
  assert.ok(setCookie.includes('Max-Age=43200') && !setCookie.includes('Secure'));
  const session = database.prepare('SELECT * FROM sessions').get();
  const value = regular.session.slice('navi_session='.length);
  const hash = createHash('sha256').update(value).digest('hex');
  assert.ok(session.id_hash === hash && session.id_hash !== value, 'Stored session ID is a hash.');
  const key = hkdfSync('sha256', authEnv.AUTH_SECRET, '', 'navi:password-session:v1', 32);
  const fingerprint = createHmac('sha256', key).update(JSON.stringify([loginBody.username, loginBody.password])).digest('hex');
  assert.ok(session.password_fingerprint === fingerprint, 'Stored fingerprint matches the configured credentials.');
  assert.equal(session.expires_at - now, 12 * 60 * 60 * 1000);
  assert.equal(session.refresh_token, null);
  assert.deepEqual(regular.data.user, { name: 'owner', method: 'password' });
  assert.equal((await api(`${v1}/session`, { authenticated: true })).data.role, 'admin');
  now += 12 * 60 * 60 * 1000;
  assert.equal((await api(`${v1}/session`, { authenticated: true })).data.role, 'guest');

  const remembered = await login(true);
  assert.ok(remembered.response.headers.get('set-cookie').includes('Max-Age=2592000'));
  assert.equal(database.prepare('SELECT expires_at FROM sessions').get().expires_at - now, 30 * 24 * 60 * 60 * 1000);
  const duplicate = await api(`${v1}/session`, { headers: { Cookie: `${remembered.session}; ${remembered.session}` } });
  assert.equal(duplicate.data.role, 'guest');
  const logout = await api(`${v1}/auth/logout`, { method: 'POST', authenticated: true });
  assert.equal(logout.response.status, 204);
  assert.ok(logout.response.headers.getSetCookie().some(cookie => cookie.startsWith('navi_session=; Max-Age=0')));
  assert.equal(database.prepare('SELECT COUNT(*) AS n FROM sessions').get().n, 0);
  assert.equal((await api(`${v1}/session`, { authenticated: true })).data.role, 'guest');
  assert.equal((await api(`${v1}/auth/logout`, { method: 'POST', authenticated: true })).response.status, 204);
});

for (const [settings, env, authenticated] of [
  ['unchanged credentials', {}, true],
  ['a changed password', { AUTH_PASSWORD: 'updated-fixture-password' }, false],
  ['a changed username', { AUTH_USERNAME: 'updated-owner' }, false],
  ['a rotated AUTH_SECRET', { AUTH_SECRET: 'updated-fixture-secret-with-more-than-32-characters' }, false],
]) {
  test(`password sessions are ${authenticated ? 'kept' : 'revoked'} on reopening SQLite with ${settings}`, async t => {
    const original = await navi(t);
    const { session } = await original.login(true);
    const { api, database } = await original.reopen(env);
    const { response, data } = await api(`${v1}/session`, { headers: { Cookie: session } });
    assert.equal(response.status, 200);
    assert.deepEqual(data, {
      authenticated,
      role: authenticated ? 'admin' : 'guest',
      user: authenticated ? { name: loginBody.username, method: 'password' } : null,
      loginMethods: { blog: false, password: true },
    });
    assert.equal(database.prepare('SELECT COUNT(*) AS n FROM sessions').get().n, Number(authenticated));
  });
}

test('password rate limiting honors only trusted real IP and expires after 15 minutes', async t => {
  let now = 500_000;
  const { api, login } = await navi(t, { now: () => now, env: { TRUST_PROXY: 'true' } });
  const path = `${v1}/auth/login`;
  const headers = { 'X-Real-IP': '203.0.113.17' };
  expectError(await api(path, { method: 'POST', body: { ...loginBody, remember: 'true' }, headers }), 400, 'INVALID_INPUT');
  for (let attempt = 0; attempt < 5; attempt++) {
    expectError(await api(path, { method: 'POST', body: { ...loginBody, password: 'incorrect' }, headers }), 401, 'INVALID_CREDENTIALS');
  }
  const limited = await api(path, { method: 'POST', body: loginBody, headers });
  expectError(limited, 429, 'LOGIN_RATE_LIMITED');
  assert.equal(limited.response.headers.get('retry-after'), '900');
  await login(false, { 'X-Real-IP': '203.0.113.18' });
  now += 15 * 60 * 1000;
  await login(false, headers);
});

test('real IP parsing keeps the former proxy trust rules', () => {
  const request = {
    socket: { remoteAddress: '::ffff:172.20.0.1' },
    headers: { 'x-real-ip': '203.0.113.17', 'x-forwarded-for': '192.0.2.99' },
  };
  assert.equal(clientAddress(request, readConfig({})), '172.20.0.1');
  assert.equal(clientAddress(request, readConfig({ TRUST_PROXY: 'true' })), '172.20.0.1');
  const proxy = cidrs => readConfig({ TRUST_PROXY: 'true', TRUSTED_PROXY_CIDRS: cidrs });
  assert.equal(clientAddress(request, proxy('172.20.0.1/32')), '203.0.113.17');
  assert.equal(clientAddress(request, proxy('172.20.0.0/16')), '203.0.113.17');
  assert.equal(clientAddress(request, proxy('172.21.0.0/16')), '172.20.0.1');
  assert.equal(clientAddress({ ...request, headers: { 'x-real-ip': 'fake' } }, proxy('172.20.0.1/32')), '172.20.0.1');
});

test('production checks required settings before opening the DB and uses secure cookies', async t => {
  const env = { ...authEnv, NODE_ENV: 'production', PUBLIC_ORIGIN: 'https://navi.example' };
  const startup = overrides => createNaviServer({ databasePath: ':memory:', env: { ...env, ...overrides } });
  assert.throws(() => startup({ PUBLIC_ORIGIN: '' }), /HTTPS origin/);
  assert.throws(() => startup({ PUBLIC_ORIGIN: 'http://navi.example' }), /HTTPS origin/);
  assert.throws(() => startup({ PUBLIC_ORIGIN: 'https://navi.example/paths' }), /HTTPS origin/);
  assert.throws(() => startup({ AUTH_SECRET: 'short' }), /AUTH_SECRET/);
  assert.throws(() => startup({ BLOG_NAVIGATION_TOKEN: '' }), /BLOG_NAVIGATION_TOKEN/);
  assert.throws(() => startup({ BLOG_NAVIGATION_TOKEN: env.AUTH_SECRET }), /must be distinct/);
  assert.throws(() => startup({ AUTH_PASSWORD_LOGIN: 'false' }), /at least one login method/);
  assert.throws(() => startup({ AUTH_PASSWORD_LOGIN: 'true', AUTH_PASSWORD: '' }), /AUTH_PASSWORD/);
  assert.throws(() => startup({ BLOG_OAUTH_ISSUER: 'https://blog.example' }), /BLOG_OAUTH_CLIENT_ID/);
  assert.throws(() => startup({
    BLOG_OAUTH_ISSUER: 'http://blog.example', BLOG_OAUTH_CLIENT_ID: 'fixture', BLOG_OAUTH_CLIENT_SECRET: 'fixture',
  }), /BLOG_OAUTH_ISSUER/);
  const { login } = await navi(t, { env });
  assert.ok((await login()).response.headers.get('set-cookie').includes('; Secure'));
});

test('development reports the enabled login methods and ignores legacy authorization flags', async t => {
  const { api } = await navi(t, {
    env: { AUTH_PASSWORD_LOGIN: 'false', BLOG_OAUTH_ISSUER: 'https://blog.example', AUTH_ENABLED: 'true' },
  });
  assert.deepEqual((await api(`${v1}/session`)).data.loginMethods, { blog: false, password: false });
  expectError(await api(`${v1}/auth/login`, { method: 'POST', body: loginBody }), 403, 'PASSWORD_LOGIN_DISABLED');
  expectError(await api(`${v1}/auth/blog/start`), 404, 'BLOG_LOGIN_DISABLED');
});

test('group CRUD validates fields and deleting a group cascades to sites and favorites', async t => {
  const { api, login, database } = await navi(t);
  await login();
  const write = (method, path, body) => api(v1 + path, { method, body, authenticated: true });
  for (const body of [{ name: ' ' }, { ...newGroup, name: '字'.repeat(41) }, { ...newGroup, isPublic: 1 }, { ...newGroup, order: 4 }]) {
    expectError(await write('POST', '/groups', body), 400, 'INVALID_INPUT');
  }
  const group = await write('POST', '/groups', { name: ` ${'字'.repeat(40)} `, isPublic: false });
  assert.equal(group.response.status, 201);
  assert.equal(group.data.name.length, 40);
  assert.equal(group.data.order, 1);
  assert.equal(Object.hasOwn(group.data, 'sites'), false);
  const second = await write('POST', '/groups', newGroup);
  assert.equal(second.data.order, 2);
  const path = `/groups/${group.data.id}`;
  assert.equal((await write('PATCH', path, { name: 'Still private' })).data.isPublic, false);
  assert.equal((await write('PATCH', path, { isPublic: true })).data.isPublic, true);
  expectError(await write('PATCH', path, {}), 400, 'INVALID_INPUT');
  expectError(await write('PATCH', '/groups/999', { name: 'Missing' }), 404, 'GROUP_NOT_FOUND');
  for (const id of ['0', '-1', '1x', '9007199254740992']) {
    expectError(await write('DELETE', `/groups/${id}`), 400, 'INVALID_INPUT');
  }
  const site = await write('POST', '/sites', { ...newSite, groupId: group.data.id });
  await write('PUT', `/favorites/${site.data.id}`);
  assert.equal((await write('DELETE', path)).response.status, 204);
  assert.equal(database.prepare('SELECT COUNT(*) AS n FROM sites').get().n, 0);
  assert.equal(database.prepare('SELECT COUNT(*) AS n FROM owner_favorites').get().n, 0);
  expectError(await write('DELETE', path), 404, 'GROUP_NOT_FOUND');
});

test('site CRUD validates text, URLs and visibility and appends a moved site to the target group', async t => {
  const { api, login, database } = await navi(t);
  seedNavigation(database);
  await login();
  const write = (method, path, body) => api(v1 + path, { method, body, authenticated: true });
  for (const patch of [
    { name: ' ' }, { name: '字'.repeat(61) }, { description: '字'.repeat(181) }, { notes: '字'.repeat(501) },
    { isPublic: 0 }, { groupId: '1' }, { url: 'https://user:password@example.com/' },
    { url: 'javascript:alert(1)' }, { url: 'ftp://example.com' }, { url: 'https://bad host.com' },
  ]) {
    expectError(await write('POST', '/sites', { ...newSite, ...patch }), 400, 'INVALID_INPUT');
    expectError(await write('PATCH', '/sites/10', patch), 400, 'INVALID_INPUT');
  }
  expectError(await write('POST', '/sites', { ...newSite, groupId: 999 }), 404, 'GROUP_NOT_FOUND');
  expectError(await write('PATCH', '/sites/10', { groupId: 999 }), 404, 'GROUP_NOT_FOUND');
  expectError(await write('PATCH', '/sites/999', { groupId: 1 }), 404, 'SITE_NOT_FOUND');
  const created = await write('POST', '/sites', {
    ...newSite, name: '字'.repeat(60), description: '介'.repeat(180), notes: '注'.repeat(500),
  });
  assert.equal(created.response.status, 201);
  assert.equal(created.data.url, 'https://example.com/');
  assert.equal(created.data.order, 3);
  assert.equal(created.data.isPublic, false);
  assert.equal(created.data.notes.length, 500);
  const path = `/sites/${created.data.id}`;
  const moved = await write('PATCH', path, { groupId: 2, isPublic: true, url: 'http://localhost:8789' });
  assert.equal(moved.response.status, 200);
  assert.equal(moved.data.groupId, 2);
  assert.equal(moved.data.order, 2);
  assert.equal(moved.data.isPublic, true);
  assert.equal(moved.data.url, 'http://localhost:8789/');
  assert.equal((await write('PATCH', path, { groupId: 2 })).data.order, 2);
  assert.equal((await write('DELETE', path)).response.status, 204);
  expectError(await write('DELETE', path), 404, 'SITE_NOT_FOUND');
});

test('icons share frontend normalization with an exact 256 KiB decoded limit', async t => {
  const { api, login, database } = await navi(t);
  seedNavigation(database);
  await login();
  const patch = icon => api(`${v1}/sites/10`, { method: 'PATCH', authenticated: true, body: { icon } });
  for (const [input, output] of [
    [null, null], [' GH ', 'GH'], ['😀', '😀'], ['My App', 'My App'], ['http://icons.example/a.png', 'http://icons.example/a.png'],
    ['/posters/icon.png', '/posters/icon.png'], ['icons.example/icon.png', 'https://icons.example/icon.png'],
    ['//icons.example/icon.png', 'https://icons.example/icon.png'], ['data:image/png;base64,aGVsbG8=', 'data:image/png;base64,aGVsbG8='],
  ]) {
    const edited = await patch(input);
    assert.equal(edited.response.status, 200);
    assert.equal(edited.data.icon, output);
    const created = await api(`${v1}/sites`, { method: 'POST', authenticated: true, body: { ...newSite, icon: input } });
    assert.equal(created.response.status, 201);
    assert.equal(created.data.icon, output);
  }
  for (const icon of ['javascript:alert(1)', 'file:///secret', 'data:image/svg+xml;base64,PHN2Zz4=',
    'https://user:pass@example.com/icon', 'long-icon-text', 'data:image/png;base64,a===']) {
    expectError(await patch(icon), 400, 'INVALID_INPUT');
  }
  const raster = bytes => `data:image/png;base64,${Buffer.alloc(bytes).toString('base64')}`;
  assert.equal((await patch(raster(256 * 1024))).response.status, 200);
  expectError(await patch(raster(256 * 1024 + 1)), 400, 'INVALID_INPUT');
});

test('group and site sorting require the exact ID set and update only the targeted scope', async t => {
  const { api, login, database } = await navi(t);
  seedNavigation(database);
  await login();
  const order = (path, ids) => api(v1 + path, { method: 'PUT', authenticated: true, body: { ids } });
  for (const [path, valid, missing, foreign] of [
    ['/groups/order', [3, 1, 2], [3, 1], [3, 1, 10]],
    ['/groups/1/sites/order', [10, 11], [10], [10, 20]],
  ]) {
    expectError(await order(path, [valid[0], valid[0]]), 400, 'INVALID_INPUT');
    expectError(await order(path, valid.map(String)), 400, 'INVALID_INPUT');
    expectError(await order(path, missing), 409, 'ORDER_MISMATCH');
    expectError(await order(path, foreign), 409, 'ORDER_MISMATCH');
    assert.equal((await order(path, valid)).response.status, 204);
  }
  expectError(await order('/groups/999/sites/order', []), 404, 'GROUP_NOT_FOUND');
  assert.equal((await order('/groups/3/sites/order', [])).response.status, 204);
  const nav = (await api(`${v1}/navigation`, { authenticated: true })).data;
  assert.deepEqual(nav.groups.map(group => [group.id, group.order]), [[3, 1], [1, 2], [2, 3]]);
  assert.deepEqual(nav.groups[1].sites.map(site => [site.id, site.order]), [[10, 1], [11, 2]]);
  assert.equal(nav.groups[2].sites[0].id, 20);
});

test('owner favorites are idempotent, hidden from visitors and cleared when a site is deleted', async t => {
  const { api, login, database } = await navi(t);
  seedNavigation(database);
  await login();
  const favorite = (method, id, authenticated = true) => api(`${v1}/favorites/${id}`, { method, authenticated });
  expectError(await favorite('PUT', 10, false), 401, 'UNAUTHENTICATED');
  expectError(await favorite('PUT', 999), 404, 'SITE_NOT_FOUND');
  assert.equal((await favorite('PUT', 10)).response.status, 204);
  assert.equal((await favorite('PUT', 10)).response.status, 204);
  assert.equal(database.prepare('SELECT COUNT(*) AS n FROM owner_favorites').get().n, 2);
  assert.deepEqual((await api(`${v1}/navigation`)).data.favorites, []);
  assert.equal((await favorite('DELETE', 11)).response.status, 204);
  assert.equal((await favorite('DELETE', 11)).response.status, 204);
  assert.deepEqual((await api(`${v1}/navigation`, { authenticated: true })).data.favorites, [10]);
  await api(`${v1}/sites/10`, { method: 'DELETE', authenticated: true });
  assert.deepEqual((await api(`${v1}/navigation`, { authenticated: true })).data.favorites, []);
});

test('export and import round-trip private navigation and replace it atomically', async t => {
  const { api, login, database } = await navi(t);
  seedNavigation(database);
  await login();
  const exported = await api(`${v1}/export`, { authenticated: true });
  assert.match(exported.response.headers.get('content-disposition'), /attachment/);
  const backup = exported.data;
  assert.equal(backup.version, 2);
  assert.equal(backup.groups[0].isPublic, false);
  assert.equal(backup.sites.find(site => site.id === 11).notes, 'Private note');
  assert.deepEqual(backup.favorites, [11]);
  const restore = body => api(`${v1}/import`, { method: 'POST', body, authenticated: true });
  const navigation = async () => (await api(`${v1}/navigation`, { authenticated: true })).data;
  const before = await navigation();
  expectError(await restore({ ...backup, sites: [{ ...backup.sites[0], groupId: 999 }], favorites: [] }), 400, 'INVALID_INPUT');
  expectError(await restore({ ...backup, favorites: [999] }), 400, 'INVALID_INPUT');
  expectError(await restore({ ...backup, groups: [...backup.groups, backup.groups[0]] }), 400, 'INVALID_INPUT');
  assert.deepEqual(await navigation(), before);
  database.exec(`CREATE TRIGGER reject_restore BEFORE INSERT ON sites WHEN NEW.name = 'Reject'
    BEGIN SELECT RAISE(ABORT, 'Test rollback'); END;`);
  expectError(await restore({ ...backup, sites: backup.sites.map(site => ({ ...site, name: 'Reject' })) }), 500, 'INTERNAL_ERROR');
  assert.deepEqual(await navigation(), before);

  assert.deepEqual((await restore({ version: 2, groups: [], sites: [], favorites: [] })).data, { groups: 0, sites: 0 });
  assert.deepEqual((await navigation()).groups, []);
  assert.deepEqual((await restore(backup)).data, { groups: 3, sites: 3 });
  assert.deepEqual(await navigation(), before);
});

test('legacy JSON backups with omitted privacy flags import as private', async t => {
  const { api, login } = await navi(t);
  await login();
  const backup = {
    version: '1.0', exportDate: '2026-01-01T00:00:00.000Z',
    groups: [{ id: 9, name: 'Legacy', order_num: 1 }],
    sites: [{ group_id: 9, name: 'Secret', order_num: 1, url: 'https://legacy.example', notes: 'Kept' }],
    configs: {},
  };
  const result = await api(`${v1}/import`, { method: 'POST', body: backup, authenticated: true });
  assert.deepEqual(result.data, { groups: 1, sites: 1 });
  assert.deepEqual((await api(`${v1}/navigation`)).data.groups, []);
  const { groups } = (await api(`${v1}/navigation`, { authenticated: true })).data;
  assert.equal(groups[0].isPublic, false);
  assert.equal(groups[0].sites[0].isPublic, false);
  assert.equal(groups[0].sites[0].notes, 'Kept');
});

test('writes check Origin and actual JSON content and permit bodyless operations', async t => {
  const { api, login, request } = await navi(t, { env: {
    NODE_ENV: 'production', PUBLIC_ORIGIN: 'https://navi.example', ALLOWED_ORIGINS: 'https://reader.example',
  } });
  await login();
  const path = `${v1}/groups`;
  const write = headers => api(path, { method: 'POST', authenticated: true, body: newGroup, headers });
  for (const Origin of [undefined, 'null', 'https://evil.example', 'https://reader.example']) {
    expectError(await write({ Origin, Host: 'evil.example' }), 403, 'ORIGIN_FORBIDDEN');
  }
  for (const contentType of [undefined, 'text/plain', 'application/jsonx', 'application/x-www-form-urlencoded']) {
    expectError(await write({ 'Content-Type': contentType }), 415, 'UNSUPPORTED_CONTENT_TYPE');
  }
  const malformed = await request(`${v1}/auth/login`, {
    method: 'POST', headers: { Origin: 'https://navi.example', 'Content-Type': 'application/json' }, body: '{',
  });
  assert.equal(malformed.status, 400);
  assert.equal((await malformed.json()).error.code, 'INVALID_JSON');
  const missing = await request(`${v1}/auth/login`, { method: 'POST', headers: { Origin: 'https://navi.example' } });
  assert.equal(missing.status, 400);
  assert.equal((await missing.json()).error.code, 'INVALID_JSON');
  const created = await write({ 'Content-Type': 'application/json; charset=utf-8' });
  assert.equal(created.response.status, 201);
  const allowed = await api(`${v1}/session`, { headers: { Origin: 'https://reader.example' } });
  assert.equal(allowed.response.headers.get('access-control-allow-origin'), 'https://reader.example');
  const preflight = await api(path, { method: 'OPTIONS', headers: { Origin: 'https://navi.example' } });
  assert.equal(preflight.response.status, 204);
  assert.match(preflight.response.headers.get('access-control-allow-methods'), /PATCH/);
  expectError(await api(`${v1}/auth/logout`, { method: 'POST', authenticated: true, headers: { Origin: undefined } }), 403, 'ORIGIN_FORBIDDEN');
  assert.equal((await api(`${path}/${created.data.id}`, { method: 'DELETE', authenticated: true })).response.status, 204);
});

test('the 1 MiB cap is measured in bytes for both fixed length and chunked JSON', async t => {
  const { request } = await navi(t);
  const target = `${v1}/auth/login`;
  const settings = { method: 'POST', headers: { Origin: 'http://localhost:5173', 'Content-Type': 'application/json' } };
  const json = JSON.stringify(loginBody);
  const limit = 1024 * 1024;
  const exact = json.padEnd(limit, ' ');
  assert.equal((await request(target, { ...settings, body: exact })).status, 200);
  const tooLarge = await request(target, { ...settings, body: exact + ' ' });
  assert.equal(tooLarge.status, 413);
  assert.equal((await tooLarge.json()).error.code, 'BODY_TOO_LARGE');
  const chunked = await request(target, { ...settings, chunks: [Buffer.alloc(limit), Buffer.from('界')] });
  assert.equal(chunked.status, 413);
  assert.equal((await chunked.json()).error.code, 'BODY_TOO_LARGE');
});

test('health, SPA fallback, security and cache headers and static traversal operate through Node HTTP', async t => {
  const { api, request, assets, directory } = await navi(t);
  assert.deepEqual((await api('/healthz')).data, { ok: true });
  assert.equal((await api('/healthz', { method: 'HEAD' })).data, '');
  const spa = await api('/nested/client/route');
  assert.match(spa.data, /Navi test/);
  assert.equal(spa.response.headers.get('cache-control'), 'no-store');
  assert.equal(spa.response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(spa.response.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
  for (const path of ['/missing.js', '/assets/no-extension', '/assets', '/api', '/healthz/other']) {
    assert.equal((await api(path)).response.status, 404);
  }
  await mkdir(join(assets, 'assets'));
  await writeFile(join(assets, 'assets', 'index.hash.js'), 'console.log("asset")');
  await writeFile(join(assets, 'logo.svg'), '<svg/>');
  assert.equal((await api('/assets/index.hash.js')).response.headers.get('cache-control'), 'public, max-age=31536000, immutable');
  assert.equal((await api('/logo.svg')).response.headers.get('cache-control'), 'public, max-age=3600');
  const outside = join(directory, 'outside.txt');
  await writeFile(outside, 'private-file');
  await symlink(outside, join(assets, 'leak.txt'));
  assert.equal((await api('/leak.txt')).response.status, 403);
  for (const path of ['/%2e%2e%2foutside.txt', '/assets/%2e%2e/%2e%2e/outside.txt', '/..%2foutside.txt']) {
    assert.equal((await request(path)).status, 403);
  }
  for (const path of ['http://evil.example/api/auth/status', '//evil.example/', '/\\evil.example/', '/%00', '/%']) {
    assert.equal((await request(path)).status, 400);
  }
  await rm(join(assets, 'index.html'));
  await symlink(outside, join(assets, 'index.html'));
  assert.equal((await api('/another/client/route')).response.status, 403);
});
