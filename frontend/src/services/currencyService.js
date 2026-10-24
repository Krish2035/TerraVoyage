// Live Currency Conversion & Travel Cost of Living Estimator

// Standard base exchange rates against USD
export const GLOBAL_EXCHANGE_RATES = {
  'USD': 1.0,
  'EUR': 0.92,
  'GBP': 0.79,
  'INR': 83.45,
  'JPY': 154.20,
  'AUD': 1.52,
  'CAD': 1.37,
  'CNY': 7.24,
  'CHF': 0.89,
  'AED': 3.67,
  'SAR': 3.75,
  'AFN': 70.80,
  'SGD': 1.34,
  'BRL': 5.25,
  'RUB': 92.50,
  'ZAR': 18.60,
  'KRW': 1360.0,
  'TRY': 32.40,
  'EGP': 47.80,
  'MXN': 16.90,
  'THB': 36.80,
  'IDR': 16250.0,
  'VND': 25400.0,
  'PHP': 57.60,
  'PKR': 278.50,
  'BDT': 117.20,
  'KZT': 445.0,
  'UZS': 12650.0,
  'QAR': 3.64,
  'KWD': 0.31,
  'OMR': 0.38,
  'BHD': 0.38,
  'ILS': 3.72,
  'NZD': 1.66,
  'SEK': 10.75,
  'NOK': 10.85,
  'DKK': 6.88,
  'PLN': 3.98,
  'CZK': 23.30,
  'HUF': 362.0,
  'ARS': 880.0,
  'CLP': 940.0,
  'COP': 3890.0,
  'PEN': 3.74,
  'MAD': 10.05,
  'KES': 132.0,
  'NGN': 1420.0,
  'GHS': 14.50
};

export const SOURCE_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham' }
];

// Extract currency code from country currency string e.g. "Afghan Afghani (AFN) ؋" -> "AFN"
export function extractCurrencyCode(currencyString) {
  if (!currencyString) return 'USD';
  const match = currencyString.match(/\b([A-Z]{3})\b/);
  if (match) return match[1];
  
  // Quick checks
  if (currencyString.toLowerCase().includes('afghani')) return 'AFN';
  if (currencyString.toLowerCase().includes('euro')) return 'EUR';
  if (currencyString.toLowerCase().includes('dollar')) return 'USD';
  if (currencyString.toLowerCase().includes('pound')) return 'GBP';
  if (currencyString.toLowerCase().includes('rupee')) return 'INR';
  if (currencyString.toLowerCase().includes('yen')) return 'JPY';
  if (currencyString.toLowerCase().includes('dirham')) return 'AED';
  if (currencyString.toLowerCase().includes('riyal')) return 'SAR';
  return 'USD';
}

// Convert amount between currencies
export function convertCurrency(amount, fromCode, toCode) {
  const fromRate = GLOBAL_EXCHANGE_RATES[fromCode] || 1.0;
  const toRate = GLOBAL_EXCHANGE_RATES[toCode] || 1.0;

  // Convert to USD first, then to target
  const inUSD = amount / fromRate;
  const converted = inUSD * toRate;

  return {
    fromAmount: amount,
    fromCode,
    toAmount: converted,
    toCode,
    rate: toRate / fromRate
  };
}

// Daily Cost of Living & Travel Budget Estimator
export function estimateTravelCosts(country) {
  if (!country) return null;

  // Parse Per Capita Income if present
  let pciNumber = 2000;
  if (country.perCapitaIncome) {
    const raw = String(country.perCapitaIncome).replace(/[^0-9]/g, '');
    if (raw) pciNumber = parseInt(raw, 10);
  }

  // Tier classification based on Per Capita Income & Region
  let multiplier = 1.0;
  let tierLabel = 'Moderate Value';

  if (pciNumber > 40000 || country.region === 'North America' || country.region === 'Europe') {
    multiplier = 2.2;
    tierLabel = 'High-Income / Premium Economy';
  } else if (pciNumber > 12000) {
    multiplier = 1.4;
    tierLabel = 'Upper-Middle Range';
  } else if (pciNumber > 4000) {
    multiplier = 1.0;
    tierLabel = 'Great Travel Value';
  } else {
    multiplier = 0.65;
    tierLabel = 'Exceptional Budget Haven';
  }

  const budgetDailyUSD = Math.round(30 * multiplier);
  const midRangeDailyUSD = Math.round(95 * multiplier);
  const luxuryDailyUSD = Math.round(280 * multiplier);

  return {
    tierLabel,
    currencySymbol: '$',
    tiers: [
      {
        name: 'Backpacker / Budget',
        icon: '🎒',
        usdPerDay: budgetDailyUSD,
        includes: 'Hostels, local transit, authentic street dining & open monuments'
      },
      {
        name: 'Comfort / Mid-Range',
        icon: '🏨',
        usdPerDay: midRangeDailyUSD,
        includes: '3-4 star boutique hotels, casual sit-down bistros, guided day tours'
      },
      {
        name: 'Luxury / Executive',
        icon: '✨',
        usdPerDay: luxuryDailyUSD,
        includes: '5-star luxury resorts, private vehicle & chauffeur, fine dining'
      }
    ]
  };
}
