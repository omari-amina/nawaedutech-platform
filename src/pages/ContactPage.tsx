import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const contactSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    subject: z.string().min(5, 'Subject is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactPage() {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactForm>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactForm) => {
        // In a real app, this would send to an API
        console.log('Form Submitted:', data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert(t('contact.successMessage') || 'Message sent successfully!');
        reset();
    };

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* 1. HERO SECTION */}
            <section className="relative py-24 px-4 text-center overflow-hidden bg-gradient-to-br from-[#340690] via-[#5f2cc7] to-[#864bf5] mb-20">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#f3b942]/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

                <div className="container mx-auto relative z-10 py-10">
                    <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
                        {t('contact.title') || 'تواصل معنا'}
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-medium">
                        {t('contact.subtitle') || 'نحن هنا للإجابة على جميع استفساراتك ومساعدتك في رحلتك التعليمية.'}
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-7xl mx-auto items-start">

                    {/* Left Side: Contact Info */}
                    <div className="space-y-8">
                        <div className="group bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                            {/* Decorative Background Icon */}
                            <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Mail size={160} />
                            </div>

                            <div className="flex items-center gap-8 relative z-10">
                                <div className="bg-[#340690]/10 w-20 h-20 rounded-[1.5rem] flex items-center justify-center shrink-0 group-hover:bg-[#340690] transition-all duration-500 group-hover:scale-110">
                                    <Mail size={32} className="text-[#340690] group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-[#340690] mb-2 font-arabic">{t('contact.email') || 'البريد الإلكتروني'}</h3>
                                    <a href="mailto:contact@nawaedutech.com" className="text-xl font-bold text-gray-600 hover:text-[#5f2cc7] transition-colors lowercase block">contact@nawaedutech.com</a>
                                </div>
                            </div>
                        </div>

                        <div className="group bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                            <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Phone size={160} />
                            </div>

                            <div className="flex items-center gap-8 relative z-10">
                                <div className="bg-[#f3b942]/10 w-20 h-20 rounded-[1.5rem] flex items-center justify-center shrink-0 group-hover:bg-[#f3b942] transition-all duration-500 group-hover:scale-110">
                                    <Phone size={32} className="text-[#f3b942] group-hover:text-[#340690] transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-[#340690] mb-2 font-arabic">{t('contact.phone') || 'رقم الهاتف'}</h3>
                                    <a href="tel:+213123456789" className="text-xl font-bold text-gray-600 tracking-wider block" dir="ltr">+213 123 456 789</a>
                                </div>
                            </div>
                        </div>

                        <div className="group bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                            <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                <MapPin size={160} />
                            </div>

                            <div className="flex items-center gap-8 relative z-10">
                                <div className="bg-[#5f2cc7]/10 w-20 h-20 rounded-[1.5rem] flex items-center justify-center shrink-0 group-hover:bg-[#5f2cc7] transition-all duration-500 group-hover:scale-110">
                                    <MapPin size={32} className="text-[#5f2cc7] group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-[#340690] mb-2 font-arabic">{t('contact.office') || 'الموقع'}</h3>
                                    <p className="text-xl font-bold text-gray-600 block">الجزائر العاصمة، الجزائر</p>
                                </div>
                            </div>
                        </div>

                        {/* FAQ CTA Card */}
                        <div className="bg-[#340690] rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl shadow-[#340690]/30 mt-12 group/faq">
                            <div className="absolute -bottom-20 -right-20 opacity-10 group-hover/faq:scale-110 transition-transform duration-700">
                                <MessageSquare size={300} strokeWidth={1} />
                            </div>
                            <h3 className="text-3xl font-black mb-6 relative z-10 font-arabic">{t('contact.faqTitle') || 'هل لديك أسئلة؟'}</h3>
                            <p className="text-xl text-white/80 mb-10 relative z-10 leading-relaxed font-medium">نحن نوفر لك قسماً خاصاً بالأسئلة الشائعة لتجد إجابات سريعة حول منصتنا ومنتجاتنا.</p>
                            <button className="bg-[#f3b942] text-[#340690] px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl shadow-black/20 relative z-10">
                                {t('contact.faqButton') || 'زيارة الأسئلة الشائعة'}
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="bg-white rounded-[3.5rem] shadow-2xl border border-gray-50 p-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#340690] via-[#5f2cc7] to-[#f3b942]"></div>

                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-[#340690] mb-4 font-arabic">{t('contact.formTitle') || 'أرسل لنا رسالة'}</h2>
                            <p className="text-gray-500 font-medium">سوف نرد عليك في أقرب وقت ممكن.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-black text-[#340690] uppercase tracking-widest mb-3 font-sans opacity-70">{t('contact.name') || 'الاسم الكامل'}</label>
                                    <input
                                        {...register('name')}
                                        type="text"
                                        className={`w-full px-8 py-5 bg-muted/20 border-2 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-[#340690]/5 transition-all text-lg font-bold placeholder:font-medium ${errors.name ? 'border-red-500' : 'border-transparent focus:border-[#340690]'}`}
                                        placeholder={isRTL ? 'مثال: محمد علي' : 'e.g. John Doe'}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-3 font-bold px-2">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-black text-[#340690] uppercase tracking-widest mb-3 font-sans opacity-70">{t('contact.emailLabel') || 'البريد الإلكتروني'}</label>
                                    <input
                                        {...register('email')}
                                        type="email"
                                        className={`w-full px-8 py-5 bg-muted/20 border-2 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-[#340690]/5 transition-all text-lg font-bold placeholder:font-medium ${errors.email ? 'border-red-500' : 'border-transparent focus:border-[#340690]'}`}
                                        placeholder="email@example.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-3 font-bold px-2">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-black text-[#340690] uppercase tracking-widest mb-3 font-sans opacity-70">{t('contact.subject') || 'الموضوع'}</label>
                                <input
                                    {...register('subject')}
                                    type="text"
                                    className={`w-full px-8 py-5 bg-muted/20 border-2 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-[#340690]/5 transition-all text-lg font-bold placeholder:font-medium ${errors.subject ? 'border-red-500' : 'border-transparent focus:border-[#340690]'}`}
                                    placeholder={isRTL ? 'بخصوص ماذا تتواصل معنا؟' : 'How can we help?'}
                                />
                                {errors.subject && <p className="text-red-500 text-sm mt-3 font-bold px-2">{errors.subject.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-black text-[#340690] uppercase tracking-widest mb-3 font-sans opacity-70">{t('contact.message') || 'الرسالة'}</label>
                                <textarea
                                    {...register('message')}
                                    rows={5}
                                    className={`w-full px-8 py-5 bg-muted/20 border-2 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-[#340690]/5 transition-all text-lg font-bold placeholder:font-medium resize-none ${errors.message ? 'border-red-500' : 'border-transparent focus:border-[#340690]'}`}
                                    placeholder={isRTL ? 'اكتب رسالتك بالتفصيل هنا...' : 'Write your message details here...'}
                                />
                                {errors.message && <p className="text-red-500 text-sm mt-3 font-bold px-2">{errors.message.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#340690] text-white py-6 rounded-[1.5rem] font-black text-xl hover:bg-[#5f2cc7] transition-all shadow-2xl shadow-[#340690]/20 flex items-center justify-center disabled:opacity-70 group overflow-hidden relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                                {isSubmitting ? (
                                    <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Send className={`w-6 h-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform ${isRTL ? 'ml-3' : 'mr-3'}`} />
                                        <span className="relative z-10 font-arabic">{t('contact.send') || 'إرسال الرسالة'}</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
