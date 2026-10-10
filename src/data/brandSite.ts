export type SiteLocale = 'ar' | 'en';

export type LocalizedText = {
  ar: string;
  en: string;
};

export type LocalizedList = {
  ar: string[];
  en: string[];
};

export interface SiteNavItem {
  href: string;
  label: LocalizedText;
}

export interface SiteMetric {
  value: LocalizedText;
  label: LocalizedText;
  description: LocalizedText;
}

export interface SiteFeature {
  id: string;
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
}

export interface ProductItem {
  id: string;
  slug: string;
  accent: string;
  category: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  price: LocalizedText;
  audience: LocalizedText;
  highlights: LocalizedList;
  image?: string;
}

export interface CourseModule {
  title: LocalizedText;
  points: LocalizedList;
}

export interface CourseItem {
  id: string;
  slug: string;
  accent: string;
  badge: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  duration: LocalizedText;
  level: LocalizedText;
  format: LocalizedText;
  price: LocalizedText;
  outcomes: LocalizedList;
  modules: CourseModule[];
}

export interface TestimonialItem {
  name: LocalizedText;
  role: LocalizedText;
  quote: LocalizedText;
}

export interface ValueItem {
  title: LocalizedText;
  description: LocalizedText;
}

export interface ContactMethod {
  title: LocalizedText;
  value: LocalizedText;
  href: string;
  hint: LocalizedText;
}

export interface FaqItem {
  question: LocalizedText;
  answer: LocalizedText;
}

export const siteNavigation: SiteNavItem[] = [
  { href: '/', label: { ar: 'الرئيسية', en: 'Home' } },
  { href: '/shop', label: { ar: 'المنتجات', en: 'Products' } },
  { href: '/courses', label: { ar: 'الدورات', en: 'Courses' } },
  { href: '/about', label: { ar: 'من نحن', en: 'About' } },
  { href: '/contact', label: { ar: 'تواصل', en: 'Contact' } },
];

export const siteMetrics: SiteMetric[] = [
  {
    value: { ar: 'هوية جزائرية', en: 'Algerian identity' },
    label: { ar: 'قريبة من المدرسة الحديثة', en: 'Built for the modern school' },
    description: {
      ar: 'نطوّر حلولًا تربوية وتنظيمية تنطلق من واقع المعلمين والطلاب في الجزائر.',
      en: 'We build educational and organizational solutions rooted in the real needs of teachers and students in Algeria.',
    },
  },
  {
    value: { ar: 'مطبوعة ورقمية', en: 'Printable and digital' },
    label: { ar: 'أدوات جاهزة وعملية', en: 'Ready and practical tools' },
    description: {
      ar: 'من الوسائل الصفية إلى البلانرات والباقات الرقمية، كل ما نقدمه مصمم ليوفر الوقت ويزيد الوضوح.',
      en: 'From classroom tools to planners and digital bundles, everything we offer is designed to save time and increase clarity.',
    },
  },
  {
    value: { ar: 'للعائلة التعليمية', en: 'For the learning family' },
    label: { ar: 'معلمون وطلاب وأولياء أمور', en: 'Teachers, students, and parents' },
    description: {
      ar: 'نخاطب من يصنع أثر التعلم يوميًا: المعلمة، الطالب، وليّ الأمر، وكل من يبحث عن تنظيم أذكى وتعليم أجمل.',
      en: 'We serve the people shaping learning every day: teachers, students, parents, and anyone seeking smarter organization and better learning.',
    },
  },
];

export const homeFeatures: SiteFeature[] = [
  {
    id: 'teachers',
    eyebrow: { ar: 'للمعلمة والأستاذ', en: 'For teachers' },
    title: { ar: 'وسائل تعليمية تختصر وقت التحضير', en: 'Teaching tools that shorten prep time' },
    description: {
      ar: 'نقدّم حقائب ووسائل جاهزة تساعدك على جعل القسم أكثر تفاعلًا دون استنزاف وقتك وجهدك في التحضير اليومي.',
      en: 'We provide ready-to-use kits and teaching tools that make the classroom more engaging without draining your time and energy.',
    },
  },
  {
    id: 'students',
    eyebrow: { ar: 'للطلبة', en: 'For students' },
    title: { ar: 'أدوات تنظيم ومراجعة تخفف القلق', en: 'Planning tools that reduce study stress' },
    description: {
      ar: 'بلانرات وخطط مراجعة تساعد الطالبة على تحويل التشتت إلى وضوح، والضغط إلى خطوات قابلة للتنفيذ.',
      en: 'Planners and revision systems help students turn overwhelm into clarity and pressure into practical steps.',
    },
  },
  {
    id: 'families',
    eyebrow: { ar: 'للأسرة التعليمية', en: 'For families' },
    title: { ar: 'منتجات جميلة تشجع على حب التعلّم', en: 'Beautiful products that encourage learning' },
    description: {
      ar: 'نهتم بأن تكون الأدوات مفيدة وملهمة بصريًا في الوقت نفسه، لأن الجمال في التعليم جزء من الأثر وليس تفصيلًا ثانويًا.',
      en: 'We believe learning tools should be useful and visually inspiring at the same time, because beauty is part of educational impact.',
    },
  },
];

export const journeySteps: SiteFeature[] = [
  {
    id: 'discover',
    eyebrow: { ar: '01', en: '01' },
    title: { ar: 'اكتشفي ما يناسبك', en: 'Discover what fits you' },
    description: {
      ar: 'تعرّفي على الفئة الأقرب لك: معلمة، طالبة، أو وليّة أمر، ثم اكتشفي الحلول المناسبة لها.',
      en: 'Start with the audience that fits you best, then explore the products and courses designed for that need.',
    },
  },
  {
    id: 'choose',
    eyebrow: { ar: '02', en: '02' },
    title: { ar: 'اختاري بثقة', en: 'Choose with confidence' },
    description: {
      ar: 'نوضح لك الفائدة والفئة والاستخدام العملي حتى يكون القرار أسهل وأقرب لواقعك.',
      en: 'We clarify the value, audience, and practical use so the decision feels easier and closer to your reality.',
    },
  },
  {
    id: 'act',
    eyebrow: { ar: '03', en: '03' },
    title: { ar: 'ابدئي الخطوة التالية', en: 'Take the next step' },
    description: {
      ar: 'اطلبي المنتج أو اسألي عن الدورة أو الباقة المناسبة، وسنوجّهك إلى الخيار الأنسب لك.',
      en: 'Request the product, course, or bundle you need, and we will guide you to the option that fits best.',
    },
  },
];

export const brandProducts: ProductItem[] = [
  {
    id: 'smart-teaching-kit',
    slug: 'smart-teaching-kit',
    accent: '#310b82',
    category: { ar: 'حقيبة تعليمية', en: 'Teaching kit' },
    title: { ar: 'حقيبة الوسائل التعليمية الذكية', en: 'Smart Teaching Tools Kit' },
    summary: {
      ar: 'وسائل مطبوعة وجاهزة للاستخدام صممت للمعلمة العصرية التي تريد قسماً تفاعلياً دون عناء تحضير طويل.',
      en: 'Ready-to-use printable classroom tools designed for modern teachers who want engaging lessons without heavy prep work.',
    },
    price: { ar: 'حسب الباقة', en: 'Custom quote' },
    audience: { ar: 'للمعلمات والأساتذة', en: 'For teachers and educators' },
    highlights: {
      ar: ['جاهزة للاستخدام', 'ملائمة للمنهاج الجزائري', 'توفّر وقت التحضير'],
      en: ['Ready to use', 'Aligned with Algerian classrooms', 'Saves prep time'],
    },
  },
  {
    id: 'bac-planner',
    slug: 'bac-planner',
    accent: '#5b2bbf',
    category: { ar: 'بلانر دراسي', en: 'Study planner' },
    title: { ar: 'بلانر البكالوريا + خطة مراجعة 30 يوم', en: 'Baccalaureate Planner + 30-Day Revision Plan' },
    summary: {
      ar: 'حل عملي لطالبة البكالوريا يساعدها على تنظيم المراجعة وتقليل القلق وبناء خطة واضحة للنجاح.',
      en: 'A practical product that helps baccalaureate students organize revision, reduce stress, and build a clear path to success.',
    },
    price: { ar: 'حسب النسخة', en: 'By edition' },
    audience: { ar: 'لطالبات البكالوريا', en: 'For baccalaureate students' },
    highlights: {
      ar: ['خطة مراجعة جاهزة', 'تنظيم واضح', 'تصميم محفز'],
      en: ['Ready revision plan', 'Clear organization', 'Motivating design'],
    },
  },
  {
    id: 'university-balance-kit',
    slug: 'university-balance-kit',
    accent: '#d58a00',
    category: { ar: 'باقة جامعية', en: 'University bundle' },
    title: { ar: 'باقة التوازن الجامعي', en: 'University Balance Bundle' },
    summary: {
      ar: 'باقة للطالبة الجامعية تساعدها على تنظيم الوقت والميزانية والحياة الدراسية بطريقة عملية وأنيقة.',
      en: 'A bundle for university students to organize time, budget, and academic life in a practical and elegant way.',
    },
    price: { ar: 'حسب الباقة', en: 'Bundle pricing' },
    audience: { ar: 'للطالبات الجامعيات', en: 'For university students' },
    highlights: {
      ar: ['تنظيم الوقت', 'إدارة الميزانية', 'هدية رقمية إضافية'],
      en: ['Time planning', 'Budget organization', 'Bonus digital gift'],
    },
    image: '/products/printed/writing-notebook-inner.png',
  },
  {
    id: 'teacher-ai-pack',
    slug: 'teacher-ai-pack',
    accent: '#0f9d76',
    category: { ar: 'باقة رقمية', en: 'Digital bundle' },
    title: { ar: 'باقة أدوات الذكاء الاصطناعي للمعلم', en: 'AI Tools Bundle for Teachers' },
    summary: {
      ar: 'قوالب وشروحات عملية تساعد الأستاذ على استخدام أدوات الذكاء الاصطناعي في التحضير والتدريس بذكاء أكبر.',
      en: 'Templates and practical tutorials that help teachers use AI tools more effectively in lesson prep and delivery.',
    },
    price: { ar: 'حسب الباقة', en: 'Custom quote' },
    audience: { ar: 'للأساتذة المهتمين بالتقنية', en: 'For tech-forward teachers' },
    highlights: {
      ar: ['شروحات عملية', 'قوالب جاهزة', 'تقليل وقت البحث'],
      en: ['Practical tutorials', 'Ready-made templates', 'Less research time'],
    },
  },
  {
    id: 'happy-school-box',
    slug: 'happy-school-box',
    accent: '#e67e8c',
    category: { ar: 'صندوق مدرسي', en: 'School box' },
    title: { ar: 'صندوق السعادة الدراسي', en: 'School Joy Box' },
    summary: {
      ar: 'مجموعة أدوات مدرسية جميلة ومنسقة صممت لتشجيع الطفل على الدراسة وإسعاد وليّة الأمر عند الاختيار.',
      en: 'A curated box of beautiful school supplies designed to encourage children to enjoy learning and make parents happy with their choice.',
    },
    price: { ar: 'حسب الصندوق', en: 'Box pricing' },
    audience: { ar: 'لأولياء الأمور والأطفال', en: 'For parents and children' },
    highlights: {
      ar: ['تصميم كيوت', 'تجربة فتح ممتعة', 'هدية تعليمية مميزة'],
      en: ['Cute design', 'Delightful unboxing', 'A special educational gift'],
    },
  },
];

export const brandCourses: CourseItem[] = [
  {
    id: 'interactive-classroom',
    slug: 'interactive-classroom',
    accent: '#310b82',
    badge: { ar: 'ورشة تطبيقية', en: 'Applied workshop' },
    title: { ar: 'استراتيجيات التعليم التفاعلي للمعلمة العصرية', en: 'Interactive Teaching Strategies for Modern Educators' },
    summary: {
      ar: 'ورشة عملية تساعد المعلمة على تصميم أنشطة ووسائل تجعل القسم أكثر حيوية وتنظيماً وارتباطاً بالتعلّم.',
      en: 'A practical workshop that helps educators design activities and teaching tools that make the classroom more engaging and organized.',
    },
    duration: { ar: '4 أسابيع', en: '4 weeks' },
    level: { ar: 'مبتدئ إلى متوسط', en: 'Beginner to intermediate' },
    format: { ar: 'فيديو + ملفات تطبيقية', en: 'Video + practical files' },
    price: { ar: 'عند فتح التسجيل', en: 'When enrollment opens' },
    outcomes: {
      ar: ['تصميم قسم أكثر تفاعلاً', 'اختصار وقت التحضير', 'تحويل الأفكار إلى وسائل جاهزة للتطبيق'],
      en: ['Create a more interactive classroom', 'Reduce prep time', 'Turn ideas into ready-to-use teaching tools'],
    },
    modules: [
      {
        title: { ar: 'فهم احتياجات المتعلم داخل القسم', en: 'Understand the learner inside the classroom' },
        points: {
          ar: ['تحليل لحظات التشتت', 'تحديد ما يجعل الحصة أكثر جذبًا', 'ربط أهداف الدرس بالشكل البصري'],
          en: ['Analyze moments of distraction', 'Identify what makes lessons more engaging', 'Connect lesson goals to visual structure'],
        },
      },
      {
        title: { ar: 'تصميم أنشطة وتدفقات صفية', en: 'Design classroom activities and flows' },
        points: {
          ar: ['أنشطة افتتاحية محفزة', 'إدارة انتقالات الحصة', 'أدوات تقييم سريعة وواضحة'],
          en: ['Motivating opening activities', 'Manage lesson transitions', 'Fast and clear assessment tools'],
        },
      },
      {
        title: { ar: 'بناء حقيبة وسائل قابلة للتكرار', en: 'Build a repeatable teaching kit' },
        points: {
          ar: ['قوالب استخدام يومية', 'ترتيب الوسائل بذكاء', 'خطة تنفيذ عملية للأسبوع الأول'],
          en: ['Daily-use templates', 'Organize tools intelligently', 'A practical implementation plan for week one'],
        },
      },
    ],
  },
  {
    id: 'teacher-ai-tools',
    slug: 'teacher-ai-tools',
    accent: '#5b2bbf',
    badge: { ar: 'تقنية تعليمية', en: 'EdTech track' },
    title: { ar: 'أدوات الذكاء الاصطناعي للمعلم بطريقة عملية', en: 'Practical AI Tools for Teachers' },
    summary: {
      ar: 'برنامج تطبيقي يختصر على المعلم وقت البحث والتجريب ويقدّم له أدوات واضحة وشروحات مباشرة قابلة للاستخدام.',
      en: 'An applied program that saves teachers research time and gives them clear tools and practical tutorials they can use immediately.',
    },
    duration: { ar: '5 أسابيع', en: '5 weeks' },
    level: { ar: 'متوسط', en: 'Intermediate' },
    format: { ar: 'فيديوهات قصيرة + ملفات تطبيقية', en: 'Short videos + practical files' },
    price: { ar: 'عند فتح التسجيل', en: 'When enrollment opens' },
    outcomes: {
      ar: ['فهم الأدوات الأنسب للمعلم', 'تقليل وقت التحضير', 'استخدام التقنية بشكل عملي لا معقد'],
      en: ['Understand the best AI tools for educators', 'Reduce prep time', 'Use technology in a practical way'],
    },
    modules: [
      {
        title: { ar: 'اختيار الأدوات المناسبة', en: 'Choose the right tools' },
        points: {
          ar: ['أشهر الأدوات المفيدة للمعلم', 'متى تستخدم كل أداة', 'تجنب التشتت بين كثرة التطبيقات'],
          en: ['The most useful tools for teachers', 'When to use each tool', 'Avoid app overload and distraction'],
        },
      },
      {
        title: { ar: 'التطبيق داخل التحضير والشرح', en: 'Apply AI in prep and teaching' },
        points: {
          ar: ['بناء مطالبات جاهزة', 'تبسيط الشرح والمحتوى', 'تجهيز أنشطة وأوراق بسرعة'],
          en: ['Build ready prompts', 'Simplify explanations and content', 'Create activities and worksheets faster'],
        },
      },
      {
        title: { ar: 'نظام عمل مستدام', en: 'Build a sustainable workflow' },
        points: {
          ar: ['تقليل الجهد المتكرر', 'تجهيز مكتبة شخصية للأدوات', 'تحويل التقنية إلى عادة يومية مفيدة'],
          en: ['Reduce repetitive effort', 'Build a personal toolkit library', 'Turn technology into a helpful daily habit'],
        },
      },
    ],
  },
  {
    id: 'smart-study-planning',
    slug: 'smart-study-planning',
    accent: '#d58a00',
    badge: { ar: 'تنظيم دراسي', en: 'Study planning' },
    title: { ar: 'تنظيم الدراسة والمراجعة بذكاء', en: 'Smart Study and Revision Planning' },
    summary: {
      ar: 'برنامج يساعد الطلبة على بناء نظام مراجعة واضح وهادئ، خاصة في فترات الضغط مثل البكالوريا والجامعة.',
      en: 'A program that helps students build a clear and calm study system, especially during high-pressure seasons like baccalaureate and university.',
    },
    duration: { ar: '6 أسابيع', en: '6 weeks' },
    level: { ar: 'ثانوي إلى جامعي', en: 'Secondary to university' },
    format: { ar: 'جلسات عملية + قوالب متابعة', en: 'Hands-on sessions + planning templates' },
    price: { ar: 'عند فتح التسجيل', en: 'When enrollment opens' },
    outcomes: {
      ar: ['تقليل التشتت والقلق', 'بناء خطة مراجعة ثابتة', 'تحويل الأهداف الكبيرة إلى خطوات يومية'],
      en: ['Reduce overwhelm and anxiety', 'Build a steady revision plan', 'Turn big goals into daily actions'],
    },
    modules: [
      {
        title: { ar: 'تشخيص الفوضى الدراسية', en: 'Diagnose study overwhelm' },
        points: {
          ar: ['مصادر الضغط والتشتت', 'العادات التي تستهلك الوقت', 'تحديد الأولويات الواقعية'],
          en: ['Sources of pressure and distraction', 'Habits that waste time', 'Set realistic priorities'],
        },
      },
      {
        title: { ar: 'بناء خطة مراجعة قابلة للاستمرار', en: 'Build a sustainable revision system' },
        points: {
          ar: ['توزيع المواد بذكاء', 'خطة أسبوعية واضحة', 'متابعة التقدم بدون ضغط زائد'],
          en: ['Distribute subjects intelligently', 'Create a clear weekly plan', 'Track progress without excess pressure'],
        },
      },
      {
        title: { ar: 'التحفيز والالتزام', en: 'Motivation and consistency' },
        points: {
          ar: ['استخدام البلانرات بذكاء', 'الاستمرار دون جلد الذات', 'التعامل مع التراجع والضغط الموسمي'],
          en: ['Use planners effectively', 'Stay consistent without self-pressure', 'Handle setbacks and seasonal stress'],
        },
      },
    ],
  },
];

export const brandTestimonials: TestimonialItem[] = [
  {
    name: { ar: 'المعلمة العصرية', en: 'The modern educator' },
    role: { ar: 'مثل الأستاذة حبيبة', en: 'Like Habiba' },
    quote: {
      ar: 'تبحث عن وسائل جاهزة، جذابة، وملائمة للقسم الجزائري حتى تجعل الحصص أكثر تفاعلاً وتوفّر وقت التحضير.',
      en: 'She looks for ready, engaging tools that fit Algerian classrooms and make lessons more interactive while saving prep time.',
    },
  },
  {
    name: { ar: 'طالبة البكالوريا', en: 'The baccalaureate student' },
    role: { ar: 'مثل فاطمة', en: 'Like Fatima' },
    quote: {
      ar: 'تحتاج خطة واضحة تقلل القلق وتحوّل ضغط المراجعة إلى خطوات يومية واقعية يمكن الالتزام بها.',
      en: 'She needs a clear plan that reduces anxiety and turns revision pressure into realistic daily steps.',
    },
  },
  {
    name: { ar: 'الطالبة الجامعية', en: 'The university student' },
    role: { ar: 'مثل سارة', en: 'Like Sara' },
    quote: {
      ar: 'تبحث عن توازن بين الدراسة والميزانية والحياة اليومية، وتنجذب للحلول الأنيقة والعملية التي تمنحها شعورًا بالسيطرة.',
      en: 'She wants balance between study, budget, and daily life, and is drawn to practical, elegant tools that restore a sense of control.',
    },
  },
  {
    name: { ar: 'وليّة الأمر', en: 'The caring parent' },
    role: { ar: 'مثل أم آلاء', en: 'Like Om Alaa' },
    quote: {
      ar: 'تبحث عن أدوات جميلة ومميزة تشجع ابنتها على الدراسة وتمنحها تجربة مدرسية مبهجة ومختلفة.',
      en: 'She looks for beautiful, distinctive school tools that motivate her child and create a joyful learning experience.',
    },
  },
];

export const aboutValues: ValueItem[] = [
  {
    title: { ar: 'البساطة والوضوح', en: 'Simplicity and clarity' },
    description: {
      ar: 'نقدّم حلولًا سهلة الفهم والاستخدام حتى تكون الخطوة التالية واضحة لا مربكة.',
      en: 'We create solutions that are easy to understand and use, so the next step always feels clear.',
    },
  },
  {
    title: { ar: 'الذكاء والإبداع', en: 'Intelligence and creativity' },
    description: {
      ar: 'نبتكر أدوات ذكية تلهم التفكير وتجمع بين الفكرة الجميلة والفائدة العملية.',
      en: 'We create smart tools that inspire thinking and combine beauty with practical usefulness.',
    },
  },
  {
    title: { ar: 'التنظيم العملي', en: 'Practical organization' },
    description: {
      ar: 'نركز على حلول تساعد في تحسين الإنتاجية اليومية داخل القسم والبيت والدراسة.',
      en: 'We focus on solutions that improve everyday productivity at school, at home, and in study life.',
    },
  },
  {
    title: { ar: 'التمكين الذاتي', en: 'Empowerment' },
    description: {
      ar: 'نمنح المعلمين والطلاب أدوات تجعلهم أكثر استقلالية وفعالية وثقة في إنجازهم.',
      en: 'We give teachers and students tools that help them become more independent, effective, and confident.',
    },
  },
  {
    title: { ar: 'الأصالة والتجديد', en: 'Authenticity and renewal' },
    description: {
      ar: 'نجمع بين الهوية المحلية الجزائرية والأفكار العصرية المتجددة في كل ما نقدمه.',
      en: 'We blend Algerian identity with fresh, modern ideas in everything we create.',
    },
  },
];

export const contactMethods: ContactMethod[] = [
  {
    title: { ar: 'البريد الإلكتروني', en: 'Email' },
    value: { ar: 'contact@nawaedutech.com', en: 'contact@nawaedutech.com' },
    href: 'mailto:contact@nawaedutech.com',
    hint: {
      ar: 'مناسب للاستفسارات العامة، الشراكات، وطلبات المنتجات.',
      en: 'Best for general questions, partnerships, and product requests.',
    },
  },
  {
    title: { ar: 'واتساب', en: 'WhatsApp' },
    value: { ar: '+213 555 123 456', en: '+213 555 123 456' },
    href: 'https://wa.me/213555123456',
    hint: {
      ar: 'للتواصل السريع وطلب عروض أو معرفة المنتج المناسب.',
      en: 'Best for fast conversations, offers, and choosing the right product.',
    },
  },
  {
    title: { ar: 'المدينة', en: 'City' },
    value: { ar: 'الجزائر العاصمة', en: 'Algiers, Algeria' },
    href: 'https://maps.google.com/?q=Algiers',
    hint: {
      ar: 'نخدم جمهورنا من الجزائر بهوية عربية واضحة ونظرة عملية حديثة.',
      en: 'We serve our audience from Algeria with a clear Arabic identity and a modern practical approach.',
    },
  },
];

export const contactFaqs: FaqItem[] = [
  {
    question: { ar: 'هل المنتجات مناسبة للمنهاج الجزائري؟', en: 'Are the products suitable for the Algerian curriculum?' },
    answer: {
      ar: 'نعم، تم تصميم أغلب الحلول بروح قريبة من واقع القسم الجزائري واحتياجات المعلمين والطلاب محليًا.',
      en: 'Yes. Most offers are designed with Algerian classrooms and local teacher-student needs in mind.',
    },
  },
  {
    question: { ar: 'هل يمكن طلب نسخة مطبوعة أو رقمية حسب الحاجة؟', en: 'Can I request a printable or digital version depending on my needs?' },
    answer: {
      ar: 'نعم، بعض المنتجات متوفرة بصيغة رقمية وبعضها ضمن باقات مطبوعة أو مركبة، ويمكن توجيهك إلى الخيار الأنسب.',
      en: 'Yes. Some offers are digital, while others come as printable or mixed bundles, and we can guide you to the best fit.',
    },
  },
  {
    question: { ar: 'هل يمكنني طلب باقة أو حل مخصص؟', en: 'Can I request a custom bundle or tailored solution?' },
    answer: {
      ar: 'في كثير من الحالات نعم، خاصة إذا كان الطلب مرتبطًا بفئة واضحة مثل المعلمات أو الطالبات أو مبادرة تعليمية محددة.',
      en: 'In many cases, yes, especially when the request serves a clear group such as teachers, students, or a specific learning initiative.',
    },
  },
];

export const brandStory = {
  eyebrow: {
    ar: 'قصتنا',
    en: 'Our story',
  },
  title: {
    ar: 'نُمكّن المعلمين والطلاب عبر أدوات تعليمية وتنظيمية ذكية في هوية جزائرية مبتكرة.',
    en: 'We empower teachers and students through smart educational and organizational tools with an innovative Algerian identity.',
  },
  paragraphs: {
    ar: [
      'بدأت نوى لتجيب على تحديات المدرسة الحديثة: كيف نجعل التعلم أكثر تنظيمًا، وأكثر إلهامًا، وأقرب إلى واقع المعلم والطالب؟',
      'نطوّر أدوات تعليمية وتنظيمية ذكية تجمع بين التصميم العملي، الهوية المحلية، والتقنيات الحديثة، من البلانرات المطبوعة إلى القوالب والباقات الرقمية.',
      'هدفنا أن نحوّل الفوضى إلى نظام، والضغط إلى وضوح، وأن نقدّم للمعلم والطالب حلولًا تساعدهما على الإنجاز بثقة وراحة أكبر.',
    ],
    en: [
      'Nawa started to answer the challenges of the modern school: how do we make learning more organized, more inspiring, and closer to the real needs of teachers and students?',
      'We create smart educational and organizational tools that combine practical design, local identity, and modern technology, from printable planners to digital bundles and templates.',
      'Our goal is to turn chaos into order and pressure into clarity, giving teachers and students dependable tools they can use with confidence.',
    ],
  },
};

export const siteCopy = {
  heroEyebrow: {
    ar: 'نوى للتعليم والتكنولوجيا',
    en: 'Nawa for Education and Technology',
  },
  heroTitle: {
    ar: 'أدوات تعليمية وتنظيمية ذكية للمعلمين والطلاب في الجزائر.',
    en: 'Smart educational and organizational tools for teachers and students in Algeria.',
  },
  heroDescription: {
    ar: 'نطوّر في نوى منتجات مطبوعة ورقمية ودورات تطبيقية تساعد المعلم والطالب ووليّ الأمر على توفير الوقت، تعزيز التنظيم، وجعل التعلّم أكثر متعة وأثرًا.',
    en: 'At Nawa, we create printable products, digital tools, and applied courses that help teachers, students, and parents save time, stay organized, and make learning more meaningful.',
  },
  heroPrimaryCta: {
    ar: 'استكشفي منتجات نوى',
    en: 'Explore products',
  },
  heroSecondaryCta: {
    ar: 'استكشفي الدورات',
    en: 'Explore courses',
  },
  sectionProducts: {
    ar: 'منتجاتنا',
    en: 'Our products',
  },
  sectionCourses: {
    ar: 'دوراتنا',
    en: 'Our courses',
  },
  sectionTestimonials: {
    ar: 'الفئات التي نخدمها',
    en: 'Who we serve',
  },
  contactCtaTitle: {
    ar: 'هل تبحثين عن الأداة أو الباقة التي تناسبك فعلًا؟',
    en: 'Looking for the product or bundle that truly fits your needs?',
  },
  contactCtaDescription: {
    ar: 'إذا كنت معلمة، طالبة، أو وليّة أمر وتحتاجين إلى حل واضح وعملي، يسعدنا أن نرشدك إلى الأنسب من منتجات ودورات نوى.',
    en: 'If you are a teacher, student, or parent looking for a clear and practical solution, we would love to guide you to the right Nawa offer.',
  },
};

export function resolveLocale(language: string): SiteLocale {
  return language === 'en' ? 'en' : 'ar';
}

export function getLocalizedText(value: LocalizedText, locale: SiteLocale): string {
  return value[locale];
}

export function getLocalizedList(value: LocalizedList, locale: SiteLocale): string[] {
  return value[locale];
}

export function getCourseBySlug(slug?: string): CourseItem | undefined {
  return brandCourses.find((course) => course.slug === slug || course.id === slug);
}
