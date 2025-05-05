import { PixResponse } from '../types';

const XTRACKY_API_URL = 'https://api.xtracky.com/api/integrations/api';

export async function trackPaymentEvent(
  orderId: string,
  amount: number,
  status: 'waiting_payment' | 'paid'
) {
  try {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source') || '';

    const payload = {
      orderId,
      amount, // Value in cents
      status,
      utm_source: utmSource
    };

    const response = await fetch(XTRACKY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Tracking failed: ${response.status}`);
    }

    console.log(`Successfully tracked ${status} event for order ${orderId}`);
  } catch (error) {
    console.error('Error tracking payment event:', error);
  }
}