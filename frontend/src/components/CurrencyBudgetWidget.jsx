import React, { useState, useEffect, useMemo } from 'react';
import { 
  Coins, 
  DollarSign, 
  ArrowRightLeft, 
  Wallet, 
  Sparkles, 
  CreditCard, 
  TrendingUp, 
  HelpCircle,
  CheckCircle,
  Briefcase
} from 'lucide-react';
import { CURRENCY_RATES, extractCurrencyCode } from '../services/worldCoordinates';

const BASE_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }
];

// Helper to calculate daily budget tiers based on country's per capita income
function calculateBudgetTiers(perCapitaStr, region) {
  let annualIncome = 15000; // default baseline
  if (perCapitaStr) {
    const clean = perCapitaStr.replace(/[^0-9]/g, '');
    const parsed = parseInt(clean, 10);
    if (!isNaN(parsed) && parsed > 500) annualIncome = parsed;
  }

  // Cost scale factor relative to $45,000 baseline
  const scale = Math.min(Math.max(annualIncome / 45000, 0.35), 2.4);

  const budget = Math.round(35 * scale);
  const mid = Math.round(110 * scale);
  const luxury = Math.round(320 * scale);

  return {
    budget: Math.max(budget, 18),
    mid: Math.max(mid, 55),
    luxury: Math.max(luxury, 180)
  };
}

export default function CurrencyBudgetWidget({ country }) {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [amount, setAmount] = useState('100');
  const [rates, setRates] = useState(CURRENCY_RATES);
  const [activeTier, setActiveTier] = useState('mid');

  // Identify target currency
  const targetCode = useMemo(() => {
    return extractCurrencyCode(country?.currency);
  }, [country?.currency]);

  // Fetch live exchange rates from Open ER-API (free, reliable, no key required)
  useEffect(() => {
    let isMounted = true;
    const fetchRates = async () => {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!res.ok) throw new Error('Live FX unavailable');
        const data = await res.json();
        if (isMounted && data.rates) {
          setRates(prev => ({ ...prev, ...data.rates }));
        }
      } catch (e) {
        // Fallback to CURRENCY_RATES is already set
      }
    };
    fetchRates();
    return () => { isMounted = false; };
  }, []);

  if (!country) return null;

  // Conversion math
  const numAmount = parseFloat(amount) || 0;
  const baseRate = rates[baseCurrency] || 1;
  const targetRate = rates[targetCode] || 1;
  const convertedValue = (numAmount / baseRate) * targetRate;

  // Format currency output
  const formattedConverted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: targetRate > 500 ? 0 : 2,
    minimumFractionDigits: targetRate > 500 ? 0 : 2
  }).format(convertedValue);

  // Budget calculations
  const budgetTiers = calculateBudgetTiers(country.perCapitaIncome, country.region);

  return (
    <div className="currency-budget-container glass-panel">
      {/* Header */}
      <div className="cb-header-row">
        <div className="cb-title-box">
          <Coins size={18} className="cb-icon" />
          <span className="cb-title">Currency Converter & Daily Traveler Cost of Living</span>
        </div>
        <div className="cb-legal-tender-badge">
          <span>Official: {country.currency || 'National Currency'}</span>
        </div>
      </div>

      <div className="cb-grid">
        {/* LEFT COLUMN: Quick Live Currency Converter */}
        <div className="cb-converter-card">
          <div className="converter-card-header">
            <span className="card-label">Instant Currency Exchange</span>
            <span className="fx-rate-pill">
              1 {baseCurrency} = {(targetRate / baseRate).toFixed(3)} {targetCode}
            </span>
          </div>

          <div className="converter-interactive-row">
            {/* Base Currency Input */}
            <div className="input-group">
              <label className="input-label">You Send / Plan</label>
              <div className="amount-input-wrap">
                <input
                  type="number"
                  min="1"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="amount-input"
                  placeholder="100"
                />
                <select
                  value={baseCurrency}
                  onChange={(e) => setBaseCurrency(e.target.value)}
                  className="currency-select"
                >
                  {BASE_CURRENCIES.map(curr => (
                    <option key={curr.code} value={curr.code}>
                      {curr.code} ({curr.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="swap-icon-wrap">
              <ArrowRightLeft size={16} />
            </div>

            {/* Target Converted Output */}
            <div className="input-group">
              <label className="input-label">Local Value in {country.name}</label>
              <div className="result-display-wrap">
                <span className="result-val">{formattedConverted}</span>
                <span className="target-currency-tag">{targetCode}</span>
              </div>
            </div>
          </div>

          {/* Quick preset amount pills */}
          <div className="quick-presets-row">
            <span className="presets-label">Quick:</span>
            {['50', '100', '250', '500', '1000'].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAmount(preset)}
                className={`preset-pill ${amount === preset ? 'active' : ''}`}
              >
                ${preset}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Cost of Living & Daily Traveler Budget Meter */}
        <div className="cb-budget-meter-card">
          <div className="budget-card-header">
            <div className="budget-title-wrap">
              <Wallet size={16} className="wallet-icon" />
              <span className="card-label">Daily Travel Budget Estimator</span>
            </div>
            <span className="benchmark-text">Based on GDP per capita: {country.perCapitaIncome}</span>
          </div>

          {/* 3 Tier Selector Buttons */}
          <div className="budget-tier-pills">
            <button
              type="button"
              className={`tier-btn ${activeTier === 'budget' ? 'active' : ''}`}
              onClick={() => setActiveTier('budget')}
            >
              <span className="tier-icon">🎒</span>
              <span className="tier-title">Backpacker</span>
              <span className="tier-price">${budgetTiers.budget}/day</span>
            </button>

            <button
              type="button"
              className={`tier-btn ${activeTier === 'mid' ? 'active' : ''}`}
              onClick={() => setActiveTier('mid')}
            >
              <span className="tier-icon">🏨</span>
              <span className="tier-title">Mid-Range</span>
              <span className="tier-price">${budgetTiers.mid}/day</span>
            </button>

            <button
              type="button"
              className={`tier-btn ${activeTier === 'luxury' ? 'active' : ''}`}
              onClick={() => setActiveTier('luxury')}
            >
              <span className="tier-icon">✨</span>
              <span className="tier-title">Luxury</span>
              <span className="tier-price">${budgetTiers.luxury}+/day</span>
            </button>
          </div>

          {/* Detailed breakdown for active tier */}
          <div className="tier-breakdown-box">
            {activeTier === 'budget' && (
              <div className="breakdown-details">
                <p className="breakdown-desc">
                  <strong>Budget Style:</strong> Hostels/guesthouses, local street food & cafes, metro/buses, and free/self-guided attractions.
                </p>
                <div className="breakdown-bar">
                  <div className="bar-seg seg-stay" style={{ width: '45%' }} title="Stay 45%">Stay ~$16</div>
                  <div className="bar-seg seg-food" style={{ width: '35%' }} title="Food 35%">Food ~$12</div>
                  <div className="bar-seg seg-move" style={{ width: '20%' }} title="Transit 20%">Transit ~$7</div>
                </div>
              </div>
            )}

            {activeTier === 'mid' && (
              <div className="breakdown-details">
                <p className="breakdown-desc">
                  <strong>Mid-Range Comfort:</strong> 3–4 star boutique hotel, authentic sit-down dining, museum tickets & occasional ride-hails.
                </p>
                <div className="breakdown-bar">
                  <div className="bar-seg seg-stay" style={{ width: '50%' }} title="Stay 50%">Stay ~${Math.round(budgetTiers.mid * 0.5)}</div>
                  <div className="bar-seg seg-food" style={{ width: '30%' }} title="Food 30%">Food ~${Math.round(budgetTiers.mid * 0.3)}</div>
                  <div className="bar-seg seg-move" style={{ width: '20%' }} title="Sights & Transit 20%">Sights ~${Math.round(budgetTiers.mid * 0.2)}</div>
                </div>
              </div>
            )}

            {activeTier === 'luxury' && (
              <div className="breakdown-details">
                <p className="breakdown-desc">
                  <strong>Luxury Explorer:</strong> 5-star luxury resorts, fine dining with wine pairings, private chauffeured cars & VIP tours.
                </p>
                <div className="breakdown-bar">
                  <div className="bar-seg seg-stay" style={{ width: '55%' }} title="Stay 55%">5-Star ~${Math.round(budgetTiers.luxury * 0.55)}</div>
                  <div className="bar-seg seg-food" style={{ width: '25%' }} title="Fine Dining 25%">Dining ~${Math.round(budgetTiers.luxury * 0.25)}</div>
                  <div className="bar-seg seg-move" style={{ width: '20%' }} title="Private Tours 20%">Tours ~${Math.round(budgetTiers.luxury * 0.2)}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .currency-budget-container {
          padding: 1.25rem 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border: 1px solid rgba(245, 158, 11, 0.25);
          background: rgba(14, 20, 32, 0.55);
          border-radius: var(--radius-lg);
          margin-top: 0.5rem;
        }
        .cb-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 0.75rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .cb-title-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .cb-icon {
          color: var(--accent-gold);
        }
        .cb-legal-tender-badge {
          font-size: 0.75rem;
          color: var(--accent-gold);
          background: rgba(245, 158, 11, 0.1);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(245, 158, 11, 0.25);
          font-weight: 600;
        }
        .cb-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 1.25rem;
        }
        @media (max-width: 860px) {
          .cb-grid {
            grid-template-columns: 1fr;
          }
        }
        .cb-converter-card, .cb-budget-meter-card {
          padding: 1rem 1.25rem;
          background: rgba(18, 24, 38, 0.6);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .converter-card-header, .budget-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .card-label {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .fx-rate-pill {
          font-size: 0.72rem;
          color: var(--text-highlight);
          background: rgba(56, 189, 248, 0.1);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          font-weight: 600;
        }
        .converter-interactive-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .input-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .input-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .amount-input-wrap {
          display: flex;
          align-items: center;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          overflow: hidden;
        }
        .amount-input {
          width: 100%;
          padding: 0.5rem 0.65rem;
          background: transparent;
          color: var(--text-primary);
          font-size: 0.95rem;
          font-weight: 700;
        }
        .currency-select {
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-highlight);
          padding: 0.5rem 0.5rem;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          border-left: 1px solid var(--border-subtle);
        }
        .swap-icon-wrap {
          color: var(--text-muted);
          padding-top: 1.2rem;
        }
        .result-display-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0.75rem;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: var(--radius-sm);
          min-height: 42px;
        }
        .result-val {
          font-size: 1.15rem;
          font-weight: 800;
          color: #38bdf8;
        }
        .target-currency-tag {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .quick-presets-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
        }
        .presets-label {
          color: var(--text-muted);
          margin-right: 0.2rem;
        }
        .preset-pill {
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          font-size: 0.72rem;
          font-weight: 600;
          border: 1px solid var(--border-subtle);
          transition: var(--transition-fast);
        }
        .preset-pill:hover, .preset-pill.active {
          background: var(--accent-primary);
          color: #ffffff;
          border-color: var(--accent-primary);
        }
        .budget-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .wallet-icon {
          color: var(--accent-emerald);
        }
        .benchmark-text {
          font-size: 0.72rem;
          color: var(--text-muted);
        }
        .budget-tier-pills {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }
        .tier-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.6rem 0.4rem;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          transition: var(--transition-fast);
          cursor: pointer;
        }
        .tier-btn:hover {
          border-color: var(--border-accent);
          background: rgba(99, 102, 241, 0.08);
        }
        .tier-btn.active {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(16, 185, 129, 0.15));
          border-color: var(--accent-emerald);
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.2);
        }
        .tier-icon {
          font-size: 1.1rem;
        }
        .tier-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .tier-price {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--accent-emerald);
        }
        .tier-breakdown-box {
          background: rgba(0, 0, 0, 0.2);
          border-radius: var(--radius-sm);
          padding: 0.75rem;
          border: 1px solid var(--border-subtle);
        }
        .breakdown-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 0.5rem;
        }
        .breakdown-bar {
          display: flex;
          height: 18px;
          border-radius: var(--radius-full);
          overflow: hidden;
          font-size: 0.65rem;
          font-weight: 700;
          color: #ffffff;
          text-align: center;
          line-height: 18px;
        }
        .seg-stay {
          background: #6366f1;
        }
        .seg-food {
          background: #10b981;
        }
        .seg-move {
          background: #f59e0b;
        }
      `}</style>
    </div>
  );
}
