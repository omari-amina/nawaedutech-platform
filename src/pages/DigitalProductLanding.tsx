import { useTranslation } from 'react-i18next';
import { Download, CheckCircle2, Star, Zap, FileText, Lock } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

/**
 * Landing Page Template for Digital Products
 * 
 * HOW TO CUSTOMIZE:
 * 1. Update PRODUCT_DATA object below with your product details
 * 2. Replace preview images in the images array
 * 3. Modify features, benefits, and file info
 * 4. Adjust colors if needed (currently using brand colors)
 */

// ============================================
// 📝 EDIT THIS SECTION FOR YOUR PRODUCT
// ============================================
const PRODUCT_DATA = {
    // Basic Info
    title_ar: 'قوالب تحضير الدروس الرقمية',
    title_en: 'Digital Lesson Planning Templates',
    subtitle_ar: 'قوالب جاهزة قابلة للتعديل توفر لك ساعات من العمل',
    subtitle_en: 'Ready-made editable templates that save you hours of work',

    // Pricing
    price: 500, // in DZD
    originalPrice: 800, // optional, for showing discount
    currency: 'د.ج',

    // Hero Section
    heroImage: '/products/digital-templates-hero.png',
    heroDescription_ar: 'مجموعة شاملة من القوالب الرقمية المصممة خصيصاً للمعلمين، قابلة للتعديل بسهولة على Word و PDF',
    heroDescription_en: 'Comprehensive collection of digital templates designed specifically for teachers, easily editable in Word and PDF',

    // Preview Images
    images: [
        '/products/template-preview-1.png',
        '/products/template-preview-2.png',
        '/products/template-preview-3.png',
        '/products/template-preview-4.png',
    ],

    // Key Features
    features: [
        {
            icon: '⚡',
            title_ar: 'تحميل فوري',
            title_en: 'Instant Download',
            desc_ar: 'احصل على المنتج فوراً بعد الدفع',
            desc_en: 'Get the product instantly after payment'
        },
        {
            icon: '✏️',
            title_ar: 'قابل للتعديل',
            title_en: 'Fully Editable',
            desc_ar: 'عدّل كل شيء حسب احتياجاتك',
            desc_en: 'Edit everything according to your needs'
        },
        {
            icon: '🎨',
            title_ar: 'تصميم احترافي',
            title_en: 'Professional Design',
            desc_ar: 'تصاميم جميلة وجاهزة للاستخدام',
            desc_en: 'Beautiful designs ready to use'
        },
        {
            icon: '♾️',
            title_ar: 'استخدام غير محدود',
            title_en: 'Unlimited Use',
            desc_ar: 'استخدم القوالب بدون حدود',
            desc_en: 'Use templates without limits'
        }
    ],

    // What's Included
    includes: [
        '20 قالب تحضير دروس (Word + PDF)',
        '10 قوالب تقييم وامتحانات',
        '5 قوالب تتبع تقدم الطلاب',
        'دليل استخدام شامل',
        'تحديثات مجانية مدى الحياة',
        'دعم فني عبر البريد الإلكتروني'
    ],

    // File Information
    fileInfo: {
        format: 'Word (.docx) + PDF',
        size: '25 MB',
        files: '35 ملف',
        compatibility: 'Windows, Mac, Mobile',
        language: 'عربي + إنجليزي'
    },

    // Benefits
    benefits: [
        {
            title_ar: 'وفّر وقتك',
            desc_ar: 'بدلاً من قضاء ساعات في التصميم، استخدم قوالب جاهزة وركز على التدريس'
        },
        {
            title_ar: 'احترافية عالية',
            desc_ar: 'قوالب مصممة باحترافية تعطي انطباعاً ممتازاً'
        },
        {
            title_ar: 'سهولة الاستخدام',
            desc_ar: 'لا تحتاج خبرة تقنية، فقط افتح وعدّل'
        },
        {
            title_ar: 'متوافق مع المنهاج',
            desc_ar: 'مصمم خصيصاً للمنهاج الجزائري'
        }
    ],

    // FAQ
    faq: [
        {
            q: 'كيف أحصل على المنتج بعد الشراء؟',
            a: 'ستحصل على رابط تحميل فوري بعد إتمام عملية الدفع عبر البريد الإلكتروني'
        },
        {
            q: 'هل يمكنني استخدام القوالب على الهاتف؟',
            a: 'نعم، القوالب متوافقة مع جميع الأجهزة (كمبيوتر، تابلت، هاتف)'
        },
        {
            q: 'هل التحديثات مجانية؟',
            a: 'نعم، جميع التحديثات المستقبلية مجانية تماماً'
        },
        {
            q: 'ماذا لو واجهت مشكلة؟',
            a: 'نوفر دعم فني عبر البريد الإلكتروني للرد على جميع استفساراتك'
        }
    ],

    // Testimonials
    testimonials: [
        {
            name: 'أستاذة ليلى',
            role: 'معلمة ثانوي',
            rating: 5,
            text: 'القوالب وفرت علي الكثير من الوقت! التصميم رائع وسهل التعديل.',
            avatar: '👩‍🏫'
        },
        {
            name: 'أستاذ كريم',
            role: 'معلم ابتدائي',
            rating: 5,
            text: 'أفضل استثمار قمت به! القوالب احترافية جداً.',
            avatar: '👨‍🏫'
        }
    ]
};

// ============================================
// 🎨 COMPONENT CODE (No need to edit below)
// ============================================

export function DigitalProductLanding() {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const [selectedImage, setSelectedImage] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const navigate = useNavigate();
    const { addItem } = useCart();

    const title = isRTL ? PRODUCT_DATA.title_ar : PRODUCT_DATA.title_en;
    const subtitle = isRTL ? PRODUCT_DATA.subtitle_ar : PRODUCT_DATA.subtitle_en;
    const heroDesc = isRTL ? PRODUCT_DATA.heroDescription_ar : PRODUCT_DATA.heroDescription_en;

    const handlePurchase = () => {
        addItem({ productId: 'digital-lesson-templates', quantity: 1, price: PRODUCT_DATA.price, title: { ar: PRODUCT_DATA.title_ar, en: PRODUCT_DATA.title_en }, productType: 'digital' });
        navigate('/order');
    };

    return (
        <div className="min-h-screen bg-white font-sans">

            {/* 1. HERO SECTION */}
            <section className="relative py-16 px-4 bg-gradient-to-br from-[#5f2cc7] via-[#864bf5] to-[#340690] text-white overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#f3b942]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

                <div className="container mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left: Product Info */}
                        <div className="text-center lg:text-right order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 bg-[#f3b942] text-[#340690] px-4 py-2 rounded-full text-sm font-black mb-6">
                                <Zap size={16} />
                                منتج رقمي • تحميل فوري
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
                                    onClick={handlePurchase}
                                    className="bg-[#f3b942] text-[#340690] px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3"
                                >
                                    <Download size={24} />
                                    اشترِ وحمّل الآن
                                </button>
                                <button className="bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all border-2 border-white/30">
                                    معاينة مجانية
                                </button>
                            </div>

                            {/* Trust Badge */}
                            <div className="mt-8 flex items-center justify-center lg:justify-end gap-2 text-white/80">
                                <Lock size={20} />
                                <span className="text-sm">دفع آمن ومشفر 100%</span>
                            </div>
                        </div>

                        {/* Right: Product Preview */}
                        <div className="order-1 lg:order-2">
                            <div className="relative">
                                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#f3b942]/20 rounded-full blur-3xl"></div>
                                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                                    <img
                                        src={PRODUCT_DATA.heroImage}
                                        alt={title}
                                        className="w-full h-auto rounded-2xl shadow-2xl"
                                        onError={(e) => {
                                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23e6e3e6" width="400" height="500"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23340690"%3EDigital Product%3C/text%3E%3C/svg%3E';
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
                                <Zap className="w-8 h-8 text-[#340690]" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">تحميل فوري</h3>
                            <p className="text-gray-600">احصل على المنتج فوراً</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#340690]/10 rounded-full flex items-center justify-center mb-4">
                                <Lock className="w-8 h-8 text-[#340690]" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">دفع آمن</h3>
                            <p className="text-gray-600">معاملات مشفرة 100%</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-[#340690]/10 rounded-full flex items-center justify-center mb-4">
                                <FileText className="w-8 h-8 text-[#340690]" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">تحديثات مجانية</h3>
                            <p className="text-gray-600">تحديثات مدى الحياة</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. KEY FEATURES */}
            <section className="py-24 px-4">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-black text-[#340690] mb-4">لماذا هذا المنتج؟</h2>
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

            {/* 4. PREVIEW GALLERY */}
            <section className="py-24 px-4 bg-muted/30">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-[#340690] mb-4">معاينة القوالب</h2>
                        <div className="w-16 h-1.5 bg-[#f3b942] mx-auto rounded-full"></div>
                    </div>

                    {/* Main Preview */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl mb-8">
                        <img
                            src={PRODUCT_DATA.images[selectedImage]}
                            alt={`${title} - معاينة ${selectedImage + 1}`}
                            className="w-full h-auto rounded-2xl"
                            onError={(e) => {
                                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23e6e3e6" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="32" fill="%23340690"%3ETemplate Preview %23' + (selectedImage + 1) + '%3C/text%3E%3C/svg%3E';
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
                                    alt={`معاينة ${index + 1}`}
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
                        <h2 className="text-4xl font-black text-[#340690] mb-4">ماذا ستحصل عليه؟</h2>
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

            {/* 6. FILE INFO */}
            <section className="py-24 px-4 bg-muted/30">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-[#340690] mb-4">معلومات الملف</h2>
                        <div className="w-16 h-1.5 bg-[#f3b942] mx-auto rounded-full"></div>
                    </div>

                    <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {Object.entries(PRODUCT_DATA.fileInfo).map(([key, value], index) => (
                                <div key={index} className="flex justify-between items-center pb-4 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium">
                                        {key === 'format' ? 'الصيغة' :
                                            key === 'size' ? 'الحجم' :
                                                key === 'files' ? 'عدد الملفات' :
                                                    key === 'compatibility' ? 'التوافق' : 'اللغة'}
                                    </span>
                                    <span className="text-gray-900 font-bold">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. BENEFITS */}
            <section className="py-24 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-[#340690] mb-4">الفوائد التي ستحصل عليها</h2>
                        <div className="w-16 h-1.5 bg-[#f3b942] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {PRODUCT_DATA.benefits.map((benefit, index) => (
                            <div key={index} className="bg-gradient-to-br from-[#340690] to-[#5f2cc7] text-white p-8 rounded-3xl shadow-xl">
                                <h3 className="text-2xl font-black mb-4">{benefit.title_ar}</h3>
                                <p className="text-lg text-white/90 leading-relaxed">{benefit.desc_ar}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. FAQ */}
            <section className="py-24 px-4 bg-muted/30">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-[#340690] mb-4">الأسئلة الشائعة</h2>
                        <div className="w-16 h-1.5 bg-[#f3b942] mx-auto rounded-full"></div>
                    </div>

                    <div className="space-y-4">
                        {PRODUCT_DATA.faq.map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full p-6 text-right flex justify-between items-center hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-lg font-bold text-gray-900">{item.q}</span>
                                    <span className="text-2xl text-[#340690]">{openFaq === index ? '−' : '+'}</span>
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 pb-6">
                                        <p className="text-gray-700 leading-relaxed">{item.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. TESTIMONIALS */}
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

            {/* 10. FINAL CTA */}
            <section className="relative py-24 px-4 bg-gradient-to-br from-[#340690] to-[#5f2cc7] text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#f3b942]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

                <div className="container mx-auto text-center relative z-10 max-w-3xl">
                    <h2 className="text-4xl sm:text-5xl font-black mb-6">جاهز للبدء؟</h2>
                    <p className="text-xl text-white/90 mb-10 leading-relaxed">
                        احصل على {title} الآن وابدأ بتوفير وقتك فوراً
                    </p>

                    <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-10 border border-white/20">
                        <div className="text-5xl font-black text-[#f3b942] mb-2">
                            {PRODUCT_DATA.price} {PRODUCT_DATA.currency}
                        </div>
                        {PRODUCT_DATA.originalPrice && (
                            <div className="text-xl text-white/60 line-through">
                                {PRODUCT_DATA.originalPrice} {PRODUCT_DATA.currency}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handlePurchase}
                        className="bg-[#f3b942] text-[#340690] px-12 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl inline-flex items-center gap-4"
                    >
                        <Download size={28} />
                        اشترِ وحمّل الآن
                    </button>

                    <p className="mt-6 text-white/70 text-sm flex items-center justify-center gap-2">
                        <Lock size={16} />
                        دفع آمن ومشفر • تحميل فوري
                    </p>
                </div>
            </section>

        </div>
    );
}
