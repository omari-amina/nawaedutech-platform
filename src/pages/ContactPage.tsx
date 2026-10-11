import { cloneElement, isValidElement, useEffect, useState, type ReactElement, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
  contactFaqs,
  contactMethods,
  getLocalizedText,
  resolveLocale,
} from '../data/brandSite';
import { SiteSectionHeading } from '../components/SiteSectionHeading';
import { usePageMeta } from '../hooks/usePageMeta';
import { createContact } from '../lib/api';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(4),
  message: z.string().min(10),
});

type ContactFormValues = z.infer<typeof formSchema>;

export function ContactPage() {
  const { language } = useLanguage();
  const locale = resolveLocale(language);
  const [searchParams] = useSearchParams();
  const initialSubject = searchParams.get('subject') ?? '';
  const initialMessage = searchParams.get('message') ?? '';

  usePageMeta({
    title: locale === 'ar' ? 'تواصل' : 'Contact',
    description: locale === 'ar'
      ? 'تواصلي مع نوى عبر البريد أو واتساب لطلب منتج، الاستفسار عن دورة، أو اختيار الباقة المناسبة للمعلم أو الطالب أو وليّ الأمر.'
      : 'Contact Nawa by email or WhatsApp to request a product, ask about a course, or choose the right bundle for a teacher, student, or parent.',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: initialSubject,
      message: initialMessage,
    },
  });

  useEffect(() => {
    reset({
      name: '',
      email: '',
      subject: initialSubject,
      message: initialMessage,
    });
  }, [initialMessage, initialSubject, reset]);

  const [sentState, setSentState] = useState<'idle' | 'online' | 'maillocal'>('idle');

  const onSubmit = async (data: ContactFormValues) => {
    // US-2: POST backend d'abord, fallback mailto si offline
    try {
      await createContact({
        name: data.name ?? '',
        email: data.email ?? '',
        subject: data.subject ?? '',
        message: data.message ?? '',
      });
      setSentState('online');
    } catch {
      setSentState('maillocal');
      const subjectPrefix = locale === 'ar'
        ? 'رسالة من موقع NawaEduTech: '
        : 'Message from NawaEduTech website: ';
      const body = [
      locale === 'ar' ? `الاسم: ${data.name}` : `Name: ${data.name}`,
      locale === 'ar' ? `البريد الإلكتروني: ${data.email}` : `Email: ${data.email}`,
      '',
      locale === 'ar' ? 'تفاصيل الرسالة:' : 'Message details:',
      data.message,
    ].join('\n');

    window.location.href = `mailto:contact@nawaedutech.com?subject=${encodeURIComponent(
      `${subjectPrefix}${data.subject}`,
    )}&body=${encodeURIComponent(body)}`;
    }

    reset({
      name: '',
      email: '',
      subject: initialSubject,
      message: initialMessage,
    });
  };

  return (
    <div className="overflow-hidden">
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(243,185,66,0.16),transparent_22%),linear-gradient(135deg,#140728_0%,#240a5f_50%,#4d1eb2_100%)]" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-black">
                {locale === 'ar' ? 'تواصل معنا' : 'Contact us'}
              </span>
              <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                {locale === 'ar'
                  ? 'نحن هنا لمساعدتك على اختيار المنتج أو الدورة أو الباقة المناسبة.'
                  : 'We are here to help you choose the right product, course, or bundle.'}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-white/75">
                {locale === 'ar'
                  ? 'إذا كنت معلمة أو طالبة أو وليّة أمر، أرسلي طلبك وسنساعدك على الوصول إلى الخيار الأنسب بسرعة ووضوح.'
                  : 'If you are a teacher, student, or parent, send your request and we will help you find the best fit with clarity and care.'}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {contactMethods.map((method, index) => {
                const Icon = index === 0 ? Mail : index === 1 ? MessageCircle : MapPin;

                return (
                  <a
                    key={method.href}
                    href={method.href}
                    className="rounded-[1.75rem] border border-white/10 bg-white/10 p-6 text-white backdrop-blur-xl transition hover:bg-white/15"
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-accent">
                      <Icon size={22} />
                    </span>
                    <div className="mt-5 text-sm font-black text-white/70">
                      {getLocalizedText(method.title, locale)}
                    </div>
                    <div className="mt-2 text-base font-black">
                      {getLocalizedText(method.value, locale)}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="space-y-6">
            <SiteSectionHeading
              eyebrow={locale === 'ar' ? 'بيانات التواصل' : 'Contact channels'}
              title={locale === 'ar' ? 'اختر القناة الأقرب لنوع الطلب' : 'Choose the channel that fits the request'}
              description={locale === 'ar'
                ? 'ستجدين هنا أسرع الطرق للوصول إلينا سواء كان طلبك شراءً أو استفسارًا أو تعاونًا.'
                : 'You will find the fastest ways to reach us whether your request is about purchasing, a question, or a collaboration.'}
            />

            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                const Icon = index === 0 ? Mail : index === 1 ? Phone : MapPin;

                return (
                  <a
                    key={method.href}
                    href={method.href}
                    className="site-surface block p-6"
                  >
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                        <Icon size={20} />
                      </span>
                      <div className="space-y-2">
                        <div className="text-sm font-black text-primary">
                          {getLocalizedText(method.title, locale)}
                        </div>
                        <div className="text-lg font-black text-foreground">
                          {getLocalizedText(method.value, locale)}
                        </div>
                        <p className="text-base leading-7 text-slate-600">
                          {getLocalizedText(method.hint, locale)}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="site-surface p-8 md:p-10">
            <SiteSectionHeading
              eyebrow={locale === 'ar' ? 'نموذج الرسالة' : 'Message form'}
              title={locale === 'ar' ? 'أرسلي طلبك أو استفسارك مباشرة' : 'Send your request directly'}
              description={locale === 'ar'
                ? 'بعد الإرسال سيفتح بريدك الإلكتروني برسالة جاهزة، ويمكنك أيضًا استخدام واتساب للتواصل السريع.'
                : 'After submission, your email app will open with a ready-to-send message. You can also use WhatsApp for faster contact.'}
            />

            {sentState !== 'idle' && (
              <div className={`rounded-[1.25rem] border p-4 text-sm font-bold ${sentState === 'online' ? 'border-green-200 bg-green-50 text-green-800' : 'border-amber-200 bg-amber-50 text-amber-800'}`}>
                {sentState === 'online'
                  ? (locale === 'ar' ? '✅ تم استلام رسالتك بنجاح، سنرد عليك قريبًا.' : '✅ Message received, we will reply soon.')
                  : (locale === 'ar' ? 'تم تجهيز رسالة بريدية كاحتياطي (الخادم غير متاح).' : 'Mail client opened as fallback (server offline).')}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label={locale === 'ar' ? 'الاسم' : 'Name'}
                  placeholder={locale === 'ar' ? 'مثال: سارة بن علي' : 'e.g. Sara Ben Ali'}
                  error={errors.name ? (locale === 'ar' ? 'الاسم قصير جدًا' : 'Please enter a valid name') : undefined}
                >
                  <input
                    {...register('name')}
                    className="w-full rounded-[1.25rem] border border-slate-200 bg-white px-5 py-4 text-base font-bold text-foreground outline-none transition focus:border-primary/30 focus:ring-4 focus:ring-primary/5"
                  />
                </Field>

                <Field
                  label={locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  placeholder="email@example.com"
                  error={errors.email ? (locale === 'ar' ? 'البريد غير صالح' : 'Please enter a valid email') : undefined}
                >
                  <input
                    {...register('email')}
                    className="w-full rounded-[1.25rem] border border-slate-200 bg-white px-5 py-4 text-base font-bold text-foreground outline-none transition focus:border-primary/30 focus:ring-4 focus:ring-primary/5"
                  />
                </Field>
              </div>

              <Field
                label={locale === 'ar' ? 'الموضوع' : 'Subject'}
                placeholder={locale === 'ar' ? 'بماذا يمكننا مساعدتك؟' : 'How can we help?'}
                error={errors.subject ? (locale === 'ar' ? 'يرجى كتابة الموضوع' : 'Please add a subject') : undefined}
              >
                <input
                  {...register('subject')}
                  className="w-full rounded-[1.25rem] border border-slate-200 bg-white px-5 py-4 text-base font-bold text-foreground outline-none transition focus:border-primary/30 focus:ring-4 focus:ring-primary/5"
                />
              </Field>

              <Field
                label={locale === 'ar' ? 'الرسالة' : 'Message'}
                placeholder={locale === 'ar' ? 'اكتب تفاصيل طلبك أو استفسارك هنا...' : 'Write your request or question here...'}
                error={errors.message ? (locale === 'ar' ? 'الرسالة قصيرة جدًا' : 'Please add a longer message') : undefined}
              >
                <textarea
                  {...register('message')}
                  rows={6}
                  className="w-full rounded-[1.25rem] border border-slate-200 bg-white px-5 py-4 text-base font-bold text-foreground outline-none transition focus:border-primary/30 focus:ring-4 focus:ring-primary/5"
                />
              </Field>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-4 text-base font-black text-white transition hover:bg-primary disabled:opacity-70"
              >
                {isSubmitting ? (
                  locale === 'ar' ? 'جارٍ الإرسال...' : 'Sending...'
                ) : (
                  <>
                    <Send size={18} />
                    {locale === 'ar' ? 'إرسال الرسالة' : 'Send message'}
                  </>
                )}
              </button>

              <a
                href={contactMethods[1].href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-4 text-base font-black text-slate-700 transition hover:border-primary/20 hover:text-primary"
              >
                <Phone size={18} />
                {locale === 'ar' ? 'تواصلي عبر واتساب' : 'Contact via WhatsApp'}
              </a>
            </form>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <SiteSectionHeading
          eyebrow={locale === 'ar' ? 'أسئلة شائعة' : 'Frequently asked questions'}
          title={locale === 'ar' ? 'إجابات سريعة تساعدك على الحسم' : 'Quick answers to help you decide'}
          description={locale === 'ar'
            ? 'جمعنا أكثر الأسئلة شيوعًا حتى تجدي المعلومة بسرعة قبل التواصل المباشر.'
            : 'We gathered the most common questions so you can find what you need quickly before reaching out.'}
          align="center"
        />

        <div className="mt-12 grid gap-4">
          {contactFaqs.map((faq) => (
            <article key={getLocalizedText(faq.question, locale)} className="site-surface p-6">
              <h3 className="text-xl font-black text-foreground">
                {getLocalizedText(faq.question, locale)}
              </h3>
              <p className="mt-3 text-base leading-8 text-slate-600">
                {getLocalizedText(faq.answer, locale)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  placeholder,
  error,
  children,
}: {
  label: string;
  placeholder: string;
  error?: string;
  children: ReactNode;
}) {
  const child = isValidElement(children)
    ? (children as ReactElement<{ placeholder?: string }>)
    : null;

  return (
    <label className="block space-y-2">
      <span className="text-sm font-black text-slate-700">{label}</span>
      {child ? cloneElement(child, { placeholder }) : null}
      {error ? <span className="block text-sm font-bold text-red-500">{error}</span> : null}
    </label>
  );
}
