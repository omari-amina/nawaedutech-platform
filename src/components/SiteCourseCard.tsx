import { Link } from 'react-router-dom';
import { ArrowUpLeft, Clock3, Layers3, Sparkles } from 'lucide-react';
import { CourseItem, SiteLocale, getLocalizedText } from '../data/brandSite';

interface SiteCourseCardProps {
  course: CourseItem;
  locale: SiteLocale;
  ctaLabel: string;
}

export function SiteCourseCard({ course, locale, ctaLabel }: SiteCourseCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_28px_90px_-46px_rgba(49,11,130,0.38)] transition-all duration-500 hover:-translate-y-2">
      <div
        className="relative overflow-hidden px-8 py-7"
        style={{ background: `linear-gradient(135deg, ${course.accent} 0%, rgba(49,11,130,0.92) 100%)` }}
      >
        <div className="absolute -top-10 right-0 h-32 w-32 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full bg-white/14 px-3 py-2 text-xs font-black tracking-wider text-white">
              {getLocalizedText(course.badge, locale)}
            </span>
            <h3 className="mt-4 text-2xl font-black leading-tight text-white">
              {getLocalizedText(course.title, locale)}
            </h3>
          </div>

          <div className="rounded-[1.25rem] bg-white/10 p-3 text-accent">
            <Sparkles size={22} />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-8">
        <p className="mb-6 text-base leading-8 text-slate-600">
          {getLocalizedText(course.summary, locale)}
        </p>

        <div className="mb-6 grid gap-3 text-sm font-bold text-slate-700 sm:grid-cols-2">
          <div className="rounded-[1.25rem] bg-[#f7f3ff] p-4">
            <div className="mb-2 flex items-center gap-3 text-primary">
              <Clock3 size={16} />
              <span>{locale === 'ar' ? 'المدة' : 'Duration'}</span>
            </div>
            <div>{getLocalizedText(course.duration, locale)}</div>
          </div>

          <div className="rounded-[1.25rem] bg-[#f7f3ff] p-4">
            <div className="mb-2 flex items-center gap-3 text-primary">
              <Layers3 size={16} />
              <span>{locale === 'ar' ? 'المستوى' : 'Level'}</span>
            </div>
            <div>{getLocalizedText(course.level, locale)}</div>
          </div>
        </div>

        <div className="mb-8 rounded-[1.5rem] bg-slate-50 p-5">
          <div className="mb-3 text-xs font-black tracking-[0.18em] text-slate-400">
            {locale === 'ar' ? 'صيغة التقديم' : 'Format'}
          </div>
          <p className="text-sm font-bold leading-7 text-slate-700">
            {getLocalizedText(course.format, locale)}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-100 pt-6">
          <div className="text-lg font-black text-primary">
            {getLocalizedText(course.price, locale)}
          </div>

          <Link to={`/courses/${course.slug}`} className="site-button-primary px-5 py-3">
            {ctaLabel}
            <ArrowUpLeft size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
