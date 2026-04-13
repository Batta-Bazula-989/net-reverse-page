import { useMemo } from 'react';
import { useLanguage, langToUrl } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { Mail } from 'lucide-react';
import { BackToTop } from '@/components/BackToTop';

const SITE_DOMAIN = 'www.netreverse.com';
const OWNER_NAME = 'Net Reverse';

export default function Privacy() {
  const { t, language } = useLanguage();

  const urlLang = langToUrl(language);
  const path = `/${urlLang}/privacy`;

  const hreflang = useMemo(() => [
    { lang: 'en', path: '/en/privacy' },
    { lang: 'ru', path: '/ru/privacy' },
    { lang: 'uk', path: '/uk/privacy' },
    { lang: 'x-default', path: '/en/privacy' },
  ], []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={t('privacy.meta.title')}
        description={t('privacy.meta.description')}
        path={path}
        hreflang={hreflang}
      />
      <Header />
      <BackToTop />
      <main className="container mx-auto px-4 py-16 md:py-24">
        <article className="mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {t('privacy.title')}
          </h1>
          <p className="text-sm text-muted-foreground mb-10">
            {t('privacy.lastUpdated')}
          </p>

          <div className="prose-custom space-y-8 text-foreground/90 leading-relaxed text-[0.95rem]">
            <p>{t('privacy.intro')}</p>
            <p>{t('privacy.consent')}</p>

            {/* Section 1 — with subsections */}
            <Section n="1" title={t('privacy.s1.title')}>
              <p>{t('privacy.s1.intro')}</p>
              <SubSection title={t('privacy.s1.sub1.title')}>
                <p>{t('privacy.s1.sub1.intro')}</p>
                <BulletList items={t('privacy.s1.sub1.items').split('|')} />
              </SubSection>
              <SubSection title={t('privacy.s1.sub2.title')}>
                <p>{t('privacy.s1.sub2.intro')}</p>
                <BulletList items={t('privacy.s1.sub2.items').split('|')} />
              </SubSection>
            </Section>

            {/* Section 2 */}
            <Section n="2" title={t('privacy.s2.title')}>
              <p>{t('privacy.s2.intro')}</p>
              <BulletList items={t('privacy.s2.items').split('|')} />
            </Section>

            {/* Section 3 */}
            <Section n="3" title={t('privacy.s3.title')}>
              <p>{t('privacy.s3.p1')}</p>
              <p>{t('privacy.s3.p2')}</p>
              <BulletList items={t('privacy.s3.tools').split('|')} />
              <p className="mt-3">{t('privacy.s3.p3')}</p>
            </Section>

            {/* Section 4 */}
            <Section n="4" title={t('privacy.s4.title')}>
              <p>{t('privacy.s4.p1')}</p>
              <p>{t('privacy.s4.p2')}</p>
            </Section>

            {/* Section 5 */}
            <Section n="5" title={t('privacy.s5.title')}>
              <p>{t('privacy.s5.intro')}</p>
              <BulletList items={t('privacy.s5.items').split('|')} />
            </Section>

            {/* Section 6 */}
            <Section n="6" title={t('privacy.s6.title')}>
              <p>{t('privacy.s6.p1')}</p>
              <p>{t('privacy.s6.p2')}</p>
              <BulletList items={t('privacy.s6.items').split('|')} />
              <p className="mt-3">{t('privacy.s6.p3')}</p>
            </Section>

            {/* Section 7 */}
            <Section n="7" title={t('privacy.s7.title')}>
              <p>{t('privacy.s7.intro')}</p>
              <BulletList items={t('privacy.s7.items').split('|')} />
              <p className="mt-3">{t('privacy.s7.p2')}</p>
            </Section>

            {/* Section 8 */}
            <Section n="8" title={t('privacy.s8.title')}>
              <p>{t('privacy.s8.intro')}</p>
              <BulletList items={t('privacy.s8.items').split('|')} />
              <p className="mt-3">{t('privacy.s8.p2')}</p>
            </Section>

            {/* Section 9 */}
            <Section n="9" title={t('privacy.s9.title')}>
              <p>{t('privacy.s9.p1')}</p>
            </Section>

            {/* Section 10 */}
            <Section n="10" title={t('privacy.s10.title')}>
              <p>{t('privacy.s10.intro')}</p>
              <BulletList items={t('privacy.s10.items').split('|')} />
              <p className="mt-3">{t('privacy.s10.howTo')}</p>
            </Section>

            {/* Section 11 */}
            <Section n="11" title={t('privacy.s11.title')}>
              <p>{t('privacy.s11.p1')}</p>
            </Section>

            {/* Section 12 */}
            <Section n="12" title={t('privacy.s12.title')}>
              <p>{t('privacy.s12.p1')}</p>
            </Section>

            {/* Section 13 */}
            <Section n="13" title={t('privacy.s13.title')}>
              <p>{t('privacy.s13.intro')}</p>
              <div className="mt-3 p-5 rounded-xl bg-card border border-border">
                <p className="font-semibold text-foreground">{OWNER_NAME}</p>
                <a
                  href="mailto:netreverse.ai@gmail.com"
                  className="inline-flex items-center gap-2 text-primary hover:underline mt-1"
                >
                  <Mail className="w-4 h-4" />
                  netreverse.ai@gmail.com
                </a>
                <p className="mt-1 text-muted-foreground text-sm">
                  {t('privacy.s13.website')}: https://{SITE_DOMAIN}
                </p>
              </div>
            </Section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg md:text-xl font-semibold text-foreground mb-3">
        {n}. {title}
      </h2>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside space-y-1 pl-1 mt-2">
      {items.map((item, i) => (
        <li key={i} className="text-foreground/90">{item.trim()}</li>
      ))}
    </ul>
  );
}
