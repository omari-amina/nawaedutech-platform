import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpLeft, Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { resolveLocale } from '../data/brandSite';
import { formatPrice } from '../data/storeData';
import { FREE_SHIPPING_THRESHOLD } from '../data/algeriaWilayas';
import { usePageMeta } from '../hooks/usePageMeta';

export function CartPage() {
  const { language } = useLanguage();
  const locale = resolveLocale(language);
  const { items, subtotal, itemCount, removeItem, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  usePageMeta({
    title: locale === 'ar' ? 'السلة' : 'Cart',
    description: locale === 'ar'
      ? 'مراجعة طلبك قبل الشراء'
      : 'Review your order before purchasing',
  });

  const isRTL = locale === 'ar';
  const shippingNote = subtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFree = FREE_SHIPPING_THRESHOLD - subtotal;

  if (items.length === 0) {
    return (
      <div className="overflow-hidden">
        <section className="site-page-hero site-page-hero-light">
          <div className="container relative z-10 mx-auto px-4 pb-20 pt-14">
            <div className="mx-auto max-w-xl text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-primary/8 text-primary">
                <ShoppingCart size={40} />
              </div>
              <h1 className="text-3xl font-black text-foreground">
                {isRTL ? 'السلة فارغة' : 'Your cart is empty'}
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                {isRTL
                  ? 'لم تضيفي أي منتج بعد. تصفحي المنتجات وأضيفي ما يناسبك.'
                  : 'You have not added any products yet. Browse our products and add what suits you.'}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/shop" className="site-button-primary">
                  {isRTL ? 'تصفحي المنتجات' : 'Browse products'}
                  <ArrowUpLeft size={18} />
                </Link>
                <Link to="/courses" className="site-button-ghost">
                  {isRTL ? 'استكشفي الدورات' : 'Explore courses'}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <section className="site-page-hero site-page-hero-light">
        <div className="container relative z-10 mx-auto px-4 pb-10 pt-14">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="site-overline site-overline-dark">
                {isRTL ? 'سلة التسوق' : 'Shopping cart'}
              </span>
              <h1 className="mt-4 text-3xl font-black text-foreground md:text-4xl">
                {isRTL
                  ? `${itemCount} ${itemCount === 1 ? 'منتج' : 'منتجات'} في السلة`
                  : `${itemCount} ${itemCount === 1 ? 'item' : 'items'} in cart`}
              </h1>
            </div>
            <button
              onClick={clearCart}
              className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-black text-red-500 transition hover:bg-red-100"
            >
              <Trash2 size={16} />
              {isRTL ? 'إفراغ السلة' : 'Clear cart'}
            </button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.42fr]">
          {/* Items */}
          <div className="space-y-4">
            {/* Free shipping progress */}
            {!shippingNote && (
              <div className="rounded-[1.75rem] border border-accent/20 bg-accent/5 p-5">
                <p className="text-sm font-bold text-slate-700">
                  {isRTL
                    ? `أضيفي ${formatPrice(remainingForFree)} للحصول على توصيل مجاني 🎁`
                    : `Add ${formatPrice(remainingForFree)} more for free shipping 🎁`}
                </p>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-500"
                    style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
            {shippingNote && (
              <div className="rounded-[1.75rem] border border-green-100 bg-green-50 p-4 text-sm font-bold text-green-700">
                🎉 {isRTL ? 'يُهنيك توصيل مجاني!' : 'You qualify for free shipping!'}
              </div>
            )}

            {items.map((item) => (
              <article
                key={item.productId}
                className="flex gap-5 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_18px_60px_-44px_rgba(49,11,130,0.3)]"
              >
                {/* Thumbnail */}
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.25rem] text-3xl font-black text-white"
                  style={{
                    background: 'linear-gradient(145deg, #310b82, #5b2bbf)',
                  }}
                >
                  {item.title[locale].charAt(0)}
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-black text-foreground">
                        {item.title[locale]}
                      </h3>
                      <span className="mt-1 inline-block rounded-full bg-primary/8 px-3 py-1 text-xs font-bold text-primary capitalize">
                        {item.productType}
                      </span>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="rounded-full p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                      aria-label={isRTL ? 'حذف' : 'Remove'}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-600 transition hover:bg-primary hover:text-white"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="min-w-[2rem] text-center text-sm font-black text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-600 transition hover:bg-primary hover:text-white"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-xl font-black text-primary">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-xs font-bold text-slate-400">
                          {formatPrice(item.price)} × {item.quantity}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-28">
            <div className="site-surface p-8">
              <h2 className="text-xl font-black text-foreground">
                {isRTL ? 'ملخص الطلب' : 'Order summary'}
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-base">
                  <span className="font-bold text-slate-600">
                    {isRTL ? 'المجموع الفرعي' : 'Subtotal'}
                  </span>
                  <span className="font-black text-foreground">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between text-base">
                  <span className="font-bold text-slate-600">
                    {isRTL ? 'التوصيل' : 'Shipping'}
                  </span>
                  <span className="font-black text-slate-500">
                    {shippingNote
                      ? (isRTL ? 'مجاني 🎉' : 'Free 🎉')
                      : (isRTL ? 'يُحسب عند الطلب' : 'Calculated at checkout')}
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-foreground">
                      {isRTL ? 'الإجمالي' : 'Total'}
                    </span>
                    <span className="text-2xl font-black text-primary">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/order')}
                className="site-button-primary mt-8 w-full"
              >
                {isRTL ? 'إتمام الطلب' : 'Complete order'}
                <ArrowUpLeft size={18} />
              </button>

              <Link to="/shop" className="mt-4 block text-center text-sm font-bold text-slate-500 transition hover:text-primary">
                {isRTL ? 'متابعة التسوق' : 'Continue shopping'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
