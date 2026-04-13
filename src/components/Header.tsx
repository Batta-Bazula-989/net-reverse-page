import { useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, Menu, ArrowLeft } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import logo from '@/assets/nr-logo.png';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, localePath } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect page from URL (strip language prefix)
  const pathAfterLang = location.pathname.replace(/^\/(en|ru|uk)/, '') || '/';
  const isHome = pathAfterLang === '/' || pathAfterLang === '';
  const isInsight = pathAfterLang === '/insight';

  const homeSections = useMemo(() => ['about', 'services', 'how-we-help', 'faq', 'contact'], []);
  const insightSections = useMemo(() => ['insight-overview', 'insight-how', 'insight-features', 'pricing', 'insight-faq'], []);
  const activeSections = isInsight ? insightSections : isHome ? homeSections : [];
  const activeSection = useScrollSpy(activeSections, 120);

  const navClass = (id: string) =>
    `text-sm font-medium transition-colors ${activeSection === id ? 'text-primary' : 'hover:text-primary'}`;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHomeNavClick = (id: string) => {
    if (!isHome) {
      navigate(localePath('/'));
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    scrollToSection(id);
  };

  const handleInsightNavClick = (id: string) => scrollToSection(id);

  const handlePageNavigation = (path: string) => {
    navigate(localePath(path));
    window.scrollTo(0, 0);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to={localePath('/')} className="flex items-center gap-2">
            <img src={logo} alt="Net Reverse" className="h-9 sm:h-10 md:h-12 w-auto object-contain" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {isInsight ? (
              <>
                <button onClick={() => handlePageNavigation('/')} className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" />{t('nav.backToHome')}
                </button>
                <button onClick={() => handleInsightNavClick('insight-overview')} className={navClass('insight-overview')}>{t('nav.overview')}</button>
                <button onClick={() => handleInsightNavClick('insight-how')} className={navClass('insight-how')}>{t('nav.howItWorks')}</button>
                <button onClick={() => handleInsightNavClick('insight-features')} className={navClass('insight-features')}>{t('nav.features')}</button>
                <button onClick={() => handleInsightNavClick('pricing')} className={navClass('pricing')}>{t('nav.pricing')}</button>
                <button onClick={() => handleInsightNavClick('insight-faq')} className={navClass('insight-faq')}>{t('nav.faq')}</button>
              </>
            ) : (
              <>
                <button onClick={() => handleHomeNavClick('about')} className={navClass('about')}>{t('nav.about')}</button>
                <button onClick={() => handleHomeNavClick('services')} className={navClass('services')}>{t('nav.services')}</button>
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
                    {t('nav.ourProducts')}<ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background border border-border shadow-lg">
                    <DropdownMenuItem onClick={() => handlePageNavigation('/insight')} className="cursor-pointer">
                      {t('nav.insightDropdown')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <button onClick={() => handleHomeNavClick('how-we-help')} className={navClass('how-we-help')}>{t('nav.howWeHelp')}</button>
                <button onClick={() => handleHomeNavClick('faq')} className={navClass('faq')}>{t('nav.faq')}</button>
                <button onClick={() => handleHomeNavClick('contact')} className={navClass('contact')}>{t('nav.contacts')}</button>
              </>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Open menu">
              <Menu className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};
