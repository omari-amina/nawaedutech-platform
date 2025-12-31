import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import {
  BookOpen,
  ShoppingBag,
  Star,
  ArrowRight,
  Brain,
  Sparkles,
  GraduationCap,
  Heart,
  CheckCircle2,
  XCircle,
  Layers
} from 'lucide-react';

interface Course {
  id: string;
  title_en: string;
  title_ar: string;
  short_description_en: string;
  short_description_ar: string;
  price: number;
  is_free: boolean;
  featured: boolean;
}

interface Product {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  price: number;
  featured: boolean;
}

interface Testimonial {
  id: string;
  name_en: string;
  name_ar: string;
  role_en: string;
  role_ar: string;
  content_en: string;
  content_ar: string;
  rating: number;
}

export function HomePage() {
  const { t, i18n } = useTranslation();
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    loadFeaturedContent();
  }, []);

  const loadFeaturedContent = async () => {
    const { data: courses } = await supabase
      .from('courses')
      .select('*')
      .eq('featured', true)
      .eq('is_published', true)
      .limit(3);
    if (courses) setFeaturedCourses(courses);

    const { data: products } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .eq('is_active', true)
      .limit(3);
    if (products) setFeaturedProducts(products);

    const { data: testimonialData } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_featured', true)
      .limit(3);
    if (testimonialData) setTestimonials(testimonialData);
  };

  return (
    <div className="min-h-screen bg-background">

      {/* 1. HERO SECTION: Inspiring & Warm */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-[#4a1c9e] to-secondary text-white pt-24 pb-32">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-secondary opacity-20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            {/* Text Content */}
            <div className="lg:w-1/2 text-center lg:text-start">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-1 text-sm font-medium text-accent mb-6 border border-white/20">
                <Sparkles size={16} className="mr-2 rtl:ml-2 rtl:mr-0" />
                <span>{t('footer.aboutText')}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight drop-shadow-sm">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/shop"
                  className="bg-accent text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 transition-all flex items-center justify-center"
                >
                  <ShoppingBag className="mr-2 rtl:ml-2 rtl:mr-0" size={22} />
                  {t('hero.ctaShop')}
                </Link>
                <Link
                  to="/courses"
                  className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  <BookOpen className="mr-2 rtl:ml-2 rtl:mr-0" size={22} />
                  {t('hero.ctaCourses')}
                </Link>
              </div>
            </div>

            {/* Illustration / Visual */}
            <div className="lg:w-1/2 relative">
              {/* Abstract placeholder for "Growth/Nucleus" illustration */}
              <div className="relative w-full max-w-md mx-auto aspect-square bg-white/5 rounded-full border border-white/10 backdrop-blur-md p-10 flex flex-col justify-center items-center text-center animate-accordion-down shadow-2xl">
                <img
                  src="/logo-icon.png"
                  alt="Nawa Icon"
                  className="w-32 h-32 object-contain mb-6 drop-shadow-2xl"
                />
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-3 text-sm">✨ {t('hero.chaosTitle')}</div>
                  <div className="bg-accent/20 text-accent font-bold rounded-lg p-3 text-lg">🚀 {t('hero.orderTitle')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CHAOS TO ORDER: Visual Storytelling */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t('hero.orderTitle')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('hero.orderSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Chaos State */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 opacity-70 grayscale-[0.5] hover:grayscale-0 transition-all">
              <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                <XCircle size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t('hero.chaosTitle')}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{t('hero.chaosSubtitle')}</p>
            </div>

            {/* Transition Arrow */}
            <div className="hidden md:flex justify-center text-primary/30">
              <ArrowRight size={48} className={isRTL ? "rotate-180" : ""} />
            </div>

            {/* Order/Nawa State */}
            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-primary/5 border-t-4 border-primary scale-105 transform">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 mx-auto md:mx-0">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">NawaEduTech Solution</h3>
              <p className="text-gray-600 text-sm leading-relaxed">System, Clarity, Mastery.</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li className="flex items-center"><CheckCircle2 size={14} className="text-green-500 mr-2 rtl:ml-2 rtl:mr-0" /> Organized Life</li>
                <li className="flex items-center"><CheckCircle2 size={14} className="text-green-500 mr-2 rtl:ml-2 rtl:mr-0" /> Digital Skills</li>
                <li className="flex items-center"><CheckCircle2 size={14} className="text-green-500 mr-2 rtl:ml-2 rtl:mr-0" /> Peace of Mind</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PERSONAS: "We Understand You" */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-16">{t('personas.title')}</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Teacher */}
            <div className="group relative bg-gray-50 rounded-3xl p-8 hover:bg-primary hover:text-white transition-colors duration-300">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6 group-hover:bg-white/10 group-hover:text-white">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t('personas.teacher.title')}</h3>
              <p className="text-gray-500 group-hover:text-blue-100 leading-relaxed">
                {t('personas.teacher.desc')}
              </p>
            </div>

            {/* Student */}
            <div className="group relative bg-gray-50 rounded-3xl p-8 hover:bg-secondary hover:text-white transition-colors duration-300">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-sm mb-6 group-hover:bg-white/10 group-hover:text-white">
                <Brain size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{t('personas.student.title')}</h3>
              <p className="text-gray-500 group-hover:text-purple-100 leading-relaxed">
                {t('personas.student.desc')}
              </p>
            </div>

            {/* Mother */}
            <div className="group relative bg-gray-50 rounded-3xl p-8 hover:bg-accent hover:text-primary-foreground transition-colors duration-300">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm mb-6 group-hover:bg-white/10 group-hover:text-white">
                <Heart size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary-foreground">{t('personas.mother.title')}</h3>
              <p className="text-gray-500 group-hover:text-primary-foreground/80 leading-relaxed">
                {t('personas.mother.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED COURSES & PRODUCTS */}
      {/* Kept similar logic but improved styling */}
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto px-4">

          {/* Section Header */}
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-accent font-bold tracking-wider text-sm uppercase">Academy</span>
              <h2 className="text-3xl font-bold text-primary mt-2">
                {t('courses.title')}
              </h2>
            </div>
            <Link to="/courses" className="text-gray-600 hover:text-primary transition flex items-center font-medium">
              {t('common.viewDetails')}
              <ArrowRight className={isRTL ? 'mr-2 rotate-180' : 'ml-2'} size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden flex flex-col h-full"
              >
                <div className="h-56 bg-gradient-to-br from-primary to-secondary relative p-6 flex flex-col justify-end">
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                  <div className="relative z-10 text-white">
                    <span className="bg-accent text-primary text-xs font-bold px-2 py-1 rounded mb-2 inline-block">Course</span>
                    <h3 className="text-xl font-bold leading-tight">
                      {isRTL ? course.title_ar : course.title_en}
                    </h3>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-gray-500 mb-6 line-clamp-2 text-sm">
                    {isRTL ? course.short_description_ar : course.short_description_en}
                  </p>
                  <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-50">
                    <span className="text-2xl font-bold text-primary">
                      {course.is_free ? t('common.free') : `${course.price} D.Z`}
                    </span>
                    <span className="text-accent font-bold text-sm uppercase tracking-wide group-hover:underline">
                      {t('common.enroll')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-secondary font-bold tracking-wider text-sm uppercase">Shop</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {t('shop.title')}
              </h2>
            </div>
            <Link to="/shop" className="text-gray-600 hover:text-secondary transition flex items-center font-medium">
              {t('common.viewDetails')}
              <ArrowRight className={isRTL ? 'mr-2 rotate-180' : 'ml-2'} size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-gray-50 rounded-2xl p-4 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                <div className="h-64 bg-white rounded-xl mb-6 flex items-center justify-center overflow-hidden relative">
                  {/* Placeholder for Product Image */}
                  <div className="text-gray-300">
                    <Layers size={64} strokeWidth={1} />
                  </div>
                  <button className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-md text-gray-700 hover:text-accent hover:scale-110 transition-all">
                    <ShoppingBag size={20} />
                  </button>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-gray-900 group-hover:text-secondary transition-colors">
                    {isRTL ? product.name_ar : product.name_en}
                  </h3>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xl font-bold text-gray-900">
                      {product.price} D.Z
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (kept simple for now) */}
      {testimonials.length > 0 && (
        <section className="py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-16">
              Stories from our Community
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={18} className="text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-gray-100 mb-6 italic leading-relaxed">
                    "{isRTL ? testimonial.content_ar : testimonial.content_en}"
                  </p>
                  <div>
                    <p className="font-bold text-white">
                      {isRTL ? testimonial.name_ar : testimonial.name_en}
                    </p>
                    <p className="text-sm text-white/60">
                      {isRTL ? testimonial.role_ar : testimonial.role_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
