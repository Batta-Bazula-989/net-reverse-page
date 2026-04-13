import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { initGTM, trackPageView } from '@/utils/analytics';

export const AnalyticsTracker = () => {
  const location = useLocation();
  const isInitialized = useRef(false);
  const lastTrackedPath = useRef<string | null>(null);

  // Initialize GTM on mount
  useEffect(() => {
    if (!isInitialized.current) {
      initGTM();
      isInitialized.current = true;
    }
  }, []);

  // Track page views on route changes
  useEffect(() => {
    // Avoid duplicate tracking for the same path
    if (lastTrackedPath.current !== location.pathname) {
      trackPageView(location.pathname);
      lastTrackedPath.current = location.pathname;
    }
  }, [location.pathname]);

  return null;
};
