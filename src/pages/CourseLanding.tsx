import { useTranslation } from 'react-i18next';
import { Play, CheckCircle2, Star, Clock, Users, Award, BookOpen, Video } from 'lucide-react';
import { useState } from 'react';

/**
 * Landing Page Template for Online Courses
 * 
 * HOW TO CUSTOMIZE:
 * 1. Update COURSE_DATA object below with your course details
 * 2. Replace video/image paths
 * 3. Modify curriculum, instructor info, and learning outcomes
 * 4. Adjust colors if needed (currently using brand colors)
 */

// ============================================
// 📝 EDIT THIS SECTION FOR YOUR COURSE
// ============================================
const COURSE_DATA = {
    // Basic Info
    title_ar: 'دورة إتقان Canva للمعلمين',
    title_en: 'Mastering Canva for Teachers',
    subtitle_ar: 'تعلم تصميم محتوى تعليمي احترافي بسهولة',
    subtitle_en: 'Learn to design professional educational content easily',

    // Pricing
    price: 3000, // in DZD
    originalPrice: 5000, // optional, for showing discount
    currency: 'د.ج',
    isFree: false, // set to true for free courses

    // Hero Section
    heroVideo: '/courses/canva-course-intro.mp4', // or use heroImage
    heroImage: '/courses/canva-course-hero.png',
    heroDescription_ar: 'دورة شاملة تعلمك كيفية استخدام Canva لإنشاء عروض تقديمية، أوراق عمل، ومحتوى تعليمي جذاب في دقائق',
    heroDescription_en: 'Comprehensive course teaching you how to use Canva to create presentations, worksheets, and engaging educational content in minutes',

    // Course Stats
    stats: {
        duration: '12 ساعة',
        lessons: '45 درس',
        students: '500+ طالب',
        level: 'مبتدئ إلى متقدم',
        language: 'عربي',
        certificate: true
    },

    // Learning Outcomes (What students will learn)
    outcomes: [
        'إتقان واجهة Canva وجميع أدواتها',
        'تصميم عروض تقديمية احترافية للدروس',
        'إنشاء أوراق عمل وأنشطة تفاعلية',
        'تصميم إنفوجرافيك تعليمي جذاب',
        'إنشاء محتوى لوسائل التواصل الاجتماعي',
        'استخدام القوالب الجاهزة وتخصيصها',
        'تصميم شهادات وبطاقات تحفيزية',
        'تصوير الشاشة وإنشاء فيديوهات تعليمية'
    ],

    // Course Curriculum
    curriculum: [
        {
            module: 'الوحدة الأولى: البداية مع Canva',
            lessons: [
                { title: 'مقدمة عن Canva وإنشاء حساب', duration: '10 دقائق', free: true },
                { title: 'جولة في واجهة Canva', duration: '15 دقائق', free: true },
                { title: 'فهم أنواع التصاميم المختلفة', duration: '12 دقائق', free: false },
                { title: 'استخدام القوالب الجاهزة', duration: '20 دقائق', free: false }
            ]
        },
        {
            module: 'الوحدة الثانية: أساسيات التصميم',
            lessons: [
                { title: 'العمل مع النصوص والخطوط', duration: '18 دقائق', free: false },
                { title: 'إضافة الصور والعناصر', duration: '22 دقائق', free: false },
                { title: 'استخدام الألوان بفعالية', duration: '15 دقائق', free: false },
                { title: 'الطبقات والترتيب', duration: '12 دقائق', free: false }
            ]
        },
        {
            module: 'الوحدة الثالثة: تصميم المحتوى التعليمي',
            lessons: [
                { title: 'تصميم عروض تقديمية للدروس', duration: '30 دقائق', free: false },
                { title: 'إنشاء أوراق عمل تفاعلية', duration: '25 دقائق', free: false },
                { title: 'تصميم إنفوجرافيك تعليمي', duration: '28 دقائق', free: false },
                { title: 'إنشاء بطاقات تعليمية', duration: '20 دقائق', free: false }
            ]
        },
        {
            module: 'الوحدة الرابعة: مشاريع عملية',
            lessons: [
                { title: 'مشروع: تصميم درس كامل', duration: '45 دقائق', free: false },
                { title: 'مشروع: إنشاء محتوى لوسائل التواصل', duration: '35 دقائق', free: false },
                { title: 'مشروع: تصميم شهادة تقدير', duration: '25 دقائق', free: false },
                { title: 'نصائح وأفكار إبداعية', duration: '20 دقائق', free: false }
            ]
        }
    ],

    // Instructor Info
    instructor: {
        name: 'أستاذة سارة أحمد',
        title: 'مصممة تعليمية ومدربة Canva معتمدة',
        bio: 'خبرة 8 سنوات في التصميم التعليمي، ساعدت أكثر من 5000 معلم على تطوير مهاراتهم في التصميم',
        avatar: '👩‍🏫',
        stats: {
            students: '5000+',
            courses: '12',
            rating: 4.9
        }
    },

    // Course Features
    features: [
        {
            icon: '🎥',
            title: 'فيديوهات عالية الجودة',
            desc: 'دروس مسجلة بجودة HD مع شرح واضح'
        },
        {
            icon: '📱',
            title: 'وصول من أي جهاز',
            desc: 'تابع الدورة من الكمبيوتر أو الهاتف'
        },
        {
            icon: '⏰',
            title: 'تعلم بالسرعة التي تناسبك',
            desc: 'محتوى متاح 24/7 مدى الحياة'
        },
        {
            icon: '🏆',
            title: 'شهادة إتمام',
            desc: 'احصل على شهادة بعد إنهاء الدورة'
        },
        {
            icon: '💬',
            title: 'دعم مباشر',
            desc: 'اسأل واحصل على إجابات من المدرب'
        },
        {
            icon: '📚',
            title: 'ملفات قابلة للتحميل',
            desc: 'قوالب وموارد إضافية'
        }
    ],

    // Requirements
    requirements: [
        'لا تحتاج خبرة سابقة في التصميم',
        'جهاز كمبيوتر أو هاتف ذكي',
        'اتصال بالإنترنت',
        'حساب Canva مجاني (سنساعدك في إنشائه)'
    ],

    // Target Audience
    targetAudience: [
        'المعلمون والمعلمات',
        'المدربون والمدربات',
        'أولياء الأمور المهتمون بالتعليم المنزلي',
        'أي شخص يريد تعلم التصميم التعليمي'
    ],

    // Testimonials
    testimonials: [
        {
            name: 'أستاذة نور',
            role: 'معلمة ابتدائي',
            rating: 5,
            text: 'الدورة غيرت طريقة تدريسي تماماً! أصبحت دروسي أكثر جاذبية وتفاعلاً.',
            avatar: '👩‍🏫'
        },
        {
            name: 'أستاذ محمد',
            role: 'معلم ثانوي',
            rating: 5,
            text: 'شرح واضح ومبسط. تعلمت في أسبوع ما كنت أظن أنه يحتاج شهور!',
            avatar: '👨‍🏫'
        },
        {
            name: 'أستاذة فاطمة',
            role: 'مدربة',
            rating: 5,
            text: 'أفضل استثمار في تطوير مهاراتي المهنية. أنصح بها بشدة!',
            avatar: '👩‍💼'
        }
    ],

    // FAQ
    faq: [
        {
            q: 'هل الدورة مناسبة للمبتدئين؟',
            a: 'نعم تماماً! الدورة مصممة للمبتدئين ولا تحتاج أي خبرة سابقة في التصميم.'
        },
        {
            q: 'كم من الوقت أحتاج لإنهاء الدورة؟',
            a: 'يمكنك إنهاء الدورة في أسبوعين بمعدل ساعة يومياً، لكن يمكنك التعلم بالسرعة التي تناسبك.'
        },
        {
            q: 'هل سأحصل على شهادة؟',
            a: 'نعم، ستحصل على شهادة إتمام معتمدة بعد إنهاء جميع الدروس.'
        },
        {
            q: 'هل يمكنني الوصول للدورة مدى الحياة؟',
            a: 'نعم! بمجرد التسجيل، يمكنك الوصول للدورة وجميع التحديثات المستقبلية مدى الحياة.'
        },
        {
            q: 'ماذا لو لم تعجبني الدورة؟',
            a: 'نوفر ضمان استرجاع المال خلال 14 يوم إذا لم تكن راضياً عن الدورة.'
        }
    ]
};

// ============================================
// 🎨 COMPONENT CODE (No need to edit below)
// ============================================

export function CourseLanding() {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const [openModule, setOpenModule] = useState<number | null>(0);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const title = isRTL ? COURSE_DATA.title_ar : COURSE_DATA.title_en;
    const subtitle = isRTL ? COURSE_DATA.subtitle_ar : COURSE_DATA.subtitle_en;
    const heroDesc = isRTL ? COURSE_DATA.heroDescription_ar : COURSE_DATA.heroDescription_en;

    const handleEnroll = () => {
        // TODO: Implement enrollment functionality
        alert(`جاري تسجيلك في دورة: ${title}`);
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

                        {/* Left: Course Info */}
                        <div className="text-center lg:text-right order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 bg-[#f3b942] text-[#340690] px-4 py-2 rounded-full text-sm font-black mb-6">
                                <Video size={16} />
                                دورة تدريبية • Online Course
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

                            {/* Course Stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                    <Clock className="w-6 h-6 mb-2 mx-auto" />
                                    <div className="text-sm text-white/80">المدة</div>
                                    <div className="font-bold">{COURSE_DATA.stats.duration}</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                    <BookOpen className="w-6 h-6 mb-2 mx-auto" />
                                    <div className="text-sm text-white/80">الدروس</div>
                                    <div className="font-bold">{COURSE_DATA.stats.lessons}</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                    <Users className="w-6 h-6 mb-2 mx-auto" />
                                    <div className="text-sm text-white/80">الطلاب</div>
                                    <div className="font-bold">{COURSE_DATA.stats.students}</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                    <Award className="w-6 h-6 mb-2 mx-auto" />
                                    <div className="text-sm text-white/80">شهادة</div>
                                    <div className="font-bold">{COURSE_DATA.stats.certificate ? 'نعم' : 'لا'}</div>
                                </div>
                            </div>

                            {/* Price */}
                            {!COURSE_DATA.isFree && (
                                <div className="flex items-center justify-center lg:justify-end gap-4 mb-8">
                                    {COURSE_DATA.originalPrice && (
                                        <span className="text-2xl text-white/50 line-through">
                                            {COURSE_DATA.originalPrice} {COURSE_DATA.currency}
                                        </span>
                                    )}
                                    <span className="text-5xl font-black text-[#f3b942]">
                                        {COURSE_DATA.price} {COURSE_DATA.currency}
                                    </span>
                                </div>
                            )}

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                                <button
                                    onClick={handleEnroll}
                                    className="bg-[#f3b942] text-[#340690] px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3"
                                >
                                    <Play size={24} />
                                    {COURSE_DATA.isFree ? 'ابدأ الآن مجاناً' : 'سجّل في الدورة'}
                                </button>
                                <button className="bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all border-2 border-white/30">
                                    معاينة مجانية
                                </button>
                            </div>
                        </div>

                        {/* Right: Course Preview */}
                        <div className="order-1 lg:order-2">
                            <div className="relative">
                                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#f3b942]/20 rounded-full blur-3xl"></div>
                                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                                    {COURSE_DATA.heroVideo ? (
                                        <video
                                            controls
                                            poster={COURSE_DATA.heroImage}
                                            className="w-full h-auto rounded-2xl shadow-2xl"
                                        >
                                            <source src={COURSE_DATA.heroVideo} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <img
                                            src={COURSE_DATA.heroImage}
                                            alt={title}
                                            className="w-full h-auto rounded-2xl shadow-2xl"
                                            onError={(e) => {
                                                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e6e3e6" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="%23340690"%3ECourse Preview%3C/text%3E%3C/svg%3E';
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. LEARNING OUTCOMES */}
            <section className="py-24 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-[#340690] mb-4">ماذا ستتعلم؟</h2>
                        <div className="w-16 h-1.5 bg-[#f3b942] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {COURSE_DATA.outcomes.map((outcome, index) => (
                            <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                <span className="text-lg text-gray-700">{outcome}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. COURSE CURRICULUM */}
            <section className="py-24 px-4 bg-muted/30">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-[#340690] mb-4">محتوى الدورة</h2>
                        <div className="w-16 h-1.5 bg-[#f3b942] mx-auto rounded-full"></div>
                        <p className="text-gray-600 mt-4">
                            {COURSE_DATA.curriculum.length} وحدات • {COURSE_DATA.curriculum.reduce((acc, m) => acc + m.lessons.length, 0)} درس
                        </p>
                    </div>

                    <div className="space-y-4">
                        {COURSE_DATA.curriculum.map((module, moduleIndex) => (
                            <div key={moduleIndex} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <button
                                    onClick={() => setOpenModule(openModule === moduleIndex ? null : moduleIndex)}
                                    className="w-full p-6 text-right flex justify-between items-center hover:bg-gray-50 transition-colors"
                                >
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{module.module}</h3>
                                        <p className="text-sm text-gray-600">{module.lessons.length} دروس</p>
                                    </div>
                                    <span className="text-2xl text-[#340690]">{openModule === moduleIndex ? '−' : '+'}</span>
                                </button>

                                {openModule === moduleIndex && (
                                    <div className="border-t border-gray-100">
                                        {module.lessons.map((lesson, lessonIndex) => (
                                            <div key={lessonIndex} className="p-4 border-b border-gray-50 last:border-b-0 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <Play className="w-5 h-5 text-[#340690]" />
                                                    <div>
                                                        <div className="font-medium text-gray-900">{lesson.title}</div>
                                                        {lesson.free && (
                                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">مجاني</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-sm text-gray-600">{lesson.duration}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. COURSE FEATURES */}
            <section className="py-24 px-4">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-black text-[#340690] mb-4">مميزات الدورة</h2>
                        <div className="w-16 h-1.5 bg-[#f3b942] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {COURSE_DATA.features.map((feature, index) => (
                            <div key={index} className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 text-center">
                                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-extrabold text-[#340690] mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. INSTRUCTOR */}
            <section className="py-24 px-4 bg-muted/30">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-[#340690] mb-4">المدرب</h2>
                        <div className="w-16 h-1.5 bg-[#f3b942] mx-auto rounded-full"></div>
                    </div>

                    <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="text-9xl">{COURSE_DATA.instructor.avatar}</div>

                            <div className="flex-1 text-center md:text-right">
                                <h3 className="text-3xl font-black text-gray-900 mb-2">{COURSE_DATA.instructor.name}</h3>
                                <p className="text-xl text-[#340690] font-bold mb-4">{COURSE_DATA.instructor.title}</p>
                                <p className="text-gray-700 leading-relaxed mb-6">{COURSE_DATA.instructor.bio}</p>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-muted/50 rounded-2xl p-4">
                                        <div className="text-2xl font-black text-[#340690]">{COURSE_DATA.instructor.stats.students}</div>
                                        <div className="text-sm text-gray-600">طالب</div>
                                    </div>
                                    <div className="bg-muted/50 rounded-2xl p-4">
                                        <div className="text-2xl font-black text-[#340690]">{COURSE_DATA.instructor.stats.courses}</div>
                                        <div className="text-sm text-gray-600">دورة</div>
                                    </div>
                                    <div className="bg-muted/50 rounded-2xl p-4">
                                        <div className="text-2xl font-black text-[#340690]">{COURSE_DATA.instructor.stats.rating}</div>
                                        <div className="text-sm text-gray-600">تقييم</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. REQUIREMENTS & TARGET AUDIENCE */}
            <section className="py-24 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Requirements */}
                        <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
                            <h3 className="text-2xl font-black text-[#340690] mb-6">المتطلبات</h3>
                            <ul className="space-y-4">
                                {COURSE_DATA.requirements.map((req, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                        <span className="text-gray-700">{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Target Audience */}
                        <div className="bg-gradient-to-br from-[#340690] to-[#5f2cc7] text-white rounded-3xl p-10 shadow-xl">
                            <h3 className="text-2xl font-black mb-6">لمن هذه الدورة؟</h3>
                            <ul className="space-y-4">
                                {COURSE_DATA.targetAudience.map((audience, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#f3b942] flex-shrink-0 mt-1" />
                                        <span className="text-white/90">{audience}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. TESTIMONIALS */}
            {COURSE_DATA.testimonials.length > 0 && (
                <section className="py-24 px-4 bg-muted/30">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black text-[#340690] mb-4">آراء الطلاب</h2>
                            <div className="w-16 h-1.5 bg-[#f3b942] mx-auto rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {COURSE_DATA.testimonials.map((testimonial, index) => (
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

                                    <p className="text-gray-700 leading-relaxed">"{testimonial.text}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 8. FAQ */}
            <section className="py-24 px-4">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-[#340690] mb-4">الأسئلة الشائعة</h2>
                        <div className="w-16 h-1.5 bg-[#f3b942] mx-auto rounded-full"></div>
                    </div>

                    <div className="space-y-4">
                        {COURSE_DATA.faq.map((item, index) => (
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

            {/* 9. FINAL CTA */}
            <section className="relative py-24 px-4 bg-gradient-to-br from-[#340690] to-[#5f2cc7] text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#f3b942]/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

                <div className="container mx-auto text-center relative z-10 max-w-3xl">
                    <h2 className="text-4xl sm:text-5xl font-black mb-6">جاهز للبدء؟</h2>
                    <p className="text-xl text-white/90 mb-10 leading-relaxed">
                        انضم إلى {COURSE_DATA.stats.students} طالب واحترف {title}
                    </p>

                    {!COURSE_DATA.isFree && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-10 border border-white/20">
                            <div className="text-5xl font-black text-[#f3b942] mb-2">
                                {COURSE_DATA.price} {COURSE_DATA.currency}
                            </div>
                            {COURSE_DATA.originalPrice && (
                                <div className="text-xl text-white/60 line-through">
                                    {COURSE_DATA.originalPrice} {COURSE_DATA.currency}
                                </div>
                            )}
                            <p className="text-white/80 mt-4">ضمان استرجاع المال خلال 14 يوم</p>
                        </div>
                    )}

                    <button
                        onClick={handleEnroll}
                        className="bg-[#f3b942] text-[#340690] px-12 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl inline-flex items-center gap-4"
                    >
                        <Play size={28} />
                        {COURSE_DATA.isFree ? 'ابدأ الآن مجاناً' : 'سجّل في الدورة الآن'}
                    </button>
                </div>
            </section>

        </div>
    );
}
