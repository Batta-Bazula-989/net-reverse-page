import { useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, PhoneIncoming, Shuffle, BarChart3, Search } from 'lucide-react';

const scenarioIcons = [PhoneIncoming, Shuffle, BarChart3, Search];
const scenarioKeys = ['1', '2', '3', '4'];

export const HowWeHelpSection = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  const prev = useCallback(() => setActive((i) => (i === 0 ? 3 : i - 1)), []);
  const next = useCallback(() => setActive((i) => (i === 3 ? 0 : i + 1)), []);

  return (
    <section id="how-we-help" className="py-20 bg-gradient-to-b from-green-soft/30 to-background">
      <div className="container mx-auto px-4">
        {/* Title + Subtitle */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <h2 className="text-3xl lg:text-4xl font-bold">{t('howWeHelp.title')}</h2>
          <p className="text-lg text-muted-foreground">{t('howWeHelp.subtitle')}</p>
        </div>

        {/* Tabs / Pills */}
        <div
          className="flex justify-center gap-2 mb-8 max-w-4xl mx-auto overflow-x-auto pb-2 scrollbar-hide"
          role="tablist"
          aria-label={t('howWeHelp.title')}
        >
          {scenarioKeys.map((key, i) => {
            const Icon = scenarioIcons[i];
            const isActive = active === i;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                aria-controls={`scenario-panel-${key}`}
                id={`scenario-tab-${key}`}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {t(`howWeHelp.tab.${key}`)}
              </button>
            );
          })}
        </div>

        {/* Scenario Cards — all in DOM for SEO */}
        <div className="relative max-w-4xl mx-auto">
          {/* Left Arrow */}
          <button
            onClick={prev}
            aria-label="Previous scenario"
            className="absolute -left-4 lg:-left-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-sm flex items-center justify-center hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={next}
            aria-label="Next scenario"
            className="absolute -right-4 lg:-right-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-sm flex items-center justify-center hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          {scenarioKeys.map((key, i) => {
            const Icon = scenarioIcons[i];
            return (
              <div
                key={key}
                id={`scenario-panel-${key}`}
                role="tabpanel"
                aria-labelledby={`scenario-tab-${key}`}
                className={active === i ? 'block' : 'sr-only'}
              >
                <Card className="p-6 sm:p-8 lg:p-10 bg-card border-border shadow-sm">
                  {/* Scenario title */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground pt-1">
                      {t(`howWeHelp.${key}.title`)}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Problem */}
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                        {t('howWeHelp.label.problem')}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {t(`howWeHelp.${key}.problem`)}
                      </p>
                    </div>

                    {/* What we can do */}
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                        {t('howWeHelp.label.whatWeDo')}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {t(`howWeHelp.${key}.whatWeDo`)}
                      </p>
                    </div>

                    {/* Relevant for */}
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                        {t('howWeHelp.label.relevantFor')}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {t(`howWeHelp.${key}.relevantFor`)}
                      </p>
                    </div>

                    {/* What this gives */}
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                        {t('howWeHelp.label.whatGives')}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {t(`howWeHelp.${key}.whatGives`)}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {scenarioKeys.map((key, i) => (
              <button
                key={key}
                onClick={() => setActive(i)}
                aria-label={`Go to scenario ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  active === i ? 'bg-primary w-6' : 'bg-border hover:bg-muted-foreground/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
