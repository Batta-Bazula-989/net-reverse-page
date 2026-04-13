import { useEffect, useState, useMemo } from 'react';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, ChevronDown, ChevronUp, Mail, ArrowLeft } from 'lucide-react';
import { SocialIcons } from '@/components/SocialIcons';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { t, localePath } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const pathAfterLang = location.pathname.replace(/^\/(en|ru|uk)/, '') || '/';
  const isHome = pathAfterLang === '/' || pathAfterLang === '';
  const isInsight = pathAfterLang === '/insight';
  const [productsOpen, setProductsOpen] = useState(false);

  const homeSections = useMemo(() => ['about', 'services', 'how-we-help', 'faq', 'contact'], []);
  const insightSections = useMemo(() => ['insight-overview', 'insight-how', 'insight-features', 'pricing', 'insight-faq'], []);
  const activeSections = isInsight ? insightSections : isHome ? homeSections : [];
  const activeSection = useScrollSpy(activeSections, 120);

  const mobileNavClass = (id: string) =>
    `w-full text-left py-3 px-4 text-base font-medium rounded-lg transition-colors ${activeSection === id ? 'text-primary bg-primary/5' : 'hover:bg-muted'}`;

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleHomeNavClick = (id: string) => {
    onClose();
    if (!isHome) {
      navigate(localePath('/'));
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
      return;
    }
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300);
  };

  const handleInsightNavClick = (id: string) => {
    onClose();
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300);
  };

  const handlePageNavigation = (path: string) => {
    onClose();
    navigate(localePath(path));
    window.scrollTo(0, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={onClose} />
      <div className="absolute top-0 right-0 h-full w-3/4 max-w-sm bg-background shadow-2xl flex flex-col animate-slide-in-right" style={{ borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px' }}>
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors" aria-label="Close menu">
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        <nav className="flex-1 px-6 overflow-y-auto">
          <ul className="space-y-1">
            {isInsight ? (
              <>
                <li><button onClick={() => handlePageNavigation('/')} className="w-full flex items-center gap-2 py-3 px-4 text-base font-medium hover:bg-muted rounded-lg transition-colors"><ArrowLeft className="w-4 h-4" />{t('nav.backToHome')}</button></li>
                <li><button onClick={() => handleInsightNavClick('insight-overview')} className={mobileNavClass('insight-overview')}>{t('nav.overview')}</button></li>
                <li><button onClick={() => handleInsightNavClick('insight-how')} className={mobileNavClass('insight-how')}>{t('nav.howItWorks')}</button></li>
                <li><button onClick={() => handleInsightNavClick('insight-features')} className={mobileNavClass('insight-features')}>{t('nav.features')}</button></li>
                <li><button onClick={() => handleInsightNavClick('pricing')} className={mobileNavClass('pricing')}>{t('nav.pricing')}</button></li>
                <li><button onClick={() => handleInsightNavClick('insight-faq')} className={mobileNavClass('insight-faq')}>{t('nav.faq')}</button></li>
              </>
            ) : (
              <>
                <li><button onClick={() => handleHomeNavClick('about')} className={mobileNavClass('about')}>{t('nav.about')}</button></li>
                <li><button onClick={() => handleHomeNavClick('services')} className={mobileNavClass('services')}>{t('nav.services')}</button></li>
                <li>
                  <button onClick={() => setProductsOpen(!productsOpen)} className="w-full flex items-center justify-between py-3 px-4 text-base font-medium hover:bg-muted rounded-lg transition-colors">
                    <span>{t('nav.ourProducts')}</span>
                    {productsOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </button>
                  {productsOpen && (
                    <div className="ml-4 mt-1">
                      <button onClick={() => handlePageNavigation('/insight')} className="block w-full text-left py-2 px-4 text-sm font-medium rounded-lg transition-colors text-foreground hover:bg-muted">
                        {t('nav.insightDropdown')}
                      </button>
                    </div>
                  )}
                </li>
                <li><button onClick={() => handleHomeNavClick('how-we-help')} className={mobileNavClass('how-we-help')}>{t('nav.howWeHelp')}</button></li>
                <li><button onClick={() => handleHomeNavClick('faq')} className={mobileNavClass('faq')}>{t('nav.faq')}</button></li>
                <li><button onClick={() => handleHomeNavClick('contact')} className={mobileNavClass('contact')}>{t('nav.contacts')}</button></li>
              </>
            )}
          </ul>
        </nav>

        <div className="px-6 py-6 border-t border-border">
          <a href="mailto:netreverse.ai@gmail.com" className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <Mail className="w-5 h-5" />netreverse.ai@gmail.com
          </a>
          <div className="mt-4">
            <SocialIcons trackingLocation="Mobile Menu" />
          </div>
        </div>
      </div>
    </div>
  );
};
