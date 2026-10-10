// src/data/storeData.ts
// بيانات المتجر: المنتجات الموسعة، الطلبات، السلة، وشحن الطلبات

import type { ShippingZone } from './algeriaWilayas';

// ─── أنواع المنتجات ───────────────────────────────────────────────────────────

export type ProductType = 'kit' | 'planner' | 'pack' | 'box' | 'digital';

export type PaymentMethod = 'cash_on_delivery' | 'ccp' | 'baridimob';

export type OrderStatus =
  | 'pending'       // قيد الانتظار
  | 'confirmed'     // مؤكد
  | 'processing'    // قيد المعالجة
  | 'shipped'       // تم الشحن
  | 'delivered'     // تم التسليم
  | 'cancelled'     // ملغى
  | 'returned';     // مرتجع

// ─── واجهات المنتجات ─────────────────────────────────────────────────────────

/** المنتج الأساسي (يطابق البنية الموجودة في brandProducts) */
export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: string;   // سعر نصي تقديمي (مثلاً "2 500 DA")
  category: string;
  badge?: string;
  features?: string[];
  image?: string;
}

/** المنتج الموسّع بمعلومات التجارة الإلكترونية */
export interface ExtendedProductItem extends ProductItem {
  actualPrice: number;       // السعر الحقيقي بالدينار الجزائري
  inStock: boolean;          // متوفر في المخزون
  productType: ProductType;  // نوع المنتج
  images: string[];          // مسارات الصور
  originalProductId: string; // معرف المنتج الأصلي للربط بالكتالوج
  stock?: number;            // الكمية المتوفرة (اختياري)
}

// ─── بيانات المنتجات الموسعة ─────────────────────────────────────────────────

export const brandProductsExtended: ExtendedProductItem[] = [
  {
    id: 'ext-smart-teaching-kit',
    originalProductId: 'smart-teaching-kit',
    name: 'Smart Teaching Kit',
    description: 'مجموعة أدوات التدريس الذكي للأستاذ الجزائري',
    price: '2 500 DA',
    actualPrice: 2500,
    category: 'teaching',
    productType: 'kit',
    badge: 'الأكثر مبيعاً',
    inStock: true,
    stock: 50,
    images: ['/images/products/smart-teaching-kit.jpg'],
    features: [
      'أدوات تخطيط الدروس',
      'قوالب تقييم الطلاب',
      'مخططات إدارة الفصل',
    ],
  },
  {
    id: 'ext-bac-planner',
    originalProductId: 'bac-planner',
    name: 'BAC Planner',
    description: 'مخطط شامل للتحضير لامتحان البكالوريا',
    price: '800 DA',
    actualPrice: 800,
    category: 'student',
    productType: 'planner',
    badge: 'جديد',
    inStock: true,
    stock: 200,
    images: ['/images/products/bac-planner.jpg'],
    features: [
      'جدول مراجعة مرن',
      'تتبع التقدم الدراسي',
      'نصائح وتقنيات الحفظ',
    ],
  },
  {
    id: 'ext-university-balance-kit',
    originalProductId: 'university-balance-kit',
    name: 'University Balance Kit',
    description: 'مجموعة التوازن الجامعي للطالب الجزائري',
    price: '1 200 DA',
    actualPrice: 1200,
    category: 'university',
    productType: 'kit',
    inStock: true,
    stock: 100,
    images: ['/images/products/university-balance-kit.jpg'],
    features: [
      'إدارة الوقت الجامعي',
      'تنظيم الأنشطة اللاصفية',
      'خطط التطوير الشخصي',
    ],
  },
  {
    id: 'ext-teacher-ai-pack',
    originalProductId: 'teacher-ai-pack',
    name: 'Teacher AI Pack',
    description: 'حزمة الذكاء الاصطناعي للأستاذ الحديث',
    price: '1 500 DA',
    actualPrice: 1500,
    category: 'teaching',
    productType: 'pack',
    badge: 'حصري',
    inStock: true,
    stock: 75,
    images: ['/images/products/teacher-ai-pack.jpg'],
    features: [
      'أدوات AI لإنشاء الاختبارات',
      'تحليل أداء الطلاب',
      'اقتراحات تحسين التدريس',
    ],
  },
  {
    id: 'ext-happy-school-box',
    originalProductId: 'happy-school-box',
    name: 'Happy School Box',
    description: 'صندوق المدرسة السعيدة للتلاميذ',
    price: '3 500 DA',
    actualPrice: 3500,
    category: 'student',
    productType: 'box',
    badge: 'هدية مثالية',
    inStock: true,
    stock: 30,
    images: ['/images/products/happy-school-box.jpg'],
    features: [
      'أدوات مدرسية عالية الجودة',
      'مخطط يومي للتلميذ',
      'بطاقات تحفيزية',
    ],
  },
];

// ─── معلومات طرق الدفع ───────────────────────────────────────────────────────

export interface PaymentMethodInfo {
  id: PaymentMethod;
  labelAr: string;
  labelFr: string;
  description: string;
  icon?: string;
}

export const paymentMethods: PaymentMethodInfo[] = [
  {
    id: 'cash_on_delivery',
    labelAr: 'الدفع عند الاستلام',
    labelFr: 'Paiement à la livraison',
    description: 'ادفع نقداً عند استلام طلبك',
    icon: '💵',
  },
  {
    id: 'ccp',
    labelAr: 'حساب CCP بريدي',
    labelFr: 'Compte CCP postal',
    description: 'تحويل عبر حساب البريد الجزائري CCP',
    icon: '📮',
  },
  {
    id: 'baridimob',
    labelAr: 'بريدي موب',
    labelFr: 'BaridiMob',
    description: 'دفع إلكتروني عبر تطبيق بريدي موب',
    icon: '📱',
  },
];

// ─── واجهات السلة والطلبات ────────────────────────────────────────────────────

export interface CartItem {
  productId: string;
  product: ExtendedProductItem;
  quantity: number;
  unitPrice: number;   // سعر الوحدة لحظة الإضافة
  totalPrice: number;  // quantity × unitPrice
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  phone2?: string;        // رقم هاتف إضافي
  wilayaCode: string;     // كود الولاية (01-58)
  wilayaName: string;     // اسم الولاية
  commune: string;        // البلدية
  address: string;        // العنوان التفصيلي
  postalCode?: string;
  zone?: ShippingZone;
}

export interface Order {
  id: string;                    // معرف الطلب (مُولَّد تلقائياً)
  createdAt: string;             // ISO 8601
  updatedAt: string;             // ISO 8601
  status: OrderStatus;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;              // مجموع المنتجات بدون شحن
  shippingCost: number;          // تكلفة التوصيل
  total: number;                 // الإجمالي = subtotal + shippingCost
  notes?: string;                // ملاحظات إضافية
  trackingNumber?: string;       // رقم تتبع الشحنة
}

// ─── دوال مساعدة ─────────────────────────────────────────────────────────────

/**
 * توليد معرف طلب فريد بصيغة: NWT-YYYYMMDD-XXXXX
 */
export function generateOrderId(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `NWT-${date}-${random}`;
}

/**
 * تنسيق السعر بالدينار الجزائري
 * مثال: 2500 → "2 500 DA"
 */
export function formatPrice(amount: number, currency = 'DA'): string {
  return `${amount.toLocaleString('fr-DZ')} ${currency}`;
}

/**
 * البحث عن منتج موسّع بمعرّفه الأصلي أو المعرف الموسّع
 */
export function getExtendedProductById(
  id: string
): ExtendedProductItem | undefined {
  return brandProductsExtended.find(
    (p) => p.id === id || p.originalProductId === id
  );
}

/**
 * احسب مجموع سلة التسوق
 */
export function calcCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.totalPrice, 0);
}

/**
 * احسب الإجمالي مع الشحن
 */
export function calcOrderTotal(items: CartItem[], shippingCost: number): number {
  return calcCartSubtotal(items) + shippingCost;
}

/**
 * تسمية حالة الطلب بالعربية
 */
export const orderStatusLabels: Record<OrderStatus, string> = {
  pending:    'قيد الانتظار',
  confirmed:  'مؤكد',
  processing: 'قيد المعالجة',
  shipped:    'تم الشحن',
  delivered:  'تم التسليم',
  cancelled:  'ملغى',
  returned:   'مرتجع',
};
