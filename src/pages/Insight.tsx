import { useMemo, useState, useCallback } from 'react';
import { useLanguage, langToUrl } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';
import { ConsultationForm } from '@/components/ConsultationForm';
import { FloatingShape } from '@/components/FloatingShape';
import { PricingSection } from '@/components/PricingSection';
import { InsightGallery } from '@/components/InsightGallery';
import { ComparisonSection } from '@/components/ComparisonSection';
import { SEOHead } from '@/components/SEOHead';
import { buildFaqSchema } from '@/utils/seo-schemas';
import { Card } from '@/components/ui/card';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Database, Image, FileText, LayoutGrid, Scale, Lightbulb, Target, BarChart, Brain, Sparkles, Play
} from 'lucide-react';

function VideoSection({ t }: { t: (key: string) => string }) {
  const [playing, setPlaying] = useState(false);
  const handlePlay = useCallback(() => setPlaying(true), []);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold">{t('product.video.title')}</h2>
          <p className="text-lg text-muted-foreground">{t('product.video.subtitle')}</p>
        </div>
        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden shadow-hover rounded-2xl">
            <div className="aspect-video w-full relative">
              {playing ? (
                <iframe
                  className="absolute inset-0 w-full h-full animate-fade-in"
                  src="https://www.youtube.com/embed/ZQ2CYL-2l2c?autoplay=1&rel=0"
                  title="Net Reverse Insight Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 w-full h-full flex items-center justify-center group cursor-pointer border-0 bg-transparent p-0"
                  aria-label={t('product.video.button')}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-soft via-green-soft/60 to-blue-soft" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,hsl(207_100%_52%/0.12),transparent_60%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,hsl(148_81%_44%/0.10),transparent_60%)]" />
                  <div className="absolute w-[340px] h-[340px] rounded-full border border-primary/[0.07] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute w-[500px] h-[500px] rounded-full border border-accent/[0.05] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-card shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-1 ring-border">
                      <Play className="w-10 h-10 text-primary fill-primary ml-1" />
                    </div>
                    <span className="text-foreground font-semibold text-lg">{t('product.video.button')}</span>
                  </div>
                </button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default function Insight() {
  const { t, language } = useLanguage();

  const features = [
    { icon: Database, key: '1' }, { icon: Image, key: '2' }, { icon: FileText, key: '3' },
    { icon: LayoutGrid, key: '4' }, { icon: Scale, key: '5' }, { icon: Lightbulb, key: '6' },
  ];

  const steps = [
    { icon: Target, key: 'step1' }, { icon: BarChart, key: 'step2' },
    { icon: Brain, key: 'step3' }, { icon: Sparkles, key: 'step4' },
  ];

  const faqItems = [
    { key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' },
    { key: '6' }, { key: '7' }, { key: '8' }, { key: '9' }, { key: '10' },
    { key: '11' }, { key: '12' }, { key: '13' }, { key: '14' }, { key: '15' },
    { key: '16' }, { key: '17' }, { key: '18' },
  ];

  const faqSchema = useMemo(() => {
    const items = faqItems.map((item) => ({
      question: t(`product.faq.${item.key}.q`),
      answer: t(`product.faq.${item.key}.a`),
    }));
    return buildFaqSchema(items);
  }, [t]);

  const urlLang = langToUrl(language);
  const insightPath = `/${urlLang}/insight`;
  const hreflang = [
    { lang: 'en', path: '/en/insight' },
    { lang: 'ru', path: '/ru/insight' },
    { lang: 'uk', path: '/uk/insight' },
    { lang: 'x-default', path: '/en/insight' },
  ];

  const seoMeta = {
    en: {
      title: 'Net Reverse Insight | AI-Powered Competitor Ad Analysis',
      description: 'Analyze competitors\' Facebook and Instagram ads with AI. Get structured insights on strategy, creatives, copy, and actionable recommendations.',
    },
    ru: {
      title: 'Net Reverse Insight | AI-анализ рекламы конкурентов',
      description: 'Анализируйте рекламу конкурентов в Facebook и Instagram с помощью AI. Получайте структурированные выводы по стратегии, креативам, текстам и рекомендации.',
    },
    ua: {
      title: 'Net Reverse Insight | AI-аналіз реклами конкурентів',
      description: 'Аналізуйте рекламу конкурентів у Facebook та Instagram за допомогою AI. Отримуйте структуровані висновки щодо стратегії, креативів, текстів і рекомендації.',
    },
  } as const;

  const meta = seoMeta[language] || seoMeta.en;

  return (
    <>
      <SEOHead
        title={meta.title}
        description={meta.description}
        path={insightPath}
        jsonLd={[faqSchema]}
        hreflang={hreflang}
      />
      <div className="min-h-screen bg-background" id="insight-overview">
        <Header />
        <BackToTop />
        
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
            <div className="absolute top-20 right-10 opacity-30 pointer-events-none">
              <FloatingShape type="blob" color="green" size={400} speed={4} />
            </div>
            <div className="absolute bottom-20 left-20 opacity-20 pointer-events-none">
              <FloatingShape type="sphere" color="blue" size={300} speed={5} />
            </div>
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
                <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-sm font-medium mb-4 border border-primary/20">AI-Powered Tool</div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">{t('product.hero.title')}</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('product.hero.subtitle')}</p>
              </div>
            </div>
          </section>

          {/* What it Does */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <Card className="max-w-4xl mx-auto p-8 lg:p-12 text-center shadow-soft bg-card">
                <h2 className="text-2xl lg:text-3xl font-bold mb-6">{t('product.what.title')}</h2>
                <p className="text-lg text-muted-foreground">{t('product.what.text')}</p>
              </Card>
            </div>
          </section>

          {/* How It Works */}
          <section id="insight-how" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">{t('product.how.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {steps.map((step, index) => (
                  <Card key={index} className="p-6 text-center hover:shadow-hover transition-all duration-300 hover:-translate-y-1 bg-card">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">{index + 1}</div>
                    <p className="text-foreground font-medium">{t(`product.how.${step.key}`)}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section id="insight-features" className="py-20 bg-gradient-to-b from-background to-green-soft/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">{t('product.features.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {features.map((feature, index) => (
                  <Card key={index} className="p-6 hover:shadow-hover transition-all duration-300 hover:-translate-y-1 bg-card">
                    <div className="w-12 h-12 mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{t(`product.features.${feature.key}`)}</h3>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <InsightGallery />

          {/* Video Section */}
          <VideoSection t={t} />

          <PricingSection />
          <ComparisonSection />

          {/* FAQ */}
          <section id="insight-faq" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">{t('product.faq.title')}</h2>
              <Accordion type="single" collapsible className="max-w-3xl mx-auto">
                {faqItems.map((item) => (
                  <AccordionItem key={item.key} value={item.key}>
                    <AccordionTrigger className="text-left font-semibold">{t(`product.faq.${item.key}.q`)}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{t(`product.faq.${item.key}.a`)}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* CTA Section */}
          <section id="insight-cta" className="py-20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center space-y-8">
                <h2 className="text-3xl lg:text-4xl font-bold">{t('product.cta.title')}</h2>
                <p className="text-lg text-muted-foreground">{t('product.cta.subtitle')}</p>
                <ConsultationForm formGroup="insight" formId="insight_product_form" formSource="insight_cta" />
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
