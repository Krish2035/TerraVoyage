import React, { useState, useEffect } from 'react';
import { 
  X, 
  Scale, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Landmark, 
  Globe2, 
  CalendarDays, 
  Compass, 
  Coins, 
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';

export default function CompareNationsModal({
  isOpen,
  onClose,
  countries = [],
  initialCountry = null,
  onSelectCountry
}) {
  const [slotA, setSlotA] = useState('');
  const [slotB, setSlotB] = useState('');
  const [slotC, setSlotC] = useState('');

  // Initialize slots
  useEffect(() => {
    if (isOpen && countries.length > 0) {
      if (initialCountry) {
        setSlotA(initialCountry.id);
        // Pick another interesting country
        const other = countries.find(c => c.id !== initialCountry.id);
        if (other) setSlotB(other.id);
      } else {
        if (countries[0]) setSlotA(countries[0].id);
        if (countries[1]) setSlotB(countries[1].id);
      }
    }
  }, [isOpen, initialCountry, countries]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const countryA = countries.find(c => c.id === slotA) || null;
  const countryB = countries.find(c => c.id === slotB) || null;
  const countryC = countries.find(c => c.id === slotC) || null;

  const activeCountries = [countryA, countryB, countryC].filter(Boolean);

  // Helper to parse income for relative bar comparisons
  const getIncomeVal = (c) => {
    if (!c?.perCapitaIncome) return 0;
    const clean = c.perCapitaIncome.replace(/[^0-9]/g, '');
    return parseInt(clean, 10) || 0;
  };

  const highestIncome = Math.max(...activeCountries.map(getIncomeVal), 1);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="compare-modal-card glass-panel animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        id="compare-nations-modal"
      >
        {/* Header */}
        <div className="compare-header">
          <div className="compare-header-left">
            <div className="compare-badge">
              <Scale size={16} />
              <span>Side-by-Side Intelligence Engine</span>
            </div>
            <h2 className="compare-title">Compare Nations of the World</h2>
          </div>
          <button 
            onClick={onClose} 
            className="modal-close-btn"
            id="btn-close-compare"
            aria-label="Close Comparison"
          >
            <X size={20} />
          </button>
        </div>

        {/* Country Slot Selectors */}
        <div className="slot-selector-row">
          <div className="slot-select-box">
            <span className="slot-label">Country 1:</span>
            <select 
              value={slotA} 
              onChange={(e) => setSlotA(e.target.value)}
              className="slot-select"
            >
              {countries.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
              ))}
            </select>
          </div>

          <div className="slot-select-box">
            <span className="slot-label">Country 2:</span>
            <select 
              value={slotB} 
              onChange={(e) => setSlotB(e.target.value)}
              className="slot-select"
            >
              {countries.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
              ))}
            </select>
          </div>

          <div className="slot-select-box">
            <span className="slot-label">Country 3 (Optional):</span>
            <select 
              value={slotC} 
              onChange={(e) => setSlotC(e.target.value)}
              className="slot-select"
            >
              <option value="">-- None --</option>
              {countries.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="compare-matrix-scroll">
          <div className={`compare-columns-grid cols-${activeCountries.length}`}>
            {activeCountries.map((country, idx) => {
              const income = getIncomeVal(country);
              const incomePercent = Math.round((income / highestIncome) * 100);
              const attractions = country.attractions || [];

              return (
                <div key={country.id || idx} className="compare-country-col glass-panel">
                  {/* Hero Banner */}
                  <div className="col-hero">
                    <img 
                      src={country.flagSvg || country.flag} 
                      alt={country.name}
                      className="col-flag"
                    />
                    <div className="col-titles">
                      <span className="col-code-pill">{country.code} • {country.region}</span>
                      <h3 className="col-name">{country.name}</h3>
                      <span className="col-native">{country.officialName}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectCountry(country);
                      }}
                      className="btn-view-profile"
                    >
                      <span>Explore Country</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  {/* Benchmark Metrics Cards */}
                  <div className="metrics-stack">
                    {/* GDP Nominal */}
                    <div className="metric-row">
                      <div className="metric-icon-wrap">
                        <TrendingUp size={16} color="#10b981" />
                      </div>
                      <div className="metric-data">
                        <span className="m-label">GDP (Nominal)</span>
                        <strong className="m-val">{country.gdp || 'N/A'}</strong>
                      </div>
                    </div>

                    {/* Per Capita */}
                    <div className="metric-row">
                      <div className="metric-icon-wrap">
                        <DollarSign size={16} color="#f59e0b" />
                      </div>
                      <div className="metric-data">
                        <span className="m-label">Per Capita Income</span>
                        <strong className="m-val">{country.perCapitaIncome || 'N/A'}</strong>
                        <div className="metric-bar-bg">
                          <div 
                            className="metric-bar-fill" 
                            style={{ width: `${Math.max(incomePercent, 8)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Population */}
                    <div className="metric-row">
                      <div className="metric-icon-wrap">
                        <Users size={16} color="#38bdf8" />
                      </div>
                      <div className="metric-data">
                        <span className="m-label">Total Population</span>
                        <strong className="m-val">{country.population || 'N/A'}</strong>
                      </div>
                    </div>

                    {/* Capital City */}
                    <div className="metric-row">
                      <div className="metric-icon-wrap">
                        <Landmark size={16} color="#a855f7" />
                      </div>
                      <div className="metric-data">
                        <span className="m-label">Capital City</span>
                        <strong className="m-val">{country.capital || 'N/A'}</strong>
                      </div>
                    </div>

                    {/* Currency */}
                    <div className="metric-row">
                      <div className="metric-icon-wrap">
                        <Coins size={16} color="#06b6d4" />
                      </div>
                      <div className="metric-data">
                        <span className="m-label">Currency</span>
                        <strong className="m-val">{country.currency || 'N/A'}</strong>
                      </div>
                    </div>

                    {/* Best Time to Visit */}
                    <div className="metric-row">
                      <div className="metric-icon-wrap">
                        <CalendarDays size={16} color="#f43f5e" />
                      </div>
                      <div className="metric-data">
                        <span className="m-label">Best Time to Visit</span>
                        <strong className="m-val m-val-highlight">{country.bestTimeToVisit || 'Year-round'}</strong>
                        {country.climate && <span className="m-sub">{country.climate}</span>}
                      </div>
                    </div>

                    {/* Attractions Count & Highlights */}
                    <div className="metric-row">
                      <div className="metric-icon-wrap">
                        <Award size={16} color="#ec4899" />
                      </div>
                      <div className="metric-data">
                        <span className="m-label">Top Attractions ({attractions.length})</span>
                        <div className="attraction-pills-list">
                          {attractions.slice(0, 3).map((a, i) => (
                            <span key={i} className="attr-pill-micro">
                              {a.name}
                            </span>
                          ))}
                          {attractions.length > 3 && (
                            <span className="attr-pill-more">+{attractions.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <style>{`
          .compare-modal-card {
            width: 95%;
            max-width: 1100px;
            max-height: 90vh;
            background: var(--bg-secondary);
            border: 1px solid var(--border-accent);
            border-radius: var(--radius-lg);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85);
          }
          .compare-header {
            padding: 1.25rem 1.75rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--border-subtle);
            background: rgba(18, 24, 38, 0.6);
          }
          .compare-header-left {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }
          .compare-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.75rem;
            color: #38bdf8;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .compare-title {
            font-size: 1.4rem;
            font-weight: 800;
          }
          .slot-selector-row {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 1.75rem;
            background: rgba(0, 0, 0, 0.2);
            border-bottom: 1px solid var(--border-subtle);
            flex-wrap: wrap;
          }
          .slot-select-box {
            flex: 1;
            min-width: 220px;
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
          }
          .slot-label {
            font-size: 0.72rem;
            color: var(--text-muted);
            text-transform: uppercase;
            font-weight: 700;
          }
          .slot-select {
            background: var(--bg-card);
            border: 1px solid var(--border-subtle);
            color: var(--text-primary);
            padding: 0.5rem 0.75rem;
            border-radius: var(--radius-sm);
            font-size: 0.88rem;
            font-weight: 600;
            cursor: pointer;
          }
          .slot-select option {
            background: var(--bg-secondary);
            color: var(--text-primary);
          }
          .compare-matrix-scroll {
            flex: 1;
            overflow-y: auto;
            padding: 1.5rem 1.75rem;
          }
          .compare-columns-grid {
            display: grid;
            gap: 1.25rem;
          }
          .compare-columns-grid.cols-2 {
            grid-template-columns: repeat(2, 1fr);
          }
          .compare-columns-grid.cols-3 {
            grid-template-columns: repeat(3, 1fr);
          }
          @media (max-width: 768px) {
            .compare-columns-grid.cols-2, .compare-columns-grid.cols-3 {
              grid-template-columns: 1fr;
            }
          }
          .compare-country-col {
            padding: 1.25rem;
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            background: rgba(18, 24, 38, 0.5);
          }
          .col-hero {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 0.6rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border-subtle);
          }
          .col-flag {
            width: 90px;
            height: 60px;
            object-fit: cover;
            border-radius: var(--radius-sm);
            border: 1px solid var(--border-subtle);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
          }
          .col-titles {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
          }
          .col-code-pill {
            font-size: 0.7rem;
            color: #38bdf8;
            font-weight: 700;
            text-transform: uppercase;
          }
          .col-name {
            font-size: 1.3rem;
            font-weight: 800;
          }
          .col-native {
            font-size: 0.78rem;
            color: var(--text-muted);
            font-style: italic;
          }
          .btn-view-profile {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.45rem 0.9rem;
            border-radius: var(--radius-full);
            background: rgba(99, 102, 241, 0.15);
            border: 1px solid var(--border-accent);
            color: var(--text-primary);
            font-size: 0.78rem;
            font-weight: 700;
            transition: var(--transition-fast);
          }
          .btn-view-profile:hover {
            background: var(--accent-primary);
            color: #ffffff;
            transform: translateY(-2px);
          }
          .metrics-stack {
            display: flex;
            flex-direction: column;
            gap: 0.9rem;
          }
          .metric-row {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            padding: 0.65rem 0.85rem;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.04);
            border-radius: var(--radius-sm);
          }
          .metric-icon-wrap {
            padding-top: 0.2rem;
            flex-shrink: 0;
          }
          .metric-data {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.15rem;
            min-width: 0;
          }
          .m-label {
            font-size: 0.7rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }
          .m-val {
            font-size: 0.92rem;
            font-weight: 700;
            color: var(--text-primary);
          }
          .m-val-highlight {
            color: var(--accent-gold);
          }
          .m-sub {
            font-size: 0.72rem;
            color: var(--text-secondary);
          }
          .metric-bar-bg {
            height: 4px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: var(--radius-full);
            margin-top: 0.35rem;
            overflow: hidden;
          }
          .metric-bar-fill {
            height: 100%;
            background: linear-gradient(90deg, #6366f1, #f59e0b);
            border-radius: var(--radius-full);
          }
          .attraction-pills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.35rem;
            margin-top: 0.3rem;
          }
          .attr-pill-micro {
            font-size: 0.68rem;
            background: rgba(99, 102, 241, 0.15);
            color: #38bdf8;
            padding: 0.15rem 0.45rem;
            border-radius: 4px;
            white-space: nowrap;
          }
          .attr-pill-more {
            font-size: 0.68rem;
            color: var(--text-muted);
            align-self: center;
          }
        `}</style>
      </div>
    </div>
  );
}
