import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash, randomBytes } from 'node:crypto';
import { copyFile, mkdir, mkdtemp, readFile, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { openDatabase, transaction } from '../server/db/index.js';
import { authEnv, navi } from './http-fixture.js';

const baseline = await readFile(new URL('../migrations/0001_local_schema.sql', import.meta.url), 'utf8');

test('versioned SQLite migrations preserve the original rows and import only the owner favorites once', async t => {
  await mkdir('.tmp', { recursive: true, mode: 0o700 });
  const directory = await mkdtemp(resolve('.tmp/old-sqlite-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const original = join(directory, 'original.sqlite');
  const copy = join(directory, 'copied.sqlite');
  const legacy = new DatabaseSync(original);
  legacy.exec(baseline);
  legacy.exec(`
    INSERT INTO groups (id, name, is_public, order_num) VALUES (10, 'Private', 0, 7);
    INSERT INTO sites (id, group_id, name, url, notes, is_public, order_num) VALUES
      (21, 10, 'Site A', 'https://a.example/', 'Note A', 1, 4),
      (22, 10, 'Site B', 'https://b.example/', 'Note B', 0, 5);
    INSERT INTO user_favorites (user_id, site_id, created_at) VALUES
      ('owner', 21, '2025-01-01'), ('guest_fixture', 22, '2025-01-02');
    INSERT INTO user_preferences (user_id, theme_mode) VALUES ('owner', 'dark');
    INSERT INTO user_recent_visits (user_id, site_id) VALUES ('guest_fixture', 22);
    INSERT INTO configs (key, value) VALUES ('siteTitle', 'Navi');
  `);
  const tables = ['groups', 'sites', 'configs', 'user_favorites', 'user_preferences', 'user_recent_visits', 'sqlite_sequence'];
  const contents = database => tables.map(table => database.prepare(`SELECT * FROM ${table} ORDER BY rowid`).all());
  const data = contents(legacy);
  legacy.close();
  const before = await readFile(original);
  await copyFile(original, copy);

  let database = openDatabase(copy, { legacyOwner: 'owner' });
  try {
    assert.deepEqual(contents(database), data);
    assert.deepEqual(database.prepare('SELECT version FROM schema_migrations ORDER BY version').all().map(row => row.version), [1, 2, 3, 4]);
    assert.deepEqual({ ...database.prepare('SELECT * FROM owner_favorites').get() }, { site_id: 21, created_at: '2025-01-01' });
    assert.deepEqual(database.prepare('PRAGMA foreign_key_check').all(), []);
    assert.equal(database.prepare('PRAGMA integrity_check').get().integrity_check, 'ok');
    database.exec('DELETE FROM owner_favorites;');
  } finally {
    database.close();
  }
  database = openDatabase(copy, { legacyOwner: 'guest_fixture' });
  try {
    assert.deepEqual(contents(database), data);
    assert.deepEqual(database.prepare('SELECT * FROM owner_favorites').all(), []);
  } finally {
    database.close();
  }
  assert.ok((await readFile(original)).equals(before), 'The original database was unchanged.');
});

test('password sessions from schema version 2 are revoked on use after migration', async t => {
  await mkdir('.tmp', { recursive: true, mode: 0o700 });
  const directory = await mkdtemp(resolve('.tmp/sqlite-v2-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const filename = join(directory, 'navi.sqlite');
  const now = 100_000;
  const cookie = randomBytes(32).toString('base64url');
  const hash = createHash('sha256').update(cookie).digest('hex');
  const legacy = new DatabaseSync(filename);
  try {
    legacy.exec(baseline);
    legacy.exec(await readFile(new URL('../migrations/0002_sessions_and_owner_favorites.sql', import.meta.url), 'utf8'));
    legacy.exec(`
      CREATE TABLE schema_migrations (version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
      INSERT INTO schema_migrations (version) VALUES (1), (2);
    `);
    legacy.prepare("INSERT INTO sessions (id_hash, method, user_name, expires_at) VALUES (?, 'password', ?, ?)")
      .run(hash, authEnv.AUTH_USERNAME, now + 60_000);
  } finally {
    legacy.close();
  }

  const { api, database } = await navi(t, { databasePath: filename, now: () => now });
  const session = database.prepare('SELECT password_fingerprint FROM sessions WHERE id_hash = ?');
  assert.equal(session.get(hash).password_fingerprint, null);
  const { response, data } = await api('/api/v1/session', { headers: { Cookie: `navi_session=${cookie}` } });
  assert.equal(response.status, 200);
  assert.equal(data.role, 'guest');
  assert.equal(session.get(hash), undefined);
});

test('SQLite transactions roll back constraint failures without losing persisted rows', async t => {
  await mkdir('.tmp', { recursive: true, mode: 0o700 });
  const directory = await mkdtemp(resolve('.tmp/sqlite-tx-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const filename = join(directory, 'navi.sqlite');
  const database = openDatabase(filename);
  try {
    transaction(database, () => database.exec("INSERT INTO groups (name, order_num) VALUES ('Kept', 1)"));
    assert.throws(() => transaction(database, () => {
      database.exec("INSERT INTO groups (name, order_num) VALUES ('Rolled back', 2)");
      database.exec("INSERT INTO sites (group_id, name, url, order_num) VALUES (999, 'Invalid', 'https://example.com', 1)");
    }), /FOREIGN KEY/);
  } finally {
    database.close();
  }
  const reopened = openDatabase(filename);
  try {
    assert.deepEqual(reopened.prepare('SELECT name FROM groups').all().map(row => row.name), ['Kept']);
  } finally {
    reopened.close();
  }
});
