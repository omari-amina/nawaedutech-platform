import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, ShoppingCart, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';
import { resolveLocale, siteNavigation, siteCopy, getLocalizedText } from '../../data/brandSite';
import { cn } from '../../lib/utils';

export function Header() {
  const { language, toggleLanguage } = useLanguage();
  const { itemCount } = useCart();
  const location = useLocation();
  const locale = resolveLocale(language);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const primaryCta = locale === 'ar' ? 'اطلبي الآن' : locale === 'fr' ? 'Commander' : 'Start now';
  const langLabel = locale === 'ar' ? 'FR' : locale === 'fr' ? 'EN' : 'AR';

  return (
    <header className="sticky top-0 z-50 px-4 py-4">
      <div className="container mx-auto">
        <div className="site-header-shell px-4 md:px-6">
          <div className="flex min-h-[5.5rem] items-center justify-between gap-4">
            <Link to="/" className="flex min-w-0 items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.35rem] bg-[#f7f1ff] shadow-[0_18px_42px_-24px_rgba(49,11,130,0.45)]">
                <img
                  src="/logo-icon.png"
                  alt="NawaEduTech"
                  className="h-9 w-9 object-contain"
                />
              </div>

              <div className="min-w-0 space-y-1">
                <div className="truncate text-base font-black text-primary md:text-lg">NawaEduTech</div>
                <div className="hidden truncate text-xs font-bold text-slate-500 md:block">
                  {getLocalizedText(siteCopy.heroEyebrow, locale)}
                </div>
              </div>
            </Link>

            <nav className="hidden items-center gap-2 lg:flex">
              {siteNavigation.map((item) => {
                const active = location.pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'rounded-full px-4 py-2.5 text-sm font-black transition-all duration-300',
                      active
                        ? 'bg-primary text-white shadow-[0_16px_34px_-24px_rgba(49,11,130,0.8)]'
                        : 'text-slate-700 hover:bg-[#f6f1ff] hover:text-primary',
                    )}
                  >
                    {getLocalizedText(item.label, locale)}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <Link
                to="/cart"
                className="relative inline-flex items-center justify-center h-11 w-11 rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-primary/25 hover:text-primary"
                aria-label={locale === 'ar' ? 'سلة التسوق' : 'Cart'}
              >
                <ShoppingCart size={18} />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-1 text-xs font-black text-white shadow-sm">
                    {itemCount}
                  </span>
                )}
              </Link>

              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-slate-700 transition hover:border-primary/25 hover:text-primary"
              >
                <Globe size={16} />
                {langLabel}
              </button>

              <Link to="/contact" className="site-button-gold px-5 py-3">
                {primaryCta}
              </Link>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <Link
                to="/cart"
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-[1.1rem] border border-slate-200 bg-white text-slate-700"
                aria-label={locale === 'ar' ? 'سلة التسوق' : 'Cart'}
              >
                <ShoppingCart size={18} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-black text-white">
                    {itemCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileMenuOpen((value) => !value)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-[1.1rem] border border-slate-200 text-slate-700"
                aria-label={locale === 'ar' ? 'فتح القائمة' : 'Toggle menu'}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {mobileMenuOpen ? (
            <div className="border-t border-slate-100 py-4 lg:hidden">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3 rounded-[1.5rem] bg-[#f8f5ff] p-3">
                  <span className="text-sm font-black text-slate-500">
                    {locale === 'ar' ? 'تبديل اللغة' : 'Language'}
                  </span>

                  <button
                    onClick={toggleLanguage}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-primary shadow-sm"
                  >
                    <Globe size={16} />
                    {langLabel}
                  </button>
                </div>

                <nav className="space-y-2">
                  {siteNavigation.map((item) => {
                    const active = location.pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'block rounded-[1.25rem] px-4 py-3 text-sm font-black transition-colors',
                          active
                            ? 'bg-primary text-white'
                            : 'bg-slate-50 text-slate-700 hover:bg-[#f6f1ff] hover:text-primary',
                        )}
                      >
                        {getLocalizedText(item.label, locale)}
                      </Link>
                    );
                  })}
                </nav>

                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="site-button-gold flex w-full"
                >
                  {primaryCta}
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
