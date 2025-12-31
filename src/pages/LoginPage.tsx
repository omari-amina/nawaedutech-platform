import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Mail, Lock, ArrowLeft } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { t, i18n } = useTranslation();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isRTL = i18n.language === 'ar';

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError('');

    try {
      await signIn(data.email, data.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* 1. VISUAL SIDE (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#340690] via-[#5f2cc7] to-[#864bf5] relative overflow-hidden items-center justify-center p-20">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#f3b942]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#f3b942]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative z-10 max-w-lg text-center">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center mx-auto mb-10 ring-1 ring-white/20 shadow-2xl">
            <LogIn size={40} className="text-[#f3b942]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            مرحباً بك مجدداً في <span className="text-[#f3b942]">نواة</span>
          </h2>
          <p className="text-xl text-white/70 leading-relaxed font-medium">
            سجل دخولك لتستمتع برحلتك التعليمية وتصل إلى أدواتك ومنتجاتك الحصرية.
          </p>

          <div className="mt-16 grid grid-cols-2 gap-4">
            <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <p className="text-2xl font-black text-white mb-1">5000+</p>
              <p className="text-sm text-white/50 font-bold uppercase tracking-widest">مستخدم</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <p className="text-2xl font-black text-white mb-1">100+</p>
              <p className="text-sm text-white/50 font-bold uppercase tracking-widest">منتج تعليمي</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FORM SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 relative overflow-hidden bg-white">
        {/* Abstract Background for Mobile */}
        <div className="lg:hidden absolute top-0 right-0 w-64 h-64 bg-[#340690]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="max-w-md w-full relative z-10">
          <Link to="/" className="inline-flex items-center text-[#340690]/60 hover:text-[#340690] mb-12 transition-all font-black uppercase tracking-widest text-xs group">
            <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'} group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform`} />
            {t('nav.home')}
          </Link>

          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-black text-[#340690] mb-4">{t('auth.login')}</h1>
            <p className="text-gray-500 font-medium">أدخل بياناتك للوصول إلى حسابك الخاص</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-5 rounded-[1.5rem] mb-8 text-sm font-bold flex items-center gap-4 border border-red-100 shadow-sm animate-shake">
              <span className="text-lg">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-sm font-black text-[#340690] uppercase tracking-widest opacity-70">
                {t('auth.email')}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-6 rtl:pr-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#340690] transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  className={`w-full pl-14 rtl:pr-14 rtl:pl-4 py-5 bg-muted/20 border-2 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-[#340690]/5 transition-all font-bold text-lg placeholder:font-medium placeholder:text-gray-400 ${errors.email ? 'border-red-500' : 'border-transparent focus:border-[#340690]'}`}
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-500 font-bold px-2">{t('common.error')}</p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-black text-[#340690] uppercase tracking-widest opacity-70">
                  {t('auth.password')}
                </label>
                <a href="#" className="text-xs text-[#5f2cc7] hover:text-[#340690] font-black uppercase tracking-widest transition-colors">
                  {t('auth.forgotPassword')}
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-6 rtl:pr-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#340690] transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  {...register('password')}
                  type="password"
                  className={`w-full pl-14 rtl:pr-14 rtl:pl-4 py-5 bg-muted/20 border-2 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-[#340690]/5 transition-all font-bold text-lg placeholder:font-medium placeholder:text-gray-400 ${errors.password ? 'border-red-500' : 'border-transparent focus:border-[#340690]'}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-500 font-bold px-2">{t('common.error')}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#340690] text-white py-5 rounded-[1.5rem] font-black text-xl hover:bg-[#5f2cc7] transition-all shadow-2xl shadow-[#340690]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <span className="flex items-center gap-3">
                  {t('auth.login')}
                  <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-gray-500 font-medium">
              {t('auth.noAccount')}{' '}
              <Link to="/signup" className="text-[#340690] hover:text-[#5f2cc7] font-black uppercase tracking-widest text-xs hover:underline ml-2">
                {t('nav.signup')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
