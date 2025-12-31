import { useTranslation } from 'react-i18next';
import { Target, Heart, Lightbulb, Users } from 'lucide-react';

export function AboutPage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* 1. HERO SECTION */}
            <section className="relative py-20 px-4 text-center overflow-hidden border-b border-gray-50">
                {/* Background Illustration with Overlay (Subtle) */}
                <div className="absolute inset-0 z-0 opacity-10">
                    <img
                        src="/hero-nawa-brand.png"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="container mx-auto relative z-10 py-10">
                    <h1 className="text-4xl sm:text-6xl font-black text-[#340690] mb-6 leading-tight">
                        {t('aboutPage.title')}
                    </h1>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
                        {t('aboutPage.subtitle')}
                    </p>
                </div>
            </section>

            {/* 2. THE STORY SECTION */}
            <section className="py-24 px-4">
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <div className="relative">
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#f3b942]/20 rounded-full blur-2xl"></div>
                                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#340690]/10 rounded-full blur-3xl"></div>
                                <div className="bg-muted/50 rounded-3xl aspect-[4/3] w-full flex items-center justify-center relative overflow-hidden shadow-2xl border border-white">
                                    <img
                                        src="/hero-illustration.png"
                                        alt="Story Illustration"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 space-y-8 text-right">
                            <h2 className="text-4xl font-extrabold text-[#340690] relative inline-block">
                                {t('aboutPage.storyTitle')}
                                <span className="absolute bottom-0 right-0 w-1/2 h-1 bg-[#f3b942] rounded-full"></span>
                            </h2>
                            <div className="space-y-6">
                                <p className="text-xl text-gray-800 leading-relaxed">
                                    {t('aboutPage.storyP1')}
                                </p>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    {t('aboutPage.storyP2')}
                                </p>
                                <p className="text-xl text-[#340690] leading-relaxed font-bold italic">
                                    {t('aboutPage.storyP3')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. VALUES SECTION */}
            <section className="py-24 px-4 bg-muted/40">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-black text-[#340690] mb-4">{t('aboutPage.valuesTitle')}</h2>
                        <div className="w-16 h-1.5 bg-[#f3b942] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ValueCard
                            icon={<Lightbulb className="w-10 h-10 text-[#340690]" />}
                            title={t('aboutPage.values.innovation.title')}
                            desc={t('aboutPage.values.innovation.desc')}
                        />
                        <ValueCard
                            icon={<Heart className="w-10 h-10 text-red-500" />}
                            title={t('aboutPage.values.empathy.title')}
                            desc={t('aboutPage.values.empathy.desc')}
                        />
                        <ValueCard
                            icon={<Users className="w-10 h-10 text-[#5f2cc7]" />}
                            title={t('aboutPage.values.community.title')}
                            desc={t('aboutPage.values.community.desc')}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 text-center border border-gray-50 flex flex-col items-center">
            <div className="bg-gray-50 w-24 h-24 rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-6 transition-transform">
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#340690]">{title}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">{desc}</p>
        </div>
    );
}
