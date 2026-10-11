import { useRef, useState } from 'react';
import { Download, KeyRound, Trash2, Upload } from 'lucide-react';
import { DEFAULT_SETTINGS, getSettings, saveSettings, type ShopSettings } from '../../lib/shopSettings';
import { resetCatalogCustomizations } from '../../lib/catalogStore';
import { setAdminPin, verifyAdminPin } from '../../lib/adminAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import { resolveLocale } from '../../data/brandSite';
import { usePageMeta } from '../../hooks/usePageMeta';

export function AdminSettingsPage() {
  const { language } = useLanguage();
  const locale = resolveLocale(language);
  const [form, setForm] = useState<ShopSettings>(() => getSettings());
  const [saved, setSaved] = useState(false);
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [pinMsg, setPinMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  usePageMeta({ title: 'Admin settings', description: 'Store settings', noIndex: true });

  const set = <K extends keyof ShopSettings>(k: K, v: ShopSettings[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setSaved(false);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings({ ...form, freeShippingThreshold: Math.max(0, Number(form.freeShippingThreshold) || 0) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const changePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyAdminPin(oldPin)) {
      setPinMsg(locale === 'ar' ? 'الرمز الحالي خاطئ' : 'Code actuel incorrect');
      return;
    }
    if (!/^\d{4,8}$/.test(newPin.trim())) {
      setPinMsg(locale === 'ar' ? 'الرمز الجديد: 4-8 أرقام' : 'Nouveau code : 4-8 chiffres');
      return;
    }
    setAdminPin(newPin.trim());
    setOldPin('');
    setNewPin('');
    setPinMsg(locale === 'ar' ? 'تم تغيير الرمز ✅' : 'Code modifié ✅');
  };

  const exportData = () => {
    const data: Record<string, unknown> = {};
    for (const k of ['nawaedutech_orders', 'nawaedutech_admin_products', 'nawaedutech_admin_deleted', 'nawaedutech_settings']) {
      try {
        data[k] = JSON.parse(localStorage.getItem(k) ?? 'null');
      } catch {
        data[k] = null;
      }
    }
    const blob = new Blob([JSON.stringify({ app: 'nawaedutech', at: new Date().toISOString(), data }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `nawa-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importData = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as { data?: Record<string, unknown> };
        const data = parsed.data ?? {};
        for (const k of ['nawaedutech_orders', 'nawaedutech_admin_products', 'nawaedutech_admin_deleted', 'nawaedutech_settings']) {
          if (data[k] !== undefined && data[k] !== null) {
            localStorage.setItem(k, JSON.stringify(data[k]));
          }
        }
        setForm(getSettings());
        window.dispatchEvent(new CustomEvent('nawa:catalog'));
        alert(locale === 'ar' ? 'تم الاستيراد بنجاح ✅' : 'Import OK ✅');
      } catch {
        alert(locale === 'ar' ? 'ملف غير صالح' : 'Fichier invalide');
      }
    };
    reader.readAsText(file);
  };

  const input = 'w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-slate-950 focus:bg-white';
  const lbl = 'mb-1.5 block text-xs font-black text-slate-500';

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black text-slate-950 md:text-3xl">
          {locale === 'ar' ? 'الإعدادات' : locale === 'fr' ? 'Réglages' : 'Settings'}
        </h1>
        <p className="mt-1 text-sm font-bold text-slate-500">
          {locale === 'ar' ? 'بيانات المتجر، الدفع، الأمان، والنسخ الاحتياطي' : 'Boutique, paiement, sécurité, sauvegardes'}
        </p>
      </div>

      {/* Store + payment */}
      <form onSubmit={save} className="rounded-[1.75rem] bg-white p-5 shadow-sm md:p-6">
        <h2 className="font-black text-slate-950">{locale === 'ar' ? 'المتجر والدفع' : 'Boutique & paiement'}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className={lbl}>{locale === 'ar' ? 'اسم المتجر' : 'Nom boutique'}</label>
            <input value={form.storeName} onChange={(e) => set('storeName', e.target.value)} className={input} />
          </div>
          <div>
            <label className={lbl}>WhatsApp (رابط wa.me)</label>
            <input value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} className={input} dir="ltr" />
          </div>
          <div>
            <label className={lbl}>CCP — {locale === 'ar' ? 'رقم الحساب' : 'compte'}</label>
            <input value={form.ccpAccount} onChange={(e) => set('ccpAccount', e.target.value)} className={input} dir="ltr" />
          </div>
          <div>
            <label className={lbl}>CCP — {locale === 'ar' ? 'باسم' : 'nom'}</label>
            <input value={form.ccpName} onChange={(e) => set('ccpName', e.target.value)} className={input} />
          </div>
          <div>
            <label className={lbl}>BaridiMob — {locale === 'ar' ? 'رقم الهاتف' : 'téléphone'}</label>
            <input value={form.baridimobPhone} onChange={(e) => set('baridimobPhone', e.target.value)} className={input} dir="ltr" />
          </div>
          <div>
            <label className={lbl}>{locale === 'ar' ? 'عتبة التوصيل المجاني (DA)' : 'Seuil livraison gratuite (DA)'}</label>
            <input type="number" min={0} value={form.freeShippingThreshold} onChange={(e) => set('freeShippingThreshold', Number(e.target.value))} className={input} dir="ltr" />
          </div>
        </div>
        <button type="submit" className="mt-5 rounded-2xl bg-slate-950 px-8 py-3.5 text-sm font-black text-white transition hover:bg-slate-800">
          {saved ? (locale === 'ar' ? 'تم الحفظ ✅' : 'Enregistré ✅') : (locale === 'ar' ? 'حفظ الإعدادات' : 'Enregistrer')}
        </button>
        <button type="button" onClick={() => { setForm({ ...DEFAULT_SETTINGS }); setSaved(false); }} className="ms-2 rounded-2xl bg-slate-100 px-6 py-3.5 text-sm font-black text-slate-500">
          {locale === 'ar' ? 'استعادة الافتراضي' : 'Défaut'}
        </button>
      </form>

      {/* Security */}
      <form onSubmit={changePin} className="rounded-[1.75rem] bg-white p-5 shadow-sm md:p-6">
        <h2 className="flex items-center gap-2 font-black text-slate-950">
          <KeyRound size={17} /> {locale === 'ar' ? 'رمز الدخول للإدارة' : 'Code admin'}
        </h2>
        <div className="mt-4 grid max-w-lg gap-4 md:grid-cols-2">
          <div>
            <label className={lbl}>{locale === 'ar' ? 'الرمز الحالي' : 'Code actuel'}</label>
            <input type="password" inputMode="numeric" value={oldPin} onChange={(e) => setOldPin(e.target.value)} className={input} dir="ltr" />
          </div>
          <div>
            <label className={lbl}>{locale === 'ar' ? 'الرمز الجديد (4-8 أرقام)' : 'Nouveau code (4-8 chiffres)'}</label>
            <input type="password" inputMode="numeric" value={newPin} onChange={(e) => setNewPin(e.target.value)} className={input} dir="ltr" />
          </div>
        </div>
        <button type="submit" className="mt-4 rounded-2xl bg-slate-950 px-8 py-3 text-sm font-black text-white">
          {locale === 'ar' ? 'تغيير الرمز' : 'Changer le code'}
        </button>
        {pinMsg && <p className="mt-2 text-sm font-bold text-slate-600">{pinMsg}</p>}
      </form>

      {/* Backup */}
      <div className="rounded-[1.75rem] bg-white p-5 shadow-sm md:p-6">
        <h2 className="font-black text-slate-950">{locale === 'ar' ? 'النسخ الاحتياطي' : 'Sauvegardes'}</h2>
        <p className="mt-1 text-sm font-bold text-slate-500">
          {locale === 'ar' ? 'صدّر الطلبات والمنتجات والإعدادات (JSON) أو استعدها.' : 'Exportez / importez commandes, produits, réglages (JSON).'}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={exportData} className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white">
            <Download size={15} /> {locale === 'ar' ? 'تصدير نسخة' : 'Exporter'}
          </button>
          <button onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-700">
            <Upload size={15} /> {locale === 'ar' ? 'استيراد نسخة' : 'Importer'}
          </button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => { importData(e.target.files?.[0]); e.target.value = ''; }} />
        </div>
      </div>

      {/* Danger */}
      <div className="rounded-[1.75rem] border border-red-100 bg-white p-5 shadow-sm md:p-6">
        <h2 className="flex items-center gap-2 font-black text-red-600">
          <Trash2 size={17} /> {locale === 'ar' ? 'منطقة الخطر' : 'Zone danger'}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => {
              if (!confirm(locale === 'ar' ? 'إلغاء كل تعديلات المنتجات والعودة للكتالوج الأصلي؟' : 'Annuler toutes les modifications produits ?')) return;
              resetCatalogCustomizations();
              alert(locale === 'ar' ? 'تمت الاستعادة ✅' : 'OK ✅');
            }}
            className="rounded-2xl bg-red-50 px-5 py-3 text-sm font-black text-red-600 transition hover:bg-red-100"
          >
            {locale === 'ar' ? 'استعادة الكتالوج الأصلي' : 'Restaurer le catalogue'}
          </button>
        </div>
      </div>
    </div>
  );
}
