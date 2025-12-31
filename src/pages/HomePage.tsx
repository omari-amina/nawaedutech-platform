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
    <div className="min-h-screen bg-background font-sans">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center py-24 px-4 overflow-hidden">
        {/* Background Illustration with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-nawa-brand.png"
            alt="NawaEduTech Brand Illustration"
            className="w-full h-full object-cover object-[center_right]"
          />
          {/* Subtle gradient overlay to ensure text readability on the left side */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-white/80 sm:via-white/20 sm:to-white/60"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-2xl ml-0 mr-auto text-right pr-4 sm:pr-12">
            {/* Tagline */}
            <h1 className="text-2xl sm:text-4xl font-black text-[#340690] mb-6 leading-tight drop-shadow-sm">
              {t('hero.slogan')}
            </h1>

            {/* Description */}
            <p className="text-xl sm:text-2xl text-gray-900 mb-10 leading-relaxed font-bold drop-shadow-sm">
              {t('hero.subtitle')}
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-start">
              <Link
                to="/shop"
                className="inline-block bg-[#f3b942] text-[#340690] text-xl font-bold py-4 px-10 rounded-2xl shadow-xl hover:bg-[#f3b942]/90 hover:scale-105 transition-all text-center"
              >
                {t('hero.ctaShop')}
              </Link>
              <button
                onClick={() => {/* Trigger Lead Generation Modal */ }}
                className="inline-block bg-white text-[#340690] text-xl font-bold py-4 px-10 rounded-2xl border-2 border-[#340690] shadow-lg hover:bg-gray-50 hover:scale-105 transition-all text-center"
              >
                {t('hero.ctaCourses')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE PILLARS (Education, Organization, Technology) */}
      <section className="py-24 px-4 bg-muted/40">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-[#340690] mb-4">{t('pillars.title')}</h2>
            <div className="w-16 h-1.5 bg-[#f3b942] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Education */}
            <div className="group bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#340690] to-[#5f2cc7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#340690]/5 rounded-full blur-3xl group-hover:bg-[#340690]/10 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-[#340690]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#340690] transition-all duration-500">
                  <Brain className="w-10 h-10 text-[#340690] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#340690] mb-4">{t('pillars.education.title')}</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {t('pillars.education.desc')}
                </p>
              </div>
            </div>

            {/* Organization */}
            <div className="group bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#5f2cc7] to-[#864bf5] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#5f2cc7]/5 rounded-full blur-3xl group-hover:bg-[#5f2cc7]/10 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-[#5f2cc7]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#5f2cc7] transition-all duration-500">
                  <Sparkles className="w-10 h-10 text-[#5f2cc7] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#340690] mb-4">{t('pillars.organization.title')}</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {t('pillars.organization.desc')}
                </p>
              </div>
            </div>

            {/* Technology */}
            <div className="group bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#f3b942] to-[#340690] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#f3b942]/10 rounded-full blur-3xl group-hover:bg-[#f3b942]/20 transition-colors"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-[#f3b942]/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#f3b942] transition-all duration-500">
                  <GraduationCap className="w-10 h-10 text-[#f3b942] group-hover:text-[#340690] transition-colors" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#340690] mb-4">{t('pillars.technology.title')}</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {t('pillars.technology.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY NAWA? (Philosophy Quote) */}
      <section className="bg-white py-20 px-4">
        <div className="container mx-auto">
          <p className="text-xl sm:text-2xl font-medium text-gray-900 italic max-w-2xl mx-auto text-center leading-relaxed">
            {t('transition.text')}
          </p>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SECTION */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-[#340690] mb-4">{t('products.title')}</h2>
            <div className="w-16 h-1.5 bg-[#f3b942] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="relative w-full h-56 bg-gradient-to-br from-[#340690] to-[#5f2cc7] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
                <BookOpen className="w-20 h-20 text-white/30 group-hover:text-white/50 group-hover:scale-110 transition-all duration-500" strokeWidth={1.5} />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-[#340690] transition-colors">مخطط أسبوعي للمعلم</h3>
                <p className="text-gray-600 leading-relaxed text-lg">يوفّر لك 30 دقيقة أسبوعيًا</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="relative w-full h-56 bg-gradient-to-br from-[#5f2cc7] to-[#864bf5] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#f3b942]/20 rounded-full blur-3xl"></div>
                <Layers className="w-20 h-20 text-white/30 group-hover:text-white/50 group-hover:scale-110 transition-all duration-500" strokeWidth={1.5} />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-[#340690] transition-colors">مفكرة ذكية للطالب</h3>
                <p className="text-gray-600 leading-relaxed text-lg">تنظم وقتك وتزيد إنتاجيتك</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="relative w-full h-56 bg-gradient-to-br from-[#f3b942] to-[#340690] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute top-4 left-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                <Heart className="w-20 h-20 text-white/30 group-hover:text-white/50 group-hover:scale-110 transition-all duration-500" strokeWidth={1.5} />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-[#340690] transition-colors">دليل تحضير الدروس</h3>
                <p className="text-gray-600 leading-relaxed text-lg">يساعدك على تخطيط دروسك بفعالية</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section className="relative bg-[#340690] py-24 px-4 text-center text-white overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f3b942]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5f2cc7]/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
            {t('finalCta.title')}
          </h2>
          <p className="text-xl sm:text-2xl font-medium mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
            {t('finalCta.slogan')}
          </p>
          <Link
            to="/shop"
            className="inline-block bg-[#f3b942] text-[#340690] text-xl font-black py-5 px-12 rounded-2xl shadow-2xl hover:bg-[#f3b942]/90 hover:scale-105 transition-all"
          >
            {t('hero.ctaShop')}
          </Link>
        </div>
      </section>

    </div>
  );
}
