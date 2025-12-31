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
    <div className="min-h-screen flex">
      {/* Visual Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden items-center justify-center text-white p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary opacity-20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 max-w-lg text-center">
          <img src="/logo-icon.png" alt="Nawa Logo" className="w-24 h-24 mx-auto mb-8 brightness-0 invert opacity-90" />
          <h2 className="text-4xl font-bold mb-6">{t('hero.title')}</h2>
          <p className="text-lg text-blue-100/80 leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
            <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
            {t('nav.home')}
          </Link>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('auth.login')}</h1>
            <p className="text-gray-500">{t('hero.orderSubtitle')}</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm flex items-start">
              <span className="mr-2 rtl:ml-2">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-3 rtl:pr-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={20} />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  className={`w-full pl-10 rtl:pr-10 rtl:pl-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                    }`}
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{t('common.error')}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t('auth.password')}
                </label>
                <a href="#" className="text-sm text-primary hover:text-accent font-medium">
                  {t('auth.forgotPassword')}
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-3 rtl:pr-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={20} />
                </div>
                <input
                  {...register('password')}
                  type="password"
                  className={`w-full pl-10 rtl:pr-10 rtl:pl-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                    }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{t('common.error')}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                t('auth.login')
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {t('auth.noAccount')}{' '}
              <Link to="/signup" className="text-primary hover:text-secondary font-bold hover:underline">
                {t('nav.signup')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
