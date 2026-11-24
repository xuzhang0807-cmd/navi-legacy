import { mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const migrationDirectories = [new URL('../../migrations/', import.meta.url)];

export function transaction(database, operation) {
  database.exec('BEGIN IMMEDIATE');
  try {
    const result = operation();
    database.exec('COMMIT');
    return result;
  } catch (error) {
    database.exec('ROLLBACK');
    throw error;
  }
}

function migrate(database, legacyOwner) {
  const migrations = migrationDirectories.flatMap(directory => readdirSync(directory)
    .filter(file => /^\d{4}_[a-z0-9_]+\.sql$/.test(file))
    .map(file => ({ path: new URL(file, directory), version: Number(file.slice(0, 4)) })))
    .sort((first, second) => first.version - second.version);
  if (new Set(migrations.map(migration => migration.version)).size !== migrations.length) {
    throw new Error('Duplicate SQLite migration version.');
  }
  database.exec(`CREATE TABLE IF NOT EXISTS schema_migrations (
    version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`);
  const applied = database.prepare('SELECT version FROM schema_migrations WHERE version = ?');
  const record = database.prepare('INSERT INTO schema_migrations (version) VALUES (?)');
  for (const { path, version } of migrations) {
    transaction(database, () => {
      if (applied.get(version)) return;
      database.exec(readFileSync(path, 'utf8'));
      if (version === 2 && legacyOwner) {
        database.prepare(`
          INSERT INTO owner_favorites (site_id, created_at)
          SELECT site_id, created_at FROM user_favorites WHERE user_id = ?
        `).run(legacyOwner);
      }
      record.run(version);
    });
  }
}

export function openDatabase(filename, { legacyOwner = '' } = {}) {
  if (filename !== ':memory:') mkdirSync(dirname(filename), { recursive: true, mode: 0o700 });
  const database = new DatabaseSync(filename);
  try {
    database.exec('PRAGMA busy_timeout = 5000; PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;');
    migrate(database, legacyOwner);
    return database;
  } catch (error) {
    database.close();
    throw error;
  }
}
