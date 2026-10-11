# US-5 — i18n FR + fix placeholders
- i18n.ts: ajouter ressource `fr` (copie EN + currency 'DA', nav FR: Accueil/Boutique/Cours/Histoire/Contact). fallbackLng ar. LanguageContext: cycle ar→fr→en, isRTL = lang==='ar', document.dir/lang. Header bouton affiche AR/FR/EN suivant.
- brandSite.ts: SiteLocale 'ar'|'en'|'fr'; resolveLocale: en→en, fr→fr, sinon ar. getLocalizedText fallback: value[locale] ?? value.ar (évite crash sur contenus ar/en uniquement).
- CostCrafterLanding: tally.so/r/placeholder → /order?product=costcrafter-pro ; t.me/placeholder → /contact?subject=CostCrafter ; socials # → /contact.
- DaftarUstadLanding: t.me/placeholder → /contact?subject=DaftarUstad ; placehold.co images → /logo-slogan.png + hero illustration locale (img onError fallback).
- Landings génériques (Printed/Digital/Course): remplacer TODO par addItem(cart)+navigate(/cart) et enroll → /contact?subject=...
