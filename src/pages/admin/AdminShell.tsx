import { Link, Navigate, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  Users,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { closeAdminSession, isAdminSession } from '../../lib/adminAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import { resolveLocale } from '../../data/brandSite';
import { cn } from '../../lib/utils';

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  if (!isAdminSession()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}

const NAV = [
  { to: '/admin', end: true, icon: LayoutDashboard, ar: 'لوحة القيادة', en: 'Dashboard', fr: 'Tableau de bord' },
  { to: '/admin/products', end: false, icon: Package, ar: 'المنتجات', en: 'Products', fr: 'Produits' },
  { to: '/admin/orders', end: false, icon: ShoppingCart, ar: 'الطلبات', en: 'Orders', fr: 'Commandes' },
  { to: '/admin/customers', end: false, icon: Users, ar: 'الزبائن', en: 'Customers', fr: 'Clients' },
  { to: '/admin/settings', end: false, icon: Settings, ar: 'الإعدادات', en: 'Settings', fr: 'Réglages' },
];

export function AdminShell() {
  const { language } = useLanguage();
  const locale = resolveLocale(language);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const label = (item: (typeof NAV)[number]) =>
    locale === 'ar' ? item.ar : locale === 'fr' ? item.fr : item.en;

  const logout = () => {
    closeAdminSession();
    navigate('/admin/login');
  };

  const navList = (
    <nav className="space-y-1 p-3">
      {NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition',
              isActive
                ? 'bg-slate-950 text-white shadow-lg'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
            )
          }
        >
          <item.icon size={18} />
          {label(item)}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 z-40 hidden w-64 flex-col bg-white shadow-xl lg:flex" style={{ insetInlineStart: 0 }}>
        <div className="flex items-center gap-3 border-b border-slate-100 p-5">
          <img src="/logo-icon.png" alt="Nawa" className="h-10 w-10 rounded-2xl bg-[#f7f1ff] p-1" />
          <div>
            <div className="font-black text-slate-950">Nawa Admin</div>
            <div className="text-[11px] font-bold text-slate-400">
              {locale === 'ar' ? 'إدارة المتجر' : locale === 'fr' ? 'Gestion boutique' : 'Store manager'}
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">{navList}</div>
        <div className="space-y-1 border-t border-slate-100 p-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <ExternalLink size={18} />
            {locale === 'ar' ? 'عرض المتجر' : locale === 'fr' ? 'Voir boutique' : 'View store'}
          </Link>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={18} />
            {locale === 'ar' ? 'تسجيل الخروج' : locale === 'fr' ? 'Déconnexion' : 'Log out'}
          </button>
        </div>
      </aside>

      {/* Mobile topbar */}
      <div className="sticky top-0 z-40 flex items-center justify-between gap-3 bg-white/95 px-4 py-3 shadow-sm backdrop-blur lg:hidden">
        <div className="flex items-center gap-2">
          <img src="/logo-icon.png" alt="Nawa" className="h-9 w-9 rounded-xl bg-[#f7f1ff] p-1" />
          <span className="font-black text-slate-950">Nawa Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700"
          aria-label="menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="z-40 border-b border-slate-200 bg-white shadow-lg lg:hidden">
          {navList}
          <div className="flex gap-2 border-t border-slate-100 p-3">
            <Link to="/" className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-700">
              <ExternalLink size={16} />
              {locale === 'ar' ? 'المتجر' : 'Store'}
            </Link>
            <button onClick={logout} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-black text-red-500">
              <LogOut size={16} />
              {locale === 'ar' ? 'خروج' : 'Exit'}
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="lg:ps-64">
        <div className="mx-auto max-w-6xl p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
