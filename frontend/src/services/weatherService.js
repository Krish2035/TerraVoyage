// Live Weather & Climate Season Analysis Service using Open-Meteo API (Free, No Key Required)

// Comprehensive capital coordinates mapping for world countries
export const CAPITAL_COORDINATES = {
  // Asia
  'AF': { lat: 34.5553, lon: 69.2075, city: 'Kabul' },
  'AM': { lat: 40.1792, lon: 44.4991, city: 'Yerevan' },
  'AZ': { lat: 40.4093, lon: 49.8671, city: 'Baku' },
  'BH': { lat: 26.2285, lon: 50.5860, city: 'Manama' },
  'BD': { lat: 23.8103, lon: 90.4125, city: 'Dhaka' },
  'BT': { lat: 27.4728, lon: 89.6393, city: 'Thimphu' },
  'BN': { lat: 4.9031, lon: 114.9398, city: 'Bandar Seri Begawan' },
  'KH': { lat: 11.5564, lon: 104.9282, city: 'Phnom Penh' },
  'CN': { lat: 39.9042, lon: 116.4074, city: 'Beijing' },
  'CY': { lat: 35.1856, lon: 33.3823, city: 'Nicosia' },
  'GE': { lat: 41.7151, lon: 44.8271, city: 'Tbilisi' },
  'IN': { lat: 28.6139, lon: 77.2090, city: 'New Delhi' },
  'ID': { lat: -6.2088, lon: 106.8456, city: 'Jakarta' },
  'IR': { lat: 35.6892, lon: 51.3890, city: 'Tehran' },
  'IQ': { lat: 33.3152, lon: 44.3661, city: 'Baghdad' },
  'IL': { lat: 31.7683, lon: 35.2137, city: 'Jerusalem' },
  'JP': { lat: 35.6762, lon: 139.6503, city: 'Tokyo' },
  'JO': { lat: 31.9454, lon: 35.9284, city: 'Amman' },
  'KZ': { lat: 51.1694, lon: 71.4491, city: 'Astana' },
  'KW': { lat: 29.3759, lon: 47.9774, city: 'Kuwait City' },
  'KG': { lat: 42.8746, lon: 74.5698, city: 'Bishkek' },
  'LA': { lat: 17.9757, lon: 102.6331, city: 'Vientiane' },
  'LB': { lat: 33.8938, lon: 35.5018, city: 'Beirut' },
  'MY': { lat: 3.1390, lon: 101.6869, city: 'Kuala Lumpur' },
  'MV': { lat: 4.1755, lon: 73.5093, city: 'Malé' },
  'MN': { lat: 47.9188, lon: 106.9176, city: 'Ulaanbaatar' },
  'MM': { lat: 19.7633, lon: 96.0785, city: 'Naypyidaw' },
  'NP': { lat: 27.7172, lon: 85.3240, city: 'Kathmandu' },
  'OM': { lat: 23.5880, lon: 58.3829, city: 'Muscat' },
  'PK': { lat: 33.6844, lon: 73.0479, city: 'Islamabad' },
  'PH': { lat: 14.5995, lon: 120.9842, city: 'Manila' },
  'QA': { lat: 25.2854, lon: 51.5310, city: 'Doha' },
  'SA': { lat: 24.7136, lon: 46.6753, city: 'Riyadh' },
  'SG': { lat: 1.3521, lon: 103.8198, city: 'Singapore' },
  'KR': { lat: 37.5665, lon: 126.9780, city: 'Seoul' },
  'LK': { lat: 6.9271, lon: 79.8612, city: 'Colombo' },
  'SY': { lat: 33.5138, lon: 36.2765, city: 'Damascus' },
  'TJ': { lat: 38.5598, lon: 68.7870, city: 'Dushanbe' },
  'TH': { lat: 13.7563, lon: 100.5018, city: 'Bangkok' },
  'TR': { lat: 39.9334, lon: 32.8597, city: 'Ankara' },
  'TM': { lat: 37.9601, lon: 58.3261, city: 'Ashgabat' },
  'AE': { lat: 24.4539, lon: 54.3773, city: 'Abu Dhabi' },
  'UZ': { lat: 41.2995, lon: 69.2401, city: 'Tashkent' },
  'VN': { lat: 21.0285, lon: 105.8542, city: 'Hanoi' },
  'YE': { lat: 15.3694, lon: 44.1910, city: "Sana'a" },

  // Europe
  'AL': { lat: 41.3275, lon: 19.8187, city: 'Tirana' },
  'AD': { lat: 42.5063, lon: 1.5218, city: 'Andorra la Vella' },
  'AT': { lat: 48.2082, lon: 16.3738, city: 'Vienna' },
  'BE': { lat: 50.8503, lon: 4.3517, city: 'Brussels' },
  'BA': { lat: 43.8563, lon: 18.4131, city: 'Sarajevo' },
  'BG': { lat: 42.6977, lon: 23.3219, city: 'Sofia' },
  'HR': { lat: 45.8150, lon: 15.9819, city: 'Zagreb' },
  'CZ': { lat: 50.0755, lon: 14.4378, city: 'Prague' },
  'DK': { lat: 55.6761, lon: 12.5683, city: 'Copenhagen' },
  'EE': { lat: 59.4370, lon: 24.7536, city: 'Tallinn' },
  'FI': { lat: 60.1699, lon: 24.9384, city: 'Helsinki' },
  'FR': { lat: 48.8566, lon: 2.3522, city: 'Paris' },
  'DE': { lat: 52.5200, lon: 13.4050, city: 'Berlin' },
  'GR': { lat: 37.9838, lon: 23.7275, city: 'Athens' },
  'HU': { lat: 47.4979, lon: 19.0402, city: 'Budapest' },
  'IS': { lat: 64.1466, lon: -21.9426, city: 'Reykjavik' },
  'IE': { lat: 53.3498, lon: -6.2603, city: 'Dublin' },
  'IT': { lat: 41.9028, lon: 12.4964, city: 'Rome' },
  'LV': { lat: 56.9496, lon: 24.1052, city: 'Riga' },
  'LT': { lat: 54.6872, lon: 25.2797, city: 'Vilnius' },
  'LU': { lat: 49.6116, lon: 6.1319, city: 'Luxembourg City' },
  'NL': { lat: 52.3676, lon: 4.9041, city: 'Amsterdam' },
  'NO': { lat: 59.9139, lon: 10.7522, city: 'Oslo' },
  'PL': { lat: 52.2297, lon: 21.0122, city: 'Warsaw' },
  'PT': { lat: 38.7223, lon: -9.1393, city: 'Lisbon' },
  'RO': { lat: 44.4268, lon: 26.1025, city: 'Bucharest' },
  'RU': { lat: 55.7558, lon: 37.6173, city: 'Moscow' },
  'RS': { lat: 44.7866, lon: 20.4489, city: 'Belgrade' },
  'SK': { lat: 48.1486, lon: 17.1077, city: 'Bratislava' },
  'SI': { lat: 46.0569, lon: 14.5058, city: 'Ljubljana' },
  'ES': { lat: 40.4168, lon: -3.7038, city: 'Madrid' },
  'SE': { lat: 59.3293, lon: 18.0686, city: 'Stockholm' },
  'CH': { lat: 46.9480, lon: 7.4474, city: 'Bern' },
  'UA': { lat: 50.4501, lon: 30.5234, city: 'Kyiv' },
  'GB': { lat: 51.5074, lon: -0.1278, city: 'London' },

  // Americas
  'US': { lat: 38.9072, lon: -77.0369, city: 'Washington, D.C.' },
  'CA': { lat: 45.4215, lon: -75.6972, city: 'Ottawa' },
  'MX': { lat: 19.4326, lon: -99.1332, city: 'Mexico City' },
  'BR': { lat: -15.8267, lon: -47.9218, city: 'Brasília' },
  'AR': { lat: -34.6037, lon: -58.3816, city: 'Buenos Aires' },
  'CL': { lat: -33.4489, lon: -70.6693, city: 'Santiago' },
  'CO': { lat: 4.7110, lon: -74.0721, city: 'Bogotá' },
  'PE': { lat: -12.0464, lon: -77.0428, city: 'Lima' },
  'EC': { lat: -0.1807, lon: -78.4678, city: 'Quito' },
  'CR': { lat: 9.9281, lon: -84.0907, city: 'San José' },
  'CU': { lat: 23.1136, lon: -82.3666, city: 'Havana' },
  'PA': { lat: 8.9824, lon: -79.5199, city: 'Panama City' },

  // Africa
  'EG': { lat: 30.0444, lon: 31.2357, city: 'Cairo' },
  'ZA': { lat: -25.7479, lon: 28.2293, city: 'Pretoria' },
  'NG': { lat: 9.0765, lon: 7.3986, city: 'Abuja' },
  'KE': { lat: -1.2921, lon: 36.8219, city: 'Nairobi' },
  'MA': { lat: 34.0209, lon: -6.8416, city: 'Rabat' },
  'ET': { lat: 9.0320, lon: 38.7480, city: 'Addis Ababa' },
  'GH': { lat: 5.6037, lon: -0.1870, city: 'Accra' },
  'TZ': { lat: -6.1630, lon: 35.7516, city: 'Dodoma' },

  // Oceania
  'AU': { lat: -35.2809, lon: 149.1300, city: 'Canberra' },
  'NZ': { lat: -41.2865, lon: 174.7762, city: 'Wellington' },
  'FJ': { lat: -18.1416, lon: 178.4419, city: 'Suva' },
};

// Interpretation of WMO Weather Codes from Open-Meteo
export const decodeWmoWeather = (code) => {
  if (code === 0) return { label: 'Clear Sky', icon: '☀️', condition: 'Sunny' };
  if (code === 1) return { label: 'Mainly Clear', icon: '🌤️', condition: 'Clear' };
  if (code === 2) return { label: 'Partly Cloudy', icon: '⛅', condition: 'Partly Cloudy' };
  if (code === 3) return { label: 'Overcast', icon: '☁️', condition: 'Cloudy' };
  if (code >= 45 && code <= 48) return { label: 'Foggy / Hazy', icon: '🌫️', condition: 'Fog' };
  if (code >= 51 && code <= 55) return { label: 'Light Drizzle', icon: '🌦️', condition: 'Drizzle' };
  if (code >= 61 && code <= 65) return { label: 'Rain Showers', icon: '🌧️', condition: 'Rain' };
  if (code >= 71 && code <= 77) return { label: 'Snowfall', icon: '❄️', condition: 'Snow' };
  if (code >= 80 && code <= 82) return { label: 'Rain Showers', icon: '🌧️', condition: 'Showers' };
  if (code >= 95 && code <= 99) return { label: 'Thunderstorms', icon: '⛈️', condition: 'Thunderstorm' };
  return { label: 'Pleasant & Mild', icon: '🌤️', condition: 'Fair' };
};

// Fetch real-time weather for any country
export async function fetchLiveWeather(country) {
  if (!country) return null;

  const code = (country.code || '').toUpperCase();
  const coords = CAPITAL_COORDINATES[code] || {
    lat: 30.0,
    lon: 50.0,
    city: country.capital || country.name
  };

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
    const data = await res.json();
    
    const current = data.current || {};
    const weatherInfo = decodeWmoWeather(current.weather_code ?? 1);

    return {
      city: coords.city,
      tempC: Math.round(current.temperature_2m ?? 22),
      tempF: Math.round(((current.temperature_2m ?? 22) * 9/5) + 32),
      humidity: current.relative_humidity_2m ?? 45,
      windSpeed: Math.round(current.wind_speed_10m ?? 12),
      condition: weatherInfo.condition,
      label: weatherInfo.label,
      icon: weatherInfo.icon,
      isLive: true
    };
  } catch (err) {
    // Graceful realistic simulated fallback if offline
    console.warn('Using fallback climate data for', country.name, err.message);
    const mockTemp = 18 + (country.name.length % 14);
    return {
      city: country.capital || country.name,
      tempC: mockTemp,
      tempF: Math.round((mockTemp * 9/5) + 32),
      humidity: 50,
      windSpeed: 14,
      condition: 'Partly Sunny',
      label: 'Optimal Seasonal Climate',
      icon: '🌤️',
      isLive: false
    };
  }
}

// Determines if the current calendar month is in the country's peak visiting season
export function calculateSeasonStatus(bestTimeToVisit) {
  if (!bestTimeToVisit) {
    return {
      status: 'neutral',
      badge: 'Year-Round Destination',
      color: '#38bdf8',
      explanation: 'Balanced year-round climate for travel and exploration.'
    };
  }

  const months = [
    'january', 'february', 'march', 'april', 'may', 'june', 
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  const shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  
  const currentMonthIdx = new Date().getMonth();
  const currentMonthName = months[currentMonthIdx];
  const currentShort = shortMonths[currentMonthIdx];

  const text = bestTimeToVisit.toLowerCase();
  
  // Check if current month directly appears
  const isDirectMatch = text.includes(currentMonthName) || text.includes(currentShort);

  if (isDirectMatch) {
    return {
      status: 'peak',
      badge: '🟢 Prime Visiting Season Now',
      color: '#10b981',
      explanation: `Current month (${months[currentMonthIdx].toUpperCase()}) is within recommended peak travel window.`
    };
  }

  // Check adjacent months (shoulder season)
  const prevMonth = shortMonths[(currentMonthIdx + 11) % 12];
  const nextMonth = shortMonths[(currentMonthIdx + 1) % 12];

  if (text.includes(prevMonth) || text.includes(nextMonth)) {
    return {
      status: 'shoulder',
      badge: '🟡 Shoulder Season',
      color: '#f59e0b',
      explanation: `Moderate climate with fewer crowds and excellent hotel value.`
    };
  }

  return {
    status: 'offpeak',
    badge: '🔵 Off-Peak Travel Window',
    color: '#6366f1',
    explanation: `Best for budget travelers, low tourism density, and special seasonal sights.`
  };
}
