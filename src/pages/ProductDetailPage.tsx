import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpLeft,
  CheckCircle2,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  getLocalizedList,
  getLocalizedText,
  resolveLocale,
} from '../data/brandSite';
import { getCatalogExtById, getCatalogProduct } from '../lib/catalogStore';
import { formatPrice } from '../data/storeData';
import { useCart } from '../contexts/CartContext';
import { usePageMeta } from '../hooks/usePageMeta';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language, isRTL } = useLanguage();
  const locale = resolveLocale(language);
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Find the product in the merged admin catalog (built-in + admin edits)
  const found = slug ? getCatalogProduct(slug) : undefined;
  const brandProduct = found?.brand;
  const extProduct = found?.ext ?? (slug ? getCatalogExtById(slug) : undefined);

  const title = brandProduct ? getLocalizedText(brandProduct.title, locale) : '';
  const pageTitle = brandProduct ? title : (locale === 'ar' ? 'المنتج غير موجود' : 'Product not found');

  usePageMeta({
    title: pageTitle,
    description: brandProduct
      ? getLocalizedText(brandProduct.summary, locale)
      : '',
    noIndex: !brandProduct,
  });

  if (!brandProduct) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="site-surface mx-auto max-w-2xl p-10 text-center">
          <Package size={48} className="mx-auto mb-4 text-slate-300" />
          <h1 className="text-3xl font-black text-foreground">
            {locale === 'ar' ? 'المنتج غير موجود' : 'Product not found'}
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {locale === 'ar'
              ? 'ربما تم إزالة هذا المنتج أو تغيير رابطه.'
              : 'This product may have been removed or its link changed.'}
          </p>
          <Link to="/shop" className="mt-8 inline-flex site-button-primary">
            <ArrowLeft size={18} className={isRTL ? 'rotate-180' : ''} />
            {locale === 'ar' ? 'العودة للمنتجات' : 'Back to products'}
          </Link>
        </div>
      </div>
    );
  }

  const actualPrice = extProduct?.actualPrice ?? 0;
  const inStock = extProduct?.inStock ?? true;

  const handleAddToCart = () => {
    addItem({
      productId: brandProduct.id,
      quantity,
      price: actualPrice,
      title: { ar: getLocalizedText(brandProduct.title, 'ar'), en: getLocalizedText(brandProduct.title, 'en') },
      productType: (extProduct?.productType as 'printed' | 'digital' | 'bundle') ?? 'printed',
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
    openCart();
  };

  return (
    <div className="overflow-hidden">
      {/* Breadcrumb */}
      <div className="border-b border-slate-100 bg-white">
        <div className="container mx-auto flex items-center gap-2 px-4 py-4 text-sm font-bold text-slate-500">
          <Link to="/" className="transition hover:text-primary">{locale === 'ar' ? 'الرئيسية' : 'Home'}</Link>
          <span>/</span>
          <Link to="/shop" className="transition hover:text-primary">{locale === 'ar' ? 'المنتجات' : 'Products'}</Link>
          <span>/</span>
          <span className="text-slate-700 line-clamp-1">{title}</span>
        </div>
      </div>

      {/* Main */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.55fr] lg:items-start">
          {/* Left – visual */}
          <div className="space-y-6">
            {/* Main image / placeholder */}
            <div
              className="relative overflow-hidden rounded-[2.5rem] p-8"
              style={{
                background: `linear-gradient(145deg, ${brandProduct.accent} 0%, rgba(49,11,130,0.92) 100%)`,
              }}
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent/25 blur-3xl" />

              <div className="relative z-10 flex min-h-[28rem] flex-col items-center justify-center text-center text-white">
                {brandProduct.image ? (
                  <img
                    src={brandProduct.image}
                    alt={title}
                    className="h-full max-h-[26rem] w-full rounded-[2rem] object-cover"
                  />
                ) : (
                  <>
                    <span className="text-9xl font-black opacity-30">{title.charAt(0)}</span>
                    <div className="mt-6 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-black">
                      {getLocalizedText(brandProduct.category, locale)}
                    </div>
                    <h2 className="mt-4 max-w-xs text-3xl font-black leading-tight">{title}</h2>
                  </>
                )}
              </div>
            </div>

            {/* Highlights */}
            <div className="site-panel">
              <h3 className="mb-5 text-lg font-black text-foreground">
                {locale === 'ar' ? 'مميزات هذا المنتج' : 'Product highlights'}
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {getLocalizedList(brandProduct.highlights, locale).map((h) => (
                  <div key={h} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
                    <span className="text-sm leading-7 font-bold text-slate-700">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right – info & CTA */}
          <div className="lg:sticky lg:top-28 space-y-6">
            <div className="site-surface p-8">
              {/* Badge */}
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-flex rounded-full bg-primary/8 px-3 py-1 text-xs font-black text-primary">
                  {getLocalizedText(brandProduct.category, locale)}
                </span>
                {inStock ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-600">
                    <CheckCircle2 size={12} /> {locale === 'ar' ? 'متوفر' : 'In stock'}
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-500">
                    {locale === 'ar' ? 'غير متوفر' : 'Out of stock'}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl font-black leading-tight text-foreground">{title}</h1>

              {/* Audience */}
              <p className="mt-3 text-sm font-bold text-primary">
                {getLocalizedText(brandProduct.audience, locale)}
              </p>

              {/* Description */}
              <p className="mt-4 text-base leading-8 text-slate-600">
                {getLocalizedText(brandProduct.summary, locale)}
              </p>

              {/* Rating placeholder */}
              <div className="mt-4 flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className={s <= 4 ? 'fill-accent text-accent' : 'text-slate-200'} />
                ))}
                <span className="text-sm font-bold text-slate-500">(4.8)</span>
              </div>

              {/* Price */}
              <div className="mt-6 border-t border-slate-100 pt-6">
                {actualPrice > 0 ? (
                  <div className="text-4xl font-black text-primary">{formatPrice(actualPrice)}</div>
                ) : (
                  <div className="text-2xl font-black text-slate-500">
                    {getLocalizedText(brandProduct.price, locale)}
                  </div>
                )}
              </div>

              {/* Quantity + Add to cart */}
              {actualPrice > 0 && inStock && (
                <div className="mt-6 space-y-4">
                  {/* Qty */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-black text-slate-700">
                      {locale === 'ar' ? 'الكمية:' : 'Quantity:'}
                    </span>
                    <div className="flex items-center gap-3 rounded-full border border-slate-200 p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-600 transition hover:bg-primary hover:text-white"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="min-w-[2rem] text-center font-black text-foreground">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-600 transition hover:bg-primary hover:text-white"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className={`site-button-primary w-full ${addedFeedback ? 'bg-green-600 hover:bg-green-700' : ''}`}
                  >
                    {addedFeedback ? (
                      <>
                        <CheckCircle2 size={18} />
                        {locale === 'ar' ? 'أُضيف للسلة!' : 'Added to cart!'}
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} />
                        {locale === 'ar' ? 'أضيفي للسلة' : 'Add to cart'}
                      </>
                    )}
                  </button>

                  <Link
                    to={`/contact?subject=${encodeURIComponent(
                      locale === 'ar' ? `استفسار عن منتج: ${title}` : `Product inquiry: ${title}`,
                    )}`}
                    className="site-button-ghost w-full"
                  >
                    {locale === 'ar' ? 'اسألي عن هذا المنتج' : 'Ask about this product'}
                  </Link>
                </div>
              )}

              {/* If no price yet – contact CTA */}
              {actualPrice === 0 && (
                <Link
                  to={`/contact?subject=${encodeURIComponent(
                    locale === 'ar' ? `طلب منتج: ${title}` : `Product request: ${title}`,
                  )}`}
                  className="mt-6 block site-button-primary text-center"
                >
                  {locale === 'ar' ? 'اطلبي الآن' : 'Request now'}
                  <ArrowUpLeft size={18} />
                </Link>
              )}
            </div>

            {/* Delivery note */}
            <div className="flex items-start gap-4 rounded-[1.75rem] border border-slate-100 bg-white p-5">
              <Truck size={20} className="mt-1 shrink-0 text-primary" />
              <div>
                <div className="font-black text-foreground text-sm">
                  {locale === 'ar' ? 'توصيل لكل ولايات الجزائر' : 'Delivery across Algeria'}
                </div>
                <p className="mt-1 text-xs leading-6 text-slate-500">
                  {locale === 'ar'
                    ? 'من العاصمة إلى الجنوب، نوصل إلى جميع الولايات الـ 58.'
                    : 'From the capital to the far south, we deliver to all 58 provinces.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
