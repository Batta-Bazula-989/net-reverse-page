import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import type { Language } from '@/contexts/LanguageContext';

/** Map internal language to URL prefix */
export function langToUrl(lang: Language): string {
  return lang === 'ua' ? 'uk' : lang;
}

function detectLanguage(): Language {
  const saved = localStorage.getItem('language');
  if (saved === 'en' || saved === 'ru' || saved === 'ua') {
    return saved;
  }
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('ru')) return 'ru';
  if (browserLang.startsWith('uk')) return 'ua';
  return 'en';
}

export default function LanguageRedirect() {
  const lang = detectLanguage();
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://www.netreverse.com/en" />
      </Helmet>
      <Navigate to={`/${langToUrl(lang)}`} replace />
    </>
  );
}