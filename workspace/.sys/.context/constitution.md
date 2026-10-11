# Constitution — NawaEduTech (SDD-Pro)

## §1 Vision
Plateforme algérienne (AR-first, RTL) qui vend produits imprimés/numériques + cours appliqués, avec checkout COD/CCP/BaridiMob sur 58 wilayas, sans friction d'auth.

## §2 Principes (anti-derive)
1. Local-first: tout achat possible sans compte; localStorage = source P1.
2. Backend en renfort: API Express optionnelle (VITE_API_URL); fallback local si offline.
3. AR par défaut; EN complet; FR progressif (labels wilaya/paiement déjà FR).
4. Pas de placeholder visible: tout lien t.me/tally/placehold.co remplacé par route interne ou contact réel.
5. Prix en DA partout (formatPrice fr-DZ).

## §3 Glossaire
- FEAT-001: complétion plateforme. US-1..6 ci-dessous.
- Order id: NWT-YYYYMMDD-XXXXX. Free shipping >= 5000 DA.
- Produits phares: CostCrafter Pro 3000 DA, Daftar Ustad 2500 DA.

## §7 Contexte FEAT-001 (elicitor)
- Risque majeur: docker-compose WordPress ≠ code réel → corriger en P1.
- Risque 2: AuthContext stub + routes /login→/contact = pages mortes → réactiver avec Supabase réel + fallback.
- Risque 3: images /images/products/*.jpg absentes (1 seule png) → fallback visuel par initiale + gradient.
