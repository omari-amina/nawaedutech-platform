import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.about')}</h3>
            <p className="text-gray-400 mb-4">{t('footer.aboutText')}</p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-accent transition">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-accent transition">
                  {t('nav.shop')}
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-accent transition">
                  {t('nav.courses')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail size={18} />
                <span>info@nawaedutech.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone size={18} />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin size={18} />
                <span>Education City</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to get updates</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-accent"
              />
              <button className="bg-accent text-black px-4 py-2 rounded-r-lg hover:bg-yellow-500 transition font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {currentYear} NawaEduTech. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
}
