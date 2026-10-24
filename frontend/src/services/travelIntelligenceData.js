/**
 * TerraVoyage Travel Intelligence Data Service
 * Comprehensive intelligence for:
 * 1. Live Webcams & EarthCams
 * 2. Emergency Hotlines & Embassy SOS
 * 3. Cultural Etiquette, Tipping & Electrical Sockets
 * 4. Flight Hubs & Transit Estimators
 * 5. Wanderlust Geography & Landmark Quiz Questions
 * 6. Travel Cost & Daily Budget Models
 */

// 1. Curated Live Webcams & EarthCams
export const WEBCAM_CATALOG = {
  JP: [
    {
      id: 'jp-shibuya',
      name: 'Shibuya Scramble Crossing 24/7 Live',
      city: 'Tokyo, Japan',
      embedUrl: 'https://www.youtube.com/embed/gFRtAAmiFbE?autoplay=1&mute=1&playsinline=1&enablejsapi=1',
      directUrl: 'https://www.youtube.com/watch?v=gFRtAAmiFbE',
      source: 'Tokyo Live Cam',
      description: "World's busiest pedestrian crossing in real-time.",
      type: 'youtube'
    },
    {
      id: 'jp-fuji',
      name: 'Mount Fuji & Lake Kawaguchiko Live',
      city: 'Yamanashi, Japan',
      embedUrl: 'https://www.youtube.com/embed/p1uX8q9pE4Y?autoplay=1&mute=1&playsinline=1&enablejsapi=1',
      directUrl: 'https://www.youtube.com/watch?v=p1uX8q9pE4Y',
      source: 'Fujisan Cam',
      description: 'Live scenic view of snow-capped Mount Fuji over Lake Kawaguchi.',
      type: 'youtube'
    },
    {
      id: 'jp-tokyo-tower',
      name: 'Tokyo Skyline & Tokyo Tower',
      city: 'Minato, Tokyo',
      embedUrl: 'https://www.youtube.com/embed/DFsE-H-475c?autoplay=1&mute=1&playsinline=1&enablejsapi=1',
      directUrl: 'https://www.youtube.com/watch?v=DFsE-H-475c',
      source: 'Tokyo Skyline Live',
      description: 'Panoramic skyline view of Roppongi and Tokyo Tower.',
      type: 'youtube'
    }
  ],
  US: [
    {
      id: 'us-times-sq',
      name: 'Times Square Live 4K Cam',
      city: 'New York City, USA',
      embedUrl: 'https://www.youtube.com/embed/1-iS7LArMPA?autoplay=1&mute=1&playsinline=1',
      source: 'EarthCam NYC',
      description: 'Iconic lights, billboards and crowds at the crossroads of the world.',
      type: 'youtube'
    },
    {
      id: 'us-miami',
      name: 'Miami South Beach Ocean Drive',
      city: 'Miami, Florida',
      embedUrl: 'https://www.youtube.com/embed/g8d86i0Z9Yg?autoplay=1&mute=1&playsinline=1',
      source: 'Florida Live Cams',
      description: 'Ocean waves, palms, and Art Deco boulevard.',
      type: 'youtube'
    }
  ],
  FR: [
    {
      id: 'fr-eiffel',
      name: 'Eiffel Tower & Seine River Live',
      city: 'Paris, France',
      embedUrl: 'https://www.youtube.com/embed/rP2PPBq2K0A?autoplay=1&mute=1&playsinline=1',
      source: 'Paris Panoramic Cams',
      description: 'Real-time view of the Iron Lady from the Trocadéro.',
      type: 'youtube'
    }
  ],
  IT: [
    {
      id: 'it-venice',
      name: 'Venice Grand Canal & Rialto Bridge',
      city: 'Venice, Italy',
      embedUrl: 'https://www.youtube.com/embed/ph1vpnYIxJk?autoplay=1&mute=1&playsinline=1',
      source: 'SkylineWebcams Italy',
      description: 'Gondolas cruising along the historic Venetian canal.',
      type: 'youtube'
    },
    {
      id: 'it-rome',
      name: 'Rome Colosseum & Piazza Venezia',
      city: 'Rome, Italy',
      embedUrl: 'https://www.youtube.com/embed/9N4wOqKk3E8?autoplay=1&mute=1&playsinline=1',
      source: 'Rome City Live',
      description: 'Ancient Roman amphitheater live view.',
      type: 'youtube'
    }
  ],
  GB: [
    {
      id: 'gb-london',
      name: 'London Tower Bridge & River Thames',
      city: 'London, United Kingdom',
      embedUrl: 'https://www.youtube.com/embed/pE48bV2wXy8?autoplay=1&mute=1&playsinline=1',
      source: 'London Live Stream',
      description: 'Historic bascule bridge over the Thames.',
      type: 'youtube'
    }
  ],
  IN: [
    {
      id: 'in-varanasi',
      name: 'Varanasi Dashashwamedh Ghat & River Ganga',
      city: 'Varanasi, India',
      embedUrl: 'https://www.youtube.com/embed/g3Q0XWw1w7E?autoplay=1&mute=1&playsinline=1',
      source: 'Holy Ganga Cam',
      description: 'Sacred river ghats and spiritual rituals.',
      type: 'youtube'
    },
    {
      id: 'in-mumbai',
      name: 'Marine Drive & Queens Necklace',
      city: 'Mumbai, India',
      embedUrl: 'https://www.youtube.com/embed/4yZgE5_8q8g?autoplay=1&mute=1&playsinline=1',
      source: 'Mumbai Coastal Live',
      description: 'Arabian Sea promenade and coastal skyline.',
      type: 'youtube'
    }
  ],
  AE: [
    {
      id: 'ae-dubai',
      name: 'Dubai Marina & Burj Khalifa Skyline',
      city: 'Dubai, UAE',
      embedUrl: 'https://www.youtube.com/embed/l4hY7A2n2Jg?autoplay=1&mute=1&playsinline=1',
      source: 'Dubai Live Stream',
      description: 'Futuristic skyscrapers and waterfront promenade.',
      type: 'youtube'
    }
  ],
  AU: [
    {
      id: 'au-sydney',
      name: 'Sydney Opera House & Harbour Bridge',
      city: 'Sydney, Australia',
      embedUrl: 'https://www.youtube.com/embed/y62y_vKzH5k?autoplay=1&mute=1&playsinline=1',
      source: 'Sydney Harbour Cam',
      description: 'Iconic sail-shaped performing arts center and harbor ferries.',
      type: 'youtube'
    }
  ],
  CH: [
    {
      id: 'ch-matterhorn',
      name: 'Zermatt & Matterhorn Alpine Peak',
      city: 'Zermatt, Switzerland',
      embedUrl: 'https://www.youtube.com/embed/8I-g2W9_92I?autoplay=1&mute=1&playsinline=1',
      source: 'Swiss Alpine Livecam',
      description: 'Jaw-dropping views of the pyramid alpine summit.',
      type: 'youtube'
    }
  ]
};

// Fallback dynamic livecam for any country
export function getCountryWebcams(country) {
  if (!country) return [];
  const code = country.code?.toUpperCase();
  if (WEBCAM_CATALOG[code]) {
    return WEBCAM_CATALOG[code];
  }
  // Generic live EarthCam query
  return [
    {
      id: `${country.code || 'intl'}-live-1`,
      name: `${country.capital || country.name} City Panorama & Weather`,
      city: `${country.capital || country.name}, ${country.name}`,
      embedUrl: `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(country.name + ' live camera 4k')}&autoplay=1&mute=1&playsinline=1`,
      source: 'Global EarthCam Network',
      description: `Live panoramic view, weather, and traffic of ${country.capital || country.name}.`,
      type: 'search'
    },
    {
      id: `${country.code || 'intl'}-live-2`,
      name: `${country.name} Nature & Scenic Landscapes Live`,
      city: country.name,
      embedUrl: `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(country.name + ' scenic live cam')}&autoplay=1&mute=1&playsinline=1`,
      source: 'World Nature Stream',
      description: `Scenic landscapes and live conditions across ${country.name}.`,
      type: 'search'
    }
  ];
}

// 2. Emergency SOS Hotlines & Embassy Directory
export const EMERGENCY_DIRECTORY = {
  JP: {
    police: '110',
    ambulance: '119',
    fire: '119',
    touristPolice: '#9110 or 03-3501-0110',
    japanHelpline: '0570-000-911',
    embassies: [
      { name: 'United States Embassy', address: '1-10-5 Akasaka, Minato-ku, Tokyo', phone: '+81 3-3224-5000', city: 'Tokyo' },
      { name: 'British Embassy', address: 'No 1 Ichiban-cho, Chiyoda-ku, Tokyo', phone: '+81 3-5211-1100', city: 'Tokyo' },
      { name: 'Embassy of India', address: '2-2-11 Kudan-minami, Chiyoda-ku, Tokyo', phone: '+81 3-3262-2391', city: 'Tokyo' },
      { name: 'Australian Embassy', address: '2-1-14 Mita, Minato-ku, Tokyo', phone: '+81 3-5232-4111', city: 'Tokyo' },
      { name: 'Embassy of France', address: '4-11-44 Minami-Azabu, Minato-ku, Tokyo', phone: '+81 3-5798-6000', city: 'Tokyo' }
    ],
    phrases: [
      { en: 'Please call an ambulance!', local: '救急車を呼んでください (Kyūkyūsha o yonde kudasai)' },
      { en: 'Help me please!', local: '助けてください (Tasukete kudasai)' },
      { en: 'Where is the nearest hospital?', local: '一番近い病院はどこですか？ (Ichiban chikai byōin wa doko desu ka?)' },
      { en: 'I lost my passport.', local: 'パスポートを紛失しました (Pasupōto o funshitsu shimashita)' }
    ]
  },
  IN: {
    police: '112 / 100',
    ambulance: '108 / 102',
    fire: '101',
    touristPolice: '1363 (24x7 Multi-lingual Tourist Helpline)',
    embassies: [
      { name: 'US Embassy New Delhi', address: 'Shantipath, Chanakyapuri, New Delhi', phone: '+91 11-2419-8000', city: 'New Delhi' },
      { name: 'British High Commission', address: 'Shantipath, Chanakyapuri, New Delhi', phone: '+91 11-2419-2100', city: 'New Delhi' },
      { name: 'Australian High Commission', address: '1/50G Shantipath, Chanakyapuri', phone: '+91 11-4139-9900', city: 'New Delhi' }
    ],
    phrases: [
      { en: 'Please call the doctor / ambulance!', local: 'कृपया एम्बुलेंस बुलाएं (Kripya ambulance bulaayein)' },
      { en: 'Please help me!', local: 'मेरी मदद कीजिये (Meri madad kijiye)' },
      { en: 'Where is the police station?', local: 'पुलिस स्टेशन कहाँ है? (Police station kahan hai?)' }
    ]
  },
  US: {
    police: '911',
    ambulance: '911',
    fire: '911',
    touristPolice: '911 (Universal Emergency)',
    embassies: [
      { name: 'British Embassy Washington', address: '3100 Massachusetts Ave NW, Washington, DC', phone: '+1 202-588-6500', city: 'Washington DC' },
      { name: 'Embassy of Japan', address: '2520 Massachusetts Ave NW, Washington, DC', phone: '+1 202-238-6700', city: 'Washington DC' },
      { name: 'Embassy of India', address: '2107 Massachusetts Ave NW, Washington, DC', phone: '+1 202-939-7000', city: 'Washington DC' }
    ],
    phrases: [
      { en: 'Call 911 immediately!', local: 'Call 911 immediately!' },
      { en: 'I need urgent medical assistance.', local: 'I need urgent medical assistance.' }
    ]
  },
  FR: {
    police: '17',
    ambulance: '15 (SAMU)',
    fire: '18',
    touristPolice: '112 (European Emergency Number)',
    embassies: [
      { name: 'US Embassy Paris', address: '2 Avenue Gabriel, 75008 Paris', phone: '+33 1 43 12 22 22', city: 'Paris' },
      { name: 'British Embassy Paris', address: '35 Rue du Faubourg Saint-Honoré, Paris', phone: '+33 1 44 51 31 00', city: 'Paris' }
    ],
    phrases: [
      { en: 'Please call an ambulance!', local: 'Appelez une ambulance, s’il vous plaît !' },
      { en: 'Help me!', local: 'Aidez-moi !' },
      { en: 'Where is the hospital?', local: 'Où est l’hôpital le plus proche ?' }
    ]
  }
};

export function getCountryEmergencyData(country) {
  if (!country) return null;
  const code = country.code?.toUpperCase();
  if (EMERGENCY_DIRECTORY[code]) {
    return EMERGENCY_DIRECTORY[code];
  }
  // Generic fallback with universal international emergency standards
  return {
    police: '112 / 911',
    ambulance: '112',
    fire: '112',
    touristPolice: '112 (International Emergency Dispatch)',
    embassies: [
      { name: 'Consular Assistance Mission', address: `${country.capital || country.name} Diplomatic Enclave`, phone: '+1-800-EMERGENCY', city: country.capital || country.name },
      { name: 'Tourist Assistance Helpdesk', address: `Central International Airport / Ministry of Tourism`, phone: '112', city: country.capital || country.name }
    ],
    phrases: [
      { en: 'Please call an ambulance!', local: 'Emergency! Ambulance needed immediately.' },
      { en: 'Help me please!', local: 'Help me please / SOS!' },
      { en: 'Where is the hospital?', local: 'Where is the nearest medical clinic or hospital?' }
    ]
  };
}

// 3. Cultural Etiquette, Tipping Customs & Plug Sockets
export const CULTURAL_ETIQUETTE_DATA = {
  JP: {
    tipping: {
      rule: 'Rude / Not Customary',
      tag: 'No Tipping',
      color: '#ef4444',
      advice: 'Tipping is strictly not part of Japanese culture. Leaving extra money at a restaurant or taxi can cause confusion or even offense as outstanding service is viewed as the baseline standard.'
    },
    plugs: {
      types: ['Type A', 'Type B'],
      voltage: '100V',
      frequency: '50Hz (East) / 60Hz (West)',
      adapterNeeded: 'Two flat parallel pins. Travelers from US/Canada may need a 2-prong adapter (no ground pin). European/UK travelers need full voltage converters.'
    },
    etiquette: [
      { title: 'Remove Shoes Indoors', desc: 'Always remove shoes when entering homes, ryokans, temple halls, and traditional tatami-mat restaurants. Wear clean socks.' },
      { title: 'Quiet Public Transit', desc: 'Avoid talking loudly or answering phone calls on trains and subways. Keep smartphones on silent ("manner mode").' },
      { title: 'Chopstick Etiquette', desc: 'Never pass food directly chopstick-to-chopstick or stick chopsticks vertically in a bowl of rice (associated with Buddhist funeral rites).' },
      { title: 'Bowing Greetings', desc: 'A slight bow (eshaku, ~15 degrees) is the standard polite greeting. Handshakes are common with foreigners, but a reciprocal bow is appreciated.' }
    ]
  },
  US: {
    tipping: {
      rule: 'Customary & Expected',
      tag: '18% - 22%',
      color: '#10b981',
      advice: 'Tipping is an essential part of service workers’ compensation. 18-20% is standard for dine-in restaurants, 15-20% for taxis, and $1-$2 per drink at bars.'
    },
    plugs: {
      types: ['Type A', 'Type B'],
      voltage: '120V',
      frequency: '60Hz',
      adapterNeeded: 'Type A & B plugs. UK/EU/AU visitors need travel adapters.'
    },
    etiquette: [
      { title: 'Personal Space', desc: 'Americans maintain relatively large personal bubbles (arms length). Avoid standing uncomfortably close in lines.' },
      { title: 'Casual Friendliness', desc: '"How are you?" is a customary greeting rather than a deep medical inquiry. A simple "Good, thank you!" is the ideal response.' }
    ]
  },
  IN: {
    tipping: {
      rule: 'Appreciated (5% - 10%)',
      tag: 'Discretionary 10%',
      color: '#f59e0b',
      advice: 'At sit-down restaurants, 5-10% is customary unless a service charge is already included in the bill. Small tips (₹50-₹100) are appreciated for hotel porters and drivers.'
    },
    plugs: {
      types: ['Type C', 'Type D', 'Type M'],
      voltage: '230V',
      frequency: '50Hz',
      adapterNeeded: 'Round 3-pin plugs. Universal adapter with round pin compatibility recommended.'
    },
    etiquette: [
      { title: 'Sacred Temples & Footwear', desc: 'Remove shoes and leather belts before entering Hindu temples, gurdwaras, and mosques. Cover head in Gurdwaras.' },
      { title: 'Eating with Right Hand', desc: 'The right hand is traditionally used for eating and passing food or money, as the left hand is culturally associated with washing.' },
      { title: 'Namaste Gesture', desc: 'Pressing palms together with a gentle bow saying "Namaste" is the respectful, timeless greeting across all of India.' }
    ]
  },
  FR: {
    tipping: {
      rule: 'Service Compris (Included)',
      tag: 'Round-Up / 5%',
      color: '#38bdf8',
      advice: 'By French law, a 15% service charge (service compris) is automatically included in the bill. Leaving small change or 1-2€ per person is standard for great service.'
    },
    plugs: {
      types: ['Type C', 'Type E'],
      voltage: '230V',
      frequency: '50Hz',
      adapterNeeded: 'Standard 2-round-pin European plug.'
    },
    etiquette: [
      { title: 'Bonjour Rule', desc: 'Always say "Bonjour Madame/Monsieur" immediately upon entering any shop, bakery, or restaurant. Jumping straight to questions is considered impolite.' },
      { title: 'Dining Pace', desc: 'French meals are meant to be savored. You must specifically ask for the bill ("L’addition s’il vous plaît"), as waiters will never rush you.' }
    ]
  }
};

export function getCountryCulturalData(country) {
  if (!country) return null;
  const code = country.code?.toUpperCase();
  if (CULTURAL_ETIQUETTE_DATA[code]) {
    return CULTURAL_ETIQUETTE_DATA[code];
  }
  // Generic fallback based on global travel norms
  return {
    tipping: {
      rule: 'Discretionary / 10%',
      tag: '5% - 10%',
      color: '#f59e0b',
      advice: 'Tipping is appreciated for good service at restaurants and tour guides. Check if a service charge or tax is already included in the bill.'
    },
    plugs: {
      types: ['Type C', 'Type F'],
      voltage: '220V - 240V',
      frequency: '50Hz',
      adapterNeeded: 'Carry a universal multi-prong travel adapter with USB-C surge protection.'
    },
    etiquette: [
      { title: 'Respect Religious Customs', desc: 'Cover shoulders and knees when visiting historical churches, mosques, or sacred sanctuaries.' },
      { title: 'Polite Greetings', desc: 'Greet store staff in the local tongue before asking questions or making purchases.' },
      { title: 'Ask Before Photographing', desc: 'Always seek permission before capturing portraits of local artisans or residents.' }
    ]
  };
}

// 4. International Gateway Flight Hubs & Transit Estimators
export const FLIGHT_HUBS_DATA = {
  JP: {
    airports: [
      { code: 'HND', name: 'Tokyo Haneda Airport', city: 'Tokyo', transitTime: '15 min to central Tokyo via Tokyo Monorail / Keikyu Line', taxiCost: '¥6,000 - ¥9,000' },
      { code: 'NRT', name: 'Narita International Airport', city: 'Chiba/Tokyo', transitTime: '36 min to Ueno via Keisei Skyliner / 60 min via Narita Express', taxiCost: '¥25,000+' },
      { code: 'KIX', name: 'Kansai International Airport', city: 'Osaka/Kyoto', transitTime: '45 min to Osaka via Haruka Express / 75 min to Kyoto', taxiCost: '¥18,000+' }
    ],
    flightHours: [
      { from: 'New York (JFK)', duration: '14h 15m direct' },
      { from: 'London (LHR)', duration: '14h 00m direct' },
      { from: 'Dubai (DXB)', duration: '9h 30m direct' },
      { from: 'New Delhi (DEL)', duration: '8h 20m direct' },
      { from: 'Singapore (SIN)', duration: '7h 10m direct' },
      { from: 'Sydney (SYD)', duration: '9h 45m direct' }
    ]
  },
  IN: {
    airports: [
      { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'New Delhi', transitTime: '20 min to Connaught Place via Airport Express Metro', taxiCost: '₹500 - ₹800' },
      { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International', city: 'Mumbai', transitTime: '40-60 min to South Mumbai via Western Express / Coastal Road', taxiCost: '₹600 - ₹1,000' },
      { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bengaluru', transitTime: '60-90 min via Vayu Vajra Airport Bus / Taxi', taxiCost: '₹1,200 - ₹1,800' }
    ],
    flightHours: [
      { from: 'London (LHR)', duration: '8h 45m direct' },
      { from: 'Dubai (DXB)', duration: '3h 30m direct' },
      { from: 'Singapore (SIN)', duration: '5h 30m direct' },
      { from: 'New York (JFK)', duration: '14h 45m direct' },
      { from: 'Tokyo (NRT)', duration: '9h 00m direct' },
      { from: 'Sydney (SYD)', duration: '12h 30m direct' }
    ]
  },
  US: {
    airports: [
      { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', transitTime: '45 min via AirTrain + LIRR to Penn Station', taxiCost: '$70 flat rate' },
      { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', transitTime: '30-60 min via FlyAway bus / Rideshare', taxiCost: '$45 - $80' },
      { code: 'ORD', name: "O'Hare International Airport", city: 'Chicago', transitTime: '45 min via CTA Blue Line Train', taxiCost: '$40 - $60' }
    ],
    flightHours: [
      { from: 'London (LHR)', duration: '7h 50m direct to NYC' },
      { from: 'Tokyo (HND)', duration: '13h 30m direct to LAX' },
      { from: 'Sydney (SYD)', duration: '14h 20m direct to LAX' },
      { from: 'Frankfurt (FRA)', duration: '8h 30m direct to NYC' }
    ]
  },
  FR: {
    airports: [
      { code: 'CDG', name: 'Paris Charles de Gaulle', city: 'Paris', transitTime: '35 min to Gare du Nord via RER B Train', taxiCost: '€56 (Right Bank) / €65 (Left Bank)' },
      { code: 'ORY', name: 'Paris Orly Airport', city: 'Paris', transitTime: '25 min via Orlyval + Metro line 14', taxiCost: '€36 - €44' }
    ],
    flightHours: [
      { from: 'New York (JFK)', duration: '7h 20m direct' },
      { from: 'London (LHR)', duration: '1h 15m direct' },
      { from: 'Dubai (DXB)', duration: '6h 50m direct' },
      { from: 'Tokyo (HND)', duration: '14h 00m direct' }
    ]
  }
};

export function getCountryFlightData(country) {
  if (!country) return null;
  const code = country.code?.toUpperCase();
  if (FLIGHT_HUBS_DATA[code]) {
    return FLIGHT_HUBS_DATA[code];
  }
  return {
    airports: [
      { code: `${country.code || 'INTL'}`, name: `${country.capital || country.name} International Airport`, city: country.capital || country.name, transitTime: '25-45 min via Airport Express Shuttle / Metro', taxiCost: '$25 - $45 USD' }
    ],
    flightHours: [
      { from: 'London (LHR)', duration: 'Varies with route' },
      { from: 'Dubai (DXB)', duration: 'Direct or 1 stop' },
      { from: 'New York (JFK)', duration: 'Direct or 1 stop' }
    ]
  };
}

// 5. Wanderlust Geography & Landmark Quiz Bank
export const QUIZ_QUESTIONS = [
  {
    id: 1,
    country: 'Japan',
    question: 'What is the highest mountain peak in Japan, standing at 3,776 meters?',
    options: ['Mount Fuji', 'Mount Tate', 'Mount Haku', 'Mount Kita'],
    answer: 0,
    explanation: 'Mount Fuji (Fujisan) is a sacred volcano and Japan’s highest summit, inscribed as a UNESCO World Heritage site.'
  },
  {
    id: 2,
    country: 'India',
    question: 'The Taj Mahal in Agra was commissioned by which Mughal Emperor in memory of Mumtaz Mahal?',
    options: ['Akbar the Great', 'Shah Jahan', 'Babur', 'Aurangzeb'],
    answer: 1,
    explanation: 'Emperor Shah Jahan commissioned the white marble mausoleum in 1632.'
  },
  {
    id: 3,
    country: 'France',
    question: 'Which iconic Paris avenue leads directly from Place de la Concorde to the Arc de Triomphe?',
    options: ['Boulevard Haussmann', 'Avenue des Champs-Élysées', 'Rue de Rivoli', 'Avenue Montaigne'],
    answer: 1,
    explanation: 'The Avenue des Champs-Élysées is one of the world’s most celebrated boulevards.'
  },
  {
    id: 4,
    country: 'Global',
    question: 'Which country is home to the largest number of sovereign UNESCO World Heritage sites in the world?',
    options: ['China', 'Italy', 'Spain', 'Germany'],
    answer: 1,
    explanation: 'Italy boasts the world’s highest count with 60 UNESCO World Heritage sites.'
  },
  {
    id: 5,
    country: 'Global',
    question: 'What is the world’s highest elevation capital city above sea level (3,640 meters)?',
    options: ['Quito, Ecuador', 'La Paz, Bolivia', 'Bogotá, Colombia', 'Addis Ababa, Ethiopia'],
    answer: 1,
    explanation: 'La Paz in Bolivia sits at an extraordinary 3,640 meters (11,942 ft) in the Andes.'
  },
  {
    id: 6,
    country: 'Global',
    question: 'Which currency is the legal tender in Japan?',
    options: ['Yuan', 'Won', 'Yen', 'Ringgit'],
    answer: 2,
    explanation: 'The Japanese Yen (¥ / JPY) is the legal tender and the third most traded currency globally.'
  },
  {
    id: 7,
    country: 'Global',
    question: 'The ancient stone citadel of Machu Picchu is located in which South American nation?',
    options: ['Chile', 'Peru', 'Argentina', 'Bolivia'],
    answer: 1,
    explanation: 'Machu Picchu was built by the Inca Empire high in the Peruvian Andes.'
  }
];

// 6. Comprehensive Travel Cost Models (USD per day base)
export const REGIONAL_BUDGET_FACTORS = {
  'Europe': { budget: 65, mid: 160, luxury: 380, split: { hotel: 0.45, food: 0.28, transport: 0.14, activities: 0.13 } },
  'Asia': { budget: 35, mid: 95, luxury: 250, split: { hotel: 0.40, food: 0.25, transport: 0.15, activities: 0.20 } },
  'Americas': { budget: 70, mid: 175, luxury: 420, split: { hotel: 0.50, food: 0.25, transport: 0.15, activities: 0.10 } },
  'Africa': { budget: 40, mid: 110, luxury: 320, split: { hotel: 0.42, food: 0.22, transport: 0.18, activities: 0.18 } },
  'Oceania': { budget: 75, mid: 185, luxury: 410, split: { hotel: 0.48, food: 0.26, transport: 0.14, activities: 0.12 } },
  'default': { budget: 50, mid: 130, luxury: 320, split: { hotel: 0.45, food: 0.25, transport: 0.15, activities: 0.15 } }
};
