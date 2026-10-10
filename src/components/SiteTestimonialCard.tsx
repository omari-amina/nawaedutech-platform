import { Sparkles } from 'lucide-react';
import { SiteLocale, TestimonialItem, getLocalizedText } from '../data/brandSite';

interface SiteTestimonialCardProps {
  testimonial: TestimonialItem;
  locale: SiteLocale;
}

export function SiteTestimonialCard({ testimonial, locale }: SiteTestimonialCardProps) {
  const name = getLocalizedText(testimonial.name, locale);

  return (
    <article className="rounded-[2rem] border border-white/12 bg-white/10 p-8 shadow-[0_26px_90px_-54px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-black tracking-[0.18em] text-white/70">
          <Sparkles size={14} className="text-accent" />
          {locale === 'ar' ? 'فئة رئيسية' : 'Core audience'}
        </span>
        <span className="text-4xl font-black text-white/10">“</span>
      </div>

      <p className="mb-8 text-base leading-8 text-white/85">
        {getLocalizedText(testimonial.quote, locale)}
      </p>

      <div className="flex items-center gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-lg font-black text-primary">
          {name.charAt(0)}
        </span>
        <div>
          <div className="font-black text-white">{name}</div>
          <div className="text-sm text-white/65">
            {getLocalizedText(testimonial.role, locale)}
          </div>
        </div>
      </div>
    </article>
  );
}
