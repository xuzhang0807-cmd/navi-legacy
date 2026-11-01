import { DatabaseSync } from 'node:sqlite';
import { mkdir, readFile, link, unlink, open } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

/** Import a D1 SQL export into a new SQLite file without replacing existing data. */
export async function importD1Sql(input, destination) {
  const target = resolve(destination);
  const sql = await readFile(input, 'utf8');
  if (!sql.trim()) throw new Error('SQL export is empty.');
  // D1 exports contain data/schema only. Never allow the export to open other files or change runtime extensions.
  const statements = sql.replace(/'(?:''|[^'])*'|"(?:""|[^"])*"|--[^\n]*|\/\*[\s\S]*?\*\//g, token => token.startsWith("'") || token.startsWith('"') ? "''" : ' ');
  if (/\b(?:ATTACH|DETACH|load_extension|VACUUM)\b/i.test(statements)) {
    throw new Error('Only a D1 data/schema export is accepted; external databases and extensions are forbidden.');
  }
  await mkdir(dirname(target), { recursive: true, mode: 0o700 });
  const staging = `${target}.importing-${crypto.randomUUID()}`;
  const placeholder = await open(staging, 'wx', 0o600);
  await placeholder.close();
  let database;
  try {
    database = new DatabaseSync(staging);
    database.exec(sql);
    if (database.isTransaction) {
      throw new Error('SQL export has an uncommitted transaction. Use a complete D1 export with its COMMIT statement.');
    }
    for (const table of ['groups', 'sites']) {
      const columns = database.prepare(`PRAGMA table_info(${table})`).all();
      if (!columns.some(column => column.name === 'is_public')) {
        throw new Error(`${table}.is_public is missing. Export the D1 database directly; legacy /api/export files are not a safe migration source.`);
      }
      const invalid = database.prepare(`SELECT COUNT(*) AS n FROM ${table} WHERE is_public IS NULL OR is_public NOT IN (0, 1)`).get().n;
      if (invalid) throw new Error(`${table} has invalid visibility values; review the export before importing.`);
    }
    database.exec(await readFile(new URL('../migrations/0001_local_schema.sql', import.meta.url), 'utf8'));
    const checks = database.prepare('PRAGMA integrity_check').all();
    if (checks.some(row => row.integrity_check !== 'ok')) throw new Error('SQLite integrity check failed.');
    if (database.prepare('PRAGMA foreign_key_check').all().length) throw new Error('Foreign key check failed.');
    const stats = Object.fromEntries(['groups', 'sites', 'configs', 'user_favorites', 'user_preferences', 'user_recent_visits'].map(table => [table, Number(database.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get().n)]));
    database.exec('PRAGMA journal_mode = DELETE;');
    database.close();
    database = undefined;
    // link() is exclusive: an existing destination always wins, including a concurrent creation.
    await link(staging, target);
    await unlink(staging);
    return stats;
  } finally {
    database?.close();
    await unlink(staging).catch(error => { if (error.code !== 'ENOENT') throw error; });
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [input, destination] = process.argv.slice(2);
  if (!input || !destination) {
    console.error('Usage: node scripts/import-d1.mjs <d1-export.sql> <new-database.sqlite>');
    process.exitCode = 1;
  } else {
    try { console.log(JSON.stringify(await importD1Sql(input, destination))); }
    catch (error) { console.error(`Import failed: ${error.message}`); process.exitCode = 1; }
  }
}
