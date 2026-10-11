import { useMemo, useState } from 'react';
import { Phone, Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { resolveLocale } from '../../data/brandSite';
import { formatPrice, type Order } from '../../data/storeData';
import { usePageMeta } from '../../hooks/usePageMeta';

interface Customer {
  key: string;
  name: string;
  phone: string;
  wilaya: string;
  orders: number;
  total: number;
  last: string;
}

export function AdminCustomersPage() {
  const { language } = useLanguage();
  const locale = resolveLocale(language);
  const [search, setSearch] = useState('');

  usePageMeta({ title: 'Admin customers', description: 'Customers list', noIndex: true });

  const customers = useMemo<Customer[]>(() => {
    let orders: Partial<Order>[] = [];
    try {
      orders = JSON.parse(localStorage.getItem('nawaedutech_orders') ?? '[]');
    } catch { /* ignore */ }
    const map = new Map<string, Customer>();
    for (const o of orders) {
      const a = o.shippingAddress;
      const key = a?.phone || a?.fullName || o.id || Math.random().toString();
      const cur = map.get(key) || {
        key,
        name: a?.fullName || '—',
        phone: a?.phone || '—',
        wilaya: a?.wilayaName ? `${a.wilayaCode ?? ''} - ${a.wilayaName}` : '—',
        orders: 0,
        total: 0,
        last: '',
      };
      cur.orders += 1;
      if (o.status !== 'cancelled' && o.status !== 'returned') cur.total += o.total ?? 0;
      if ((o.createdAt ?? '') > cur.last) cur.last = o.createdAt ?? '';
      map.set(key, cur);
    }
    return [...map.values()].sort((x, y) => y.total - x.total);
  }, []);

  const q = search.trim().toLowerCase();
  const filtered = q
    ? customers.filter((c) => c.name.toLowerCase().includes(q) || c.phone.includes(q))
    : customers;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-slate-950 md:text-3xl">
          {locale === 'ar' ? 'الزبائن' : locale === 'fr' ? 'Clients' : 'Customers'}
        </h1>
        <p className="mt-1 text-sm font-bold text-slate-500">
          {customers.length} {locale === 'ar' ? 'زبون (مستخرج من الطلبات)' : 'clients (depuis commandes)'}
        </p>
      </div>

      <div className="relative">
        <Search size={16} className="absolute top-1/2 -translate-y-1/2 text-slate-400 start-4" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={locale === 'ar' ? 'ابحث بالاسم أو الهاتف...' : 'Rechercher...'}
          className="w-full rounded-2xl border border-slate-200 bg-white py-3 text-sm font-bold outline-none focus:border-slate-950 ps-10 pe-4"
        />
      </div>

      <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-black uppercase tracking-wider text-slate-400">
                <th className="px-5 py-4 text-start">{locale === 'ar' ? 'الزبون' : 'Client'}</th>
                <th className="px-5 py-4 text-start">{locale === 'ar' ? 'الولاية' : 'Wilaya'}</th>
                <th className="px-5 py-4 text-start">{locale === 'ar' ? 'الطلبات' : 'Commandes'}</th>
                <th className="px-5 py-4 text-start">{locale === 'ar' ? 'إجمالي المشتريات' : 'Total acheté'}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.key} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-base font-black text-white">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-black text-slate-900">{c.name}</div>
                        <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-950" dir="ltr">
                          <Phone size={11} /> {c.phone}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-bold text-slate-600">{c.wilaya}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{c.orders}</span>
                  </td>
                  <td className="px-5 py-3 font-black text-slate-900">{formatPrice(c.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="p-10 text-center text-sm font-bold text-slate-400">
            {locale === 'ar' ? 'لا يوجد زبائن بعد — سيظهرون هنا بعد أول طلب' : 'Aucun client pour le moment'}
          </p>
        )}
      </div>
    </div>
  );
}
