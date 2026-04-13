import { Routes, Route } from 'react-router-dom';
import { LanguageProvider, type Language } from '@/contexts/LanguageContext';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { ScrollToTop } from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import Insight from '@/pages/Insight';
import Privacy from '@/pages/Privacy';
import NotFound from '@/pages/NotFound';

interface Props {
  urlLang: 'en' | 'ru' | 'uk';
}

function urlToLang(urlLang: 'en' | 'ru' | 'uk'): Language {
  return urlLang === 'uk' ? 'ua' : urlLang;
}

export default function LanguageLayout({ urlLang }: Props) {
  return (
    <LanguageProvider urlLang={urlToLang(urlLang)}>
      <AnalyticsTracker />
      <ScrollToTop />
      <Routes>
        <Route index element={<Home />} />
        <Route path="insight" element={<Insight />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LanguageProvider>
  );
}
