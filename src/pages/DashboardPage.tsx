import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { BookOpen, Package, Award, User as UserIcon, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Enrollment {
  id: string;
  course_id: string;
  progress_percentage: number;
  enrolled_at: string;
  course: {
    title_en: string;
    title_ar: string;
  }
}

interface Order {
  id: string;
  order_number: string;
  total: number;
  status: string;
  created_at: string;
}

export function DashboardPage() {
  const { t, i18n } = useTranslation();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/login');
      } else {
        loadDashboardData();
      }
    }
  }, [user, authLoading, navigate]);

  const loadDashboardData = async () => {
    if (!user) return;

    // Load enrollments with course details
    const { data: enrollmentData } = await supabase
      .from('enrollments')
      .select('*, course:courses(title_en, title_ar)')
      .eq('user_id', user.id)
      .order('enrolled_at', { ascending: false });

    if (enrollmentData) {
      // Map to include optional chaining or default values if course is missing
      const mappedEnrollments: any[] = enrollmentData.map((e: any) => ({
        ...e,
        course: e.course || { title_en: 'Unknown Course', title_ar: 'دورة غير معروفة' }
      }));
      setEnrollments(mappedEnrollments);
    }

    // Load orders
    const { data: orderData } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (orderData) setOrders(orderData);

    setLoading(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center bg-muted/30">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen py-16 bg-gray-50/50 font-sans">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Welcome Banner - Premium Card */}
        <div className="bg-gradient-to-br from-[#340690] via-[#5f2cc7] to-[#864bf5] rounded-[2.5rem] p-8 md:p-12 mb-12 shadow-2xl relative overflow-hidden">
          {/* Decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f3b942]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[1.5rem] flex items-center justify-center shadow-xl">
                <UserIcon size={32} className="text-[#f3b942]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">
                  {isRTL ? 'مرحباً بك مجدداً' : 'Welcome back'},
                </h1>
                <p className="text-white/60 font-bold tracking-wide uppercase text-xs">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#f3b942] rounded-xl flex items-center justify-center">
                <Calendar size={18} className="text-[#340690]" />
              </div>
              <div className="text-right" dir={isRTL ? 'rtl' : 'ltr'}>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#f3b942]">{isRTL ? 'تاريخ اليوم' : 'Today'}</p>
                <p className="text-white font-bold leading-none">
                  {new Date().toLocaleDateString(isRTL ? 'ar-DZ' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid - Premium Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-8 border border-gray-100 flex items-center justify-between group hover:border-[#340690]/20 transition-all hover:-translate-y-1">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{t('dashboard.myCourses')}</p>
              <p className="text-4xl font-black text-[#340690]">{enrollments.length}</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-[#340690]/5 to-[#340690]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen size={28} className="text-[#340690]" />
            </div>
          </div>

          <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-8 border border-gray-100 flex items-center justify-between group hover:border-[#f3b942]/20 transition-all hover:-translate-y-1">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{t('dashboard.myOrders')}</p>
              <p className="text-4xl font-black text-[#340690]">{orders.length}</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-[#f3b942]/5 to-[#f3b942]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Package size={28} className="text-[#f3b942]" />
            </div>
          </div>

          <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-8 border border-gray-100 flex items-center justify-between group hover:border-green-100 transition-all hover:-translate-y-1">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{t('dashboard.certificates')}</p>
              <p className="text-4xl font-black text-[#340690]">
                {enrollments.filter(e => e.progress_percentage >= 100).length}
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-green-100/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award size={28} className="text-green-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Recent Training Panel */}
          <div className="lg:col-span-12 xl:col-span-7">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-8 md:p-10 relative overflow-hidden h-full">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#340690]/10 rounded-xl flex items-center justify-center">
                    <BookOpen size={20} className="text-[#340690]" />
                  </div>
                  <h2 className="text-2xl font-black text-[#340690]">{t('dashboard.myCourses')}</h2>
                </div>
                <Link to="/courses" className="text-[10px] font-black uppercase tracking-widest text-[#340690] bg-[#340690]/5 px-4 py-2 rounded-full hover:bg-[#340690] hover:text-white transition-all">
                  Browse Store
                </Link>
              </div>

              {enrollments.length > 0 ? (
                <div className="space-y-6">
                  {enrollments.slice(0, 4).map((enrollment) => (
                    <div key={enrollment.id} className="group bg-gray-50/50 rounded-[1.5rem] p-6 hover:bg-white hover:shadow-xl hover:shadow-[#340690]/5 border-2 border-transparent hover:border-[#340690]/10 transition-all">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                        <div className="flex-1">
                          <h3 className="text-lg font-black text-gray-900 group-hover:text-[#340690] transition-colors leading-snug">
                            {isRTL ? enrollment.course.title_ar : enrollment.course.title_en}
                          </h3>
                        </div>
                        <Link
                          to={`/courses/${enrollment.course_id}`}
                          className="shrink-0 flex items-center gap-2 bg-white text-[#340690] border-2 border-[#340690]/10 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#340690] hover:text-white transition-all shadow-sm"
                        >
                          Continue
                          <ArrowRight size={14} className={isRTL ? 'rotate-180' : ''} />
                        </Link>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                          <span className="text-gray-400">Your Progress</span>
                          <span className="text-[#340690]">{enrollment.progress_percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-[#340690] to-[#5f2cc7] h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${enrollment.progress_percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-200">
                  <BookOpen size={48} className="mx-auto text-gray-300 mb-6" />
                  <p className="text-gray-500 font-bold mb-8">No enrolled courses yet.</p>
                  <Link to="/courses" className="bg-[#340690] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-[#340690]/20 hover:scale-105 transition-all inline-block">
                    Explore Our Courses
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Orders Panel */}
          <div className="lg:col-span-12 xl:col-span-5">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-8 h-full relative overflow-hidden">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 bg-[#f3b942]/10 rounded-xl flex items-center justify-center">
                  <Package size={20} className="text-[#f3b942]" />
                </div>
                <h2 className="text-2xl font-black text-[#340690]">{t('dashboard.myOrders')}</h2>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.slice(0, 6).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100 group">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-100 group-hover:bg-[#f3b942]/10 transition-colors shrink-0">
                          <Clock size={18} className="text-gray-400 group-hover:text-[#f3b942]" />
                        </div>
                        <div>
                          <p className="font-mono text-xs font-bold text-gray-500">#{order.order_number.substring(0, 8)}</p>
                          <p className="font-black text-[#340690] text-lg leading-tight mt-1">{order.total} <span className="text-[10px] opacity-40">DZD</span></p>
                        </div>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'delivered' ? 'bg-green-50 text-green-600' :
                        order.status === 'processing' ? 'bg-blue-50 text-[#340690]' :
                          'bg-[#f3b942]/10 text-[#340690]'
                        }`}>
                        {order.status}
                      </span>
                    </div>
                  ))}
                  <button className="w-full py-4 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-[#340690] transition-colors mt-4">
                    View Complete History
                  </button>
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-200">
                  <Package size={48} className="mx-auto text-gray-300 mb-6" />
                  <p className="text-gray-500 font-bold mb-8">No orders yet.</p>
                  <Link to="/shop" className="text-[#340690] font-black uppercase tracking-widest text-xs hover:underline">
                    Browse Shop Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
