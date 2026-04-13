import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { trackLanguageSwitch } from '@/utils/analytics';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'ua', label: 'UA' },
  ];

  const handleLanguageChange = (newLang: Language) => {
    if (newLang !== language) {
      trackLanguageSwitch(language, newLang);
      setLanguage(newLang);
    }
  };

  return (
    <div className="flex gap-1">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={language === lang.code ? 'default' : 'ghost'}
          size="sm"
          onClick={() => handleLanguageChange(lang.code)}
          className="h-8 px-3 text-sm"
        >
          {lang.label}
        </Button>
      ))}
    </div>
  );
};
