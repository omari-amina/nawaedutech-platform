import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, Mail, Lock, User, ArrowLeft } from 'lucide-react';
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
    <div className="min-h-screen flex">
      {/* Visual Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-secondary relative overflow-hidden items-center justify-center text-white p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent opacity-20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 max-w-lg text-center">
          <div className="bg-white/10 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
            <User size={48} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-6">{t('auth.signup')}</h2>
          <p className="text-lg text-purple-100/80 leading-relaxed">
            Join our community of learners and educators. Start your journey from chaos to order today.
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('auth.signup')}</h1>
            <p className="text-gray-500">Create your account to get started</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm flex items-start">
              <span className="mr-2 rtl:ml-2">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.fullName')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-3 rtl:pr-3 flex items-center pointer-events-none text-gray-400">
                  <User size={20} />
                </div>
                <input
                  {...register('fullName')}
                  type="text"
                  className={`w-full pl-10 rtl:pr-10 rtl:pl-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.fullName ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-primary'
                    }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && <p className="mt-1 text-sm text-red-500">Required</p>}
            </div>

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
              {errors.email && <p className="mt-1 text-sm text-red-500">{t('common.error')}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.password')}
              </label>
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
              {errors.password && <p className="mt-1 text-sm text-red-500">Min 6 chars</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.role')}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center hover:bg-gray-50 transition-colors ${loading ? 'opacity-50' : ''
                  }`}>
                  <input type="radio" value="student" {...register('role')} className="sr-only peer" />
                  <span className="w-4 h-4 rounded-full border border-gray-300 peer-checked:border-primary peer-checked:bg-primary mb-2"></span>
                  <span className="font-medium text-gray-700 peer-checked:text-primary">{t('auth.student')}</span>
                </label>
                <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center hover:bg-gray-50 transition-colors ${loading ? 'opacity-50' : ''
                  }`}>
                  <input type="radio" value="teacher" {...register('role')} className="sr-only peer" />
                  <span className="w-4 h-4 rounded-full border border-gray-300 peer-checked:border-primary peer-checked:bg-primary mb-2"></span>
                  <span className="font-medium text-gray-700 peer-checked:text-primary">{t('auth.teacher')}</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-6"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                t('auth.signup')
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {t('auth.hasAccount')}{' '}
              <Link to="/login" className="text-primary hover:text-secondary font-bold hover:underline">
                {t('nav.login')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
