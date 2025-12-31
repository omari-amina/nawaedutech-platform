import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Mail, Phone, MapPin, Youtube } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-900 pt-20 pb-10 mt-auto border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
              <img
                src="/logo-nawa.png"
                alt="Nawa Logo"
                className="h-40 w-auto"
              />
            </div>
            <p className="text-gray-600 leading-relaxed font-light">
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
            <h3 className="text-xl font-bold mb-6 text-primary">{t('footer.quickLinks')}</h3>
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
            <h3 className="text-xl font-bold mb-6 text-primary">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 rtl:space-x-reverse text-gray-600">
                <Mail size={20} className="mt-1 flex-shrink-0 text-primary" />
                <span>info@nawaedutech.com</span>
              </li>
              <li className="flex items-start space-x-3 rtl:space-x-reverse text-gray-600">
                <Phone size={20} className="mt-1 flex-shrink-0 text-primary" />
                <span dir="ltr">+213 555 123 456</span>
              </li>
              <li className="flex items-start space-x-3 rtl:space-x-reverse text-gray-600">
                <MapPin size={20} className="mt-1 flex-shrink-0 text-primary" />
                <span>Algeria, Education City</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-primary">Stay Connected</h3>
            <p className="text-gray-600 mb-4 text-sm">Join our community of teachers and learners.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary transition"
              />
              <button className="w-full bg-primary text-white font-bold px-4 py-3 rounded-xl hover:bg-primary-light transition-all shadow-lg shadow-primary/20">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-16 pt-8 text-center text-gray-500 text-sm">
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
      className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
    >
      {icon}
    </a>
  );
}

function FooterLink({ to, children }: { to: string, children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="text-gray-600 hover:text-primary transition-colors flex items-center group">
        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3 rtl:ml-3 rtl:mr-0 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        {children}
      </Link>
    </li>
  );
}
