import React, { useState, useEffect } from 'react';
import styles from './CostCrafter.module.css';

// Ensure you have FontAwesome loaded in your index.html or layout
// Or you can replace <i> tags with lucide-react icons if available

const CostCrafterLanding = () => {
    // FAQ State
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(() => {
        document.title = "CostCrafter Pro - احمي أرباحك | البرنامج الجزائري الأول للحرفيين";
    }, []);

    return (
        <div className={styles.container}>

            {/* Header */}
            <header className={styles.header}>
                <div className={`${styles.wrapper} ${styles.navContent}`}>
                    <a href="#" className={styles.logo}>Nawa<span>EduTech</span></a>
                    <nav className={styles.navLinks}>
                        <a href="#features">المميزات</a>
                        <a href="#pricing">الأسعار</a>
                        <a href="#how-it-works">طريقة التفعيل</a>
                        <a href="#contact">تواصل معنا</a>
                    </nav>
                    <a href="#pricing" className={styles.btnCta}>اشتري الآن</a>
                </div>
            </header>

            {/* Hero Section */}
            <section className={`${styles.hero} ${styles.reveal}`}>
                <div className={styles.wrapper}>
                    <h1>لا تتركِ أرباحكِ تضيع في <br /> <span>"التكاليف الخفية"!</span> 🛑</h1>
                    <p>البرنامج الجزائري الأول 🇩🇿 المصمم خصيصاً لأصحاب مشاريع الطباعة والأعمال اليدوية.<br />
                        احسبي تكلفة منتجك بالدينار، واديري مخزونك باحترافية، واضمني حقكِ بالمليم.</p>

                    <div className={styles.heroBtns}>
                        <a href="#pricing" className={styles.btnPrimaryLg}>
                            احصل على البرنامج الآن - 3000دج
                            <i className="fa-solid fa-cart-shopping"></i>
                        </a>
                        <a href="#video-demo" className={styles.btnSecondaryLg}>
                            شاهد كيف يعمل
                            <i className="fa-solid fa-play"></i>
                        </a>
                    </div>

                    {/* Video Placeholder - Place video in public/assets folder */}
                    <div id="video-demo" className={styles.videoContainer}>
                        <div className={styles.videoWrapper}>
                            <video controls poster="">
                                <source src="/CostCrafter_Reel_FINAL.mp4" type="video/mp4" />
                                المتصفح لا يدعم الفيديو.
                            </video>
                        </div>
                    </div>
                    <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#fff', opacity: 0.7 }}>
                        <i className="fa-solid fa-shield-halved"></i> صُنع في الجزائر 🇩🇿
                    </div>
                </div>
            </section>

            {/* Pain Points */}
            <section className={styles.section}>
                <div className={styles.wrapper}>
                    <h2 className={styles.sectionTitle}><span>هل تعانين من هذه المشاكل؟</span> 🤔</h2>
                    <div className={styles.painGrid}>
                        <div className={styles.painCard}>
                            <i className={`fa-solid fa-money-bill-wave ${styles.painIcon}`}></i>
                            <h3>التسعير العشوائي</h3>
                            <p>تبيعين كثيراً ولكن جيبك فارغ في نهاية الشهر؟</p>
                        </div>
                        <div className={styles.painCard}>
                            <i className={`fa-solid fa-print ${styles.painIcon}`}></i>
                            <h3>خسارة الآلات</h3>
                            <p>هل تحسبين حق الطابعة التي ستتعطل بعد عام، أم ستدفعين ثمنها من جيبك؟</p>
                        </div>
                        <div className={styles.painCard}>
                            <i className={`fa-solid fa-boxes-stacked ${styles.painIcon}`}></i>
                            <h3>فوضى المخزون</h3>
                            <p>تتفاجئين بنفاذ الورق أو الحبر في منتصف طلبية مستعجلة؟</p>
                        </div>
                        <div className={styles.painCard}>
                            <i className={`fa-solid fa-hourglass-half ${styles.painIcon}`}></i>
                            <h3>ضياع الجهد</h3>
                            <p>هل تأخذين حق وقوفكِ وتعبكِ في القص والتركيب؟</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className={styles.section}>
                <div className={styles.wrapper}>
                    <h2 className={styles.sectionTitle}><span>حولنا "علم المصانع" إلى برنامج بسيط</span> 💎</h2>
                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <i className={`fa-solid fa-calculator ${styles.featureIcon}`}></i>
                            <h3>منطق الطباعة الذكي</h3>
                            <p>حساب دقيق لاستهلاك الحبر والآلة حسب الجودة (نص vs صور) – لن تخسري في الحبر الأصلي بعد اليوم!</p>
                        </div>
                        <div className={styles.featureCard}>
                            <i className={`fa-solid fa-arrow-trend-down ${styles.featureIcon}`}></i>
                            <h3>حساب الإهلاك (Amortization)</h3>
                            <p>البرنامج يحسب أوتوماتيكياً قسط "رأس الطابعة" و"الصيانة" في كل ورقة تبيعينها.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <i className={`fa-solid fa-warehouse ${styles.featureIcon}`}></i>
                            <h3>إدارة مخزون ذكية</h3>
                            <p>الخصم التلقائي للمواد عند كل عملية بيع، مع تنبيهات عند قرب النفاذ.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <i className={`fa-solid fa-palette ${styles.featureIcon}`}></i>
                            <h3>تسعير التصميم</h3>
                            <p>ميزة "توزيع التكلفة" للمنتجات التي تبيعينها بصفة متكررة (مثل البلانر والستيكرز).</p>
                        </div>
                        <div className={styles.featureCard}>
                            <i className={`fa-solid fa-lock ${styles.featureIcon}`}></i>
                            <h3>أمان وخصوصية</h3>
                            <p>يعمل بدون إنترنت (Offline)، وبياناتك محفوظة في جهازك فقط.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section id="how-it-works" className={styles.section} style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className={styles.wrapper}>
                    <h2 className={styles.sectionTitle}><span>ابدئي العمل في 3 خطوات بسيطة</span> 🚀</h2>
                    <div className={styles.stepsContainer}>
                        <div className={styles.stepItem}>
                            <div className={styles.stepNum}>1</div>
                            <h3>الطلب</h3>
                            <p>املئي استمارة الطلب وادفعي عبر Baridimob أو CCP.</p>
                        </div>
                        <div className={styles.stepItem}>
                            <div className={styles.stepNum}>2</div>
                            <h3>الاستلام</h3>
                            <p>سيصلك فوراً ملف يحتوي على رابط البرنامج وتدريب شامل.</p>
                        </div>
                        <div className={styles.stepItem}>
                            <div className={styles.stepNum}>3</div>
                            <h3>التفعيل</h3>
                            <p>افتحي البرنامج، انسخي "رقم الجهاز"، وارسليه لنا عبر تيليجرام.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className={styles.section}>
                <div className={styles.wrapper}>
                    <h2 className={styles.sectionTitle}><span>استثمار صغير.. لربح كبير</span> 💰</h2>

                    <div className={styles.pricingCard}>
                        <div className={styles.badge}>الأكثر مبيعاً 🔥</div>
                        <h3>النسخة الاحترافية</h3>
                        <p style={{ color: '#94a3b8' }}>Lifetime License</p>

                        <div className={styles.priceOld}>5000 DZD</div>
                        <div className={styles.priceNew}>3000<span>دج</span></div>

                        <ul className={styles.featuresList}>
                            <li><i className={`fa-solid fa-check ${styles.checkIcon}`}></i> رخصة مدى الحياة لجهاز واحد</li>
                            <li><i className={`fa-solid fa-check ${styles.checkIcon}`}></i> تحديثات مجانية للمستقبل</li>
                            <li><i className={`fa-solid fa-check ${styles.checkIcon}`}></i> دخول حصري لقناة الشروحات</li>
                            <li><i className={`fa-solid fa-check ${styles.checkIcon}`}></i> دعم فني عبر تيليجرام</li>
                        </ul>

                        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '20px 0' }} />

                        <p style={{ marginBottom: '10px', color: '#e2e8f0' }}>طرق الدفع المتاحة:</p>
                        <div className={styles.paymentIcons}>
                            <span className={styles.paymentBadge}>CCP</span>
                            <span className={styles.paymentBadge}>BaridiMob</span>
                        </div>

                        <a href="https://tally.so/r/placeholder" target="_blank" rel="noreferrer" className={styles.btnPrimaryLg} style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}>
                            اطلبي نسختك الآن
                        </a>
                        <p style={{ fontSize: '0.8rem', marginTop: '10px', color: '#94a3b8' }}>
                            <i className="fa-solid fa-shield"></i> ضمان استعادة الاموال (مشروط)
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className={styles.section}>
                <div className={styles.wrapper} style={{ maxWidth: '800px' }}>
                    <h2 className={styles.sectionTitle}><span>الأسئلة الشائعة</span> ❓</h2>

                    {[
                        {
                            q: 'هل يعمل البرنامج في الهاتف؟',
                            a: 'نعم، يعمل على الكمبيوتر والهاتف (يفضل استخدام شاشة كبيرة للراحة)، ولا يحتاج لإنترنت دائم.'
                        },
                        {
                            q: 'هل الدفع مرة واحدة أم اشتراك شهري؟',
                            a: 'الدفع مرة واحدة فقط وتمتلكين النسخة لمدى الحياة بدون أي رسوم شهرية.'
                        },
                        {
                            q: 'ماذا لو غيرت جهازي؟',
                            a: 'يمكنك نقل الرخصة لجهاز جديد بالتواصل مع الدعم الفني (مجاناً لمرة واحدة).'
                        }
                    ].map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.faqItem} ${activeIndex === index ? styles.faqActive : ''}`}
                        >
                            <div className={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
                                {item.q}
                                <i className={`fa-solid fa-chevron-down ${styles.faqIcon}`}></i>
                            </div>
                            <div className={styles.faqAnswer}>
                                {item.a}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className={styles.footer}>
                <div className={styles.wrapper}>
                    <h2 className={styles.logo} style={{ marginBottom: '20px' }}>Nawa<span>EduTech</span></h2>
                    <div className={styles.socials}>
                        <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#"><i className="fa-brands fa-telegram"></i></a>
                    </div>
                    <p style={{ marginTop: '20px', color: '#94a3b8', fontSize: '0.9rem' }}>
                        © 2026 NawaEduTech. جميع الحقوق محفوظة. <br />
                        صُمم بكل حب لدعم المشاريع الجزائرية 🇩🇿
                    </p>
                </div>
            </footer>

            {/* Floating Telegram Button */}
            <a href="https://t.me/placeholder" className={styles.floatingBtn} target="_blank" rel="noreferrer">
                <i className="fa-brands fa-telegram"></i>
            </a>
        </div>
    );
};

export default CostCrafterLanding;
