import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpLeft, CheckCircle2, Package, Phone, Truck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { resolveLocale } from '../data/brandSite';
import { formatPrice, type Order } from '../data/storeData';
import { usePageMeta } from '../hooks/usePageMeta';

export function OrderConfirmationPage() {
  const { language } = useLanguage();
  const locale = resolveLocale(language);
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const [order, setOrder] = useState<Partial<Order> | null>(null);

  usePageMeta({
    title: locale === 'ar' ? 'تم تأكيد الطلب' : 'Order Confirmed',
    description: locale === 'ar' ? 'تفاصيل طلبك ومعلومات الشحن والتوصيل' : 'Your order details and shipping information',
  });

  useEffect(() => {
    const stored = localStorage.getItem('nawaedutech_last_order');
    if (stored) {
      try {
        setOrder(JSON.parse(stored) as Partial<Order>);
      } catch {
        // ignore
      }
    }
  }, []);

  const isRTL = locale === 'ar';

  return (
    <div className="overflow-hidden">
      <section className="site-page-hero site-page-hero-light">
        <div className="container relative z-10 mx-auto px-4 pb-10 pt-14">
          <div className="mx-auto max-w-2xl text-center">
            {/* Success icon */}
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 size={48} />
            </div>

            <h1 className="text-3xl font-black text-foreground md:text-5xl">
              {isRTL ? 'تم استلام طلبك!' : 'Order received!'}
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              {isRTL
                ? 'شكراً لطلبك من NawaEduTech. سنتواصل معك في أقرب وقت لتأكيد التوصيل.'
                : 'Thank you for your order from NawaEduTech. We will contact you soon to confirm delivery.'}
            </p>

            {orderId && (
              <div className="mx-auto mt-6 inline-flex items-center gap-3 rounded-full border border-primary/15 bg-primary/5 px-6 py-3">
                <Package size={18} className="text-primary" />
                <span className="text-sm font-bold text-slate-600">
                  {isRTL ? 'رقم الطلب:' : 'Order ID:'}
                </span>
                <span className="font-black text-primary" dir="ltr">{orderId}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-6">

          {/* Order details */}
          {order && (
            <>
              {/* Items */}
              <div className="site-surface p-8">
                <h2 className="mb-6 text-xl font-black text-foreground">
                  {isRTL ? 'المنتجات المطلوبة' : 'Ordered items'}
                </h2>
                <div className="space-y-3">
                  {order.items?.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between gap-4 rounded-[1.5rem] bg-slate-50 p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] text-lg font-black text-white"
                          style={{ background: 'linear-gradient(145deg,#310b82,#5b2bbf)' }}
                        >
                          {item.product.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-black text-foreground">{item.product.name}</div>
                          <div className="text-sm font-bold text-slate-500">× {item.quantity}</div>
                        </div>
                      </div>
                      <span className="font-black text-primary">{formatPrice(item.totalPrice)}</span>
                    </div>
                  ))}
                </div>

                {/* Price breakdown */}
                <div className="mt-6 space-y-2 border-t border-slate-100 pt-5 text-sm">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-600">{isRTL ? 'المجموع الفرعي' : 'Subtotal'}</span>
                    <span className="font-black">{order.subtotal !== undefined ? formatPrice(order.subtotal) : '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-600">{isRTL ? 'التوصيل' : 'Delivery'}</span>
                    <span className="font-black">
                      {order.shippingCost === 0 ? (isRTL ? 'مجاني 🎉' : 'Free 🎉') : formatPrice(order.shippingCost ?? 0)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-3 text-base">
                    <span className="font-black text-foreground">{isRTL ? 'الإجمالي' : 'Total'}</span>
                    <span className="text-xl font-black text-primary">{order.total !== undefined ? formatPrice(order.total) : '-'}</span>
                  </div>
                </div>
              </div>

              {/* Delivery info */}
              {order.shippingAddress && (
                <div className="site-surface p-8">
                  <h2 className="mb-6 flex items-center gap-3 text-xl font-black text-foreground">
                    <Truck size={22} className="text-primary" />
                    {isRTL ? 'بيانات التوصيل' : 'Delivery details'}
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <InfoRow label={isRTL ? 'الاسم' : 'Name'} value={order.shippingAddress.fullName} />
                    <InfoRow label={isRTL ? 'الهاتف' : 'Phone'} value={order.shippingAddress.phone} dir="ltr" />
                    <InfoRow
                      label={isRTL ? 'الولاية' : 'Province'}
                      value={`${order.shippingAddress.wilayaCode} - ${order.shippingAddress.wilayaName}`}
                    />
                    <InfoRow label={isRTL ? 'البلدية' : 'Commune'} value={order.shippingAddress.commune} />
                    <InfoRow
                      label={isRTL ? 'العنوان' : 'Address'}
                      value={order.shippingAddress.address}
                      className="md:col-span-2"
                    />
                  </div>
                </div>
              )}

              {/* Payment */}
              <div className="site-surface p-8">
                <h2 className="mb-4 text-xl font-black text-foreground">
                  {isRTL ? 'طريقة الدفع' : 'Payment method'}
                </h2>
                <div className="rounded-[1.5rem] bg-slate-50 p-4 font-bold text-slate-700">
                  {order.paymentMethod === 'cash_on_delivery' && (
                    <>💵 {isRTL ? 'الدفع عند الاستلام' : 'Cash on delivery'}</>
                  )}
                  {order.paymentMethod === 'ccp' && (
                    <>📮 {isRTL ? 'حساب CCP بريدي' : 'CCP postal account'}</>
                  )}
                  {order.paymentMethod === 'baridimob' && (
                    <>📱 {isRTL ? 'بريدي موب' : 'BaridiMob'}</>
                  )}
                </div>

                {order.paymentMethod !== 'cash_on_delivery' && (
                  <div className="mt-4 rounded-[1.5rem] border border-amber-100 bg-amber-50 p-4 text-sm leading-7 text-amber-800">
                    {isRTL
                      ? 'يرجى إرسال إيصال التحويل عبر واتساب للتواصل السريع وتأكيد الطلب.'
                      : 'Please send the transfer receipt via WhatsApp for quick confirmation.'}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Next steps */}
          <div className="site-panel">
            <h2 className="mb-6 text-xl font-black text-foreground">
              {isRTL ? 'الخطوات التالية' : 'Next steps'}
            </h2>
            <div className="space-y-4">
              {[
                {
                  num: '01',
                  text: isRTL
                    ? 'سيتصل بك فريق نوى للتحقق من الطلب وتأكيد بيانات التوصيل.'
                    : 'Nawa team will call you to verify the order and confirm delivery details.',
                },
                {
                  num: '02',
                  text: isRTL
                    ? 'سيتم تحضير منتجاتك وإرسالها إلى ولايتك في أقرب وقت.'
                    : 'Your products will be prepared and shipped to your province.',
                },
                {
                  num: '03',
                  text: isRTL
                    ? 'ستصلك إشعار بمجرد خروج الطرد للتوصيل.'
                    : "You'll receive a notification once the package is out for delivery.",
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-black text-white">
                    {step.num}
                  </span>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-[2rem] bg-primary p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Phone size={20} className="text-accent" />
              <h2 className="text-xl font-black">{isRTL ? 'تواصلي معنا' : 'Contact us'}</h2>
            </div>
            <p className="text-white/80 leading-7 mb-6">
              {isRTL
                ? 'إذا كان لديك أي استفسار حول طلبك، لا تترددي في التواصل معنا عبر واتساب.'
                : 'If you have any question about your order, feel free to reach us on WhatsApp.'}
            </p>
            <a
              href="https://wa.me/213555123456"
              target="_blank"
              rel="noreferrer"
              className="site-button-gold"
            >
              {isRTL ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
              <ArrowUpLeft size={18} />
            </a>
          </div>

          {/* Back to shop */}
          <div className="text-center">
            <Link to="/shop" className="site-button-ghost">
              {isRTL ? 'مواصلة التسوق' : 'Continue shopping'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoRow({
  label,
  value,
  dir,
  className = '',
}: {
  label: string;
  value: string;
  dir?: 'ltr' | 'rtl';
  className?: string;
}) {
  return (
    <div className={`rounded-[1.25rem] bg-slate-50 p-4 ${className}`}>
      <div className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">{label}</div>
      <div className="mt-1 font-black text-foreground" dir={dir}>{value}</div>
    </div>
  );
}
