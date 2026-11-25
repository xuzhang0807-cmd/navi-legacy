ALTER TABLE sessions ADD COLUMN role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('viewer', 'admin'));
ALTER TABLE sessions ADD COLUMN blog_role TEXT CHECK (blog_role IS NULL OR blog_role IN ('owner', 'member'));
