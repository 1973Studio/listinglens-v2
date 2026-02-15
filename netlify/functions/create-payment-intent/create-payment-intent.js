// ============================================================
// LISTING LENS — CREATE PAYMENT INTENT (Netlify Function)
// Creates an Airwallex PaymentIntent for $5 in the user's currency
// ============================================================

const AIRWALLEX_API_URL = process.env.AIRWALLEX_ENV === 'prod'
  ? 'https://api.airwallex.com'
  : 'https://api-demo.airwallex.com';

// Currency map — $5 equivalent in each currency
// JPY and KRW have no decimal places
const CURRENCY_AMOUNTS = {
  AUD: 500,   // $5.00
  USD: 500,   // $5.00
  GBP: 500,   // £5.00
  EUR: 500,   // €5.00
  SGD: 500,   // $5.00
  NZD: 500,   // $5.00
  CAD: 500,   // $5.00
  HKD: 500,   // $5.00
  JPY: 500,   // ¥500 (no decimals)
  KRW: 5000,  // ₩5000 (no decimals)
  CHF: 500,   // 5.00 CHF
  SEK: 5000,  // 50.00 SEK (approx $5)
  NOK: 5000,  // 50.00 NOK (approx $5)
  DKK: 3500,  // 35.00 DKK (approx $5)
  INR: 42000, // ₹420.00 (approx $5)
  MYR: 2300,  // RM23.00 (approx $5)
  THB: 17500, // ฿175.00 (approx $5)
  PHP: 28000, // ₱280.00 (approx $5)
  IDR: 7500000, // Rp75,000 (approx $5, no decimals)
  CNY: 3600,  // ¥36.00 (approx $5)
};

// Zero-decimal currencies (amount is in whole units, not cents)
const ZERO_DECIMAL_CURRENCIES = ['JPY', 'KRW', 'IDR'];

// Map country to default currency
const COUNTRY_CURRENCY = {
  'Australia': 'AUD',
  'United States': 'USD',
  'United Kingdom': 'GBP',
  'Canada': 'CAD',
  'New Zealand': 'NZD',
  'Singapore': 'SGD',
  'Germany': 'EUR',
  'France': 'EUR',
  'Italy': 'EUR',
  'Spain': 'EUR',
  'Netherlands': 'EUR',
  'Ireland': 'EUR',
  'Austria': 'EUR',
  'Belgium': 'EUR',
  'Finland': 'EUR',
  'Portugal': 'EUR',
  'Greece': 'EUR',
  'Japan': 'JPY',
  'South Korea': 'KRW',
  'Hong Kong': 'HKD',
  'Switzerland': 'CHF',
  'Sweden': 'SEK',
  'Norway': 'NOK',
  'Denmark': 'DKK',
  'India': 'INR',
  'Malaysia': 'MYR',
  'Thailand': 'THB',
  'Philippines': 'PHP',
  'Indonesia': 'IDR',
  'China': 'CNY',
};

// Get Airwallex access token
async function getAccessToken() {
  const response = await fetch(`${AIRWALLEX_API_URL}/api/v1/authentication/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-client-id': process.env.AIRWALLEX_CLIENT_ID,
      'x-api-key': process.env.AIRWALLEX_API_KEY,
    },
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Airwallex auth failed: ${response.status} — ${err}`);
  }

  const data = await response.json();
  return data.token;
}

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { country, category } = JSON.parse(event.body);

    // Determine currency from country
    const currency = COUNTRY_CURRENCY[country] || 'AUD';
    const amountRaw = CURRENCY_AMOUNTS[currency] || 500;

    // Airwallex expects amount in major units (e.g. 5.00, not 500)
    // EXCEPT for zero-decimal currencies where 500 means ¥500
    const amount = ZERO_DECIMAL_CURRENCIES.includes(currency)
      ? amountRaw
      : amountRaw / 100;

    // Generate unique request ID
    const requestId = `ll-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;

    // Get access token
    const token = await getAccessToken();

    // Create PaymentIntent
    const intentResponse = await fetch(`${AIRWALLEX_API_URL}/api/v1/pa/payment_intents/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        request_id: requestId,
        amount: amount,
        currency: currency,
        merchant_order_id: `LL-${Date.now()}`,
        metadata: {
          product: 'listing_lens_report',
          country: country,
          category: category,
        },
        return_url: `${process.env.URL || 'https://listinglens.app'}/dashboard.html?payment=success`,
      }),
    });

    if (!intentResponse.ok) {
      const err = await intentResponse.text();
      console.error('Airwallex intent creation failed:', err);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Payment setup failed. Please try again.' }),
      };
    }

    const intent = await intentResponse.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        intentId: intent.id,
        clientSecret: intent.client_secret,
        currency: currency,
        amount: amount,
        displayAmount: ZERO_DECIMAL_CURRENCIES.includes(currency)
          ? `${currency} ${amount}`
          : `${currency} ${amount.toFixed(2)}`,
      }),
    };

  } catch (error) {
    console.error('create-payment-intent error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
