import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';

/** Small D1 compatibility layer so the existing Worker API also runs on Node. */
export function createDatabase(filename) {
  if (filename !== ':memory:') mkdirSync(dirname(filename), { recursive: true, mode: 0o700 });
  const raw = new DatabaseSync(filename);
  raw.exec('PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000;');
  raw.exec(readFileSync(new URL('../migrations/0001_local_schema.sql', import.meta.url), 'utf8'));

  function prepare(sql, parameters = []) {
    const statement = raw.prepare(sql);
    const metadata = () => ({ changes: Number(raw.prepare('SELECT changes() AS n').get().n) });
    return {
      bind(...values) { return prepare(sql, values); },
      all() { return { success: true, results: statement.all(...parameters), meta: metadata() }; },
      first(column) {
        const row = statement.get(...parameters);
        return row ? (column ? row[column] : row) : null;
      },
      run() {
        const result = statement.run(...parameters);
        return { success: true, results: [], meta: { changes: Number(result.changes), last_row_id: Number(result.lastInsertRowid) } };
      },
    };
  }
  return {
    raw,
    prepare,
    exec(sql) { raw.exec(sql); return { count: 1, duration: 0 }; },
    async batch(statements) {
      raw.exec('BEGIN IMMEDIATE');
      try {
        const results = statements.map(statement => statement.all());
        raw.exec('COMMIT');
        return results;
      } catch (error) {
        raw.exec('ROLLBACK');
        throw error;
      }
    },
    close() { raw.close(); },
  };
}
