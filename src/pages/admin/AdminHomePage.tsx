import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowUpLeft,
  Package,
  ShoppingCart,
  Users,
  Wallet,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';
import { resolveLocale } from '../../data/brandSite';
import { formatPrice, orderStatusLabels, type Order } from '../../data/storeData';
import { getAdminProducts } from '../../lib/catalogStore';
import { usePageMeta } from '../../hooks/usePageMeta';

function loadOrders(): Partial<Order>[] {
  try {
    return JSON.parse(localStorage.getItem('nawaedutech_orders') ?? '[]');
  } catch {
    return [];
  }
}

const PIE_COLORS = ['#f59e0b', '#3b82f6', '#6366f1', '#a855f7', '#22c55e', '#ef4444', '#64748b'];

export function AdminHomePage() {
  const { language } = useLanguage();
  const locale = resolveLocale(language);
  const orders = loadOrders();
  const products = getAdminProducts();

  usePageMeta({ title: 'Admin dashboard', description: 'Store overview', noIndex: true });

  const valid = orders.filter((o) => o.status !== 'cancelled' && o.status !== 'returned');
  const revenue = valid.reduce((s, o) => s + (o.total ?? 0), 0);
  const pending = orders.filter((o) => o.status === 'pending').length;
  const avgBasket = valid.length > 0 ? Math.round(revenue / valid.length) : 0;
  const customers = new Set(
    orders.map((o) => o.shippingAddress?.phone || o.shippingAddress?.fullName || o.id),
  ).size;
  const lowStock = products.filter((p) => p.inStock && p.actualPrice > 0 && p.stock <= 10);

  // Revenue last 14 days
  const days: { label: string; total: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const total = valid
      .filter((o) => (o.createdAt ?? '').slice(0, 10) === key)
      .reduce((s, o) => s + (o.total ?? 0), 0);
    days.push({ label: d.toLocaleDateString(locale === 'ar' ? 'ar-DZ' : 'fr-FR', { day: 'numeric', month: 'numeric' }), total });
  }

  // Orders by status
  const byStatus = (Object.keys(orderStatusLabels) as (keyof typeof orderStatusLabels)[])
    .map((s) => ({ name: orderStatusLabels[s], value: orders.filter((o) => o.status === s).length }))
    .filter((x) => x.value > 0);

  // Top products (by qty)
  const qtyByProduct = new Map<string, { name: string; qty: number; total: number }>();
  for (const o of orders) {
    for (const it of o.items ?? []) {
      const cur = qtyByProduct.get(it.productId) || { name: it.product?.name || it.productId, qty: 0, total: 0 };
      cur.qty += it.quantity;
      cur.total += it.totalPrice;
      qtyByProduct.set(it.productId, cur);
    }
  }
  const topProducts = [...qtyByProduct.values()].sort((a, b) => b.qty - a.qty).slice(0, 5);
  const recent = [...orders].reverse().slice(0, 5);

  const kpis = [
    { icon: Wallet, label: locale === 'ar' ? 'إجمالي الإيرادات' : locale === 'fr' ? 'Chiffre d’affaires' : 'Total revenue', value: formatPrice(revenue), bg: 'bg-emerald-500' },
    { icon: ShoppingCart, label: locale === 'ar' ? 'الطلبات' : 'Commandes', value: String(orders.length), bg: 'bg-blue-500', sub: pending > 0 ? `⏳ ${pending} ${locale === 'ar' ? 'بانتظار' : 'pending'}` : undefined },
    { icon: Users, label: locale === 'ar' ? 'الزبائن' : 'Clients', value: String(customers), bg: 'bg-violet-500', sub: avgBasket > 0 ? `${locale === 'ar' ? 'متوسط السلة' : 'Panier moyen'}: ${formatPrice(avgBasket)}` : undefined },
    { icon: Package, label: locale === 'ar' ? 'المنتجات' : 'Produits', value: String(products.length), bg: 'bg-amber-500', sub: lowStock.length > 0 ? `⚠️ ${lowStock.length} ${locale === 'ar' ? 'مخزون منخفض' : 'stock bas'}` : undefined },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-950 md:text-3xl">
            {locale === 'ar' ? 'لوحة القيادة' : locale === 'fr' ? 'Tableau de bord' : 'Dashboard'}
          </h1>
          <p className="mt-1 text-sm font-bold text-slate-500">
            {locale === 'ar' ? 'نظرة شاملة على أداء متجرك' : locale === 'fr' ? 'Vue d’ensemble de votre boutique' : 'Your store at a glance'}
          </p>
        </div>
        <Link to="/admin/products" className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800">
          {locale === 'ar' ? 'إضافة منتج' : 'Ajouter produit'}
          <ArrowUpLeft size={16} />
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-[1.75rem] bg-white p-5 shadow-sm">
            <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl text-white ${k.bg}`}>
              <k.icon size={20} />
            </div>
            <div className="mt-4 text-xl font-black text-slate-950 md:text-2xl">{k.value}</div>
            <div className="mt-1 text-xs font-black text-slate-500">{k.label}</div>
            {k.sub && <div className="mt-1 text-xs font-bold text-amber-600">{k.sub}</div>}
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="rounded-[1.75rem] bg-white p-5 shadow-sm md:p-6">
        <h2 className="font-black text-slate-950">
          {locale === 'ar' ? 'الإيرادات — آخر 14 يومًا' : locale === 'fr' ? 'Revenus — 14 derniers jours' : 'Revenue — last 14 days'}
        </h2>
        <div className="mt-4 h-64" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={days}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} width={60} />
              <Tooltip formatter={(v) => [formatPrice(Number(v)), locale === 'ar' ? 'الإيراد' : 'Revenu']} />
              <Area type="monotone" dataKey="total" stroke="#310b82" fill="#310b82" fillOpacity={0.15} strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {/* Status donut */}
        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm md:p-6">
          <h2 className="font-black text-slate-950">{locale === 'ar' ? 'الطلبات حسب الحالة' : 'Commandes par statut'}</h2>
          {byStatus.length === 0 ? (
            <p className="mt-6 py-10 text-center text-sm font-bold text-slate-400">
              {locale === 'ar' ? 'لا توجد طلبات بعد' : 'Aucune commande'}
            </p>
          ) : (
            <div className="mt-2 h-60" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={byStatus} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                    {byStatus.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Top products */}
        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm md:p-6">
          <h2 className="font-black text-slate-950">{locale === 'ar' ? 'الأكثر مبيعًا' : 'Top produits'}</h2>
          {topProducts.length === 0 ? (
            <p className="mt-6 py-10 text-center text-sm font-bold text-slate-400">
              {locale === 'ar' ? 'لا توجد مبيعات بعد' : 'Aucune vente'}
            </p>
          ) : (
            <div className="mt-2 h-60" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={110} />
                  <Tooltip formatter={(v, _n, p) => [`${v} × — ${formatPrice(Number(p?.payload?.total ?? 0))}`, locale === 'ar' ? 'الكمية' : 'Qté']} />
                  <Bar dataKey="qty" fill="#eeb32a" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Low stock + recent */}
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm md:p-6">
          <h2 className="flex items-center gap-2 font-black text-slate-950">
            <AlertTriangle size={18} className="text-amber-500" />
            {locale === 'ar' ? 'تنبيهات المخزون' : 'Alertes stock'}
          </h2>
          {lowStock.length === 0 ? (
            <p className="mt-4 text-sm font-bold text-slate-400">
              {locale === 'ar' ? 'كل المنتجات بمخزون جيد ✅' : 'Stock OK ✅'}
            </p>
          ) : (
            <div className="mt-4 space-y-2">
              {lowStock.map((p) => (
                <Link key={p.id} to="/admin/products" className="flex items-center justify-between rounded-2xl bg-amber-50 px-4 py-3 text-sm">
                  <span className="font-black text-slate-800">{p.titleAr}</span>
                  <span className="font-black text-amber-700">{locale === 'ar' ? 'المتبقي' : 'Reste'}: {p.stock}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[1.75rem] bg-white p-5 shadow-sm md:p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-black text-slate-950">{locale === 'ar' ? 'أحدث الطلبات' : 'Dernières commandes'}</h2>
            <Link to="/admin/orders" className="text-xs font-black text-slate-500 hover:text-slate-950">
              {locale === 'ar' ? 'عرض الكل ←' : 'Tout voir ←'}
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="mt-4 text-sm font-bold text-slate-400">
              {locale === 'ar' ? 'لا توجد طلبات بعد' : 'Aucune commande'}
            </p>
          ) : (
            <div className="mt-4 space-y-2">
              {recent.map((o) => (
                <div key={o.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm">
                  <div>
                    <div className="font-black text-slate-800" dir="ltr">{o.id}</div>
                    <div className="text-xs font-bold text-slate-500">{o.shippingAddress?.fullName}</div>
                  </div>
                  <div className="font-black text-primary">{formatPrice(o.total ?? 0)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
