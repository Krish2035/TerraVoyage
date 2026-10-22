import React from 'react';
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
  Globe2
} from 'lucide-react';

export default function CountryDetailStage({ country }) {
  if (!country) return null;

  return (
    <section className="country-detail-container glass-panel animate-fade-in" id="active-country-detail-stage">
      {/* Country Header Title Banner */}
      <div className="country-banner-header">
        <div className="banner-titles">
          <div className="code-pill">
            <span className="dot-pulse"></span>
            <span>{country.code} • {country.region}</span>
          </div>
          <h1 className="country-headline">{country.name}</h1>
          <p className="country-native-title">{country.officialName}</p>
        </div>

        <div className="banner-badge">
          <Globe2 size={18} className="banner-badge-icon" />
          <span>Active Registry</span>
        </div>
      </div>

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

        {/* RIGHT SIDE: All Essential Information (5-6+ Key Fields) */}
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
                <span className="stat-subtext">Legal tender & exchange code</span>
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
          gap: 1rem;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 1.5rem;
        }
        .banner-titles {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
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
        }
        .country-native-title {
          font-size: 1rem;
          color: var(--text-muted);
          font-style: italic;
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
          grid-template-columns: 420px 1fr;
          gap: 2.5rem;
          align-items: start;
        }
        @media (max-width: 1024px) {
          .stage-split-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        /* LEFT SIDE: Flag */
        .stage-left-flag-col {
          display: flex;
          flex-direction: column;
        }
        .flag-hero-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-shadow: var(--shadow-md);
          position: sticky;
          top: 5.5rem;
        }
        .flag-image-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 2;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #000;
          border: 2px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
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
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          pointer-events: none;
        }
        .flag-caption-box {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .flag-caption-row {
          display: flex;
          flex-direction: column;
        }
        .flag-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .flag-country-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .flag-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .mini-tag {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
        }
        .country-desc-box {
          padding: 0.9rem 1rem;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.03);
          border-left: 3px solid var(--accent-primary);
        }
        .country-desc-text {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* RIGHT SIDE: Essential Stats */
        .stage-right-stats-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
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
        .stats-header-line h2 {
          font-size: 1.35rem;
          font-weight: 700;
        }
        .sparkle-icon {
          color: var(--accent-gold);
        }
        .stats-subtitle {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .essential-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (max-width: 640px) {
          .essential-stats-grid {
            grid-template-columns: 1fr;
          }
        }
        .stat-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.15rem;
          display: flex;
          gap: 1rem;
          align-items: center;
          transition: var(--transition-normal);
        }
        .stat-card:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-accent);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        .stat-card-wide {
          grid-column: 1 / -1;
        }
        .stat-icon-wrap {
          width: 48px;
          height: 48px;
          min-width: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .stat-icon-blue {
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
        }
        .stat-icon-emerald {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
        }
        .stat-icon-gold {
          background: rgba(245, 158, 11, 0.15);
          color: #f59e0b;
        }
        .stat-icon-indigo {
          background: rgba(99, 102, 241, 0.15);
          color: #818cf8;
        }
        .stat-icon-cyan {
          background: rgba(6, 182, 212, 0.15);
          color: #06b6d4;
        }
        .stat-icon-rose {
          background: rgba(244, 63, 94, 0.15);
          color: #f43f5e;
        }
        .stat-icon-purple {
          background: rgba(168, 85, 247, 0.15);
          color: #c084fc;
        }
        .stat-icon-amber {
          background: rgba(251, 146, 60, 0.15);
          color: #fb923c;
        }
        .stat-content {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          min-width: 0;
        }
        .stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-weight: 600;
        }
        .stat-value {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
        }
        .stat-value-highlight {
          font-size: 1.05rem;
          color: #38bdf8;
        }
        .stat-subtext {
          font-size: 0.72rem;
          color: var(--text-secondary);
        }
      `}</style>
    </section>
  );
}
