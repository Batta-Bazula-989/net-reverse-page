import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail } from 'lucide-react';
import { trackOutboundClick } from '@/utils/analytics';
import { SocialIcons } from '@/components/SocialIcons';
import logo from '@/assets/nr-logo.png';

export const Footer = () => {
  const { t, localePath } = useLanguage();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 text-center md:text-left">
            <Link to={localePath('/')} className="inline-flex items-center gap-2 mb-4">
              <img src={logo} alt="Net Reverse" className="h-12 sm:h-14 md:h-16 w-auto object-contain" />
            </Link>
            <p className="text-sm text-muted-foreground">{t('footer.tagline')}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('footer.nav')}</h4>
            <nav aria-label="Footer navigation" className="flex flex-col gap-2">
              <Link to={localePath('/')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('footer.home')}
              </Link>
              <Link to={localePath('/insight')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Insight
              </Link>
              <Link to={localePath('/privacy')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('footer.privacy')}
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('footer.contact')}</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:netreverse.ai@gmail.com" onClick={() => trackOutboundClick('mailto:netreverse.ai@gmail.com', 'Email - Footer')} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" />
                netreverse.ai@gmail.com
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('footer.social')}</h4>
            <SocialIcons trackingLocation="Footer" />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Net Reverse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
