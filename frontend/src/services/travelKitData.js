// TerraVoyage Travel Kit Data Registry: Visa Policies, Plugs, Emergency Numbers, Timezones, and Native Phrases

// 1. Common Passport Origins
export const PASSPORT_ORIGINS = [
  { code: 'US', name: 'United States 🇺🇸' },
  { code: 'IN', name: 'India 🇮🇳' },
  { code: 'GB', name: 'United Kingdom 🇬🇧' },
  { code: 'DE', name: 'Germany 🇩🇪' },
  { code: 'CA', name: 'Canada 🇨🇦' },
  { code: 'AU', name: 'Australia 🇦🇺' },
  { code: 'JP', name: 'Japan 🇯🇵' },
  { code: 'FR', name: 'France 🇫🇷' },
  { code: 'AE', name: 'United Arab Emirates 🇦🇪' },
  { code: 'BR', name: 'Brazil 🇧🇷' },
  { code: 'SG', name: 'Singapore 🇸🇬' }
];

// 2. Visa Policy Database & Lookup
export function getVisaRequirements(passportCode, destinationCountry) {
  if (!destinationCountry) return null;
  const destCode = (destinationCountry.code || '').toUpperCase();
  const passCode = (passportCode || 'US').toUpperCase();

  // If same country
  if (passCode === destCode) {
    return {
      status: 'citizen',
      badge: '🟢 Citizen / Domestic Travel',
      color: '#10b981',
      maxStay: 'Unlimited',
      details: 'No visa or passport required for domestic travel within your home nation.',
      requirements: ['National ID / Driver License', 'Domestic flight booking']
    };
  }

  // Strong passports (US, DE, GB, JP, SG, FR, CA, AU)
  const strongPassports = ['US', 'DE', 'GB', 'JP', 'SG', 'FR', 'CA', 'AU'];
  const isStrong = strongPassports.includes(passCode);

  // Schengen countries
  const schengen = ['FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI', 'PT', 'GR', 'CZ', 'PL', 'HU'];

  if (schengen.includes(destCode)) {
    if (schengen.includes(passCode)) {
      return {
        status: 'freedom',
        badge: '🟢 Freedom of Movement (EU/EEA)',
        color: '#10b981',
        maxStay: 'Unlimited',
        details: 'Freedom of movement within Schengen Area with valid National ID or Passport.',
        requirements: ['EU National ID or Passport']
      };
    }
    if (isStrong) {
      return {
        status: 'visa-free',
        badge: '🟢 Visa-Free (Schengen)',
        color: '#10b981',
        maxStay: '90 days per 180 days',
        details: 'Visa-free entry for tourism and business. ETIAS authorization required prior to boarding.',
        requirements: ['Valid Passport (3+ months beyond stay)', 'Return Flight Ticket', 'Proof of Accommodation', 'Travel Medical Insurance (€30,000 min)']
      };
    }
    return {
      status: 'embassy-visa',
      badge: '🔴 Schengen Visa Required',
      color: '#f43f5e',
      maxStay: 'Up to 90 days',
      details: 'Must apply for a standard Schengen C-Type Visa at the destination embassy or VFS Global.',
      requirements: ['Valid Passport (6+ months)', 'Schengen Application Form', 'Flight Itinerary', 'Hotel Bookings', 'Bank Statements (3 months)', 'Travel Insurance (€30,000)']
    };
  }

  // Japan destination
  if (destCode === 'JP') {
    if (['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'SG'].includes(passCode)) {
      return {
        status: 'visa-free',
        badge: '🟢 Visa-Free Entry',
        color: '#10b981',
        maxStay: '90 Days',
        details: 'Short-term visa exemption for tourism. Complete Visit Japan Web QR code before arrival.',
        requirements: ['Passport valid for period of stay', 'Return ticket', 'Visit Japan Web registration']
      };
    }
    return {
      status: 'evisa',
      badge: '🔵 eVisa Available',
      color: '#38bdf8',
      maxStay: 'Up to 90 Days',
      details: 'Eligible for Japanese Tourist eVisa online prior to travel.',
      requirements: ['Valid Passport (6+ months)', 'Digital Photo', 'Roundtrip Flight Proof', 'Financial proof']
    };
  }

  // India destination
  if (destCode === 'IN') {
    if (['US', 'GB', 'DE', 'FR', 'CA', 'AU', 'JP', 'SG'].includes(passCode)) {
      return {
        status: 'evisa',
        badge: '🔵 Indian e-Tourist Visa',
        color: '#38bdf8',
        maxStay: '30 Days / 1 Year / 5 Years',
        details: 'Quick electronic visa applied online at indianvisaonline.gov.in. Issued within 72 hours.',
        requirements: ['Passport (6 months validity)', 'Digital Photo with white background', 'Copy of Passport bio page', 'Printout of ETA upon arrival']
      };
    }
    return {
      status: 'embassy-visa',
      badge: '🔴 Regular / eVisa Required',
      color: '#f43f5e',
      maxStay: '30–90 Days',
      details: 'Check official e-Visa portal or apply via Indian diplomatic mission.',
      requirements: ['Valid Passport', 'Passport photos', 'Proof of funds', 'Confirmed travel itinerary']
    };
  }

  // UAE destination
  if (destCode === 'AE') {
    if (isStrong) {
      return {
        status: 'voa',
        badge: '🟡 Free Visa on Arrival (30 Days)',
        color: '#f59e0b',
        maxStay: '30 Days (Extendable)',
        details: 'Stamp issued free of charge at Dubai (DXB) or Abu Dhabi (AUH) immigration counters.',
        requirements: ['Passport valid for 6 months', 'Confirmed onward ticket']
      };
    }
    return {
      status: 'evisa',
      badge: '🔵 30/60 Days Tourist eVisa',
      color: '#38bdf8',
      maxStay: '30 or 60 Days',
      details: 'Pre-arranged tourist visa sponsored via airline (Emirates, Etihad, flydubai) or travel agency.',
      requirements: ['Passport copy', 'Photograph', 'Hotel booking', 'Return ticket']
    };
  }

  // United States destination
  if (destCode === 'US') {
    if (['GB', 'DE', 'FR', 'JP', 'SG', 'AU'].includes(passCode)) {
      return {
        status: 'esta',
        badge: '🔵 ESTA Visa Waiver',
        color: '#38bdf8',
        maxStay: '90 Days',
        details: 'Electronic System for Travel Authorization (ESTA) valid for 2 years with multiple entries.',
        requirements: ['E-Passport with biometric chip', 'Online ESTA approval', 'Return ticket']
      };
    }
    return {
      status: 'embassy-visa',
      badge: '🔴 B1/B2 Tourist Visa Required',
      color: '#f43f5e',
      maxStay: 'Up to 180 Days',
      details: 'Requires DS-160 application, fee payment, and in-person consulate interview.',
      requirements: ['DS-160 Confirmation', 'Valid Passport', 'Interview Appointment', 'Proof of ties to home country']
    };
  }

  // Generic fallback heuristic based on passport strength
  if (isStrong) {
    return {
      status: 'visa-free',
      badge: '🟢 Visa-Free / VoA Likely',
      color: '#10b981',
      maxStay: '30 to 90 Days',
      details: 'Most destinations offer visa-free entry, visa on arrival, or simple eVisa for this passport.',
      requirements: ['Passport with 6+ months validity', 'Proof of return/onward travel', 'Sufficient funds']
    };
  }

  return {
    status: 'evisa',
    badge: '🟡 Check eVisa / Embassy Requirements',
    color: '#f59e0b',
    maxStay: '30 Days Standard',
    details: 'Verify official government immigration portal or nearest embassy for visa pre-clearance.',
    requirements: ['Passport with 6+ months validity', 'Flight itinerary & hotel voucher', 'Financial documentation']
  };
}

// 3. Electrical Plugs, Sockets, Voltage & Driving Side
export const COUNTRY_SPECS_KIT = {
  JP: {
    plugs: ['Type A', 'Type B'],
    voltage: '100 V • 50/60 Hz',
    drivingSide: 'Left Side 🚗',
    emergency: { police: '110', ambulance: '119', fire: '119' },
    tipping: 'Not Customary (Can be considered rude/awkward)',
    transitCard: 'IC Card (Suica / Pasmo / ICOCA)'
  },
  IN: {
    plugs: ['Type C', 'Type D', 'Type M'],
    voltage: '230 V • 50 Hz',
    drivingSide: 'Left Side 🚗',
    emergency: { police: '100 / 112', ambulance: '102 / 108', fire: '101' },
    tipping: 'Expected in restaurants (7–10%) & porters (₹50–₹100)',
    transitCard: 'Metro Smart Card / UPI Digital Pay'
  },
  FR: {
    plugs: ['Type C', 'Type E'],
    voltage: '230 V • 50 Hz',
    drivingSide: 'Right Side 🚙',
    emergency: { police: '17', ambulance: '15', fire: '18', universal: '112' },
    tipping: 'Service included (Service Compris). Rounding up is polite.',
    transitCard: 'Navigo Easy / Contactless Bank Card'
  },
  US: {
    plugs: ['Type A', 'Type B'],
    voltage: '120 V • 60 Hz',
    drivingSide: 'Right Side 🚙',
    emergency: { police: '911', ambulance: '911', fire: '911' },
    tipping: 'Customary & Expected (18–22% at sit-down dining)',
    transitCard: 'OMNY (NYC) / Clipper (SF) / MetroCard'
  },
  GB: {
    plugs: ['Type G (British 3-pin)'],
    voltage: '230 V • 50 Hz',
    drivingSide: 'Left Side 🚗',
    emergency: { police: '999 / 112', ambulance: '999', fire: '999' },
    tipping: 'Optional. 10–12.5% discretionary service charge common in London.',
    transitCard: 'Oyster Card / Contactless Bank Card'
  },
  DE: {
    plugs: ['Type C', 'Type F (Schuko)'],
    voltage: '230 V • 50 Hz',
    drivingSide: 'Right Side 🚙',
    emergency: { police: '110', ambulance: '112', fire: '112' },
    tipping: 'Trinkgeld customary: round up by 5–10% when paying server.',
    transitCard: 'BVG Fahrinfo / Deutschlandticket'
  },
  IT: {
    plugs: ['Type C', 'Type F', 'Type L'],
    voltage: '230 V • 50 Hz',
    drivingSide: 'Right Side 🚙',
    emergency: { police: '112 / 113', ambulance: '118', fire: '115' },
    tipping: 'Coperto (cover charge) included. Leave 1-2€ coins for great service.',
    transitCard: 'ATAC Metro Card / Tap & Go'
  },
  ES: {
    plugs: ['Type C', 'Type F'],
    voltage: '230 V • 50 Hz',
    drivingSide: 'Right Side 🚙',
    emergency: { police: '091', ambulance: '061', fire: '080', universal: '112' },
    tipping: 'Small tips appreciated (5–10% in upscale venues), not mandatory.',
    transitCard: 'Multi Card (Madrid) / T-Mobilitat (Barcelona)'
  },
  AE: {
    plugs: ['Type G (UK Style)'],
    voltage: '230 V • 50 Hz',
    drivingSide: 'Right Side 🚙',
    emergency: { police: '999', ambulance: '998', fire: '997' },
    tipping: 'Common practice: 10–15% in dining, AED 10–20 for bellhops.',
    transitCard: 'Nol Card (Dubai Metro & Taxis)'
  },
  TH: {
    plugs: ['Type A', 'Type B', 'Type C', 'Type O'],
    voltage: '220 V • 50 Hz',
    drivingSide: 'Left Side 🚗',
    emergency: { police: '191', touristPolice: '1155', ambulance: '1669' },
    tipping: 'Not traditional, but 20–50 THB tips appreciated in tourist areas.',
    transitCard: 'Rabbit Card (BTS Skytrain)'
  }
};

// Fallback Kit generator
export function getCountrySpecsKit(country) {
  if (!country) return null;
  const code = (country.code || '').toUpperCase();
  if (COUNTRY_SPECS_KIT[code]) return COUNTRY_SPECS_KIT[code];

  const region = (country.region || '').toLowerCase();
  const isEurope = region.includes('europe');
  const isAmericas = region.includes('america');
  const isOceania = region.includes('oceania');

  return {
    plugs: isAmericas ? ['Type A', 'Type B'] : (isEurope ? ['Type C', 'Type F'] : ['Type C', 'Type G']),
    voltage: isAmericas ? '110–120 V • 60 Hz' : '220–240 V • 50 Hz',
    drivingSide: (isOceania || ['GB', 'IN', 'JP', 'ZA', 'TH', 'AU', 'NZ', 'SG', 'MY'].includes(code)) ? 'Left Side 🚗' : 'Right Side 🚙',
    emergency: { police: isEurope ? '112' : '911 / 112', ambulance: isEurope ? '112' : '112', fire: isEurope ? '112' : '112' },
    tipping: 'Check local hospitality norms. 5–10% is generally welcomed.',
    transitCard: 'Local Metro Card & Contactless Bank Card'
  };
}

// 4. Essential Travel Phrases Database
export const ESSENTIAL_PHRASES = {
  JP: [
    { cat: 'Greetings', text: 'Konnichiwa', script: 'こんにちは', meaning: 'Hello / Good day' },
    { cat: 'Greetings', text: 'Arigatou gozaimasu', script: 'ありがとうございます', meaning: 'Thank you very much' },
    { cat: 'Dining', text: 'Sumimasen', script: 'すみません', meaning: 'Excuse me / Pardon' },
    { cat: 'Dining', text: 'Okaikei onegaishimasu', script: 'お会計をお願いします', meaning: 'Check / Bill, please' },
    { cat: 'Dining', text: 'Oishii desu!', script: '美味しいです！', meaning: 'This is delicious!' },
    { cat: 'Directions', text: 'Kore wa ikura desu ka?', script: 'これはいくらですか？', meaning: 'How much is this?' },
    { cat: 'Directions', text: 'Eki wa doko desu ka?', script: '駅はどこですか？', meaning: 'Where is the train station?' },
    { cat: 'Safety', text: 'Tasukete kudasai!', script: '助けてください！', meaning: 'Please help me!' }
  ],
  FR: [
    { cat: 'Greetings', text: 'Bonjour', script: 'Bonjour', meaning: 'Hello / Good morning' },
    { cat: 'Greetings', text: 'Merci beaucoup', script: 'Merci beaucoup', meaning: 'Thank you very much' },
    { cat: 'Greetings', text: 'S’il vous plaît', script: 'S’il vous plaît', meaning: 'Please' },
    { cat: 'Dining', text: 'L’addition, s’il vous plaît', script: 'L’addition, s’il vous plaît', meaning: 'The check, please' },
    { cat: 'Dining', text: 'C’est délicieux!', script: 'C’est délicieux!', meaning: 'It is delicious!' },
    { cat: 'Directions', text: 'Combien ça coûte?', script: 'Combien ça coûte?', meaning: 'How much does it cost?' },
    { cat: 'Directions', text: 'Où sont les toilettes?', script: 'Où sont les toilettes?', meaning: 'Where is the restroom?' },
    { cat: 'Safety', text: 'Au secours! Aidez-moi!', script: 'Au secours! Aidez-moi!', meaning: 'Help! Please help me!' }
  ],
  IN: [
    { cat: 'Greetings', text: 'Namaste', script: 'नमस्ते', meaning: 'Respectful greeting / Hello' },
    { cat: 'Greetings', text: 'Dhanyavaad', script: 'धन्यवाद', meaning: 'Thank you' },
    { cat: 'Greetings', text: 'Aap kaise hain?', script: 'आप कैसे हैं?', meaning: 'How are you?' },
    { cat: 'Dining', text: 'Yeh bahut swadisht hai!', script: 'यह बहुत स्वादिष्ट है!', meaning: 'This is very delicious!' },
    { cat: 'Dining', text: 'Bill le aaiye, please', script: 'बिल ले आइए', meaning: 'Please bring the bill' },
    { cat: 'Directions', text: 'Yeh kitne ka hai?', script: 'यह कितने का है?', meaning: 'How much is this?' },
    { cat: 'Directions', text: 'Rasta kahan hai?', script: 'रास्ता कहाँ है?', meaning: 'Where is the way / direction?' },
    { cat: 'Safety', text: 'Kripya meri madad kijiye!', script: 'कृपया मेरी मदद कीजिए!', meaning: 'Please help me!' }
  ],
  ES: [
    { cat: 'Greetings', text: 'Hola, buenos días', script: 'Hola, buenos días', meaning: 'Hello, good morning' },
    { cat: 'Greetings', text: 'Muchas gracias', script: 'Muchas gracias', meaning: 'Thank you very much' },
    { cat: 'Dining', text: 'La cuenta, por favor', script: 'La cuenta, por favor', meaning: 'The bill, please' },
    { cat: 'Dining', text: '¡Está muy rico!', script: '¡Está muy rico!', meaning: 'It is very tasty!' },
    { cat: 'Directions', text: '¿Cuánto cuesta esto?', script: '¿Cuánto cuesta esto?', meaning: 'How much is this?' },
    { cat: 'Directions', text: '¿Dónde está el baño?', script: '¿Dónde está el baño?', meaning: 'Where is the bathroom?' },
    { cat: 'Safety', text: '¡Ayuda, por favor!', script: '¡Ayuda, por favor!', meaning: 'Help, please!' }
  ],
  IT: [
    { cat: 'Greetings', text: 'Buongiorno / Ciao', script: 'Buongiorno / Ciao', meaning: 'Good day / Hello' },
    { cat: 'Greetings', text: 'Grazie mille', script: 'Grazie mille', meaning: 'Thanks a thousand times' },
    { cat: 'Dining', text: 'Il conto, per favore', script: 'Il conto, per favore', meaning: 'The check, please' },
    { cat: 'Dining', text: 'È buonissimo!', script: 'È buonissimo!', meaning: 'It is delicious!' },
    { cat: 'Directions', text: 'Quanto costa?', script: 'Quanto costa?', meaning: 'How much does it cost?' },
    { cat: 'Directions', text: 'Dov’è la stazione?', script: 'Dov’è la stazione?', meaning: 'Where is the train station?' },
    { cat: 'Safety', text: 'Aiuto, per favore!', script: 'Aiuto, per favore!', meaning: 'Help, please!' }
  ],
  DE: [
    { cat: 'Greetings', text: 'Guten Tag', script: 'Guten Tag', meaning: 'Good day / Hello' },
    { cat: 'Greetings', text: 'Vielen Dank', script: 'Vielen Dank', meaning: 'Thank you very much' },
    { cat: 'Dining', text: 'Die Rechnung, bitte', script: 'Die Rechnung, bitte', meaning: 'The bill, please' },
    { cat: 'Dining', text: 'Es schmeckt wunderbar!', script: 'Es schmeckt wunderbar!', meaning: 'It tastes wonderful!' },
    { cat: 'Directions', text: 'Wie viel kostet das?', script: 'Wie viel kostet das?', meaning: 'How much does that cost?' },
    { cat: 'Directions', text: 'Wo ist die Toilette?', script: 'Wo ist die Toilette?', meaning: 'Where is the restroom?' },
    { cat: 'Safety', text: 'Hilfe, bitte helfen Sie mir!', script: 'Hilfe, bitte helfen Sie mir!', meaning: 'Help, please help me!' }
  ]
};

export function getPhrasesForCountry(country) {
  if (!country) return [];
  const code = (country.code || '').toUpperCase();
  if (ESSENTIAL_PHRASES[code]) return ESSENTIAL_PHRASES[code];

  // International standard travel phrases fallback
  return [
    { cat: 'Greetings', text: 'Hello & Welcome', script: 'Hello', meaning: 'Standard Greeting' },
    { cat: 'Greetings', text: 'Thank you very much', script: 'Thank you', meaning: 'Gratitude' },
    { cat: 'Dining', text: 'Check / Bill, please', script: 'Bill please', meaning: 'Payment request' },
    { cat: 'Dining', text: 'This is delicious!', script: 'Delicious', meaning: 'Compliment food' },
    { cat: 'Directions', text: 'How much is this?', script: 'Price check', meaning: 'Inquire price' },
    { cat: 'Directions', text: 'Where is the station?', script: 'Transit location', meaning: 'Ask direction' },
    { cat: 'Safety', text: 'Please help me!', script: 'Help', meaning: 'Emergency assistance' }
  ];
}
