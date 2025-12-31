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
        <div className="min-h-screen py-16 bg-muted/30">
            <div className="container mx-auto px-4">

                <div className="text-center mb-16 px-4">
                    <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2 block">{t('nav.contact') || 'Contact Us'}</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        {t('contact.title') || 'Get in Touch'}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        {t('contact.subtitle') || 'We are here to help and answer any question you might have.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="flex items-start">
                                <div className="bg-primary/10 p-3 rounded-2xl me-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Mail size={28} className="text-primary group-hover:text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('contact.email') || 'Email Us'}</h3>
                                    <p className="text-gray-600 mb-1">Our friendly team is here to help.</p>
                                    <a href="mailto:contact@nawaedutech.com" className="text-lg font-semibold text-primary hover:underline">contact@nawaedutech.com</a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="flex items-start">
                                <div className="bg-secondary/10 p-3 rounded-2xl me-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                                    <Phone size={28} className="text-secondary group-hover:text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('contact.phone') || 'Call Us'}</h3>
                                    <p className="text-gray-600 mb-1">Mon-Fri from 8am to 5pm.</p>
                                    <a href="tel:+213123456789" className="text-lg font-semibold text-primary hover:underline" dir="ltr">+213 123 456 789</a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="flex items-start">
                                <div className="bg-accent/20 p-3 rounded-2xl me-6 group-hover:bg-accent group-hover:text-primary-foreground transition-colors">
                                    <MapPin size={28} className="text-accent-foreground group-hover:text-primary-foreground" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t('contact.office') || 'Visit Us'}</h3>
                                    <p className="text-gray-600 mb-1">Come say hello at our office headquarters.</p>
                                    <p className="text-lg font-semibold text-gray-900">Algiers, Algeria</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                            <div className="absolute bottom-0 right-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                                <MessageSquare size={200} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{t('contact.faqTitle') || 'Have questions?'}</h3>
                            <p className="text-blue-100 mb-6 relative z-10">Check out our FAQ section for quick answers to common questions about our platform and courses.</p>
                            <button className="bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg relative z-10">
                                {t('contact.faqButton') || 'Visit FAQ'}
                            </button>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-10 relative">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.formTitle') || 'Send us a message'}</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('contact.name') || 'Name'}</label>
                                    <input
                                        {...register('name')}
                                        type="text"
                                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.name ? 'border-red-500' : 'border-gray-200 focus:border-primary'}`}
                                        placeholder="Your name"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t('contact.emailLabel') || 'Email'}</label>
                                    <input
                                        {...register('email')}
                                        type="email"
                                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.email ? 'border-red-500' : 'border-gray-200 focus:border-primary'}`}
                                        placeholder="you@example.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('contact.subject') || 'Subject'}</label>
                                <input
                                    {...register('subject')}
                                    type="text"
                                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.subject ? 'border-red-500' : 'border-gray-200 focus:border-primary'}`}
                                    placeholder="How can we help?"
                                />
                                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('contact.message') || 'Message'}</label>
                                <textarea
                                    {...register('message')}
                                    rows={5}
                                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none ${errors.message ? 'border-red-500' : 'border-gray-200 focus:border-primary'}`}
                                    placeholder="Tell us more..."
                                />
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-light transition-all shadow-lg shadow-primary/25 flex items-center justify-center disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Send className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                                        {t('contact.send') || 'Send Message'}
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
