import { Link } from 'react-router-dom';
import { ArrowUpLeft, Compass } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { resolveLocale } from '../data/brandSite';
import { usePageMeta } from '../hooks/usePageMeta';

export function NotFoundPage() {
  const { language } = useLanguage();
  const locale = resolveLocale(language);

  usePageMeta({
    title: locale === 'ar' ? 'الصفحة غير موجودة' : 'Page not found',
    description: locale === 'ar'
      ? 'الصفحة التي تبحث عنها غير متاحة حاليًا. يمكنك العودة إلى الرئيسية أو متابعة تصفح منتجات ودورات NawaEduTech.'
      : 'The page you are looking for is not available right now. Return home or continue browsing NawaEduTech products and courses.',
    noIndex: true,
  });

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="site-surface mx-auto max-w-4xl overflow-hidden bg-[linear-gradient(135deg,rgba(49,11,130,0.04),rgba(243,185,66,0.16))] p-8 text-center md:p-14">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-primary text-white">
          <Compass size={28} />
        </div>
        <div className="mt-6 text-sm font-black text-primary">
          404
        </div>
        <h1 className="mt-3 text-3xl font-black leading-tight text-foreground md:text-5xl">
          {locale === 'ar' ? 'هذه الصفحة غير موجودة' : 'This page is not available'}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          {locale === 'ar'
            ? 'قد يكون الرابط قد تغيّر أو لم تعد الصفحة متاحة. يمكنك العودة إلى الرئيسية أو متابعة التصفح من الأقسام الأساسية.'
            : 'The link may have changed or the page is no longer available. You can return to the homepage or continue browsing from the main sections.'}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-4 text-sm font-black text-white transition hover:bg-primary"
          >
            {locale === 'ar' ? 'العودة إلى الرئيسية' : 'Back to home'}
            <ArrowUpLeft size={18} />
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-black text-slate-700 transition hover:border-primary/20 hover:text-primary"
          >
            {locale === 'ar' ? 'استكشفي المنتجات' : 'Explore products'}
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-black text-slate-700 transition hover:border-primary/20 hover:text-primary"
          >
            {locale === 'ar' ? 'تواصلي معنا' : 'Contact us'}
          </Link>
        </div>
      </div>
    </div>
  );
}
