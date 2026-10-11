# US-3 — Routage complet
- App.tsx: lazy-import LoginPage/SignupPage/DashboardPage, PrintedProductLanding/DigitalProductLanding/CourseLanding, CostCrafterLanding, DaftarUstadLanding, AdminDashboard. Routes réelles: /login /signup /dashboard /landing/printed-product /landing/digital-product /landing/course /cost-crafter /daftar-ustad /admin (tabs orders+dashboard). Supprimer les 7 Navigate-redirects vers /shop|/contact. Garder * → NotFound.
- Admin: /admin → tabs (Commandes=AdminOrdersPage, Catalogue=AdminDashboard existant) sans header/footer.
- Header nav: ajouter produits phares? Non — garder 5 liens, CTA /contact → /order si panier non vide (P1: garder /contact).
