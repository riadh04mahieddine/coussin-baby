// Fonctions pour suivre les événements TikTok

/**
 * Suit un événement de conversion TikTok
 * @param eventName - Nom de l'événement (ex: 'CompletePayment', 'AddToCart', etc.)
 * @param data - Données associées à l'événement
 */
export const trackTikTokEvent = (eventName: string, data?: any) => {
  if (typeof window !== 'undefined' && (window as any).ttq) {
    try {
      (window as any).ttq.track(eventName, data || {});
      console.log(`Événement TikTok suivi: ${eventName}`, data);
    } catch (error) {
      console.error(`Erreur lors du suivi de l'événement TikTok ${eventName}:`, error);
    }
  } else {
    console.warn('TikTok Pixel non initialisé');
  }
};

// Événements standards TikTok
export const TikTokEvents = {
  // Événements de navigation
  ViewContent: (data?: any) => trackTikTokEvent('ViewContent', data),
  ClickButton: (data?: any) => trackTikTokEvent('ClickButton', data),
  Search: (data?: any) => trackTikTokEvent('Search', data),
  
  // Événements de panier
  AddToCart: (data?: any) => trackTikTokEvent('AddToCart', data),
  AddToWishlist: (data?: any) => trackTikTokEvent('AddToWishlist', data),
  InitiateCheckout: (data?: any) => trackTikTokEvent('InitiateCheckout', data),
  
  // Événements de conversion
  PlaceAnOrder: (data?: any) => trackTikTokEvent('PlaceAnOrder', data),
  CompletePayment: (data?: any) => trackTikTokEvent('CompletePayment', data),
  Subscribe: (data?: any) => trackTikTokEvent('Subscribe', data),
  
  // Événements personnalisés
  Contact: (data?: any) => trackTikTokEvent('Contact', data),
  Download: (data?: any) => trackTikTokEvent('Download', data),
  SubmitForm: (data?: any) => trackTikTokEvent('SubmitForm', data),
};

export default TikTokEvents;
