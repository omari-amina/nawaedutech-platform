import { useTranslation } from 'react-i18next';
import { ShoppingCart, CheckCircle2, Star, Package, Truck, Shield } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

/**
 * Landing Page Template for Printed Products
 * 
 * HOW TO CUSTOMIZE:
 * 1. Update PRODUCT_DATA object below with your product details
 * 2. Replace image paths in the images array
 * 3. Modify features, benefits, and testimonials arrays
 * 4. Adjust colors if needed (currently using brand colors)
 */

// ============================================
// 📝 EDIT THIS SECTION FOR YOUR PRODUCT
// ============================================
const PRODUCT_DATA = {
    // Basic Info
    title_ar: 'مخطط أسبوعي للمعلم',
    title_en: 'Teacher Weekly Planner',
    subtitle_ar: 'نظّم أسبوعك التعليمي بذكاء واحترافية',
    subtitle_en: 'Organize your teaching week smartly and professionally',

    // Pricing
    price: 1500, // in DZD
    originalPrice: 2000, // optional, for showing discount
    currency: 'د.ج',

    // Hero Section
    heroImage: '/products/teacher-planner-hero.png', // Main product image
    heroDescription_ar: 'مخطط أسبوعي مصمم خصيصاً للمعلمين الجزائريين، يوفر لك 30 دقيقة يومياً من وقت التحضير',
    heroDescription_en: 'Weekly planner designed specifically for Algerian teachers, saves you 30 minutes daily of preparation time',

    // Product Images Gallery
    images: [
        '/products/planner-1.png',
        '/products/planner-2.png',
        '/products/planner-3.png',
        '/products/planner-4.png',
    ],

    // Key Features (3-6 features)
    features: [
        {
            icon: '📅',
            title_ar: 'تخطيط أسبوعي شامل',
            title_en: 'Comprehensive Weekly Planning',
            desc_ar: 'خطط لكل دروسك الأسبوعية في مكان واحد منظم',
            desc_en: 'Plan all your weekly lessons in one organized place'
        },
        {
            icon: '⏰',
            title_ar: 'توفير الوقت',
            title_en: 'Time Saving',
            desc_ar: 'يوفر لك 30 دقيقة يومياً من وقت التحضير',
            desc_en: 'Saves you 30 minutes daily of preparation time'
        },
        {
            icon: '🎯',
            title_ar: 'متوافق مع المنهاج الجزائري',
            title_en: 'Algerian Curriculum Compatible',
            desc_ar: 'مصمم خصيصاً للمعلمين في الجزائر',
            desc_en: 'Designed specifically for teachers in Algeria'
        },
        {
            icon: '✨',
            title_ar: 'تصميم جميل واحترافي',
            title_en: 'Beautiful Professional Design',
            desc_ar: 'تصميم أنيق يحفزك على التنظيم',
            desc_en: 'Elegant design that motivates you to organize'
        }
    ],

    // What's Included
    includes: [
        'صفحات تخطيط أسبوعي (52 أسبوع)',
        'قوالب تحضير الدروس',
        'متتبع الحضور والغياب',
        'صفحات للملاحظات والأفكار',
        'تقويم سنوي شامل',
        'غلاف صلب فاخر'
    ],

    // Product Specifications
    specs: {
        size: 'A4 (21 × 29.7 سم)',
        pages: '120 صفحة',
        paper: 'ورق فاخر 100 جرام',
        binding: 'تجليد حلزوني',
        cover: 'غلاف صلب مقوى'
    },

    // Customer Testimonials (optional)
    testimonials: [
        {
            name: 'أستاذة سارة',
            role: 'معلمة ابتدائي',
            rating: 5,
            text: 'المخطط ساعدني كثيراً في تنظيم وقتي. التصميم رائع والجودة ممتازة!',
            avatar: '👩‍🏫'
        },
        {
            name: 'أستاذ أحمد',
            role: 'معلم متوسط',
            rating: 5,
            text: 'أفضل مخطط استخدمته! وفر لي الكثير من الوقت والجهد.',
            avatar: '👨‍🏫'
        }
    ]
};

// ============================================
// 🎨 COMPONENT CODE (No need to edit below)
// ============================================

export function PrintedProductLanding() {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const { addItem } = useCart();

    const title = isRTL ? PRODUCT_DATA.title_ar : PRODUCT_DATA.title_en;
    const subtitle = isRTL ? PRODUCT_DATA.subtitle_ar : PRODUCT_DATA.subtitle_en;
    const heroDesc = isRTL ? PRODUCT_DATA.heroDescription_ar : PRODUCT_DATA.heroDescription_en;

    const handleAddToCart = () => {
        addItem({ productId: 'printed-weekly-planner', quantity, price: PRODUCT_DATA.price, title: { ar: PRODUCT_DATA.title_ar, en: PRODUCT_DATA.title_en }, productType: 'printed' });
        navigate('/cart');
    };

    return (
        <div className="min-h-screen bg-white font-sans">

            {/* 1. HERO SECTION */}
            <section className="relative py-16 px-4 bg-gradient-to-br from-[#340690] via-[#5f2cc7] to-[#864bf5] text-white overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#f3b942]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

                <div className="container mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left: Product Info */}
                        <div className="text-center lg:text-right order-2 lg:order-1">
                            <div className="inline-block bg-[#f3b942] text-[#340690] px-4 py-2 rounded-full text-sm font-black mb-6">
                                منتج مطبوع • Printed Product
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                                {title}
                            </h1>

                            <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed">
                                {subtitle}
                            </p>

                            <p className="text-lg text-white/80 mb-10 leading-relaxed">
                                {heroDesc}
                            </p>

                            {/* Price */}
                            <div className="flex items-center justify-center lg:justify-end gap-4 mb-8">
                                {PRODUCT_DATA.originalPrice && (
                                    <span className="text-2xl text-white/50 line-through">
                                        {PRODUCT_DATA.originalPrice} {PRODUCT_DATA.currency}
                                    </span>
                                )}
                                <span className="text-5xl font-black text-[#f3b942]">
                                    {PRODUCT_DATA.price} {PRODUCT_DATA.currency}
                                </span>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                                <button
                                    onClick={handleAddToCart}
                                    className="bg-[#f3b942] text-[#340690] px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3"
                                >
                                    <ShoppingCart size={24} />
                                    اطلب الآن
                                </button>
                                <button className="bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all border-2 border-white/30">
                                    تواصل معنا
                                </button>
                            </div>
                        </div>

                        {/* Right: Product Image */}
                        <div className="order-1 lg:order-2">
                            <div className="relative">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#f3b942]/20 rounded-full blur-3xl"></div>
                                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                                    <img
                                        src={PRODUCT_DATA.heroImage}
                                        alt={title}
                                        className="w-full h-auto rounded-2xl shadow-2xl"
                                        onError={(e) => {
                                            // Fallback if image doesn't exist
                                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23e6e3e6" width="400" height="500"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23340690"%3EProduct Image%3C/text%3E%3C/svg%3E';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. TRUST BADGES */}
            <section className="py-12 px-4 bg-muted/30 border-y border-gray-100">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#340690]/10 rounded-full flex items-center justify-center mb-4">
                                <Truck className="w-8 h-8 text-[#340690]" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">توصيل سريع</h3>
                            <p className="text-gray-600">توصيل لجميع ولايات الوطن</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#340690]/10 rounded-full flex items-center justify-center mb-4">
                                <Shield className="w-8 h-8 text-[#340690]" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">ضمان الجودة</h3>
                            <p className="text-gray-600">منتجات عالية الجودة</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#340690]/10 rounded-full flex items-center justify-center mb-4">
                                <Package className="w-8 h-8 text-[#340690]" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">تغليف فاخر</h3>
                            <p className="text-gray-600">تغليف احترافي وآمن</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. KEY FEATURES */}
            <section className="py-24 px-4">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-black text-[#340690] mb-4">المميزات الرئيسية</h2>
                        <div className="w-16 h-1.5 bg-[#f3b942] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {PRODUCT_DATA.features.map((feature, index) => (
                            <div key={index} className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 text-center">
                                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-extrabold text-[#340690] mb-3">
                                    {isRTL ? feature.title_ar : feature.title_en}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {isRTL ? feature.desc_ar : feature.desc_en}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. PRODUCT GALLERY */}
            <section className="py-24 px-4 bg-muted/30">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-[#340690] mb-4">معرض الصور</h2>
                        <div className="w-16 h-1.5 bg-[#f3b942] mx-auto rounded-full"></div>
                    </div>

                    {/* Main Image */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl mb-8">
                        <img
                            src={PRODUCT_DATA.images[selectedImage]}
                            alt={`${title} - صورة ${selectedImage + 1}`}
                            className="w-full h-auto rounded-2xl"
                            onError={(e) => {
                                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23e6e3e6" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="32" fill="%23340690"%3EProduct Image %23' + (selectedImage + 1) + '%3C/text%3E%3C/svg%3E';
                            }}
                        />
                    </div>

                    {/* Thumbnails */}
                    <div className="grid grid-cols-4 gap-4">
                        {PRODUCT_DATA.images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`rounded-2xl overflow-hidden border-4 transition-all ${selectedImage === index
                                        ? 'border-[#340690] shadow-lg scale-105'
                                        : 'border-gray-200 hover:border-[#340690]/50'
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`صورة ${index + 1}`}
                                    className="w-full h-auto"
                                    onError={(e) => {
                                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23e6e3e6" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23340690"%3E' + (index + 1) + '%3C/text%3E%3C/svg%3E';
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. WHAT'S INCLUDED */}
            <section className="py-24 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-[#340690] mb-4">ماذا يتضمن المنتج؟</h2>
                        <div className="w-16 h-1.5 bg-[#f3b942] mx-auto rounded-full"></div>
                    </div>

                    <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {PRODUCT_DATA.includes.map((item, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                    <span className="text-lg text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. SPECIFICATIONS */}
            <section className="py-24 px-4 bg-muted/30">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-[#340690] mb-4">المواصفات التقنية</h2>
                        <div className="w-16 h-1.5 bg-[#f3b942] mx-auto rounded-full"></div>
                    </div>

                    <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {Object.entries(PRODUCT_DATA.specs).map(([key, value], index) => (
                                <div key={index} className="flex justify-between items-center pb-4 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium">{key === 'size' ? 'الحجم' : key === 'pages' ? 'عدد الصفحات' : key === 'paper' ? 'نوع الورق' : key === 'binding' ? 'التجليد' : 'الغلاف'}</span>
                                    <span className="text-gray-900 font-bold">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. TESTIMONIALS */}
            {PRODUCT_DATA.testimonials.length > 0 && (
                <section className="py-24 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black text-[#340690] mb-4">آراء العملاء</h2>
                            <div className="w-16 h-1.5 bg-[#f3b942] mx-auto rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {PRODUCT_DATA.testimonials.map((testimonial, index) => (
                                <div key={index} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="text-5xl">{testimonial.avatar}</div>
                                        <div>
                                            <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
                                            <p className="text-gray-600">{testimonial.role}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-[#f3b942] text-[#f3b942]" />
                                        ))}
                                    </div>

                                    <p className="text-gray-700 leading-relaxed text-lg">"{testimonial.text}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 8. FINAL CTA */}
            <section className="relative py-24 px-4 bg-gradient-to-br from-[#340690] to-[#5f2cc7] text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#f3b942]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

                <div className="container mx-auto text-center relative z-10 max-w-3xl">
                    <h2 className="text-4xl sm:text-5xl font-black mb-6">جاهز للطلب؟</h2>
                    <p className="text-xl text-white/90 mb-10 leading-relaxed">
                        احصل على {title} الآن واستمتع بتجربة تنظيم احترافية
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-12 h-12 bg-white/20 rounded-xl font-bold text-2xl hover:bg-white/30 transition-all"
                        >
                            -
                        </button>
                        <div className="bg-white/20 px-8 py-3 rounded-xl">
                            <span className="text-2xl font-bold">{quantity}</span>
                        </div>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-12 h-12 bg-white/20 rounded-xl font-bold text-2xl hover:bg-white/30 transition-all"
                        >
                            +
                        </button>
                    </div>

                    <div className="text-3xl font-black text-[#f3b942] mb-8">
                        المجموع: {PRODUCT_DATA.price * quantity} {PRODUCT_DATA.currency}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="bg-[#f3b942] text-[#340690] px-12 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl inline-flex items-center gap-4"
                    >
                        <ShoppingCart size={28} />
                        أضف إلى السلة
                    </button>
                </div>
            </section>

        </div>
    );
}
