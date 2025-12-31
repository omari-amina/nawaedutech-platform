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
    <div className="min-h-screen py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('dashboard.title')}
            </h1>
            <p className="text-gray-600">Welcome back, <span className="text-primary font-semibold">{user.email}</span></p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="text-sm text-gray-500 flex items-center bg-white px-3 py-1 rounded-full shadow-sm">
              <Calendar size={14} className="me-2" />
              {new Date().toLocaleDateString(isRTL ? 'ar-DZ' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">{t('dashboard.myCourses')}</p>
              <p className="text-4xl font-bold text-gray-900">{enrollments.length}</p>
            </div>
            <div className="p-4 bg-primary/10 rounded-xl">
              <BookOpen size={32} className="text-primary" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">{t('dashboard.myOrders')}</p>
              <p className="text-4xl font-bold text-gray-900">{orders.length}</p>
            </div>
            <div className="p-4 bg-secondary/10 rounded-xl">
              <Package size={32} className="text-secondary" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">{t('dashboard.certificates')}</p>
              <p className="text-4xl font-bold text-gray-900">
                {enrollments.filter(e => e.progress_percentage >= 100).length}
              </p>
            </div>
            <div className="p-4 bg-accent/10 rounded-xl">
              <Award size={32} className="text-accent" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Courses */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen size={20} className="me-2 text-primary" />
              {t('dashboard.myCourses')}
            </h2>
            {enrollments.length > 0 ? (
              <div className="space-y-4">
                {enrollments.slice(0, 5).map((enrollment) => (
                  <div key={enrollment.id} className="group p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {isRTL ? enrollment.course.title_ar : enrollment.course.title_en}
                      </h3>
                      <Link
                        to={`/courses/${enrollment.course_id}`}
                        className="text-xs font-semibold bg-gray-100 hover:bg-primary hover:text-white px-3 py-1 rounded-full transition-colors flex items-center"
                      >
                        Continue
                        <ArrowRight size={12} className={`ms-1 ${isRTL ? 'rotate-180' : ''}`} />
                      </Link>
                    </div>

                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1.5 text-sm">
                        <span className="text-gray-500 font-medium">{t('dashboard.progress')}</span>
                        <span className="font-bold text-primary">
                          {enrollment.progress_percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${enrollment.progress_percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
                {enrollments.length > 5 && (
                  <button className="w-full py-3 text-center text-primary font-semibold hover:bg-gray-50 rounded-lg transition">
                    View All Courses
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-10 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <BookOpen size={32} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 mb-4">No enrolled courses yet.</p>
                <Link to="/courses" className="text-primary font-bold hover:underline">Browse Courses</Link>
              </div>
            )}
          </div>

          {/* My Orders */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Package size={20} className="me-2 text-secondary" />
              {t('dashboard.myOrders')}
            </h2>
            {orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-start py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order #</th>
                      <th className="text-start py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="text-start py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4 font-mono text-sm text-gray-900">#{order.order_number.substring(0, 8)}</td>
                        <td className="py-4 px-4 font-semibold text-gray-900">D.Z {order.total}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                            }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <Package size={32} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 mb-4">No orders yet.</p>
                <Link to="/shop" className="text-primary font-bold hover:underline">Go to Shop</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
