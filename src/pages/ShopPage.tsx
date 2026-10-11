import { Link } from 'react-router-dom';
import { ArrowUpLeft, CircleCheckBig, PackageSearch, ShoppingBag, WandSparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocalizedText, resolveLocale } from '../data/brandSite';
import { useBrandProducts } from '../hooks/useCatalog';
import { SiteSectionHeading } from '../components/SiteSectionHeading';
import { SiteProductCard } from '../components/SiteProductCard';
import { usePageMeta } from '../hooks/usePageMeta';

const purchaseSteps = [
  {
    ar: 'اختاري المنتج الأنسب حسب الحاجة والفئة المستهدفة.',
    en: 'Choose the product that best matches the need and audience.',
  },
  {
    ar: 'تواصلي معنا لتأكيد النسخة أو التخصيص المطلوب.',
    en: 'Contact us to confirm the version or any customization needed.',
  },
  {
    ar: 'استلمي المنتج أو الحزمة بصيغة واضحة وجاهزة للاستخدام.',
    en: 'Receive the product or kit in a clear, ready-to-use format.',
  },
];

export function ShopPage() {
  const { language } = useLanguage();
  const locale = resolveLocale(language);
  const brandProducts = useBrandProducts();

  usePageMeta({
    title: locale === 'ar' ? 'المنتجات' : 'Products',
    description: locale === 'ar'
      ? 'تصفحي منتجات نوى المطبوعة والرقمية المصممة للمعلمين والطلاب وأولياء الأمور في الجزائر.'
      : 'Browse Nawa printable and digital products designed for teachers, students, and parents in Algeria.',
  });

  return (
    <div className="overflow-hidden">
      <section className="site-page-hero site-page-hero-light">
        <div className="container relative z-10 mx-auto px-4 pb-20 pt-14 md:pb-24 md:pt-18">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <span className="site-overline site-overline-dark">
                {locale === 'ar' ? 'منتجاتنا' : 'Our products'}
              </span>

              <h1 className="max-w-3xl text-4xl font-black leading-tight text-foreground md:text-6xl">
                {locale === 'ar'
                  ? 'منتجات مطبوعة ورقمية صُممت لتخدم المعلم والطالب ووليّ الأمر.'
                  : 'Printable and digital products designed to serve teachers, students, and parents.'}
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                {locale === 'ar'
                  ? 'هنا تجدين حقائب تعليمية، بلانرات مراجعة، باقات تنظيم جامعي، وأدوات واضحة الفائدة تحمل نفس هوية نوى البصرية والعملية.'
                  : 'Here you will find teaching kits, revision planners, student bundles, and clear practical tools that carry the same polished Nawa identity.'}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="site-button-primary">
                  {locale === 'ar' ? 'اطلبي المنتج المناسب' : 'Request the right product'}
                  <ArrowUpLeft size={18} />
                </Link>

                <Link to="/courses" className="site-button-ghost">
                  {locale === 'ar' ? 'شاهدي الدورات أيضًا' : 'See the courses too'}
                </Link>
              </div>
            </div>

            <div className="site-surface bg-white p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.75rem] bg-primary p-6 text-white">
                  <ShoppingBag className="mb-5 text-accent" size={28} />
                  <h2 className="text-2xl font-black">
                    {locale === 'ar' ? 'حلول جاهزة للاستخدام' : 'Ready-to-use solutions'}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-white/76">
                    {locale === 'ar'
                      ? 'كل منتج هنا يوضح فائدته الأساسية بسرعة حتى يكون القرار أسهل وأوضح.'
                      : 'Each product highlights its main value quickly so the decision feels easier and clearer.'}
                  </p>
                </div>

                <div className="rounded-[1.75rem] bg-[#f7f3ff] p-6">
                  <PackageSearch className="mb-5 text-primary" size={28} />
                  <h2 className="text-2xl font-black text-foreground">
                    {locale === 'ar' ? 'خيارات لمراحل مختلفة' : 'Options for different stages'}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {locale === 'ar'
                      ? 'حلول للمعلمة، طالبة البكالوريا، الطالبة الجامعية، وحتى وليّة الأمر الباحثة عن أدوات محفزة.'
                      : 'Solutions for teachers, baccalaureate students, university students, and parents looking for motivating school tools.'}
                  </p>
                </div>

                <div className="rounded-[1.75rem] bg-slate-50 p-6 md:col-span-2">
                  <WandSparkles className="mb-5 text-primary" size={28} />
                  <h2 className="text-2xl font-black text-foreground">
                    {locale === 'ar' ? 'تفاصيل تسهّل القرار' : 'Details that simplify the decision'}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {locale === 'ar'
                      ? 'نعرض الفئة والسعر والفائدة الأساسية بوضوح حتى تكون تجربة الطلب أسرع وأكثر راحة.'
                      : 'We present the audience, price, and core value clearly so the ordering experience feels faster and easier.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section bg-white">
        <div className="container mx-auto px-4">
          <SiteSectionHeading
            eyebrow={locale === 'ar' ? 'كتالوج الحلول' : 'Solutions catalog'}
            title={locale === 'ar'
              ? 'اختاري ما يناسب احتياجك الحالي'
              : 'Choose what fits your current need'}
            description={locale === 'ar'
              ? 'سواء كنت تحتاجين أداة رقمية أو حزمة مطبوعة، ستجدين منتجات واضحة الفائدة وسهلة الطلب.'
              : 'Whether you need a digital tool or a printable kit, you will find products with clear value and an easy request flow.'}
          />

          <div className="mt-12 grid gap-6 xl:grid-cols-3">
            {brandProducts.map((product) => (
              <SiteProductCard
                key={product.id}
                product={product}
                locale={locale}
                ctaLabel={locale === 'ar' ? 'اطلبي الآن' : 'Request now'}
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
                eyebrow={locale === 'ar' ? 'كيف يتم الطلب؟' : 'How ordering works'}
                title={locale === 'ar'
                  ? 'مسار بسيط وواضح من الاختيار إلى التواصل'
                  : 'A simple and clear path from selection to conversation'}
                description={locale === 'ar'
                  ? 'حرصنا على أن تكون خطوات الطلب سهلة ومنظمة حتى تنتقلي من الاكتشاف إلى التوصية المناسبة بسرعة.'
                  : 'We kept the ordering flow simple and organized so you can move from discovery to the right recommendation quickly.'}
              />
            </div>

            <div className="grid gap-4">
              {purchaseSteps.map((step, index) => (
                <article key={step.ar} className="site-panel flex gap-5">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-black text-white">
                    0{index + 1}
                  </span>

                  <div>
                    <div className="mb-2 flex items-center gap-2 text-primary">
                      <CircleCheckBig size={18} />
                      <span className="text-sm font-black uppercase tracking-[0.22em]">
                        {locale === 'ar' ? 'خطوة' : 'Step'}
                      </span>
                    </div>

                    <p className="text-base leading-8 text-slate-600">
                      {step[locale]}
                    </p>
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
                <div className="text-sm font-black text-primary">
                  {locale === 'ar' ? 'نحن هنا للمساعدة' : 'We are here to help'}
                </div>
                <h2 className="mt-3 text-3xl font-black leading-tight text-foreground md:text-4xl">
                  {locale === 'ar'
                    ? 'إذا لم تكوني متأكدة من الخيار الأنسب، سنساعدك على اختيار المنتج الذي يخدمك بشكل أفضل.'
                    : 'If you are not sure which option fits best, we will help you choose the product that serves you best.'}
                </h2>
              </div>

              <Link to="/contact" className="site-button-primary">
                {locale === 'ar' ? 'ابدئي معنا' : 'Start with us'}
                <ArrowUpLeft size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
