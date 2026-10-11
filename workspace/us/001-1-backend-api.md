# US-1 — Backend API complète (server/)
- Entrées: server/src/index.ts (3 GET statiques), server/package.json (express, sans zod)
- Sorties: GET /api/health (+uptime), GET /api/products (5 produits DA + stock), GET /api/courses (3 cours), GET /api/orders + GET /api/orders/:id + POST /api/orders (validation manuelle fullName/phone/wilaya/items, id NWT-*, total recalculé, persist server/data/orders.json), POST /api/contact (name/email/subject/message, persist contacts.json)
- Règles: helmet+cors+json, morgan dev, GET /api/v1 alias + /api canonique P1 (ADR), erreurs FR/AR claires, export app pour tests
- Tests: curl health/products/orders/contact 200; POST invalide → 400
