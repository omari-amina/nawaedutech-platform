import { cn } from '../lib/utils';

interface SiteSectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
  invert?: boolean;
  className?: string;
}

export function SiteSectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  invert = false,
  className,
}: SiteSectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl space-y-5',
        align === 'center' && 'mx-auto text-center',
        invert && 'text-white',
        className,
      )}
    >
      <span
        className={cn(
          'inline-flex items-center rounded-full px-4 py-2 text-sm font-extrabold tracking-wide',
          invert ? 'bg-white/12 text-white' : 'bg-primary/8 text-primary',
        )}
      >
        {eyebrow}
      </span>

      <div className="space-y-5">
        <h2 className={cn('text-3xl font-black leading-tight md:text-5xl', invert ? 'text-white' : 'text-foreground')}>
          {title}
        </h2>
        <span
          className={cn(
            'block h-1 w-20 rounded-full bg-accent',
            align === 'center' && 'mx-auto',
          )}
        />
      </div>

      <p className={cn('text-lg leading-8', invert ? 'text-white/75' : 'text-slate-600')}>
        {description}
      </p>
    </div>
  );
}
