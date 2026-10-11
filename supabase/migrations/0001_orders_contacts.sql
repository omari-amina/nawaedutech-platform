-- SDD US-6: tables minimales COD-first (idempotent)
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  total INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public insert orders" ON orders;
CREATE POLICY "public insert orders" ON orders FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "public insert contacts" ON contacts;
CREATE POLICY "public insert contacts" ON contacts FOR INSERT TO anon WITH CHECK (true);
