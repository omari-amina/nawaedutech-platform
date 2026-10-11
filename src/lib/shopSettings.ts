// src/lib/shopSettings.ts — Store settings (admin-editable, local-first)

export interface ShopSettings {
  storeName: string;
  whatsapp: string; // https://wa.me/... link
  ccpAccount: string;
  ccpName: string;
  baridimobPhone: string;
  freeShippingThreshold: number;
  announcementAr: string;
  announcementEn: string;
  showAnnouncement: boolean;
}

const SETTINGS_KEY = 'nawaedutech_settings';

export const DEFAULT_SETTINGS: ShopSettings = {
  storeName: 'NawaEduTech',
  whatsapp: 'https://wa.me/213555123456',
  ccpAccount: '00700-1234567-89',
  ccpName: 'نوى للتعليم والتكنولوجيا',
  baridimobPhone: '0555-123-456',
  freeShippingThreshold: 5000,
  announcementAr: '',
  announcementEn: '',
  showAnnouncement: false,
};

export function getSettings(): ShopSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<ShopSettings>) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(s: ShopSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  } catch { /* ignore */ }
  window.dispatchEvent(new CustomEvent('nawa:settings'));
}

export function subscribeSettings(fn: () => void): () => void {
  window.addEventListener('nawa:settings', fn);
  window.addEventListener('storage', fn);
  return () => {
    window.removeEventListener('nawa:settings', fn);
    window.removeEventListener('storage', fn);
  };
}
