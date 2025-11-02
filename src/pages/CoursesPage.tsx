import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Clock, BookOpen } from 'lucide-react';

interface Course {
  id: string;
  title_en: string;
  title_ar: string;
  short_description_en: string;
  short_description_ar: string;
  price: number;
  is_free: boolean;
  duration_hours: number;
  level: string;
  is_published: boolean;
}

export function CoursesPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [courses, setCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, [filter]);

  const loadCourses = async () => {
    setLoading(true);
    let query = supabase
      .from('courses')
      .select('*')
      .eq('is_published', true);

    if (filter === 'free') {
      query = query.eq('is_free', true);
    } else if (filter === 'paid') {
      query = query.eq('is_free', false);
    }

    const { data } = await query;
    if (data) setCourses(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('courses.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('courses.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('courses.filter.all')}
          </button>
          <button
            onClick={() => setFilter('free')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              filter === 'free'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('courses.filter.free')}
          </button>
          <button
            onClick={() => setFilter('paid')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              filter === 'paid'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('courses.filter.paid')}
          </button>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-primary via-secondary to-primary-light"></div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-semibold text-white bg-secondary px-2 py-1 rounded">
                      {t(`courses.level.${course.level}`)}
                    </span>
                    {course.is_free && (
                      <span className="text-xs font-semibold text-white bg-green-500 px-2 py-1 rounded">
                        {t('common.free')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    {isRTL ? course.title_ar : course.title_en}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {isRTL ? course.short_description_ar : course.short_description_en}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock size={16} className="mr-1" />
                      <span>{course.duration_hours} {t('courses.duration')}</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {course.is_free ? t('common.free') : `$${course.price}`}
                    </div>
                  </div>
                  <div className="flex items-center justify-center bg-accent text-black py-2 rounded-lg font-semibold hover:bg-yellow-500 transition">
                    <BookOpen size={20} className="mr-2" />
                    {t('common.enroll')}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && courses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No courses found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
