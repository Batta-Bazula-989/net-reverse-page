import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlanSelectionModal } from './PlanSelectionModal';
import { trackPricingPlanSelect } from '@/utils/analytics';

type PlanType = 'pilot' | 'standard' | 'business';

export const PricingSection = () => {
  const { t } = useLanguage();
  const [isYearly, setIsYearly] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePlanSelect = (plan: PlanType, planName: string) => {
    trackPricingPlanSelect(plan, planName, isYearly ? 'yearly' : 'monthly');
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const plans = [
    {
      id: 'pilot' as PlanType,
      title: 'Pilot (7 days)',
      price: '$99',
      priceLabel: t('pricing.oneTime'),
      description: t('pricing.pilot.desc'),
      features: [
        t('pricing.pilot.feature1'),
        t('pricing.pilot.feature2'),
        t('pricing.pilot.feature3'),
        t('pricing.pilot.feature4'),
      ],
      button: t('pricing.pilot.button'),
      highlighted: false,
    },
    {
      id: 'standard' as PlanType,
      title: 'Standard',
      price: '$299',
      priceLabel: t('pricing.oneTime'),
      subscription: isYearly ? '$296 / ' + t('pricing.year') : '$29 / ' + t('pricing.month'),
      description: t('pricing.standard.desc'),
      features: [
        t('pricing.standard.feature1'),
        t('pricing.standard.feature2'),
        t('pricing.standard.feature3'),
        t('pricing.standard.feature4'),
        t('pricing.standard.feature5'),
      ],
      button: t('pricing.standard.button'),
      highlighted: true,
      badge: t('pricing.mostPopular'),
    },
    {
      id: 'business' as PlanType,
      title: 'Business',
      price: '$499',
      priceLabel: t('pricing.oneTime'),
      subscription: isYearly ? '$500 / ' + t('pricing.year') : '$49 / ' + t('pricing.month'),
      description: t('pricing.business.desc'),
      features: [
        t('pricing.business.feature1'),
        t('pricing.business.feature2'),
        t('pricing.business.feature3'),
        t('pricing.business.feature4'),
      ],
      button: t('pricing.business.button'),
      highlighted: false,
    },
  ];

  return (
    <>
      <section
        id="pricing"
        ref={sectionRef}
        className="py-20 bg-[#FAFAFA]"
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <div
            className={cn(
              "text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('pricing.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('pricing.subtitle')}
            </p>
          </div>

          {/* Toggle */}
          <div
            className={cn(
              "flex justify-center mb-12 transition-all duration-700 ease-out delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="inline-flex items-center p-1 bg-card border border-border rounded-full shadow-sm">
              <button
                onClick={() => setIsYearly(false)}
                className={cn(
                  "relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ease-out min-w-[100px]",
                  !isYearly
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t('pricing.monthly')}
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={cn(
                  "relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ease-out min-w-[100px] flex items-center gap-2",
                  isYearly
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{t('pricing.yearly')}</span>
                <span className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full transition-colors duration-300",
                  isYearly ? "bg-accent text-accent-foreground" : "bg-accent/20 text-accent"
                )}>
                  {t('pricing.save15')}
                </span>
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={plan.id}
                className={cn(
                  "relative p-6 lg:p-8 flex flex-col transition-all duration-700 ease-out",
                  plan.highlighted
                    ? "border-2 border-primary shadow-premium bg-card"
                    : "border border-border shadow-soft bg-card hover:shadow-hover",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{
                  transitionDelay: isVisible ? `${150 + index * 100}ms` : '0ms',
                  borderRadius: '18px',
                }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-block px-4 py-1 text-xs font-bold uppercase tracking-wide bg-primary text-primary-foreground rounded-full shadow-md">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan Title */}
                <h3 className="text-xl font-bold text-foreground mb-2 mt-2">
                  {plan.title}
                </h3>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl lg:text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {plan.priceLabel}
                    </span>
                  </div>
                  {plan.subscription && (
                    <div className="mt-2">
                      <span className="text-lg font-semibold text-primary">
                        + {plan.subscription}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t('pricing.month2Note')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  onClick={() => handlePlanSelect(plan.id, plan.title)}
                  className={cn(
                    "w-full py-6 text-base font-semibold transition-all duration-200",
                    plan.highlighted
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
                      : "bg-card border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  )}
                  style={{ borderRadius: '12px' }}
                >
                  {plan.button}
                </Button>
              </Card>
            ))}
          </div>

          {/* Footnote */}
          <div
            className={cn(
              "text-center max-w-3xl mx-auto mt-10 transition-all duration-700 ease-out delay-500",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <p className="text-sm text-muted-foreground">
              {t('pricing.footnote')}
            </p>
          </div>
        </div>
      </section>

      {/* Plan Selection Modal */}
      <PlanSelectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedPlan={selectedPlan}
        isYearly={isYearly}
      />
    </>
  );
};
