CREATE TABLE sessions (
  id_hash TEXT PRIMARY KEY,
  method TEXT NOT NULL CHECK (method IN ('password', 'blog')),
  user_name TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  subject TEXT,
  refresh_token TEXT,
  verified_at INTEGER,
  CHECK (
    (method = 'password' AND subject IS NULL AND refresh_token IS NULL AND verified_at IS NULL)
    OR (method = 'blog' AND subject IS NOT NULL AND refresh_token IS NOT NULL AND verified_at IS NOT NULL)
  )
);
CREATE INDEX idx_sessions_expiry ON sessions(expires_at);

CREATE TABLE owner_favorites (
  site_id INTEGER PRIMARY KEY REFERENCES sites(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
