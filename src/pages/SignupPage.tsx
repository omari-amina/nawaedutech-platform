import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, Mail, Lock, User, ArrowLeft, CheckCircle } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const signupSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['student', 'teacher']),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupPage() {
  const { t, i18n } = useTranslation();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isRTL = i18n.language === 'ar';

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: 'student'
    }
  });

  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true);
    setError('');

    try {
      await signUp(data.email, data.password, data.fullName, data.role);
      alert('Account created successfully!');
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* 1. VISUAL SIDE (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#5f2cc7] via-[#340690] to-[#f3b942] relative overflow-hidden items-center justify-center p-20">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#340690]/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 max-w-lg text-center">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center mx-auto mb-10 ring-1 ring-white/20 shadow-2xl">
            <UserPlus size={40} className="text-[#f3b942]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            ابدأ رحلتك مع <span className="text-[#f3b942]">نواة</span> اليوم
          </h2>
          <p className="text-xl text-white/80 leading-relaxed font-medium">
            انضم إلى مجتمعنا من المتعلمين والمعلمين المتميزين. انتقل من الفوضى إلى النظام بلمسة إبداعية واحدة.
          </p>

          <div className="mt-16 flex flex-col gap-6">
            <div className="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-right" dir="rtl">
              <div className="w-12 h-12 bg-[#f3b942] rounded-2xl flex items-center justify-center shrink-0">
                <CheckCircle size={24} className="text-[#340690]" />
              </div>
              <p className="text-lg font-bold text-white">وصول غير محدود لجميع المنتجات المجانية</p>
            </div>
            <div className="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-right" dir="rtl">
              <div className="w-12 h-12 bg-[#f3b942] rounded-2xl flex items-center justify-center shrink-0">
                <CheckCircle size={24} className="text-[#340690]" />
              </div>
              <p className="text-lg font-bold text-white">متجر متكامل للمنتجات التعليمية والمطبوعة</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FORM SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 relative overflow-hidden bg-white">
        {/* Abstract Background for Mobile */}
        <div className="lg:hidden absolute top-0 right-0 w-64 h-64 bg-[#f3b942]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="max-w-md w-full relative z-10">
          <Link to="/" className="inline-flex items-center text-[#340690]/60 hover:text-[#340690] mb-12 transition-all font-black uppercase tracking-widest text-xs group">
            <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'} group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform`} />
            {t('nav.home')}
          </Link>

          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-black text-[#340690] mb-4">{t('auth.signup')}</h1>
            <p className="text-gray-500 font-medium">أنشئ حسابك الجديد في ثوانٍ معدودة</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-5 rounded-[1.5rem] mb-8 text-sm font-bold flex items-center gap-4 border border-red-100 shadow-sm animate-shake">
              <span className="text-lg">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-black text-[#340690] uppercase tracking-widest opacity-70">
                {t('auth.fullName')}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-6 rtl:pr-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#340690] transition-colors">
                  <User size={20} />
                </div>
                <input
                  {...register('fullName')}
                  type="text"
                  className={`w-full pl-14 rtl:pr-14 rtl:pl-4 py-4 bg-muted/20 border-2 rounded-[1.2rem] focus:outline-none focus:ring-4 focus:ring-[#340690]/5 transition-all font-bold text-lg placeholder:font-medium placeholder:text-gray-400 ${errors.fullName ? 'border-red-500' : 'border-transparent focus:border-[#340690]'}`}
                  placeholder={isRTL ? 'مثال: محمد علي' : 'e.g. John Doe'}
                />
              </div>
              {errors.fullName && <p className="mt-1 text-xs text-red-500 font-bold px-2">Required</p>}
            </div>

            <div className="space-y-2">
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
                  className={`w-full pl-14 rtl:pr-14 rtl:pl-4 py-4 bg-muted/20 border-2 rounded-[1.2rem] focus:outline-none focus:ring-4 focus:ring-[#340690]/5 transition-all font-bold text-lg placeholder:font-medium placeholder:text-gray-400 ${errors.email ? 'border-red-500' : 'border-transparent focus:border-[#340690]'}`}
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500 font-bold px-2">{t('common.error')}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-black text-[#340690] uppercase tracking-widest opacity-70">
                {t('auth.password')}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-6 rtl:pr-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#340690] transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  {...register('password')}
                  type="password"
                  className={`w-full pl-14 rtl:pr-14 rtl:pl-4 py-4 bg-muted/20 border-2 rounded-[1.2rem] focus:outline-none focus:ring-4 focus:ring-[#340690]/5 transition-all font-bold text-lg placeholder:font-medium placeholder:text-gray-400 ${errors.password ? 'border-red-500' : 'border-transparent focus:border-[#340690]'}`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500 font-bold px-2">Min 6 chars</p>}
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-black text-[#340690] uppercase tracking-widest opacity-70">
                {t('auth.role')}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative cursor-pointer group/role">
                  <input type="radio" value="student" {...register('role')} className="sr-only peer" />
                  <div className="p-6 border-2 border-gray-100 rounded-2xl flex flex-col items-center gap-3 transition-all hover:bg-gray-50 peer-checked:bg-[#340690]/5 peer-checked:border-[#340690] group-hover/role:scale-[1.02]">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center peer-checked:bg-[#340690] transition-colors">
                      <div className="w-3 h-3 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                    </div>
                    <span className="font-black text-xs uppercase tracking-widest text-gray-500 peer-checked:text-[#340690]">{t('auth.student')}</span>
                  </div>
                </label>

                <label className="relative cursor-pointer group/role">
                  <input type="radio" value="teacher" {...register('role')} className="sr-only peer" />
                  <div className="p-6 border-2 border-gray-100 rounded-2xl flex flex-col items-center gap-3 transition-all hover:bg-gray-50 peer-checked:bg-[#340690]/5 peer-checked:border-[#340690] group-hover/role:scale-[1.02]">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center peer-checked:bg-[#340690] transition-colors">
                      <div className="w-3 h-3 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                    </div>
                    <span className="font-black text-xs uppercase tracking-widest text-gray-500 peer-checked:text-[#340690]">{t('auth.teacher')}</span>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#340690] text-white py-5 rounded-[1.2rem] font-black text-xl hover:bg-[#5f2cc7] transition-all shadow-2xl shadow-[#340690]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group overflow-hidden relative mt-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              {loading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <span className="flex items-center gap-3">
                  {t('auth.signup')}
                  <UserPlus size={20} className="group-hover:scale-110 transition-transform" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-500 font-medium">
              {t('auth.hasAccount')}{' '}
              <Link to="/login" className="text-[#340690] hover:text-[#5f2cc7] font-black uppercase tracking-widest text-xs hover:underline ml-2">
                {t('nav.login')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
