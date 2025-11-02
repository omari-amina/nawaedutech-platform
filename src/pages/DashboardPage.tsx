import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { BookOpen, Package, Award, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Enrollment {
  id: string;
  course_id: string;
  progress_percentage: number;
  enrolled_at: string;
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

    // Load enrollments
    const { data: enrollmentData } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', user.id)
      .order('enrolled_at', { ascending: false });
    if (enrollmentData) setEnrollments(enrollmentData);

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
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {t('dashboard.title')}
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">{t('dashboard.myCourses')}</p>
                <p className="text-3xl font-bold text-primary">{enrollments.length}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <BookOpen size={32} className="text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">{t('dashboard.myOrders')}</p>
                <p className="text-3xl font-bold text-primary">{orders.length}</p>
              </div>
              <div className="p-3 bg-secondary/10 rounded-full">
                <Package size={32} className="text-secondary" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">{t('dashboard.certificates')}</p>
                <p className="text-3xl font-bold text-primary">
                  {enrollments.filter(e => e.progress_percentage >= 100).length}
                </p>
              </div>
              <div className="p-3 bg-accent/10 rounded-full">
                <Award size={32} className="text-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* My Courses */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('dashboard.myCourses')}
          </h2>
          {enrollments.length > 0 ? (
            <div className="space-y-4">
              {enrollments.slice(0, 5).map((enrollment) => (
                <div key={enrollment.id} className="flex items-center justify-between border-b pb-4">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Course {enrollment.course_id.substring(0, 8)}</p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">{t('dashboard.progress')}</span>
                        <span className="text-sm font-semibold text-primary">
                          {enrollment.progress_percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${enrollment.progress_percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/courses/${enrollment.course_id}`}
                    className="ml-4 text-primary hover:text-secondary font-semibold"
                  >
                    Continue
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No enrolled courses yet. Browse our courses to get started!</p>
          )}
        </div>

        {/* My Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('dashboard.myOrders')}
          </h2>
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Order Number</th>
                    <th className="text-left py-2 px-4">Date</th>
                    <th className="text-left py-2 px-4">Total</th>
                    <th className="text-left py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-semibold">{order.order_number}</td>
                      <td className="py-3 px-4">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="py-3 px-4">${order.total}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-sm ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
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
            <p className="text-gray-600">No orders yet. Start shopping to see your order history!</p>
          )}
        </div>
      </div>
    </div>
  );
}
