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
    <div className="min-h-screen py-12 bg-muted/30">
      <div className="container mx-auto px-4">

        <Link to="/courses" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors group">
          <ArrowLeft className={`w-4 h-4 mt-0.5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'} group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform`} />
          {t('nav.courses')}
        </Link>

        {/* Course Header */}
        <div className="bg-gradient-to-br from-primary via-[#4a1c9e] to-secondary text-white rounded-3xl p-8 md:p-12 mb-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

          <div className="relative z-10 grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium mb-4">
                {t(`courses.level.${course.level}`)}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                {isRTL ? course.title_ar : course.title_en}
              </h1>
              <p className="text-lg text-blue-100/90 mb-8 leading-relaxed max-w-2xl">
                {isRTL ? course.description_ar : course.description_en}
              </p>

              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center">
                  <Clock size={20} className="me-2 text-accent" />
                  <span className="font-medium">{course.duration_hours} {t('courses.duration')}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen size={20} className="me-2 text-accent" />
                  <span className="font-medium">{lessons.length} lessons</span>
                </div>
                <div className="flex items-center">
                  <Star size={20} className="me-2 text-accent" />
                  <span className="font-medium">4.8 (120 reviews)</span>
                </div>

                {enrollment && enrollment.progress_percentage >= 100 && (
                  <div className="flex items-center bg-green-500/20 border border-green-500/30 text-green-100 px-3 py-1 rounded-full">
                    <Award size={18} className="me-1.5" />
                    <span className="text-sm font-semibold">Completed</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price Card (Desktop) */}
            <div className="hidden md:block bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
              {!enrollment ? (
                <>
                  <p className="text-sm text-blue-200 uppercase tracking-wider font-semibold mb-2">Price</p>
                  <div className="text-4xl font-bold text-white mb-6">
                    {course.is_free ? t('common.free') : `$${course.price}`}
                  </div>
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full bg-accent text-primary text-lg font-bold px-6 py-3 rounded-xl hover:bg-white transition-all shadow-lg shadow-black/20 mb-3"
                  >
                    {enrolling ? 'Enrolling...' : t('common.enroll')}
                  </button>
                  <p className="text-xs text-blue-200">30-day money-back guarantee</p>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Enrolled</h3>
                  <p className="text-sm text-blue-100">You have access to this course.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lessons Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                <h2 className="text-xl font-bold">Course Content</h2>

                {/* Mobile Price/Enroll (only visible on mobile) */}
                {!enrollment && (
                  <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-gray-500">Price</span>
                      <span className="text-2xl font-bold text-primary">{course.is_free ? t('common.free') : `$${course.price}`}</span>
                    </div>
                    <button
                      onClick={handleEnroll}
                      disabled={enrolling}
                      className="w-full bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-light transition shadow-lg shadow-primary/20"
                    >
                      {enrolling ? 'Enrolling...' : t('common.enroll')}
                    </button>
                  </div>
                )}

                {enrollment && (
                  <div className="mt-4">
                    <div className="mb-2">
                      <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                        <span>Progress</span>
                        <span>{enrollment.progress_percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-accent h-2 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${enrollment.progress_percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                {lessons.map((lesson, index) => {
                  const isCompleted = completedLessons.has(lesson.id);
                  const canAccess = canAccessLesson(lesson);
                  const isSelected = selectedLesson?.id === lesson.id;

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => canAccess && setSelectedLesson(lesson)}
                      disabled={!canAccess}
                      className={`w-full text-left p-4 transition-all border-b border-gray-50 last:border-0 hover:bg-gray-50 ${isSelected
                          ? 'bg-primary/5 border-l-4 border-l-primary'
                          : canAccess
                            ? 'border-l-4 border-l-transparent'
                            : 'bg-gray-50/50 opacity-60 cursor-not-allowed border-l-4 border-l-transparent'
                        }`}
                    >
                      <div className="flex items-start">
                        <div className="mt-1 flex-shrink-0 me-3">
                          {isCompleted ? (
                            <CheckCircle size={18} className="text-green-500" />
                          ) : canAccess ? (
                            isSelected ? <Play size={18} className="text-primary fill-primary" /> : <Play size={18} className="text-gray-400" />
                          ) : (
                            <Lock size={18} className="text-gray-300" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${isSelected ? 'text-primary' : 'text-gray-700'}`}>
                            {index + 1}. {isRTL ? lesson.title_ar : lesson.title_en}
                          </p>
                          <div className="flex items-center mt-1 space-x-2 rtl:space-x-reverse">
                            <span className="text-xs text-gray-500">{lesson.duration_minutes} min</span>
                            {lesson.is_preview && (
                              <span className="text-[10px] font-bold bg-accent/20 text-accent-dark px-1.5 py-0.5 rounded leading-none">
                                FREE
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

          {/* Video Player & Content */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {selectedLesson ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Video Player */}
                <div className="bg-black aspect-video flex items-center justify-center relative">
                  {selectedLesson.video_url ? (
                    <video
                      controls
                      className="w-full h-full"
                      src={selectedLesson.video_url}
                      controlsList="nodownload"
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="text-white text-center p-8">
                      <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                        <Play size={40} className="ml-1 opacity-80" />
                      </div>
                      <p className="text-lg font-medium opacity-80">Video content coming soon</p>
                    </div>
                  )}
                </div>

                {/* Lesson Info */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2 text-gray-900">
                        {isRTL ? selectedLesson.title_ar : selectedLesson.title_en}
                      </h2>
                      <p className="text-gray-500">Lesson {selectedLesson.order_index + 1} of {lessons.length}</p>
                    </div>
                    <button className="text-gray-400 hover:text-primary transition p-2 rounded-full hover:bg-gray-50">
                      <Share2 size={20} />
                    </button>
                  </div>

                  <div className="prose max-w-none text-gray-600 mb-8 leading-relaxed">
                    <p>{isRTL ? selectedLesson.description_ar : selectedLesson.description_en}</p>
                  </div>

                  {enrollment && !completedLessons.has(selectedLesson.id) && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => markLessonComplete(selectedLesson.id)}
                        className="flex items-center bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-light transition shadow-lg shadow-primary/20 font-medium"
                      >
                        <CheckCircle size={18} className="me-2" />
                        Mark as Complete
                      </button>
                    </div>
                  )}

                  {completedLessons.has(selectedLesson.id) && (
                    <div className="flex justify-end">
                      <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                        <CheckCircle size={20} className="me-2" />
                        <span className="font-bold">Completed</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-16 text-center border border-gray-100">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen size={40} className="text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Start Learning</h3>
                <p className="text-gray-500">Select a lesson from the sidebar to begin watching.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
