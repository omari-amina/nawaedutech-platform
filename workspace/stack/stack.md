# Stack — NawaEduTech Platform (SDD-Pro P0 Bootstrap)

> Source de vérité technique. 43 clés simplifiées (brownfield React+Vite).

## 1. Frontend
- framework: react@18.3.1 + vite@6.0.1 + typescript@5.6.2
- router: react-router-dom@6 (lazy pages + MainLayout + /admin sans layout)
- i18n: i18next + react-i18next, locales actives: ar (default, RTL), en. Cible: +fr
- state: CartContext (reducer + localStorage `nawaedutech_cart`), LanguageContext
- forms: react-hook-form + zod (@hookform/resolvers)
- UI: tailwindcss@3.4.16 + tailwindcss-animate + radix-ui + lucide-react + shadcn (components.json)
- styles: src/index.css (Almarai RTL + Manrope, classes site-*)
- meta: hooks/usePageMeta (title/og/robots)

## 2. Backend
- runtime: node>=20, server/ express@4 + helmet + cors + morgan + dotenv
- port: 5000, endpoints cibles: GET /api/health, GET /api/products, GET /api/courses, POST|GET /api/orders, POST /api/contact
- validation: zod côté front; express valide manuellement (pas de lib)
- persistence: Phase 1 = in-memory + JSON file `server/data/orders.json`; Phase 2 = Supabase (products seed existant)
- auth backend: none (COD-first). Admin: flag local `nawa_admin=1` (pas de JWT en P1)

## 3. Data / DB
- DatabaseType: none (local-first) → supabase en option
- supabase: url ratmxrzgwsrtswxitmui.supabase.co, anon key dans src/lib/supabase.ts (à migrer vers .env VITE_*). Table `products` (seed_products.sql). Tables futures: orders, contacts, enrollments (voir supabase/migrations/)
- wilayas: src/data/algeriaWilayas.ts (58 wilayas, 6 zones, FREE_SHIPPING=5000 DA)
- catalogue: src/data/brandSite.ts (5 produits, 3 cours, 4 testimonials) + storeData.ts (prix DA, stock)

## 4. Auth
- mode actuel: static disabled (AuthContext stub). Cible: Supabase Auth (signUp/signIn/signOut + onAuthStateChange) avec fallback local si env absent
- routes: /login /signup /dashboard (à réactiver), /admin/orders (public P1, protégé P2)

## 5. QA / Gates
- GatedWorkflow: true — back (server API) → API Gate (health+orders smoke) → front
- QAMode: manual (pas de coverage bloquant en P1)
- ReviewMode: full (bloquant si RED)
- MaxParallel: 3
- Validation: 🟢 bench-validated pour React+Vite+Express (combo custom C3-like)

## 6. Deploy
- frontend: Dockerfile multi-stage node:20-alpine → nginx:alpine, nginx.conf SPA try_files
- backend: server/Dockerfile node:20-alpine EXPOSE 5000
- compose cible: frontend (80) + backend (5000) — remplacer WordPress actuel
- env: VITE_API_URL, VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY (voir .env.example)

## 7. Policies non-bypass
- Pas de route backend inventée côté front (grep server avant fetch)
- URL canonique: /api/v1/{resource-kebab-plural} — toléré /api/* en P1 avec ADR
- Secrets jamais en dur (migrer supabase.ts vers env, garder fallback)
- Idempotence: re-run écrase, pas de doublons d'ordres (id NWT-YYYYMMDD-XXXXX unique)
