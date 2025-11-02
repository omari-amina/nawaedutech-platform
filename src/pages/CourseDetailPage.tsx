import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Clock, BookOpen, Award, Play, CheckCircle, Lock } from 'lucide-react';

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
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course not found</h1>
          <button
            onClick={() => navigate('/courses')}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Course Header */}
        <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-lg p-8 mb-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              {isRTL ? course.title_ar : course.title_en}
            </h1>
            <p className="text-xl opacity-90 mb-6">
              {isRTL ? course.description_ar : course.description_en}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center">
                <Clock size={20} className="mr-2" />
                <span>{course.duration_hours} hours</span>
              </div>
              <div className="flex items-center">
                <BookOpen size={20} className="mr-2" />
                <span>{lessons.length} lessons</span>
              </div>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {t(`courses.level.${course.level}`)}
              </span>
              {enrollment && enrollment.progress_percentage >= 100 && (
                <div className="flex items-center bg-accent text-black px-3 py-1 rounded-full">
                  <Award size={18} className="mr-1" />
                  <span className="text-sm font-semibold">Completed</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lessons Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Course Content</h2>
              
              {!enrollment && (
                <div className="mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {course.is_free ? 'Free' : `$${course.price}`}
                  </div>
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full bg-accent text-black px-6 py-3 rounded-lg hover:bg-yellow-500 transition font-semibold disabled:opacity-50"
                  >
                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                  </button>
                </div>
              )}

              {enrollment && (
                <div className="mb-6">
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span className="font-semibold">{enrollment.progress_percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${enrollment.progress_percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {completedLessons.size} of {lessons.length} lessons completed
                  </p>
                </div>
              )}

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
                      className={`w-full text-left p-3 rounded-lg transition ${
                        isSelected
                          ? 'bg-primary text-white'
                          : canAccess
                          ? 'bg-gray-50 hover:bg-gray-100'
                          : 'bg-gray-50 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            {isCompleted ? (
                              <CheckCircle size={16} className="mr-2 text-green-500" />
                            ) : canAccess ? (
                              <Play size={16} className="mr-2" />
                            ) : (
                              <Lock size={16} className="mr-2" />
                            )}
                            <span className="font-semibold text-sm">
                              Lesson {index + 1}
                            </span>
                            {lesson.is_preview && (
                              <span className="ml-2 text-xs bg-accent text-black px-2 py-0.5 rounded">
                                Preview
                              </span>
                            )}
                          </div>
                          <p className="text-sm">
                            {isRTL ? lesson.title_ar : lesson.title_en}
                          </p>
                          <p className="text-xs opacity-75 mt-1">
                            {lesson.duration_minutes} min
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Video Player & Content */}
          <div className="lg:col-span-2">
            {selectedLesson ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Video Player */}
                <div className="bg-black aspect-video flex items-center justify-center">
                  {selectedLesson.video_url ? (
                    <video
                      controls
                      className="w-full h-full"
                      src={selectedLesson.video_url}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="text-white text-center p-8">
                      <Play size={64} className="mx-auto mb-4 opacity-50" />
                      <p>Video content coming soon</p>
                    </div>
                  )}
                </div>

                {/* Lesson Info */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">
                    {isRTL ? selectedLesson.title_ar : selectedLesson.title_en}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {isRTL ? selectedLesson.description_ar : selectedLesson.description_en}
                  </p>

                  {enrollment && !completedLessons.has(selectedLesson.id) && (
                    <button
                      onClick={() => markLessonComplete(selectedLesson.id)}
                      className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition font-semibold"
                    >
                      Mark as Complete
                    </button>
                  )}

                  {completedLessons.has(selectedLesson.id) && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle size={24} className="mr-2" />
                      <span className="font-semibold">Lesson Completed</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <BookOpen size={64} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Select a lesson to start learning</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
