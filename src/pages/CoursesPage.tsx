import { Link } from 'react-router-dom';
import { ArrowUpLeft, CheckCircle2, PlayCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  brandCourses,
  getLocalizedList,
  getLocalizedText,
  resolveLocale,
} from '../data/brandSite';
import { SiteSectionHeading } from '../components/SiteSectionHeading';
import { SiteCourseCard } from '../components/SiteCourseCard';
import { usePageMeta } from '../hooks/usePageMeta';

export function CoursesPage() {
  const { language } = useLanguage();
  const locale = resolveLocale(language);

  usePageMeta({
    title: locale === 'ar' ? 'الدورات' : 'Courses',
    description: locale === 'ar'
      ? 'استكشفي دورات نوى العملية في التعليم التفاعلي والتنظيم الذكي وأدوات الذكاء الاصطناعي للمعلم والطالب.'
      : 'Explore Nawa practical courses in interactive teaching, smart organization, and AI tools for teachers and students.',
  });

  return (
    <div className="overflow-hidden">
      <section className="site-page-hero site-page-hero-dark">
        <div className="container relative z-10 mx-auto px-4 pb-20 pt-14 md:pb-24 md:pt-18">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="site-overline site-overline-light">
                {locale === 'ar' ? 'رحلات تعليمية' : 'Learning tracks'}
              </span>

              <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                {locale === 'ar'
                  ? 'دورات عملية في التعليم التفاعلي والتنظيم الذكي والتقنية التعليمية.'
                  : 'Practical courses in interactive teaching, smart organization, and educational technology.'}
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-white/75">
                {locale === 'ar'
                  ? 'صممنا هذه المسارات لتمنح المعلم والطالب مهارات قابلة للتطبيق مباشرة، بنفس الروح الرسمية والراقية للتصميم المرجعي.'
                  : 'These tracks are built to give teachers and students practical skills they can use immediately, with the same polished look as the reference design.'}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="site-button-gold">
                  {locale === 'ar' ? 'اطلبي استشارة تدريبية' : 'Request learning advice'}
                  <ArrowUpLeft size={18} />
                </Link>

                <Link to="/about" className="site-button-white">
                  {locale === 'ar' ? 'تعرفي على فلسفتنا' : 'See our philosophy'}
                </Link>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-white/12 bg-white/10 p-5 backdrop-blur-xl">
              <img
                src="/hero-nawa-brand.png"
                alt="NawaEduTech learning journeys"
                className="h-full min-h-[28rem] w-full rounded-[2rem] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="container mx-auto px-4">
          <SiteSectionHeading
            eyebrow={locale === 'ar' ? 'المسارات المتاحة' : 'Available tracks'}
            title={locale === 'ar'
              ? 'اختاري الدورة الأقرب لمرحلتك الحالية'
              : 'Choose the course that matches your current stage'}
            description={locale === 'ar'
              ? 'سواء كنت تبحثين عن تطوير أسلوب التدريس أو استخدام أدوات ذكية أو تنظيم الدراسة، ستجدين هنا مسارًا واضحًا.'
              : 'Whether you want to improve teaching methods, use smarter tools, or organize study better, you will find a clear path here.'}
            align="center"
          />

          <div className="mt-12 grid gap-6 xl:grid-cols-3">
            {brandCourses.map((course) => (
              <SiteCourseCard
                key={course.id}
                course={course}
                locale={locale}
                ctaLabel={locale === 'ar' ? 'تفاصيل الدورة' : 'Course details'}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="site-panel">
              <SiteSectionHeading
                eyebrow={locale === 'ar' ? 'ماذا ستجدين داخل كل دورة؟' : 'What will you find in each course?'}
                title={locale === 'ar'
                  ? 'تفاصيل كافية لاتخاذ القرار بثقة'
                  : 'Enough detail to make a decision with confidence'}
                description={locale === 'ar'
                  ? 'نوضح لك المدة والمستوى وطبيعة التعلّم والنتائج المتوقعة حتى تختاري البرنامج المناسب بسهولة.'
                  : 'We clarify duration, level, format, and expected outcomes so choosing the right program feels easier.'}
              />
            </div>

            <div className="grid gap-4">
              {brandCourses.map((course) => (
                <article key={course.id} className="site-panel">
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                      style={{ backgroundColor: course.accent }}
                    >
                      <PlayCircle size={22} />
                    </span>

                    <div>
                      <div className="text-sm font-black text-primary">
                        {getLocalizedText(course.badge, locale)}
                      </div>
                      <h3 className="text-xl font-black text-foreground">
                        {getLocalizedText(course.title, locale)}
                      </h3>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {getLocalizedList(course.outcomes, locale).map((outcome) => (
                      <div key={outcome} className="flex items-start gap-3 text-slate-600">
                        <CheckCircle2 size={18} className="mt-1 shrink-0 text-primary" />
                        <span className="leading-7">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container mx-auto px-4">
          <div className="site-surface bg-[linear-gradient(135deg,rgba(49,11,130,0.06),rgba(238,179,42,0.12))] p-8 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 flex items-center gap-2 text-primary">
                  <Sparkles size={18} />
                  <span className="text-sm font-black">
                    {locale === 'ar' ? 'اختيار أدق' : 'A clearer choice'}
                  </span>
                </div>

                <h2 className="text-3xl font-black leading-tight text-foreground md:text-4xl">
                  {locale === 'ar'
                    ? 'إذا كنت تبحثين عن المسار الأنسب لك أو لفريقك، سنساعدك على اختيار البرنامج الذي يحقق نتيجة فعلية.'
                    : 'If you are looking for the right track for yourself or your team, we will help you choose the program that leads to a real result.'}
                </h2>
              </div>

              <Link to="/contact" className="site-button-primary">
                {locale === 'ar' ? 'اسألي عن البرنامج المناسب' : 'Ask about the right track'}
                <ArrowUpLeft size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
