import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck } from 'lucide-react';
import { DEFAULT_ADMIN_PIN, openAdminSession, verifyAdminPin } from '../../lib/adminAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import { resolveLocale } from '../../data/brandSite';
import { usePageMeta } from '../../hooks/usePageMeta';

export function AdminLoginPage() {
  const { language } = useLanguage();
  const locale = resolveLocale(language);
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  usePageMeta({ title: 'Admin', description: 'Admin login', noIndex: true });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPin(pin.trim())) {
      openAdminSession();
      navigate('/admin');
    } else {
      setError(locale === 'ar' ? 'رمز خاطئ، حاول مجددًا.' : locale === 'fr' ? 'Code incorrect.' : 'Wrong PIN, try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-[2rem] bg-white p-8 shadow-xl">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
          <ShieldCheck size={26} />
        </div>
        <h1 className="text-center text-2xl font-black text-slate-950">
          {locale === 'ar' ? 'دخول الإدارة' : locale === 'fr' ? 'Espace admin' : 'Admin access'}
        </h1>
        <p className="mt-2 text-center text-sm font-bold text-slate-500">
          {locale === 'ar'
            ? `أدخل رمز الإدارة (الافتراضي: ${DEFAULT_ADMIN_PIN})`
            : locale === 'fr'
              ? `Code admin (défaut : ${DEFAULT_ADMIN_PIN})`
              : `Enter admin PIN (default: ${DEFAULT_ADMIN_PIN})`}
        </p>
        <div className="relative mt-6">
          <Lock size={16} className="absolute top-1/2 -translate-y-1/2 text-slate-400 start-4" />
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            type="password"
            inputMode="numeric"
            autoFocus
            placeholder="••••"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 text-center text-xl font-black tracking-[0.5em] outline-none focus:border-slate-950 ps-10"
          />
        </div>
        {error && <p className="mt-3 text-center text-sm font-bold text-red-500">{error}</p>}
        <button type="submit" className="mt-5 w-full rounded-2xl bg-slate-950 py-4 font-black text-white transition hover:bg-slate-800">
          {locale === 'ar' ? 'دخول' : locale === 'fr' ? 'Entrer' : 'Enter'}
        </button>
        <Link to="/" className="mt-4 block text-center text-sm font-bold text-slate-400 hover:text-slate-700">
          {locale === 'ar' ? '← العودة للمتجر' : locale === 'fr' ? '← Boutique' : '← Back to store'}
        </Link>
      </form>
    </div>
  );
}
