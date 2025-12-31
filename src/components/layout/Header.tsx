import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ShoppingCart, User, Globe, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
            <div className="relative">
              <div className="absolute inset-0 bg-accent blur-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <img
                src="/logo-nawa.png"
                alt="NawaEduTech Logo"
                className="h-24 w-auto object-contain relative z-10"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <NavLink to="/" active={isActive('/')}>{t('nav.home')}</NavLink>
            <NavLink to="/shop" active={isActive('/shop')}>{t('nav.shop')}</NavLink>
            <NavLink to="/courses" active={isActive('/courses')}>{t('nav.courses')}</NavLink>
            <NavLink to="/about" active={isActive('/about')}>{t('nav.about')}</NavLink>
            <NavLink to="/contact" active={isActive('/contact')}>{t('nav.contact')}</NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-primary transition-colors hover:bg-primary/5 rounded-full"
            >
              <ShoppingCart size={22} />
              {/* Add Cart Badge logic here if needed */}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 rtl:space-x-reverse p-1 pr-3 rtl:pl-3 rtl:pr-1 rounded-full border border-gray-200 hover:shadow-md transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                    {user.email?.[0].toUpperCase()}
                  </div>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 rtl:left-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-2 border-b border-gray-100 mb-2">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-primary"
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
                      className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-red-500 hover:bg-red-50 w-full text-left rtl:text-right"
                    >
                      <LogOut size={18} />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3 rtl:space-x-reverse">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary font-medium px-4 py-2"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20 transition-all transform hover:-translate-y-0.5"
                >
                  {t('nav.signup')}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Simplified) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="space-y-1 px-4 py-4">
            <MobileNavLink to="/" onClick={() => setMobileMenuOpen(false)}>{t('nav.home')}</MobileNavLink>
            <MobileNavLink to="/shop" onClick={() => setMobileMenuOpen(false)}>{t('nav.shop')}</MobileNavLink>
            <MobileNavLink to="/courses" onClick={() => setMobileMenuOpen(false)}>{t('nav.courses')}</MobileNavLink>
            <MobileNavLink to="/about" onClick={() => setMobileMenuOpen(false)}>{t('nav.about')}</MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>{t('nav.contact')}</MobileNavLink>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, children, active }: { to: string, children: React.ReactNode, active: boolean }) {
  return (
    <Link
      to={to}
      className={`relative font-medium transition-colors duration-300 ${active ? 'text-primary' : 'text-gray-500 hover:text-primary'
        }`}
    >
      {children}
      {active && (
        <span className="absolute -bottom-8 left-0 right-0 h-1 bg-primary rounded-t-full"></span>
      )}
    </Link>
  );
}

function MobileNavLink({ to, children, onClick }: { to: string, children: React.ReactNode, onClick: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-3 py-3 rounded-md text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50"
    >
      {children}
    </Link>
  );
}
