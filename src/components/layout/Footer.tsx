import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Mail, Phone, MapPin, Youtube } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <img src="/logo-icon.png" alt="Nawa Logo" className="w-10 h-10 brightness-0 invert opacity-80" />
              <h3 className="text-2xl font-bold">NawaEduTech</h3>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed font-light">
              {t('footer.aboutText')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <SocialIcon href="https://facebook.com" icon={<Facebook size={20} />} />
              <SocialIcon href="https://instagram.com" icon={<Instagram size={20} />} />
              <SocialIcon href="https://youtube.com" icon={<Youtube size={20} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <FooterLink to="/">{t('nav.home')}</FooterLink>
              <FooterLink to="/shop">{t('nav.shop')}</FooterLink>
              <FooterLink to="/courses">{t('nav.courses')}</FooterLink>
              <FooterLink to="/about">{t('nav.about')}</FooterLink>
              <FooterLink to="/contact">{t('nav.contact')}</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 rtl:space-x-reverse text-primary-foreground/80">
                <Mail size={20} className="mt-1 flex-shrink-0" />
                <span>info@nawaedutech.com</span>
              </li>
              <li className="flex items-start space-x-3 rtl:space-x-reverse text-primary-foreground/80">
                <Phone size={20} className="mt-1 flex-shrink-0" />
                <span dir="ltr">+213 555 123 456</span>
              </li>
              <li className="flex items-start space-x-3 rtl:space-x-reverse text-primary-foreground/80">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span>Algeria, Education City</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6">Stay Connected</h3>
            <p className="text-primary-foreground/80 mb-4 text-sm">Join our community of teachers and learners.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent transition"
              />
              <button className="w-full bg-accent text-primary font-bold px-4 py-3 rounded-xl hover:bg-white hover:text-primary transition-all shadow-lg shadow-accent/10">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-center text-primary-foreground/60 text-sm">
          <p>
            &copy; {currentYear} NawaEduTech. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon }: { href: string, icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300"
    >
      {icon}
    </a>
  );
}

function FooterLink({ to, children }: { to: string, children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-primary-foreground/80 hover:text-accent transition-colors flex items-center">
        <span className="w-1.5 h-1.5 rounded-full bg-accent mr-3 rtl:ml-3 rtl:mr-0 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        {children}
      </Link>
    </li>
  );
}
