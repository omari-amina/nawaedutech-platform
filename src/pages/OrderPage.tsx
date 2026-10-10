import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ArrowUpLeft,
  CheckCircle2,
  ChevronDown,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  Truck,
  User,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { resolveLocale } from '../data/brandSite';
import { formatPrice, generateOrderId, type Order } from '../data/storeData';
import {
  calculateShipping,
  FREE_SHIPPING_THRESHOLD,
  getDeliveryTimeText,
  getWilayaByCode,
  sortedWilayas,
} from '../data/algeriaWilayas';
import { usePageMeta } from '../hooks/usePageMeta';
import { SiteSectionHeading } from '../components/SiteSectionHeading';

// ────────────────────────────────────────────────────────────────
// Form schema
// ────────────────────────────────────────────────────────────────

const orderSchema = z.object({
  fullName: z.string().min(3, 'الاسم قصير جداً'),
  phone: z.string().min(9, 'رقم الهاتف غير صحيح').max(13),
  phone2: z.string().optional(),
  wilayaCode: z.string().min(1, 'اختاري الولاية'),
  commune: z.string().min(2, 'ادخلي اسم البلدية'),
  address: z.string().min(5, 'ادخلي العنوان التفصيلي'),
  paymentMethod: z.enum(['cash_on_delivery', 'ccp', 'baridimob']),
  notes: z.string().optional(),
});

type OrderFormValues = z.infer<typeof orderSchema>;

const PAYMENT_OPTIONS = [
  {
    id: 'cash_on_delivery' as const,
    icon: '💵',
    labelAr: 'الدفع عند الاستلام',
    descAr: 'ادفعي نقداً عند استلام طلبك',
  },
  {
    id: 'ccp' as const,
    icon: '📮',
    labelAr: 'حساب CCP بريدي',
    descAr: 'تحويل عبر حساب البريد الجزائري',
  },
  {
    id: 'baridimob' as const,
    icon: '📱',
    labelAr: 'بريدي موب',
    descAr: 'دفع إلكتروني عبر تطبيق بريدي موب',
  },
];

// ────────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────────

export function OrderPage() {
  const { language } = useLanguage();
  const locale = resolveLocale(language);
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [selectedWilaya, setSelectedWilaya] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  usePageMeta({
    title: locale === 'ar' ? 'إتمام الطلب' : 'Checkout',
    description: locale === 'ar'
      ? 'أدخلي بيانات التوصيل لإتمام طلبك'
      : 'Enter your delivery information to complete your order',
  });

  const shippingCost = calculateShipping(selectedWilaya, subtotal);
  const orderTotal = subtotal + shippingCost;
  const wilayaInfo = getWilayaByCode(selectedWilaya);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      paymentMethod: 'cash_on_delivery',
    },
  });

  const watchedWilaya = watch('wilayaCode');
  if (watchedWilaya !== selectedWilaya) {
    setSelectedWilaya(watchedWilaya ?? '');
  }

  if (items.length === 0) {
    navigate('/shop');
    return null;
  }

  const onSubmit = async (data: OrderFormValues) => {
    setIsSubmitting(true);
    try {
      const selectedWilayaData = getWilayaByCode(data.wilayaCode);
      const orderId = generateOrderId();

      const order: Partial<Order> = {
        id: orderId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'pending',
        items: items.map((item) => ({
          productId: item.productId,
          product: {
            id: item.productId,
            name: item.title.ar,
            description: '',
            price: formatPrice(item.price),
            category: item.productType,
            images: [],
            actualPrice: item.price,
            inStock: true,
            productType: item.productType as 'kit',
            originalProductId: item.productId,
          },
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity,
        })),
        shippingAddress: {
          fullName: data.fullName,
          phone: data.phone,
          phone2: data.phone2,
          wilayaCode: data.wilayaCode,
          wilayaName: selectedWilayaData?.nameAr ?? '',
          commune: data.commune,
          address: data.address,
          zone: selectedWilayaData?.zone,
        },
        paymentMethod: data.paymentMethod,
        subtotal,
        shippingCost,
        total: orderTotal,
        notes: data.notes,
      };

      // Store order in localStorage (simple approach without backend)
      const existingOrders = JSON.parse(
        localStorage.getItem('nawaedutech_orders') ?? '[]',
      ) as Partial<Order>[];
      existingOrders.push(order);
      localStorage.setItem('nawaedutech_orders', JSON.stringify(existingOrders));
      localStorage.setItem('nawaedutech_last_order', JSON.stringify(order));

      clearCart();
      navigate(`/order-confirmation?id=${orderId}`);
    } catch (err) {
      console.error('Order submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Header */}
      <section className="site-page-hero site-page-hero-light">
        <div className="container relative z-10 mx-auto px-4 pb-10 pt-14">
          <span className="site-overline site-overline-dark">
            {locale === 'ar' ? 'إتمام الطلب' : 'Checkout'}
          </span>
          <h1 className="mt-4 text-3xl font-black text-foreground md:text-4xl">
            {locale === 'ar'
              ? 'أدخلي بيانات التوصيل لإتمام الطلب'
              : 'Enter your delivery details to place the order'}
          </h1>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap gap-4">
            {[
              { icon: <ShieldCheck size={16} />, text: locale === 'ar' ? 'تسوق آمن ومضمون' : 'Safe & secure' },
              { icon: <Truck size={16} />, text: locale === 'ar' ? 'توصيل لكل ولايات الجزائر' : 'Delivery across Algeria' },
              { icon: <CheckCircle2 size={16} />, text: locale === 'ar' ? 'ضمان استرداد المال' : 'Money-back guarantee' },
            ].map((badge) => (
              <div
                key={badge.text}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600"
              >
                <span className="text-primary">{badge.icon}</span>
                {badge.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.45fr]">
            {/* Left – Form */}
            <div className="space-y-8">
              {/* Personal info */}
              <div className="site-surface p-8">
                <SiteSectionHeading
                  eyebrow={locale === 'ar' ? 'بيانات المتلقي' : 'Recipient info'}
                  title={locale === 'ar' ? 'من سيستلم الطلب؟' : 'Who will receive the order?'}
                  description={locale === 'ar' ? 'يرجى كتابة الاسم ورقم الهاتف الفعلي للتواصل عند التوصيل.' : 'Please provide real name and contact phone for delivery.'}
                />

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <FormField
                    label={locale === 'ar' ? 'الاسم الكامل' : 'Full name'}
                    error={errors.fullName?.message}
                    icon={<User size={16} />}
                  >
                    <input
                      {...register('fullName')}
                      placeholder={locale === 'ar' ? 'مثال: سارة بن علي' : 'e.g. Sara Ben Ali'}
                      className="site-form-input"
                    />
                  </FormField>

                  <FormField
                    label={locale === 'ar' ? 'رقم الهاتف' : 'Phone number'}
                    error={errors.phone?.message}
                    icon={<Phone size={16} />}
                  >
                    <input
                      {...register('phone')}
                      placeholder="0555 123 456"
                      type="tel"
                      className="site-form-input"
                      dir="ltr"
                    />
                  </FormField>

                  <FormField
                    label={locale === 'ar' ? 'رقم هاتف بديل (اختياري)' : 'Alternative phone (optional)'}
                    icon={<Phone size={16} />}
                  >
                    <input
                      {...register('phone2')}
                      placeholder="0666 789 012"
                      type="tel"
                      className="site-form-input"
                      dir="ltr"
                    />
                  </FormField>
                </div>
              </div>

              {/* Shipping address */}
              <div className="site-surface p-8">
                <SiteSectionHeading
                  eyebrow={locale === 'ar' ? 'عنوان التوصيل' : 'Delivery address'}
                  title={locale === 'ar' ? 'أين نوصل إليك؟' : 'Where should we deliver?'}
                  description={locale === 'ar' ? 'اختاري ولايتك من بين الـ 58 ولاية وسيتم احتساب مدة وسعر التوصيل تلقائيًا.' : 'Choose your wilaya from the 58 Algerian provinces to compute delivery.'}
                />

                <div className="mt-8 grid gap-5">
                  {/* Wilaya select */}
                  <FormField
                    label={locale === 'ar' ? 'الولاية' : 'Province (Wilaya)'}
                    error={errors.wilayaCode?.message}
                    icon={<MapPin size={16} />}
                  >
                    <div className="relative">
                      <select
                        {...register('wilayaCode', {
                          onChange: (e) => setSelectedWilaya(e.target.value as string),
                        })}
                        className="site-form-input appearance-none pr-10"
                      >
                        <option value="">
                          {locale === 'ar' ? '-- اختاري الولاية --' : '-- Select province --'}
                        </option>
                        {sortedWilayas.map((w) => (
                          <option key={w.code} value={w.code}>
                            {w.code} - {w.nameAr} ({w.nameFr})
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute inset-y-0 right-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </FormField>

                  {/* Delivery info box */}
                  {wilayaInfo && (
                    <div className="rounded-[1.5rem] border border-primary/12 bg-primary/5 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 text-primary">
                          <Truck size={18} />
                          <span className="font-black">
                            {locale === 'ar' ? 'معلومات التوصيل' : 'Delivery info'}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-bold text-slate-500">
                            {locale === 'ar' ? 'المدة المتوقعة' : 'Estimated time'}
                          </div>
                          <div className="font-black text-foreground">{getDeliveryTimeText(wilayaInfo.code)}</div>
                        </div>
                        <div>
                          <div className="font-bold text-slate-500">
                            {locale === 'ar' ? 'تكلفة التوصيل' : 'Delivery cost'}
                          </div>
                          <div className="font-black text-foreground">
                            {shippingCost === 0
                              ? (locale === 'ar' ? '🎉 مجاني!' : '🎉 Free!')
                              : formatPrice(shippingCost)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-5 md:grid-cols-2">
                    <FormField
                      label={locale === 'ar' ? 'البلدية' : 'Municipality (Commune)'}
                      error={errors.commune?.message}
                    >
                      <input
                        {...register('commune')}
                        placeholder={locale === 'ar' ? 'مثال: بن عكنون' : 'e.g. Ben Aknoun'}
                        className="site-form-input"
                      />
                    </FormField>
                  </div>

                  <FormField
                    label={locale === 'ar' ? 'العنوان التفصيلي' : 'Full address'}
                    error={errors.address?.message}
                    icon={<MapPin size={16} />}
                  >
                    <textarea
                      {...register('address')}
                      rows={3}
                      placeholder={
                        locale === 'ar'
                          ? 'رقم الشقة / الحي / الشارع ...'
                          : 'Apt / Quarter / Street ...'
                      }
                      className="site-form-input resize-none"
                    />
                  </FormField>
                </div>
              </div>

              {/* Payment method */}
              <div className="site-surface p-8">
                <SiteSectionHeading
                  eyebrow={locale === 'ar' ? 'طريقة الدفع' : 'Payment method'}
                  title={locale === 'ar' ? 'كيف تريدين الدفع؟' : 'How would you like to pay?'}
                  description={locale === 'ar' ? 'نوفر خيارات دفع مريحة وآمنة تشمل الدفع عند الاستلام وحساب CCP وبريدي موب.' : 'We support Cash on Delivery, CCP postal transfer, and BaridiMob.'}
                />

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {PAYMENT_OPTIONS.map((opt) => {
                    const isSelected = watch('paymentMethod') === opt.id;
                    return (
                      <label
                        key={opt.id}
                        className={`cursor-pointer rounded-[1.75rem] border-2 p-5 transition-all duration-200 ${
                          isSelected
                            ? 'border-primary bg-primary/5 shadow-[0_8px_32px_-16px_rgba(49,11,130,0.4)]'
                            : 'border-slate-100 bg-white hover:border-primary/30'
                        }`}
                      >
                        <input
                          {...register('paymentMethod')}
                          type="radio"
                          value={opt.id}
                          className="sr-only"
                        />
                        <div className="text-2xl">{opt.icon}</div>
                        <div className="mt-3 font-black text-foreground">{opt.labelAr}</div>
                        <p className="mt-1 text-xs leading-6 text-slate-500">{opt.descAr}</p>
                        {isSelected && (
                          <div className="mt-3 flex items-center gap-2 text-xs font-black text-primary">
                            <CheckCircle2 size={14} /> {locale === 'ar' ? 'محدد' : 'Selected'}
                          </div>
                        )}
                      </label>
                    );
                  })}
                </div>

                {/* CCP / BaridiMob info */}
                {watch('paymentMethod') === 'ccp' && (
                  <div className="mt-5 rounded-[1.5rem] border border-amber-100 bg-amber-50 p-5 text-sm leading-7 text-amber-800">
                    <strong>CCP:</strong> {locale === 'ar'
                      ? 'رقم الحساب: 00700-1234567-89 — باسم: نوى للتعليم والتكنولوجيا. أرسلي إيصال التحويل عبر واتساب.'
                      : 'Account: 00700-1234567-89 — Name: Nawa EduTech. Send transfer receipt via WhatsApp.'}
                  </div>
                )}
                {watch('paymentMethod') === 'baridimob' && (
                  <div className="mt-5 rounded-[1.5rem] border border-blue-100 bg-blue-50 p-5 text-sm leading-7 text-blue-800">
                    <strong>BaridiMob:</strong> {locale === 'ar'
                      ? 'رقم الهاتف: 0555-123-456. أرسلي لقطة الشاشة بعد التحويل عبر واتساب.'
                      : 'Phone: 0555-123-456. Send screenshot after transfer via WhatsApp.'}
                  </div>
                )}
              </div>

              {/* Notes */}
              <div className="site-surface p-8">
                <FormField
                  label={locale === 'ar' ? 'ملاحظات إضافية (اختياري)' : 'Additional notes (optional)'}
                >
                  <textarea
                    {...register('notes')}
                    rows={3}
                    placeholder={
                      locale === 'ar'
                        ? 'أي معلومات إضافية تساعد في التوصيل...'
                        : 'Any extra info to help with delivery...'
                    }
                    className="site-form-input resize-none"
                  />
                </FormField>
              </div>
            </div>

            {/* Right – Summary */}
            <div className="lg:sticky lg:top-28">
              <div className="site-surface p-8">
                <h2 className="text-xl font-black text-foreground">
                  {locale === 'ar' ? 'ملخص الطلب' : 'Order summary'}
                </h2>

                {/* Items list */}
                <div className="mt-6 space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between gap-3 rounded-[1.25rem] bg-slate-50 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base font-black text-white"
                          style={{ background: 'linear-gradient(145deg,#310b82,#5b2bbf)' }}
                        >
                          {item.title[locale].charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-black text-foreground line-clamp-1">
                            {item.title[locale]}
                          </div>
                          <div className="text-xs font-bold text-slate-500">× {item.quantity}</div>
                        </div>
                      </div>
                      <span className="shrink-0 text-sm font-black text-primary">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-600">
                      {locale === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}
                    </span>
                    <span className="font-black">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-600 flex items-center gap-2">
                      <Package size={14} />
                      {locale === 'ar' ? 'التوصيل' : 'Delivery'}
                      {wilayaInfo && (
                        <span className="text-xs text-slate-400">({wilayaInfo.nameAr})</span>
                      )}
                    </span>
                    <span className="font-black">
                      {!selectedWilaya
                        ? <span className="text-slate-400">—</span>
                        : shippingCost === 0
                          ? <span className="text-green-600">مجاني</span>
                          : formatPrice(shippingCost)}
                    </span>
                  </div>

                  {subtotal < FREE_SHIPPING_THRESHOLD && (
                    <div className="rounded-xl bg-accent/8 p-3 text-xs font-bold text-slate-600">
                      💡 {locale === 'ar'
                        ? `أضيفي ${formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} للحصول على توصيل مجاني`
                        : `Add ${formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} for free shipping`}
                    </div>
                  )}

                  <div className="flex justify-between border-t border-slate-100 pt-4">
                    <span className="text-lg font-black text-foreground">
                      {locale === 'ar' ? 'الإجمالي' : 'Total'}
                    </span>
                    <span className="text-2xl font-black text-primary">
                      {selectedWilaya ? formatPrice(orderTotal) : formatPrice(subtotal)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="site-button-primary mt-6 w-full disabled:opacity-70"
                >
                  {isSubmitting
                    ? (locale === 'ar' ? 'جارٍ الإرسال...' : 'Placing order...')
                    : (locale === 'ar' ? 'تأكيد الطلب' : 'Place order')}
                  <ArrowUpLeft size={18} />
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// FormField helper
// ────────────────────────────────────────────────────────────────

function FormField({
  label,
  error,
  icon,
  children,
}: {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="flex items-center gap-2 text-sm font-black text-slate-700">
        {icon && <span className="text-primary">{icon}</span>}
        {label}
      </span>
      {children}
      {error && <span className="block text-sm font-bold text-red-500">{error}</span>}
    </label>
  );
}
