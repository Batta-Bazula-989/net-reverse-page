import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackInsightCtaClick } from '@/utils/analytics';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';
import { ConsultationForm } from '@/components/ConsultationForm';
import { HowWeHelpSection } from '@/components/HowWeHelpSection';
import { ConsultationModal } from '@/components/ConsultationModal';
import { FloatingShape } from '@/components/FloatingShape';
import { SEOHead } from '@/components/SEOHead';
import { organizationSchema, webSiteSchema, buildFaqSchema } from '@/utils/seo-schemas';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  CheckCircle, ArrowRight, ShoppingCart, Megaphone, Code, Briefcase, Settings, Link as LinkIcon, Cpu, MessageSquare, Headphones
} from 'lucide-react';
import { langToUrl } from '@/contexts/LanguageContext';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, language, localePath } = useLanguage();
  const navigate = useNavigate();

  const handleNavigateToInsight = () => {
    navigate(localePath('/insight'));
    window.scrollTo(0, 0);
  };

  const helpCards = [
    { icon: Megaphone, key: '1' },
    { icon: Briefcase, key: '2' },
    { icon: ShoppingCart, key: '3' },
    { icon: Code, key: '4' },
  ];

  const services = [
    { icon: Settings, key: '1' },
    { icon: Headphones, key: '2' },
    { icon: LinkIcon, key: '3' },
    { icon: Cpu, key: '4' },
  ];

  const whyItems = [{ key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' }];
  const homeFaqItems = [{ key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' }, { key: '6' }, { key: '7' }, { key: '8' }, { key: '9' }, { key: '10' }, { key: '11' }, { key: '12' }];

  const faqSchema = useMemo(() => {
    const items = homeFaqItems.map((item) => ({
      question: t(`faq.${item.key}.q`),
      answer: t(`faq.${item.key}.a`),
    }));
    return buildFaqSchema(items);
  }, [t]);

  const urlLang = langToUrl(language);
  const homePath = `/${urlLang}`;
  const hreflang = [
    { lang: 'en', path: '/en' },
    { lang: 'ru', path: '/ru' },
    { lang: 'uk', path: '/uk' },
    { lang: 'x-default', path: '/en' },
  ];

  const seoMeta = {
    en: {
      title: 'Net Reverse | Smart Technology Solutions for Business',
      description: 'We automate processes, build AI assistants, and create custom tools that save time and boost business performance.',
    },
    ru: {
      title: 'Net Reverse | Технологические решения для бизнеса',
      description: 'Автоматизируем процессы, создаём AI-ассистентов и кастомные инструменты, которые экономят время и повышают эффективность бизнеса.',
    },
    ua: {
      title: 'Net Reverse | Технологічні рішення для бізнесу',
      description: 'Автоматизуємо процеси, створюємо AI-асистентів та кастомні інструменти, які економлять час і підвищують ефективність бізнесу.',
    },
  } as const;

  const meta = seoMeta[language] || seoMeta.en;

  return (
    <>
      <SEOHead
        title={meta.title}
        description={meta.description}
        path={homePath}
        jsonLd={[organizationSchema, webSiteSchema, faqSchema]}
        hreflang={hreflang}
      />
      <div className="min-h-screen bg-background" id="home">
        <Header />
        <BackToTop />
        
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-blue-soft/30 via-background to-green-soft/20">
            <div className="absolute top-10 right-10 opacity-30 pointer-events-none">
              <FloatingShape type="sphere" color="blue" size={400} speed={3} />
            </div>
            <div className="absolute bottom-20 left-10 opacity-20 pointer-events-none">
              <FloatingShape type="ring" color="green" size={300} speed={4} />
            </div>
            
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
                <div className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 text-sm font-medium border border-primary/20">
                  {t('hero.chip')}
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground">{t('hero.title')}</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('hero.subtitle')}</p>
                <div className="flex flex-wrap gap-4 justify-center pt-4">
                  <Button size="lg" className="gap-2 shadow-premium" onClick={() => setIsModalOpen(true)}>
                    {t('hero.cta1')}<ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => { trackInsightCtaClick('hero', t('hero.cta2')); handleNavigateToInsight(); }}>
                    {t('hero.cta2')}
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center space-y-6 animate-slide-up">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t('about.title')}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{t('about.text')}</p>
              </div>
            </div>
          </section>

          {/* Who We Help */}
          <section className="py-20 bg-gradient-to-b from-background to-blue-soft/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">{t('help.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {helpCards.map((item, index) => (
                  <Card key={index} className="p-6 hover:shadow-hover transition-all duration-300 hover:-translate-y-1 bg-card border-border">
                    <div className="w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2 text-lg">{t(`help.${item.key}.title`)}</h3>
                    <p className="text-sm text-muted-foreground">{t(`help.${item.key}.text`)}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Services */}
          <section id="services" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">{t('services.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {services.map((service, index) => (
                  <Card key={index} className="p-8 hover:shadow-hover transition-all duration-300 hover:-translate-y-1 text-center bg-card">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold mb-3 text-xl">{t(`services.${service.key}.title`)}</h3>
                    <p className="text-muted-foreground">{t(`services.${service.key}.text`)}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-20 bg-gradient-to-b from-background to-green-soft/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">{t('why.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
                {whyItems.map((item, index) => (
                  <Card key={index} className="p-6 text-center hover:shadow-hover transition-all duration-300 hover:-translate-y-1 bg-card">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <p className="font-medium text-sm">{t(`why.${item.key}`)}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <HowWeHelpSection />

          {/* Insight Product Preview */}
          <section className="py-20 bg-background relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
            <div className="container mx-auto px-4">
              <Card className="max-w-5xl mx-auto p-8 lg:p-12 shadow-premium border-2 border-primary/10 bg-gradient-to-br from-card to-blue-soft/30">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 text-sm font-medium">Product</div>
                    <h2 className="text-3xl lg:text-4xl font-bold">{t('insight.preview.title')}</h2>
                    <p className="text-lg font-semibold text-primary">{t('insight.preview.subtitle')}</p>
                    <p className="text-muted-foreground">{t('insight.preview.text')}</p>
                    <Button onClick={() => { trackInsightCtaClick('insight-preview', t('insight.preview.cta')); handleNavigateToInsight(); }} className="gap-2 mt-4">
                      {t('insight.preview.cta')}<ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="relative h-[300px] flex items-center justify-center">
                    <FloatingShape type="sphere" color="green" size={200} speed={5} />
                    <FloatingShape type="ring" color="blue" size={150} speed={4} />
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">{t('faq.title')}</h2>
              <Accordion type="single" collapsible className="max-w-3xl mx-auto">
                {homeFaqItems.map((item) => (
                  <AccordionItem key={item.key} value={item.key}>
                    <AccordionTrigger className="text-left font-semibold">{t(`faq.${item.key}.q`)}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{t(`faq.${item.key}.a`)}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* CTA Section */}
          <section id="contact" className="py-20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center space-y-8">
                <h2 className="text-3xl lg:text-4xl font-bold">{t('cta.title')}</h2>
                <p className="text-lg text-muted-foreground">{t('cta.subtitle')}</p>
                <ConsultationForm />
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </>
  );
}
