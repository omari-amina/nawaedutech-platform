# US-2 — Couche API front + intégration commande/contact
- Nouveau: src/lib/api.ts — API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000', timeout 8s, getProducts/getCourses/createOrder/getOrder/createContact/checkHealth, ApiError. Fallback: brandSite/storeData local si fetch échoue.
- OrderPage: POST createOrder en premier; si OK → confirmation avec id serveur; si KO (offline) → localStorage nawaedutech_orders + last_order (comportement actuel conservé). Badge "متصل بالخادم / وضع محلي".
- ContactPage: POST createContact; si OK → toast نجاح; sinon fallback mailto actuel.
- Env: .env.example (VITE_API_URL=...), vite.config lecture auto.
