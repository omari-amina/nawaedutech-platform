# FEAT-001 — Complétion plateforme NawaEduTech

## Contexte
Site React+Vite local-first fonctionnel (home/shop/courses/cart/order/admin-orders) mais inachevé: auth désactivée, landings non routées, placeholders t.me/tally/placehold, backend 3 endpoints statiques, docker-compose WordPress incohérent, pas de FR, contact en mailto uniquement.

## Objectif
Rendre le site livrable: achat complet online+offline, landings actives, auth réelle avec fallback, backend orders/contact, FR minimal, deploy cohérent.

## Scope IN
- US-1 Backend API orders/contact/products/courses (+ persistance fichier)
- US-2 Couche api.ts front + intégration Order/Contact (POST backend, fallback localStorage/mailto)
- US-3 Routage complet (landings, cost-crafter, daftar-ustad, admin dashboard, login/signup/dashboard réactivés)
- US-4 Auth Supabase réelle + fallback + Header état connecté
- US-5 i18n FR + fix placeholders (tally→/order, t.me→/contact, placehold.co→visuels locaux)
- US-6 DevOps (compose front+back, .env.example, supabase migrations orders/contacts)

## Scope OUT
- Paiement en ligne réel (reste COD/CCP/BaridiMob manuel P1)
- RLS Supabase profonde + rôles admin JWT (P2)
- Tests E2E Playwright (opt-in, reporté)

## Acceptance
1. `npm run build` passe (tsc + vite).
2. `GET /api/health`, `POST /api/orders`, `POST /api/contact` répondent 200.
3. Parcours /shop → /cart → /order → /order-confirmation fonctionne backend UP et DOWN (fallback).
4. /landing/*, /cost-crafter, /daftar-ustad affichent contenu (plus de redirect).
5. /login /signup /dashboard accessibles; si Supabase env absent → message clair + mode local.
6. Aucun lien `placeholder` / `placehold.co` restant (grep).
7. `docker compose config` valide avec services frontend+backend.
