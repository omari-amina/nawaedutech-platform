// src/data/algeriaWilayas.ts
// قائمة الولايات الجزائرية الـ 58 مع مناطق وأسعار التوصيل

export type ShippingZone =
  | 'capital'
  | 'north'
  | 'center'
  | 'south-north'
  | 'south'
  | 'far-south';

export interface Wilaya {
  code: string;       // رمز الولاية (01 - 58)
  nameAr: string;     // الاسم بالعربية
  nameFr: string;     // الاسم بالفرنسية
  zone: ShippingZone; // منطقة التوصيل
}

export interface ShippingZoneInfo {
  zone: ShippingZone;
  labelAr: string;
  labelFr: string;
  price: number;      // بالدينار الجزائري
  minDays: number;
  maxDays: number;
}

// ─── معلومات مناطق التوصيل ───────────────────────────────────────────────────
export const shippingZones: Record<ShippingZone, ShippingZoneInfo> = {
  capital: {
    zone: 'capital',
    labelAr: 'العاصمة',
    labelFr: 'Capitale',
    price: 350,
    minDays: 1,
    maxDays: 2,
  },
  north: {
    zone: 'north',
    labelAr: 'الشمال',
    labelFr: 'Nord',
    price: 450,
    minDays: 2,
    maxDays: 3,
  },
  center: {
    zone: 'center',
    labelAr: 'الوسط',
    labelFr: 'Centre',
    price: 500,
    minDays: 3,
    maxDays: 5,
  },
  'south-north': {
    zone: 'south-north',
    labelAr: 'الجنوب الشمالي',
    labelFr: 'Sud-Nord',
    price: 600,
    minDays: 4,
    maxDays: 6,
  },
  south: {
    zone: 'south',
    labelAr: 'الجنوب',
    labelFr: 'Sud',
    price: 700,
    minDays: 5,
    maxDays: 7,
  },
  'far-south': {
    zone: 'far-south',
    labelAr: 'أقصى الجنوب',
    labelFr: 'Extrême-Sud',
    price: 800,
    minDays: 7,
    maxDays: 10,
  },
};

// ─── قائمة الولايات الكاملة ───────────────────────────────────────────────────
export const algeriaWilayas: Wilaya[] = [
  { code: '01', nameAr: 'أدرار',           nameFr: 'Adrar',               zone: 'south'      },
  { code: '02', nameAr: 'الشلف',           nameFr: 'Chlef',               zone: 'north'      },
  { code: '03', nameAr: 'الأغواط',         nameFr: 'Laghouat',            zone: 'south-north'},
  { code: '04', nameAr: 'أم البواقي',      nameFr: 'Oum El Bouaghi',      zone: 'center'     },
  { code: '05', nameAr: 'باتنة',           nameFr: 'Batna',               zone: 'south-north'},
  { code: '06', nameAr: 'بجاية',           nameFr: 'Béjaïa',              zone: 'north'      },
  { code: '07', nameAr: 'بسكرة',           nameFr: 'Biskra',              zone: 'south-north'},
  { code: '08', nameAr: 'بشار',            nameFr: 'Béchar',              zone: 'south'      },
  { code: '09', nameAr: 'البليدة',         nameFr: 'Blida',               zone: 'north'      },
  { code: '10', nameAr: 'البويرة',         nameFr: 'Bouira',              zone: 'center'     },
  { code: '11', nameAr: 'تمنراست',         nameFr: 'Tamanrasset',         zone: 'south'      },
  { code: '12', nameAr: 'تبسة',            nameFr: 'Tébessa',             zone: 'center'     },
  { code: '13', nameAr: 'تلمسان',          nameFr: 'Tlemcen',             zone: 'center'     },
  { code: '14', nameAr: 'تيارت',           nameFr: 'Tiaret',              zone: 'center'     },
  { code: '15', nameAr: 'تيزي وزو',        nameFr: 'Tizi Ouzou',          zone: 'north'      },
  { code: '16', nameAr: 'الجزائر',         nameFr: 'Alger',               zone: 'capital'    },
  { code: '17', nameAr: 'الجلفة',          nameFr: 'Djelfa',              zone: 'south-north'},
  { code: '18', nameAr: 'جيجل',            nameFr: 'Jijel',               zone: 'south-north'},
  { code: '19', nameAr: 'سطيف',            nameFr: 'Sétif',               zone: 'center'     },
  { code: '20', nameAr: 'سعيدة',           nameFr: 'Saïda',               zone: 'center'     },
  { code: '21', nameAr: 'سكيكدة',          nameFr: 'Skikda',              zone: 'north'      },
  { code: '22', nameAr: 'سيدي بلعباس',     nameFr: 'Sidi Bel Abbès',      zone: 'center'     },
  { code: '23', nameAr: 'عنابة',           nameFr: 'Annaba',              zone: 'north'      },
  { code: '24', nameAr: 'قالمة',           nameFr: 'Guelma',              zone: 'center'     },
  { code: '25', nameAr: 'قسنطينة',         nameFr: 'Constantine',         zone: 'center'     },
  { code: '26', nameAr: 'المدية',          nameFr: 'Médéa',               zone: 'center'     },
  { code: '27', nameAr: 'مستغانم',         nameFr: 'Mostaganem',          zone: 'north'      },
  { code: '28', nameAr: 'المسيلة',         nameFr: "M'Sila",              zone: 'south-north'},
  { code: '29', nameAr: 'معسكر',           nameFr: 'Mascara',             zone: 'center'     },
  { code: '30', nameAr: 'ورقلة',           nameFr: 'Ouargla',             zone: 'south'      },
  { code: '31', nameAr: 'وهران',           nameFr: 'Oran',                zone: 'north'      },
  { code: '32', nameAr: 'البيض',           nameFr: 'El Bayadh',           zone: 'south-north'},
  { code: '33', nameAr: 'إليزي',           nameFr: 'Illizi',              zone: 'far-south'  },
  { code: '34', nameAr: 'برج بوعريريج',    nameFr: 'Bordj Bou Arréridj',  zone: 'center'     },
  { code: '35', nameAr: 'بومرداس',         nameFr: 'Boumerdès',           zone: 'north'      },
  { code: '36', nameAr: 'الطارف',          nameFr: 'El Tarf',             zone: 'north'      },
  { code: '37', nameAr: 'تندوف',           nameFr: 'Tindouf',             zone: 'far-south'  },
  { code: '38', nameAr: 'تيسمسيلت',        nameFr: 'Tissemsilt',          zone: 'center'     },
  { code: '39', nameAr: 'الوادي',          nameFr: 'El Oued',             zone: 'south-north'},
  { code: '40', nameAr: 'خنشلة',           nameFr: 'Khenchela',           zone: 'south-north'},
  { code: '41', nameAr: 'سوق أهراس',       nameFr: 'Souk Ahras',          zone: 'center'     },
  { code: '42', nameAr: 'تيبازة',          nameFr: 'Tipaza',              zone: 'north'      },
  { code: '43', nameAr: 'ميلة',            nameFr: 'Mila',                zone: 'center'     },
  { code: '44', nameAr: 'عين الدفلى',      nameFr: 'Aïn Defla',           zone: 'center'     },
  { code: '45', nameAr: 'النعامة',         nameFr: 'Naâma',               zone: 'south-north'},
  { code: '46', nameAr: 'عين تموشنت',      nameFr: 'Aïn Témouchent',      zone: 'north'      },
  { code: '47', nameAr: 'غرداية',          nameFr: 'Ghardaïa',            zone: 'south-north'},
  { code: '48', nameAr: 'غليزان',          nameFr: 'Relizane',            zone: 'center'     },
  { code: '49', nameAr: 'تيميمون',         nameFr: 'Timimoun',            zone: 'far-south'  },
  { code: '50', nameAr: 'برج باجي مختار',  nameFr: 'Bordj Badji Mokhtar', zone: 'far-south'  },
  { code: '51', nameAr: 'أولاد جلال',      nameFr: 'Ouled Djellal',       zone: 'far-south'  },
  { code: '52', nameAr: 'بني عباس',        nameFr: 'Béni Abbès',          zone: 'far-south'  },
  { code: '53', nameAr: 'عين صالح',        nameFr: 'In Salah',            zone: 'far-south'  },
  { code: '54', nameAr: 'عين قزام',        nameFr: 'In Guezzam',          zone: 'far-south'  },
  { code: '55', nameAr: 'تقرت',            nameFr: 'Touggourt',           zone: 'far-south'  },
  { code: '56', nameAr: 'جانت',            nameFr: 'Djanet',              zone: 'far-south'  },
  { code: '57', nameAr: 'المغير',          nameFr: "El M'Ghair",          zone: 'far-south'  },
  { code: '58', nameAr: 'المنيعة',         nameFr: 'El Meniaa',           zone: 'far-south'  },
];

// ─── دوال مساعدة ─────────────────────────────────────────────────────────────

/**
 * ابحث عن ولاية بكودها
 */
export function getWilayaByCode(code: string): Wilaya | undefined {
  return algeriaWilayas.find((w) => w.code === code);
}

/**
 * احسب سعر التوصيل لولاية معينة
 */
export function getShippingPrice(wilayaCode: string): number {
  const wilaya = getWilayaByCode(wilayaCode);
  if (!wilaya) return shippingZones['far-south'].price; // افتراضي
  return shippingZones[wilaya.zone].price;
}

/**
 * احصل على معلومات منطقة التوصيل لولاية معينة
 */
export function getShippingZoneInfo(wilayaCode: string): ShippingZoneInfo | undefined {
  const wilaya = getWilayaByCode(wilayaCode);
  if (!wilaya) return undefined;
  return shippingZones[wilaya.zone];
}

/**
 * احصل على نص مدة التوصيل المنسّق
 */
export function getDeliveryTimeText(wilayaCode: string): string {
  const info = getShippingZoneInfo(wilayaCode);
  if (!info) return 'غير محدد';
  if (info.minDays === info.maxDays) return `${info.minDays} أيام`;
  return `${info.minDays} - ${info.maxDays} أيام`;
}

export const FREE_SHIPPING_THRESHOLD = 5000;

export function calculateShipping(wilayaCode: string, orderSubtotal: number, freeThreshold: number = FREE_SHIPPING_THRESHOLD): number {
  if (orderSubtotal >= freeThreshold) return 0;
  return getShippingPrice(wilayaCode);
}

export const sortedWilayas = [...algeriaWilayas].sort((a, b) => Number(a.code) - Number(b.code));
