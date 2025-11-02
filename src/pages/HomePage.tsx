import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { BookOpen, ShoppingBag, Star, ArrowRight } from 'lucide-react';

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
    // Load featured courses
    const { data: courses } = await supabase
      .from('courses')
      .select('*')
      .eq('featured', true)
      .eq('is_published', true)
      .limit(3);
    if (courses) setFeaturedCourses(courses);

    // Load featured products
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .eq('is_active', true)
      .limit(3);
    if (products) setFeaturedProducts(products);

    // Load testimonials
    const { data: testimonialData } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_featured', true)
      .limit(3);
    if (testimonialData) setTestimonials(testimonialData);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-secondary to-primary-light text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo with Slogan */}
            <div className="mb-8">
              <img 
                src="/logo-slogan.png" 
                alt="NawaEduTech Logo with Slogan" 
                className="mx-auto h-24 md:h-32 object-contain"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl mb-8 opacity-90">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="bg-accent text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition inline-flex items-center justify-center"
              >
                <ShoppingBag className="mr-2" size={20} />
                {t('hero.ctaShop')}
              </Link>
              <Link
                to="/courses"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center justify-center"
              >
                <BookOpen className="mr-2" size={20} />
                {t('hero.ctaCourses')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {t('courses.title')}
            </h2>
            <Link to="/courses" className="text-primary hover:text-secondary transition flex items-center">
              {t('common.viewDetails')}
              <ArrowRight className={isRTL ? 'mr-2 rotate-180' : 'ml-2'} size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-primary to-secondary"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {isRTL ? course.title_ar : course.title_en}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {isRTL ? course.short_description_ar : course.short_description_en}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">
                      {course.is_free ? t('common.free') : `$${course.price}`}
                    </span>
                    <span className="text-accent font-semibold">
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
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {t('shop.title')}
            </h2>
            <Link to="/shop" className="text-primary hover:text-secondary transition flex items-center">
              {t('common.viewDetails')}
              <ArrowRight className={isRTL ? 'mr-2 rotate-180' : 'ml-2'} size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {isRTL ? product.name_ar : product.name_en}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {isRTL ? product.description_ar : product.description_en}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">
                      ${product.price}
                    </span>
                    <button className="bg-accent text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition font-semibold">
                      {t('common.addToCart')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} className="text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "{isRTL ? testimonial.content_ar : testimonial.content_en}"
                  </p>
                  <div>
                    <p className="font-bold text-gray-900">
                      {isRTL ? testimonial.name_ar : testimonial.name_en}
                    </p>
                    <p className="text-sm text-gray-600">
                      {isRTL ? testimonial.role_ar : testimonial.role_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mission Statement */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Fighting Technological Illiteracy
          </h2>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            At NawaEduTech, we believe that everyone deserves access to quality digital education. 
            We're committed to empowering teachers and students with the tools and knowledge they 
            need to thrive in the digital age.
          </p>
        </div>
      </section>
    </div>
  );
}
