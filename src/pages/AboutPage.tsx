import { useTranslation } from 'react-i18next';
import { Target, Heart, Lightbulb, Users } from 'lucide-react';

export function AboutPage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="bg-primary text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('nav.about')}</h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
                        {t('footer.aboutText')}
                    </p>
                </div>
            </section>

            {/* The Story Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            {/* Placeholder for Story Image */}
                            <div className="bg-muted rounded-2xl aspect-video w-full flex items-center justify-center relative overflow-hidden group shadow-lg">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
                                <Target size={64} className="text-primary/50" />
                            </div>
                        </div>
                        <div className="md:w-1/2 space-y-6">
                            <h2 className="text-3xl font-bold text-primary">The Nawa Story</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                "Nawa" means "Nucleus" or "Seed" in Arabic. Every great tree starts as a seed, and every great mind starts with an idea.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                We founded NawaEduTech because we saw a gap between potential and tools. Teachers wanted to innovate but lacked time. Students wanted to excel but lacked direction.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed font-medium">
                                We are not just a store. We are a partner in your growth journey.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <ValueCard
                            icon={<Lightbulb className="w-10 h-10 text-accent/80" />}
                            title="Innovation"
                            desc="We create tools that are not just digital, but distinctively smart."
                        />
                        <ValueCard
                            icon={<Heart className="w-10 h-10 text-red-400" />}
                            title="Empathy"
                            desc="We design with the heart. We understand the pressure you face."
                        />
                        <ValueCard
                            icon={<Users className="w-10 h-10 text-secondary" />}
                            title="Community"
                            desc="Education is a shared mission. We grow together."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-gray-600">{desc}</p>
        </div>
    );
}
