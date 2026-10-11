# US-6 — DevOps + Supabase migrations
- docker-compose.yml: remplacer WordPress/MariaDB par `frontend` (build . → nginx, ports 8080:80, depends backend) + `backend` (build ./server, 5000:5000, env PORT, volume ./server/data). volumes: backend_data. `docker compose config` OK.
- server/Dockerfile: vérifier EXPOSE 5000 + CMD ["node","dist/index.js"] (existant conservé).
- .env.example (racine): VITE_API_URL=http://localhost:5000, VITE_SUPABASE_URL=, VITE_SUPABASE_ANON_KEY=, PORT=5000.
- supabase/migrations/0001_orders_contacts.sql: CREATE TABLE IF NOT EXISTS orders (id text pk, payload jsonb, total int, status text default 'pending', created_at timestamptz default now()); contacts (id uuid default gen_random_uuid() pk, name, email, subject, message, created_at); + enable RLS + policies insert public (COD-first).
- README section "تشغيل SDD-001" (dev front/back, env, compose).
