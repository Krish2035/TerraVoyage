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
  },
  CN: {
    plugs: ['Type A', 'Type C', 'Type I'],
    voltage: '220 V • 50 Hz',
    drivingSide: 'Right Side 🚙 (Hong Kong/Macau: Left Side 🚗)',
    emergency: { police: '110', ambulance: '120', fire: '119', traffic: '122' },
    tipping: 'Not customary / generally not practiced in mainland China.',
    transitCard: 'Alipay / WeChat Pay Transport QR / China T-Union Card'
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

// 4. Comprehensive Multi-Language Phrase Packs
export const LANGUAGE_PACKS = {
  // 🇨🇳 Mandarin Chinese
  MANDARIN: [
    { cat: 'Greetings', english: 'Hello', native: '你好', phonetic: 'Nǐ hǎo (Nee how)', meaning: 'Universal friendly greeting for anyone', speak: '你好', langCode: 'zh-CN', langName: 'Mandarin Chinese (中文)' },
    { cat: 'Greetings', english: 'Thank you', native: '谢谢你', phonetic: 'Xièxie nǐ (Shyeh-shyeh nee)', meaning: 'Expressing polite gratitude', speak: '谢谢你', langCode: 'zh-CN', langName: 'Mandarin Chinese (中文)' },
    { cat: 'Greetings', english: "You're welcome", native: '不客气', phonetic: 'Bù kèqi (Boo kuh-chee)', meaning: 'Polite response to thank you', speak: '不客气', langCode: 'zh-CN', langName: 'Mandarin Chinese (中文)' },
    { cat: 'Dining', english: 'Check / Bill, please', native: '请结账 / 买单', phonetic: 'Qǐng jiézhàng / Mǎidān (Ching jyeh-jahng / My-dahn)', meaning: 'Asking the waiter for restaurant bill', speak: '服务员，买单', langCode: 'zh-CN', langName: 'Mandarin Chinese (中文)' },
    { cat: 'Dining', english: 'This is delicious!', native: '太好吃了！', phonetic: 'Tài hǎochī le! (Tie how-cher luh!)', meaning: 'Complimenting the chef and meal', speak: '太好吃了！', langCode: 'zh-CN', langName: 'Mandarin Chinese (中文)' },
    { cat: 'Directions', english: 'How much is this?', native: '这个多少钱？', phonetic: 'Zhège duōshǎo qián? (Juh-guh dwo-shaow chyen?)', meaning: 'Inquiring price while shopping or at markets', speak: '这个多少钱？', langCode: 'zh-CN', langName: 'Mandarin Chinese (中文)' },
    { cat: 'Directions', english: 'Where is the restroom / station?', native: '洗手间 / 车站在哪？', phonetic: 'Xǐshǒujiān / Chēzhàn zài nǎr? (Shee-show-jyen zye nar?)', meaning: 'Asking location for subway, train or toilet', speak: '请问洗手间在哪里？', langCode: 'zh-CN', langName: 'Mandarin Chinese (中文)' },
    { cat: 'Safety', english: 'Please help me! (Emergency)', native: '请帮帮我！/ 救命！', phonetic: 'Qǐng bāng bāng wǒ! / Jiùmìng! (Ching bahng-bahng woh!)', meaning: 'Urgent emergency assistance request', speak: '请帮帮我，我需要帮助！', langCode: 'zh-CN', langName: 'Mandarin Chinese (中文)' }
  ],

  // 🇯🇵 Japanese
  JAPANESE: [
    { cat: 'Greetings', english: 'Hello / Good day', native: 'こんにちは', phonetic: 'Konnichiwa (Kon-nee-chee-wah)', meaning: 'Daytime universal polite greeting', speak: 'こんにちは', langCode: 'ja-JP', langName: 'Japanese (日本語)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'ありがとうございます', phonetic: 'Arigatou gozaimasu (Ah-ree-gah-toh go-zy-mahs)', meaning: 'Deep polite gratitude', speak: 'ありがとうございます', langCode: 'ja-JP', langName: 'Japanese (日本語)' },
    { cat: 'Greetings', english: 'Excuse me / Pardon', native: 'すみません', phonetic: 'Sumimasen (Soo-mee-mah-sen)', meaning: 'Getting attention, apologizing, or saying thanks', speak: 'すみません', langCode: 'ja-JP', langName: 'Japanese (日本語)' },
    { cat: 'Dining', english: 'The check / bill, please', native: 'お会計をお願いします', phonetic: 'Okaikei onegaishimasu (Oh-kye-kay oh-neh-guy-she-mahs)', meaning: 'Requesting the restaurant check', speak: 'お会計をお願いします', langCode: 'ja-JP', langName: 'Japanese (日本語)' },
    { cat: 'Dining', english: 'This is delicious!', native: '美味しいです！', phonetic: 'Oishii desu! (Oy-shee dess!)', meaning: 'Expressing delight for the food', speak: '美味しいです！', langCode: 'ja-JP', langName: 'Japanese (日本語)' },
    { cat: 'Directions', english: 'How much is this?', native: 'これはいくらですか？', phonetic: 'Kore wa ikura desu ka? (Koh-reh wah ee-koo-rah dess kah?)', meaning: 'Asking item price', speak: 'これはいくらですか？', langCode: 'ja-JP', langName: 'Japanese (日本語)' },
    { cat: 'Directions', english: 'Where is the station?', native: '駅はどこですか？', phonetic: 'Eki wa doko desu ka? (Eh-kee wah doh-koh dess kah?)', meaning: 'Asking directions to subway or JR station', speak: '駅はどこですか？', langCode: 'ja-JP', langName: 'Japanese (日本語)' },
    { cat: 'Safety', english: 'Please help me!', native: '助けてください！', phonetic: 'Tasukete kudasai! (Tah-soo-keh-teh koo-dah-sye!)', meaning: 'Emergency distress call', speak: '助けてください！', langCode: 'ja-JP', langName: 'Japanese (日本語)' }
  ],

  // 🇪🇸 Spanish
  SPANISH: [
    { cat: 'Greetings', english: 'Hello / Good day', native: 'Hola, buenos días', phonetic: 'Hola, buenos días (Oh-lah, bway-nos dee-ahs)', meaning: 'Warm daily greeting', speak: 'Hola, buenos días', langCode: 'es-ES', langName: 'Spanish (Español)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Muchas gracias', phonetic: 'Muchas gracias (Moo-chahs grah-syahs)', meaning: 'Expressing gratitude', speak: 'Muchas gracias', langCode: 'es-ES', langName: 'Spanish (Español)' },
    { cat: 'Greetings', english: 'Please', native: 'Por favor', phonetic: 'Por favor (Por fah-vor)', meaning: 'Polite request', speak: 'Por favor', langCode: 'es-ES', langName: 'Spanish (Español)' },
    { cat: 'Dining', english: 'The check / bill, please', native: 'La cuenta, por favor', phonetic: 'La cuenta, por favor (Lah kwen-tah por fah-vor)', meaning: 'Asking for restaurant bill', speak: 'La cuenta, por favor', langCode: 'es-ES', langName: 'Spanish (Español)' },
    { cat: 'Dining', english: 'This is delicious!', native: '¡Está muy rico!', phonetic: '¡Está muy rico! (Es-tah moo-ee ree-koh!)', meaning: 'Complimenting food taste', speak: '¡Está muy rico!', langCode: 'es-ES', langName: 'Spanish (Español)' },
    { cat: 'Directions', english: 'How much does this cost?', native: '¿Cuánto cuesta esto?', phonetic: '¿Cuánto cuesta esto? (Kwan-toh kwes-tah es-toh?)', meaning: 'Inquiring cost in shops or markets', speak: '¿Cuánto cuesta esto?', langCode: 'es-ES', langName: 'Spanish (Español)' },
    { cat: 'Directions', english: 'Where is the restroom / station?', native: '¿Dónde está el baño?', phonetic: '¿Dónde está el baño? (Dohn-deh es-tah el bah-nyoh?)', meaning: 'Asking restroom or transit locations', speak: '¿Dónde está el baño?', langCode: 'es-ES', langName: 'Spanish (Español)' },
    { cat: 'Safety', english: 'Help, please!', native: '¡Ayuda, por favor!', phonetic: '¡Ayuda, por favor! (Ah-yoo-dah, por fah-vor!)', meaning: 'Emergency cry for assistance', speak: '¡Ayuda, por favor!', langCode: 'es-ES', langName: 'Spanish (Español)' }
  ],

  // 🇫🇷 French
  FRENCH: [
    { cat: 'Greetings', english: 'Hello / Good morning', native: 'Bonjour', phonetic: 'Bonjour (Bon-zhoor)', meaning: 'Standard polite daytime greeting', speak: 'Bonjour', langCode: 'fr-FR', langName: 'French (Français)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Merci beaucoup', phonetic: 'Merci beaucoup (Mair-see boh-koo)', meaning: 'Sincere appreciation', speak: 'Merci beaucoup', langCode: 'fr-FR', langName: 'French (Français)' },
    { cat: 'Greetings', english: 'Please', native: 'S’il vous plaît', phonetic: 'S’il vous plaît (Seel voo play)', meaning: 'Polite request', speak: 'S’il vous plaît', langCode: 'fr-FR', langName: 'French (Français)' },
    { cat: 'Dining', english: 'The check / bill, please', native: 'L’addition, s’il vous plaît', phonetic: 'L’addition, s’il vous plaît (Lah-dee-syon seel voo play)', meaning: 'Asking for restaurant bill', speak: 'L’addition, s’il vous plaît', langCode: 'fr-FR', langName: 'French (Français)' },
    { cat: 'Dining', english: 'It is delicious!', native: 'C’est délicieux!', phonetic: 'C’est délicieux! (Say day-lee-syuh!)', meaning: 'Complimenting dining flavor', speak: 'C’est délicieux!', langCode: 'fr-FR', langName: 'French (Français)' },
    { cat: 'Directions', english: 'How much does it cost?', native: 'Combien ça coûte?', phonetic: 'Combien ça coûte? (Kom-byan sah koot?)', meaning: 'Inquiring cost of purchase', speak: 'Combien ça coûte?', langCode: 'fr-FR', langName: 'French (Français)' },
    { cat: 'Directions', english: 'Where are the restrooms?', native: 'Où sont les toilettes?', phonetic: 'Où sont les toilettes? (Oo son lay twah-let?)', meaning: 'Finding toilet facilities', speak: 'Où sont les toilettes?', langCode: 'fr-FR', langName: 'French (Français)' },
    { cat: 'Safety', english: 'Help! Please help me!', native: 'Au secours! Aidez-moi!', phonetic: 'Au secours! Aidez-moi! (Oh suh-koor! Ay-day mwah!)', meaning: 'Emergency distress call', speak: 'Au secours! Aidez-moi!', langCode: 'fr-FR', langName: 'French (Français)' }
  ],

  // 🇩🇪 German
  GERMAN: [
    { cat: 'Greetings', english: 'Hello / Good day', native: 'Guten Tag', phonetic: 'Guten Tag (Goo-ten Tahg)', meaning: 'Formal polite greeting', speak: 'Guten Tag', langCode: 'de-DE', langName: 'German (Deutsch)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Vielen Dank', phonetic: 'Vielen Dank (Fee-len Dahnk)', meaning: 'Expressing deep thanks', speak: 'Vielen Dank', langCode: 'de-DE', langName: 'German (Deutsch)' },
    { cat: 'Greetings', english: 'Please / You’re welcome', native: 'Bitte', phonetic: 'Bitte (Bit-tuh)', meaning: 'Universal polite word for please & welcome', speak: 'Bitte', langCode: 'de-DE', langName: 'German (Deutsch)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Die Rechnung, bitte', phonetic: 'Die Rechnung, bitte (Dee Rekh-noong, bit-tuh)', meaning: 'Requesting check at dining table', speak: 'Die Rechnung, bitte', langCode: 'de-DE', langName: 'German (Deutsch)' },
    { cat: 'Dining', english: 'It tastes wonderful!', native: 'Es schmeckt wunderbar!', phonetic: 'Es schmeckt wunderbar! (Es shmekt voon-der-bar!)', meaning: 'Complimenting German cuisine', speak: 'Es schmeckt wunderbar!', langCode: 'de-DE', langName: 'German (Deutsch)' },
    { cat: 'Directions', english: 'How much does that cost?', native: 'Wie viel kostet das?', phonetic: 'Wie viel kostet das? (Vee feel kos-tet dahs?)', meaning: 'Price inquiry', speak: 'Wie viel kostet das?', langCode: 'de-DE', langName: 'German (Deutsch)' },
    { cat: 'Directions', english: 'Where is the restroom / train?', native: 'Wo ist die Toilette?', phonetic: 'Wo ist die Toilette? (Voh ist dee twah-let-tuh?)', meaning: 'Finding transit or restroom', speak: 'Wo ist die Toilette?', langCode: 'de-DE', langName: 'German (Deutsch)' },
    { cat: 'Safety', english: 'Help, please help me!', native: 'Hilfe, bitte helfen Sie mir!', phonetic: 'Hilfe, bitte helfen Sie mir! (Hil-fuh, bit-tuh hel-fen zee meer!)', meaning: 'Emergency assistance request', speak: 'Hilfe, bitte helfen Sie mir!', langCode: 'de-DE', langName: 'German (Deutsch)' }
  ],

  // 🇮🇹 Italian
  ITALIAN: [
    { cat: 'Greetings', english: 'Good day / Hello', native: 'Buongiorno / Ciao', phonetic: 'Buongiorno / Ciao (Bwon-zhor-no / Chow)', meaning: 'Daily warm Italian greeting', speak: 'Buongiorno', langCode: 'it-IT', langName: 'Italian (Italiano)' },
    { cat: 'Greetings', english: 'Thank you a thousand times', native: 'Grazie mille', phonetic: 'Grazie mille (Graht-zyeh meel-leh)', meaning: 'Enthusiastic gratitude', speak: 'Grazie mille', langCode: 'it-IT', langName: 'Italian (Italiano)' },
    { cat: 'Greetings', english: 'Please', native: 'Per favore', phonetic: 'Per favore (Pehr fah-voh-reh)', meaning: 'Polite request', speak: 'Per favore', langCode: 'it-IT', langName: 'Italian (Italiano)' },
    { cat: 'Dining', english: 'The check / bill, please', native: 'Il conto, per favore', phonetic: 'Il conto, per favore (Eel kon-toh pehr fah-voh-reh)', meaning: 'Asking for check at trattoria', speak: 'Il conto, per favore', langCode: 'it-IT', langName: 'Italian (Italiano)' },
    { cat: 'Dining', english: 'It is delicious!', native: 'È buonissimo!', phonetic: 'È buonissimo! (Eh bwo-nees-see-moh!)', meaning: 'Expressing love for food', speak: 'È buonissimo!', langCode: 'it-IT', langName: 'Italian (Italiano)' },
    { cat: 'Directions', english: 'How much is this?', native: 'Quanto costa questo?', phonetic: 'Quanto costa questo? (Kwan-toh kos-tah kwes-toh?)', meaning: 'Inquiring price', speak: 'Quanto costa questo?', langCode: 'it-IT', langName: 'Italian (Italiano)' },
    { cat: 'Directions', english: 'Where is the train station?', native: 'Dov’è la stazione?', phonetic: 'Dov’è la stazione? (Doh-veh lah staht-syoh-neh?)', meaning: 'Transit location inquiry', speak: 'Dov’è la stazione?', langCode: 'it-IT', langName: 'Italian (Italiano)' },
    { cat: 'Safety', english: 'Help, please!', native: 'Aiuto, per favore!', phonetic: 'Aiuto, per favore! (Ah-yoo-toh, pehr fah-voh-reh!)', meaning: 'Emergency distress', speak: 'Aiuto, per favore!', langCode: 'it-IT', langName: 'Italian (Italiano)' }
  ],

  // 🇮🇳 Hindi
  HINDI: [
    { cat: 'Greetings', english: 'Hello / Greetings', native: 'नमस्ते', phonetic: 'Namaste (Nuh-muh-stay)', meaning: 'Respectful timeless Indian greeting', speak: 'नमस्ते', langCode: 'hi-IN', langName: 'Hindi (हिन्दी)' },
    { cat: 'Greetings', english: 'Thank you', native: 'धन्यवाद / शुक्रिया', phonetic: 'Dhanyavaad / Shukriya (Dhun-yuh-vaad)', meaning: 'Expressing gratitude', speak: 'धन्यवाद', langCode: 'hi-IN', langName: 'Hindi (हिन्दी)' },
    { cat: 'Greetings', english: 'How are you?', native: 'आप कैसे हैं?', phonetic: 'Aap kaise hain? (Aap kye-say hain?)', meaning: 'Polite check-in with locals', speak: 'आप कैसे हैं?', langCode: 'hi-IN', langName: 'Hindi (हिन्दी)' },
    { cat: 'Dining', english: 'Please bring the bill', native: 'बिल ले आइए, कृपया', phonetic: 'Bill le aaiye, kripya (Bill lay eye-yeh)', meaning: 'Asking for the dining bill', speak: 'कृपया बिल ले आइए', langCode: 'hi-IN', langName: 'Hindi (हिन्दी)' },
    { cat: 'Dining', english: 'This is very delicious!', native: 'यह बहुत स्वादिष्ट है!', phonetic: 'Yeh bahut swadisht hai! (Yeh buh-hoot swah-disht hai!)', meaning: 'Complimenting Indian culinary flavors', speak: 'यह बहुत स्वादिष्ट है!', langCode: 'hi-IN', langName: 'Hindi (हिन्दी)' },
    { cat: 'Directions', english: 'How much is this?', native: 'यह कितने का है?', phonetic: 'Yeh kitne ka hai? (Yeh kit-nay kah hai?)', meaning: 'Bargaining and shopping price check', speak: 'यह कितने का है?', langCode: 'hi-IN', langName: 'Hindi (हिन्दी)' },
    { cat: 'Directions', english: 'Where is the way / station?', native: 'रास्ता / स्टेशन कहाँ है?', phonetic: 'Raasta / Station kahan hai? (Rah-stah kuhan hai?)', meaning: 'Asking transit directions', speak: 'स्टेशन कहाँ है?', langCode: 'hi-IN', langName: 'Hindi (हिन्दी)' },
    { cat: 'Safety', english: 'Please help me!', native: 'कृपया मेरी मदद कीजिए!', phonetic: 'Kripya meri madad kijiye! (Krip-yah may-ree muh-dud kee-jee-yeh!)', meaning: 'Emergency call for help', speak: 'कृपया मेरी मदद कीजिए!', langCode: 'hi-IN', langName: 'Hindi (हिन्दी)' }
  ],

  // 🇸🇦 / 🇦🇪 Arabic
  ARABIC: [
    { cat: 'Greetings', english: 'Hello / Welcome', native: 'مرحباً / أهلاً وسهلاً', phonetic: 'Marhaban / Ahlan wa Sahlan (Mar-ha-ban)', meaning: 'Warm universal Arab welcome', speak: 'مرحباً', langCode: 'ar-SA', langName: 'Arabic (العربية)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'شكراً جزيلاً', phonetic: 'Shukran jazeelan (Shook-ran jah-zee-lan)', meaning: 'Expressing deep gratitude', speak: 'شكراً جزيلاً', langCode: 'ar-SA', langName: 'Arabic (العربية)' },
    { cat: 'Greetings', english: 'Please', native: 'من فضلك', phonetic: 'Min fadlik (Meen fahd-leek)', meaning: 'Polite request', speak: 'من فضلك', langCode: 'ar-SA', langName: 'Arabic (العربية)' },
    { cat: 'Dining', english: 'The bill, please', native: 'الحساب، من فضلك', phonetic: 'Al-hisaab, min fadlik (Al-hee-sahb meen fahd-leek)', meaning: 'Asking for restaurant check', speak: 'الحساب من فضلك', langCode: 'ar-SA', langName: 'Arabic (العربية)' },
    { cat: 'Dining', english: 'Delicious!', native: 'لذيذ جداً!', phonetic: 'Latheeth jiddan! (Lah-theeth jeed-dan!)', meaning: 'Complimenting traditional cuisine', speak: 'لذيذ جداً', langCode: 'ar-SA', langName: 'Arabic (العربية)' },
    { cat: 'Directions', english: 'How much is this?', native: 'بكم هذا؟', phonetic: 'Bikam haadha? (Bee-kam hah-thah?)', meaning: 'Souk & market price check', speak: 'بكم هذا؟', langCode: 'ar-SA', langName: 'Arabic (العربية)' },
    { cat: 'Directions', english: 'Where is the station / bathroom?', native: 'أين المحطة / الحمام؟', phonetic: 'Ayna al-mahatta? (Eye-nah al-mah-hat-tah?)', meaning: 'Transit navigation', speak: 'أين المحطة؟', langCode: 'ar-SA', langName: 'Arabic (العربية)' },
    { cat: 'Safety', english: 'Help me, please!', native: 'ساعدني، أرجوك!', phonetic: 'Saa’idnee, arjook! (Sah-ee-id-nee ahr-jook!)', meaning: 'Emergency distress cry', speak: 'ساعدني أرجوك!', langCode: 'ar-SA', langName: 'Arabic (العربية)' }
  ],

  // 🇷🇺 Russian
  RUSSIAN: [
    { cat: 'Greetings', english: 'Hello / Good day', native: 'Здравствуйте', phonetic: 'Zdravstvuyte (Zdrahst-vooy-tyeh)', meaning: 'Polite respectful greeting', speak: 'Здравствуйте', langCode: 'ru-RU', langName: 'Russian (Русский)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Большое спасибо', phonetic: 'Bol’shoye spasibo (Bohl-shoy-eh spah-see-bah)', meaning: 'Great appreciation', speak: 'Большое спасибо', langCode: 'ru-RU', langName: 'Russian (Русский)' },
    { cat: 'Greetings', english: 'Please / You’re welcome', native: 'Пожалуйста', phonetic: 'Pozhaluysta (Pah-zhahl-oo-stah)', meaning: 'Universal polite etiquette', speak: 'Пожалуйста', langCode: 'ru-RU', langName: 'Russian (Русский)' },
    { cat: 'Dining', english: 'The check, please', native: 'Счёт, пожалуйста', phonetic: 'Schyot, pozhaluysta (Schyot pah-zhahl-oo-stah)', meaning: 'Asking for restaurant bill', speak: 'Счёт, пожалуйста', langCode: 'ru-RU', langName: 'Russian (Русский)' },
    { cat: 'Dining', english: 'This is very tasty!', native: 'Это очень вкусно!', phonetic: 'Eto ochen’ vkusno! (Eh-tah oh-chen vkoos-nah!)', meaning: 'Complimenting the meal', speak: 'Это очень вкусно!', langCode: 'ru-RU', langName: 'Russian (Русский)' },
    { cat: 'Directions', english: 'How much does this cost?', native: 'Сколько это стоит?', phonetic: 'Skol’ko eto stoit? (Skohl-kah eh-tah stoh-eet?)', meaning: 'Inquiring cost', speak: 'Сколько это стоит?', langCode: 'ru-RU', langName: 'Russian (Русский)' },
    { cat: 'Directions', english: 'Where is the metro / station?', native: 'Где находится метро?', phonetic: 'Gde nakhoditsya metro? (Gdeh nah-khoh-deet-syah meh-troh?)', meaning: 'Subway transit navigation', speak: 'Где находится метро?', langCode: 'ru-RU', langName: 'Russian (Русский)' },
    { cat: 'Safety', english: 'Help me, please!', native: 'Помогите, пожалуйста!', phonetic: 'Pomogite, pozhaluysta! (Pah-mah-gee-tyeh pah-zhahl-oo-stah!)', meaning: 'Emergency distress call', speak: 'Помогите, пожалуйста!', langCode: 'ru-RU', langName: 'Russian (Русский)' }
  ],

  // 🇧🇷 / 🇵🇹 Portuguese
  PORTUGUESE: [
    { cat: 'Greetings', english: 'Hello / Good day', native: 'Olá, bom dia', phonetic: 'Olá, bom dia (Oh-lah, bohm jee-ah)', meaning: 'Daily cheerful greeting', speak: 'Olá, bom dia', langCode: 'pt-BR', langName: 'Portuguese (Português)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Muito obrigado/a', phonetic: 'Muito obrigado (Mwee-toh oh-bree-gah-doo)', meaning: 'Expressing gratitude', speak: 'Muito obrigado', langCode: 'pt-BR', langName: 'Portuguese (Português)' },
    { cat: 'Greetings', english: 'Please', native: 'Por favor', phonetic: 'Por favor (Por fah-vor)', meaning: 'Polite etiquette', speak: 'Por favor', langCode: 'pt-BR', langName: 'Portuguese (Português)' },
    { cat: 'Dining', english: 'The bill, please', native: 'A conta, por favor', phonetic: 'A conta, por favor (Ah kon-tah, por fah-vor)', meaning: 'Requesting dining check', speak: 'A conta, por favor', langCode: 'pt-BR', langName: 'Portuguese (Português)' },
    { cat: 'Dining', english: 'It is delicious!', native: 'Está uma delícia!', phonetic: 'Está uma delícia! (Es-tah oo-mah deh-lee-syah!)', meaning: 'Food appreciation', speak: 'Está uma delícia!', langCode: 'pt-BR', langName: 'Portuguese (Português)' },
    { cat: 'Directions', english: 'How much is this?', native: 'Quanto custa isso?', phonetic: 'Quanto custa isso? (Kwan-toh koos-tah ee-soo?)', meaning: 'Asking price', speak: 'Quanto custa isso?', langCode: 'pt-BR', langName: 'Portuguese (Português)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'Onde fica a estação?', phonetic: 'Onde fica a estação? (On-jee fee-kah ah es-tah-sah-ooh?)', meaning: 'Metro and bus navigation', speak: 'Onde fica a estação?', langCode: 'pt-BR', langName: 'Portuguese (Português)' },
    { cat: 'Safety', english: 'Help, please!', native: 'Socorro, ajude-me!', phonetic: 'Socorro, ajude-me! (Soh-koh-hoo, ah-zhoo-jee-mee!)', meaning: 'Emergency distress call', speak: 'Socorro, por favor me ajude!', langCode: 'pt-BR', langName: 'Portuguese (Português)' }
  ],

  // 🇰🇷 Korean
  KOREAN: [
    { cat: 'Greetings', english: 'Hello', native: '안녕하세요', phonetic: 'Annyeonghaseyo (Ahn-nyong-hah-seh-yoh)', meaning: 'Universal respectful Korean greeting', speak: '안녕하세요', langCode: 'ko-KR', langName: 'Korean (한국어)' },
    { cat: 'Greetings', english: 'Thank you very much', native: '감사합니다', phonetic: 'Gamsahamnida (Gahm-sah-hahm-nee-dah)', meaning: 'Formal polite gratitude', speak: '감사합니다', langCode: 'ko-KR', langName: 'Korean (한국어)' },
    { cat: 'Greetings', english: 'Excuse me', native: '저기요 / 실례합니다', phonetic: 'Jeogiyo (Juh-gee-yoh)', meaning: 'Calling server or asking through crowd', speak: '저기요', langCode: 'ko-KR', langName: 'Korean (한국어)' },
    { cat: 'Dining', english: 'Check / Bill, please', native: '계산서 주세요', phonetic: 'Gyesanseo juseyo (Gyeh-sahn-suh joo-seh-yoh)', meaning: 'Requesting dining check', speak: '계산서 주세요', langCode: 'ko-KR', langName: 'Korean (한국어)' },
    { cat: 'Dining', english: 'This is delicious!', native: '정말 맛있어요!', phonetic: 'Jeongmal masisseoyo! (Jung-mahl mah-shee-suh-yoh!)', meaning: 'Praising Korean cuisine', speak: '정말 맛있어요!', langCode: 'ko-KR', langName: 'Korean (한국어)' },
    { cat: 'Directions', english: 'How much is this?', native: '이거 얼마예요?', phonetic: 'Igeo eolmayeyo? (Ee-guh ul-mah-yeh-yoh?)', meaning: 'Market and shopping price inquiry', speak: '이거 얼마예요?', langCode: 'ko-KR', langName: 'Korean (한국어)' },
    { cat: 'Directions', english: 'Where is the restroom / station?', native: '화장실 / 지하철역이 어디예요?', phonetic: 'Hwajangsil eodiyeyo? (Hwah-jahng-sheel uh-dee-yeh-yoh?)', meaning: 'Locating subway or toilet', speak: '화장실이 어디예요?', langCode: 'ko-KR', langName: 'Korean (한국어)' },
    { cat: 'Safety', english: 'Help me, please!', native: '도와주세요!', phonetic: 'Dowajuseyo! (Doh-wah-joo-seh-yoh!)', meaning: 'Emergency distress call', speak: '도와주세요!', langCode: 'ko-KR', langName: 'Korean (한국어)' }
  ],

  // 🇹🇭 Thai
  THAI: [
    { cat: 'Greetings', english: 'Hello', native: 'สวัสดี', phonetic: 'Sawatdee khrap/ka (Sah-waht-dee krahp/kah)', meaning: 'Traditional polite Thai greeting with Wai gesture', speak: 'สวัสดีครับ', langCode: 'th-TH', langName: 'Thai (ภาษาไทย)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'ขอบคุณมาก', phonetic: 'Khop khun maak (Kohp koon mahk)', meaning: 'Sincere appreciation', speak: 'ขอบคุณมากครับ', langCode: 'th-TH', langName: 'Thai (ภาษาไทย)' },
    { cat: 'Greetings', english: 'Excuse me / Sorry', native: 'ขอโทษ', phonetic: 'Khor thot (Kaw toht)', meaning: 'Apology or polite interruption', speak: 'ขอโทษครับ', langCode: 'th-TH', langName: 'Thai (ภาษาไทย)' },
    { cat: 'Dining', english: 'Check, please', native: 'เช็คบิลด้วย', phonetic: 'Check bill duay (Check bill doo-ay)', meaning: 'Asking for dining bill', speak: 'เช็คบิลด้วยครับ', langCode: 'th-TH', langName: 'Thai (ภาษาไทย)' },
    { cat: 'Dining', english: 'Delicious!', native: 'อร่อยมาก!', phonetic: 'Aroy maak! (Ah-roy mahk!)', meaning: 'Complimenting Thai street food and cuisine', speak: 'อร่อยมากครับ', langCode: 'th-TH', langName: 'Thai (ภาษาไทย)' },
    { cat: 'Directions', english: 'How much is this?', native: 'อันนี้เท่าไหร่?', phonetic: 'An nee thao rai? (Ahn nee tao rye?)', meaning: 'Night market price inquiry', speak: 'อันนี้เท่าไหร่ครับ', langCode: 'th-TH', langName: 'Thai (ภาษาไทย)' },
    { cat: 'Directions', english: 'Where is the restroom?', native: 'ห้องน้ำอยู่ที่ไหน?', phonetic: 'Hong nam yoo tee nai? (Hawng nahm yoo tee nye?)', meaning: 'Finding toilet or station', speak: 'ห้องน้ำอยู่ที่ไหนครับ', langCode: 'th-TH', langName: 'Thai (ภาษาไทย)' },
    { cat: 'Safety', english: 'Help me!', native: 'ช่วยด้วย!', phonetic: 'Chuay duay! (Choo-ay doo-ay!)', meaning: 'Emergency cry for help', speak: 'ช่วยด้วยครับ!', langCode: 'th-TH', langName: 'Thai (ภาษาไทย)' }
  ],

  // 🇻🇳 Vietnamese
  VIETNAMESE: [
    { cat: 'Greetings', english: 'Hello', native: 'Xin chào', phonetic: 'Xin chào (Sin chow)', meaning: 'Universal friendly greeting', speak: 'Xin chào', langCode: 'vi-VN', langName: 'Vietnamese (Tiếng Việt)' },
    { cat: 'Greetings', english: 'Thank you', native: 'Cảm ơn bạn', phonetic: 'Cảm ơn bạn (Kahm un bahn)', meaning: 'Expressing gratitude', speak: 'Cảm ơn bạn', langCode: 'vi-VN', langName: 'Vietnamese (Tiếng Việt)' },
    { cat: 'Greetings', english: 'Please / Excuse me', native: 'Xin làm ơn', phonetic: 'Xin làm ơn (Sin lahm un)', meaning: 'Polite phrase', speak: 'Xin làm ơn', langCode: 'vi-VN', langName: 'Vietnamese (Tiếng Việt)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Tính tiền, làm ơn', phonetic: 'Tính tiền, làm ơn (Tin tyen lahm un)', meaning: 'Asking for food bill', speak: 'Tính tiền làm ơn', langCode: 'vi-VN', langName: 'Vietnamese (Tiếng Việt)' },
    { cat: 'Dining', english: 'Delicious!', native: 'Rất ngon!', phonetic: 'Rất ngon! (Zuht ngon!)', meaning: 'Praising Vietnamese food', speak: 'Món này rất ngon!', langCode: 'vi-VN', langName: 'Vietnamese (Tiếng Việt)' },
    { cat: 'Directions', english: 'How much is this?', native: 'Cái này bao nhiêu tiền?', phonetic: 'Cái này bao nhiêu tiền? (Kai nay bow nyew tyen?)', meaning: 'Market bargaining & pricing', speak: 'Cái này bao nhiêu tiền?', langCode: 'vi-VN', langName: 'Vietnamese (Tiếng Việt)' },
    { cat: 'Directions', english: 'Where is the restroom?', native: 'Nhà vệ sinh ở đâu?', phonetic: 'Nhà vệ sinh ở đâu? (Nyah vay sin uh dow?)', meaning: 'Finding restroom', speak: 'Nhà vệ sinh ở đâu?', langCode: 'vi-VN', langName: 'Vietnamese (Tiếng Việt)' },
    { cat: 'Safety', english: 'Help me!', native: 'Cứu tôi với!', phonetic: 'Cứu tôi với! (Kew toy vuh-ee!)', meaning: 'Emergency distress call', speak: 'Cứu tôi với!', langCode: 'vi-VN', langName: 'Vietnamese (Tiếng Việt)' }
  ],

  // 🇮🇩 / 🇲🇾 Indonesian / Malay
  INDONESIAN: [
    { cat: 'Greetings', english: 'Hello / Good day', native: 'Halo / Selamat siang', phonetic: 'Halo / Selamat siang (Seh-lah-mat see-ang)', meaning: 'Friendly daily greeting', speak: 'Halo, selamat siang', langCode: 'id-ID', langName: 'Indonesian / Malay (Bahasa)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Terima kasih banyak', phonetic: 'Terima kasih banyak (Teh-ree-mah kah-see bahn-yak)', meaning: 'Warm polite gratitude', speak: 'Terima kasih banyak', langCode: 'id-ID', langName: 'Indonesian / Malay (Bahasa)' },
    { cat: 'Greetings', english: 'Please', native: 'Tolong / Silakan', phonetic: 'Tolong / Silakan (Toh-long / See-lah-kahn)', meaning: 'Polite request', speak: 'Tolong', langCode: 'id-ID', langName: 'Indonesian / Malay (Bahasa)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Minta bon / tagihan', phonetic: 'Minta bon (Meen-tah bon)', meaning: 'Asking for the check', speak: 'Minta bon, tolong', langCode: 'id-ID', langName: 'Indonesian / Malay (Bahasa)' },
    { cat: 'Dining', english: 'Delicious!', native: 'Enak sekali!', phonetic: 'Enak sekali! (Eh-nak seh-kah-lee!)', meaning: 'Complimenting Indonesian dishes', speak: 'Ini enak sekali!', langCode: 'id-ID', langName: 'Indonesian / Malay (Bahasa)' },
    { cat: 'Directions', english: 'How much is this?', native: 'Berapa harganya?', phonetic: 'Berapa harganya? (Beh-rah-pah har-gah-nyah?)', meaning: 'Inquiring price', speak: 'Berapa harganya?', langCode: 'id-ID', langName: 'Indonesian / Malay (Bahasa)' },
    { cat: 'Directions', english: 'Where is the station / toilet?', native: 'Di mana stasiun / toilet?', phonetic: 'Di mana toilet? (Dee mah-nah twah-let?)', meaning: 'Finding amenities and transit', speak: 'Di mana toilet?', langCode: 'id-ID', langName: 'Indonesian / Malay (Bahasa)' },
    { cat: 'Safety', english: 'Help me!', native: 'Tolong saya!', phonetic: 'Tolong saya! (Toh-long sah-yah!)', meaning: 'Emergency distress', speak: 'Tolong saya!', langCode: 'id-ID', langName: 'Indonesian / Malay (Bahasa)' }
  ],

  // 🇹🇷 Turkish
  TURKISH: [
    { cat: 'Greetings', english: 'Hello', native: 'Merhaba', phonetic: 'Merhaba (Mer-hah-bah)', meaning: 'Universal Turkish greeting', speak: 'Merhaba', langCode: 'tr-TR', langName: 'Turkish (Türkçe)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Teşekkür ederim', phonetic: 'Teşekkür ederim (Teh-shek-koor eh-deh-reem)', meaning: 'Expressing gratitude', speak: 'Teşekkür ederim', langCode: 'tr-TR', langName: 'Turkish (Türkçe)' },
    { cat: 'Greetings', english: 'Please', native: 'Lütfen', phonetic: 'Lütfen (Loot-fen)', meaning: 'Polite etiquette', speak: 'Lütfen', langCode: 'tr-TR', langName: 'Turkish (Türkçe)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Hesap, lütfen', phonetic: 'Hesap, lütfen (Heh-sahp loot-fen)', meaning: 'Requesting check at restaurant or cafe', speak: 'Hesap lütfen', langCode: 'tr-TR', langName: 'Turkish (Türkçe)' },
    { cat: 'Dining', english: 'Delicious!', native: 'Çok lezzetli!', phonetic: 'Çok lezzetli! (Chok lez-zet-lee!)', meaning: 'Praising culinary taste', speak: 'Çok lezzetli!', langCode: 'tr-TR', langName: 'Turkish (Türkçe)' },
    { cat: 'Directions', english: 'How much is this?', native: 'Bu ne kadar?', phonetic: 'Bu ne kadar? (Boo neh kah-dahr?)', meaning: 'Grand Bazaar & shop price check', speak: 'Bu ne kadar?', langCode: 'tr-TR', langName: 'Turkish (Türkçe)' },
    { cat: 'Directions', english: 'Where is the station / metro?', native: 'İstasyon / metro nerede?', phonetic: 'İstasyon nerede? (Ees-tahs-yon neh-reh-deh?)', meaning: 'Transit navigation', speak: 'İstasyon nerede?', langCode: 'tr-TR', langName: 'Turkish (Türkçe)' },
    { cat: 'Safety', english: 'Help, please!', native: 'İmdat, yardım edin!', phonetic: 'İmdat, yardım edin! (Eem-daht, yahr-duhm eh-deen!)', meaning: 'Emergency cry for help', speak: 'İmdat, yardım edin!', langCode: 'tr-TR', langName: 'Turkish (Türkçe)' }
  ],

  // 🇬🇷 Greek
  GREEK: [
    { cat: 'Greetings', english: 'Hello / Good day', native: 'Γεια σας', phonetic: 'Yassas (Yah-sahs)', meaning: 'Universal warm Hellenic greeting', speak: 'Γεια σας', langCode: 'el-GR', langName: 'Greek (Ελληνικά)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Ευχαριστώ πολύ', phonetic: 'Efharisto poli (Ef-khah-ree-stoh poh-lee)', meaning: 'Heartfelt thanks', speak: 'Ευχαριστώ πολύ', langCode: 'el-GR', langName: 'Greek (Ελληνικά)' },
    { cat: 'Greetings', english: 'Please / You’re welcome', native: 'Παρακαλώ', phonetic: 'Parakalo (Pah-rah-kah-loh)', meaning: 'Polite etiquette', speak: 'Παρακαλώ', langCode: 'el-GR', langName: 'Greek (Ελληνικά)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Το λογαριασμό, παρακαλώ', phonetic: 'To logariasmo, parakalo (Toh loh-gah-ryah-zmoh pah-rah-kah-loh)', meaning: 'Asking for tavern check', speak: 'Το λογαριασμό παρακαλώ', langCode: 'el-GR', langName: 'Greek (Ελληνικά)' },
    { cat: 'Dining', english: 'Delicious!', native: 'Είναι νόστιμο!', phonetic: 'Eínai nóstimo! (Ee-neh noh-stee-moh!)', meaning: 'Complimenting Greek culinary dishes', speak: 'Είναι νόστιμο!', langCode: 'el-GR', langName: 'Greek (Ελληνικά)' },
    { cat: 'Directions', english: 'How much is this?', native: 'Πόσο κάνει αυτό;', phonetic: 'Poso kani afto? (Poh-soh kah-nee ahf-toh?)', meaning: 'Market price check', speak: 'Πόσο κάνει αυτό;', langCode: 'el-GR', langName: 'Greek (Ελληνικά)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'Πού είναι ο σταθμός;', phonetic: 'Pou einai o stathmos? (Poo ee-neh oh stahth-mohs?)', meaning: 'Directions to port or station', speak: 'Πού είναι ο σταθμός;', langCode: 'el-GR', langName: 'Greek (Ελληνικά)' },
    { cat: 'Safety', english: 'Help!', native: 'Βοήθεια!', phonetic: 'Voítheia! (Voh-ee-thee-yah!)', meaning: 'Emergency distress call', speak: 'Βοήθεια!', langCode: 'el-GR', langName: 'Greek (Ελληνικά)' }
  ],

  // 🇳🇱 Dutch
  DUTCH: [
    { cat: 'Greetings', english: 'Hello / Good day', native: 'Hallo / Goedendag', phonetic: 'Hallo / Goedendag (Khroo-duh-dahkh)', meaning: 'Standard Dutch greeting', speak: 'Goedendag', langCode: 'nl-NL', langName: 'Dutch (Nederlands)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Dank u wel', phonetic: 'Dank u wel (Dahnk oo vel)', meaning: 'Polite gratitude', speak: 'Hartelijk dank', langCode: 'nl-NL', langName: 'Dutch (Nederlands)' },
    { cat: 'Greetings', english: 'Please', native: 'Alstublieft', phonetic: 'Alstublieft (Ahls-too-bleeft)', meaning: 'Polite request & offering', speak: 'Alstublieft', langCode: 'nl-NL', langName: 'Dutch (Nederlands)' },
    { cat: 'Dining', english: 'The bill, please', native: 'De rekening, alstublieft', phonetic: 'De rekening, alstublieft (Duh ray-kuh-ning ahls-too-bleeft)', meaning: 'Requesting restaurant bill', speak: 'De rekening, alstublieft', langCode: 'nl-NL', langName: 'Dutch (Nederlands)' },
    { cat: 'Dining', english: 'It is delicious!', native: 'Het is heerlijk!', phonetic: 'Het is heerlijk! (Het is hayr-luk!)', meaning: 'Complimenting dining', speak: 'Het is heerlijk!', langCode: 'nl-NL', langName: 'Dutch (Nederlands)' },
    { cat: 'Directions', english: 'How much does this cost?', native: 'Hoeveel kost dit?', phonetic: 'Hoeveel kost dit? (Hoo-vayl kost dit?)', meaning: 'Price check', speak: 'Hoeveel kost dit?', langCode: 'nl-NL', langName: 'Dutch (Nederlands)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'Waar is het station?', phonetic: 'Waar is het station? (Vahr is het stah-tsyon?)', meaning: 'Directions to train or tram', speak: 'Waar is het station?', langCode: 'nl-NL', langName: 'Dutch (Nederlands)' },
    { cat: 'Safety', english: 'Help me, please!', native: 'Help mij, alstublieft!', phonetic: 'Help mij, alstublieft! (Help my ahls-too-bleeft!)', meaning: 'Emergency distress', speak: 'Help mij!', langCode: 'nl-NL', langName: 'Dutch (Nederlands)' }
  ],

  // 🇵🇱 Polish
  POLISH: [
    { cat: 'Greetings', english: 'Good day / Hello', native: 'Dzień dobry', phonetic: 'Dzień dobry (Jyen doh-bri)', meaning: 'Standard polite Polish greeting', speak: 'Dzień dobry', langCode: 'pl-PL', langName: 'Polish (Polski)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Dziękuję bardzo', phonetic: 'Dziękuję bardzo (Jyen-koo-yeh bar-dzoh)', meaning: 'Expressing gratitude', speak: 'Dziękuję bardzo', langCode: 'pl-PL', langName: 'Polish (Polski)' },
    { cat: 'Greetings', english: 'Please / You’re welcome', native: 'Proszę', phonetic: 'Proszę (Praw-sheh)', meaning: 'Polite etiquette', speak: 'Proszę', langCode: 'pl-PL', langName: 'Polish (Polski)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Poproszę rachunek', phonetic: 'Poproszę rachunek (Poh-praw-sheh rah-hoo-nek)', meaning: 'Asking for check', speak: 'Poproszę rachunek', langCode: 'pl-PL', langName: 'Polish (Polski)' },
    { cat: 'Dining', english: 'This is delicious!', native: 'To jest pyszne!', phonetic: 'To jest pyszne! (Toh yest pish-neh!)', meaning: 'Complimenting Polish cuisine', speak: 'To jest pyszne!', langCode: 'pl-PL', langName: 'Polish (Polski)' },
    { cat: 'Directions', english: 'How much is this?', native: 'Ile to kosztuje?', phonetic: 'Ile to kosztuje? (Ee-leh toh kosh-too-yeh?)', meaning: 'Price check', speak: 'Ile to kosztuje?', langCode: 'pl-PL', langName: 'Polish (Polski)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'Gdzie jest stacja?', phonetic: 'Gdzie jest stacja? (Gjeh yest staht-tsyah?)', meaning: 'Directions to station', speak: 'Gdzie jest stacja?', langCode: 'pl-PL', langName: 'Polish (Polski)' },
    { cat: 'Safety', english: 'Help!', native: 'Pomocy!', phonetic: 'Pomocy! (Poh-maw-tsi!)', meaning: 'Emergency distress call', speak: 'Pomocy!', langCode: 'pl-PL', langName: 'Polish (Polski)' }
  ],

  // 🇸🇪 Swedish / Nordic
  SWEDISH: [
    { cat: 'Greetings', english: 'Hello / Hi', native: 'Hej / Hallå', phonetic: 'Hej / Hallå (Hey / Hahl-loh)', meaning: 'Universal Nordic greeting', speak: 'Hej, god dag', langCode: 'sv-SE', langName: 'Swedish (Svenska)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Tack så mycket', phonetic: 'Tack så mycket (Tahk soh mee-keh)', meaning: 'Warm appreciation', speak: 'Tack så mycket', langCode: 'sv-SE', langName: 'Swedish (Svenska)' },
    { cat: 'Greetings', english: 'Please', native: 'Snälla / Vänligen', phonetic: 'Snälla (Sneh-lah)', meaning: 'Polite request', speak: 'Snälla', langCode: 'sv-SE', langName: 'Swedish (Svenska)' },
    { cat: 'Dining', english: 'The check, please', native: 'Notan, tack', phonetic: 'Notan, tack (Noh-tahn tahk)', meaning: 'Asking for restaurant check', speak: 'Notan, tack', langCode: 'sv-SE', langName: 'Swedish (Svenska)' },
    { cat: 'Dining', english: 'It is delicious!', native: 'Det är jättegott!', phonetic: 'Det är jättegott! (Deh ehr yeh-teh-got!)', meaning: 'Complimenting Scandinavian dining', speak: 'Det är jättegott!', langCode: 'sv-SE', langName: 'Swedish (Svenska)' },
    { cat: 'Directions', english: 'How much does this cost?', native: 'Hur mycket kostar det?', phonetic: 'Hur mycket kostar det? (Hoor mee-keh kos-tar deh?)', meaning: 'Price inquiry', speak: 'Hur mycket kostar det?', langCode: 'sv-SE', langName: 'Swedish (Svenska)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'Var ligger stationen?', phonetic: 'Var ligger stationen? (Vahr lig-gahr stah-shoo-nen?)', meaning: 'Subway or train navigation', speak: 'Var ligger stationen?', langCode: 'sv-SE', langName: 'Swedish (Svenska)' },
    { cat: 'Safety', english: 'Help me!', native: 'Hjälp mig!', phonetic: 'Hjälp mig! (Yelp mey!)', meaning: 'Emergency distress', speak: 'Hjälp mig, snälla!', langCode: 'sv-SE', langName: 'Swedish (Svenska)' }
  ],

  // 🇰🇪 / 🇹🇿 Swahili
  SWAHILI: [
    { cat: 'Greetings', english: 'Hello / How are you', native: 'Jambo / Habari', phonetic: 'Jambo / Habari (Jahm-boh / Hah-bah-ree)', meaning: 'Traditional warm East African greeting', speak: 'Habari za leo', langCode: 'sw-KE', langName: 'Swahili (Kiswahili)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Asante sana', phonetic: 'Asante sana (Ah-sahn-teh sah-nah)', meaning: 'Heartfelt gratitude', speak: 'Asante sana', langCode: 'sw-KE', langName: 'Swahili (Kiswahili)' },
    { cat: 'Greetings', english: 'Please', native: 'Tafadhali', phonetic: 'Tafadhali (Tah-fah-dhah-lee)', meaning: 'Polite request', speak: 'Tafadhali', langCode: 'sw-KE', langName: 'Swahili (Kiswahili)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Hesabu, tafadhali', phonetic: 'Hesabu, tafadhali (Heh-sah-boo tah-fah-dhah-lee)', meaning: 'Asking for the dining bill', speak: 'Leta bili tafadhali', langCode: 'sw-KE', langName: 'Swahili (Kiswahili)' },
    { cat: 'Dining', english: 'Food is very delicious!', native: 'Chakula kitamu sana!', phonetic: 'Chakula kitamu sana! (Chah-koo-lah kee-tah-moo sah-nah!)', meaning: 'Complimenting meal taste', speak: 'Chakula ni kitamu sana!', langCode: 'sw-KE', langName: 'Swahili (Kiswahili)' },
    { cat: 'Directions', english: 'How much is this?', native: 'Hii ni pesa ngapi?', phonetic: 'Hii ni pesa ngapi? (Hee nee peh-sah ngah-pee?)', meaning: 'Market and safari pricing', speak: 'Hii ni pesa ngapi?', langCode: 'sw-KE', langName: 'Swahili (Kiswahili)' },
    { cat: 'Directions', english: 'Where is the station / bus stop?', native: 'Kituo kiko wapi?', phonetic: 'Kituo kiko wapi? (Kee-too-oh kee-koh wah-pee?)', meaning: 'Transit navigation', speak: 'Kituo kiko wapi?', langCode: 'sw-KE', langName: 'Swahili (Kiswahili)' },
    { cat: 'Safety', english: 'Help me!', native: 'Nisaidie!', phonetic: 'Nisaidie! (Nee-sah-ee-dee-eh!)', meaning: 'Emergency cry for help', speak: 'Nisaidie, tafadhali!', langCode: 'sw-KE', langName: 'Swahili (Kiswahili)' }
  ],

  // 🇺🇸 / 🇬🇧 / 🇦🇺 International English
  ENGLISH: [
    { cat: 'Greetings', english: 'Hello & Welcome', native: 'Hello & Welcome', phonetic: 'Hello (Heh-loh)', meaning: 'Universal friendly greeting', speak: 'Hello and welcome', langCode: 'en-US', langName: 'English (International)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Thank you very much', phonetic: 'Thank you (Thank-yoo)', meaning: 'Expressing polite gratitude', speak: 'Thank you very much', langCode: 'en-US', langName: 'English (International)' },
    { cat: 'Greetings', english: 'Excuse me / Please', native: 'Excuse me, please', phonetic: 'Excuse me (Ex-kyooz mee)', meaning: 'Polite interruption or request', speak: 'Excuse me, please', langCode: 'en-US', langName: 'English (International)' },
    { cat: 'Dining', english: 'Check / Bill, please', native: 'Check / Bill, please', phonetic: 'Check please (Chek pleez)', meaning: 'Asking for dining bill', speak: 'Could we please have the check?', langCode: 'en-US', langName: 'English (International)' },
    { cat: 'Dining', english: 'This is delicious!', native: 'This is delicious!', phonetic: 'Delicious (Dih-lish-us)', meaning: 'Complimenting the meal', speak: 'This meal is delicious!', langCode: 'en-US', langName: 'English (International)' },
    { cat: 'Directions', english: 'How much is this?', native: 'How much is this?', phonetic: 'How much (How muhch)', meaning: 'Price check', speak: 'Excuse me, how much is this?', langCode: 'en-US', langName: 'English (International)' },
    { cat: 'Directions', english: 'Where is the transit station?', native: 'Where is the station?', phonetic: 'Where is the station (Wayr iz thuh stay-shun)', meaning: 'Asking transit directions', speak: 'Where is the nearest transit station?', langCode: 'en-US', langName: 'English (International)' },
    { cat: 'Safety', english: 'Please help me!', native: 'Please help me!', phonetic: 'Help me (Help mee)', meaning: 'Emergency assistance request', speak: 'Please help me, I need assistance!', langCode: 'en-US', langName: 'English (International)' }
  ]
};

// Map ISO country codes directly to their primary native Language Pack
export const COUNTRY_TO_LANGUAGE_MAP = {
  // Chinese
  CN: 'MANDARIN', TW: 'MANDARIN', HK: 'MANDARIN', MO: 'MANDARIN', SG: 'MANDARIN',
  // Japanese
  JP: 'JAPANESE',
  // Spanish
  ES: 'SPANISH', MX: 'SPANISH', AR: 'SPANISH', CO: 'SPANISH', CL: 'SPANISH',
  PE: 'SPANISH', VE: 'SPANISH', EC: 'SPANISH', GT: 'SPANISH', CU: 'SPANISH',
  DO: 'SPANISH', BO: 'SPANISH', HN: 'SPANISH', PY: 'SPANISH', SV: 'SPANISH',
  NI: 'SPANISH', CR: 'SPANISH', PA: 'SPANISH', UY: 'SPANISH', PR: 'SPANISH', GQ: 'SPANISH',
  // French
  FR: 'FRENCH', MC: 'FRENCH', BE: 'FRENCH', SN: 'FRENCH', CI: 'FRENCH',
  CD: 'FRENCH', CM: 'FRENCH', MG: 'FRENCH', ML: 'FRENCH', NE: 'FRENCH',
  BF: 'FRENCH', GN: 'FRENCH', RW: 'FRENCH', BI: 'FRENCH', TG: 'FRENCH',
  BJ: 'FRENCH', GA: 'FRENCH', CG: 'FRENCH', DJ: 'FRENCH',
  // German
  DE: 'GERMAN', AT: 'GERMAN', CH: 'GERMAN', LI: 'GERMAN', LU: 'GERMAN',
  // Italian
  IT: 'ITALIAN', SM: 'ITALIAN', VA: 'ITALIAN',
  // Hindi
  IN: 'HINDI', NP: 'HINDI',
  // Arabic
  SA: 'ARABIC', AE: 'ARABIC', EG: 'ARABIC', QA: 'ARABIC', KW: 'ARABIC',
  OM: 'ARABIC', BH: 'ARABIC', JO: 'ARABIC', LB: 'ARABIC', IQ: 'ARABIC',
  SY: 'ARABIC', YE: 'ARABIC', MA: 'ARABIC', DZ: 'ARABIC', TN: 'ARABIC',
  LY: 'ARABIC', SD: 'ARABIC', MR: 'ARABIC',
  // Russian
  RU: 'RUSSIAN', BY: 'RUSSIAN', KZ: 'RUSSIAN', KG: 'RUSSIAN', TJ: 'RUSSIAN', UZ: 'RUSSIAN',
  // Portuguese
  BR: 'PORTUGUESE', PT: 'PORTUGUESE', AO: 'PORTUGUESE', MZ: 'PORTUGUESE', CV: 'PORTUGUESE',
  // Korean
  KR: 'KOREAN', KP: 'KOREAN',
  // Thai
  TH: 'THAI',
  // Vietnamese
  VN: 'VIETNAMESE',
  // Indonesian / Malay
  ID: 'INDONESIAN', MY: 'INDONESIAN', BN: 'INDONESIAN',
  // Turkish
  TR: 'TURKISH', AZ: 'TURKISH',
  // Greek
  GR: 'GREEK', CY: 'GREEK',
  // Dutch
  NL: 'DUTCH', SR: 'DUTCH',
  // Polish
  PL: 'POLISH',
  // Swedish / Nordic
  SE: 'SWEDISH', NO: 'SWEDISH', DK: 'SWEDISH', FI: 'SWEDISH', IS: 'SWEDISH',
  // Swahili
  KE: 'SWAHILI', TZ: 'SWAHILI', UG: 'SWAHILI',
  // English
  US: 'ENGLISH', GB: 'ENGLISH', AU: 'ENGLISH', CA: 'ENGLISH', NZ: 'ENGLISH',
  IE: 'ENGLISH', ZA: 'ENGLISH', JM: 'ENGLISH', BS: 'ENGLISH', BB: 'ENGLISH', TT: 'ENGLISH'
};

// Backward-compatible alias for existing imports
export const ESSENTIAL_PHRASES = LANGUAGE_PACKS;

/**
 * Intelligently retrieves localized travel phrases for ANY country on Earth.
 * Ensures:
 * 1. English + Native script side-by-side for seamless traveler-to-local communication.
 * 2. Phonetic pronunciation so travelers know how to say it.
 * 3. Exact native voice speech string + IETF language code for Web Speech API.
 */
export function getPhrasesForCountry(country) {
  if (!country) return LANGUAGE_PACKS.ENGLISH;

  const code = (country.code || '').toUpperCase();
  const name = (country.name || '').toLowerCase();
  const officialName = (country.officialName || '').toLowerCase();
  const languages = (country.languages || '').toLowerCase();

  let packKey = null;

  // 1. Direct country code lookup
  if (COUNTRY_TO_LANGUAGE_MAP[code]) {
    packKey = COUNTRY_TO_LANGUAGE_MAP[code];
  }

  // 2. Country name / official name matches
  if (!packKey) {
    if (code === 'CN' || name.includes('china') || officialName.includes('china') || officialName.includes('中华')) packKey = 'MANDARIN';
    else if (code === 'JP' || name.includes('japan')) packKey = 'JAPANESE';
    else if (code === 'ES' || name.includes('spain')) packKey = 'SPANISH';
    else if (code === 'FR' || name.includes('france')) packKey = 'FRENCH';
    else if (code === 'DE' || name.includes('germany')) packKey = 'GERMAN';
    else if (code === 'IT' || name.includes('italy')) packKey = 'ITALIAN';
    else if (code === 'IN' || name.includes('india')) packKey = 'HINDI';
    else if (code === 'RU' || name.includes('russia')) packKey = 'RUSSIAN';
    else if (code === 'KR' || name.includes('korea')) packKey = 'KOREAN';
    else if (code === 'BR' || code === 'PT' || name.includes('brazil') || name.includes('portugal')) packKey = 'PORTUGUESE';
    else if (code === 'TH' || name.includes('thailand')) packKey = 'THAI';
    else if (code === 'VN' || name.includes('vietnam')) packKey = 'VIETNAMESE';
    else if (code === 'ID' || name.includes('indonesia')) packKey = 'INDONESIAN';
    else if (code === 'TR' || name.includes('turkey')) packKey = 'TURKISH';
    else if (code === 'GR' || name.includes('greece')) packKey = 'GREEK';
    else if (code === 'NL' || name.includes('netherland')) packKey = 'DUTCH';
    else if (code === 'PL' || name.includes('poland')) packKey = 'POLISH';
    else if (code === 'SE' || name.includes('sweden')) packKey = 'SWEDISH';
  }

  // 3. Languages string analysis from country profile (e.g. "Mandarin", "Spanish", "Arabic")
  if (!packKey && languages) {
    if (languages.includes('chinese') || languages.includes('mandarin') || languages.includes('putonghua')) packKey = 'MANDARIN';
    else if (languages.includes('japanese')) packKey = 'JAPANESE';
    else if (languages.includes('spanish') || languages.includes('castilian') || languages.includes('español')) packKey = 'SPANISH';
    else if (languages.includes('french') || languages.includes('français')) packKey = 'FRENCH';
    else if (languages.includes('german') || languages.includes('deutsch')) packKey = 'GERMAN';
    else if (languages.includes('italian') || languages.includes('italiano')) packKey = 'ITALIAN';
    else if (languages.includes('hindi') || languages.includes('urdu') || languages.includes('bengali')) packKey = 'HINDI';
    else if (languages.includes('arabic')) packKey = 'ARABIC';
    else if (languages.includes('russian')) packKey = 'RUSSIAN';
    else if (languages.includes('portuguese') || languages.includes('português')) packKey = 'PORTUGUESE';
    else if (languages.includes('korean')) packKey = 'KOREAN';
    else if (languages.includes('thai')) packKey = 'THAI';
    else if (languages.includes('vietnamese')) packKey = 'VIETNAMESE';
    else if (languages.includes('indonesian') || languages.includes('malay')) packKey = 'INDONESIAN';
    else if (languages.includes('turkish')) packKey = 'TURKISH';
    else if (languages.includes('greek')) packKey = 'GREEK';
    else if (languages.includes('dutch')) packKey = 'DUTCH';
    else if (languages.includes('polish')) packKey = 'POLISH';
    else if (languages.includes('swedish') || languages.includes('danish') || languages.includes('norwegian')) packKey = 'SWEDISH';
    else if (languages.includes('swahili') || languages.includes('kiswahili')) packKey = 'SWAHILI';
    else if (languages.includes('english')) packKey = 'ENGLISH';
  }

  // 4. Region fallback heuristic
  if (!packKey) {
    const region = (country.region || '').toLowerCase();
    if (region.includes('latin') || region.includes('south america') || region.includes('central america')) packKey = 'SPANISH';
    else if (region.includes('middle east')) packKey = 'ARABIC';
    else packKey = 'ENGLISH';
  }

  const selectedPack = LANGUAGE_PACKS[packKey] || LANGUAGE_PACKS.ENGLISH;

  // Add backward-compatibility fields (script, text) so any other component still functions 100% seamlessly
  return selectedPack.map(item => ({
    ...item,
    script: item.native,
    text: `${item.english} • ${item.native}`
  }));
}

