import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
  en: { title: "Page not found", text: "It looks like this page does not exist or the link is outdated.", button: "Back to Home" },
  ru: { title: "Страница не найдена", text: "Похоже, такой страницы не существует или ссылка устарела.", button: "На главную" },
  ua: { title: "Сторінку не знайдено", text: "Схоже, такої сторінки не існує або посилання застаріло.", button: "На головну" },
};

const NotFound = () => {
  const location = useLocation();
  const { language, localePath } = useLanguage();
  const t = content[language] || content.en;

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <p className="text-7xl sm:text-8xl font-bold text-primary/20 mb-4 select-none">404</p>
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-3">{t.title}</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">{t.text}</p>
        <Link
          to={localePath('/')}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
        >
          {t.button}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
