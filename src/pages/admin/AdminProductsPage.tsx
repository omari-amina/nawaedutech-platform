import { useMemo, useRef, useState } from 'react';
import {
  ImagePlus,
  Minus,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import {
  adjustStock,
  deleteAdminProduct,
  fileToDataURL,
  getAdminProducts,
  getDeletedProducts,
  MAX_IMAGE_DATAURL,
  newProductDraft,
  PRODUCT_TYPES,
  restoreAdminProduct,
  saveAdminProduct,
  slugify,
  type AdminProduct,
} from '../../lib/catalogStore';
import { useAdminProducts } from '../../hooks/useCatalog';
import { useLanguage } from '../../contexts/LanguageContext';
import { resolveLocale } from '../../data/brandSite';
import { formatPrice } from '../../data/storeData';
import { usePageMeta } from '../../hooks/usePageMeta';

export function AdminProductsPage() {
  const { language } = useLanguage();
  const locale = resolveLocale(language);
  const products = useAdminProducts();
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [showDeleted, setShowDeleted] = useState(false);

  usePageMeta({ title: 'Admin products', description: 'Manage products', noIndex: true });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.titleAr.toLowerCase().includes(q) ||
        p.titleEn.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q),
    );
  }, [products, search]);

  const deleted = showDeleted ? getDeletedProducts() : [];

  const remove = (p: AdminProduct) => {
    if (!confirm(locale === 'ar' ? `حذف "${p.titleAr || p.id}"؟` : `Delete "${p.titleEn || p.id}"?`)) return;
    deleteAdminProduct(p.id);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-950 md:text-3xl">
            {locale === 'ar' ? 'المنتجات' : locale === 'fr' ? 'Produits' : 'Products'}
          </h1>
          <p className="mt-1 text-sm font-bold text-slate-500">
            {products.length} {locale === 'ar' ? 'منتج في المتجر' : 'produits en boutique'}
          </p>
        </div>
        <button
          onClick={() => setEditing(newProductDraft())}
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
        >
          <Plus size={16} />
          {locale === 'ar' ? 'منتج جديد' : 'Nouveau produit'}
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute top-1/2 -translate-y-1/2 text-slate-400 start-4" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={locale === 'ar' ? 'ابحث بالاسم أو المعرف...' : 'Rechercher...'}
          className="w-full rounded-2xl border border-slate-200 bg-white py-3 text-sm font-bold outline-none focus:border-slate-950 ps-10 pe-4"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-black uppercase tracking-wider text-slate-400">
                <th className="px-5 py-4 text-start">{locale === 'ar' ? 'المنتج' : 'Produit'}</th>
                <th className="px-5 py-4 text-start">{locale === 'ar' ? 'السعر' : 'Prix'}</th>
                <th className="px-5 py-4 text-start">{locale === 'ar' ? 'المخزون' : 'Stock'}</th>
                <th className="px-5 py-4 text-start">{locale === 'ar' ? 'الحالة' : 'Statut'}</th>
                <th className="px-5 py-4 text-start">{locale === 'ar' ? 'إجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-slate-50 transition last:border-0 hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {p.image ? (
                        <img src={p.image} alt="" className="h-12 w-12 shrink-0 rounded-xl object-cover" />
                      ) : (
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-black text-white"
                          style={{ background: p.accent }}
                        >
                          {(p.titleAr || p.titleEn || '?').charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="truncate font-black text-slate-900">{p.titleAr || p.titleEn || p.id}</div>
                        <div className="truncate text-xs font-bold text-slate-400" dir="ltr">{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-black text-slate-900">
                    {p.actualPrice > 0 ? formatPrice(p.actualPrice) : <span className="text-slate-400">{p.priceTextAr || '—'}</span>}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1" dir="ltr">
                      <button onClick={() => adjustStock(p.id, -1)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200" aria-label="-">
                        <Minus size={13} />
                      </button>
                      <span className={`min-w-[2.5rem] text-center font-black ${p.stock <= 10 ? 'text-amber-600' : 'text-slate-900'}`}>{p.stock}</span>
                      <button onClick={() => adjustStock(p.id, 1)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200" aria-label="+">
                        <Plus size={13} />
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    {p.inStock ? (
                      <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-600">
                        {locale === 'ar' ? 'متوفر' : 'Actif'}
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">
                        {locale === 'ar' ? 'مخفي' : 'Masqué'}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1.5">
                      <button onClick={() => setEditing({ ...p })} className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-950 hover:text-white" title={locale === 'ar' ? 'تعديل' : 'Modifier'}>
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => remove(p)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white" title={locale === 'ar' ? 'حذف' : 'Supprimer'}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="p-10 text-center text-sm font-bold text-slate-400">
            {locale === 'ar' ? 'لا توجد منتجات مطابقة' : 'Aucun produit'}
          </p>
        )}
      </div>

      {/* Deleted / restore */}
      <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
        <button onClick={() => setShowDeleted((v) => !v)} className="flex items-center gap-2 text-sm font-black text-slate-500 hover:text-slate-900">
          <RotateCcw size={15} />
          {locale === 'ar' ? 'المنتجات المحذوفة من الكتالوج الأصلي (استعادة)' : 'Produits supprimés (restaurer)'}
        </button>
        {showDeleted && (
          <div className="mt-3 space-y-2">
            {deleted.length === 0 && <p className="text-xs font-bold text-slate-400">—</p>}
            {deleted.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-2.5 text-sm">
                <span className="font-bold text-slate-600">{p.titleAr}</span>
                <button onClick={() => restoreAdminProduct(p.id)} className="rounded-full bg-slate-950 px-4 py-1.5 text-xs font-black text-white">
                  {locale === 'ar' ? 'استعادة' : 'Restaurer'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {editing && (
        <ProductForm
          key={editing.id}
          initial={editing}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}

// ─── Product form modal ───

function ProductForm({ initial, onClose }: { initial: AdminProduct; onClose: () => void }) {
  const { language } = useLanguage();
  const locale = resolveLocale(language);
  const [form, setForm] = useState<AdminProduct>(initial);
  const [imgError, setImgError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof AdminProduct>(k: K, v: AdminProduct[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setImgError('');
    try {
      const url = await fileToDataURL(file);
      if (url.length > MAX_IMAGE_DATAURL) {
        setImgError(locale === 'ar' ? 'الصورة كبيرة (>900KB). صغّرها أو استخدم رابطًا.' : 'Image trop lourde (>900Ko).');
        return;
      }
      set('image', url);
    } catch {
      setImgError(locale === 'ar' ? 'تعذر قراءة الصورة' : 'Lecture impossible');
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.titleAr.trim() && !form.titleEn.trim()) {
      alert(locale === 'ar' ? 'أدخل اسم المنتج (عربي أو إنجليزي)' : 'Nom requis');
      return;
    }
    const slug = slugify(form.slug || form.titleEn || form.titleAr);
    // slug unique?
    const clash = getAdminProducts().some((p) => p.id !== form.id && p.slug === slug);
    if (clash) {
      alert(locale === 'ar' ? 'الرابط (slug) مستخدم لمنتج آخر' : 'Slug déjà utilisé');
      return;
    }
    saveAdminProduct({ ...form, slug, titleEn: form.titleEn.trim() || form.titleAr.trim() });
    onClose();
  };

  const input = 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-slate-950 focus:bg-white';
  const lbl = 'mb-1.5 block text-xs font-black text-slate-500';

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-6" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] bg-white p-6 sm:rounded-[2rem]"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-950">
            {form.titleAr || form.titleEn ? (locale === 'ar' ? 'تعديل منتج' : 'Modifier produit') : (locale === 'ar' ? 'منتج جديد' : 'Nouveau produit')}
          </h2>
          <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200">
            <X size={17} />
          </button>
        </div>

        {/* Image */}
        <div className="mb-5 rounded-2xl border border-dashed border-slate-300 p-4">
          <div className="flex flex-wrap items-center gap-4">
            {form.image ? (
              <img src={form.image} alt="" className="h-20 w-20 rounded-2xl object-cover" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <ImagePlus size={24} />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => fileRef.current?.click()} className="rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-black text-white">
                  {locale === 'ar' ? 'رفع صورة من الجهاز' : 'Uploader une image'}
                </button>
                {form.image && (
                  <button type="button" onClick={() => set('image', undefined)} className="rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-black text-slate-500">
                    {locale === 'ar' ? 'إزالة' : 'Retirer'}
                  </button>
                )}
              </div>
              <input
                value={form.image?.startsWith('data:') ? '' : form.image ?? ''}
                onChange={(e) => set('image', e.target.value.trim() || undefined)}
                placeholder="/products/printed/photo.jpg أو https://…"
                dir="ltr"
                className={`${input} mt-2 text-xs`}
              />
              <p className="mt-1 text-[11px] font-bold text-slate-400">
                {locale === 'ar' ? 'ارفع من جهازك، أو الصق مسارًا من مجلد public، أو رابطًا خارجيًا.' : 'Upload, public/ path, or external URL.'}
              </p>
              {imgError && <p className="mt-1 text-xs font-bold text-red-500">{imgError}</p>}
            </div>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={lbl}>الاسم بالعربية *</label>
            <input value={form.titleAr} onChange={(e) => set('titleAr', e.target.value)} className={input} placeholder="مثال: بلانر البكالوريا" />
          </div>
          <div>
            <label className={lbl}>Nom en français / English *</label>
            <input value={form.titleEn} onChange={(e) => set('titleEn', e.target.value)} className={input} placeholder="BAC Planner" />
          </div>
          <div>
            <label className={lbl}>الوصف (عربي)</label>
            <textarea value={form.summaryAr} onChange={(e) => set('summaryAr', e.target.value)} rows={2} className={input} />
          </div>
          <div>
            <label className={lbl}>Description (EN/FR)</label>
            <textarea value={form.summaryEn} onChange={(e) => set('summaryEn', e.target.value)} rows={2} className={input} />
          </div>
          <div>
            <label className={lbl}>الفئة (عربي)</label>
            <input value={form.categoryAr} onChange={(e) => set('categoryAr', e.target.value)} className={input} />
          </div>
          <div>
            <label className={lbl}>Catégorie</label>
            <input value={form.categoryEn} onChange={(e) => set('categoryEn', e.target.value)} className={input} />
          </div>
          <div>
            <label className={lbl}>السعر بالدينار (0 = بدون سلة، طلب عبر التواصل)</label>
            <input type="number" min={0} value={form.actualPrice} onChange={(e) => set('actualPrice', Math.max(0, Number(e.target.value)))} className={input} dir="ltr" />
          </div>
          <div>
            <label className={lbl}>{locale === 'ar' ? 'المخزون' : 'Stock'}</label>
            <input type="number" min={0} value={form.stock} onChange={(e) => set('stock', Math.max(0, Number(e.target.value)))} className={input} dir="ltr" />
          </div>
          <div>
            <label className={lbl}>{locale === 'ar' ? 'النوع' : 'Type'}</label>
            <select value={form.productType} onChange={(e) => set('productType', e.target.value as AdminProduct['productType'])} className={input}>
              {PRODUCT_TYPES.map((t) => (
                <option key={t.id} value={t.id}>{t.ar} / {t.en}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={lbl}>Slug (رابط المنتج)</label>
            <input value={form.slug} onChange={(e) => set('slug', e.target.value)} className={input} dir="ltr" />
          </div>
          <div>
            <label className={lbl}>الجمهور (عربي)</label>
            <input value={form.audienceAr} onChange={(e) => set('audienceAr', e.target.value)} className={input} />
          </div>
          <div>
            <label className={lbl}>Audience</label>
            <input value={form.audienceEn} onChange={(e) => set('audienceEn', e.target.value)} className={input} />
          </div>
          <div>
            <label className={lbl}>المميزات (سطر لكل ميزة — عربي)</label>
            <textarea value={form.highlightsAr.join('\n')} onChange={(e) => set('highlightsAr', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))} rows={3} className={input} />
          </div>
          <div>
            <label className={lbl}>Highlights (one per line)</label>
            <textarea value={form.highlightsEn.join('\n')} onChange={(e) => set('highlightsEn', e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))} rows={3} className={input} />
          </div>
          <div>
            <label className={lbl}>لون البطاقة</label>
            <div className="flex items-center gap-2">
              <input type="color" value={form.accent} onChange={(e) => set('accent', e.target.value)} className="h-11 w-14 cursor-pointer rounded-xl border border-slate-200" />
              <span className="text-xs font-bold text-slate-400" dir="ltr">{form.accent}</span>
            </div>
          </div>
          <div className="flex items-end">
            <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3.5">
              <input type="checkbox" checked={form.inStock} onChange={(e) => set('inStock', e.target.checked)} className="h-5 w-5 accent-slate-950" />
              <span className="text-sm font-black text-slate-700">{locale === 'ar' ? 'ظاهر في المتجر' : 'Visible en boutique'}</span>
            </label>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button type="submit" className="flex-1 rounded-2xl bg-slate-950 py-4 text-sm font-black text-white transition hover:bg-slate-800">
            {locale === 'ar' ? 'حفظ المنتج' : 'Enregistrer'}
          </button>
          <button type="button" onClick={onClose} className="rounded-2xl bg-slate-100 px-8 py-4 text-sm font-black text-slate-500">
            {locale === 'ar' ? 'إلغاء' : 'Annuler'}
          </button>
        </div>
      </form>
    </div>
  );
}
