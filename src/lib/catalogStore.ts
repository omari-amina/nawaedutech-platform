// src/lib/catalogStore.ts — Admin product catalog (SDD US-7)
// Local-first: built-in catalog (brandSite/storeData) + admin overrides/customs in localStorage.
// Shop/Home/ProductDetail read the MERGED catalog so admin edits appear instantly.

import {
  brandProducts,
  type ProductItem,
} from '../data/brandSite';
import {
  brandProductsExtended,
  formatPrice,
  type ExtendedProductItem,
  type ProductType,
} from '../data/storeData';

// ─── Types ───

export interface AdminProduct {
  id: string;
  slug: string;
  isCustom: boolean; // false = override of built-in, true = created in admin
  accent: string;
  productType: ProductType | 'printed' | 'digital' | 'bundle';
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  categoryAr: string;
  categoryEn: string;
  audienceAr: string;
  audienceEn: string;
  highlightsAr: string[];
  highlightsEn: string[];
  priceTextAr: string; // display text when actualPrice === 0
  priceTextEn: string;
  actualPrice: number; // 0 = contact-only (no cart)
  stock: number;
  inStock: boolean;
  image?: string; // /public path, http URL, or dataURL
}

const PRODUCTS_KEY = 'nawaedutech_admin_products';
const DELETED_KEY = 'nawaedutech_admin_deleted';
const REV_KEY = 'nawaedutech_admin_rev';

export const PRODUCT_TYPES = [
  { id: 'kit', ar: 'حقيبة', en: 'Kit' },
  { id: 'planner', ar: 'بلانر', en: 'Planner' },
  { id: 'pack', ar: 'باقة', en: 'Pack' },
  { id: 'box', ar: 'صندوق', en: 'Box' },
  { id: 'digital', ar: 'رقمي', en: 'Digital' },
] as const;

const ACCENTS = ['#310b82', '#5b2bbf', '#d58a00', '#0f9d76', '#e67e8c', '#1e40af'];

// ─── Built-in → AdminProduct ───

function extOf(id: string): ExtendedProductItem | undefined {
  return brandProductsExtended.find((p) => p.id === id || p.originalProductId === id);
}

export function builtInAsAdmin(): AdminProduct[] {
  return brandProducts.map((p, i) => {
    const ext = extOf(p.id);
    return {
      id: p.id,
      slug: p.slug,
      isCustom: false,
      accent: p.accent || ACCENTS[i % ACCENTS.length],
      productType: (ext?.productType as AdminProduct['productType']) ?? 'printed',
      titleAr: p.title.ar,
      titleEn: p.title.en,
      summaryAr: p.summary.ar,
      summaryEn: p.summary.en,
      categoryAr: p.category.ar,
      categoryEn: p.category.en,
      audienceAr: p.audience.ar,
      audienceEn: p.audience.en,
      highlightsAr: [...p.highlights.ar],
      highlightsEn: [...p.highlights.en],
      priceTextAr: p.price.ar,
      priceTextEn: p.price.en,
      actualPrice: ext?.actualPrice ?? 0,
      stock: ext?.stock ?? 0,
      inStock: ext?.inStock ?? true,
      image: p.image,
    };
  });
}

// ─── Storage ───

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded → caller handles
  }
}

function notify() {
  try {
    const rev = (Number(localStorage.getItem(REV_KEY)) || 0) + 1;
    localStorage.setItem(REV_KEY, String(rev));
  } catch { /* ignore */ }
  window.dispatchEvent(new CustomEvent('nawa:catalog'));
}

export function subscribeCatalog(fn: () => void): () => void {
  window.addEventListener('nawa:catalog', fn);
  window.addEventListener('storage', fn);
  return () => {
    window.removeEventListener('nawa:catalog', fn);
    window.removeEventListener('storage', fn);
  };
}
export function catalogRevision(): number {
  try {
    return Number(localStorage.getItem(REV_KEY)) || 0;
  } catch {
    return 0;
  }
}

// ─── Merged catalog ───

export function getAdminProducts(): AdminProduct[] {
  const customs = read<AdminProduct[]>(PRODUCTS_KEY, []);
  const deleted = read<string[]>(DELETED_KEY, []);
  const base = builtInAsAdmin();
  const byId = new Map(base.map((p) => [p.id, p]));
  for (const c of customs) {
    if (c.isCustom) {
      if (!byId.has(c.id)) byId.set(c.id, c);
    } else if (byId.has(c.id)) {
      byId.set(c.id, { ...c, isCustom: false });
    }
  }
  return [...byId.values()].filter((p) => !deleted.includes(p.id));
}

export function toBrandItem(p: AdminProduct): ProductItem {
  const priceAr = p.actualPrice > 0 ? formatPrice(p.actualPrice) : p.priceTextAr || 'حسب الباقة';
  const priceEn = p.actualPrice > 0 ? formatPrice(p.actualPrice) : p.priceTextEn || 'Custom quote';
  return {
    id: p.id,
    slug: p.slug,
    accent: p.accent,
    category: { ar: p.categoryAr, en: p.categoryEn },
    title: { ar: p.titleAr, en: p.titleEn },
    summary: { ar: p.summaryAr, en: p.summaryEn },
    price: { ar: priceAr, en: priceEn },
    audience: { ar: p.audienceAr, en: p.audienceEn },
    highlights: { ar: p.highlightsAr, en: p.highlightsEn },
    image: p.image,
  };
}

export function toExtendedItem(p: AdminProduct): ExtendedProductItem {
  return {
    id: p.isCustom ? `ext-${p.id}` : extOf(p.id)?.id ?? `ext-${p.id}`,
    originalProductId: p.id,
    name: p.titleEn,
    description: p.summaryAr,
    price: p.actualPrice > 0 ? formatPrice(p.actualPrice) : p.priceTextAr,
    actualPrice: p.actualPrice,
    category: p.productType,
    productType: (p.productType === 'printed' || p.productType === 'digital' ? 'kit' : p.productType) as ExtendedProductItem['productType'],
    badge: undefined,
    inStock: p.inStock,
    stock: p.stock,
    images: p.image ? [p.image] : [],
  };
}

export function getCatalogBrand(): ProductItem[] {
  return getAdminProducts().map(toBrandItem);
}

export function getCatalogProduct(slug: string): { brand: ProductItem; ext?: ExtendedProductItem } | undefined {
  const p = getAdminProducts().find((x) => x.slug === slug || x.id === slug);
  if (!p) return undefined;
  return {
    brand: toBrandItem(p),
    ext: p.actualPrice > 0 ? toExtendedItem(p) : undefined,
  };
}

export function getCatalogExtById(id: string): ExtendedProductItem | undefined {
  const customs = read<AdminProduct[]>(PRODUCTS_KEY, []);
  const p = getAdminProducts().find((x) => x.id === id || `ext-${x.id}` === id);
  if (p) {
    if (p.actualPrice > 0) return toExtendedItem(p);
    // Admin explicitly overrode this product → respect it (no fallback to old price)
    if (customs.some((c) => c.id === p.id)) return undefined;
  }
  return extOf(id);
}

// ─── CRUD ───

export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9\u0600-\u06FF-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || `product-${Date.now().toString(36)}`;
}

export function newProductDraft(): AdminProduct {
  const n = getAdminProducts().length + 1;
  return {
    id: `custom-${Date.now().toString(36)}`,
    slug: `custom-product-${n}`,
    isCustom: true,
    accent: ACCENTS[n % ACCENTS.length],
    productType: 'printed',
    titleAr: '',
    titleEn: '',
    summaryAr: '',
    summaryEn: '',
    categoryAr: 'منتج جديد',
    categoryEn: 'New product',
    audienceAr: 'للجميع',
    audienceEn: 'For everyone',
    highlightsAr: [],
    highlightsEn: [],
    priceTextAr: 'حسب النسخة',
    priceTextEn: 'By edition',
    actualPrice: 0,
    stock: 0,
    inStock: true,
    image: undefined,
  };
}

export function saveAdminProduct(p: AdminProduct): void {
  const customs = read<AdminProduct[]>(PRODUCTS_KEY, []);
  const idx = customs.findIndex((c) => c.id === p.id);
  if (idx >= 0) customs[idx] = p;
  else customs.push(p);
  // un-delete if re-saved
  const deleted = read<string[]>(DELETED_KEY, []).filter((id) => id !== p.id);
  write(DELETED_KEY, deleted);
  write(PRODUCTS_KEY, customs);
  notify();
}

export function deleteAdminProduct(id: string): void {
  const customs = read<AdminProduct[]>(PRODUCTS_KEY, []).filter((c) => !(c.isCustom && c.id === id));
  write(PRODUCTS_KEY, customs);
  const builtIn = builtInAsAdmin().some((b) => b.id === id);
  if (builtIn) {
    const deleted = read<string[]>(DELETED_KEY, []);
    if (!deleted.includes(id)) write(DELETED_KEY, [...deleted, id]);
  }
  notify();
}

export function restoreAdminProduct(id: string): void {
  write(DELETED_KEY, read<string[]>(DELETED_KEY, []).filter((x) => x !== id));
  notify();
}

export function getDeletedProducts(): AdminProduct[] {
  const deleted = read<string[]>(DELETED_KEY, []);
  return builtInAsAdmin().filter((b) => deleted.includes(b.id));
}

export function adjustStock(id: string, delta: number): void {
  const all = getAdminProducts();
  const p = all.find((x) => x.id === id);
  if (!p) return;
  saveAdminProduct({ ...p, stock: Math.max(0, p.stock + delta) });
}

export function resetCatalogCustomizations(): void {
  localStorage.removeItem(PRODUCTS_KEY);
  localStorage.removeItem(DELETED_KEY);
  notify();
}

// ─── Images ───

export const MAX_IMAGE_DATAURL = 900 * 1024; // ~900KB (localStorage budget)

export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('not-image'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('read-failed'));
    reader.readAsDataURL(file);
  });
}
