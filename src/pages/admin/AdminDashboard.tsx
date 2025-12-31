import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { useTranslation } from 'react-i18next';
import {
  BookOpen,
  Package,
  ShoppingCart,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  LayoutDashboard,
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  CreditCard,
  BarChart3,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';

export function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total_revenue: 0,
    total_users: 0,
    total_courses: 0,
    total_orders: 0
  });

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/login');
      } else {
        checkAdminAccess();
      }
    }
  }, [user, authLoading, navigate]);

  const checkAdminAccess = async () => {
    if (!user) return;

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();

      if (profile) {
        setUserRole(profile.role);
        if (profile.role !== 'admin') {
          navigate('/dashboard');
        } else {
          loadStats();
        }
      }
    } catch (error) {
      console.error('Error checking admin access:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const { data: orders } = await supabase.from('orders').select('total');
      const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const { count: coursesCount } = await supabase.from('courses').select('*', { count: 'exact', head: true });
      const { count: ordersCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });

      setStats({
        total_revenue: orders?.reduce((acc, order) => acc + (order.total || 0), 0) || 0,
        total_users: usersCount || 0,
        total_courses: coursesCount || 0,
        total_orders: ordersCount || 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-[#340690]/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#340690] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!user || userRole !== 'admin') return null;

  const NavItem = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 px-6 py-4 font-black transition-all relative group ${activeTab === id
        ? 'text-[#340690]'
        : 'text-gray-400 hover:text-[#340690]'
        }`}
    >
      <Icon size={20} className={`${activeTab === id ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
      <span className="uppercase tracking-widest text-xs">{label}</span>
      {activeTab === id && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#340690] rounded-t-full shadow-[0_-4px_10px_rgba(52,6,144,0.3)]" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-20" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Top Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#340690] to-[#5f2cc7] rounded-xl flex items-center justify-center shadow-lg shadow-[#340690]/20">
                <LayoutDashboard size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-[#340690]">{isRTL ? 'لوحة الإدارة' : 'Admin Hub'}</h1>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Management Control</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-50 transition-all font-bold text-sm"
              >
                <ArrowLeft size={16} className={isRTL ? 'rotate-180' : ''} />
                {isRTL ? 'الرجوع للمتجر' : 'Back to Shop'}
              </Link>
            </div>
          </div>

          <div className="flex overflow-x-auto no-scrollbar">
            <NavItem id="dashboard" label={isRTL ? 'الرئيسية' : 'Overview'} icon={BarChart3} />
            <NavItem id="courses" label={isRTL ? 'الدورات' : 'Courses'} icon={BookOpen} />
            <NavItem id="products" label={isRTL ? 'المنتجات' : 'Products'} icon={Package} />
            <NavItem id="orders" label={isRTL ? 'الطلبات' : 'Orders'} icon={ShoppingCart} />
            <NavItem id="users" label={isRTL ? 'المستخدمين' : 'Users'} icon={Users} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-10">
        {/* Statistics Cards */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: isRTL ? 'إجمالي الإيرادات' : 'Total Revenue', value: `$${stats.total_revenue.toFixed(2)}`, icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: isRTL ? 'المستخدمين' : 'Active Users', value: stats.total_users, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: isRTL ? 'الدورات التدريبية' : 'Live Courses', value: stats.total_courses, icon: BookOpen, color: 'text-[#340690]', bg: 'bg-purple-50' },
              { label: isRTL ? 'الطلبات المكتملة' : 'Total Orders', value: stats.total_orders, icon: ShoppingCart, color: 'text-[#f3b942]', bg: 'bg-amber-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 group hover:shadow-xl hover:shadow-[#340690]/5 transition-all duration-500">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl group-hover:scale-110 transition-transform duration-500`}>
                    <stat.icon size={24} />
                  </div>
                  <div className="flex items-center gap-1 text-emerald-500 text-xs font-black bg-emerald-50 px-2 py-1 rounded-full">
                    <TrendingUp size={12} />
                    <span>+12%</span>
                  </div>
                </div>
                <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">{stat.label}</h3>
                <p className="text-3xl font-black text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Content */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-12 min-h-[600px]">
          {activeTab === 'dashboard' && <AdminOverview stats={stats} isRTL={isRTL} />}
          {activeTab === 'courses' && <CoursesManager />}
          {activeTab === 'products' && <ProductsManager />}
          {activeTab === 'orders' && <OrdersManager />}
          {activeTab === 'users' && <UsersManager />}
        </div>
      </div>
    </div>
  );
}

// New Component for Dashboard Overview
function AdminOverview({ stats, isRTL }: { stats: any, isRTL: boolean }) {
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-[#340690] mb-2">{isRTL ? 'مرحباً بك مجدداً، أيها المسؤول' : 'Welcome back, Admin'}</h2>
          <p className="text-gray-500 font-medium">{isRTL ? 'إليك نظرة سريعة على أداء المنصة اليوم.' : "Here's what's happening on your platform today."}</p>
        </div>
        <button className="bg-[#340690] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#5f2cc7] transition-all shadow-xl shadow-[#340690]/20 flex items-center gap-3">
          <BarChart3 size={18} />
          {isRTL ? 'عرض التقارير الكاملة' : 'View Full Reports'}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8 bg-gradient-to-br from-[#340690] to-[#5f2cc7] rounded-[2rem] text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
          <div className="relative z-10">
            <h3 className="text-white/60 font-black uppercase tracking-widest text-xs mb-8">{isRTL ? 'إدارة سريعة' : 'Quick Management'}</h3>
            <div className="space-y-4">
              <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center justify-between transition-all group/btn">
                <span className="font-bold">{isRTL ? 'إضافة دورة تدريبية جديدة' : 'Create New Course'}</span>
                <Plus size={20} className="group-hover/btn:rotate-90 transition-transform" />
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center justify-between transition-all group/btn">
                <span className="font-bold">{isRTL ? 'إضافة منتج جديد' : 'Add New Product'}</span>
                <Plus size={20} className="group-hover/btn:rotate-90 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
          <h3 className="text-gray-400 font-black uppercase tracking-widest text-xs mb-8">{isRTL ? 'تنبيهات النظام' : 'System Alerts'}</h3>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                <AlertCircle size={20} />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900">{isRTL ? 'طلبات بانتظار المراجعة' : 'Orders Pending Review'}</p>
                <p className="text-xs text-gray-500">{isRTL ? 'هناك 5 طلبات جديدة تحتاج إلى تأكيد.' : 'There are 5 new orders that need confirmation.'}</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900">{isRTL ? 'اكتمال النسخ الاحتياطي' : 'Backup Successful'}</p>
                <p className="text-xs text-gray-500">{isRTL ? 'تم نسخ قاعدة البيانات بنجاح.' : 'The database was backed up successfully.'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Courses Manager Component
function CoursesManager() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setCourses(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(isRTL ? 'هل أنت متأكد من حذف هذه الدورة؟' : 'Are you sure you want to delete this course?')) return;

    await supabase.from('courses').delete().eq('id', id);
    loadCourses();
  };

  const togglePublish = async (course: any) => {
    await supabase
      .from('courses')
      .update({ is_published: !course.is_published })
      .eq('id', course.id);
    loadCourses();
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#340690]/10 border-t-[#340690] rounded-full animate-spin" />
        <p className="text-gray-400 font-bold animate-pulse uppercase tracking-widest text-xs">
          {isRTL ? 'جاري تحميل الدورات...' : 'Syncing Courses...'}
        </p>
      </div>
    );
  }

  if (showForm) {
    return (
      <CourseForm
        course={editingCourse}
        isRTL={isRTL}
        onClose={() => {
          setShowForm(false);
          setEditingCourse(null);
          loadCourses();
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-black text-[#340690] mb-2">{isRTL ? 'إدارة الدورات' : 'Course Inventory'}</h2>
          <p className="text-gray-500 font-medium">{isRTL ? 'قم بإنشاء وتعديل ونشر الدورات التدريبية الخاصة بك.' : 'Create, edit, and publish your educational content.'}</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#340690] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#5f2cc7] transition-all shadow-xl shadow-[#340690]/20 flex items-center gap-3 group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          {isRTL ? 'إضافة دورة جديدة' : 'Add New Course'}
        </button>
      </div>

      <div className="grid gap-6">
        {courses.length === 0 ? (
          <div className="py-20 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-bold">{isRTL ? 'لا توجد دورات حالياً' : 'No courses found'}</p>
          </div>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="group bg-white border border-gray-100 p-6 rounded-[2rem] hover:shadow-xl hover:shadow-[#340690]/5 transition-all duration-500 flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="w-full lg:w-48 h-32 bg-gray-100 rounded-2xl overflow-hidden shrink-0 relative">
                {course.thumbnail_url ? (
                  <img src={course.thumbnail_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <BookOpen size={40} />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${course.is_published ? 'bg-emerald-500 text-white' : 'bg-gray-500 text-white'
                    }`}>
                    {course.is_published ? (isRTL ? 'منشور' : 'Published') : (isRTL ? 'مسودة' : 'Draft')}
                  </span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#f3b942] bg-amber-50 px-2 py-0.5 rounded">
                    {course.level}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {course.duration_hours}h {isRTL ? 'مدة' : 'Duration'}
                  </span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-1 truncate">{isRTL ? course.title_ar : course.title_en}</h3>
                <p className="text-gray-500 text-sm line-clamp-1 font-medium italic mb-4">
                  {isRTL ? course.short_description_ar : course.short_description_en}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-black text-[#340690]">
                    {course.is_free ? (isRTL ? 'مجاني' : 'FREE') : `$${course.price}`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => togglePublish(course)}
                  title={course.is_published ? (isRTL ? 'إلغاء النشر' : 'Unpublish') : (isRTL ? 'نشر' : 'Publish')}
                  className={`p-4 rounded-2xl transition-all ${course.is_published
                    ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    }`}
                >
                  <Eye size={20} />
                </button>
                <button
                  onClick={() => {
                    setEditingCourse(course);
                    setShowForm(true);
                  }}
                  title={isRTL ? 'تعديل' : 'Edit'}
                  className="p-4 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-2xl transition-all"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  title={isRTL ? 'حذف' : 'Delete'}
                  className="p-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-2xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Course Form Component
function CourseForm({ course, isRTL, onClose }: { course?: any; isRTL: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    title_en: course?.title_en || '',
    title_ar: course?.title_ar || '',
    description_en: course?.description_en || '',
    description_ar: course?.description_ar || '',
    short_description_en: course?.short_description_en || '',
    short_description_ar: course?.short_description_ar || '',
    price: course?.price || 0,
    is_free: course?.is_free || false,
    duration_hours: course?.duration_hours || 0,
    level: course?.level || 'beginner',
    language: course?.language || 'both',
    is_published: course?.is_published || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (course) {
      await supabase
        .from('courses')
        .update(formData)
        .eq('id', course.id);
    } else {
      await supabase.from('courses').insert([formData]);
    }

    onClose();
  };

  const InputField = ({ label, value, onChange, type = "text", required = false, title }: any) => (
    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 px-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        title={title || label}
        placeholder={label}
        className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#340690]/20 focus:bg-white transition-all font-bold placeholder:text-gray-300"
      />
    </div>
  );

  const TextAreaField = ({ label, value, onChange, rows = 3, title }: any) => (
    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 px-1">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        title={title || label}
        placeholder={label}
        className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#340690]/20 focus:bg-white transition-all font-bold placeholder:text-gray-300"
      />
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-3xl font-black text-[#340690] mb-2">
            {course ? (isRTL ? 'تعديل الدورة' : 'Update Content') : (isRTL ? 'إضافة دورة جديدة' : 'New Knowledge')}
          </h2>
          <p className="text-gray-500 font-medium">{isRTL ? 'املأ البيانات أدناه لنشر المحتوى.' : 'Fill in the intellectual properties below.'}</p>
        </div>
        <button type="button" onClick={onClose} className="p-4 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-2xl transition-all">
          <Plus size={24} className="rotate-45" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid md:grid-cols-2 gap-8">
          <InputField
            label={isRTL ? 'العنوان (English)' : 'Title (English)'}
            value={formData.title_en}
            onChange={(e: any) => setFormData({ ...formData, title_en: e.target.value })}
            required
          />
          <InputField
            label={isRTL ? 'العنوان (العربية)' : 'Title (Arabic)'}
            value={formData.title_ar}
            onChange={(e: any) => setFormData({ ...formData, title_ar: e.target.value })}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <TextAreaField
            label={isRTL ? 'وصف قصير (English)' : 'Short Bio (English)'}
            value={formData.short_description_en}
            onChange={(e: any) => setFormData({ ...formData, short_description_en: e.target.value })}
          />
          <TextAreaField
            label={isRTL ? 'وصف قصير (العربية)' : 'Short Bio (Arabic)'}
            value={formData.short_description_ar}
            onChange={(e: any) => setFormData({ ...formData, short_description_ar: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <InputField
            label={isRTL ? 'المدة (ساعات)' : 'Duration (Hours)'}
            type="number"
            value={formData.duration_hours}
            onChange={(e: any) => setFormData({ ...formData, duration_hours: parseInt(e.target.value) })}
          />
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 px-1">{isRTL ? 'المستوى' : 'Level'}</label>
            <select
              value={formData.level}
              title={isRTL ? 'المستوى' : 'Level'}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="w-full bg-gray-50 border border-gray-100 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#340690]/20 transition-all font-bold appearance-none cursor-pointer"
            >
              <option value="beginner">{isRTL ? 'مبتدئ' : 'Beginner'}</option>
              <option value="intermediate">{isRTL ? 'متوسط' : 'Intermediate'}</option>
              <option value="advanced">{isRTL ? 'متقدم' : 'Advanced'}</option>
            </select>
          </div>
          <InputField
            label={isRTL ? 'السعر ($)' : 'Price ($)'}
            type="number"
            value={formData.price}
            onChange={(e: any) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            disabled={formData.is_free}
          />
        </div>

        <div className="flex flex-wrap gap-8 items-center py-6 border-y border-gray-100">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${formData.is_free ? 'bg-[#340690] border-[#340690]' : 'border-gray-200 group-hover:border-[#340690]'}`}>
              {formData.is_free && <Plus size={16} className="text-white" />}
              <input
                type="checkbox"
                checked={formData.is_free}
                onChange={(e) => setFormData({ ...formData, is_free: e.target.checked, price: e.target.checked ? 0 : formData.price })}
                className="hidden"
              />
            </div>
            <span className="font-black text-xs uppercase tracking-widest text-gray-600">{isRTL ? 'دورة مجانية' : 'Free Resource'}</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${formData.is_published ? 'bg-emerald-500 border-emerald-500' : 'border-gray-200 group-hover:border-emerald-500'}`}>
              {formData.is_published && <Plus size={16} className="text-white" />}
              <input
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                className="hidden"
              />
            </div>
            <span className="font-black text-xs uppercase tracking-widest text-gray-600">{isRTL ? 'نشر المحتوى الآن' : 'Publish Immediately'}</span>
          </label>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            className="flex-1 bg-[#340690] text-white py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-[#5f2cc7] transition-all shadow-xl shadow-[#340690]/20 flex items-center justify-center gap-3 group"
          >
            {course ? (isRTL ? 'تحديث البيانات' : 'Commit Changes') : (isRTL ? 'إنشاء الدورة' : 'Deploy Assets')}
            <ChevronRight size={20} className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-10 py-5 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all"
          >
            {isRTL ? 'إلغاء' : 'Abort'}
          </button>
        </div>
      </form>
    </div>

  );
}

// Products Manager
function ProductsManager() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(isRTL ? 'هل أنت متأكد من حذف هذا المنتج؟' : 'Are you sure you want to delete this product?')) return;
    await supabase.from('products').delete().eq('id', id);
    loadProducts();
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#340690]/10 border-t-[#340690] rounded-full animate-spin" />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
          {isRTL ? 'جاري تحميل المنتجات...' : 'Syncing Products...'}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-black text-[#340690] mb-2">{isRTL ? 'إدارة المنتجات' : 'Product Vault'}</h2>
          <p className="text-gray-500 font-medium">{isRTL ? 'تحكم في مخزون المنتجات المطبوعة والرقمية.' : 'Control your physical and digital assets.'}</p>
        </div>
        <button className="bg-[#340690] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#5f2cc7] transition-all shadow-xl shadow-[#340690]/20 flex items-center gap-3 group">
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          {isRTL ? 'إضافة منتج جديد' : 'Add New Product'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group bg-white border border-gray-100 p-6 rounded-[2rem] hover:shadow-xl hover:shadow-[#340690]/5 transition-all duration-500">
            <div className="h-41 bg-gray-50 rounded-2xl mb-6 relative overflow-hidden group/img">
              {product.image_url ? (
                <img src={product.image_url} alt="" className="w-full h-full object-contain p-4 group-hover/img:scale-110 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-200">
                  <Package size={48} />
                </div>
              )}
              <div className="absolute top-4 right-4">
                <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#340690] shadow-sm">
                  {product.category}
                </span>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-black text-gray-900 mb-1 truncate">{isRTL ? product.name_ar : product.name_en}</h3>
              <p className="text-[#340690] font-black text-xl">${product.price}</p>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mt-2">
                {isRTL ? 'المخزون:' : 'Stock:'} <span className={product.stock_quantity > 0 ? 'text-emerald-500 font-black' : 'text-red-500 font-black'}>{product.stock_quantity}</span>
              </p>
            </div>
            <div className="flex gap-2">
              <button title={isRTL ? 'تعديل' : 'Edit'} className="flex-1 bg-gray-50 text-gray-400 hover:bg-[#340690] hover:text-white p-3 rounded-xl transition-all flex items-center justify-center">
                <Edit size={18} />
              </button>
              <button title={isRTL ? 'حذف' : 'Delete'} onClick={() => handleDelete(product.id)} className="flex-1 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white p-3 rounded-xl transition-all flex items-center justify-center">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Orders Manager
function OrdersManager() {
  const [orders, setOrders] = useState<any[]>([]);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setOrders(data);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'processing': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-amber-50 text-amber-600 border-amber-100';
    }
  };

  return (
    <div>
      <div className="mb-12">
        <h2 className="text-3xl font-black text-[#340690] mb-2">{isRTL ? 'سجل الطلبات' : 'Transaction History'}</h2>
        <p className="text-gray-500 font-medium">{isRTL ? 'تتبع طلبات العملاء وحالات التوصيل والدفع.' : 'Monitor customer orders and fulfillment status.'}</p>
      </div>

      <div className="overflow-x-auto -mx-8 px-8">
        <table className="w-full border-separate border-spacing-y-4">
          <thead>
            <tr>
              <th className={`px-6 text-[10px] font-black uppercase tracking-widest text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'رقم الطلب' : 'Order ID'}</th>
              <th className={`px-6 text-[10px] font-black uppercase tracking-widest text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'التاريخ' : 'Time Stamp'}</th>
              <th className={`px-6 text-[10px] font-black uppercase tracking-widest text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الإجمالي' : 'Total Amount'}</th>
              <th className={`px-6 text-[10px] font-black uppercase tracking-widest text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'طريقة الدفع' : 'Gateway'}</th>
              <th className={`px-6 text-[10px] font-black uppercase tracking-widest text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الحالة' : 'Status'}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="group transition-all">
                <td className="px-6 py-6 bg-gray-50 group-hover:bg-white border-y border-transparent group-hover:border-gray-100 first:border-l first:rounded-l-2xl last:border-r last:rounded-r-2xl font-black text-gray-900 shadow-sm transition-colors">
                  #{order.order_number}
                </td>
                <td className="px-6 py-6 bg-gray-50 group-hover:bg-white border-y border-transparent group-hover:border-gray-100 text-gray-500 font-medium transition-colors">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-6 bg-gray-50 group-hover:bg-white border-y border-transparent group-hover:border-gray-100 font-black text-[#340690] transition-colors">
                  ${order.total}
                </td>
                <td className="px-6 py-6 bg-gray-50 group-hover:bg-white border-y border-transparent group-hover:border-gray-100 transition-colors">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-white px-2 py-1 rounded-lg border border-gray-100">{order.payment_method}</span>
                </td>
                <td className="px-6 py-6 bg-gray-50 group-hover:bg-white border-y border-transparent group-hover:border-gray-100 first:border-l first:rounded-l-2xl last:border-r last:rounded-r-2xl transition-colors">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Users Manager
function UsersManager() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setProfiles(data);
  };

  return (
    <div>
      <div className="mb-12">
        <h2 className="text-3xl font-black text-[#340690] mb-2">{isRTL ? 'إدارة المجتمع' : 'User Ecosystem'}</h2>
        <p className="text-gray-500 font-medium">{isRTL ? 'إدارة بيانات المستخدمين، المعلمين، والمسؤولين.' : 'Manage student profiles, educators, and admin rights.'}</p>
      </div>

      <div className="overflow-x-auto -mx-8 px-8">
        <table className="w-full border-separate border-spacing-y-4">
          <thead>
            <tr>
              <th className={`px-6 text-[10px] font-black uppercase tracking-widest text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'المستخدم' : 'Full Identity'}</th>
              <th className={`px-6 text-[10px] font-black uppercase tracking-widest text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الصلاحية' : 'Access Role'}</th>
              <th className={`px-6 text-[10px] font-black uppercase tracking-widest text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'اللغة' : 'Locale'}</th>
              <th className={`px-6 text-[10px] font-black uppercase tracking-widest text-gray-400 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'تاريخ الانضمام' : 'Member Since'}</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.id} className="group transition-all">
                <td className="px-6 py-6 bg-gray-50 group-hover:bg-white border-y border-transparent group-hover:border-gray-100 first:border-l first:rounded-l-2xl last:border-r last:rounded-r-2xl transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#f3b942] to-[#ffda8f] rounded-xl flex items-center justify-center font-black text-[#340690] shadow-sm transform group-hover:rotate-12 transition-transform">
                      {profile.full_name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-black text-gray-900">{profile.full_name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 bg-gray-50 group-hover:bg-white border-y border-transparent group-hover:border-gray-100 transition-colors">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${profile.role === 'admin' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                      profile.role === 'teacher' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        'bg-white text-gray-400 border-gray-100'
                    }`}>
                    {profile.role}
                  </span>
                </td>
                <td className="px-6 py-6 bg-gray-50 group-hover:bg-white border-y border-transparent group-hover:border-gray-100 font-black text-[10px] text-gray-300 uppercase tracking-widest transition-colors">
                  {profile.preferred_language || 'en'}
                </td>
                <td className="px-6 py-6 bg-gray-50 group-hover:bg-white border-y border-transparent group-hover:border-gray-100 first:border-l first:rounded-l-2xl last:border-r last:rounded-r-2xl text-gray-500 font-medium transition-colors">
                  {new Date(profile.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
