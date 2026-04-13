import { useParams, Navigate, Routes, Route } from 'react-router-dom';
import { LanguageProvider, type Language } from '@/contexts/LanguageContext';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { ScrollToTop } from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import Insight from '@/pages/Insight';
import Privacy from '@/pages/Privacy';
import NotFound from '@/pages/NotFound';

/** Map URL prefix to internal Language type */
function urlToLang(urlLang: string | undefined): Language | null {
  switch (urlLang) {
    case 'en': return 'en';
    case 'ru': return 'ru';
    case 'uk': return 'ua';
    default: return null;
  }
}

export default function LanguageLayout() {
  const { lang } = useParams<{ lang: string }>();
  const language = urlToLang(lang);

  if (!language) {
    return <Navigate to="/en" replace />;
  }

  return (
    <LanguageProvider urlLang={language}>
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
