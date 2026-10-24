import React, { createContext, useContext, useState, useEffect } from 'react';

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧', label: 'EN' },
  { code: 'es', name: 'Español', flag: '🇪🇸', label: 'ES' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', label: 'FR' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', label: 'JA' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', label: 'HI' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', label: 'DE' }
];

export const TRANSLATIONS = {
  en: {
    // Navbar
    quiz: 'Quiz',
    passport: 'Passport',
    compare: 'Compare',
    myTrip: 'My Trip',
    addCountry: 'Add Country',
    cloudAccount: 'Cloud Sync',
    installApp: 'Install App',
    // Home
    searchNations: 'Search 195 nations by name, capital city, or currency...',
    allRegions: 'All Continents',
    sortBy: 'Sort By',
    // Country Stage
    backToAllNations: 'Back to All Nations',
    switchCountry: 'Switch Country:',
    population: 'Total Population',
    surfaceArea: 'Surface Area',
    gdp: 'Nominal GDP',
    capitalCity: 'Capital City',
    currency: 'Currency',
    region: 'Geographic Region',
    languages: 'Official Languages',
    bestTime: 'Best Time to Visit & Climate',
    // Widgets
    liveClimate: 'Live Capital Climate & Travel Season',
    liveCurrency: 'Live Currency Converter & Budget Meter',
    liveWebcam: 'Live EarthCam & City Streamer',
    budgetEstimator: 'Comprehensive Trip Cost & Daily Budget Estimator',
    flightGateways: 'International Flight Gateways & Transit Estimator',
    culturalEtiquette: 'Cultural Etiquette, Tipping & Socket Guide',
    emergencySOS: 'Local Emergency Hotlines & Embassy Directory',
    visaChecker: 'Smart Visa & Entry Requirements Checker',
    phrasebook: 'Essential Local Travel Phrasebook with Audio',
    smartTrip: 'TerraVoyage AI Day-by-Day Smart Itinerary Generator',
    packingList: 'Climate-Aware Packing Checklist Generator',
    // Actions
    viewSpecs: 'View Specs',
    map: 'Map',
    streetView: '360° View',
    earth3d: '3D Earth',
    model3d: '3D Model',
    closeSpecs: 'Close Specs',
    addToItinerary: 'Add to My Itinerary',
    shareTrip: 'Share Trip'
  },
  es: {
    quiz: 'Cuestionario',
    passport: 'Pasaporte',
    compare: 'Comparar',
    myTrip: 'Mi Viaje',
    addCountry: 'Añadir País',
    cloudAccount: 'Nube Sync',
    installApp: 'Instalar App',
    searchNations: 'Buscar 195 naciones por nombre, capital o moneda...',
    allRegions: 'Todos los Continentes',
    sortBy: 'Ordenar por',
    backToAllNations: 'Volver a Todas las Naciones',
    switchCountry: 'Cambiar País:',
    population: 'Población Total',
    surfaceArea: 'Área Superficial',
    gdp: 'PIB Nominal',
    capitalCity: 'Ciudad Capital',
    currency: 'Moneda Legal',
    region: 'Región Geográfica',
    languages: 'Idiomas Oficiales',
    bestTime: 'Mejor Época para Visitar',
    liveClimate: 'Clima en Vivo y Temporada de Viaje',
    liveCurrency: 'Convertidor de Divisas en Vivo',
    liveWebcam: 'Cámaras en Vivo y EarthCam 24/7',
    budgetEstimator: 'Calculadora de Presupuesto Diario de Viaje',
    flightGateways: 'Aeropuertos y Puertas de Enlace de Vuelo',
    culturalEtiquette: 'Guía de Propinas, Enchufes y Etiqueta Cultural',
    emergencySOS: 'Líneas de Emergencia y Directorio de Embajadas',
    visaChecker: 'Verificador Inteligente de Visados',
    phrasebook: 'Guía de Frases Esenciales con Audio',
    smartTrip: 'Generador Inteligente de Itinerarios IA',
    packingList: 'Lista Dinámica de Equipaje según el Clima',
    viewSpecs: 'Ver Detalles',
    map: 'Mapa',
    streetView: 'Vista 360°',
    earth3d: 'Tierra 3D',
    model3d: 'Modelo 3D',
    closeSpecs: 'Cerrar',
    addToItinerary: 'Guardar en Mi Viaje',
    shareTrip: 'Compartir'
  },
  fr: {
    quiz: 'Quiz',
    passport: 'Passeport',
    compare: 'Comparer',
    myTrip: 'Mon Voyage',
    addCountry: 'Ajouter un Pays',
    cloudAccount: 'Cloud Sync',
    installApp: 'Installer',
    searchNations: 'Rechercher 195 nations par nom, capitale ou monnaie...',
    allRegions: 'Tous les Continents',
    sortBy: 'Trier par',
    backToAllNations: 'Retour à Toutes les Nations',
    switchCountry: 'Changer de Pays :',
    population: 'Population Totale',
    surfaceArea: 'Superficie',
    gdp: 'PIB Nominal',
    capitalCity: 'Capitale',
    currency: 'Devise Légale',
    region: 'Région Géographique',
    languages: 'Langues Officielles',
    bestTime: 'Meilleure Période de Voyage',
    liveClimate: 'Climat en Direct et Saison de Visite',
    liveCurrency: 'Convertisseur de Devises en Direct',
    liveWebcam: 'Webcams en Direct 24/7 & EarthCam',
    budgetEstimator: 'Estimateur de Budget et Coût du Voyage',
    flightGateways: 'Aéroports Internationaux et Durées de Vol',
    culturalEtiquette: 'Pourboires, Prises Électriques & Étiquette',
    emergencySOS: 'Urgences Locales & Annuaire des Ambassades',
    visaChecker: 'Vérificateur Intelligent de Visas',
    phrasebook: 'Guide de Conversation avec Prononciation',
    smartTrip: 'Générateur d’Itinéraire IA Jour par Jour',
    packingList: 'Checklist de Bagages selon le Climat',
    viewSpecs: 'Voir Détails',
    map: 'Carte',
    streetView: 'Vue 360°',
    earth3d: 'Terre 3D',
    model3d: 'Modèle 3D',
    closeSpecs: 'Fermer',
    addToItinerary: 'Ajouter à Mon Voyage',
    shareTrip: 'Partager'
  },
  ja: {
    quiz: 'クイズ',
    passport: 'パスポート',
    compare: '国を比較',
    myTrip: '旅のプラン',
    addCountry: '国を追加',
    cloudAccount: 'クラウド同期',
    installApp: 'アプリを保存',
    searchNations: '国名、首都、通貨で195カ国を検索...',
    allRegions: 'すべての大陸',
    sortBy: '並び替え',
    backToAllNations: 'すべての国に戻る',
    switchCountry: '国を切り替え:',
    population: '総人口',
    surfaceArea: '国土面積',
    gdp: '名目GDP',
    capitalCity: '首都',
    currency: '公式通貨',
    region: '地理的地域',
    languages: '公用語',
    bestTime: 'おすすめの旅行時期と気候',
    liveClimate: '現地のライブ気候とベストシーズン',
    liveCurrency: 'リアルタイム為替レートと予算メーター',
    liveWebcam: '24時間ライブカメラ & EarthCam',
    budgetEstimator: '旅行費用と日別予算シミュレーター',
    flightGateways: '国際空港ゲートウェイと飛行時間',
    culturalEtiquette: 'チップマナー・電源プラグ・文化エチケット',
    emergencySOS: '緊急連絡先・大使館ホットライン',
    visaChecker: 'ビザ要件チェッカー',
    phrasebook: '音声付き現地旅行フレーズブック',
    smartTrip: 'TerraVoyage AIスマート旅行プラン',
    packingList: '気候に合わせた持ち物パッキングリスト',
    viewSpecs: '詳細を見る',
    map: '地図',
    streetView: '360° パノラマ',
    earth3d: '3D 地球儀',
    model3d: '3D 建築モデル',
    closeSpecs: '閉じる',
    addToItinerary: '旅程に追加',
    shareTrip: 'シェア'
  },
  hi: {
    quiz: 'प्रश्नोत्तरी',
    passport: 'पासपोर्ट',
    compare: 'तुलना करें',
    myTrip: 'मेरी यात्रा',
    addCountry: 'देश जोड़ें',
    cloudAccount: 'क्लाउड सिंक',
    installApp: 'ऐप इंस्टॉल करें',
    searchNations: 'नाम, राजधानी या मुद्रा द्वारा 195 देशों को खोजें...',
    allRegions: 'सभी महाद्वीप',
    sortBy: 'क्रमबद्ध करें',
    backToAllNations: 'सभी देशों पर वापस जाएं',
    switchCountry: 'देश बदलें:',
    population: 'कुल जनसंख्या',
    surfaceArea: 'क्षेत्रफल',
    gdp: 'सकल घरेलू उत्पाद (GDP)',
    capitalCity: 'राजधानी शहर',
    currency: 'आधिकारिक मुद्रा',
    region: 'भौगोलिक क्षेत्र',
    languages: 'आधिकारिक भाषाएँ',
    bestTime: 'यात्रा का सर्वोत्तम समय व जलवायु',
    liveClimate: 'लाइव राजधानी मौसम व यात्रा सीजन',
    liveCurrency: 'लाइव मुद्रा परिवर्तक व बजट मीटर',
    liveWebcam: 'लाइव वेबकैम व 24/7 अर्थकैम',
    budgetEstimator: 'व्यापक यात्रा लागत और दैनिक बजट अनुमानक',
    flightGateways: 'अंतरराष्ट्रीय हवाई अड्डे और उड़ान समय',
    culturalEtiquette: 'टिपिंग, सॉकेट व सांस्कृतिक शिष्टाचार गाइड',
    emergencySOS: 'स्थानीय आपातकालीन हेल्पलाइन व दूतावास',
    visaChecker: 'स्मार्ट वीजा और प्रवेश आवश्यकताएँ',
    phrasebook: 'ऑडियो सहित आवश्यक स्थानीय वाक्यांश',
    smartTrip: 'एआई दिवस-दर-दिवस स्मार्ट यात्रा योजना',
    packingList: 'जलवायु-आधारित पैकिंग चेकलिस्ट',
    viewSpecs: 'विवरण देखें',
    map: 'नक्शा',
    streetView: '360° स्ट्रीट व्यू',
    earth3d: '3D अर्थ',
    model3d: '3D मॉडल',
    closeSpecs: 'बंद करें',
    addToItinerary: 'मेरी यात्रा में जोड़ें',
    shareTrip: 'साझा करें'
  },
  de: {
    quiz: 'Quiz',
    passport: 'Reisepass',
    compare: 'Vergleichen',
    myTrip: 'Meine Reise',
    addCountry: 'Land Hinzufügen',
    cloudAccount: 'Cloud Sync',
    installApp: 'App Installieren',
    searchNations: '195 Nationen nach Name, Hauptstadt oder Währung durchsuchen...',
    allRegions: 'Alle Kontinente',
    sortBy: 'Sortieren nach',
    backToAllNations: 'Zurück zu allen Nationen',
    switchCountry: 'Land wechseln:',
    population: 'Gesamtbevölkerung',
    surfaceArea: 'Fläche',
    gdp: 'BIP (Nominal)',
    capitalCity: 'Hauptstadt',
    currency: 'Währung',
    region: 'Geografische Region',
    languages: 'Amtssprachen',
    bestTime: 'Beste Reisezeit & Klima',
    liveClimate: 'Live-Klima & Reisezeit-Status',
    liveCurrency: 'Live-Währungsrechner & Budget-Messung',
    liveWebcam: '24/7 Live-Webcams & EarthCam',
    budgetEstimator: 'Reisekosten- & Tagesbudget-Rechner',
    flightGateways: 'Internationale Drehkreuze & Flugzeiten',
    culturalEtiquette: 'Trinkgeld, Steckdosen & Kulturelle Etikette',
    emergencySOS: 'Lokale Notrufnummern & Botschaftsverzeichnis',
    visaChecker: 'Intelligenter Visum-Prüfer',
    phrasebook: 'Wichtige Redewendungen mit Sprachausgabe',
    smartTrip: 'KI-Reiseplaner von Tag zu Tag',
    packingList: 'Klimabewusste Packliste',
    viewSpecs: 'Details ansehen',
    map: 'Karte',
    streetView: '360° Ansicht',
    earth3d: '3D Erde',
    model3d: '3D Modell',
    closeSpecs: 'Schließen',
    addToItinerary: 'Zu Meiner Reise Hinzufügen',
    shareTrip: 'Teilen'
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    try {
      return localStorage.getItem('terra_voyage_lang') || 'en';
    } catch (e) {
      return 'en';
    }
  });

  const changeLanguage = (code) => {
    setCurrentLang(code);
    try {
      localStorage.setItem('terra_voyage_lang', code);
    } catch (e) {}
  };

  const t = (key) => {
    const langDict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  };

  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return React.createElement(
    LanguageContext.Provider,
    { value: { currentLang, currentLangObj, changeLanguage, t, languages: LANGUAGES } },
    children
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      t: (k) => k,
      currentLang: 'en',
      currentLangObj: LANGUAGES[0],
      changeLanguage: () => {},
      languages: LANGUAGES
    };
  }
  return context;
}
