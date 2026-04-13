import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, ZoomIn, Monitor, FileText, Video, LayoutGrid } from 'lucide-react';

import img1 from '@/assets/insight-gallery/insight-analysis-start-add-competitors.png';
import img2 from '@/assets/insight-gallery/insight-workspace-after-launch.png';
import img3 from '@/assets/insight-gallery/insight-interface-ad-card-text-video-summary.png';
import img4 from '@/assets/insight-gallery/insight-interface-competitor-comparison-workspace.png';
import img5 from '@/assets/insight-gallery/insight-interface-fullscreen-view-download-creative.png';
import txtImg1 from '@/assets/insight-gallery/insight-copywriting-offer-specificity-structure.png';
import txtImg2 from '@/assets/insight-gallery/insight-marketing-offer-funnel-consistency-originality.png';
import txtImg3 from '@/assets/insight-gallery/insight-mini-swot-creative-recommendations.png';
import txtImg4 from '@/assets/insight-gallery/insight-psychology-drivers-hook-storytelling-persuasion.png';
import txtImg5 from '@/assets/insight-gallery/insight-sales-value-proposition-cta-risk-reverse-pricing.png';
import txtImg6 from '@/assets/insight-gallery/insight-metrics-forecast-rotation-insight-novelty.png';
import txtImg7 from '@/assets/insight-gallery/insight-inline-recommendations-text-improvements.png';
import txtImg8 from '@/assets/insight-gallery/insight-quick-wins-tactical-strategic-ideas.png';
import vidImg1 from '@/assets/insight-gallery/insight-video-technical-quality-subtitles.png';
import vidImg2 from '@/assets/insight-gallery/insight-video-visuals-editing-pace-scenes.png';
import vidImg3 from '@/assets/insight-gallery/insight-video-people-product-branding.png';
import vidImg4 from '@/assets/insight-gallery/insight-video-marketing-psychology-funnel.png';
import vidImg5 from '@/assets/insight-gallery/insight-video-sales-cta-pricing-metrics.png';
import vidImg6 from '@/assets/insight-gallery/insight-video-recommendations-summary.png';
import carImg1 from '@/assets/insight-gallery/insight-carousel-technical-quality-card-focus.png';
import carImg2 from '@/assets/insight-gallery/insight-carousel-text-layout-characters-balance.png';
import carImg3 from '@/assets/insight-gallery/insight-carousel-sequence-visual-logic-composition.png';
import carImg4 from '@/assets/insight-gallery/insight-carousel-branding-marketing-offer-funnel-hook-usp-archetype.png';
import carImg5 from '@/assets/insight-gallery/insight-carousel-sales-metrics-value-cta-pricing-rotation-novelty.png';
import carImg6 from '@/assets/insight-gallery/insight-carousel-recommendations-must-have-nice-to-have-fatigue.png';

type CategoryKey = 'interface' | 'text' | 'video' | 'carousel';

const categories: { key: CategoryKey; icon: typeof Monitor; images: string[] }[] = [
  { key: 'interface', icon: Monitor, images: [img1, img2, img3, img4, img5] },
  { key: 'text', icon: FileText, images: [txtImg1, txtImg2, txtImg3, txtImg4, txtImg5, txtImg6, txtImg7, txtImg8] },
  { key: 'video', icon: Video, images: [vidImg1, vidImg2, vidImg3, vidImg4, vidImg5, vidImg6] },
  { key: 'carousel', icon: LayoutGrid, images: [carImg1, carImg2, carImg3, carImg4, carImg5, carImg6] },
];

export function InsightGallery() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('interface');
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const currentCat = useMemo(() => categories.find(c => c.key === activeCategory)!, [activeCategory]);
  const currentImages = currentCat.images;

  // Pinch-to-zoom state
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const touchStateRef = useRef<{
    lastDist: number;
    lastCenter: { x: number; y: number };
    isPinching: boolean;
    startTouch: { x: number; y: number } | null;
    startTranslate: { x: number; y: number };
    lastTap: number;
  }>({
    lastDist: 0, lastCenter: { x: 0, y: 0 }, isPinching: false,
    startTouch: null, startTranslate: { x: 0, y: 0 }, lastTap: 0,
  });

  const isZoomed = scale > 1.05;

  const switchCategory = useCallback((key: CategoryKey) => {
    setActiveCategory(key);
    setActiveIndex(0);
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + currentImages.length) % currentImages.length);
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, [currentImages.length]);

  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  const resetZoom = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setLightboxOpen(false); resetZoom(); }
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxOpen, prev, next, resetZoom]);

  useEffect(() => {
    if (lightboxOpen) { document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  useEffect(() => { if (!lightboxOpen) resetZoom(); }, [lightboxOpen, resetZoom]);

  useEffect(() => {
    const h = () => resetZoom();
    window.addEventListener('orientationchange', h);
    window.addEventListener('resize', h);
    return () => { window.removeEventListener('orientationchange', h); window.removeEventListener('resize', h); };
  }, [resetZoom]);

  const getTouchDist = (t1: React.Touch, t2: React.Touch) =>
    Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
  const getTouchCenter = (t1: React.Touch, t2: React.Touch) => ({
    x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2,
  });

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const ts = touchStateRef.current;
    if (e.touches.length === 2) {
      e.preventDefault(); ts.isPinching = true;
      ts.lastDist = getTouchDist(e.touches[0], e.touches[1]);
      ts.lastCenter = getTouchCenter(e.touches[0], e.touches[1]);
    } else if (e.touches.length === 1) {
      ts.isPinching = false;
      ts.startTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      ts.startTranslate = { ...translate };
      const now = Date.now();
      if (now - ts.lastTap < 300) {
        e.preventDefault();
        if (isZoomed) { setScale(1); setTranslate({ x: 0, y: 0 }); }
        else { setScale(2.5); setTranslate({ x: 0, y: 0 }); }
        ts.lastTap = 0;
      } else { ts.lastTap = now; }
    }
  }, [translate, isZoomed]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const ts = touchStateRef.current;
    if (e.touches.length === 2 && ts.isPinching) {
      e.preventDefault();
      const newDist = getTouchDist(e.touches[0], e.touches[1]);
      setScale(s => Math.min(5, Math.max(1, s * (newDist / ts.lastDist))));
      ts.lastDist = newDist;
      const nc = getTouchCenter(e.touches[0], e.touches[1]);
      setTranslate(t => ({ x: t.x + nc.x - ts.lastCenter.x, y: t.y + nc.y - ts.lastCenter.y }));
      ts.lastCenter = nc;
    } else if (e.touches.length === 1 && isZoomed && ts.startTouch) {
      e.preventDefault();
      setTranslate({
        x: ts.startTranslate.x + e.touches[0].clientX - ts.startTouch.x,
        y: ts.startTranslate.y + e.touches[0].clientY - ts.startTouch.y,
      });
    }
  }, [isZoomed]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const ts = touchStateRef.current;
    if (e.touches.length < 2) ts.isPinching = false;
    if (e.touches.length === 0) {
      ts.startTouch = null;
      if (scale < 1.05) { setScale(1); setTranslate({ x: 0, y: 0 }); }
    }
  }, [scale]);

  const swipeRef = useRef<{ startX: number; startY: number } | null>(null);
  const handleSwipeStart = useCallback((e: React.TouchEvent) => {
    if (isZoomed || e.touches.length !== 1) return;
    swipeRef.current = { startX: e.touches[0].clientX, startY: e.touches[0].clientY };
  }, [isZoomed]);
  const handleSwipeEnd = useCallback((e: React.TouchEvent) => {
    if (isZoomed || !swipeRef.current || e.changedTouches.length === 0) return;
    const dx = e.changedTouches[0].clientX - swipeRef.current.startX;
    const dy = e.changedTouches[0].clientY - swipeRef.current.startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { dx > 0 ? prev() : next(); }
    swipeRef.current = null;
  }, [isZoomed, prev, next]);

  const caption = t(`product.gallery.${activeCategory}.caption.${activeIndex + 1}`);
  const altText = t(`product.gallery.${activeCategory}.alt.${activeIndex + 1}`);

  const pageArrowClasses = "absolute top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-soft hover:bg-primary/90 active:bg-primary/80 focus:bg-primary/90 border-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-6">
          {t('product.gallery.title')}
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          {t('product.gallery.subtitle')}
        </p>

        {/* Category pills */}
        <div className="flex gap-2 mb-8 max-w-4xl mx-auto justify-center flex-wrap" role="tablist" aria-label={t('product.gallery.title')}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => switchCategory(cat.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {t(`product.gallery.tab.${cat.key}`)}
              </button>
            );
          })}
        </div>

        {/* Main gallery */}
        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden shadow-soft bg-card">
            <div className="relative group">
              <div
                className="cursor-pointer relative"
                onClick={() => setLightboxOpen(true)}
                role="button"
                tabIndex={0}
                aria-label="Open enlarged view"
                onKeyDown={(e) => e.key === 'Enter' && setLightboxOpen(true)}
              >
                <img
                  src={currentImages[activeIndex]}
                  alt={altText}
                  className="w-full h-auto block"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 rounded-full p-3 shadow-soft">
                    <ZoomIn className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>

              <Button variant="default" size="icon" className={`${pageArrowClasses} left-3`}
                onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous screenshot">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button variant="default" size="icon" className={`${pageArrowClasses} right-3`}
                onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next screenshot">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="px-6 py-4 flex items-center justify-between gap-4">
              <p className="text-sm sm:text-base text-foreground font-medium flex-1">{caption}</p>
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {activeIndex + 1} / {currentImages.length}
              </span>
            </div>
          </Card>

          <div className="flex justify-center gap-2 mt-4">
            {currentImages.map((_, i) => (
              <button key={i} onClick={() => { setActiveIndex(i); resetZoom(); }}
                aria-label={`Go to screenshot ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === activeIndex ? 'bg-primary scale-110' : 'bg-border hover:bg-muted-foreground/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Screenshot lightbox">
          <div className="absolute inset-0 bg-black/90"
            onClick={() => { if (!isZoomed) { setLightboxOpen(false); resetZoom(); } }} />

          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30">
            <Button variant="ghost" size="icon"
              className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white border-0"
              onClick={() => { setLightboxOpen(false); resetZoom(); }} aria-label="Close lightbox">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <Button variant="ghost" size="icon"
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white border-0 z-20"
              onClick={prev} aria-label="Previous screenshot">
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <div ref={imgContainerRef}
              className="w-full h-full flex items-center justify-center overflow-hidden touch-none"
              onTouchStart={(e) => { handleTouchStart(e); handleSwipeStart(e); }}
              onTouchMove={handleTouchMove}
              onTouchEnd={(e) => { handleTouchEnd(e); handleSwipeEnd(e); }}
            >
              <img src={currentImages[activeIndex]} alt={altText}
                className="max-w-full max-h-full object-contain select-none" draggable={false}
                style={{
                  transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
                  transition: scale === 1 ? 'transform 0.2s ease-out' : 'none',
                  transformOrigin: 'center center',
                }}
              />
            </div>

            <Button variant="ghost" size="icon"
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white border-0 z-20"
              onClick={next} aria-label="Next screenshot">
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 p-2 sm:p-4 flex flex-col items-center gap-1 pointer-events-none">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 sm:px-6 sm:py-2 pointer-events-auto">
              <Button variant="ghost" size="icon"
                className="h-8 w-8 rounded-full text-white hover:bg-white/20 border-0 sm:hidden"
                onClick={prev} aria-label="Previous screenshot">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <span className="text-sm text-white font-medium whitespace-nowrap">
                {activeIndex + 1} / {currentImages.length}
              </span>
              <Button variant="ghost" size="icon"
                className="h-8 w-8 rounded-full text-white hover:bg-white/20 border-0 sm:hidden"
                onClick={next} aria-label="Next screenshot">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs sm:text-sm text-white/70 text-center max-w-2xl px-4 line-clamp-2">{caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}
