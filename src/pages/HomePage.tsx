import { Link } from 'react-router-dom';
import {
  ArrowUpLeft,
  BookOpen,
  Boxes,
  CalendarCheck2,
  GraduationCap,
  MessageCircleMore,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  brandCourses,
  brandStory,
  brandTestimonials,
  getLocalizedText,
  homeFeatures,
  journeySteps,
  resolveLocale,
  siteCopy,
  siteMetrics,
} from '../data/brandSite';
import { useBrandProducts } from '../hooks/useCatalog';
import { SiteSectionHeading } from '../components/SiteSectionHeading';
import { SiteProductCard } from '../components/SiteProductCard';
import { SiteCourseCard } from '../components/SiteCourseCard';
import { SiteTestimonialCard } from '../components/SiteTestimonialCard';
import { usePageMeta } from '../hooks/usePageMeta';

const featureIcons = [BookOpen, CalendarCheck2, Sparkles];
const journeyIcons = [Boxes, GraduationCap, MessageCircleMore];

export function HomePage() {
  const { language } = useLanguage();
  const locale = resolveLocale(language);
  const brandProducts = useBrandProducts();

  usePageMeta({
    title: locale === 'ar' ? 'الرئيسية' : 'Home',
    description: locale === 'ar'
      ? 'اكتشفي منتجات ودورات NawaEduTech المصممة لدعم التعليم والتنظيم والتقنية بأسلوب واضح وأنيق.'
      : 'Discover NawaEduTech products and courses designed to support education, organization, and technology with clarity and style.',
  });

  const heroMotto = locale === 'ar'
    ? 'تعليم . تنظيم . تكنولوجيا'
    : 'Education . Organization . Technology';

  return (
    <div className="overflow-hidden">
      <section className="site-page-hero site-page-hero-dark">
        <div className="container relative z-10 mx-auto px-4 pb-24 pt-14 md:pb-28 md:pt-20">
          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-8 text-white">
              <span className="site-overline site-overline-light">
                {getLocalizedText(siteCopy.heroEyebrow, locale)}
              </span>

              <div className="space-y-5">
                <div className="text-sm font-black tracking-[0.28em] text-accent">
                  {heroMotto}
                </div>

                <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                  {getLocalizedText(siteCopy.heroTitle, locale)}
                </h1>

                <p className="max-w-2xl text-lg leading-8 text-white/78 md:text-xl">
                  {getLocalizedText(siteCopy.heroDescription, locale)}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="site-button-gold">
                  {getLocalizedText(siteCopy.heroPrimaryCta, locale)}
                  <ArrowUpLeft size={18} />
                </Link>

                <Link to="/about" className="site-button-white">
                  {locale === 'ar' ? 'تعرفي علينا' : 'Learn more about us'}
                  <ArrowUpLeft size={18} />
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {siteMetrics.map((metric) => (
                  <div
                    key={getLocalizedText(metric.label, locale)}
                    className="rounded-[1.75rem] border border-white/12 bg-white/10 p-5 backdrop-blur-xl"
                  >
                    <div className="text-lg font-black text-accent md:text-xl">
                      {getLocalizedText(metric.value, locale)}
                    </div>
                    <div className="mt-2 text-sm font-black text-white">
                      {getLocalizedText(metric.label, locale)}
                    </div>
                    <p className="mt-2 text-sm leading-7 text-white/65">
                      {getLocalizedText(metric.description, locale)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2.5rem] border border-white/12 bg-white/10 p-4 shadow-[0_32px_120px_-58px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                <img
                  src="/hero-nawa-brand.png"
                  alt="NawaEduTech brand presentation"
                  className="h-full min-h-[31rem] w-full rounded-[2rem] object-cover"
                />
              </div>

              <div className="absolute -bottom-8 left-4 max-w-sm rounded-[1.75rem] bg-white p-6 shadow-[0_28px_90px_-44px_rgba(49,11,130,0.42)] md:left-auto md:right-8">
                <div className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
                  {locale === 'ar' ? 'رسالة نوى' : 'Nawa promise'}
                </div>
                <p className="mt-3 text-sm font-bold leading-7 text-slate-700">
                  {locale === 'ar'
                    ? 'نصمم أدوات جميلة وعملية من واقع احتياج المعلم والطالب والأسرة التعليمية في الجزائر.'
                    : 'We design beautiful and practical tools rooted in the real needs of teachers, students, and families in Algeria.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="container mx-auto px-4">
          <SiteSectionHeading
            eyebrow={locale === 'ar' ? 'ماذا نقدم؟' : 'What we offer'}
            title={locale === 'ar'
              ? 'ثلاث ركائز تجمع بين الفائدة والوضوح والجمال'
              : 'Three pillars that combine usefulness, clarity, and beauty'}
            description={locale === 'ar'
              ? 'استوحينا هذا القسم من الثيم المرجعي نفسه، لكن ربطناه بمحتوى نوى الحقيقي حتى يظهر الموقع كبراند رسمي لا كقالب عام.'
              : 'This section translates the reference theme into Nawa’s real brand voice so the site feels like a true launch-ready brand presence.'}
            align="center"
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {homeFeatures.map((feature, index) => {
              const Icon = featureIcons[index] ?? Sparkles;

              return (
                <article
                  key={feature.id}
                  className="group rounded-[2rem] border border-slate-100 bg-white p-8 text-center shadow-[0_24px_80px_-48px_rgba(49,11,130,0.35)] transition-all duration-500 hover:-translate-y-2"
                >
                  <span className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-[#f7f2ff] text-primary transition duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-white">
                    <Icon size={30} />
                  </span>

                  <div className="mt-6 space-y-4">
                    <div className="text-sm font-black text-primary">
                      {getLocalizedText(feature.eyebrow, locale)}
                    </div>
                    <h3 className="text-2xl font-black text-foreground">
                      {getLocalizedText(feature.title, locale)}
                    </h3>
                    <p className="text-base leading-8 text-slate-600">
                      {getLocalizedText(feature.description, locale)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="site-surface overflow-hidden p-4">
              <img
                src="/hero-illustration.png"
                alt="NawaEduTech story"
                className="h-full min-h-[24rem] w-full rounded-[1.75rem] object-cover"
              />
            </div>

            <div className="space-y-6">
              <span className="site-overline site-overline-dark">
                {getLocalizedText(brandStory.eyebrow, locale)}
              </span>

              <h2 className="text-3xl font-black leading-tight text-foreground md:text-5xl">
                {getLocalizedText(brandStory.title, locale)}
              </h2>

              <div className="space-y-4 text-lg leading-8 text-slate-600">
                {brandStory.paragraphs[locale].map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/about" className="site-button-primary">
                  {locale === 'ar' ? 'اكتشفي القصة كاملة' : 'Discover the full story'}
                  <ArrowUpLeft size={18} />
                </Link>

                <Link to="/contact" className="site-button-ghost">
                  {locale === 'ar' ? 'تواصلي معنا' : 'Talk to us'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section bg-[#fcfaff]">
        <div className="container mx-auto px-4">
          <SiteSectionHeading
            eyebrow={getLocalizedText(siteCopy.sectionCourses, locale)}
            title={locale === 'ar'
              ? 'رحلة التعلم والنمو داخل نوى'
              : 'The learning and growth journey inside Nawa'}
            description={locale === 'ar'
              ? 'كما في التصميم المرجعي، جعلنا هذا القسم واضحًا ومباشرًا ليعرض البرامج التدريبية بشكل فاخر وسهل التصفح.'
              : 'Like the reference design, this section showcases the training tracks in a clear and elegant way.'}
            align="center"
          />

          <div className="mt-14 grid gap-6 xl:grid-cols-3">
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

      <section className="site-section bg-white">
        <div className="container mx-auto px-4">
          <SiteSectionHeading
            eyebrow={getLocalizedText(siteCopy.sectionProducts, locale)}
            title={locale === 'ar'
              ? 'منتجات مصممة لتخدم الواقع اليومي للمعلم والطالب'
              : 'Products designed for the daily reality of teachers and students'}
            description={locale === 'ar'
              ? 'من الحقائب التعليمية إلى البلانرات وباقات التنظيم، كل منتج هنا صُمم ليحمل وظيفة واضحة وشكلًا يليق بالبراند.'
              : 'From teaching kits to planners and organization bundles, every product here is designed with a clear role and a polished brand feel.'}
          />

          <div className="mt-12 grid gap-6 xl:grid-cols-3">
            {brandProducts.map((product) => (
              <SiteProductCard
                key={product.id}
                product={product}
                locale={locale}
                ctaLabel={locale === 'ar' ? 'اطلبي المنتج' : 'Request product'}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container mx-auto px-4">
          <SiteSectionHeading
            eyebrow={locale === 'ar' ? 'كيف تبدئين معنا؟' : 'How to start with us'}
            title={locale === 'ar'
              ? '3 خطوات بسيطة للوصول إلى الحل المناسب'
              : '3 simple steps to reach the right solution'}
            description={locale === 'ar'
              ? 'استكشفِي الفئة الأنسب، ثم اختاري الحل الأقرب لاحتياجك، وبعدها تواصلي معنا لنرتب لك الخطوة التالية.'
              : 'Explore the right audience fit, choose the offer that matches your need, then contact us for the next step.'}
            align="center"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {journeySteps.map((step, index) => {
              const Icon = journeyIcons[index] ?? Sparkles;

              return (
                <article key={step.id} className="site-panel">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-black text-primary">
                      {getLocalizedText(step.eyebrow, locale)}
                    </span>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20 text-primary">
                      <Icon size={22} />
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-black text-foreground">
                    {getLocalizedText(step.title, locale)}
                  </h3>

                  <p className="mt-4 text-base leading-8 text-slate-600">
                    {getLocalizedText(step.description, locale)}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="site-section relative overflow-hidden bg-[linear-gradient(135deg,#230750_0%,#320b82_46%,#4e21b5_100%)] text-white">
        <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4">
          <SiteSectionHeading
            eyebrow={getLocalizedText(siteCopy.sectionTestimonials, locale)}
            title={locale === 'ar'
              ? 'الفئات التي تخدمها نوى بوضوح ومحبة وعناية'
              : 'The audiences Nawa serves with clarity, care, and warmth'}
            description={locale === 'ar'
              ? 'هذا القسم يأخذ مكان شهادات العملاء في الثيم المرجعي، لكنه هنا يعرض الشرائح الحقيقية التي صُممت لها نوى.'
              : 'This section takes the testimonial role from the reference theme, but here it presents Nawa’s real audience groups.'}
            invert
            align="center"
          />

          <div className="mt-12 grid gap-6 xl:grid-cols-2">
            {brandTestimonials.map((testimonial) => (
              <SiteTestimonialCard
                key={getLocalizedText(testimonial.name, locale)}
                testimonial={testimonial}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container mx-auto px-4">
          <div className="site-surface bg-[linear-gradient(135deg,rgba(49,11,130,0.06),rgba(238,179,42,0.14))] p-8 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <span className="site-overline site-overline-dark">
                  {locale === 'ar' ? 'الخطوة التالية' : 'Next step'}
                </span>
                <h2 className="mt-5 text-3xl font-black leading-tight text-foreground md:text-5xl">
                  {getLocalizedText(siteCopy.contactCtaTitle, locale)}
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  {getLocalizedText(siteCopy.contactCtaDescription, locale)}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="site-button-primary">
                  {locale === 'ar' ? 'تواصلي معنا' : 'Get in touch'}
                  <ArrowUpLeft size={18} />
                </Link>

                <Link to="/shop" className="site-button-ghost">
                  {locale === 'ar' ? 'تصفحي المنتجات' : 'Browse products'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
