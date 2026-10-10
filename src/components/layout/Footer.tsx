import { Link } from 'react-router-dom';
import { ArrowUpLeft, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  contactMethods,
  resolveLocale,
  siteNavigation,
  siteCopy,
  getLocalizedText,
} from '../../data/brandSite';

export function Footer() {
  const { language } = useLanguage();
  const locale = resolveLocale(language);
  const year = new Date().getFullYear();
  const emailMethod = contactMethods[0];
  const whatsappMethod = contactMethods[1];

  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(135deg,#22074d_0%,#300b7d_42%,#4e21b5_100%)] text-white">
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.75fr_1fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white/10 backdrop-blur-xl">
                <img
                  src="/logo-icon.png"
                  alt="NawaEduTech"
                  className="h-10 w-10 object-contain"
                />
              </div>

              <div>
                <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-black text-white/85">
                  {getLocalizedText(siteCopy.heroEyebrow, locale)}
                </span>
                <h3 className="mt-3 text-3xl font-black">NawaEduTech</h3>
              </div>
            </div>

            <div className="max-w-xl">
              <p className="text-base leading-8 text-white/72">
                {getLocalizedText(siteCopy.contactCtaDescription, locale)}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={emailMethod.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-3 text-sm font-black text-white transition hover:bg-white/14"
              >
                <Mail size={16} />
                {locale === 'ar' ? 'راسلينا' : 'Email us'}
              </a>
              <a
                href={whatsappMethod.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-3 text-sm font-black text-white transition hover:bg-white/14"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-black">
              {locale === 'ar' ? 'روابط الموقع' : 'Explore'}
            </h4>
            <div className="grid gap-3">
              {siteNavigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="inline-flex items-center gap-2 text-base font-bold text-white/70 transition hover:text-white"
                >
                  <ArrowUpLeft size={16} />
                  {getLocalizedText(item.label, locale)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-black">
              {locale === 'ar' ? 'بيانات التواصل' : 'Contact details'}
            </h4>
            <div className="space-y-5">
              {contactMethods.map((method, index) => {
                const Icon = index === 0 ? Mail : index === 1 ? Phone : MapPin;

                return (
                  <a
                    key={method.href}
                    href={method.href}
                    className="block rounded-[1.75rem] border border-white/12 bg-white/8 p-5 transition hover:bg-white/14"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-accent">
                        <Icon size={18} />
                      </span>
                      <div className="text-sm font-black text-white/72">
                        {getLocalizedText(method.title, locale)}
                      </div>
                    </div>
                    <div className="mb-2 text-base font-black text-white">
                      {getLocalizedText(method.value, locale)}
                    </div>
                    <div className="text-sm leading-7 text-white/62">
                      {getLocalizedText(method.hint, locale)}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} NawaEduTech</p>
          <p>
            {locale === 'ar'
              ? 'حلول تعليمية وتنظيمية رقمية بهوية جزائرية.'
              : 'Educational and organizational digital solutions with an Algerian identity.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
