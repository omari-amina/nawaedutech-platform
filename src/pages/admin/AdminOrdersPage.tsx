import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Package,
  RefreshCw,
  Search,
  Truck,
  X,
  XCircle,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { resolveLocale } from '../../data/brandSite';
import {
  type Order,
  type OrderStatus,
  formatPrice,
  orderStatusLabels,
} from '../../data/storeData';
import { usePageMeta } from '../../hooks/usePageMeta';

// ────────────────────────────────────────────────────────────────
// Status badge config
// ────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  OrderStatus,
  { color: string; bg: string; icon: JSX.Element }
> = {
  pending:    { color: 'text-amber-700',  bg: 'bg-amber-50',  icon: <Clock size={14} /> },
  confirmed:  { color: 'text-blue-700',   bg: 'bg-blue-50',   icon: <CheckCircle2 size={14} /> },
  processing: { color: 'text-indigo-700', bg: 'bg-indigo-50', icon: <RefreshCw size={14} /> },
  shipped:    { color: 'text-purple-700', bg: 'bg-purple-50', icon: <Truck size={14} /> },
  delivered:  { color: 'text-green-700',  bg: 'bg-green-50',  icon: <CheckCircle2 size={14} /> },
  cancelled:  { color: 'text-red-700',    bg: 'bg-red-50',    icon: <XCircle size={14} /> },
  returned:   { color: 'text-slate-700',  bg: 'bg-slate-100', icon: <RefreshCw size={14} /> },
};

const ALL_STATUSES: OrderStatus[] = [
  'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned',
];

// ────────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────────

export function AdminOrdersPage({ embedded = false }: { embedded?: boolean }) {
  const { language } = useLanguage();
  const locale = resolveLocale(language);
  const [orders, setOrders] = useState<Partial<Order>[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Partial<Order> | null>(null);

  usePageMeta({
    title: locale === 'ar' ? 'إدارة الطلبات' : 'Orders Management',
    description: locale === 'ar' ? 'لوحة تحكم إدارة الطلبات والشحن لمتجر نوى' : 'Admin orders and delivery dashboard for Nawa store',
    noIndex: true,
  });

  // Load orders from localStorage
  const loadOrders = () => {
    try {
      const stored = localStorage.getItem('nawaedutech_orders');
      if (stored) {
        setOrders((JSON.parse(stored) as Partial<Order>[]).reverse());
      }
    } catch {
      setOrders([]);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Update order status
  const updateStatus = (orderId: string, newStatus: OrderStatus) => {
    const allOrders = JSON.parse(
      localStorage.getItem('nawaedutech_orders') ?? '[]',
    ) as Partial<Order>[];
    const updated = allOrders.map((o) =>
      o.id === orderId
        ? { ...o, status: newStatus, updatedAt: new Date().toISOString() }
        : o,
    );
    localStorage.setItem('nawaedutech_orders', JSON.stringify(updated));
    loadOrders();
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  // Delete order
  const deleteOrder = (orderId: string) => {
    if (!confirm(locale === 'ar' ? 'هل تريد حذف هذا الطلب؟' : 'Delete this order?')) return;
    const allOrders = JSON.parse(
      localStorage.getItem('nawaedutech_orders') ?? '[]',
    ) as Partial<Order>[];
    localStorage.setItem(
      'nawaedutech_orders',
      JSON.stringify(allOrders.filter((o) => o.id !== orderId)),
    );
    loadOrders();
    if (selectedOrder?.id === orderId) setSelectedOrder(null);
  };

  // Filter
  const filtered = orders.filter((o) => {
    const matchSearch =
      !search ||
      o.id?.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingAddress?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingAddress?.phone?.includes(search) ||
      o.shippingAddress?.wilayaName?.includes(search);
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Stats
  const stats = ALL_STATUSES.map((s) => ({
    status: s,
    count: orders.filter((o) => o.status === s).length,
  }));
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled' && o.status !== 'returned')
    .reduce((sum, o) => sum + (o.total ?? 0), 0);

  const isRTL = locale === 'ar';

  return (
    <div className={embedded ? '' : 'min-h-screen bg-slate-50'}>
      {/* Header */}
      {!embedded && (
      <div className="border-b border-slate-200 bg-white px-6 py-5 sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-foreground">
              🗂️ {isRTL ? 'إدارة الطلبات' : 'Orders Management'}
            </h1>
            <p className="text-sm font-bold text-slate-500">NawaEduTech Admin</p>
          </div>
          <button
            onClick={loadOrders}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:text-primary"
          >
            <RefreshCw size={16} />
            {isRTL ? 'تحديث' : 'Refresh'}
          </button>
        </div>
      </div>
      )}

      <div className={embedded ? '' : 'container mx-auto px-4 py-8'}>
        {embedded && (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-black text-slate-950 md:text-3xl">
                {isRTL ? 'الطلبات' : 'Commandes'}
              </h1>
              <p className="mt-1 text-sm font-bold text-slate-500">
                {orders.length} {isRTL ? 'طلب' : 'commandes'} • {formatPrice(totalRevenue)}
              </p>
            </div>
            <button
              onClick={loadOrders}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-black text-slate-600 shadow-sm transition hover:text-slate-950"
            >
              <RefreshCw size={15} />
              {isRTL ? 'تحديث' : 'Actualiser'}
            </button>
          </div>
        )}
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8 mb-8">
          <div className="col-span-2 rounded-[1.75rem] bg-primary p-5 text-white">
            <div className="text-xs font-black text-white/70">
              {isRTL ? 'إجمالي الإيرادات' : 'Total revenue'}
            </div>
            <div className="mt-2 text-2xl font-black">{formatPrice(totalRevenue)}</div>
            <div className="mt-1 text-xs text-white/60">{orders.length} {isRTL ? 'طلب' : 'orders'}</div>
          </div>
          {stats.slice(0, 6).map(({ status, count }) => {
            const cfg = STATUS_CONFIG[status];
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}
                className={`rounded-[1.75rem] p-4 text-left transition ${
                  statusFilter === status ? 'ring-2 ring-primary' : ''
                } ${cfg.bg}`}
              >
                <div className={`text-xs font-black ${cfg.color}`}>
                  {orderStatusLabels[status]}
                </div>
                <div className="mt-2 text-2xl font-black text-foreground">{count}</div>
              </button>
            );
          })}
        </div>

        {/* Search + filter */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isRTL ? 'ابحث برقم الطلب، الاسم، الهاتف...' : 'Search by order ID, name, phone...'}
              className="w-full rounded-full border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-bold text-foreground outline-none transition focus:border-primary/30 focus:ring-4 focus:ring-primary/5"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-foreground outline-none"
          >
            <option value="all">{isRTL ? 'كل الحالات' : 'All statuses'}</option>
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>{orderStatusLabels[s]}</option>
            ))}
          </select>
        </div>

        {/* Orders list */}
        {filtered.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-16 text-center">
            <Package size={48} className="mx-auto mb-4 text-slate-200" />
            <p className="text-lg font-black text-slate-400">
              {isRTL ? 'لا توجد طلبات' : 'No orders found'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((order) => {
              const cfg = order.status ? STATUS_CONFIG[order.status] : STATUS_CONFIG.pending;
              const addr = order.shippingAddress;
              return (
                <div
                  key={order.id}
                  className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)] transition hover:shadow-[0_8px_40px_-16px_rgba(49,11,130,0.2)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-2">
                      {/* Order ID */}
                      <div className="flex items-center gap-3">
                        <span className="font-black text-foreground" dir="ltr">{order.id}</span>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ${cfg.bg} ${cfg.color}`}
                        >
                          {cfg.icon}
                          {order.status ? orderStatusLabels[order.status] : '—'}
                        </span>
                      </div>

                      {/* Customer */}
                      <div className="text-sm font-bold text-slate-600">
                        👤 {addr?.fullName} — 📱 <span dir="ltr">{addr?.phone}</span>
                      </div>
                      <div className="text-sm font-bold text-slate-500">
                        📍 {addr?.wilayaCode} - {addr?.wilayaName} / {addr?.commune}
                      </div>
                      <div className="text-xs text-slate-400">
                        {order.createdAt ? new Date(order.createdAt).toLocaleString('ar-DZ') : '—'}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div className="text-xl font-black text-primary">
                        {order.total !== undefined ? formatPrice(order.total) : '—'}
                      </div>
                      <div className="text-xs font-bold text-slate-500">
                        {order.items?.length ?? 0} {isRTL ? 'منتج' : 'items'} •{' '}
                        {order.paymentMethod === 'cash_on_delivery'
                          ? '💵'
                          : order.paymentMethod === 'ccp'
                            ? '📮'
                            : '📱'}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                          className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:text-primary"
                        >
                          {isRTL ? 'التفاصيل' : 'Details'}
                        </button>
                        <button
                          onClick={() => deleteOrder(order.id!)}
                          className="rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-500 transition hover:bg-red-100"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Status update */}
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-black text-slate-500 self-center">
                        {isRTL ? 'تغيير الحالة:' : 'Update status:'}
                      </span>
                      {ALL_STATUSES.map((s) => {
                        const sc = STATUS_CONFIG[s];
                        const isActive = order.status === s;
                        return (
                          <button
                            key={s}
                            onClick={() => updateStatus(order.id!, s)}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black transition ${
                              isActive
                                ? `${sc.bg} ${sc.color} ring-2 ring-current`
                                : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                            }`}
                          >
                            {sc.icon}
                            {orderStatusLabels[s]}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Order details expanded */}
                  {selectedOrder?.id === order.id && (
                    <div className="mt-5 border-t border-slate-100 pt-5">
                      <div className="grid gap-4 md:grid-cols-2">
                        {/* Items */}
                        <div>
                          <h4 className="mb-3 text-sm font-black text-foreground">
                            {isRTL ? 'المنتجات' : 'Items'}
                          </h4>
                          <div className="space-y-2">
                            {order.items?.map((item) => (
                              <div key={item.productId} className="flex justify-between rounded-xl bg-slate-50 p-3 text-sm">
                                <span className="font-bold text-slate-700">
                                  {item.product.name} × {item.quantity}
                                </span>
                                <span className="font-black text-primary">{formatPrice(item.totalPrice)}</span>
                              </div>
                            ))}
                            <div className="flex justify-between rounded-xl bg-slate-100 p-3 text-sm font-black">
                              <span>{isRTL ? 'المجموع' : 'Total'}</span>
                              <span className="text-primary">{formatPrice(order.total ?? 0)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Address */}
                        <div>
                          <h4 className="mb-3 text-sm font-black text-foreground">
                            {isRTL ? 'عنوان التوصيل' : 'Delivery address'}
                          </h4>
                          <div className="rounded-xl bg-slate-50 p-4 text-sm space-y-2">
                            <div><strong>الاسم:</strong> {addr?.fullName}</div>
                            <div dir="ltr"><strong>الهاتف:</strong> {addr?.phone}</div>
                            {addr?.phone2 && <div dir="ltr"><strong>هاتف 2:</strong> {addr.phone2}</div>}
                            <div><strong>الولاية:</strong> {addr?.wilayaCode} - {addr?.wilayaName}</div>
                            <div><strong>البلدية:</strong> {addr?.commune}</div>
                            <div><strong>العنوان:</strong> {addr?.address}</div>
                            {order.notes && <div><strong>ملاحظات:</strong> {order.notes}</div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
