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
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden border-b border-gray-50 mb-16">
        <div className="absolute inset-0 z-0 opacity-5">
          <img
            src="/hero-nawa-brand.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto relative z-10 py-10">
          <h1 className="text-4xl sm:text-6xl font-black text-[#340690] mb-6 leading-tight">
            {t('courses.title')}
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
            {t('courses.subtitle')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-24">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
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
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#340690] border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
              >
                {/* Course Image/Header */}
                <div className="h-56 bg-gradient-to-br from-[#340690] via-[#5f2cc7] to-[#864bf5] relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#f3b942]/20 rounded-full blur-3xl group-hover:blur-2xl transition-all"></div>

                  {/* Book Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-24 h-24 text-white/20 group-hover:text-white/30 group-hover:scale-110 transition-all duration-500" strokeWidth={1} />
                  </div>

                  {/* Level Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <span className="text-xs font-black text-[#340690] bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                      {t(`courses.level.${course.level}`)}
                    </span>
                    {course.is_free && (
                      <span className="text-xs font-black text-white bg-green-500 px-4 py-2 rounded-full uppercase tracking-wide shadow-lg">
                        {t('common.free')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-extrabold mb-4 text-gray-900 group-hover:text-[#340690] transition-colors leading-tight">
                    {isRTL ? course.title_ar : course.title_en}
                  </h3>
                  <p className="text-gray-600 mb-8 line-clamp-3 text-base leading-relaxed flex-1">
                    {isRTL ? course.short_description_ar : course.short_description_en}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between gap-4">
                    <div className="flex items-center text-gray-500 text-sm font-medium">
                      <Clock size={18} className="me-2 text-[#5f2cc7]" />
                      <span>{course.duration_hours} {t('courses.duration')}</span>
                    </div>
                    <div className="text-2xl font-black text-[#340690]">
                      {course.is_free ? (
                        <span className="text-lg text-green-600">{t('common.free')}</span>
                      ) : (
                        <span>${course.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && courses.length === 0 && (
          <div className="text-center py-24 bg-muted/20 rounded-[3rem] border-2 border-dashed border-gray-100 max-w-lg mx-auto">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Filter size={32} className="text-gray-300" />
            </div>
            <p className="text-gray-500 text-xl font-bold mb-6">{t('common.noResults')}</p>
            <button
              onClick={() => setFilter('all')}
              className="bg-[#340690] text-white px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-[#340690]/20"
            >
              {t('courses.clearFilters')}
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
      className={`px-8 py-3.5 rounded-2xl font-black text-lg transition-all duration-500 transform ${active
          ? 'bg-[#340690] text-white shadow-2xl shadow-[#340690]/30 -translate-y-1'
          : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-[#340690] border border-gray-100 hover:border-[#340690]/20'
        }`}
    >
      {children}
    </button>
  )
}

