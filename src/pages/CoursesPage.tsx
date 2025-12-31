import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Clock, BookOpen, Filter } from 'lucide-react';

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
    <div className="min-h-screen py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 px-4">
          <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2 block">{t('nav.courses')}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {t('courses.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('courses.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
            {t('courses.filter.all')}
          </FilterButton>
          <FilterButton active={filter === 'free'} onClick={() => setFilter('free')}>
            {t('courses.filter.free')}
          </FilterButton>
          <FilterButton active={filter === 'paid'} onClick={() => setFilter('paid')}>
            {t('courses.filter.paid')}
          </FilterButton>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 block h-full flex flex-col"
              >
                <div className="h-48 bg-gradient-to-br from-primary via-secondary to-primary-light relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="text-xs font-bold text-primary bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wide">
                      {t(`courses.level.${course.level}`)}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3">
                    {course.is_free && (
                      <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-md">
                        {t('common.free')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                    {isRTL ? course.title_ar : course.title_en}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed flex-1">
                    {isRTL ? course.short_description_ar : course.short_description_en}
                  </p>

                  <div className="mt-auto border-t border-gray-100 pt-4 flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock size={16} className="me-1.5" />
                      <span>{course.duration_hours} {t('courses.duration')}</span>
                    </div>
                    <div className="text-xl font-bold text-primary">
                      {course.is_free ? t('common.free') : `$${course.price}`}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && courses.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <Filter size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">{t('common.noResults')}</p>
            <button onClick={() => setFilter('all')} className="mt-4 text-primary font-medium hover:underline">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterButton({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${active
          ? 'bg-primary text-white shadow-lg shadow-primary/25'
          : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-primary border border-transparent hover:border-gray-200'
        }`}
    >
      {children}
    </button>
  )
}
