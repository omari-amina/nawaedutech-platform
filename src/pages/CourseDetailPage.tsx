import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpLeft, BookOpen, CheckCircle2, Clock3, Layers3, PlayCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  getCourseBySlug,
  getLocalizedList,
  getLocalizedText,
  resolveLocale,
} from '../data/brandSite';
import { SiteSectionHeading } from '../components/SiteSectionHeading';
import { usePageMeta } from '../hooks/usePageMeta';

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { language, isRTL } = useLanguage();
  const locale = resolveLocale(language);
  const course = getCourseBySlug(id);
  const courseTitle = course ? getLocalizedText(course.title, locale) : '';
  const pageTitle = course
    ? courseTitle
    : locale === 'ar'
      ? 'الدورة غير موجودة'
      : 'Course not found';
  const pageDescription = course
    ? getLocalizedText(course.summary, locale)
    : locale === 'ar'
      ? 'الصفحة التي تبحث عنها غير متاحة حاليًا. يمكنك العودة إلى صفحة الدورات لاكتشاف المسارات المتاحة.'
      : 'The page you are looking for is not currently available. Return to the courses page to explore the available tracks.';

  usePageMeta({
    title: pageTitle,
    description: pageDescription,
    noIndex: !course,
  });

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="site-surface mx-auto max-w-2xl p-10 text-center">
          <h1 className="text-3xl font-black text-foreground">
            {locale === 'ar' ? 'الدورة غير موجودة' : 'Course not found'}
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {locale === 'ar'
              ? 'ربما تم تغيير المسار أو لم تعد هذه الصفحة متاحة.'
              : 'The route may have changed or this course page is no longer available.'}
          </p>
          <Link
            to="/courses"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-4 text-sm font-black text-white transition hover:bg-primary"
          >
            <ArrowLeft size={18} className={isRTL ? 'rotate-180' : ''} />
            {locale === 'ar' ? 'العودة إلى الدورات' : 'Back to courses'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <section className="relative overflow-hidden py-20">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at top right, rgba(243,185,66,0.16), transparent 22%), linear-gradient(135deg, #140728 0%, ${course.accent} 65%, #8455f5 100%)`,
          }}
        />

        <div className="container relative z-10 mx-auto px-4">
          <Link
            to="/courses"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-white transition hover:bg-white/15"
          >
            <ArrowLeft size={16} className={isRTL ? 'rotate-180' : ''} />
            {locale === 'ar' ? 'العودة إلى الدورات' : 'Back to courses'}
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="space-y-6 text-white">
              <span
                className="inline-flex rounded-full px-4 py-2 text-sm font-black text-white"
                style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
              >
                {getLocalizedText(course.badge, locale)}
              </span>

              <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                {getLocalizedText(course.title, locale)}
              </h1>

              <p className="max-w-3xl text-lg leading-8 text-white/75">
                {getLocalizedText(course.summary, locale)}
              </p>

              <div className="grid gap-4 md:grid-cols-3">
                <MetaCard
                  icon={<Clock3 size={18} />}
                  label={locale === 'ar' ? 'المدة' : 'Duration'}
                  value={getLocalizedText(course.duration, locale)}
                />
                <MetaCard
                  icon={<Layers3 size={18} />}
                  label={locale === 'ar' ? 'المستوى' : 'Level'}
                  value={getLocalizedText(course.level, locale)}
                />
                <MetaCard
                  icon={<BookOpen size={18} />}
                  label={locale === 'ar' ? 'صيغة التقديم' : 'Format'}
                  value={getLocalizedText(course.format, locale)}
                />
              </div>
            </div>

            <aside className="site-surface p-8">
              <div className="text-sm font-black text-primary">
                {locale === 'ar' ? 'الاستثمار في هذه الدورة' : 'Investment'}
              </div>
              <div className="mt-3 text-4xl font-black text-foreground">
                {getLocalizedText(course.price, locale)}
              </div>
              <p className="mt-4 text-base leading-8 text-slate-600">
                {locale === 'ar'
                  ? 'ستجدين هنا كل ما يساعدك على فهم الدورة بوضوح قبل اتخاذ قرار التسجيل أو طلب المزيد من التفاصيل.'
                  : 'You will find everything you need here to understand the course clearly before enrolling or asking for more details.'}
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  to={`/contact?subject=${encodeURIComponent(
                    locale === 'ar' ? `الالتحاق بالدورة: ${courseTitle}` : `Enroll in course: ${courseTitle}`,
                  )}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-4 text-sm font-black text-white transition hover:bg-primary"
                >
                  {locale === 'ar' ? 'أريد الالتحاق' : 'I want to enroll'}
                  <ArrowUpLeft size={18} />
                </Link>
                <Link
                  to={`/contact?subject=${encodeURIComponent(
                    locale === 'ar' ? `استفسار عن الدورة: ${courseTitle}` : `Question about course: ${courseTitle}`,
                  )}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-black text-slate-700 transition hover:border-primary/20 hover:text-primary"
                >
                  {locale === 'ar' ? 'اسأل عن هذه الدورة' : 'Ask about this course'}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="site-surface p-8">
            <SiteSectionHeading
              eyebrow={locale === 'ar' ? 'النتائج المتوقعة' : 'Expected outcomes'}
              title={locale === 'ar' ? 'ماذا سيكسب المتعلم من هذه الرحلة؟' : 'What will the learner gain from this track?'}
              description={locale === 'ar'
                ? 'تركز هذه الدورة على نتائج عملية يمكن ملاحظتها وتطبيقها داخل الواقع اليومي مباشرة.'
                : 'This course focuses on practical outcomes you can notice and apply in everyday work right away.'}
            />
          </div>

          <div className="grid gap-4">
            {getLocalizedList(course.outcomes, locale).map((outcome) => (
              <article key={outcome} className="site-surface p-6">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                    <CheckCircle2 size={20} />
                  </span>
                  <p className="text-base leading-8 text-slate-600">{outcome}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <SiteSectionHeading
          eyebrow={locale === 'ar' ? 'هيكل الدورة' : 'Course structure'}
          title={locale === 'ar' ? 'الوحدات الرئيسية داخل البرنامج' : 'The core modules inside the program'}
          description={locale === 'ar'
            ? 'محتوى البرنامج مقسم إلى وحدات واضحة تساعدك على فهم الرحلة كاملة من البداية إلى التطبيق.'
            : 'The program is divided into clear modules so you can understand the journey from the first step to practical application.'}
          align="center"
        />

        <div className="mt-12 grid gap-6">
          {course.modules.map((module, index) => (
            <article key={getLocalizedText(module.title, locale)} className="site-surface p-8">
              <div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]">
                <div>
                  <div className="mb-3 text-sm font-black text-primary">
                    {locale === 'ar' ? `الوحدة ${index + 1}` : `Module ${index + 1}`}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                      <PlayCircle size={20} />
                    </span>
                    <h3 className="text-2xl font-black text-foreground">
                      {getLocalizedText(module.title, locale)}
                    </h3>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {module.points[locale].map((point) => (
                    <div key={point} className="rounded-[1.5rem] bg-slate-50 p-5 text-base leading-8 text-slate-600">
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function MetaCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-accent">
        {icon}
      </div>
      <div className="text-xs font-black uppercase tracking-[0.22em] text-white/45">{label}</div>
      <div className="mt-2 text-base font-black text-white">{value}</div>
    </div>
  );
}
