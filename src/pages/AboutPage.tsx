import { Link } from 'react-router-dom';
import { ArrowUpLeft, Compass, Gem, HeartHandshake, Lightbulb, Target } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  aboutValues,
  brandStory,
  getLocalizedText,
  resolveLocale,
  siteMetrics,
} from '../data/brandSite';
import { SiteSectionHeading } from '../components/SiteSectionHeading';
import { usePageMeta } from '../hooks/usePageMeta';

const valueIcons = [Lightbulb, HeartHandshake, Gem];

export function AboutPage() {
  const { language } = useLanguage();
  const locale = resolveLocale(language);

  usePageMeta({
    title: locale === 'ar' ? 'من نحن' : 'About',
    description: locale === 'ar'
      ? 'تعرّفي على قصة نوى ورسالتها في تمكين المعلمين والطلاب عبر أدوات تعليمية وتنظيمية ذكية وهوية جزائرية مبتكرة.'
      : 'Learn the Nawa story and its mission to empower teachers and students through smart educational and organizational tools.',
  });

  return (
    <div className="overflow-hidden">
      <section className="site-page-hero site-page-hero-light">
        <div className="container relative z-10 mx-auto px-4 pb-20 pt-14 md:pb-24 md:pt-18">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <span className="site-overline site-overline-dark">
                {getLocalizedText(brandStory.eyebrow, locale)}
              </span>

              <h1 className="max-w-3xl text-4xl font-black leading-tight text-foreground md:text-6xl">
                {locale === 'ar'
                  ? 'نطوّر أدوات تعليمية وتنظيمية ذكية تجعل التعلم أوضح وأكثر أثرًا.'
                  : 'We create smart educational and organizational tools that make learning clearer and more impactful.'}
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                {locale === 'ar'
                  ? 'في نوى نؤمن أن الجمال في التعليم ليس ترفًا، وأن التنظيم والتقنية عندما يُقدّمان بلغة بسيطة يصنعان أثرًا حقيقيًا.'
                  : 'At Nawa, we believe beauty in learning is not a luxury, and that organization and technology create real impact when delivered with clarity.'}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="site-button-primary">
                  {locale === 'ar' ? 'تواصلي معنا' : 'Contact us'}
                  <ArrowUpLeft size={18} />
                </Link>

                <Link to="/courses" className="site-button-ghost">
                  {locale === 'ar' ? 'استكشفي الدورات' : 'Explore courses'}
                </Link>
              </div>
            </div>

            <div className="site-surface overflow-hidden p-4">
              <img
                src="/hero-illustration.png"
                alt="NawaEduTech story visual"
                className="h-full min-h-[28rem] w-full rounded-[2rem] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="site-panel">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                <Compass size={24} />
              </div>
              <h2 className="text-3xl font-black leading-tight text-foreground">
                {getLocalizedText(brandStory.title, locale)}
              </h2>
            </div>

            <div className="space-y-4 text-lg leading-8 text-slate-600">
              {brandStory.paragraphs[locale].map((paragraph) => (
                <div key={paragraph} className="site-panel">
                  {paragraph}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="container mx-auto px-4">
          <SiteSectionHeading
            eyebrow={locale === 'ar' ? 'قيمنا' : 'Our values'}
            title={locale === 'ar'
              ? 'قيم تقود كل منتج ودورة وتجربة نقدمها'
              : 'Values that guide every product, course, and experience we offer'}
            description={locale === 'ar'
              ? 'هذه القيم جزء أساسي من ملف نوى، وهي التي توجه طريقة التصميم والخطاب والخدمة التي نقدمها.'
              : 'These values sit at the core of Nawa and guide the way we design, communicate, and serve our audience.'}
            align="center"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {aboutValues.map((value, index) => {
              const Icon = valueIcons[index] ?? Target;

              return (
                <article key={getLocalizedText(value.title, locale)} className="site-panel text-center">
                  <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-primary/8 text-primary">
                    <Icon size={26} />
                  </span>
                  <h3 className="mt-6 text-2xl font-black text-foreground">
                    {getLocalizedText(value.title, locale)}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-slate-600">
                    {getLocalizedText(value.description, locale)}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="container mx-auto px-4">
          <SiteSectionHeading
            eyebrow={locale === 'ar' ? 'لماذا يختارنا العملاء؟' : 'Why clients choose us'}
            title={locale === 'ar'
              ? 'ثلاثة أمور نحرص عليها في كل ما نقدمه'
              : 'Three things we focus on in everything we offer'}
            description={locale === 'ar'
              ? 'نركز على الوضوح، الفائدة العملية، وسهولة التواصل حتى تكون التجربة مريحة وواثقة.'
              : 'We focus on clarity, practical value, and easy communication so the experience feels smooth and trustworthy.'}
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {siteMetrics.map((metric) => (
              <article key={getLocalizedText(metric.label, locale)} className="site-panel">
                <div className="text-2xl font-black text-primary">
                  {getLocalizedText(metric.value, locale)}
                </div>
                <h3 className="mt-3 text-xl font-black text-foreground">
                  {getLocalizedText(metric.label, locale)}
                </h3>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  {getLocalizedText(metric.description, locale)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
