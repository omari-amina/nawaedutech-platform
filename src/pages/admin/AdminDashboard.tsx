import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Eye
} from 'lucide-react';

export function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('courses');
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    if (profile) {
      setUserRole(profile.role);
      if (profile.role !== 'admin') {
        alert('Access denied. Admin privileges required.');
        navigate('/dashboard');
      }
    }
    setLoading(false);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user || userRole !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your platform content and users</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex items-center px-6 py-4 font-medium transition ${
                activeTab === 'courses'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <BookOpen size={20} className="mr-2" />
              Courses
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center px-6 py-4 font-medium transition ${
                activeTab === 'products'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <Package size={20} className="mr-2" />
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center px-6 py-4 font-medium transition ${
                activeTab === 'orders'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <ShoppingCart size={20} className="mr-2" />
              Orders
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center px-6 py-4 font-medium transition ${
                activeTab === 'users'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <Users size={20} className="mr-2" />
              Users
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'courses' && <CoursesManager />}
          {activeTab === 'products' && <ProductsManager />}
          {activeTab === 'orders' && <OrdersManager />}
          {activeTab === 'users' && <UsersManager />}
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
    if (!confirm('Are you sure you want to delete this course?')) return;
    
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
    return <div className="text-center py-8">Loading courses...</div>;
  }

  if (showForm) {
    return (
      <CourseForm
        course={editingCourse}
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Courses</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Course
        </button>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="border rounded-lg p-4 hover:border-primary transition">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1">{course.title_en}</h3>
                <p className="text-gray-600 text-sm mb-2">{course.title_ar}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className={`px-2 py-1 rounded ${
                    course.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {course.is_published ? 'Published' : 'Draft'}
                  </span>
                  <span className="text-gray-600">
                    {course.is_free ? 'Free' : `$${course.price}`}
                  </span>
                  <span className="text-gray-600">{course.duration_hours}h</span>
                  <span className="text-gray-600">{course.level}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => togglePublish(course)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  title={course.is_published ? 'Unpublish' : 'Publish'}
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => {
                    setEditingCourse(course);
                    setShowForm(true);
                  }}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Course Form Component
function CourseForm({ course, onClose }: { course?: any; onClose: () => void }) {
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
      // Update existing course
      await supabase
        .from('courses')
        .update(formData)
        .eq('id', course.id);
    } else {
      // Create new course
      await supabase.from('courses').insert([formData]);
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{course ? 'Edit Course' : 'Add New Course'}</h2>
        <button type="button" onClick={onClose} className="text-gray-600 hover:text-gray-900">
          Cancel
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title (English)</label>
          <input
            type="text"
            value={formData.title_en}
            onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Title (Arabic)</label>
          <input
            type="text"
            value={formData.title_ar}
            onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Short Description (English)</label>
          <textarea
            value={formData.short_description_en}
            onChange={(e) => setFormData({ ...formData, short_description_en: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Short Description (Arabic)</label>
          <textarea
            value={formData.short_description_ar}
            onChange={(e) => setFormData({ ...formData, short_description_ar: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Duration (hours)</label>
          <input
            type="number"
            value={formData.duration_hours}
            onChange={(e) => setFormData({ ...formData, duration_hours: parseInt(e.target.value) })}
            min="0"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Level</label>
          <select
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price ($)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            min="0"
            step="0.01"
            disabled={formData.is_free}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
          />
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.is_free}
            onChange={(e) => setFormData({ ...formData, is_free: e.target.checked, price: e.target.checked ? 0 : formData.price })}
            className="mr-2"
          />
          Free Course
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.is_published}
            onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
            className="mr-2"
          />
          Published
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition"
        >
          {course ? 'Update Course' : 'Create Course'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// Products Manager (Simplified - Similar structure)
function ProductsManager() {
  return <div className="text-center py-8 text-gray-600">Products management interface similar to courses</div>;
}

// Orders Manager
function OrdersManager() {
  const [orders, setOrders] = useState<any[]>([]);

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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Order #</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Payment</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{order.order_number}</td>
                <td className="px-4 py-3">{new Date(order.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3">${order.total}</td>
                <td className="px-4 py-3">{order.payment_method}</td>
                <td className="px-4 py-3">
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
    </div>
  );
}

// Users Manager
function UsersManager() {
  const [profiles, setProfiles] = useState<any[]>([]);

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
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Language</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{profile.full_name}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-sm ${
                    profile.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                    profile.role === 'teacher' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {profile.role}
                  </span>
                </td>
                <td className="px-4 py-3">{profile.preferred_language || 'en'}</td>
                <td className="px-4 py-3">{new Date(profile.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
