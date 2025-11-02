import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ShoppingCart, User, Globe, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/logo-icon.png" 
              alt="NawaEduTech Logo" 
              className="h-12 w-12 object-contain"
            />
            <span className="text-xl font-bold text-primary">NawaEduTech</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition">
              {t('nav.home')}
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-primary transition">
              {t('nav.shop')}
            </Link>
            <Link to="/courses" className="text-gray-700 hover:text-primary transition">
              {t('nav.courses')}
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-gray-700 hover:text-primary transition"
            >
              <Globe size={20} />
              <span className="text-sm font-medium">{language === 'en' ? 'AR' : 'EN'}</span>
            </button>

            {/* Cart */}
            <Link to="/cart" className="text-gray-700 hover:text-primary transition">
              <ShoppingCart size={22} />
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary transition"
                >
                  <User size={22} />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <LayoutDashboard size={18} />
                      <span>{t('nav.dashboard')}</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setShowUserMenu(false);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 w-full text-left"
                    >
                      <LogOut size={18} />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary transition font-medium"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition"
                >
                  {t('nav.signup')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
