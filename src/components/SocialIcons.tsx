import { Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';
import { trackOutboundClick } from '@/utils/analytics';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const socials = [
  { name: 'Instagram', href: 'https://www.instagram.com/netreverseua/', icon: Instagram },
  { name: 'Facebook', href: 'https://www.facebook.com/netreverse', icon: Facebook },
  { name: 'TikTok', href: 'https://www.tiktok.com/@net.reverse', icon: TikTokIcon },
  { name: 'YouTube', href: 'https://www.youtube.com/@NetReverse', icon: Youtube },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/net-reverse', icon: Linkedin },
] as const;

interface SocialIconsProps {
  iconSize?: string;
  gap?: string;
  trackingLocation?: string;
}

export const SocialIcons = ({ iconSize = 'w-5 h-5', gap = 'gap-4', trackingLocation = 'Footer' }: SocialIconsProps) => (
  <div className={`flex items-center ${gap}`}>
    {socials.map(({ name, href, icon: Icon }) => (
      <a
        key={name}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOutboundClick(href, `${name} - ${trackingLocation}`)}
        className="text-muted-foreground hover:text-primary transition-colors"
        aria-label={name}
      >
        <Icon className={iconSize} />
      </a>
    ))}
  </div>
);
