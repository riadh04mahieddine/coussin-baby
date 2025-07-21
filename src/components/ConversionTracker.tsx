'use client';

import { useEffect } from 'react';
import TikTokEvents from './TikTokEvents';

interface ConversionTrackerProps {
  orderValue?: number;
  productName?: string;
  orderId?: string;
}

export default function ConversionTracker({ 
  orderValue = 19.99, 
  productName = 'Coussin de Protection Bébé',
  orderId 
}: ConversionTrackerProps) {
  useEffect(() => {
    // Suivre l'événement de conversion CompletePayment
    TikTokEvents.CompletePayment({
      value: orderValue,
      currency: 'EUR',
      content_name: productName,
      content_id: 'coussin-baby-1',
      content_type: 'product',
      order_id: orderId || `order-${Date.now()}`, // Générer un ID si non fourni
      quantity: 1
    });
    
    console.log('Conversion TikTok enregistrée:', {
      value: orderValue,
      currency: 'EUR',
      content_name: productName
    });
  }, [orderValue, productName, orderId]);

  // Ce composant ne rend rien visuellement
  return null;
}
