# US-7 — لوحة إدارة بمستوى المتاجر العالمية (/admin)
- الدخول: PIN محلي (`src/lib/adminAuth.ts`, افتراضي 1234، يُغيَّر من الإعدادات) + بوابة `RequireAdmin` + صفحة `/admin/login`. الجلسة sessionStorage (تُغلق بإغلاق التبويب).
- الهيكل: `AdminShell` (sidebar ثابت + topbar موبايل، RTL-aware) + routes: `/admin` dashboard، `/admin/products`، `/admin/orders` (مضمّنة embedded)، `/admin/customers`، `/admin/settings`. المسار القديم `/admin/dashboard` يعرض الجديدة (compat).
- الكتالوج: `src/lib/catalogStore.ts` — دمج الكتالوج المضمّن + تعديلات الإدارة (localStorage `nawaedutech_admin_products`/`_deleted`) + `useBrandProducts/useAdminProducts` (`src/hooks/useCatalog.ts`). الواجهة (Shop/Home/ProductDetail) تقرأ المدمج → تعديلات الإدارة تظهر فورًا. الصور: رفع ملف (dataURL ≤900KB) أو مسار `public/` أو رابط خارجي.
- الداشبورد: KPI (إيراد/طلبات/زبائن/منتجات) + مخطط إيراد 14 يوم + donut الحالات + top منتجات + تنبيهات مخزون + أحدث الطلبات (recharts موجود مسبقًا).
- الزبائن: تجميع من الطلبات (هاتف/اسم/ولاية/عدد/إجمالي) + بحث.
- الإعدادات: اسم المتجر + واتساب + CCP + BaridiMob + عتبة الشحن المجاني (تُقرأ في OrderPage) + تغيير PIN + تصدير/استيراد JSON + استعادة الكتالوج الأصلي.
- Acceptance: build أخضر؛ /admin/* محمية (redirect login)؛ إضافة منتج → يظهر في /shop فورًا؛ تغيير CCP → يظهر في /order؛ تصدير JSON يعمل.
