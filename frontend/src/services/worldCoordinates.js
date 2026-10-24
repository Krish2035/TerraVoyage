// World Coordinates, Currencies, and Anthem Registry for TerraVoyage

export const COUNTRY_COORDINATES = {
  // Asia
  AF: { lat: 34.5553, lng: 69.2075, capital: 'Kabul' },
  AM: { lat: 40.1792, lng: 44.4991, capital: 'Yerevan' },
  AZ: { lat: 40.4093, lng: 49.8671, capital: 'Baku' },
  BH: { lat: 26.2285, lng: 50.5860, capital: 'Manama' },
  BD: { lat: 23.8103, lng: 90.4125, capital: 'Dhaka' },
  BT: { lat: 27.4728, lng: 89.6393, capital: 'Thimphu' },
  BN: { lat: 4.9031, lng: 114.9398, capital: 'Bandar Seri Begawan' },
  KH: { lat: 11.5564, lng: 104.9282, capital: 'Phnom Penh' },
  CN: { lat: 39.9042, lng: 116.4074, capital: 'Beijing' },
  CY: { lat: 35.1856, lng: 33.3823, capital: 'Nicosia' },
  GE: { lat: 41.7151, lng: 44.8271, capital: 'Tbilisi' },
  IN: { lat: 28.6139, lng: 77.2090, capital: 'New Delhi' },
  ID: { lat: -6.2088, lng: 106.8456, capital: 'Jakarta' },
  IR: { lat: 35.6892, lng: 51.3890, capital: 'Tehran' },
  IQ: { lat: 33.3152, lng: 44.3661, capital: 'Baghdad' },
  IL: { lat: 31.7683, lng: 35.2137, capital: 'Jerusalem' },
  JP: { lat: 35.6762, lng: 139.6503, capital: 'Tokyo' },
  JO: { lat: 31.9454, lng: 35.9284, capital: 'Amman' },
  KZ: { lat: 51.1694, lng: 71.4491, capital: 'Astana' },
  KW: { lat: 29.3759, lng: 47.9774, capital: 'Kuwait City' },
  KG: { lat: 42.8746, lng: 74.5698, capital: 'Bishkek' },
  LA: { lat: 17.9757, lng: 102.6331, capital: 'Vientiane' },
  LB: { lat: 33.8938, lng: 35.5018, capital: 'Beirut' },
  MY: { lat: 3.1390, lng: 101.6869, capital: 'Kuala Lumpur' },
  MV: { lat: 4.1755, lng: 73.5093, capital: 'Male' },
  MN: { lat: 47.8864, lng: 106.9057, capital: 'Ulaanbaatar' },
  MM: { lat: 19.7633, lng: 96.0785, capital: 'Naypyidaw' },
  NP: { lat: 27.7172, lng: 85.3240, capital: 'Kathmandu' },
  KP: { lat: 39.0392, lng: 125.7625, capital: 'Pyongyang' },
  OM: { lat: 23.5880, lng: 58.3829, capital: 'Muscat' },
  PK: { lat: 33.6844, lng: 73.0479, capital: 'Islamabad' },
  PH: { lat: 14.5995, lng: 120.9842, capital: 'Manila' },
  QA: { lat: 25.2854, lng: 51.5310, capital: 'Doha' },
  SA: { lat: 24.7136, lng: 46.6753, capital: 'Riyadh' },
  SG: { lat: 1.3521, lng: 103.8198, capital: 'Singapore' },
  KR: { lat: 37.5665, lng: 126.9780, capital: 'Seoul' },
  LK: { lat: 6.9271, lng: 79.8612, capital: 'Colombo' },
  SY: { lat: 33.5138, lng: 36.2765, capital: 'Damascus' },
  TW: { lat: 25.0330, lng: 121.5654, capital: 'Taipei' },
  TJ: { lat: 38.5598, lng: 68.7870, capital: 'Dushanbe' },
  TH: { lat: 13.7563, lng: 100.5018, capital: 'Bangkok' },
  TL: { lat: -8.5569, lng: 125.5603, capital: 'Dili' },
  TR: { lat: 39.9334, lng: 32.8597, capital: 'Ankara' },
  TM: { lat: 37.9601, lng: 58.3261, capital: 'Ashgabat' },
  AE: { lat: 24.4539, lng: 54.3773, capital: 'Abu Dhabi' },
  UZ: { lat: 41.2995, lng: 69.2401, capital: 'Tashkent' },
  VN: { lat: 21.0285, lng: 105.8542, capital: 'Hanoi' },
  YE: { lat: 15.3694, lng: 44.1910, capital: 'Sanaa' },

  // Europe
  AL: { lat: 41.3275, lng: 19.8187, capital: 'Tirana' },
  AD: { lat: 42.5063, lng: 1.5218, capital: 'Andorra la Vella' },
  AT: { lat: 48.2082, lng: 16.3738, capital: 'Vienna' },
  BY: { lat: 53.9045, lng: 27.5615, capital: 'Minsk' },
  BE: { lat: 50.8503, lng: 4.3517, capital: 'Brussels' },
  BA: { lat: 43.8563, lng: 18.4131, capital: 'Sarajevo' },
  BG: { lat: 42.6977, lng: 23.3219, capital: 'Sofia' },
  HR: { lat: 45.8150, lng: 15.9819, capital: 'Zagreb' },
  CZ: { lat: 50.0755, lng: 14.4378, capital: 'Prague' },
  DK: { lat: 55.6761, lng: 12.5683, capital: 'Copenhagen' },
  EE: { lat: 59.4370, lng: 24.7535, capital: 'Tallinn' },
  FI: { lat: 60.1699, lng: 24.9384, capital: 'Helsinki' },
  FR: { lat: 48.8566, lng: 2.3522, capital: 'Paris' },
  DE: { lat: 52.5200, lng: 13.4050, capital: 'Berlin' },
  GR: { lat: 37.9838, lng: 23.7275, capital: 'Athens' },
  HU: { lat: 47.4979, lng: 19.0402, capital: 'Budapest' },
  IS: { lat: 64.1466, lng: -21.9426, capital: 'Reykjavik' },
  IE: { lat: 53.3498, lng: -6.2603, capital: 'Dublin' },
  IT: { lat: 41.9028, lng: 12.4964, capital: 'Rome' },
  LV: { lat: 56.9496, lng: 24.1052, capital: 'Riga' },
  LI: { lat: 47.1410, lng: 9.5209, capital: 'Vaduz' },
  LT: { lat: 54.6872, lng: 25.2797, capital: 'Vilnius' },
  LU: { lat: 49.6116, lng: 6.1319, capital: 'Luxembourg City' },
  MT: { lat: 35.8989, lng: 14.5146, capital: 'Valletta' },
  MD: { lat: 47.0105, lng: 28.8638, capital: 'Chisinau' },
  MC: { lat: 43.7384, lng: 7.4246, capital: 'Monaco' },
  ME: { lat: 42.4304, lng: 19.2594, capital: 'Podgorica' },
  NL: { lat: 52.3676, lng: 4.9041, capital: 'Amsterdam' },
  MK: { lat: 41.9973, lng: 21.4280, capital: 'Skopje' },
  NO: { lat: 59.9139, lng: 10.7522, capital: 'Oslo' },
  PL: { lat: 52.2297, lng: 21.0122, capital: 'Warsaw' },
  PT: { lat: 38.7223, lng: -9.1393, capital: 'Lisbon' },
  RO: { lat: 44.4268, lng: 26.1025, capital: 'Bucharest' },
  RU: { lat: 55.7558, lng: 37.6173, capital: 'Moscow' },
  SM: { lat: 43.9424, lng: 12.4578, capital: 'San Marino' },
  RS: { lat: 44.7866, lng: 20.4489, capital: 'Belgrade' },
  SK: { lat: 48.1486, lng: 17.1077, capital: 'Bratislava' },
  SI: { lat: 46.0569, lng: 14.5058, capital: 'Ljubljana' },
  ES: { lat: 40.4168, lng: -3.7038, capital: 'Madrid' },
  SE: { lat: 59.3293, lng: 18.0686, capital: 'Stockholm' },
  CH: { lat: 46.9480, lng: 7.4474, capital: 'Bern' },
  UA: { lat: 50.4501, lng: 30.5234, capital: 'Kyiv' },
  GB: { lat: 51.5074, lng: -0.1278, capital: 'London' },
  VA: { lat: 41.9029, lng: 12.4534, capital: 'Vatican City' },

  // Americas
  AR: { lat: -34.6037, lng: -58.3816, capital: 'Buenos Aires' },
  BS: { lat: 25.0443, lng: -77.3504, capital: 'Nassau' },
  BB: { lat: 13.1939, lng: -59.5432, capital: 'Bridgetown' },
  BZ: { lat: 17.2510, lng: -88.7590, capital: 'Belmopan' },
  BO: { lat: -16.4897, lng: -68.1193, capital: 'La Paz' },
  BR: { lat: -15.7975, lng: -47.8919, capital: 'Brasilia' },
  CA: { lat: 45.4215, lng: -75.6972, capital: 'Ottawa' },
  CL: { lat: -33.4489, lng: -70.6693, capital: 'Santiago' },
  CO: { lat: 4.7110, lng: -74.0721, capital: 'Bogota' },
  CR: { lat: 9.9281, lng: -84.0907, capital: 'San Jose' },
  CU: { lat: 23.1136, lng: -82.3666, capital: 'Havana' },
  DO: { lat: 18.4861, lng: -69.9312, capital: 'Santo Domingo' },
  EC: { lat: -0.1807, lng: -78.4678, capital: 'Quito' },
  SV: { lat: 13.6929, lng: -89.2182, capital: 'San Salvador' },
  GT: { lat: 14.6349, lng: -90.5069, capital: 'Guatemala City' },
  HT: { lat: 18.5944, lng: -72.3074, capital: 'Port-au-Prince' },
  HN: { lat: 14.0723, lng: -87.1921, capital: 'Tegucigalpa' },
  JM: { lat: 17.9712, lng: -76.7936, capital: 'Kingston' },
  MX: { lat: 19.4326, lng: -99.1332, capital: 'Mexico City' },
  NI: { lat: 12.1150, lng: -86.2362, capital: 'Managua' },
  PA: { lat: 8.9824, lng: -79.5199, capital: 'Panama City' },
  PY: { lat: -25.2637, lng: -57.5759, capital: 'Asuncion' },
  PE: { lat: -12.0464, lng: -77.0428, capital: 'Lima' },
  TT: { lat: 10.6549, lng: -61.5019, capital: 'Port of Spain' },
  US: { lat: 38.9072, lng: -77.0369, capital: 'Washington, D.C.' },
  UY: { lat: -34.9011, lng: -56.1645, capital: 'Montevideo' },
  VE: { lat: 10.4806, lng: -66.9036, capital: 'Caracas' },

  // Africa
  DZ: { lat: 36.7538, lng: 3.0588, capital: 'Algiers' },
  AO: { lat: -8.8390, lng: 13.2894, capital: 'Luanda' },
  BW: { lat: -24.6282, lng: 25.9231, capital: 'Gaborone' },
  CM: { lat: 3.8480, lng: 11.5021, capital: 'Yaounde' },
  CD: { lat: -4.4419, lng: 15.2663, capital: 'Kinshasa' },
  EG: { lat: 30.0444, lng: 31.2357, capital: 'Cairo' },
  ET: { lat: 9.0300, lng: 38.7400, capital: 'Addis Ababa' },
  GH: { lat: 5.6037, lng: -0.1870, capital: 'Accra' },
  KE: { lat: -1.2921, lng: 36.8219, capital: 'Nairobi' },
  MG: { lat: -18.8792, lng: 47.5079, capital: 'Antananarivo' },
  MU: { lat: -20.1609, lng: 57.5012, capital: 'Port Louis' },
  MA: { lat: 34.020882, lng: -6.841650, capital: 'Rabat' },
  MZ: { lat: -25.9692, lng: 32.5732, capital: 'Maputo' },
  NA: { lat: -22.5597, lng: 17.0832, capital: 'Windhoek' },
  NG: { lat: 9.0765, lng: 7.3986, capital: 'Abuja' },
  RW: { lat: -1.9706, lng: 30.1044, capital: 'Kigali' },
  SN: { lat: 14.7167, lng: -17.4677, capital: 'Dakar' },
  SC: { lat: -4.6191, lng: 55.4513, capital: 'Victoria' },
  ZA: { lat: -25.7479, lng: 28.2293, capital: 'Pretoria' },
  TZ: { lat: -6.1630, lng: 35.7516, capital: 'Dodoma' },
  TN: { lat: 36.8065, lng: 10.1815, capital: 'Tunis' },
  UG: { lat: 0.3476, lng: 32.5825, capital: 'Kampala' },
  ZM: { lat: -15.3875, lng: 28.3228, capital: 'Lusaka' },
  ZW: { lat: -17.8252, lng: 31.0335, capital: 'Harare' },

  // Oceania
  AU: { lat: -35.2809, lng: 149.1300, capital: 'Canberra' },
  FJ: { lat: -18.1416, lng: 178.4419, capital: 'Suva' },
  NZ: { lat: -41.2865, lng: 174.7762, capital: 'Wellington' },
  PG: { lat: -9.4438, lng: 147.1803, capital: 'Port Moresby' },
  WS: { lat: -13.8333, lng: -171.7667, capital: 'Apia' },
  VU: { lat: -17.7333, lng: 168.3273, capital: 'Port Vila' }
};

// Fallback coordinates helper
export function getCountryCoordinates(country) {
  if (!country) return { lat: 20, lng: 0 };
  const code = (country.code || '').toUpperCase();
  if (COUNTRY_COORDINATES[code]) {
    return COUNTRY_COORDINATES[code];
  }
  // Approximate based on region
  const region = (country.region || '').toLowerCase();
  if (region.includes('europe')) return { lat: 48, lng: 15 };
  if (region.includes('asia')) return { lat: 34, lng: 100 };
  if (region.includes('africa')) return { lat: 0, lng: 20 };
  if (region.includes('north america')) return { lat: 40, lng: -100 };
  if (region.includes('south america')) return { lat: -15, lng: -60 };
  if (region.includes('oceania')) return { lat: -25, lng: 135 };
  if (region.includes('middle east')) return { lat: 25, lng: 45 };
  return { lat: 20, lng: 0 };
}

// Global currency codes mapping
export const CURRENCY_RATES = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.25,
  JPY: 151.40,
  AUD: 1.52,
  CAD: 1.36,
  CHF: 0.91,
  CNY: 7.23,
  SGD: 1.35,
  AED: 3.67,
  SAR: 3.75,
  THB: 36.80,
  MYR: 4.75,
  BRL: 5.15,
  MXN: 16.70,
  ZAR: 18.90,
  KRW: 1365.0,
  IDR: 16200.0,
  VND: 25400.0,
  RUB: 92.50,
  NZD: 1.67,
  TRY: 32.40,
  EGP: 47.90
};

// Extract currency code from text e.g. "Japanese Yen (¥) JPY" -> "JPY"
export function extractCurrencyCode(currencyStr) {
  if (!currencyStr) return 'USD';
  const match = currencyStr.match(/\b([A-Z]{3})\b/);
  if (match) return match[1];

  const lower = currencyStr.toLowerCase();
  if (lower.includes('yen')) return 'JPY';
  if (lower.includes('euro')) return 'EUR';
  if (lower.includes('pound')) return 'GBP';
  if (lower.includes('rupee')) return 'INR';
  if (lower.includes('dollar') && lower.includes('australian')) return 'AUD';
  if (lower.includes('dollar') && lower.includes('canadian')) return 'CAD';
  if (lower.includes('dollar')) return 'USD';
  if (lower.includes('yuan') || lower.includes('renminbi')) return 'CNY';
  if (lower.includes('dirham')) return 'AED';
  if (lower.includes('riyal')) return 'SAR';
  if (lower.includes('baht')) return 'THB';
  if (lower.includes('ringgit')) return 'MYR';
  if (lower.includes('franc')) return 'CHF';
  if (lower.includes('won')) return 'KRW';
  if (lower.includes('peso')) return 'MXN';
  return 'USD';
}

// SpeechSynthesis Voice Language mapping
export function getLanguageCodeForCountry(country) {
  if (!country) return 'en-US';
  const code = (country.code || '').toUpperCase();
  const languages = (country.languages || '').toLowerCase();

  const map = {
    // Pashto / Dari (Afghanistan)
    AF: 'ps-AF',
    // Chinese
    CN: 'zh-CN', TW: 'zh-TW', HK: 'zh-HK', MO: 'zh-MO', SG: 'zh-CN',
    // Japanese
    JP: 'ja-JP',
    // Korean
    KR: 'ko-KR', KP: 'ko-KR',
    // French
    FR: 'fr-FR', MC: 'fr-FR', BE: 'fr-BE', SN: 'fr-FR', CI: 'fr-FR', CD: 'fr-FR',
    // German
    DE: 'de-DE', AT: 'de-AT', CH: 'de-CH', LI: 'de-DE', LU: 'de-DE',
    // Spanish
    ES: 'es-ES', MX: 'es-MX', AR: 'es-AR', CO: 'es-CO', CL: 'es-CL',
    PE: 'es-PE', VE: 'es-VE', EC: 'es-EC', GT: 'es-GT', CU: 'es-CU',
    DO: 'es-DO', BO: 'es-BO', HN: 'es-HN', PY: 'es-PY', SV: 'es-SV',
    NI: 'es-NI', CR: 'es-CR', PA: 'es-PA', UY: 'es-UY',
    // Italian
    IT: 'it-IT', SM: 'it-IT', VA: 'it-IT',
    // Hindi
    IN: 'hi-IN',
    // Urdu
    PK: 'ur-PK',
    // Bengali
    BD: 'bn-BD',
    // Russian
    RU: 'ru-RU', BY: 'ru-RU', KZ: 'ru-RU', KG: 'ru-RU', TJ: 'tg-TJ', UZ: 'uz-UZ',
    // Portuguese
    BR: 'pt-BR', PT: 'pt-PT', AO: 'pt-PT', MZ: 'pt-PT',
    // Arabic
    SA: 'ar-SA', AE: 'ar-AE', EG: 'ar-EG', QA: 'ar-QA', KW: 'ar-KW',
    OM: 'ar-OM', BH: 'ar-BH', JO: 'ar-JO', LB: 'ar-LB', IQ: 'ar-IQ',
    MA: 'ar-MA', DZ: 'ar-DZ', TN: 'ar-TN', LY: 'ar-LY', SD: 'ar-SD',
    YE: 'ar-YE', SY: 'ar-SY',
    // Turkish & Azerbaijani
    TR: 'tr-TR', AZ: 'az-AZ',
    // Thai
    TH: 'th-TH',
    // Vietnamese
    VN: 'vi-VN',
    // Indonesian / Malay
    ID: 'id-ID', MY: 'ms-MY', BN: 'ms-MY',
    // Dutch
    NL: 'nl-NL', SR: 'nl-NL',
    // Greek
    GR: 'el-GR', CY: 'el-GR',
    // Polish
    PL: 'pl-PL',
    // Scandinavian
    SE: 'sv-SE', NO: 'nb-NO', DK: 'da-DK', FI: 'fi-FI', IS: 'is-IS',
    // Ukrainian
    UA: 'uk-UA',
    // Czech & Slovak
    CZ: 'cs-CZ', SK: 'sk-SK',
    // Hungarian
    HU: 'hu-HU',
    // Romanian
    RO: 'ro-RO', MD: 'ro-RO',
    // Bulgarian
    BG: 'bg-BG',
    // South Slavic (Croatian, Serbian, Bosnian)
    HR: 'hr-HR', RS: 'sr-RS', BA: 'bs-BA', ME: 'sr-ME', MK: 'mk-MK', SI: 'sl-SI',
    // Albanian
    AL: 'sq-AL',
    // Armenian
    AM: 'hy-AM',
    // Georgian
    GE: 'ka-GE',
    // Persian
    IR: 'fa-IR',
    // Hebrew
    IL: 'he-IL',
    // Amharic
    ET: 'am-ET',
    // Khmer, Burmese, Lao
    KH: 'km-KH', MM: 'my-MM', LA: 'lo-LA',
    // Nepali
    NP: 'ne-NP',
    // Sri Lanka (Sinhala / Tamil)
    LK: 'si-LK',
    // Philippines
    PH: 'fil-PH',
    // Mongolia
    MN: 'mn-MN',
    // Swahili
    KE: 'sw-KE', TZ: 'sw-TZ', UG: 'sw-UG',
    // English
    US: 'en-US', GB: 'en-GB', AU: 'en-AU', NZ: 'en-NZ', IE: 'en-IE', ZA: 'en-ZA', CA: 'en-CA'
  };

  if (map[code]) return map[code];

  if (languages.includes('pashto') || languages.includes('dari')) return 'ps-AF';
  if (languages.includes('chinese') || languages.includes('mandarin')) return 'zh-CN';
  if (languages.includes('japanese')) return 'ja-JP';
  if (languages.includes('korean')) return 'ko-KR';
  if (languages.includes('spanish') || languages.includes('español')) return 'es-ES';
  if (languages.includes('french') || languages.includes('français')) return 'fr-FR';
  if (languages.includes('german') || languages.includes('deutsch')) return 'de-DE';
  if (languages.includes('italian')) return 'it-IT';
  if (languages.includes('hindi')) return 'hi-IN';
  if (languages.includes('bengali')) return 'bn-BD';
  if (languages.includes('urdu')) return 'ur-PK';
  if (languages.includes('persian') || languages.includes('farsi')) return 'fa-IR';
  if (languages.includes('hebrew')) return 'he-IL';
  if (languages.includes('arabic')) return 'ar-SA';
  if (languages.includes('russian')) return 'ru-RU';
  if (languages.includes('portuguese')) return 'pt-BR';
  if (languages.includes('thai')) return 'th-TH';
  if (languages.includes('vietnamese')) return 'vi-VN';
  if (languages.includes('indonesian') || languages.includes('malay')) return 'id-ID';
  if (languages.includes('turkish')) return 'tr-TR';
  if (languages.includes('greek')) return 'el-GR';
  if (languages.includes('dutch')) return 'nl-NL';
  if (languages.includes('polish')) return 'pl-PL';
  if (languages.includes('ukrainian')) return 'uk-UA';
  if (languages.includes('czech')) return 'cs-CZ';
  if (languages.includes('slovak')) return 'sk-SK';
  if (languages.includes('hungarian')) return 'hu-HU';
  if (languages.includes('romanian')) return 'ro-RO';
  if (languages.includes('bulgarian')) return 'bg-BG';
  if (languages.includes('croatian') || languages.includes('serbian')) return 'hr-HR';
  if (languages.includes('swahili')) return 'sw-KE';

  return 'en-US';
}

