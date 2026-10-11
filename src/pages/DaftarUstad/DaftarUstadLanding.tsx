import React, { useState, useEffect } from 'react';
import styles from './DaftarUstad.module.css';

const DaftarUstadLanding = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(() => {
        document.title = "دفتر الأستاذ الرقمي - الحل الذكي لإدارة الأقسام والنتائج";
    }, []);

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <div className={`${styles.wrapper} ${styles.navContent}`}>
                    <a href="/" className={styles.logo}>Nawa<span>EduTech</span></a>
                    <nav className={styles.navLinks}>
                        <a href="#features">المميزات</a>
                        <a href="#analysis">تحليل النتائج</a>
                        <a href="#pricing">الاشتراك</a>
                    </nav>
                    <a href="#pricing" className={styles.btnCta}>ابدأ الآن</a>
                </div>
            </header>

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.wrapper}>
                    <h1>وداعاً لدفتر التنقيط الورقي.. <br /> مرحباً بـ <span>الذكاء في الإدارة!</span> 📊</h1>
                    <p>البرنامج الأول المصمم خصيصاً للأستاذ الجزائري (ثانوي ومتوسط) لمتابعة التلاميذ، حساب المعدلات تلقائياً، وإنتاج تقارير تحليلية شاملة لنتايجهم بضغطة زر.</p>

                    <div className={styles.heroBtns}>
                        <a href="#pricing" className={`${styles.btnCta} ${styles.heroBtnLarge}`}>
                            احصل على نسختك الآن
                        </a>
                    </div>

                    <img src="/logo-slogan.png" alt="Daftar Ustad Preview" className={styles.heroImage} />
                </div>
            </section>

            {/* Features */}
            <section id="features" className={styles.section}>
                <div className={styles.wrapper}>
                    <h2 className={styles.sectionTitle}>كل ما يحتاجه الأستاذ في مكان واحد</h2>
                    <div className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <i className={`fa-solid fa-users-viewfinder ${styles.featureIcon}`}></i>
                            <h3>متابعة احترافية</h3>
                            <p>تسجيل الغيابات، التأخرات، والملاحظات المستمرة لكل تلميذ مع سجل أكاديمي كامل.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <i className={`fa-solid fa-calculator ${styles.featureIcon}`}></i>
                            <h3>حساب تلقائي للمعدلات</h3>
                            <p>لا تتعب في الحساب! أدخل النقاط والبرنامج يتكفل بحساب المعدل الفصلي وفقاً لآخر التحديثات الوزارية.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <i className={`fa-solid fa-file-export ${styles.featureIcon}`}></i>
                            <h3>استيراد وتصدير (Excel)</h3>
                            <p>استورد قوائم التلاميذ من "رقمنة" مباشرة، وصدر كشوف النقاط والتقارير في ثوانٍ.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Analysis Showcase */}
            <section id="analysis" className={`${styles.section} ${styles.analysisSection}`}>
                <div className={styles.wrapper}>
                    <div className={styles.analysisGrid}>
                        <div className={styles.analysisContent}>
                            <h3>تحليل النتائج.. لم يكن بهذه السهولة قط!</h3>
                            <p className={styles.analysisSub}>
                                حوّل أرقام التلاميذ الجافة إلى رسوم بيانية وتقارير مرئية تساعدك على معرفة مواطن القوة والضعف في أقسامك.
                            </p>
                            <ul>
                                <li><i className="fa-solid fa-circle-check"></i> نسب النجاح لكل قسم (الرتب، المعدلات).</li>
                                <li><i className="fa-solid fa-circle-check"></i> مقارنة النتائج بين الفصول.</li>
                                <li><i className="fa-solid fa-circle-check"></i> تحديد التلاميذ المتعثرين والمتميزين أوتوماتيكياً.</li>
                                <li><i className="fa-solid fa-circle-check"></i> توليد تقارير مجالس الأقسام جاهزة للطباعة.</li>
                            </ul>
                        </div>
                        <div className={styles.analysisVisual}>
                            <img src="/hero-illustration.png" alt="Analysis Preview" className={styles.analysisImg} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className={styles.section}>
                <div className={styles.wrapper}>
                    <h2 className={styles.sectionTitle}>استثمار في راحة بالك ووقتك</h2>
                    <div className={styles.pricingCard}>
                        <div className={styles.priceBadge}>نسخة الأستاذ (ترخيص مدى الحياة)</div>
                        <div className={styles.priceAmount}>2500 <span>دج</span></div>

                        <ul className={styles.pricingList}>
                            <li><i className="fa-solid fa-check"></i> دعم كامل لمراحل المتوسط والثانوي</li>
                            <li><i className="fa-solid fa-check"></i> حساب معدلات 3 فصول</li>
                            <li><i className="fa-solid fa-check"></i> تحديثات دورية (مجاناً)</li>
                            <li><i className="fa-solid fa-check"></i> دعم فني مخصص للأستاذ</li>
                        </ul>

                        <a href="/contact?subject=Daftar%20Ustad" className={styles.btnPrimaryLg}>
                            اطلب تفعيل البرنامج الآن
                        </a>
                        <p className={styles.pricingSubNote}>
                            <i className="fa-solid fa-shield-halved"></i> دفع آمن عبر Baridimob أو CCP
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className={styles.section}>
                <div className={`${styles.wrapper} ${styles.faqWrapper}`}>
                    <h2 className={styles.sectionTitle}>أسئلة شائعة</h2>
                    {[
                        { q: 'هل يعمل البرنامج بدون إنترنت؟', a: 'نعم، البرنامج يعمل بالكامل بدون اتصال بالإنترنت، بياناتك مشفرة ومحفوظة في جهازك فقط.' },
                        { q: 'كيف يمكنني استيراد قوائم التلاميذ من الرقمنة؟', a: 'ببساطة، قم بتنزيل ملف Excel من منصة الرقمنة وارفعه للبرنامج، سيتم ترتيب التلاميذ تلقائياً.' },
                        { q: 'هل يدعم البرنامج حساب المعدلات الجديدة (فروض، تقويم...)؟', a: 'تم تحديث البرنامج ليدعم آخر المنشورات الوزارية الخاصة بحساب المعدلات في جميع المستويات.' }
                    ].map((item, index) => (
                        <div key={index} className={`${styles.faqItem} ${activeIndex === index ? styles.faqActive : ''}`}>
                            <div className={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
                                {item.q}
                                <i className={`fa-solid fa-chevron-${activeIndex === index ? 'up' : 'down'}`}></i>
                            </div>
                            <div className={styles.faqAnswer}>
                                {item.a}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.wrapper}>
                    <p>© 2026 NawaEduTech - طور بكل فخر لدعم الأستاذ الجزائري 🇩🇿</p>
                </div>
            </footer>
        </div>
    );
};

export default DaftarUstadLanding;
