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
    emergency: { police: isEurope ? '112' : '911 / 112', ambulance: isEurope ? '112' : '911 / 112', fire: isEurope ? '112' : '911 / 112' },
    tipping: 'Discretionary tips (5–10%) appreciated for good service.',
    transitCard: 'Local Metro Card & Contactless Bank Card'
  };
}

// 4. Comprehensive Multi-Language Phrase Packs
export const LANGUAGE_PACKS = {
  // 🇦🇫 Afghanistan - Pashto / Dari
  PASHTO: [
    { cat: 'Greetings', english: 'Hello', native: 'سلام', phonetic: 'Salam (Sah-lahm)', meaning: 'Universal traditional Afghan greeting', speak: 'سلام', langCode: 'ps-AF', langName: 'Pashto / Dari (پښتو / دری)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'ډېره مننه / تشکر', phonetic: 'Dera manana / Tashakor (Deh-rah mah-nah-nah)', meaning: 'Deep polite gratitude in Pashto and Dari', speak: 'ډېره مننه', langCode: 'ps-AF', langName: 'Pashto / Dari (پښتو / دری)' },
    { cat: 'Greetings', english: 'Excuse me / Please', native: 'لطفاً / بښنه غواړم', phonetic: 'Lutfan / Bakhshana ghwaram', meaning: 'Polite interruption or request', speak: 'مهرباني وکړئ', langCode: 'ps-AF', langName: 'Pashto / Dari (پښتو / دری)' },
    { cat: 'Dining', english: 'Check / Bill, please', native: 'حساب راکړئ، مهرباني وکړئ', phonetic: 'Hisaab raakrey, mehrabani (Hee-sahb rah-kray)', meaning: 'Asking for dining bill / check', speak: 'حساب راکړئ', langCode: 'ps-AF', langName: 'Pashto / Dari (پښتو / دری)' },
    { cat: 'Dining', english: 'This is delicious!', native: 'دا ډېر خوندور دی!', phonetic: 'Daa der khwandawar day! (Dah dare khwan-dah-wahr dai!)', meaning: 'Complimenting Afghan cuisine like Kabuli pulao', speak: 'دا ډېر خوندور دی', langCode: 'ps-AF', langName: 'Pashto / Dari (پښتو / دری)' },
    { cat: 'Directions', english: 'How much is this?', native: 'دا په څو دی؟', phonetic: 'Daa pa tso day? (Dah pah tso dai?)', meaning: 'Bazaar and market price check', speak: 'دا په څو دی؟', langCode: 'ps-AF', langName: 'Pashto / Dari (پښتو / دری)' },
    { cat: 'Directions', english: 'Where is the station / road?', native: 'لار / تمځای چیرته دی؟', phonetic: 'Laar / Tamzay chirta day? (Lahr / Tahm-zay cheer-tah dai?)', meaning: 'Asking transit directions', speak: 'تمځای چیرته دی؟', langCode: 'ps-AF', langName: 'Pashto / Dari (پښتو / دری)' },
    { cat: 'Safety', english: 'Please help me! (Emergency)', native: 'مهرباني وکړئ مرسته راسره وکړئ!', phonetic: 'Mehrabani wokrey mrasta raasara wokrey! (Mrasta wokrey!)', meaning: 'Urgent emergency assistance cry', speak: 'مرسته وکړئ!', langCode: 'ps-AF', langName: 'Pashto / Dari (پښتو / دری)' }
  ],

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

  // 🇳🇴 Norwegian
  NORWEGIAN: [
    { cat: 'Greetings', english: 'Hello / Good day', native: 'God dag / Hei', phonetic: 'God dag / Hei (Goo dahg / Hey)', meaning: 'Universal friendly Norwegian greeting', speak: 'God dag', langCode: 'nb-NO', langName: 'Norwegian (Norsk)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Tusen takk', phonetic: 'Tusen takk (Too-sen tahk)', meaning: 'Expressing warm gratitude', speak: 'Tusen takk', langCode: 'nb-NO', langName: 'Norwegian (Norsk)' },
    { cat: 'Greetings', english: 'Please', native: 'Vær så snill', phonetic: 'Vær så snill (Vair soh snil)', meaning: 'Polite request', speak: 'Vær så snill', langCode: 'nb-NO', langName: 'Norwegian (Norsk)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Regningen, takk', phonetic: 'Regningen, takk (Rayn-ing-en tahk)', meaning: 'Asking for restaurant bill', speak: 'Regningen, takk', langCode: 'nb-NO', langName: 'Norwegian (Norsk)' },
    { cat: 'Dining', english: 'This is delicious!', native: 'Dette er nydelig!', phonetic: 'Dette er nydelig! (Det-teh ehr nee-deh-lee!)', meaning: 'Complimenting dining', speak: 'Dette er nydelig!', langCode: 'nb-NO', langName: 'Norwegian (Norsk)' },
    { cat: 'Directions', english: 'How much is this?', native: 'Hva koster dette?', phonetic: 'Hva koster dette? (Vah kos-ter det-teh?)', meaning: 'Inquiring cost', speak: 'Hva koster dette?', langCode: 'nb-NO', langName: 'Norwegian (Norsk)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'Hvor er stasjonen?', phonetic: 'Hvor er stasjonen? (Vohr ehr stah-shoo-nen?)', meaning: 'Station navigation', speak: 'Hvor er stasjonen?', langCode: 'nb-NO', langName: 'Norwegian (Norsk)' },
    { cat: 'Safety', english: 'Help me!', native: 'Hjelp meg!', phonetic: 'Hjelp meg! (Yelp may!)', meaning: 'Emergency distress call', speak: 'Hjelp meg!', langCode: 'nb-NO', langName: 'Norwegian (Norsk)' }
  ],

  // 🇩🇰 Danish
  DANISH: [
    { cat: 'Greetings', english: 'Hello / Good day', native: 'Goddag / Hej', phonetic: 'Goddag / Hej (Goh-dah / Hey)', meaning: 'Universal friendly Danish greeting', speak: 'Goddag', langCode: 'da-DK', langName: 'Danish (Dansk)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Mange tak', phonetic: 'Mange tak (Mahn-geh tahk)', meaning: 'Warm gratitude', speak: 'Mange tak', langCode: 'da-DK', langName: 'Danish (Dansk)' },
    { cat: 'Greetings', english: 'Please', native: 'Vær så venlig', phonetic: 'Vær så venlig (Vair soh ven-lee)', meaning: 'Polite request', speak: 'Vær så venlig', langCode: 'da-DK', langName: 'Danish (Dansk)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Regningen, tak', phonetic: 'Regningen, tak (Rye-ning-en tahk)', meaning: 'Asking for dining bill', speak: 'Regningen, tak', langCode: 'da-DK', langName: 'Danish (Dansk)' },
    { cat: 'Dining', english: 'It tastes fantastic!', native: 'Det smager fantastisk!', phonetic: 'Det smager fantastisk! (Deh smah-er fahn-tahs-teesk!)', meaning: 'Complimenting Danish cuisine', speak: 'Det smager fantastisk!', langCode: 'da-DK', langName: 'Danish (Dansk)' },
    { cat: 'Directions', english: 'How much does it cost?', native: 'Hvor meget koster det?', phonetic: 'Hvor meget koster det? (Vohr my-et kos-ter deh?)', meaning: 'Price inquiry', speak: 'Hvor meget koster det?', langCode: 'da-DK', langName: 'Danish (Dansk)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'Hvor er stationen?', phonetic: 'Hvor er stationen? (Vohr ehr stah-shoo-nen?)', meaning: 'Station directions', speak: 'Hvor er stationen?', langCode: 'da-DK', langName: 'Danish (Dansk)' },
    { cat: 'Safety', english: 'Help me, please!', native: 'Hjælp mig, venligst!', phonetic: 'Hjælp mig! (Yelp my ven-leest!)', meaning: 'Emergency distress', speak: 'Hjælp mig!', langCode: 'da-DK', langName: 'Danish (Dansk)' }
  ],

  // 🇫🇮 Finland - Finnish
  FINNISH: [
    { cat: 'Greetings', english: 'Hello / Good day', native: 'Hyvää päivää / Hei', phonetic: 'Hyvää päivää (Hoo-vaa pie-vaa / Hay)', meaning: 'Universal Finnish greeting', speak: 'Hyvää päivää', langCode: 'fi-FI', langName: 'Finnish (Suomi)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Kiitos paljon', phonetic: 'Kiitos paljon (Kee-toss pahl-yon)', meaning: 'Heartfelt gratitude', speak: 'Kiitos paljon', langCode: 'fi-FI', langName: 'Finnish (Suomi)' },
    { cat: 'Greetings', english: 'Please / You’re welcome', native: 'Ole hyvä', phonetic: 'Ole hyvä (Oh-leh hoo-vah)', meaning: 'Polite phrase', speak: 'Ole hyvä', langCode: 'fi-FI', langName: 'Finnish (Suomi)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Lasku, kiitos', phonetic: 'Lasku, kiitos (Lahs-koo kee-toss)', meaning: 'Asking for check', speak: 'Lasku, kiitos', langCode: 'fi-FI', langName: 'Finnish (Suomi)' },
    { cat: 'Dining', english: 'This is delicious!', native: 'Tämä on herkullista!', phonetic: 'Tämä on herkullista! (Tah-ma on her-kool-leesta!)', meaning: 'Complimenting meal', speak: 'Tämä on herkullista!', langCode: 'fi-FI', langName: 'Finnish (Suomi)' },
    { cat: 'Directions', english: 'How much does this cost?', native: 'Paljonko tämä maksaa?', phonetic: 'Paljonko tämä maksaa? (Pahl-yon-ko tah-ma mahk-sah?)', meaning: 'Price check', speak: 'Paljonko tämä maksaa?', langCode: 'fi-FI', langName: 'Finnish (Suomi)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'Missä on asema?', phonetic: 'Missä on asema? (Mees-sa on ah-seh-mah?)', meaning: 'Directions to station', speak: 'Missä on asema?', langCode: 'fi-FI', langName: 'Finnish (Suomi)' },
    { cat: 'Safety', english: 'Help me!', native: 'Auttakaa!', phonetic: 'Auttakaa! (Ow-tah-kah!)', meaning: 'Emergency distress call', speak: 'Auttakaa!', langCode: 'fi-FI', langName: 'Finnish (Suomi)' }
  ],

  // 🇺🇦 Ukrainian
  UKRAINIAN: [
    { cat: 'Greetings', english: 'Good day / Hello', native: 'Добрий день / Вітаю', phonetic: 'Dobryi den / Vitayu (Doh-briy den)', meaning: 'Polite daytime greeting', speak: 'Добрий день', langCode: 'uk-UA', langName: 'Ukrainian (Українська)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Щиро дякую', phonetic: 'Shchyro dyakuyu (Shchih-roh dyah-koo-yoo)', meaning: 'Heartfelt gratitude', speak: 'Дуже дякую', langCode: 'uk-UA', langName: 'Ukrainian (Українська)' },
    { cat: 'Greetings', english: 'Please / You’re welcome', native: 'Будь ласка', phonetic: 'Bud laska (Bood lah-skah)', meaning: 'Universal polite etiquette', speak: 'Будь ласка', langCode: 'uk-UA', langName: 'Ukrainian (Українська)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Рахунок, будь ласка', phonetic: 'Rakhunok, bud laska (Rah-khoo-nok bood lah-skah)', meaning: 'Requesting dining check', speak: 'Рахунок, будь ласка', langCode: 'uk-UA', langName: 'Ukrainian (Українська)' },
    { cat: 'Dining', english: 'This is very tasty!', native: 'Це дуже смачно!', phonetic: 'Tse duzhe smachno! (Tseh doo-zheh smahch-noh!)', meaning: 'Complimenting traditional borscht or dumplings', speak: 'Це дуже смачно!', langCode: 'uk-UA', langName: 'Ukrainian (Українська)' },
    { cat: 'Directions', english: 'How much does this cost?', native: 'Скільки це коштує?', phonetic: 'Skilky tse koshtuye? (Skeel-kih tseh kosh-too-yeh?)', meaning: 'Price check', speak: 'Скільки це коштує?', langCode: 'uk-UA', langName: 'Ukrainian (Українська)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'Де знаходиться вокзал?', phonetic: 'De znakhodytsya vokzal? (Deh znah-khoh-dyt-syah vohk-zahl?)', meaning: 'Train / transit location', speak: 'Де знаходиться вокзал?', langCode: 'uk-UA', langName: 'Ukrainian (Українська)' },
    { cat: 'Safety', english: 'Help me, please!', native: 'Допоможіть, будь ласка!', phonetic: 'Dopomozhit, bud laska! (Doh-poh-moh-zheet bood lah-skah!)', meaning: 'Emergency distress call', speak: 'Допоможіть, будь ласка!', langCode: 'uk-UA', langName: 'Ukrainian (Українська)' }
  ],

  // 🇨🇿 Czech
  CZECH: [
    { cat: 'Greetings', english: 'Good day / Hello', native: 'Dobrý den', phonetic: 'Dobrý den (Doh-bree dehn)', meaning: 'Standard polite greeting', speak: 'Dobrý den', langCode: 'cs-CZ', langName: 'Czech (Čeština)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Děkuji mnohokrát', phonetic: 'Děkuji mnohokrát (Dyeh-koo-yee mnoh-hoh-kraht)', meaning: 'Expressing gratitude', speak: 'Děkuji mnohokrát', langCode: 'cs-CZ', langName: 'Czech (Čeština)' },
    { cat: 'Greetings', english: 'Please', native: 'Prosím', phonetic: 'Prosím (Praw-seem)', meaning: 'Polite request', speak: 'Prosím', langCode: 'cs-CZ', langName: 'Czech (Čeština)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Účet, prosím', phonetic: 'Účet, prosím (Oo-chet praw-seem)', meaning: 'Asking for check', speak: 'Účet, prosím', langCode: 'cs-CZ', langName: 'Czech (Čeština)' },
    { cat: 'Dining', english: 'It is delicious!', native: 'Je to výborné!', phonetic: 'Je to výborné! (Yeh toh vee-bor-nay!)', meaning: 'Praising Czech food', speak: 'Je to výborné!', langCode: 'cs-CZ', langName: 'Czech (Čeština)' },
    { cat: 'Directions', english: 'How much does it cost?', native: 'Kolik to stojí?', phonetic: 'Kolik to stojí? (Koh-lik toh stoy-ee?)', meaning: 'Price check', speak: 'Kolik to stojí?', langCode: 'cs-CZ', langName: 'Czech (Čeština)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'Kde je nádraží?', phonetic: 'Kde je nádraží? (Gdeh yeh nah-drah-zhee?)', meaning: 'Train station navigation', speak: 'Kde je nádraží?', langCode: 'cs-CZ', langName: 'Czech (Čeština)' },
    { cat: 'Safety', english: 'Help me, please!', native: 'Pomozte mi, prosím!', phonetic: 'Pomozte mi, prosím! (Poh-moz-teh mee praw-seem!)', meaning: 'Emergency distress', speak: 'Pomozte mi, prosím!', langCode: 'cs-CZ', langName: 'Czech (Čeština)' }
  ],

  // 🇸🇰 Slovak
  SLOVAK: [
    { cat: 'Greetings', english: 'Good day / Hello', native: 'Dobrý deň', phonetic: 'Dobrý deň (Doh-bree dehn)', meaning: 'Polite Slovak greeting', speak: 'Dobrý deň', langCode: 'sk-SK', langName: 'Slovak (Slovenčina)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Ďakujem pekne', phonetic: 'Ďakujem pekne (Dyah-koo-yem pek-neh)', meaning: 'Gratitude', speak: 'Ďakujem pekne', langCode: 'sk-SK', langName: 'Slovak (Slovenčina)' },
    { cat: 'Greetings', english: 'Please', native: 'Prosím', phonetic: 'Prosím (Praw-seem)', meaning: 'Polite etiquette', speak: 'Prosím', langCode: 'sk-SK', langName: 'Slovak (Slovenčina)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Účet, prosím', phonetic: 'Účet, prosím (Oo-chet praw-seem)', meaning: 'Asking for check', speak: 'Účet, prosím', langCode: 'sk-SK', langName: 'Slovak (Slovenčina)' },
    { cat: 'Dining', english: 'It is delicious!', native: 'Je to vynikajúce!', phonetic: 'Je to vynikajúce! (Yeh toh vih-nee-kah-yoo-tseh!)', meaning: 'Complimenting meal', speak: 'Je to vynikajúce!', langCode: 'sk-SK', langName: 'Slovak (Slovenčina)' },
    { cat: 'Directions', english: 'How much is this?', native: 'Koľko to stojí?', phonetic: 'Koľko to stojí? (Kol-koh toh stoy-ee?)', meaning: 'Price inquiry', speak: 'Koľko to stojí?', langCode: 'sk-SK', langName: 'Slovak (Slovenčina)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'Kde je stanica?', phonetic: 'Kde je stanica? (Gdeh yeh stah-nee-tsah?)', meaning: 'Transit navigation', speak: 'Kde je stanica?', langCode: 'sk-SK', langName: 'Slovak (Slovenčina)' },
    { cat: 'Safety', english: 'Help me, please!', native: 'Pomoc, prosím!', phonetic: 'Pomoc, prosím! (Poh-mots praw-seem!)', meaning: 'Emergency distress', speak: 'Pomoc, prosím!', langCode: 'sk-SK', langName: 'Slovak (Slovenčina)' }
  ],

  // 🇭🇺 Hungarian
  HUNGARIAN: [
    { cat: 'Greetings', english: 'Good day / Hello', native: 'Jó napot kívánok', phonetic: 'Jó napot kívánok (Yoh nah-poht kee-vah-nohk)', meaning: 'Polite daytime greeting', speak: 'Jó napot kívánok', langCode: 'hu-HU', langName: 'Hungarian (Magyar)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Köszönöm szépen', phonetic: 'Köszönöm szépen (Kuh-suh-nuhm say-pen)', meaning: 'Heartfelt thanks', speak: 'Köszönöm szépen', langCode: 'hu-HU', langName: 'Hungarian (Magyar)' },
    { cat: 'Greetings', english: 'Please', native: 'Kérem', phonetic: 'Kérem (Kay-rem)', meaning: 'Polite request', speak: 'Kérem', langCode: 'hu-HU', langName: 'Hungarian (Magyar)' },
    { cat: 'Dining', english: 'The bill, please', native: 'A számlát, kérem', phonetic: 'A számlát, kérem (Ah sahm-laht kay-rem)', meaning: 'Requesting dining bill', speak: 'A számlát, kérem', langCode: 'hu-HU', langName: 'Hungarian (Magyar)' },
    { cat: 'Dining', english: 'It is delicious!', native: 'Nagyon finom!', phonetic: 'Nagyon finom! (Nah-jyon fee-nohm!)', meaning: 'Complimenting Hungarian goulash and dining', speak: 'Nagyon finom!', langCode: 'hu-HU', langName: 'Hungarian (Magyar)' },
    { cat: 'Directions', english: 'How much does this cost?', native: 'Mennyibe kerül ez?', phonetic: 'Mennyibe kerül ez? (Men-nyee-beh keh-rool ez?)', meaning: 'Price check', speak: 'Mennyibe kerül ez?', langCode: 'hu-HU', langName: 'Hungarian (Magyar)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'Hol van az állomás?', phonetic: 'Hol van az állomás? (Hohl vahn ahz ahl-loh-mahsh?)', meaning: 'Finding station', speak: 'Hol van az állomás?', langCode: 'hu-HU', langName: 'Hungarian (Magyar)' },
    { cat: 'Safety', english: 'Help me, please!', native: 'Segítség, kérem!', phonetic: 'Segítség, kérem! (Sheh-geet-shayg kay-rem!)', meaning: 'Emergency distress', speak: 'Segítség!', langCode: 'hu-HU', langName: 'Hungarian (Magyar)' }
  ],

  // 🇷🇴 Romania & Moldova - Romanian
  ROMANIAN: [
    { cat: 'Greetings', english: 'Good day / Hello', native: 'Bună ziua', phonetic: 'Bună ziua (Boo-nuh zee-wah)', meaning: 'Standard polite Romanian greeting', speak: 'Bună ziua', langCode: 'ro-RO', langName: 'Romanian (Română)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Mulțumesc mult', phonetic: 'Mulțumesc mult (Mool-tsoo-mesk moolt)', meaning: 'Warm gratitude', speak: 'Mulțumesc mult', langCode: 'ro-RO', langName: 'Romanian (Română)' },
    { cat: 'Greetings', english: 'Please', native: 'Vă rog', phonetic: 'Vă rog (Vuh rohg)', meaning: 'Polite request', speak: 'Vă rog', langCode: 'ro-RO', langName: 'Romanian (Română)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Nota de plată, vă rog', phonetic: 'Nota de plată, vă rog (Noh-tah deh plah-tuh vuh rohg)', meaning: 'Asking for restaurant bill', speak: 'Nota de plată, vă rog', langCode: 'ro-RO', langName: 'Romanian (Română)' },
    { cat: 'Dining', english: 'It is delicious!', native: 'Este foarte delicios!', phonetic: 'Este foarte delicios! (Es-teh fwar-teh deh-lee-chohs!)', meaning: 'Complimenting food', speak: 'Este foarte delicios!', langCode: 'ro-RO', langName: 'Romanian (Română)' },
    { cat: 'Directions', english: 'How much does this cost?', native: 'Cât costă acesta?', phonetic: 'Cât costă acesta? (Kuht kos-tuh ah-ches-tah?)', meaning: 'Price check', speak: 'Cât costă acesta?', langCode: 'ro-RO', langName: 'Romanian (Română)' },
    { cat: 'Directions', english: 'Where is the train station?', native: 'Unde este gara?', phonetic: 'Unde este gara? (Oon-deh es-teh gah-rah?)', meaning: 'Finding train station', speak: 'Unde este gara?', langCode: 'ro-RO', langName: 'Romanian (Română)' },
    { cat: 'Safety', english: 'Help me, please!', native: 'Ajutor, vă rog!', phonetic: 'Ajutor, vă rog! (Ah-zhoo-tor vuh rohg!)', meaning: 'Emergency distress', speak: 'Ajutor, vă rog!', langCode: 'ro-RO', langName: 'Romanian (Română)' }
  ],

  // 🇧🇬 Bulgaria - Bulgarian
  BULGARIAN: [
    { cat: 'Greetings', english: 'Hello / Good day', native: 'Здравейте', phonetic: 'Zdraveite (Zdra-vey-teh)', meaning: 'Polite Bulgarian greeting', speak: 'Здравейте', langCode: 'bg-BG', langName: 'Bulgarian (Български)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Благодаря ви много', phonetic: 'Blagodarya vi mnogo (Blah-goh-dah-ryah vee mnoh-goh)', meaning: 'Sincere appreciation', speak: 'Благодаря ви много', langCode: 'bg-BG', langName: 'Bulgarian (Български)' },
    { cat: 'Greetings', english: 'Please / You’re welcome', native: 'Моля', phonetic: 'Molya (Moh-lyah)', meaning: 'Polite etiquette', speak: 'Моля', langCode: 'bg-BG', langName: 'Bulgarian (Български)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Сметката, моля', phonetic: 'Smetkata, molya (Smet-kah-tah moh-lyah)', meaning: 'Asking for dining bill', speak: 'Сметката, моля', langCode: 'bg-BG', langName: 'Bulgarian (Български)' },
    { cat: 'Dining', english: 'This is delicious!', native: 'Много е вкусно!', phonetic: 'Mnogo e vkusno! (Mnoh-goh eh vkoos-noh!)', meaning: 'Complimenting Bulgarian food', speak: 'Много е вкусно!', langCode: 'bg-BG', langName: 'Bulgarian (Български)' },
    { cat: 'Directions', english: 'How much is this?', native: 'Колко струва това?', phonetic: 'Kolko struva tova? (Kol-koh stroo-vah toh-vah?)', meaning: 'Price check', speak: 'Колко струва това?', langCode: 'bg-BG', langName: 'Bulgarian (Български)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'Къде е гарата?', phonetic: 'Kade e garata? (Kuh-deh eh gah-rah-tah?)', meaning: 'Directions to station', speak: 'Къде е гарата?', langCode: 'bg-BG', langName: 'Bulgarian (Български)' },
    { cat: 'Safety', english: 'Help me, please!', native: 'Помощ, моля!', phonetic: 'Pomosht, molya! (Poh-mosht moh-lyah!)', meaning: 'Emergency cry for help', speak: 'Помощ, моля!', langCode: 'bg-BG', langName: 'Bulgarian (Български)' }
  ],

  // 🇭🇷 / 🇷🇸 / 🇧🇦 South Slavic (Croatian, Serbian, Bosnian, Montenegrin)
  SOUTH_SLAVIC: [
    { cat: 'Greetings', english: 'Good day / Hello', native: 'Dobar dan / Добар дан', phonetic: 'Dobar dan (Doh-bahr dahn)', meaning: 'Universal friendly greeting', speak: 'Dobar dan', langCode: 'hr-HR', langName: 'South Slavic (Hrvatski / Srpski / Bosanski)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Hvala vam puno / Хвала', phonetic: 'Hvala vam puno (Khvah-lah vahm poo-noh)', meaning: 'Warm gratitude', speak: 'Hvala vam puno', langCode: 'hr-HR', langName: 'South Slavic (Hrvatski / Srpski / Bosanski)' },
    { cat: 'Greetings', english: 'Please', native: 'Molim vas / Молим', phonetic: 'Molim vas (Moh-leem vahs)', meaning: 'Polite request', speak: 'Molim vas', langCode: 'hr-HR', langName: 'South Slavic (Hrvatski / Srpski / Bosanski)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Račun, molim vas / Рачун', phonetic: 'Račun, molim vas (Rah-choon moh-leem vahs)', meaning: 'Asking for the check', speak: 'Račun, molim vas', langCode: 'hr-HR', langName: 'South Slavic (Hrvatski / Srpski / Bosanski)' },
    { cat: 'Dining', english: 'It is very tasty!', native: 'Jako je ukusno! / Укусно!', phonetic: 'Jako je ukusno! (Yah-koh yeh oo-koos-noh!)', meaning: 'Complimenting Balkan cuisine', speak: 'Jako je ukusno!', langCode: 'hr-HR', langName: 'South Slavic (Hrvatski / Srpski / Bosanski)' },
    { cat: 'Directions', english: 'How much does this cost?', native: 'Koliko ovo košta? / Колико кошта?', phonetic: 'Koliko ovo košta? (Koh-lee-koh oh-voh kosh-tah?)', meaning: 'Price check', speak: 'Koliko ovo košta?', langCode: 'hr-HR', langName: 'South Slavic (Hrvatski / Srpski / Bosanski)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'Gdje je stanica? / Где је станица?', phonetic: 'Gdje je stanica? (Gd-yeh yeh stah-nee-tsah?)', meaning: 'Directions to station', speak: 'Gdje je stanica?', langCode: 'hr-HR', langName: 'South Slavic (Hrvatski / Srpski / Bosanski)' },
    { cat: 'Safety', english: 'Help me, please!', native: 'Pomoć, molim vas! / Упомоћ!', phonetic: 'Pomoć, molim vas! (Poh-mohch moh-leem vahs!)', meaning: 'Emergency distress', speak: 'Upomoć!', langCode: 'hr-HR', langName: 'South Slavic (Hrvatski / Srpski / Bosanski)' }
  ],

  // 🇸🇮 Slovenia - Slovenian
  SLOVENIAN: [
    { cat: 'Greetings', english: 'Good day / Hello', native: 'Dober dan', phonetic: 'Dober dan (Doh-ber dahn)', meaning: 'Standard Slovenian greeting', speak: 'Dober dan', langCode: 'sl-SI', langName: 'Slovenian (Slovenščina)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Hvala lepa', phonetic: 'Hvala lepa (Khvah-lah leh-pah)', meaning: 'Warm thanks', speak: 'Hvala lepa', langCode: 'sl-SI', langName: 'Slovenian (Slovenščina)' },
    { cat: 'Greetings', english: 'Please', native: 'Prosim', phonetic: 'Prosim (Praw-seem)', meaning: 'Polite request', speak: 'Prosim', langCode: 'sl-SI', langName: 'Slovenian (Slovenščina)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Račun, prosim', phonetic: 'Račun, prosim (Rah-choon praw-seem)', meaning: 'Asking for check', speak: 'Račun, prosim', langCode: 'sl-SI', langName: 'Slovenian (Slovenščina)' },
    { cat: 'Dining', english: 'It is very delicious!', native: 'To je zelo okusno!', phonetic: 'To je zelo okusno! (Toh yeh zeh-loh oh-koos-noh!)', meaning: 'Complimenting food', speak: 'To je zelo okusno!', langCode: 'sl-SI', langName: 'Slovenian (Slovenščina)' },
    { cat: 'Directions', english: 'How much is this?', native: 'Koliko to stane?', phonetic: 'Koliko to stane? (Koh-lee-koh toh stah-neh?)', meaning: 'Price check', speak: 'Koliko to stane?', langCode: 'sl-SI', langName: 'Slovenian (Slovenščina)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'Kje je postaja?', phonetic: 'Kje je postaja? (K-yeh yeh poh-stah-yah?)', meaning: 'Station navigation', speak: 'Kje je postaja?', langCode: 'sl-SI', langName: 'Slovenian (Slovenščina)' },
    { cat: 'Safety', english: 'Help me, please!', native: 'Na pomoč, prosim!', phonetic: 'Na pomoč, prosim! (Nah poh-moch praw-seem!)', meaning: 'Emergency distress', speak: 'Na pomoč!', langCode: 'sl-SI', langName: 'Slovenian (Slovenščina)' }
  ],

  // 🇦🇱 Albania & Kosovo - Albanian
  ALBANIAN: [
    { cat: 'Greetings', english: 'Hello', native: 'Përshëndetje', phonetic: 'Përshëndetje (Pur-shen-det-yeh)', meaning: 'Universal polite Albanian greeting', speak: 'Përshëndetje', langCode: 'sq-AL', langName: 'Albanian (Shqip)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Faleminderit shumë', phonetic: 'Faleminderit shumë (Fah-leh-meen-deh-reet shoo-muh)', meaning: 'Expressing gratitude', speak: 'Faleminderit', langCode: 'sq-AL', langName: 'Albanian (Shqip)' },
    { cat: 'Greetings', english: 'Please', native: 'Ju lutem', phonetic: 'Ju lutem (Yoo loo-tem)', meaning: 'Polite etiquette', speak: 'Ju lutem', langCode: 'sq-AL', langName: 'Albanian (Shqip)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Faturën, ju lutem', phonetic: 'Faturën, ju lutem (Fah-too-run yoo loo-tem)', meaning: 'Requesting dining bill', speak: 'Faturën, ju lutem', langCode: 'sq-AL', langName: 'Albanian (Shqip)' },
    { cat: 'Dining', english: 'It is delicious!', native: 'Është shumë e shijshme!', phonetic: 'Është shumë e shijshme! (Ush-tuh shoo-muh eh shee-shmeh!)', meaning: 'Complimenting meal', speak: 'Është shumë e shijshme!', langCode: 'sq-AL', langName: 'Albanian (Shqip)' },
    { cat: 'Directions', english: 'How much does this cost?', native: 'Sa kushton kjo?', phonetic: 'Sa kushton kjo? (Sah koosh-tohn kyoh?)', meaning: 'Price inquiry', speak: 'Sa kushton kjo?', langCode: 'sq-AL', langName: 'Albanian (Shqip)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'Ku është stacioni?', phonetic: 'Ku është stacioni? (Koo ush-tuh stah-tsyoh-nee?)', meaning: 'Directions to station', speak: 'Ku është stacioni?', langCode: 'sq-AL', langName: 'Albanian (Shqip)' },
    { cat: 'Safety', english: 'Help me, please!', native: 'Ndihmë, ju lutem!', phonetic: 'Ndihmë, ju lutem! (Ndee-muh yoo loo-tem!)', meaning: 'Emergency distress', speak: 'Ndihmë, ju lutem!', langCode: 'sq-AL', langName: 'Albanian (Shqip)' }
  ],

  // 🇦🇲 Armenia - Armenian
  ARMENIAN: [
    { cat: 'Greetings', english: 'Hello', native: 'Բարև ձեզ', phonetic: 'Barev dzez (Bah-rev dzez)', meaning: 'Polite Armenian greeting', speak: 'Բարև ձեզ', langCode: 'hy-AM', langName: 'Armenian (Հայերեն)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Շնորհակալություն', phonetic: 'Shnorhakalutyun (Shnor-hah-kah-loot-yoon)', meaning: 'Warm gratitude', speak: 'Շնորհակալություն', langCode: 'hy-AM', langName: 'Armenian (Հայերեն)' },
    { cat: 'Greetings', english: 'Please', native: 'Խնդրեմ', phonetic: 'Khndrem (Khn-drem)', meaning: 'Polite request', speak: 'Խնդրեմ', langCode: 'hy-AM', langName: 'Armenian (Հայերեն)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Հաշիվը, խնդրեմ', phonetic: 'Hashivy khndrem (Hah-shee-vuh khn-drem)', meaning: 'Asking for check', speak: 'Հաշիվը, խնդրեմ', langCode: 'hy-AM', langName: 'Armenian (Հայերեն)' },
    { cat: 'Dining', english: 'This is very tasty!', native: 'Շատ համեղ է!', phonetic: 'Shat hamegh e! (Shaht hah-megh eh!)', meaning: 'Complimenting Armenian dining', speak: 'Շատ համեղ է!', langCode: 'hy-AM', langName: 'Armenian (Հայերեն)' },
    { cat: 'Directions', english: 'How much is this?', native: 'Ինչքա՞ն արժե սա', phonetic: 'Inchqan arzhe sa? (Eench-kahn ahr-zheh sah?)', meaning: 'Price check', speak: 'Ինչքա՞ն արժե սա', langCode: 'hy-AM', langName: 'Armenian (Հայերեն)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'Որտե՞ղ է կայարանը', phonetic: 'Vortegh e kayarany? (Vohr-tegh eh kah-yah-rah-nuh?)', meaning: 'Station navigation', speak: 'Որտե՞ղ է կայարանը', langCode: 'hy-AM', langName: 'Armenian (Հայերեն)' },
    { cat: 'Safety', english: 'Help me!', native: 'Օգնեցե՛ք!', phonetic: 'Ogneq! (Ohg-nek!)', meaning: 'Emergency cry for help', speak: 'Օգնեցե՛ք!', langCode: 'hy-AM', langName: 'Armenian (Հայերեն)' }
  ],

  // 🇦🇿 Azerbaijan - Azerbaijani
  AZERBAIJANI: [
    { cat: 'Greetings', english: 'Hello', native: 'Salam', phonetic: 'Salam (Sah-lahm)', meaning: 'Universal Azerbaijani greeting', speak: 'Salam', langCode: 'az-AZ', langName: 'Azerbaijani (Azərbaycan dili)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Çox sağ olun', phonetic: 'Chox sagh olun (Chokh sahgh oh-loon)', meaning: 'Expressing gratitude', speak: 'Çox sağ olun', langCode: 'az-AZ', langName: 'Azerbaijani (Azərbaycan dili)' },
    { cat: 'Greetings', english: 'Please', native: 'Zəhmət olmasa', phonetic: 'Zəhmət olmasa (Zah-met ohl-mah-sah)', meaning: 'Polite request', speak: 'Zəhmət olmasa', langCode: 'az-AZ', langName: 'Azerbaijani (Azərbaycan dili)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Hesabı, zəhmət olmasa', phonetic: 'Hesabı, zəhmət olmasa (Heh-sah-buh zah-met ohl-mah-sah)', meaning: 'Asking for check', speak: 'Hesabı, zəhmət olmasa', langCode: 'az-AZ', langName: 'Azerbaijani (Azərbaycan dili)' },
    { cat: 'Dining', english: 'It is delicious!', native: 'Çox dadlıdır!', phonetic: 'Çox dadlıdır! (Chokh dahd-luh-duhr!)', meaning: 'Food compliment', speak: 'Çox dadlıdır!', langCode: 'az-AZ', langName: 'Azerbaijani (Azərbaycan dili)' },
    { cat: 'Directions', english: 'How much is this?', native: 'Bu neçəyədir?', phonetic: 'Bu neçəyədir? (Boo neh-cheh-yeh-deer?)', meaning: 'Price inquiry', speak: 'Bu neçəyədir?', langCode: 'az-AZ', langName: 'Azerbaijani (Azərbaycan dili)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'Stansiya haradadır?', phonetic: 'Stansiya haradadır? (Stahn-see-yah hah-rah-dah-duhr?)', meaning: 'Directions to station', speak: 'Stansiya haradadır?', langCode: 'az-AZ', langName: 'Azerbaijani (Azərbaycan dili)' },
    { cat: 'Safety', english: 'Help me!', native: 'Kömək edin!', phonetic: 'Kömək edin! (Kur-mek eh-deen!)', meaning: 'Emergency distress', speak: 'Kömək edin!', langCode: 'az-AZ', langName: 'Azerbaijani (Azərbaycan dili)' }
  ],

  // 🇬🇪 Georgia - Georgian
  GEORGIAN: [
    { cat: 'Greetings', english: 'Hello', native: 'გამარჯობა', phonetic: 'Gamarjoba (Gah-mar-joh-bah)', meaning: 'Warm universal Georgian greeting', speak: 'გამარჯობა', langCode: 'ka-GE', langName: 'Georgian (ქართული)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'დიდი მადლობა', phonetic: 'Didi madloba (Dee-dee mahd-loh-bah)', meaning: 'Expressing sincere thanks', speak: 'დიდი მადლობა', langCode: 'ka-GE', langName: 'Georgian (ქართული)' },
    { cat: 'Greetings', english: 'Please', native: 'გთხოვთ', phonetic: 'Gtkhovt (Gt-khovt)', meaning: 'Polite request', speak: 'გთხოვთ', langCode: 'ka-GE', langName: 'Georgian (ქართული)' },
    { cat: 'Dining', english: 'The bill, please', native: 'ანგარიში, გთხოვთ', phonetic: 'Angarishi, gtkhovt (Ahn-gah-ree-shee gt-khovt)', meaning: 'Asking for dining check', speak: 'ანგარიში, გთხოვთ', langCode: 'ka-GE', langName: 'Georgian (ქართული)' },
    { cat: 'Dining', english: 'It is very delicious!', native: 'ძალიან გემრიელია!', phonetic: 'Dzalian gemrielia! (Dzah-lee-ahn gehm-ree-eh-lee-ah!)', meaning: 'Complimenting khachapuri & Georgian dishes', speak: 'ძალიან გემრიელია!', langCode: 'ka-GE', langName: 'Georgian (ქართული)' },
    { cat: 'Directions', english: 'How much does this cost?', native: 'რა ღირს ეს?', phonetic: 'Ra ghirs es? (Rah gheers es?)', meaning: 'Price check', speak: 'რა ღირს ეს?', langCode: 'ka-GE', langName: 'Georgian (ქართული)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'სად არის სადგური?', phonetic: 'Sad aris sadguri? (Sahd ah-rees sahd-goo-ree?)', meaning: 'Station navigation', speak: 'სად არის სადგური?', langCode: 'ka-GE', langName: 'Georgian (ქართული)' },
    { cat: 'Safety', english: 'Help me!', native: 'დამეხმარეთ!', phonetic: 'Damekhmaret! (Dah-mehkh-mah-ret!)', meaning: 'Emergency distress', speak: 'დამეხმარეთ!', langCode: 'ka-GE', langName: 'Georgian (ქართული)' }
  ],

  // 🇧🇩 Bangladesh - Bengali
  BENGALI: [
    { cat: 'Greetings', english: 'Hello / Greetings', native: 'নমস্কার / সালাম', phonetic: 'Nomoshkar / Salam (Noh-mosh-kahr)', meaning: 'Respectful Bengali greeting', speak: 'নমস্কার', langCode: 'bn-BD', langName: 'Bengali (বাংলা)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'অনেক ধন্যবাদ', phonetic: 'Onek dhonnobad (Oh-nek dhon-noh-bahd)', meaning: 'Sincere thanks', speak: 'ধন্যবাদ', langCode: 'bn-BD', langName: 'Bengali (বাংলা)' },
    { cat: 'Greetings', english: 'Please', native: 'দয়া করে', phonetic: 'Doya kore (Doh-yah koh-reh)', meaning: 'Polite request', speak: 'দয়া করে', langCode: 'bn-BD', langName: 'Bengali (বাংলা)' },
    { cat: 'Dining', english: 'The bill, please', native: 'বিলটা দিন, দয়া করে', phonetic: 'Bill-ta din, doya kore (Bill-tah deen)', meaning: 'Requesting dining bill', speak: 'বিলটা দিন', langCode: 'bn-BD', langName: 'Bengali (বাংলা)' },
    { cat: 'Dining', english: 'This is very delicious!', native: 'খাবারটা খুব সুস্বাদু!', phonetic: 'Khabarta khub shushwadu! (Kha-bar-tah khoob shoo-shwah-doo!)', meaning: 'Complimenting food taste', speak: 'খাবারটা খুব সুস্বাদু!', langCode: 'bn-BD', langName: 'Bengali (বাংলা)' },
    { cat: 'Directions', english: 'How much is this?', native: 'এটার দাম কত?', phonetic: 'Etar daam koto? (Eh-tahr dahm koh-toh?)', meaning: 'Inquiring price', speak: 'এটার দাম কত?', langCode: 'bn-BD', langName: 'Bengali (বাংলা)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'স্টেশনটি কোথায়?', phonetic: 'Station-ti kothay? (Stay-shon-tee koh-thye?)', meaning: 'Asking directions', speak: 'স্টেশনটি কোথায়?', langCode: 'bn-BD', langName: 'Bengali (বাংলা)' },
    { cat: 'Safety', english: 'Please help me!', native: 'আমাকে সাহায্য করুন!', phonetic: 'Amake sahajjo korun! (Ah-mah-keh shah-hahj-joh koh-roon!)', meaning: 'Emergency distress', speak: 'আমাকে সাহায্য করুন!', langCode: 'bn-BD', langName: 'Bengali (বাংলা)' }
  ],

  // 🇵🇰 Pakistan - Urdu
  URDU: [
    { cat: 'Greetings', english: 'Hello / Peace be upon you', native: 'السلام علیکم', phonetic: 'Assalam-o-Alaikum (Ah-sah-lahm oh ah-lye-koom)', meaning: 'Universal traditional Urdu greeting', speak: 'السلام علیکم', langCode: 'ur-PK', langName: 'Urdu (اردو)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'بہت شکریہ', phonetic: 'Bohat shukriya (Boh-hut shook-ree-yah)', meaning: 'Expressing gratitude', speak: 'بہت شکریہ', langCode: 'ur-PK', langName: 'Urdu (اردو)' },
    { cat: 'Greetings', english: 'Please', native: 'برائے مہربانی', phonetic: 'Bara-e-meherbani (Bah-rah-ay meh-her-bah-nee)', meaning: 'Polite request', speak: 'برائے مہربانی', langCode: 'ur-PK', langName: 'Urdu (اردو)' },
    { cat: 'Dining', english: 'The bill, please', native: 'بل لے آئیے، پلیز', phonetic: 'Bill le aaiye, please (Bill lay eye-yeh)', meaning: 'Asking for dining bill', speak: 'بل لے آئیے', langCode: 'ur-PK', langName: 'Urdu (اردو)' },
    { cat: 'Dining', english: 'This is very delicious!', native: 'یہ بہت لذیذ ہے!', phonetic: 'Yeh bohat lazeez hai! (Yeh boh-hut lah-zeez hai!)', meaning: 'Complimenting Pakistani cuisine', speak: 'یہ بہت لذیذ ہے!', langCode: 'ur-PK', langName: 'Urdu (اردو)' },
    { cat: 'Directions', english: 'How much is this?', native: 'یہ کتنے کا ہے؟', phonetic: 'Yeh kitne ka hai? (Yeh kit-nay kah hai?)', meaning: 'Price check', speak: 'یہ کتنے کا ہے؟', langCode: 'ur-PK', langName: 'Urdu (اردو)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'اسٹیشن کہاں ہے؟', phonetic: 'Station kahan hai? (Stay-shun kah-hahn hai?)', meaning: 'Directions to station', speak: 'اسٹیشن کہاں ہے؟', langCode: 'ur-PK', langName: 'Urdu (اردو)' },
    { cat: 'Safety', english: 'Please help me!', native: 'براہ کرم میری مدد کریں!', phonetic: 'Barah-e-karam meri madad karein! (Mah-dad kah-rein!)', meaning: 'Emergency distress call', speak: 'میری مدد کریں!', langCode: 'ur-PK', langName: 'Urdu (اردو)' }
  ],

  // 🇮🇷 Iran & 🇹🇯 Tajikistan - Persian / Farsi
  PERSIAN: [
    { cat: 'Greetings', english: 'Hello', native: 'سلام / درود', phonetic: 'Salaam / Dorood (Sah-lahm)', meaning: 'Polite Persian greeting', speak: 'سلام', langCode: 'fa-IR', langName: 'Persian / Farsi (فارسی)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'خیلی ممنون', phonetic: 'Kheili mamnoon (Khay-lee mahm-noon)', meaning: 'Deep gratitude', speak: 'خیلی ممنون', langCode: 'fa-IR', langName: 'Persian / Farsi (فارسی)' },
    { cat: 'Greetings', english: 'Please', native: 'لطفاً', phonetic: 'Lotfan (Loht-fahn)', meaning: 'Polite request', speak: 'لطفاً', langCode: 'fa-IR', langName: 'Persian / Farsi (فارسی)' },
    { cat: 'Dining', english: 'The bill, please', native: 'صورتحساب، لطفاً', phonetic: 'Soorathessab, lotfan (Soo-raht-heh-sahb loht-fahn)', meaning: 'Requesting dining check', speak: 'صورتحساب، لطفاً', langCode: 'fa-IR', langName: 'Persian / Farsi (فارسی)' },
    { cat: 'Dining', english: 'It is very delicious!', native: 'خیلی خوشمزه است!', phonetic: 'Kheili khoshmazeh ast! (Khay-lee khoosh-mah-zeh ahst!)', meaning: 'Complimenting Persian food', speak: 'خیلی خوشمزه است!', langCode: 'fa-IR', langName: 'Persian / Farsi (فارسی)' },
    { cat: 'Directions', english: 'How much is this?', native: 'این چنده؟', phonetic: 'In chande? (Een chahn-deh?)', meaning: 'Bazaar price check', speak: 'این چنده؟', langCode: 'fa-IR', langName: 'Persian / Farsi (فارسی)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'ایستگاه کجاست؟', phonetic: 'Istgah kojast? (Eest-gah koh-jahst?)', meaning: 'Station navigation', speak: 'ایستگاه کجاست؟', langCode: 'fa-IR', langName: 'Persian / Farsi (فارسی)' },
    { cat: 'Safety', english: 'Help me, please!', native: 'کمک، لطفاً!', phonetic: 'Komak, lotfan! (Koh-mahk loht-fahn!)', meaning: 'Emergency distress', speak: 'کمک کنید!', langCode: 'fa-IR', langName: 'Persian / Farsi (فارسی)' }
  ],

  // 🇮🇱 Israel - Hebrew
  HEBREW: [
    { cat: 'Greetings', english: 'Hello / Peace', native: 'שלום', phonetic: 'Shalom (Shah-lohm)', meaning: 'Traditional timeless greeting', speak: 'שלום', langCode: 'he-IL', langName: 'Hebrew (עברית)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'תודה רבה', phonetic: 'Toda raba (Toh-dah rah-bah)', meaning: 'Warm gratitude', speak: 'תודה רבה', langCode: 'he-IL', langName: 'Hebrew (עברית)' },
    { cat: 'Greetings', english: 'Please / You’re welcome', native: 'בבקשה', phonetic: 'Bevakasha (Beh-vah-kah-shah)', meaning: 'Universal polite etiquette', speak: 'בבקשה', langCode: 'he-IL', langName: 'Hebrew (עברית)' },
    { cat: 'Dining', english: 'The check, please', native: 'חשבון, בבקשה', phonetic: 'Kheshbon, bevakasha (Khesh-bohn beh-vah-kah-shah)', meaning: 'Asking for dining bill', speak: 'חשבון, בבקשה', langCode: 'he-IL', langName: 'Hebrew (עברית)' },
    { cat: 'Dining', english: 'This is very delicious!', native: 'זה טעים מאוד!', phonetic: 'Zeh ta’im me’od! (Zeh tah-eem meh-ohd!)', meaning: 'Complimenting meal', speak: 'זה טעים מאוד!', langCode: 'he-IL', langName: 'Hebrew (עברית)' },
    { cat: 'Directions', english: 'How much does this cost?', native: 'כמה זה עולה?', phonetic: 'Kama zeh oleh? (Kah-mah zeh oh-leh?)', meaning: 'Price check', speak: 'כמה זה עולה?', langCode: 'he-IL', langName: 'Hebrew (עברית)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'איפה התחנה?', phonetic: 'Eifoh ha-takhana? (Ay-foh hah-tah-khah-nah?)', meaning: 'Transit navigation', speak: 'איפה התחנה?', langCode: 'he-IL', langName: 'Hebrew (עברית)' },
    { cat: 'Safety', english: 'Help me, please!', native: 'עזרה, בבקשה!', phonetic: 'Ezra, bevakasha! (Ez-rah beh-vah-kah-shah!)', meaning: 'Emergency distress', speak: 'עזרה!', langCode: 'he-IL', langName: 'Hebrew (עברית)' }
  ],

  // 🇪🇹 Ethiopia - Amharic
  AMHARIC: [
    { cat: 'Greetings', english: 'Hello', native: 'ሰላም / እንደምን አለህ', phonetic: 'Selam / Endemin alleh (Seh-lahm)', meaning: 'Traditional warm Ethiopian greeting', speak: 'ሰላም', langCode: 'am-ET', langName: 'Amharic (አማርኛ)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'በጣም አመሰግናለሁ', phonetic: 'Betam amesegegnalehu (Beh-tahm ah-meh-seh-geh-nah-leh-hoo)', meaning: 'Sincere gratitude', speak: 'አመሰግናለሁ', langCode: 'am-ET', langName: 'Amharic (አማርኛ)' },
    { cat: 'Greetings', english: 'Please', native: 'እባክዎ', phonetic: 'Ebakwo (Eh-bahk-woh)', meaning: 'Polite request', speak: 'እባክዎ', langCode: 'am-ET', langName: 'Amharic (አማርኛ)' },
    { cat: 'Dining', english: 'The bill, please', native: 'ሂሳቡን እባክዎ', phonetic: 'Hisabun ebakwo (Hee-sah-boon eh-bahk-woh)', meaning: 'Requesting dining bill', speak: 'ሂሳቡን እባክዎ', langCode: 'am-ET', langName: 'Amharic (አማርኛ)' },
    { cat: 'Dining', english: 'Food is very delicious!', native: 'በጣም ጣፋጭ ነው!', phonetic: 'Betam tafach new! (Beh-tahm tah-fahch neh-w!)', meaning: 'Complimenting Ethiopian injera & wot', speak: 'በጣም ጣፋጭ ነው!', langCode: 'am-ET', langName: 'Amharic (አማርኛ)' },
    { cat: 'Directions', english: 'How much is this?', native: 'ዋጋው ስንት ነው?', phonetic: 'Wagaw sint new? (Wah-gow seent neh-w?)', meaning: 'Inquiring price', speak: 'ዋጋው ስንት ነው?', langCode: 'am-ET', langName: 'Amharic (አማርኛ)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'ጣቢያው የት ነው?', phonetic: 'Tabiyaw yet new? (Tah-bee-yow yet neh-w?)', meaning: 'Transit navigation', speak: 'ጣቢያው የት ነው?', langCode: 'am-ET', langName: 'Amharic (አማርኛ)' },
    { cat: 'Safety', english: 'Help me, please!', native: 'እባክዎ እርዱኝ!', phonetic: 'Ebakwo erdugn! (Eh-bahk-woh er-doon!)', meaning: 'Emergency cry for help', speak: 'እርዱኝ!', langCode: 'am-ET', langName: 'Amharic (አማርኛ)' }
  ],

  // 🇰🇭 Cambodia - Khmer
  KHMER: [
    { cat: 'Greetings', english: 'Hello', native: 'ជំរាបសួរ', phonetic: 'Choum reap sour (Choom reep soor)', meaning: 'Respectful Cambodian greeting with Sampeah', speak: 'ជំរាបសួរ', langCode: 'km-KH', langName: 'Khmer (ភាសាខ្មែរ)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'អរគុណច្រើន', phonetic: 'Orkun chran (Or-koon chrahn)', meaning: 'Heartfelt thanks', speak: 'អរគុណច្រើន', langCode: 'km-KH', langName: 'Khmer (ភាសាខ្មែរ)' },
    { cat: 'Greetings', english: 'Please', native: 'សូមមេត្តា', phonetic: 'Som metta (Sohm mayt-tah)', meaning: 'Polite request', speak: 'សូម', langCode: 'km-KH', langName: 'Khmer (ភាសាខ្មែរ)' },
    { cat: 'Dining', english: 'The bill, please', native: 'សុំគិតលុយ', phonetic: 'Som kit luy (Sohm kit lwee)', meaning: 'Asking for food check', speak: 'សុំគិតលុយ', langCode: 'km-KH', langName: 'Khmer (ភាសាខ្មែរ)' },
    { cat: 'Dining', english: 'Delicious!', native: 'ឆ្ងាញ់ណាស់!', phonetic: 'Chnganh nas! (Ch-ngahn nahs!)', meaning: 'Complimenting Khmer dishes', speak: 'ឆ្ងាញ់ណាស់!', langCode: 'km-KH', langName: 'Khmer (ភាសាខ្មែរ)' },
    { cat: 'Directions', english: 'How much is this?', native: 'ថ្លៃប៉ុន្មាន?', phonetic: 'Thlay ponman? (Tlay pon-mahn?)', meaning: 'Market bargaining & pricing', speak: 'ថ្លៃប៉ុន្មាន?', langCode: 'km-KH', langName: 'Khmer (ភាសាខ្មែរ)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'តើស្ថានីយ៍នៅឯណា?', phonetic: 'Station now e na? (Stah-nee now eh nah?)', meaning: 'Finding transit', speak: 'ស្ថានីយ៍នៅឯណា?', langCode: 'km-KH', langName: 'Khmer (ភាសាខ្មែរ)' },
    { cat: 'Safety', english: 'Please help me!', native: 'សូមជួយខ្ញុំផង!', phonetic: 'Som chuoy khnhom phong! (Sohm choo-ay k-nyom pawng!)', meaning: 'Emergency distress call', speak: 'សូមជួយខ្ញុំ!', langCode: 'km-KH', langName: 'Khmer (ភាសាខ្មែរ)' }
  ],

  // 🇲🇲 Myanmar - Burmese
  BURMESE: [
    { cat: 'Greetings', english: 'Hello', native: 'မင်္ဂလာပါ', phonetic: 'Mingalaba (Meen-gah-lah-bah)', meaning: 'Auspicious universal Burmese greeting', speak: 'မင်္ဂလာပါ', langCode: 'my-MM', langName: 'Burmese (မြန်မာစာ)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'ကျေးဇူးတင်ပါတယ်', phonetic: 'Kyei-zoo tin-ba-de (Jay-zoo tin-bah-deh)', meaning: 'Polite gratitude', speak: 'ကျေးဇူးတင်ပါတယ်', langCode: 'my-MM', langName: 'Burmese (မြန်မာစာ)' },
    { cat: 'Greetings', english: 'Please', native: 'ကျေးဇူးပြု၍', phonetic: 'Kyei-zoo pyu-ywe (Jay-zoo pyoo-yway)', meaning: 'Polite request', speak: 'ကျေးဇူးပြု၍', langCode: 'my-MM', langName: 'Burmese (မြန်မာစာ)' },
    { cat: 'Dining', english: 'The bill, please', native: 'ဘေလ်ရှင်းပေးပါ', phonetic: 'Bill shin pay ba (Bill sheen pay bah)', meaning: 'Asking for check', speak: 'ဘေလ်ရှင်းပေးပါ', langCode: 'my-MM', langName: 'Burmese (မြန်မာစာ)' },
    { cat: 'Dining', english: 'Very delicious!', native: 'အရမ်းအရသာရှိတယ်!', phonetic: 'A-yann a-ya-tha shi de! (Ah-yahn ah-yah-thah shee deh!)', meaning: 'Complimenting food', speak: 'အရမ်းအရသာရှိတယ်!', langCode: 'my-MM', langName: 'Burmese (မြန်မာစာ)' },
    { cat: 'Directions', english: 'How much is this?', native: 'ဒါဘယ်လောက်လဲ?', phonetic: 'Da bal-lout le? (Dah beh-lowk leh?)', meaning: 'Price check', speak: 'ဒါဘယ်လောက်လဲ?', langCode: 'my-MM', langName: 'Burmese (မြန်မာစာ)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'ဘူတာရုံဘယ်မှာလဲ?', phonetic: 'Bu-ta-yone bal-hma le? (Boo-tah-yohn beh-hmah leh?)', meaning: 'Finding station', speak: 'ဘူတာရုံဘယ်မှာလဲ?', langCode: 'my-MM', langName: 'Burmese (မြန်မာစာ)' },
    { cat: 'Safety', english: 'Help me!', native: 'ကူညီပါ!', phonetic: 'Ku-nyi ba! (Koo-nyee bah!)', meaning: 'Emergency distress', speak: 'ကူညီပါ!', langCode: 'my-MM', langName: 'Burmese (မြန်မာစာ)' }
  ],

  // 🇱🇦 Laos - Lao
  LAO: [
    { cat: 'Greetings', english: 'Hello', native: 'ສະບາຍດີ', phonetic: 'Sabaidee (Sah-bye-dee)', meaning: 'Universal warm Lao greeting', speak: 'ສະບາຍດີ', langCode: 'lo-LA', langName: 'Lao (ພາສາລາວ)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'ຂອບໃຈຫຼາຍໆ', phonetic: 'Khop chai lai lai (Kohp chai lye lye)', meaning: 'Deep gratitude', speak: 'ຂອບໃຈຫຼາຍໆ', langCode: 'lo-LA', langName: 'Lao (ພາສາລາວ)' },
    { cat: 'Greetings', english: 'Please', native: 'ກະລຸນາ', phonetic: 'Karuna (Kah-roo-nah)', meaning: 'Polite request', speak: 'ກະລຸນາ', langCode: 'lo-LA', langName: 'Lao (ພາສາລາວ)' },
    { cat: 'Dining', english: 'The bill, please', native: 'ເຊັກບິນແດ່', phonetic: 'Check bill dae (Chehk bill deh)', meaning: 'Asking for dining bill', speak: 'ເຊັກບິນແດ່', langCode: 'lo-LA', langName: 'Lao (ພາສາລາວ)' },
    { cat: 'Dining', english: 'Delicious!', native: 'ແຊບຫຼາຍ!', phonetic: 'Saep lai! (Sehp lye!)', meaning: 'Praising Lao food', speak: 'ແຊບຫຼາຍ!', langCode: 'lo-LA', langName: 'Lao (ພາສາລາວ)' },
    { cat: 'Directions', english: 'How much is this?', native: 'ອັນນີ້ເທົ່າໃດ?', phonetic: 'An nee thao dai? (Ahn nee tow dye?)', meaning: 'Price inquiry', speak: 'ອັນນີ້ເທົ່າໃດ?', langCode: 'lo-LA', langName: 'Lao (ພາສາລາວ)' },
    { cat: 'Directions', english: 'Where is the station?', native: 'ສະຖານີຢູ່ໃສ?', phonetic: 'Sathani yoo sai? (Sah-tah-nee yoo sye?)', meaning: 'Station navigation', speak: 'ສະຖານີຢູ່ໃສ?', langCode: 'lo-LA', langName: 'Lao (ພາສາລາວ)' },
    { cat: 'Safety', english: 'Help me!', native: 'ຊ່ວຍຂ້ອຍແດ່!', phonetic: 'Suay khoy dae! (Soo-ay koy deh!)', meaning: 'Emergency cry for help', speak: 'ຊ່ວຍຂ້ອຍແດ່!', langCode: 'lo-LA', langName: 'Lao (ພາສາລາວ)' }
  ],

  // 🇳🇵 Nepal - Nepali
  NEPALI: [
    { cat: 'Greetings', english: 'Hello / Greetings', native: 'नमस्ते', phonetic: 'Namaste (Nuh-muh-stay)', meaning: 'Traditional respectful greeting', speak: 'नमस्ते', langCode: 'ne-NP', langName: 'Nepali (नेपाली)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'धेरै धन्यवाद', phonetic: 'Dherai dhanyabaad (Dheh-rai dhun-yah-bahd)', meaning: 'Heartfelt gratitude', speak: 'धन्यवाद', langCode: 'ne-NP', langName: 'Nepali (नेपाली)' },
    { cat: 'Greetings', english: 'Please', native: 'कृपया', phonetic: 'Kripya (Krip-yah)', meaning: 'Polite request', speak: 'कृपया', langCode: 'ne-NP', langName: 'Nepali (नेपाली)' },
    { cat: 'Dining', english: 'The bill, please', native: 'बिल ल्याइदिनुहोस्', phonetic: 'Bill lyaaidinuhos (Bill lyai-dee-noo-hohs)', meaning: 'Asking for check', speak: 'बिल ल्याइदिनुहोस्', langCode: 'ne-NP', langName: 'Nepali (नेपाली)' },
    { cat: 'Dining', english: 'This is very delicious!', native: 'यो धेरै मीठो छ!', phonetic: 'Yo dherai meetho chha! (Yoh dheh-rai mee-thoh chha!)', meaning: 'Praising momos and dal bhat', speak: 'यो धेरै मीठो छ!', langCode: 'ne-NP', langName: 'Nepali (नेपाली)' },
    { cat: 'Directions', english: 'How much does this cost?', native: 'यसको कति पर्छ?', phonetic: 'Yasko kati parchha? (Yahs-koh kah-tee pahr-chha?)', meaning: 'Price check', speak: 'यसको कति पर्छ?', langCode: 'ne-NP', langName: 'Nepali (नेपाली)' },
    { cat: 'Directions', english: 'Where is the station / road?', native: 'स्टेशन / बाटो कहाँ छ?', phonetic: 'Station / Baato kahan chha?', meaning: 'Trekking & transit directions', speak: 'बाटो कहाँ छ?', langCode: 'ne-NP', langName: 'Nepali (नेपाली)' },
    { cat: 'Safety', english: 'Please help me!', native: 'कृपया मलाई मद्दत गर्नुहोस्!', phonetic: 'Kripya malai maddat garnuhos! (Mah-dud gahr-noo-hohs!)', meaning: 'Emergency distress', speak: 'मलाई मद्दत गर्नुहोस्!', langCode: 'ne-NP', langName: 'Nepali (नेपाली)' }
  ],

  // 🇱🇰 Sri Lanka - Sinhala & Tamil
  SINHALA_TAMIL: [
    { cat: 'Greetings', english: 'Hello / May you live long', native: 'ආයුබෝවන් / வணக்கம்', phonetic: 'Ayubowan / Vanakkam (Ah-yoo-boh-wahn / Vah-nahk-kahm)', meaning: 'Traditional Sri Lankan greeting', speak: 'ආයුබෝවන්', langCode: 'si-LK', langName: 'Sinhala / Tamil (සිංහල / தமிழ்)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'බොහොම ස්තූතියි / நன்றி', phonetic: 'Bohoma sthuthiyi / Nandri (Boh-hoh-mah sthoo-tee-yee)', meaning: 'Heartfelt gratitude', speak: 'බොහොම ස්තූතියි', langCode: 'si-LK', langName: 'Sinhala / Tamil (සිංහල / தமிழ்)' },
    { cat: 'Greetings', english: 'Please', native: 'කරුණාකර', phonetic: 'Karunakarala (Kah-roo-nah-kah-rah-lah)', meaning: 'Polite request', speak: 'කරුණාකර', langCode: 'si-LK', langName: 'Sinhala / Tamil (සිංහල / தமிழ்)' },
    { cat: 'Dining', english: 'The bill, please', native: 'බිල ගෙවන්න, කරුණාකර', phonetic: 'Bila genna, karunakarala (Bih-lah gehn-nah)', meaning: 'Asking for check', speak: 'බිල ගෙවන්න', langCode: 'si-LK', langName: 'Sinhala / Tamil (සිංහල / தமிழ்)' },
    { cat: 'Dining', english: 'This is delicious!', native: 'මේක හරිම රසයි!', phonetic: 'Meka harima rasayi! (May-kah hah-ree-mah rah-sye!)', meaning: 'Complimenting Ceylon tea & curry', speak: 'මේක හරිම රසයි!', langCode: 'si-LK', langName: 'Sinhala / Tamil (සිංහල / தமிழ்)' },
    { cat: 'Directions', english: 'How much is this?', native: 'මේක කීයද?', phonetic: 'Meka keeyada? (May-kah kee-yah-dah?)', meaning: 'Price inquiry', speak: 'මේක කීයද?', langCode: 'si-LK', langName: 'Sinhala / Tamil (සිංහල / தமிழ்)' },
    { cat: 'Directions', english: 'Where is the train station?', native: 'දුම්රිය ස්ථානය කොහෙද?', phonetic: 'Dumriya sthanaya koheda? (Doom-ree-yah stah-nah-yah koh-heh-dah?)', meaning: 'Train station navigation', speak: 'දුම්රිය ස්ථානය කොහෙද?', langCode: 'si-LK', langName: 'Sinhala / Tamil (සිංහල / தமிழ்)' },
    { cat: 'Safety', english: 'Please help me!', native: 'කරුණාකර මට උදව් කරන්න!', phonetic: 'Karunakarala mata udaw karanna! (Mah-tah oo-dow kahr-ahn-nah!)', meaning: 'Emergency distress', speak: 'මට උදව් කරන්න!', langCode: 'si-LK', langName: 'Sinhala / Tamil (සිංහල / தமிழ்)' }
  ],

  // 🇵🇭 Philippines - Tagalog / Filipino
  TAGALOG: [
    { cat: 'Greetings', english: 'Hello / How are you', native: 'Kamusta / Magandang araw', phonetic: 'Kamusta / Magandang araw (Kah-moos-tah / Mah-gahn-dahng ah-row)', meaning: 'Warm friendly Filipino greeting', speak: 'Kamusta, magandang araw', langCode: 'fil-PH', langName: 'Filipino / Tagalog' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Maraming salamat po', phonetic: 'Maraming salamat po (Mah-rah-meeng sah-lah-maht poh)', meaning: 'Polite respectful gratitude', speak: 'Maraming salamat po', langCode: 'fil-PH', langName: 'Filipino / Tagalog' },
    { cat: 'Greetings', english: 'Please', native: 'Pakiusap / Pwede po ba', phonetic: 'Pakiusap (Pah-kee-oo-sahp poh)', meaning: 'Polite request', speak: 'Pakiusap', langCode: 'fil-PH', langName: 'Filipino / Tagalog' },
    { cat: 'Dining', english: 'The bill, please', native: 'Ang bill po, pakiusap', phonetic: 'Ang bill po, pakiusap (Ahng bill poh)', meaning: 'Asking for dining bill', speak: 'Ang bill po, pakiusap', langCode: 'fil-PH', langName: 'Filipino / Tagalog' },
    { cat: 'Dining', english: 'This is delicious!', native: 'Napakasarap nito!', phonetic: 'Napakasarap nito! (Nah-pah-kah-sah-rahp nee-toh!)', meaning: 'Complimenting Filipino dishes like adobo', speak: 'Napakasarap nito!', langCode: 'fil-PH', langName: 'Filipino / Tagalog' },
    { cat: 'Directions', english: 'How much is this?', native: 'Magkano po ito?', phonetic: 'Magkano po ito? (Mahg-kah-noh poh ee-toh?)', meaning: 'Jeepney and market fare check', speak: 'Magkano po ito?', langCode: 'fil-PH', langName: 'Filipino / Tagalog' },
    { cat: 'Directions', english: 'Where is the station / jeepney stop?', native: 'Nasaan ang sakayan / istasyon?', phonetic: 'Nasaan ang istasyon? (Nah-sah-ahn ahng ees-tahs-yon?)', meaning: 'Transit navigation', speak: 'Nasaan ang istasyon?', langCode: 'fil-PH', langName: 'Filipino / Tagalog' },
    { cat: 'Safety', english: 'Help me, please!', native: 'Tulong po!', phonetic: 'Tulong po! (Too-long poh!)', meaning: 'Emergency distress call', speak: 'Tulong po!', langCode: 'fil-PH', langName: 'Filipino / Tagalog' }
  ],

  // 🇲🇳 Mongolia - Mongolian
  MONGOLIAN: [
    { cat: 'Greetings', english: 'Hello', native: 'Сайн байна уу', phonetic: 'Sain baina uu (Sign bye-noo)', meaning: 'Traditional warm nomadic greeting', speak: 'Сайн байна уу', langCode: 'mn-MN', langName: 'Mongolian (Монгол хэл)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Их баярлалаа', phonetic: 'Ikh bayarlalaa (Ikh by-ahr-lah-lah)', meaning: 'Deep gratitude', speak: 'Их баярлалаа', langCode: 'mn-MN', langName: 'Mongolian (Монгол хэл)' },
    { cat: 'Greetings', english: 'Please', native: 'Гуйя', phonetic: 'Guiya (Goo-ee-yah)', meaning: 'Polite request', speak: 'Гуйя', langCode: 'mn-MN', langName: 'Mongolian (Монгол хэл)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Тооцоо хийе, гуйя', phonetic: 'Tootsoo khiye, guiya (Toh-tsoh khee-yeh)', meaning: 'Asking for check', speak: 'Тооцоо хийе', langCode: 'mn-MN', langName: 'Mongolian (Монгол хэл)' },
    { cat: 'Dining', english: 'This is delicious!', native: 'Маш амттай байна!', phonetic: 'Mash amttai baina! (Mahsh ahm-tye bye-nuh!)', meaning: 'Complimenting Mongolian dining', speak: 'Маш амттай байна!', langCode: 'mn-MN', langName: 'Mongolian (Монгол хэл)' },
    { cat: 'Directions', english: 'How much does this cost?', native: 'Энэ ямар үнэтэй вэ?', phonetic: 'Ene yamar unetei ve? (Eh-neh yah-mar oo-neh-tay veh?)', meaning: 'Price check', speak: 'Энэ ямар үнэтэй вэ?', langCode: 'mn-MN', langName: 'Mongolian (Монгол хэл)' },
    { cat: 'Directions', english: 'Where is the station / yurt stop?', native: 'Буудал хаана байна вэ?', phonetic: 'Buudal haana baina ve? (Boo-dahl hah-nah bye-nuh veh?)', meaning: 'Transit navigation', speak: 'Буудал хаана байна вэ?', langCode: 'mn-MN', langName: 'Mongolian (Монгол хэл)' },
    { cat: 'Safety', english: 'Help me!', native: 'Туслаарай!', phonetic: 'Tuslaarai! (Toos-lah-rye!)', meaning: 'Emergency distress call', speak: 'Туслаарай!', langCode: 'mn-MN', langName: 'Mongolian (Монгол хэл)' }
  ],

  // 🇮🇸 Iceland - Icelandic
  ICELANDIC: [
    { cat: 'Greetings', english: 'Good day / Hello', native: 'Góðan daginn / Halló', phonetic: 'Góðan daginn (Goh-than dye-in / Hah-loh)', meaning: 'Universal friendly Icelandic greeting', speak: 'Góðan daginn', langCode: 'is-IS', langName: 'Icelandic (Íslenska)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Takk kærlega fyrir', phonetic: 'Takk kærlega fyrir (Tahk kire-leh-gah fee-reer)', meaning: 'Deep gratitude', speak: 'Takk kærlega fyrir', langCode: 'is-IS', langName: 'Icelandic (Íslenska)' },
    { cat: 'Greetings', english: 'Please / You’re welcome', native: 'Gjörðu svo vel', phonetic: 'Gjörðu svo vel (Gyer-thoo svoh vel)', meaning: 'Polite phrase', speak: 'Gjörðu svo vel', langCode: 'is-IS', langName: 'Icelandic (Íslenska)' },
    { cat: 'Dining', english: 'The bill, please', native: 'Reikninginn, takk', phonetic: 'Reikninginn, takk (Rake-ning-in tahk)', meaning: 'Asking for restaurant check', speak: 'Reikninginn, takk', langCode: 'is-IS', langName: 'Icelandic (Íslenska)' },
    { cat: 'Dining', english: 'This is delicious!', native: 'Þetta er ljúffengt!', phonetic: 'Þetta er ljúffengt! (Thet-tah ehr lyoof-fengt!)', meaning: 'Complimenting Nordic dining', speak: 'Þetta er ljúffengt!', langCode: 'is-IS', langName: 'Icelandic (Íslenska)' },
    { cat: 'Directions', english: 'How much does this cost?', native: 'Hvað kostar þetta?', phonetic: 'Hvað kostar þetta? (Kvath kos-tar thet-tah?)', meaning: 'Price inquiry', speak: 'Hvað kostar þetta?', langCode: 'is-IS', langName: 'Icelandic (Íslenska)' },
    { cat: 'Directions', english: 'Where is the bus stop / station?', native: 'Hvar er stöðin?', phonetic: 'Hvar er stöðin? (Kvahr ehr stuh-thin?)', meaning: 'Transit navigation', speak: 'Hvar er stöðin?', langCode: 'is-IS', langName: 'Icelandic (Íslenska)' },
    { cat: 'Safety', english: 'Help me, please!', native: 'Hjálp, vinsamlegast!', phonetic: 'Hjálp, vinsamlegast! (Hyowlp vin-sahm-leh-gahst!)', meaning: 'Emergency distress', speak: 'Hjálp!', langCode: 'is-IS', langName: 'Icelandic (Íslenska)' }
  ],

  // 🇦🇩 Andorra - Catalan
  CATALAN: [
    { cat: 'Greetings', english: 'Hello / Good day', native: 'Hola / Bon dia', phonetic: 'Hola / Bon dia (Oh-lah / Bohn dee-ah)', meaning: 'Standard Catalan greeting', speak: 'Bon dia', langCode: 'ca-ES', langName: 'Catalan (Català)' },
    { cat: 'Greetings', english: 'Thank you very much', native: 'Moltes gràcies', phonetic: 'Moltes gràcies (Mohl-tahs grah-see-ahs)', meaning: 'Warm gratitude', speak: 'Moltes gràcies', langCode: 'ca-ES', langName: 'Catalan (Català)' },
    { cat: 'Greetings', english: 'Please', native: 'Si us plau', phonetic: 'Si us plau (See oos plow)', meaning: 'Polite request', speak: 'Si us plau', langCode: 'ca-ES', langName: 'Catalan (Català)' },
    { cat: 'Dining', english: 'The bill, please', native: 'El compte, si us plau', phonetic: 'El compte, si us plau (El kohm-teh see oos plow)', meaning: 'Asking for dining check', speak: 'El compte, si us plau', langCode: 'ca-ES', langName: 'Catalan (Català)' },
    { cat: 'Dining', english: 'It is delicious!', native: 'És boníssim!', phonetic: 'És boníssim! (Es boh-nee-seem!)', meaning: 'Complimenting Pyrenees & Catalan food', speak: 'És boníssim!', langCode: 'ca-ES', langName: 'Catalan (Català)' },
    { cat: 'Directions', english: 'How much does this cost?', native: 'Quant costa això?', phonetic: 'Quant costa això? (Kwahn kos-tah ah-ee-shoh?)', meaning: 'Duty-free shopping price check', speak: 'Quant costa això?', langCode: 'ca-ES', langName: 'Catalan (Català)' },
    { cat: 'Directions', english: 'Where is the station / bus?', native: 'On és l’estació?', phonetic: 'On és l’estació? (Ohn es luhs-tah-see-oh?)', meaning: 'Station navigation', speak: 'On és l’estació?', langCode: 'ca-ES', langName: 'Catalan (Català)' },
    { cat: 'Safety', english: 'Help me, please!', native: 'Ajuda, si us plau!', phonetic: 'Ajuda, si us plau! (Ah-zhoo-dah see oos plow!)', meaning: 'Emergency distress', speak: 'Ajuda!', langCode: 'ca-ES', langName: 'Catalan (Català)' }
  ],

  // 🇰🇪 / 🇹🇿 East Africa - Swahili
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

// Map ALL 195 Sovereign Countries directly to their primary native Language Pack
export const COUNTRY_TO_LANGUAGE_MAP = {
  // A
  AF: 'PASHTO', AL: 'ALBANIAN', DZ: 'ARABIC', AD: 'CATALAN', AO: 'PORTUGUESE',
  AG: 'ENGLISH', AR: 'SPANISH', AM: 'ARMENIAN', AU: 'ENGLISH', AT: 'GERMAN', AZ: 'AZERBAIJANI',
  // B
  BS: 'ENGLISH', BH: 'ARABIC', BD: 'BENGALI', BB: 'ENGLISH', BY: 'RUSSIAN',
  BE: 'FRENCH', BZ: 'ENGLISH', BJ: 'FRENCH', BT: 'NEPALI', BO: 'SPANISH',
  BA: 'SOUTH_SLAVIC', BW: 'ENGLISH', BR: 'PORTUGUESE', BN: 'INDONESIAN', BG: 'BULGARIAN',
  BF: 'FRENCH', BI: 'FRENCH',
  // C
  CV: 'PORTUGUESE', KH: 'KHMER', CM: 'FRENCH', CA: 'ENGLISH', CF: 'FRENCH',
  TD: 'ARABIC', CL: 'SPANISH', CN: 'MANDARIN', CO: 'SPANISH', KM: 'ARABIC',
  CD: 'FRENCH', CG: 'FRENCH', CR: 'SPANISH', CI: 'FRENCH', HR: 'SOUTH_SLAVIC',
  CU: 'SPANISH', CY: 'GREEK', CZ: 'CZECH',
  // D
  DK: 'DANISH', DJ: 'ARABIC', DM: 'ENGLISH', DO: 'SPANISH',
  // E
  EC: 'SPANISH', EG: 'ARABIC', SV: 'SPANISH', GQ: 'SPANISH', ER: 'ARABIC',
  EE: 'FINNISH', SZ: 'ENGLISH', ET: 'AMHARIC',
  // F
  FJ: 'ENGLISH', FI: 'FINNISH', FR: 'FRENCH',
  // G
  GA: 'FRENCH', GM: 'ENGLISH', GE: 'GEORGIAN', DE: 'GERMAN', GH: 'ENGLISH',
  GR: 'GREEK', GD: 'ENGLISH', GT: 'SPANISH', GN: 'FRENCH', GW: 'PORTUGUESE', GY: 'ENGLISH',
  // H
  HT: 'FRENCH', HN: 'SPANISH', HU: 'HUNGARIAN',
  // I
  IS: 'ICELANDIC', IN: 'HINDI', ID: 'INDONESIAN', IR: 'PERSIAN', IQ: 'ARABIC',
  IE: 'ENGLISH', IL: 'HEBREW', IT: 'ITALIAN',
  // J
  JM: 'ENGLISH', JP: 'JAPANESE', JO: 'ARABIC',
  // K
  KZ: 'RUSSIAN', KE: 'SWAHILI', KI: 'ENGLISH', KP: 'KOREAN', KR: 'KOREAN',
  KW: 'ARABIC', KG: 'RUSSIAN',
  // L
  LA: 'LAO', LV: 'POLISH', LB: 'ARABIC', LS: 'ENGLISH', LR: 'ENGLISH',
  LY: 'ARABIC', LI: 'GERMAN', LT: 'POLISH', LU: 'GERMAN',
  // M
  MG: 'FRENCH', MW: 'ENGLISH', MY: 'INDONESIAN', MV: 'URDU', ML: 'FRENCH',
  MT: 'ENGLISH', MH: 'ENGLISH', MR: 'ARABIC', MU: 'FRENCH', MX: 'SPANISH',
  FM: 'ENGLISH', MD: 'ROMANIAN', MC: 'FRENCH', MN: 'MONGOLIAN', ME: 'SOUTH_SLAVIC',
  MA: 'ARABIC', MZ: 'PORTUGUESE', MM: 'BURMESE',
  // N
  NA: 'ENGLISH', NR: 'ENGLISH', NP: 'NEPALI', NL: 'DUTCH', NZ: 'ENGLISH',
  NI: 'SPANISH', NE: 'FRENCH', NG: 'ENGLISH', MK: 'SOUTH_SLAVIC', NO: 'NORWEGIAN',
  // O
  OM: 'ARABIC',
  // P
  PK: 'URDU', PW: 'ENGLISH', PS: 'ARABIC', PA: 'SPANISH', PG: 'ENGLISH',
  PY: 'SPANISH', PE: 'SPANISH', PH: 'TAGALOG', PL: 'POLISH', PT: 'PORTUGUESE',
  // Q
  QA: 'ARABIC',
  // R
  RO: 'ROMANIAN', RU: 'RUSSIAN', RW: 'FRENCH',
  // S
  KN: 'ENGLISH', LC: 'ENGLISH', VC: 'ENGLISH', WS: 'ENGLISH', SM: 'ITALIAN',
  ST: 'PORTUGUESE', SA: 'ARABIC', SN: 'FRENCH', RS: 'SOUTH_SLAVIC', SC: 'FRENCH',
  SL: 'ENGLISH', SG: 'MANDARIN', SK: 'SLOVAK', SI: 'SLOVENIAN', SB: 'ENGLISH',
  SO: 'ARABIC', ZA: 'ENGLISH', SS: 'ENGLISH', ES: 'SPANISH', LK: 'SINHALA_TAMIL',
  SD: 'ARABIC', SR: 'DUTCH', SE: 'SWEDISH', CH: 'GERMAN', SY: 'ARABIC',
  // T
  TW: 'MANDARIN', TJ: 'PERSIAN', TZ: 'SWAHILI', TH: 'THAI', TL: 'PORTUGUESE',
  TG: 'FRENCH', TO: 'ENGLISH', TT: 'ENGLISH', TN: 'ARABIC', TR: 'TURKISH',
  TM: 'RUSSIAN', TV: 'ENGLISH',
  // U
  UG: 'SWAHILI', UA: 'UKRAINIAN', AE: 'ARABIC', GB: 'ENGLISH', US: 'ENGLISH',
  UY: 'SPANISH', UZ: 'RUSSIAN',
  // V
  VU: 'ENGLISH', VA: 'ITALIAN', VE: 'SPANISH', VN: 'VIETNAMESE',
  // Y
  YE: 'ARABIC',
  // Z
  ZM: 'ENGLISH', ZW: 'ENGLISH'
};

// Backward-compatible alias for existing imports
export const ESSENTIAL_PHRASES = LANGUAGE_PACKS;

/**
 * Intelligently retrieves localized travel phrases for ANY of the 195 countries on Earth.
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

  // 1. Direct country code lookup (exact 195 nations mapping)
  if (COUNTRY_TO_LANGUAGE_MAP[code]) {
    packKey = COUNTRY_TO_LANGUAGE_MAP[code];
  }

  // 2. Languages string analysis from country profile (e.g. "Pashto", "Dari", "Mandarin", "Spanish")
  if (!packKey && languages) {
    if (languages.includes('pashto') || languages.includes('dari') || code === 'AF') packKey = 'PASHTO';
    else if (languages.includes('chinese') || languages.includes('mandarin') || languages.includes('putonghua')) packKey = 'MANDARIN';
    else if (languages.includes('japanese')) packKey = 'JAPANESE';
    else if (languages.includes('spanish') || languages.includes('castilian') || languages.includes('español')) packKey = 'SPANISH';
    else if (languages.includes('french') || languages.includes('français')) packKey = 'FRENCH';
    else if (languages.includes('german') || languages.includes('deutsch')) packKey = 'GERMAN';
    else if (languages.includes('italian') || languages.includes('italiano')) packKey = 'ITALIAN';
    else if (languages.includes('hindi')) packKey = 'HINDI';
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
    else if (languages.includes('norwegian')) packKey = 'NORWEGIAN';
    else if (languages.includes('danish')) packKey = 'DANISH';
    else if (languages.includes('finnish')) packKey = 'FINNISH';
    else if (languages.includes('swedish')) packKey = 'SWEDISH';
    else if (languages.includes('ukrainian')) packKey = 'UKRAINIAN';
    else if (languages.includes('czech')) packKey = 'CZECH';
    else if (languages.includes('slovak')) packKey = 'SLOVAK';
    else if (languages.includes('hungarian')) packKey = 'HUNGARIAN';
    else if (languages.includes('romanian')) packKey = 'ROMANIAN';
    else if (languages.includes('bulgarian')) packKey = 'BULGARIAN';
    else if (languages.includes('serbian') || languages.includes('croatian') || languages.includes('bosnian')) packKey = 'SOUTH_SLAVIC';
    else if (languages.includes('albanian')) packKey = 'ALBANIAN';
    else if (languages.includes('armenian')) packKey = 'ARMENIAN';
    else if (languages.includes('azerbaijani')) packKey = 'AZERBAIJANI';
    else if (languages.includes('georgian')) packKey = 'GEORGIAN';
    else if (languages.includes('bengali')) packKey = 'BENGALI';
    else if (languages.includes('urdu')) packKey = 'URDU';
    else if (languages.includes('persian') || languages.includes('farsi')) packKey = 'PERSIAN';
    else if (languages.includes('hebrew')) packKey = 'HEBREW';
    else if (languages.includes('amharic')) packKey = 'AMHARIC';
    else if (languages.includes('khmer')) packKey = 'KHMER';
    else if (languages.includes('burmese')) packKey = 'BURMESE';
    else if (languages.includes('lao')) packKey = 'LAO';
    else if (languages.includes('nepali') || languages.includes('dzongkha')) packKey = 'NEPALI';
    else if (languages.includes('sinhala') || languages.includes('tamil')) packKey = 'SINHALA_TAMIL';
    else if (languages.includes('tagalog') || languages.includes('filipino')) packKey = 'TAGALOG';
    else if (languages.includes('swahili') || languages.includes('kiswahili')) packKey = 'SWAHILI';
    else if (languages.includes('icelandic')) packKey = 'ICELANDIC';
    else if (languages.includes('mongolian')) packKey = 'MONGOLIAN';
    else if (languages.includes('catalan')) packKey = 'CATALAN';
    else if (languages.includes('english')) packKey = 'ENGLISH';
  }

  // 3. Fallback heuristic
  if (!packKey) {
    if (code === 'AF' || name.includes('afghanistan')) packKey = 'PASHTO';
    else if (code === 'CN' || name.includes('china')) packKey = 'MANDARIN';
    else if (code === 'JP' || name.includes('japan')) packKey = 'JAPANESE';
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


