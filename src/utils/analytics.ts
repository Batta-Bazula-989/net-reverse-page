// Google Tag Manager Configuration
// Replace 'GTM-XXXXXXX' with your actual GTM Container ID
export const GTM_CONTAINER_ID = 'GTM-XXXXXXX';

// TypeScript declarations for dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

// Initialize dataLayer
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
}

// Initialize GTM script
export const initGTM = () => {
  if (typeof window === 'undefined' || GTM_CONTAINER_ID === 'GTM-XXXXXXX') {
    console.warn('GTM: Container ID not configured. Skipping GTM initialization.');
    return;
  }

  // GTM script injection
  const script = document.createElement('script');
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
  `;
  document.head.insertBefore(script, document.head.firstChild);
};

// Generic event tracking function
export const trackEvent = (
  eventName: string,
  eventParams: Record<string, unknown> = {}
) => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...eventParams,
  });

  // Debug logging in development
  if (import.meta.env.DEV) {
    console.log(`[Analytics] Event: ${eventName}`, eventParams);
  }
};

// Page view tracking
export const trackPageView = (path: string, title?: string) => {
  trackEvent('page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });
};

// Consultation form events
export const trackConsultationFormOpen = (
  source: string,
  formGroup: string,
  formId: string,
  language: string,
  pagePath: string,
  selectedPlan?: string
) => {
  trackEvent('consultation_form_open', {
    form_source: source,
    form_group: formGroup,
    form_id: formId,
    language,
    page_path: pagePath,
    ...(selectedPlan !== undefined && { selected_plan: selectedPlan }),
  });
};

export const trackConsultationFormSubmit = (
  formId: string,
  formGroup: string,
  formSource: string,
  language: string,
  pagePath: string,
  selectedPlan?: string
) => {
  trackEvent('consultation_form_submit_success', {
    form_id: formId,
    form_group: formGroup,
    form_source: formSource,
    language,
    page_path: pagePath,
    ...(selectedPlan !== undefined && { selected_plan: selectedPlan }),
  });
};

// Insight CTA click
export const trackInsightCtaClick = (ctaLocation: string, ctaText: string) => {
  trackEvent('insight_cta_click', {
    cta_location: ctaLocation,
    cta_text: ctaText,
  });
};

// Pricing plan selection
export const trackPricingPlanSelect = (
  planId: string,
  planName: string,
  billingCycle: 'monthly' | 'yearly'
) => {
  trackEvent('pricing_plan_select', {
    plan_id: planId,
    plan_name: planName,
    billing_cycle: billingCycle,
  });
};

// Language switch
export const trackLanguageSwitch = (fromLang: string, toLang: string) => {
  trackEvent('language_switch', {
    from_language: fromLang,
    to_language: toLang,
  });
};

// Outbound link click
export const trackOutboundClick = (url: string, linkText: string) => {
  trackEvent('outbound_click', {
    outbound_url: url,
    link_text: linkText,
  });
};
