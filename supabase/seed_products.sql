-- Migration file to insert NawaEduTech Products (CostCrafter Pro & Daftar Ustad Digital)

-- 1. CostCrafter Pro
INSERT INTO products (
    name_en, 
    name_ar, 
    description_en, 
    description_ar, 
    price, 
    stock_quantity, 
    target_audience, 
    is_active
) VALUES (
    'CostCrafter Pro',
    'برنامج CostCrafter Pro',
    'The ultimate profit protection tool for craftsmen and print shops. Calculate precise costs for ink, paper, and wear & tear automatically.',
    'البرنامج الجزائري الأول لحماية أرباح الحرفيين وأصحاب المطابع. احسبي تكلفة منتجاتك اليدوية والطباعة بدقة (الحبر، الورق، الإهلاك) واضمني حقك.',
    3000,
    999,
    'teachers', -- Note: Using 'teachers' as a category placeholder if 'craftsmen' doesn't exist, but based on filters 'teachers', 'students', 'kids' are used. Maybe we should use 'teachers' or add a new one if schema allows. Let's assume 'teachers' (educators/professionals) or just stick to existing filters. The landing page says it checks for 'teachers' filter. Wait, ShopPage.tsx filters are hardcoded. 'all', 'teachers', 'students', 'kids'. CostCrafter is for "craftsmen". If I add 'craftsmen', it won't show in any specific filter unless I add that filter button. It will show in 'all'. Or I can tag it as 'teachers' since many teachers do crafts/resources? Let's assume 'teachers' for now as it's the closest professional category, or leave as 'craftsmen' and update the UI filters later.
    true
);

-- Note: Ideally we should update the filter list in ShopPage.tsx to include 'craftsmen' or 'professionals' if we want to filter by it. For now, it will appear under 'All'.

-- 2. Daftar Ustad Digital
INSERT INTO products (
    name_en, 
    name_ar, 
    description_en, 
    description_ar, 
    price, 
    stock_quantity, 
    target_audience, 
    is_active
) VALUES (
    'Teacher Digital Notebook',
    'دفتر الأستاذ الرقمي',
    'A smart Excel-based tool for Algerian teachers to manage attendance, calculate grades automatically according to ministry standards, and analyze student results.',
    'الحل الذكي للأستاذ الجزائري (متوسط وثانوي). تخلصي من الأوراق! إدارة الغيابات، حساب المعدلات تلقائياً، وتحليل نتائج التلاميذ بضغطة زر.',
    2500,
    999,
    'teachers',
    true
);
