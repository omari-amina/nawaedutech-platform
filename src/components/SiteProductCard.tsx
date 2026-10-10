import { Link } from 'react-router-dom';
import { ArrowUpLeft, CheckCircle2 } from 'lucide-react';
import { ProductItem, SiteLocale, getLocalizedList, getLocalizedText } from '../data/brandSite';

interface SiteProductCardProps {
  product: ProductItem;
  locale: SiteLocale;
  ctaLabel: string;
}

export function SiteProductCard({ product, locale, ctaLabel }: SiteProductCardProps) {
  const title = getLocalizedText(product.title, locale);
  const contactPath = `/contact?subject=${encodeURIComponent(
    locale === 'ar' ? `طلب منتج: ${title}` : `Product request: ${title}`,
  )}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_26px_90px_-50px_rgba(49,11,130,0.45)] transition-all duration-500 hover:-translate-y-2">
      <div
        className="relative overflow-hidden px-8 pb-8 pt-6"
        style={{
          background: `linear-gradient(145deg, ${product.accent} 0%, rgba(49,11,130,0.92) 100%)`,
        }}
      >
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-accent/25 blur-3xl" />

        <div className="relative z-10 flex items-start justify-between gap-3">
          <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-black tracking-wider text-white">
            {getLocalizedText(product.category, locale)}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-white/85">
            {getLocalizedText(product.price, locale)}
          </span>
        </div>

        <div className="relative z-10 mt-8">
          <Link to={`/shop/${product.slug}`} className="hover:underline">
            <h3 className="max-w-sm text-2xl font-black leading-tight text-white">
              {title}
            </h3>
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-7 text-white/82">
            {getLocalizedText(product.audience, locale)}
          </p>

          {product.image ? (
            <Link to={`/shop/${product.slug}`} className="block">
              <img
                src={product.image}
                alt={getLocalizedText(product.title, locale)}
                className="mt-6 h-40 w-full rounded-[1.5rem] border border-white/12 object-cover transition duration-700 group-hover:scale-[1.02]"
              />
            </Link>
          ) : (
            <Link to={`/shop/${product.slug}`} className="block">
              <div className="mt-6 flex h-40 items-end rounded-[1.5rem] border border-white/10 bg-white/10 p-6">
                <span className="text-6xl font-black text-white/75">
                  {title.charAt(0)}
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-8">
        <p className="mb-6 text-base leading-8 text-slate-600">
          {getLocalizedText(product.summary, locale)}
        </p>

        <div className="mb-8 flex flex-wrap gap-2">
          {getLocalizedList(product.highlights, locale).map((highlight) => (
            <span
              key={highlight}
              className="inline-flex items-center gap-2 rounded-full bg-[#f7f3ff] px-3 py-2 text-sm font-bold text-slate-700"
            >
              <CheckCircle2 size={16} className="text-primary" />
              {highlight}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-100 pt-6">
          <div>
            <div className="text-xs font-black tracking-[0.18em] text-slate-400">
              {locale === 'ar' ? 'السعر' : 'Price'}
            </div>
            <div className="text-xl font-black text-primary">
              {getLocalizedText(product.price, locale)}
            </div>
          </div>

          <Link to={`/shop/${product.slug}`} className="site-button-primary px-5 py-3">
            {ctaLabel}
            <ArrowUpLeft size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
