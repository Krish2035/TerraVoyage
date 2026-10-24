import React, { useState } from 'react';
import { Wallet, DollarSign, Users, Calendar, Sparkles, Check, Copy, BedDouble, Utensils, Bus, Ticket, PieChart } from 'lucide-react';
import { REGIONAL_BUDGET_FACTORS } from '../services/travelIntelligenceData';
import { convertCurrency, extractCurrencyCode } from '../services/currencyService';

export default function TripBudgetEstimatorWidget({ country }) {
  const [days, setDays] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [tier, setTier] = useState('mid'); // 'budget' | 'mid' | 'luxury'
  const [copied, setCopied] = useState(false);

  if (!country) return null;

  const regionKey = Object.keys(REGIONAL_BUDGET_FACTORS).find(k => (country.region || '').includes(k)) || 'default';
  const factor = REGIONAL_BUDGET_FACTORS[regionKey] || REGIONAL_BUDGET_FACTORS.default;

  const basePerPersonDay = factor[tier] || factor.mid;
  const totalUSD = basePerPersonDay * days * travelers;

  // Breakdown percentages
  const hotelUSD = Math.round(totalUSD * factor.split.hotel);
  const foodUSD = Math.round(totalUSD * factor.split.food);
  const transitUSD = Math.round(totalUSD * factor.split.transport);
  const activitiesUSD = Math.round(totalUSD * factor.split.activities);

  // Convert to local currency
  const targetCode = extractCurrencyCode(country.currency);
  const conv = convertCurrency(totalUSD, 'USD', targetCode);

  const handleCopyBudget = () => {
    const text = `TerraVoyage Trip Budget Estimate for ${country.name}:
- Duration: ${days} days, ${travelers} traveler(s) [${tier.toUpperCase()} style]
- Total Estimated Cost: $${totalUSD.toLocaleString()} USD (${conv.formattedTarget})
- Accommodation: $${hotelUSD.toLocaleString()} USD
- Meals & Dining: $${foodUSD.toLocaleString()} USD
- Local Transport: $${transitUSD.toLocaleString()} USD
- Sightseeing & Tickets: $${activitiesUSD.toLocaleString()} USD`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="utility-card trip-budget-widget glass-panel" id="trip-budget-estimator-widget">
      <div className="utility-card-header">
        <div className="u-title-group">
          <Wallet size={18} className="text-emerald" />
          <h3 className="widget-main-title">
            Comprehensive Trip Cost & Daily Budget Estimator
          </h3>
        </div>
        <button
          type="button"
          onClick={handleCopyBudget}
          className="btn-copy-budget"
          id="btn-copy-budget-plan"
        >
          {copied ? <Check size={13} className="text-emerald" /> : <Copy size={13} />}
          <span>{copied ? 'Budget Copied!' : 'Copy Budget Plan'}</span>
        </button>
      </div>

      {/* Control Sliders & Style Selector */}
      <div className="budget-controls-grid">
        {/* Style Selector */}
        <div className="control-box">
          <span className="ctrl-label">Travel Style:</span>
          <div className="tier-selector-pills">
            <button
              type="button"
              className={`tier-btn ${tier === 'budget' ? 'active' : ''}`}
              onClick={() => setTier('budget')}
              id="tier-btn-budget"
            >
              <span>🎒 Budget</span>
              <small>${factor.budget}/day</small>
            </button>
            <button
              type="button"
              className={`tier-btn ${tier === 'mid' ? 'active' : ''}`}
              onClick={() => setTier('mid')}
              id="tier-btn-mid"
            >
              <span>🏨 Mid-Range</span>
              <small>${factor.mid}/day</small>
            </button>
            <button
              type="button"
              className={`tier-btn ${tier === 'luxury' ? 'active' : ''}`}
              onClick={() => setTier('luxury')}
              id="tier-btn-luxury"
            >
              <span>✨ Luxury</span>
              <small>${factor.luxury}/day</small>
            </button>
          </div>
        </div>

        {/* Days Slider */}
        <div className="control-box">
          <div className="ctrl-top">
            <span className="ctrl-label"><Calendar size={13} /> Trip Length:</span>
            <span className="ctrl-val">{days} Days</span>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="budget-slider"
          />
        </div>

        {/* Travelers Slider */}
        <div className="control-box">
          <div className="ctrl-top">
            <span className="ctrl-label"><Users size={13} /> Travelers:</span>
            <span className="ctrl-val">{travelers} {travelers === 1 ? 'Person' : 'People'}</span>
          </div>
          <input
            type="range"
            min="1"
            max="6"
            value={travelers}
            onChange={(e) => setTravelers(Number(e.target.value))}
            className="budget-slider"
          />
        </div>
      </div>

      {/* Hero Grand Total Display */}
      <div className="budget-grand-total-card">
        <div className="grand-total-left">
          <span className="total-lead">Estimated Total Trip Expenditure:</span>
          <div className="total-price-hero">
            <span className="usd-total">${totalUSD.toLocaleString()} <small>USD</small></span>
            <span className="local-total">≈ {conv.formattedTarget}</span>
          </div>
          <span className="daily-average-note">
            Avg. ${(totalUSD / days).toFixed(0)} USD/day for {travelers} traveler(s)
          </span>
        </div>

        <div className="grand-total-right-breakdown">
          <div className="breakdown-stat-item">
            <div className="b-icon-name">
              <BedDouble size={14} className="text-cyan" />
              <span>Lodging & Hotels:</span>
            </div>
            <span className="b-value">${hotelUSD.toLocaleString()}</span>
          </div>

          <div className="breakdown-stat-item">
            <div className="b-icon-name">
              <Utensils size={14} className="text-gold" />
              <span>Meals & Drinks:</span>
            </div>
            <span className="b-value">${foodUSD.toLocaleString()}</span>
          </div>

          <div className="breakdown-stat-item">
            <div className="b-icon-name">
              <Bus size={14} className="text-purple" />
              <span>Transit & Trains:</span>
            </div>
            <span className="b-value">${transitUSD.toLocaleString()}</span>
          </div>

          <div className="breakdown-stat-item">
            <div className="b-icon-name">
              <Ticket size={14} className="text-emerald" />
              <span>Attraction Admissions:</span>
            </div>
            <span className="b-value">${activitiesUSD.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <style>{`
        .trip-budget-widget {
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          background: rgba(15, 23, 42, 0.65);
          border: 1px solid rgba(16, 185, 129, 0.25);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
        }
        .btn-copy-budget {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.8rem;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-secondary);
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .btn-copy-budget:hover {
          color: var(--text-primary);
          border-color: #10b981;
          background: rgba(16, 185, 129, 0.1);
        }
        .budget-controls-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
        }
        .control-box {
          background: rgba(30, 41, 59, 0.45);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.85rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .ctrl-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ctrl-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .ctrl-val {
          font-size: 0.82rem;
          font-weight: 800;
          color: #38bdf8;
          font-family: var(--font-mono);
        }
        .tier-selector-pills {
          display: flex;
          gap: 0.4rem;
        }
        .tier-btn {
          flex: 1;
          padding: 0.45rem 0.25rem;
          border-radius: var(--radius-sm);
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.15rem;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 700;
          transition: var(--transition-fast);
        }
        .tier-btn small {
          font-size: 0.65rem;
          color: var(--text-muted);
        }
        .tier-btn:hover {
          border-color: var(--border-accent);
          color: var(--text-primary);
        }
        .tier-btn.active {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(5, 150, 105, 0.35));
          border-color: #10b981;
          color: #ffffff;
        }
        .tier-btn.active small {
          color: #a7f3d0;
        }
        .budget-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.1);
          outline: none;
        }
        .budget-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #38bdf8;
          cursor: pointer;
          box-shadow: 0 0 8px #38bdf8;
        }
        .budget-grand-total-card {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          padding: 1.25rem 1.5rem;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(6, 78, 59, 0.25));
          border: 1px solid rgba(16, 185, 129, 0.35);
        }
        .grand-total-left {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          justify-content: center;
        }
        .total-lead {
          font-size: 0.75rem;
          font-weight: 700;
          color: #a7f3d0;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .total-price-hero {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .usd-total {
          font-size: 2rem;
          font-weight: 900;
          color: #ffffff;
          font-family: var(--font-mono);
          letter-spacing: -0.02em;
        }
        .usd-total small {
          font-size: 0.95rem;
          color: #a7f3d0;
        }
        .local-total {
          font-size: 1.05rem;
          font-weight: 700;
          color: #f59e0b;
          font-family: var(--font-mono);
        }
        .daily-average-note {
          font-size: 0.76rem;
          color: var(--text-secondary);
        }
        .grand-total-right-breakdown {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          justify-content: center;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          padding-left: 1.5rem;
        }
        @media (max-width: 640px) {
          .grand-total-right-breakdown {
            border-left: none;
            padding-left: 0;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 1rem;
          }
        }
        .breakdown-stat-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.82rem;
        }
        .b-icon-name {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          color: var(--text-secondary);
        }
        .b-value {
          font-weight: 800;
          color: #ffffff;
          font-family: var(--font-mono);
        }
      `}</style>
    </div>
  );
}
