import { transaction } from './index.js';

export function createSessionStore(database) {
  const find = database.prepare('SELECT * FROM sessions WHERE id_hash = ? AND expires_at > ?');
  const remove = database.prepare('DELETE FROM sessions WHERE id_hash = ? RETURNING *');
  const insert = database.prepare(`
    INSERT INTO sessions (id_hash, method, user_name, expires_at, subject, refresh_token, verified_at, password_fingerprint)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const updateRefresh = database.prepare('UPDATE sessions SET refresh_token = ? WHERE id_hash = ? AND expires_at > ?');
  const verify = database.prepare('UPDATE sessions SET user_name = ?, verified_at = ? WHERE id_hash = ? AND expires_at > ?');
  const prune = database.prepare('DELETE FROM sessions WHERE expires_at <= ?');

  return {
    find: (hash, now) => find.get(hash, now),
    remove: hash => remove.get(hash),
    replace(session, oldHash, now) {
      transaction(database, () => {
        prune.run(now);
        if (oldHash) remove.get(oldHash);
        insert.run(session.hash, session.method, session.name, session.expiresAt,
          session.subject, session.refreshToken, session.verifiedAt, session.passwordFingerprint);
      });
    },
    rotate: (hash, refreshToken, now) => updateRefresh.run(refreshToken, hash, now).changes > 0,
    confirm: (hash, name, now) => verify.run(name, now, hash, now).changes > 0,
  };
}
