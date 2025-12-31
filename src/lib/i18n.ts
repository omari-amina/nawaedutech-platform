import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        shop: 'Shop',
        courses: 'Courses',
        about: 'Our Story',
        contact: 'Connect',
        login: 'Login',
        signup: 'Join Us',
        dashboard: 'Dashboard',
        logout: 'Logout',
        cart: 'Cart',
      },
      aboutPage: {
        title: 'Our Story',
        subtitle: 'From a small seed of an idea to a platform that empowers minds.',
        storyTitle: 'The Nawa Story',
        storyP1: '"Nawa" means "Nucleus" or "Seed" in Arabic. Every great tree starts as a seed, and every great mind starts with an idea.',
        storyP2: 'We founded NawaEduTech because we saw a gap between potential and tools. Teachers wanted to innovate but lacked time. Students wanted to excel but lacked direction.',
        storyP3: 'We are not just a store. We are a partner in your growth journey.',
        valuesTitle: 'Our Core Values',
        values: {
          innovation: {
            title: 'Innovation',
            desc: 'We create tools that are not just digital, but distinctively smart.'
          },
          empathy: {
            title: 'Empathy',
            desc: 'We design with the heart. We understand the pressure you face.'
          },
          community: {
            title: 'Community',
            desc: 'Education is a shared mission. We grow together.'
          }
        }
      },
      hero: {
        title: 'Education... Organized, Digital, Human.',
        subtitle: 'NawaEduTech: Your partner in organizing thoughts and mastering technology.',
        slogan: 'Where ideas grow and minds elevate',
        ctaShop: 'Explore Tools',
        ctaCourses: 'Start Learning',
        chaosTitle: 'Feeling Overwhelmed?',
        chaosSubtitle: 'Distraction, pressure, and endless tasks...',
        orderTitle: 'From Chaos to Clarity',
        orderSubtitle: 'We help you regain control with smart tools and warm guidance.',
      },
      pillars: {
        title: 'Three Pillars',
        education: {
          title: 'Education',
          subtitle: 'Education built on understanding, not memorization',
          desc: 'Tools that support smart planning, interaction, and cementing knowledge in a fun, human way.'
        },
        organization: {
          title: 'Organization',
          subtitle: 'Order makes the difference',
          desc: 'Planners and templates to help you manage lessons, study, and time with clarity and calm.'
        },
        technology: {
          title: 'Technology',
          subtitle: 'Tech that serves you... not complicates you',
          desc: 'Simple digital solutions designed to be accessible to everyone without overwhelm or distraction.'
        }
      },
      transition: {
        text: 'At Nawa, we believe that a small idea... when organized and nurtured with science and tech, turns into deep impact.',
        tagline: 'Here... ideas grow, and minds elevate.'
      },
      segments: {
        teachers: {
          title: 'For Teachers',
          subtitle: 'Organized education... faster preparation',
          list: ['Lesson Plans', 'Preparation Notebooks', 'Smart Assessment Tools']
        },
        students: {
          title: 'For Students',
          subtitle: 'Organization that reduces anxiety',
          list: ['Study Schedules', 'Trackers', 'Effective Review Templates']
        },
        mothers: {
          title: 'For Mothers',
          subtitle: 'Beautiful education that encourages love',
          list: ['Engaging Tools', 'Designs that motivate the child', 'Fun School Experience']
        }
      },
      products: {
        title: 'Smart tools at the intersection of Education, Organization, and Technology',
        badgeEdu: 'Education',
        badgeOrg: 'Organization',
        badgeTech: 'Tech-powered'
      },
      inspiration: {
        quote: '“Education is a mission... and when supported by order and technology, its impact lasts longer.”',
        cta: 'Start your journey with us'
      },
      finalCta: {
        title: 'Ready for a more organized and smart educational experience?',
        slogan: 'Where ideas grow and minds elevate',
        cta: 'Discover NawaEduTech Now'
      },
      personas: {
        title: 'We Understand You',
        teacher: {
          title: 'The Passionate Teacher',
          desc: 'Looking for time, organization, and creativity to inspire generations.',
        },
        student: {
          title: 'The Ambitious Student',
          desc: 'Under pressure, seeking control, focus, and academic excellence.',
        },
        mother: {
          title: 'The Conscious Mother',
          desc: 'Seeking beauty, motivation, and a bright future for her children.',
        },
      },
      common: {
        learnMore: 'Discover More',
        addToCart: 'Add to Cart',
        enroll: 'Join Course',
        price: 'Price',
        free: 'Free',
        viewDetails: 'View Details',
        loading: 'Loading...',
        error: 'An error occurred',
        success: 'Success',
        currency: 'USD',
        noResults: 'No results found',
      },
      shop: {
        title: 'Curated Educational Tools',
        subtitle: 'Tangible solutions for real-world organization.',
        categories: {
          all: 'All Collections',
          teachers: 'For Teachers',
          students: 'For Students',
          kids: 'For Kids',
        },
        inStock: 'Available',
        outOfStock: 'Sold Out',
      },
      courses: {
        title: 'Digital Mastery Academy',
        subtitle: 'Gain the skills to lead in a digital world.',
        filter: {
          all: 'All Courses',
          free: 'Free Resources',
          paid: 'Premium Courses',
        },
        level: {
          beginner: 'Beginner',
          intermediate: 'Intermediate',
          advanced: 'Advanced',
        },
        duration: 'hours',
        enrolled: 'Enrolled',
        clearFilters: 'Show All Courses',
      },
      // ... keep auth/dashboard/cart/footer as is for now, can be updated later if needed
      auth: {
        login: 'Login to Your Account',
        signup: 'Create New Account',
        email: 'Email',
        password: 'Password',
        fullName: 'Full Name',
        confirmPassword: 'Confirm Password',
        rememberMe: 'Remember me',
        forgotPassword: 'Forgot password?',
        noAccount: "Don't have an account?",
        hasAccount: 'Already have an account?',
        role: 'I am a',
        student: 'Student',
        teacher: 'Teacher',
      },
      dashboard: {
        title: 'My Dashboard',
        myCourses: 'My Courses',
        myOrders: 'My Orders',
        certificates: 'My Certificates',
        profile: 'Profile Settings',
        progress: 'Progress',
        completed: 'Completed',
      },
      cart: {
        title: 'Shopping Cart',
        empty: 'Your cart is empty',
        subtotal: 'Subtotal',
        shipping: 'Shipping',
        total: 'Total',
        checkout: 'Proceed to Checkout',
        continueShopping: 'Continue Shopping',
      },
      contact: {
        title: 'Get in Touch',
        subtitle: 'We are here to help and answer any question you might have.',
        email: 'Email Us',
        phone: 'Call Us',
        office: 'Visit Us',
        faqTitle: 'Have questions?',
        faqButton: 'Visit FAQ',
        formTitle: 'Send us a message',
        name: 'Name',
        emailLabel: 'Email',
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message',
        successMessage: 'Message sent successfully!',
      },
      footer: {
        about: 'NawaEduTech',
        aboutText: 'From nucleus to growth. We build the tools that build the future.',
        quickLinks: 'Navigation',
        contact: 'Talk to Us',
        followUs: 'Join our Community',
        rights: 'All rights reserved',
      },
    },
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        shop: 'المتجر',
        courses: 'الأكاديمية',
        about: 'حكايتنا',
        contact: 'تواصل معنا',
        login: 'دخول',
        signup: 'انضم إلينا',
        dashboard: 'مساحتي',
        logout: 'خروج',
        cart: 'السلة',
      },
      aboutPage: {
        title: 'حكايتنا',
        subtitle: 'من بذرة فكرة صغيرة... إلى منصة تُمكّن العقول وتصنع الأثر.',
        storyTitle: 'قصة نوى',
        storyP1: '"نوى" تعني البذرة أو الجوهر. كل شجرة عظيمة تبدأ ببذرة، وكل عقل عظيم يبدأ بفكرة.',
        storyP2: 'أسسنا NawaEduTech لأننا رأينا فجوة بين الطموح والأدوات. المعلمون يريدون الابتكار لكن ينقصهم الوقت. والطلاب يريدون التفوق لكن تنقصهم الخريطة.',
        storyP3: 'نحن لسنا مجرد متجر. نحن شريك في رحلة نموك.',
        valuesTitle: 'قيمنا الأساسية',
        values: {
          innovation: {
            title: 'الابتكار',
            desc: 'نصنع أدوات ليست رقمية فحسب، بل ذكية ومُلهمة.'
          },
          empathy: {
            title: 'التعاطف',
            desc: 'نصمم بقلبنا. نحن نفهم الضغوط التي تواجهونها يومياً.'
          },
          community: {
            title: 'المجتمع',
            desc: 'التعليم رسالة مشتركة. نحن ننمو معاً.'
          }
        }
      },
      hero: {
        title: 'تعليمٌ أذكى… تنظيمٌ أفضل… بتكنولوجيا تُلهم.',
        subtitle: 'نطوّر في NawaEduTech أدوات تعليمية وتنظيمية ذكية، تجمع بين جمال التصميم وقوة التكنولوجيا، لمساعدة المعلمين والطلاب على تحويل الفوضى إلى نظام، والتعلّم إلى تجربة مُلهمة.',
        slogan: 'حيث تنمو الأفكار وترتقي العقول',
        ctaShop: 'اكتشفي الأدوات الذكية',
        ctaCourses: 'حمّلي نموذجًا مجانيًا',
        chaosTitle: 'هل تشعر بضغط التشتت؟',
        chaosSubtitle: 'فوضى المهام، ضياع الوقت، والشعور بالعجز...',
        orderTitle: 'من الفوضى... إلى النظام',
        orderSubtitle: 'كما تُنبت النواة... نساعدك لتبني أفكارك خطوة بخطوة بأدوات ذكية.',
      },
      pillars: {
        title: 'ثلاث ركائز أساسية',
        education: {
          title: 'التعليم',
          subtitle: 'تعليم يُبنى على الفهم لا الحفظ',
          desc: 'أدوات تفاعلية وخطط دروس تلائم الواقع الجزائري'
        },
        organization: {
          title: 'التنظيم',
          subtitle: 'وداعاً للفوضى',
          desc: 'جداول وتتبع ذكي للمذاكرة والتحضير'
        },
        technology: {
          title: 'التكنولوجيا',
          subtitle: 'ببساطة وإتقان',
          desc: 'حلول رقمية سهلة وبسيطة بدون تعقيد'
        }
      },
      transition: {
        text: 'في نوى، نؤمن أن الفكرة الصغيرة… حين تُنظّم وتُغذّى بالعلم والتقنية، تتحول إلى أثرٍ عميق.',
        tagline: 'حيث تنمو الأفكار وترتقي العقول'
      },
      segments: {
        teachers: {
          title: 'للمعلمين',
          subtitle: 'تعليم منظم… وتحضير أسرع',
          list: ['خطط دروس', 'دفاتر تحضير', 'أدوات تقييم ذكية']
        },
        students: {
          title: 'للطلاب',
          subtitle: 'تنظيم يخفف القلق',
          list: ['جداول مذاكرة', 'Trackers', 'قوالب مراجعة فعالة']
        },
        mothers: {
          title: 'للأمهات',
          subtitle: 'تعليم جميل يشجّع على الحب',
          list: ['أدوات جذابة', 'تصاميم تحفّز الطفل', 'تجربة مدرسية ممتعة']
        }
      },
      products: {
        title: 'أدوات ذكية عند تقاطع التعليم، التنظيم، والتكنولوجيا',
        badgeEdu: 'تعليم',
        badgeOrg: 'تنظيم',
        badgeTech: 'Tech-powered'
      },
      inspiration: {
        quote: '“التعليم رسالة… وحين يُدعّم بالنظام والتقنية، يصبح أثره أبقى.”',
        cta: 'ابدئي رحلتك معنا'
      },
      finalCta: {
        title: 'جاهزة لتجربة تعليم أكثر تنظيمًا وذكاءً؟',
        slogan: 'حيث تنمو الأفكار وترتقي العقول',
        cta: 'اكتشفي NawaEduTech الآن'
      },
      personas: {
        title: 'نحن نفهم ما تحتاج',
        teacher: {
          title: 'للمعلمة الشغوفة',
          desc: 'تبحثين عن الوقت، التنظيم، والإبداع لتلهمي جيل الغد.',
        },
        student: {
          title: 'للطالبة الطموحة',
          desc: 'تحت الضغط؟ نمنحك السيطرة، التركيز، والتفوق الدراسي.',
        },
        mother: {
          title: 'للأم الواعية',
          desc: 'تبحثين عن الجمال والتحفيز لتصنعي مستقبلاً مشرقاً لطفلتك.',
        },
      },
      common: {
        learnMore: 'اكتشف المزيد',
        addToCart: 'أضف لسلتك',
        enroll: 'انضم الآن',
        price: 'السعر',
        free: 'هدية منا',
        viewDetails: 'تصفح التفاصيل',
        loading: 'نجهز لك الأفضل...',
        error: 'عذراً، حدث خطأ بسيط',
        success: 'تم بنجاح',
        currency: 'د.ج',
        noResults: 'لا توجد نتائج',
      },
      shop: {
        title: 'منتجات مُلهمة',
        subtitle: 'حلول ملموسة لتنظيم واقعك اليومي.',
        categories: {
          all: 'كل المجموعات',
          teachers: 'للمعلمين',
          students: 'للطلاب',
          kids: 'للأطفال',
        },
        inStock: 'متوفر',
        outOfStock: 'نفد مؤقتاً',
      },
      courses: {
        title: 'أكاديمية المهارات الرقمية',
        subtitle: 'تعلم بذكاء، وتطور بثقة.',
        filter: {
          all: 'كل المسارات',
          free: 'موارد مجانية',
          paid: 'مسارات متقدمة',
        },
        level: {
          beginner: 'بداية الطريق',
          intermediate: 'خطوة للأمام',
          advanced: 'احتراف',
        },
        duration: 'ساعات',
        enrolled: 'أنت مشترك',
        clearFilters: 'عرض كل الدورات',
      },
      auth: {
        login: 'تسجيل الدخول',
        signup: 'إنشاء حساب جديد',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        fullName: 'الاسم الكامل',
        confirmPassword: 'تأكيد كلمة المرور',
        rememberMe: 'تذكرني',
        forgotPassword: 'نسيت كلمة المرور؟',
        noAccount: 'ليس لديك حساب؟',
        hasAccount: 'لديك حساب بالفعل؟',
        role: 'أنا',
        student: 'طالب',
        teacher: 'معلم',
      },
      dashboard: {
        title: 'مساحتي الخاصة',
        myCourses: 'دروسي',
        myOrders: 'طلباتي',
        certificates: 'إنجازاتي',
        profile: 'إعداداتي',
        progress: 'تقدمي',
        completed: 'أتممتها',
      },
      cart: {
        title: 'سلة مشترياتك',
        empty: 'السلة تنتظر اختياراتك',
        subtotal: 'المجموع المبدئي',
        shipping: 'التوصيل',
        total: 'الإجمالي',
        checkout: 'إتمام الطلب',
        continueShopping: 'تصفح المزيد',
      },
      contact: {
        title: 'تواصل معنا',
        subtitle: 'نحن هنا لسماعك والإجابة على استفساراتك بحب.',
        email: 'راسلنا',
        phone: 'اتصل بنا',
        office: 'زورونا',
        faqTitle: 'لديك أسئلة؟',
        faqButton: 'الأسئلة الشائعة',
        formTitle: 'أرسل لنا رسالة',
        name: 'الاسم',
        emailLabel: 'البريد الإلكتروني',
        subject: 'الموضوع',
        message: 'الرسالة',
        send: 'إرسال الرسالة',
        successMessage: 'تم إرسال رسالتك بنجاح!',
      },
      footer: {
        about: 'نوى إيدوتك',
        aboutText: 'نؤمن أن التعليم رسالة. نحول الأفكار إلى واقع، والفوضى إلى نظام.',
        quickLinks: 'خريطتك',
        contact: 'نحن هنا لأجلك',
        followUs: 'مجتمعنا',
        rights: 'جميع الحقوق محفوظة',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar',
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
