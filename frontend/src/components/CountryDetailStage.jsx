import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Landmark, 
  Coins, 
  Compass, 
  Languages, 
  CalendarDays, 
  CloudSun, 
  Sparkles,
  Award,
  Globe2,
  Volume2,
  VolumeX,
  Music,
  Square,
  Thermometer,
  Wind,
  Droplets,
  Scale,
  ArrowRightLeft,
  Wallet,
  Check
} from 'lucide-react';
import { fetchLiveWeather, calculateSeasonStatus } from '../services/weatherService';
import { 
  convertCurrency, 
  SOURCE_CURRENCIES, 
  extractCurrencyCode, 
  estimateTravelCosts 
} from '../services/currencyService';
import { speakPronunciation, playCeremonialAnthem, stopAnthemMusic } from '../services/audioService';
import VisaCheckerWidget from './VisaCheckerWidget';
import TravelKitWidget from './TravelKitWidget';
import TravelPhrasebookWidget from './TravelPhrasebookWidget';
import TripGeneratorWidget from './TripGeneratorWidget';
import TimezoneClockWidget from './TimezoneClockWidget';
import PackingChecklistWidget from './PackingChecklistWidget';
import LiveWebcamWidget from './LiveWebcamWidget';
import EmergencySOSWidget from './EmergencySOSWidget';
import CulturalEtiquetteWidget from './CulturalEtiquetteWidget';
import FlightHubsWidget from './FlightHubsWidget';
import TripBudgetEstimatorWidget from './TripBudgetEstimatorWidget';

export default function CountryDetailStage({ country, onOpenCompare, onAddMultipleToItinerary }) {
  if (!country) return null;

  // Audio State
  const [isPlayingAnthem, setIsPlayingAnthem] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Weather State
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [tempUnit, setTempUnit] = useState('C'); // 'C' | 'F'

  // Currency Converter State
  const [convertAmount, setConvertAmount] = useState(100);
  const [sourceCurrency, setSourceCurrency] = useState('USD');

  // Load Live Weather when country changes
  useEffect(() => {
    let isMounted = true;
    setWeatherLoading(true);
    fetchLiveWeather(country).then(data => {
      if (isMounted) {
        setWeatherData(data);
        setWeatherLoading(false);
      }
    });
    return () => {
      isMounted = false;
      stopAnthemMusic();
      setIsPlayingAnthem(false);
    };
  }, [country]);

  // Audio Pronunciation
  const handlePronounce = () => {
    setIsSpeaking(true);
    speakPronunciation(country.name, () => setIsSpeaking(false));
  };

  // National Anthem Fanfare Toggle
  const handleToggleAnthem = () => {
    if (isPlayingAnthem) {
      stopAnthemMusic();
      setIsPlayingAnthem(false);
    } else {
      setIsPlayingAnthem(true);
      playCeremonialAnthem(country.name, () => {
        setIsPlayingAnthem(false);
      });
    }
  };

  // Currency calculations
  const targetCurrencyCode = extractCurrencyCode(country.currency);
  const conversionResult = convertCurrency(convertAmount, sourceCurrency, targetCurrencyCode);
  const budgetEstimates = estimateTravelCosts(country);
  const seasonInfo = calculateSeasonStatus(country.bestTimeToVisit);

  return (
    <section className="country-detail-container glass-panel animate-fade-in" id="active-country-detail-stage">
      {/* Country Header Title Banner */}
      <div className="country-banner-header">
        <div className="banner-titles">
          <div className="code-pill">
            <span className="dot-pulse"></span>
            <span>{country.code} • {country.region}</span>
          </div>

          <div className="headline-audio-row">
            <h1 className="country-headline">{country.name}</h1>

            {/* Audio Pronunciation Button */}
            <button 
              type="button"
              onClick={handlePronounce}
              className={`btn-audio-pronounce ${isSpeaking ? 'active' : ''}`}
              title={`Listen to pronunciation of ${country.name}`}
              id="btn-pronounce-country"
            >
              <Volume2 size={18} className={isSpeaking ? 'speak-pulse' : ''} />
              <span>Pronounce</span>
            </button>

            {/* National Anthem Ceremonial Preview */}
            <button 
              type="button"
              onClick={handleToggleAnthem}
              className={`btn-anthem-play ${isPlayingAnthem ? 'playing' : ''}`}
              title={isPlayingAnthem ? 'Stop Anthem Fanfare' : `Play ${country.name} National Anthem Fanfare`}
              id="btn-play-anthem"
            >
              {isPlayingAnthem ? <Square size={14} /> : <Music size={16} />}
              <span>{isPlayingAnthem ? 'Stop Anthem' : 'Anthem Fanfare'}</span>
            </button>
          </div>

          <p className="country-native-title">{country.officialName}</p>
        </div>

        <div className="banner-actions-right">
          {onOpenCompare && (
            <button 
              type="button"
              onClick={() => onOpenCompare(country)}
              className="btn-compare-country"
              title="Compare this country side-by-side with other nations"
              id="btn-compare-with-another"
            >
              <Scale size={16} />
              <span>Compare Nation</span>
            </button>
          )}

          <div className="banner-badge">
            <Globe2 size={18} className="banner-badge-icon" />
            <span>Active Registry</span>
          </div>
        </div>
      </div>

      {/* Live Dual Timezone Clock & Daylight Hours Indicator */}
      <TimezoneClockWidget country={country} />

      {/* Main Split Section: Left Flag, Right Essential Information */}
      <div className="stage-split-grid">
        {/* LEFT SIDE: Country Flag & Visual Identity */}
        <div className="stage-left-flag-col">
          <div className="flag-hero-card">
            <div className="flag-image-frame">
              <img 
                src={country.flagSvg || country.flag} 
                alt={`${country.name} National Flag`} 
                className="flag-hero-img"
                referrerPolicy="no-referrer"
              />
              <div className="flag-overlay-shine"></div>
            </div>

            <div className="flag-caption-box">
              <div className="flag-caption-row">
                <span className="flag-label">Official Flag of</span>
                <span className="flag-country-name">{country.name}</span>
              </div>
              <div className="flag-tags">
                <span className="mini-tag">ISO {country.code}</span>
                <span className="mini-tag">{country.capital}</span>
                <span className="mini-tag">{country.currency?.split(' ')[0] || 'Currency'}</span>
              </div>
            </div>

            {country.description && (
              <div className="country-desc-box">
                <p className="country-desc-text">"{country.description}"</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: All Essential Information */}
        <div className="stage-right-stats-col">
          <div className="stats-section-header">
            <div className="stats-header-line">
              <Sparkles size={16} className="sparkle-icon" />
              <h2>Essential Country Intelligence</h2>
            </div>
            <p className="stats-subtitle">Key demographic, macroeconomic, and travel benchmarks</p>
          </div>

          <div className="essential-stats-grid">
            {/* 1. Population */}
            <div className="stat-card">
              <div className="stat-icon-wrap stat-icon-blue">
                <Users size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-label">Total Population</span>
                <span className="stat-value">{country.population}</span>
                <span className="stat-subtext">Demographic scale</span>
              </div>
            </div>

            {/* 2. Gross Domestic Product (GDP) */}
            <div className="stat-card">
              <div className="stat-icon-wrap stat-icon-emerald">
                <TrendingUp size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-label">GDP (Nominal)</span>
                <span className="stat-value">{country.gdp}</span>
                <span className="stat-subtext">National economic output</span>
              </div>
            </div>

            {/* 3. Per Capita Income */}
            <div className="stat-card">
              <div className="stat-icon-wrap stat-icon-gold">
                <DollarSign size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-label">Per Capita Income</span>
                <span className="stat-value">{country.perCapitaIncome}</span>
                <span className="stat-subtext">Avg annual individual income</span>
              </div>
            </div>

            {/* 4. Capital City */}
            <div className="stat-card">
              <div className="stat-icon-wrap stat-icon-indigo">
                <Landmark size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-label">Capital City</span>
                <span className="stat-value">{country.capital}</span>
                <span className="stat-subtext">Administrative & cultural heart</span>
              </div>
            </div>

            {/* 5. Currency */}
            <div className="stat-card">
              <div className="stat-icon-wrap stat-icon-cyan">
                <Coins size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-label">Currency</span>
                <span className="stat-value">{country.currency}</span>
                <span className="stat-subtext">Legal tender & code</span>
              </div>
            </div>

            {/* 6. Region / Continent */}
            <div className="stat-card">
              <div className="stat-icon-wrap stat-icon-rose">
                <Compass size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-label">Geographic Region</span>
                <span className="stat-value">{country.region}</span>
                <span className="stat-subtext">Global continental zone</span>
              </div>
            </div>

            {/* 7. Languages */}
            <div className="stat-card stat-card-wide">
              <div className="stat-icon-wrap stat-icon-purple">
                <Languages size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-label">Official Languages</span>
                <span className="stat-value">{country.languages || 'Official National Language'}</span>
                <span className="stat-subtext">Primary spoken tongues</span>
              </div>
            </div>

            {/* 8. Best Time to Visit */}
            <div className="stat-card stat-card-wide">
              <div className="stat-icon-wrap stat-icon-amber">
                <CalendarDays size={20} />
              </div>
              <div className="stat-content">
                <span className="stat-label">Best Time to Visit & Climate</span>
                <span className="stat-value stat-value-highlight">{country.bestTimeToVisit}</span>
                <span className="stat-subtext">{country.climate || 'Favorable travel seasons'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW SECTION: Live Weather & Travel Intelligence + Currency Converter & Cost of Living */}
      <div className="travel-utility-grid">
        {/* Card A: Live Capital Weather & Season Status */}
        <div className="utility-card weather-card">
          <div className="utility-card-header">
            <div className="u-title-group">
              <CloudSun size={18} className="text-cyan" />
              <h3>Live Capital Climate & Travel Season</h3>
            </div>
            <div className="temp-unit-toggle">
              <button 
                type="button" 
                className={`unit-btn ${tempUnit === 'C' ? 'active' : ''}`}
                onClick={() => setTempUnit('C')}
              >
                °C
              </button>
              <button 
                type="button" 
                className={`unit-btn ${tempUnit === 'F' ? 'active' : ''}`}
                onClick={() => setTempUnit('F')}
              >
                °F
              </button>
            </div>
          </div>

          <div className="weather-display-row">
            <div className="weather-hero-block">
              <span className="weather-icon-large">{weatherData?.icon || '🌤️'}</span>
              <div className="weather-temp-group">
                <span className="weather-temp-value">
                  {weatherLoading ? '...' : (tempUnit === 'C' ? `${weatherData?.tempC}°C` : `${weatherData?.tempF}°F`)}
                </span>
                <span className="weather-cond-name">{weatherData?.label || 'Pleasant'}</span>
              </div>
            </div>

            <div className="weather-sub-specs">
              <div className="w-spec-pill">
                <Landmark size={12} />
                <span>{country.capital || 'Capital'}</span>
              </div>
              <div className="w-spec-pill">
                <Droplets size={12} />
                <span>Humidity: {weatherData?.humidity ?? 45}%</span>
              </div>
              <div className="w-spec-pill">
                <Wind size={12} />
                <span>Wind: {weatherData?.windSpeed ?? 12} km/h</span>
              </div>
            </div>
          </div>

          {/* Peak Season Indicator Pill */}
          <div className="season-indicator-box" style={{ borderColor: seasonInfo.color }}>
            <div className="season-badge-line">
              <span className="season-badge-tag" style={{ color: seasonInfo.color }}>
                {seasonInfo.badge}
              </span>
            </div>
            <p className="season-explanation">{seasonInfo.explanation}</p>
          </div>
        </div>

        {/* Card B: Live Currency Converter & Cost of Living Estimator */}
        <div className="utility-card currency-card">
          <div className="utility-card-header">
            <div className="u-title-group">
              <ArrowRightLeft size={18} className="text-gold" />
              <h3>Live Currency Converter & Budget Meter</h3>
            </div>
            <span className="target-code-tag">{targetCurrencyCode}</span>
          </div>

          {/* Quick Input Row */}
          <div className="currency-converter-bar">
            <div className="conv-input-group">
              <label>Amount</label>
              <input 
                type="number"
                min="1"
                value={convertAmount}
                onChange={(e) => setConvertAmount(Math.max(1, parseFloat(e.target.value) || 0))}
                className="conv-input"
              />
            </div>

            <div className="conv-input-group">
              <label>From</label>
              <select 
                value={sourceCurrency}
                onChange={(e) => setSourceCurrency(e.target.value)}
                className="conv-select"
              >
                {SOURCE_CURRENCIES.map(curr => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} ({curr.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div className="conv-result-group">
              <label>Converts To ({country.name})</label>
              <div className="conv-result-display">
                ≈ {conversionResult.toAmount.toLocaleString(undefined, { maximumFractionDigits: 1 })} {targetCurrencyCode}
              </div>
            </div>
          </div>

          {/* Cost of Living / Daily Budget Estimator */}
          {budgetEstimates && (
            <div className="budget-tier-container">
              <div className="budget-header-row">
                <span className="budget-header-title">
                  <Wallet size={13} /> Estimated Daily Traveler Budget
                </span>
                <span className="budget-tier-badge">{budgetEstimates.tierLabel}</span>
              </div>

              <div className="budget-tiers-grid">
                {budgetEstimates.tiers.map((tier) => (
                  <div key={tier.name} className="budget-tier-pill">
                    <div className="tier-top">
                      <span className="tier-icon">{tier.icon}</span>
                      <span className="tier-cost">${tier.usdPerDay} <small>/ day</small></span>
                    </div>
                    <span className="tier-label">{tier.name.split('/')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Live 24/7 Webcams & EarthCam Streamer */}
      <LiveWebcamWidget country={country} />

      {/* Comprehensive Trip Cost & Daily Budget Estimator */}
      <TripBudgetEstimatorWidget country={country} />

      {/* International Gateway Flight Hubs & Transit Estimator */}
      <FlightHubsWidget country={country} />

      {/* Cultural Etiquette, Tipping Customs & Plug Socket Guide */}
      <CulturalEtiquetteWidget country={country} />

      {/* Local Emergency Hotlines & Embassy SOS Directory */}
      <EmergencySOSWidget country={country} />

      {/* Smart Visa & Entry Requirements Checker */}
      <VisaCheckerWidget country={country} />

      {/* Practical Travel Kit: Sockets, Voltage, Driving & Emergency Numbers */}
      <TravelKitWidget country={country} />

      {/* Essential Local Travel Phrasebook with Audio */}
      <TravelPhrasebookWidget country={country} />

      {/* TerraVoyage AI Day-by-Day Smart Itinerary Generator */}
      <TripGeneratorWidget 
        country={country} 
        onAddMultipleToItinerary={onAddMultipleToItinerary} 
      />

      {/* Climate-Aware Packing Checklist Generator */}
      <PackingChecklistWidget country={country} />

      <style>{`
        .country-detail-container {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          box-shadow: var(--shadow-lg);
          border: 1px solid rgba(99, 102, 241, 0.2);
          position: relative;
          overflow: hidden;
        }
        .country-detail-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #6366f1, #38bdf8, #f59e0b, #10b981);
        }
        .country-banner-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 1.5rem;
        }
        .banner-titles {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .headline-audio-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .code-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 700;
          color: #38bdf8;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .dot-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 8px #38bdf8;
          animation: pulseGlow 2s infinite ease-in-out;
        }
        .country-headline {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0;
        }
        .btn-audio-pronounce, .btn-anthem-play {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.42rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .btn-audio-pronounce {
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.35);
          color: #38bdf8;
        }
        .btn-audio-pronounce:hover, .btn-audio-pronounce.active {
          background: #38bdf8;
          color: #000000;
          transform: translateY(-1px);
        }
        .btn-anthem-play {
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.35);
          color: #f59e0b;
        }
        .btn-anthem-play:hover {
          background: #f59e0b;
          color: #000000;
          transform: translateY(-1px);
        }
        .btn-anthem-play.playing {
          background: #f59e0b;
          color: #000000;
          box-shadow: 0 0 14px rgba(245, 158, 11, 0.5);
          animation: pulseAnthem 1.2s infinite;
        }
        @keyframes pulseAnthem {
          0% { box-shadow: 0 0 4px rgba(245, 158, 11, 0.4); }
          50% { box-shadow: 0 0 16px rgba(245, 158, 11, 0.8); }
          100% { box-shadow: 0 0 4px rgba(245, 158, 11, 0.4); }
        }
        .country-native-title {
          font-size: 1rem;
          color: var(--text-muted);
          font-style: italic;
          margin: 0.1rem 0 0 0;
        }
        .banner-actions-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .btn-compare-country {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.5rem 1rem;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.18), rgba(56, 189, 248, 0.18));
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-full);
          color: var(--text-primary);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .btn-compare-country:hover {
          background: var(--accent-primary);
          color: #ffffff;
          transform: translateY(-1px);
        }
        .banner-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 0.95rem;
          border-radius: var(--radius-full);
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: #818cf8;
          font-size: 0.82rem;
          font-weight: 600;
        }
        .banner-badge-icon {
          color: #38bdf8;
        }
        .stage-split-grid {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 2.25rem;
          align-items: stretch;
        }
        @media (max-width: 1024px) {
          .stage-split-grid {
            grid-template-columns: 1fr;
          }
        }
        .flag-hero-card {
          display: flex;
          flex-direction: column;
          background: var(--bg-card);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
          overflow: hidden;
          height: 100%;
        }
        .flag-image-frame {
          position: relative;
          width: 100%;
          height: 230px;
          background: #080c14;
          overflow: hidden;
        }
        .flag-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .flag-overlay-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(0, 0, 0, 0.4) 100%);
          pointer-events: none;
        }
        .flag-caption-box {
          padding: 1rem 1.25rem;
          background: var(--bg-card);
          border-top: 1px solid var(--border-subtle);
        }
        .flag-caption-row {
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
        }
        .flag-label {
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .flag-country-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-highlight);
        }
        .flag-tags {
          display: flex;
          gap: 0.4rem;
          margin-top: 0.6rem;
          flex-wrap: wrap;
        }
        .mini-tag {
          font-size: 0.72rem;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          border: 1px solid var(--border-subtle);
        }
        .country-desc-box {
          padding: 1.1rem 1.25rem;
          border-top: 1px solid var(--border-subtle);
          background: rgba(0, 0, 0, 0.15);
          flex: 1;
        }
        .country-desc-text {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
          font-style: italic;
        }
        .stage-right-stats-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .stats-section-header {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .stats-header-line {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .sparkle-icon {
          color: #f59e0b;
        }
        .stats-section-header h2 {
          font-size: 1.35rem;
          font-weight: 800;
          margin: 0;
        }
        .stats-subtitle {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin: 0;
        }
        .essential-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .essential-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 500px) {
          .essential-stats-grid {
            grid-template-columns: 1fr;
          }
        }
        .stat-card {
          display: flex;
          gap: 0.85rem;
          padding: 1rem;
          background: var(--bg-card);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
          transition: transform 0.2s, border-color 0.2s;
        }
        .stat-card:hover {
          border-color: var(--border-accent);
          transform: translateY(-2px);
        }
        .stat-card-wide {
          grid-column: span 3;
        }
        @media (max-width: 768px) {
          .stat-card-wide {
            grid-column: span 2;
          }
        }
        @media (max-width: 500px) {
          .stat-card-wide {
            grid-column: span 1;
          }
        }
        .stat-icon-wrap {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .stat-icon-blue { background: rgba(56, 189, 248, 0.12); color: #38bdf8; }
        .stat-icon-emerald { background: rgba(16, 185, 129, 0.12); color: #10b981; }
        .stat-icon-gold { background: rgba(245, 158, 11, 0.12); color: #f59e0b; }
        .stat-icon-indigo { background: rgba(99, 102, 241, 0.12); color: #818cf8; }
        .stat-icon-cyan { background: rgba(6, 182, 212, 0.12); color: #06b6d4; }
        .stat-icon-rose { background: rgba(244, 63, 94, 0.12); color: #f43f5e; }
        .stat-icon-purple { background: rgba(168, 85, 247, 0.12); color: #c084fc; }
        .stat-icon-amber { background: rgba(251, 146, 60, 0.12); color: #fb923c; }

        .stat-content {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          min-width: 0;
        }
        .stat-label {
          font-size: 0.74rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          font-weight: 600;
        }
        .stat-value {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .stat-value-highlight {
          color: #38bdf8;
          white-space: normal;
        }
        .stat-subtext {
          font-size: 0.72rem;
          color: var(--text-secondary);
        }

        /* Travel Utility Row (Weather & Currency) */
        .travel-utility-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 900px) {
          .travel-utility-grid {
            grid-template-columns: 1fr;
          }
        }
        .utility-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.35rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .utility-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .u-title-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .u-title-group h3 {
          font-size: 1.02rem;
          font-weight: 700;
          margin: 0;
        }
        .text-cyan { color: #38bdf8; }
        .text-gold { color: #f59e0b; }

        .temp-unit-toggle {
          display: flex;
          background: rgba(0, 0, 0, 0.3);
          border-radius: var(--radius-full);
          padding: 2px;
          border: 1px solid var(--border-subtle);
        }
        .unit-btn {
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          font-weight: 700;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }
        .unit-btn.active {
          background: var(--accent-primary);
          color: #ffffff;
        }

        .weather-display-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.2);
          border-radius: var(--radius-sm);
          padding: 0.95rem 1.15rem;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .weather-hero-block {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .weather-icon-large {
          font-size: 2.2rem;
        }
        .weather-temp-group {
          display: flex;
          flex-direction: column;
        }
        .weather-temp-value {
          font-size: 1.55rem;
          font-weight: 800;
          font-family: var(--font-mono);
          color: var(--text-highlight);
        }
        .weather-cond-name {
          font-size: 0.82rem;
          color: var(--text-secondary);
        }
        .weather-sub-specs {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .w-spec-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.76rem;
          color: var(--text-muted);
        }
        .season-indicator-box {
          padding: 0.75rem 1rem;
          background: rgba(0, 0, 0, 0.18);
          border-left: 3px solid #10b981;
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .season-badge-tag {
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.02em;
        }
        .season-explanation {
          font-size: 0.78rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .target-code-tag {
          font-size: 0.75rem;
          font-family: var(--font-mono);
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
          background: rgba(245, 158, 11, 0.15);
          color: #f59e0b;
          border: 1px solid rgba(245, 158, 11, 0.3);
          font-weight: 700;
        }
        .currency-converter-bar {
          display: grid;
          grid-template-columns: 1fr 1fr 1.5fr;
          gap: 0.75rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: var(--radius-sm);
          padding: 0.85rem;
        }
        @media (max-width: 600px) {
          .currency-converter-bar {
            grid-template-columns: 1fr;
          }
        }
        .conv-input-group, .conv-result-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .conv-input-group label, .conv-result-group label {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 600;
        }
        .conv-input, .conv-select {
          background: var(--bg-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          padding: 0.4rem 0.65rem;
          font-size: 0.88rem;
          font-weight: 700;
          outline: none;
        }
        .conv-input:focus, .conv-select:focus {
          border-color: var(--accent-primary);
        }
        .conv-result-display {
          font-family: var(--font-mono);
          font-size: 0.95rem;
          font-weight: 800;
          color: #10b981;
          padding: 0.4rem 0;
        }
        .budget-tier-container {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }
        .budget-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.78rem;
        }
        .budget-header-title {
          color: var(--text-muted);
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 600;
        }
        .budget-tier-badge {
          color: #38bdf8;
          font-weight: 700;
        }
        .budget-tiers-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.6rem;
        }
        .budget-tier-pill {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 0.55rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          text-align: center;
        }
        .tier-top {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
        }
        .tier-cost {
          font-size: 0.88rem;
          font-weight: 800;
          font-family: var(--font-mono);
          color: var(--text-highlight);
        }
        .tier-cost small {
          font-size: 0.65rem;
          color: var(--text-muted);
          font-weight: 400;
        }
        .tier-label {
          font-size: 0.7rem;
          color: var(--text-secondary);
        }
      `}</style>
    </section>
  );
}
