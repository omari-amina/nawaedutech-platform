import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Clock, BookOpen, Award, Play, CheckCircle, Lock, ArrowLeft, Share2, Star } from 'lucide-react';

interface Course {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  price: number;
  is_free: boolean;
  duration_hours: number;
  level: string;
}

interface Lesson {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  video_url: string;
  duration_minutes: number;
  order_index: number;
  is_preview: boolean;
}

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [enrollment, setEnrollment] = useState<any>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    if (id) {
      loadCourseData();
    }
  }, [id, user]);

  const loadCourseData = async () => {
    if (!id) return;

    // Load course
    const { data: courseData } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (courseData) {
      setCourse(courseData);
    }

    // Load lessons
    const { data: lessonsData } = await supabase
      .from('lessons')
      .select('*')
      .eq('course_id', id)
      .order('order_index', { ascending: true });

    if (lessonsData) {
      setLessons(lessonsData);
      if (lessonsData.length > 0) {
        // Select first preview or first lesson
        const firstPreview = lessonsData.find(l => l.is_preview);
        setSelectedLesson(firstPreview || lessonsData[0]);
      }
    }

    // Check enrollment if user is logged in
    if (user) {
      const { data: enrollmentData } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', id)
        .maybeSingle();

      if (enrollmentData) {
        setEnrollment(enrollmentData);

        // Load completed lessons
        const { data: progressData } = await supabase
          .from('lesson_progress')
          .select('lesson_id')
          .eq('user_id', user.id)
          .eq('course_id', id)
          .eq('completed', true);

        if (progressData) {
          setCompletedLessons(new Set(progressData.map(p => p.lesson_id)));
        }
      }
    }

    setLoading(false);
  };

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!id) return;

    setEnrolling(true);
    try {
      const { data, error } = await supabase.functions.invoke('enroll-course', {
        body: { courseId: id },
      });

      if (error) throw error;

      if (data?.data?.enrollment) {
        setEnrollment(data.data.enrollment);
        alert('Successfully enrolled in course!');
        loadCourseData();
      }
    } catch (err: any) {
      alert('Enrollment failed: ' + err.message);
    } finally {
      setEnrolling(false);
    }
  };

  const markLessonComplete = async (lessonId: string) => {
    if (!user || !id) return;

    try {
      await supabase.functions.invoke('update-progress', {
        body: {
          lessonId,
          courseId: id,
          completed: true,
        },
      });

      setCompletedLessons(new Set([...completedLessons, lessonId]));
      loadCourseData();
    } catch (err: any) {
      console.error('Failed to mark lesson complete:', err);
    }
  };

  const canAccessLesson = (lesson: Lesson) => {
    return enrollment || lesson.is_preview;
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center bg-muted/30">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-sm max-w-lg mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Course not found</h1>
            <button
              onClick={() => navigate('/courses')}
              className="bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary-light transition shadow-lg shadow-primary/20"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50/50 font-sans">
      <div className="container mx-auto px-4">

        <Link to="/courses" className="inline-flex items-center text-[#340690]/60 hover:text-[#340690] mb-8 transition-all font-black uppercase tracking-widest text-xs group">
          <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'} group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform`} />
          {t('nav.courses')}
        </Link>

        {/* Course Header - Premium Dark Gradient */}
        <div className="bg-gradient-to-br from-[#340690] via-[#4a1c9e] to-[#5f2cc7] text-white rounded-[3rem] p-8 md:p-16 mb-12 shadow-2xl relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-[#f3b942]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-xs font-black uppercase tracking-widest text-[#f3b942]">
                  {t(`courses.level.${course.level}`)}
                </span>
                {enrollment && enrollment.progress_percentage >= 100 && (
                  <div className="flex items-center bg-green-500/20 border border-green-500/30 text-green-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                    <Award size={14} className="me-2" />
                    <span>Completed</span>
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                {isRTL ? course.title_ar : course.title_en}
              </h1>

              <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-2xl font-medium">
                {isRTL ? course.description_ar : course.description_en}
              </p>

              <div className="flex flex-wrap gap-8 items-center pt-8 border-t border-white/10">
                <div className="flex items-center group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center me-4 group-hover:bg-[#f3b942]/20 transition-colors">
                    <Clock size={20} className="text-[#f3b942]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-0.5">Duration</p>
                    <p className="font-bold">{course.duration_hours} {t('courses.duration')}</p>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center me-4 group-hover:bg-[#f3b942]/20 transition-colors">
                    <BookOpen size={20} className="text-[#f3b942]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-0.5">Content</p>
                    <p className="font-bold">{lessons.length} {isRTL ? 'دروس' : 'lessons'}</p>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center me-4 group-hover:bg-[#f3b942]/20 transition-colors">
                    <Star size={20} className="text-[#f3b942]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-0.5">Rating</p>
                    <p className="font-bold">4.8 (120)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price/Action Card */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-10 text-center shadow-2xl">
                {!enrollment ? (
                  <>
                    <p className="text-xs text-white/60 uppercase tracking-widest font-black mb-4">Course Access</p>
                    <div className="flex flex-col items-center mb-10">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-white">
                          {course.is_free ? t('common.free') : course.price}
                        </span>
                        {!course.is_free && (
                          <span className="text-xl font-bold text-white/70">
                            {isRTL ? 'د.ج' : 'DZD'}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={handleEnroll}
                      disabled={enrolling}
                      className="w-full bg-[#f3b942] text-[#340690] text-lg font-black px-8 py-5 rounded-[1.5rem] hover:bg-white hover:scale-105 transition-all shadow-xl shadow-black/20 mb-6 group/enroll"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {enrolling ? (
                          <div className="w-6 h-6 border-4 border-[#340690]/20 border-t-[#340690] rounded-full animate-spin"></div>
                        ) : (
                          <>
                            {t('common.enroll')}
                            <Play size={18} className="fill-current group-hover:scale-110 transition-transform" />
                          </>
                        )}
                      </span>
                    </button>
                    <p className="text-xs text-white/40 font-medium">Lifetime access & Certificate included</p>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 text-white shadow-2xl shadow-green-500/20">
                      <CheckCircle size={48} />
                    </div>
                    <h3 className="text-2xl font-black mb-2 text-white">Enrolled</h3>
                    <p className="text-white/60 font-medium">Happy learning!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Lessons Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-8 border-b border-gray-50 bg-gray-50/50">
                <h2 className="text-xl font-black text-[#340690] uppercase tracking-widest">Course Menu</h2>

                {enrollment && (
                  <div className="mt-8">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[#340690] mb-3">
                      <span>Course Progress</span>
                      <span>{enrollment.progress_percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#340690] to-[#5f2cc7] h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${enrollment.progress_percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="max-h-[600px] overflow-y-auto custom-scrollbar p-4">
                <div className="space-y-2">
                  {lessons.map((lesson, index) => {
                    const isCompleted = completedLessons.has(lesson.id);
                    const canAccess = canAccessLesson(lesson);
                    const isSelected = selectedLesson?.id === lesson.id;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => canAccess && setSelectedLesson(lesson)}
                        disabled={!canAccess}
                        className={`w-full text-left p-5 rounded-[1.5rem] transition-all relative group/lesson ${isSelected
                          ? 'bg-[#340690] text-white shadow-xl shadow-[#340690]/20'
                          : canAccess
                            ? 'hover:bg-gray-50'
                            : 'opacity-40 grayscale cursor-not-allowed'
                          }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center ${isSelected ? 'bg-white/20' : 'bg-gray-100 group-hover/lesson:bg-[#340690]/10 transition-colors'}`}>
                            {isCompleted ? (
                              <CheckCircle size={14} className={isSelected ? 'text-white' : 'text-green-500'} />
                            ) : canAccess ? (
                              <Play size={14} className={isSelected ? 'text-[#f3b942] fill-[#f3b942]' : 'text-gray-400'} />
                            ) : (
                              <Lock size={14} className="text-gray-400" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-black leading-snug mb-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                              {isRTL ? lesson.title_ar : lesson.title_en}
                            </p>
                            <div className="flex items-center gap-3">
                              <span className={`text-[10px] font-bold ${isSelected ? 'text-white/60' : 'text-gray-400'}`}>
                                {lesson.duration_minutes} min
                              </span>
                              {lesson.is_preview && !enrollment && (
                                <span className="text-[10px] font-black bg-[#f3b942] text-[#340690] px-2 py-0.5 rounded uppercase tracking-widest">
                                  Free
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Video Player & Lesson Details */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {selectedLesson ? (
              <div className="space-y-12">
                {/* Video Container */}
                <div className="bg-black rounded-[3rem] shadow-2xl overflow-hidden border-[12px] border-white ring-1 ring-gray-100 relative group/player">
                  <div className="aspect-video relative overflow-hidden bg-gray-900">
                    {selectedLesson.video_url ? (
                      <video
                        controls
                        className="w-full h-full object-cover"
                        src={selectedLesson.video_url}
                        controlsList="nodownload"
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 backdrop-blur-xl ring-1 ring-white/10 group-hover/player:scale-110 transition-transform duration-700">
                          <Play size={40} className="text-[#f3b942] fill-[#f3b942] ml-1" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-4">Content Protected</h3>
                        <p className="text-white/40 max-w-sm font-medium">This video content is being prepared and will be available very soon.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Lesson Details */}
                <div className="bg-white rounded-[3.5rem] shadow-xl border border-gray-100 p-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#340690]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#f3b942] bg-[#f3b942]/10 px-3 py-1.5 rounded-full">
                            Module {selectedLesson.order_index + 1}
                          </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-[#340690]">
                          {isRTL ? selectedLesson.title_ar : selectedLesson.title_en}
                        </h2>
                      </div>

                      <button className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#340690] hover:bg-[#340690]/10 transition-all group/share">
                        <Share2 size={24} className="group-hover:scale-110 transition-transform" />
                      </button>
                    </div>

                    <div className="prose max-w-none mb-12">
                      <p className="text-xl text-gray-600 leading-relaxed font-arabic">
                        {isRTL ? selectedLesson.description_ar : selectedLesson.description_en}
                      </p>
                    </div>

                    {enrollment && (
                      <div className="pt-10 border-t border-gray-50 flex flex-wrap items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${completedLessons.has(selectedLesson.id) ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                          <span className="text-sm font-black text-gray-400 uppercase tracking-widest">
                            {completedLessons.has(selectedLesson.id) ? 'Lesson Completed' : 'Status: In Progress'}
                          </span>
                        </div>

                        {!completedLessons.has(selectedLesson.id) ? (
                          <button
                            onClick={() => markLessonComplete(selectedLesson.id)}
                            className="flex items-center gap-3 bg-[#340690] text-white px-10 py-5 rounded-[1.5rem] hover:bg-[#5f2cc7] transition-all shadow-xl shadow-[#340690]/20 font-black text-lg group/complete"
                          >
                            <CheckCircle size={22} className="group-hover:scale-110 transition-transform" />
                            {isRTL ? 'إكمال الدرس' : 'Mark as Complete'}
                          </button>
                        ) : (
                          <div className="flex items-center gap-3 bg-green-50 text-green-600 px-8 py-5 rounded-[1.5rem] font-black text-lg border-2 border-green-100">
                            <CheckCircle size={22} />
                            <span>{isRTL ? 'تم الإكمال' : 'Completed'}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[3.5rem] shadow-xl p-24 text-center border border-gray-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-50"></div>
                <div className="relative z-10">
                  <div className="w-32 h-32 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-sm ring-1 ring-gray-100">
                    <BookOpen size={48} className="text-gray-300" />
                  </div>
                  <h3 className="text-3xl font-black text-[#340690] mb-4">Start Your Learning Journey</h3>
                  <p className="text-xl text-gray-400 max-w-sm mx-auto font-medium">Select a lesson from the menu on the left to begin watching the content.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
