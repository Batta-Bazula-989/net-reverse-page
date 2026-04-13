import { Navigate } from 'react-router-dom';
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
  return <Navigate to={`/${langToUrl(lang)}`} replace />;
}
