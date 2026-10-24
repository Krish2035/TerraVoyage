import React, { useState } from 'react';
import { HeartHandshake, Zap, Sparkles, CheckCircle, AlertCircle, Info, Calculator } from 'lucide-react';
import { getCountryCulturalData } from '../services/travelIntelligenceData';

export default function CulturalEtiquetteWidget({ country }) {
  const culturalData = getCountryCulturalData(country);
  const [billAmount, setBillAmount] = useState(50);
  const [tipPercent, setTipPercent] = useState(15);

  if (!country || !culturalData) return null;

  const tipAmount = ((billAmount * tipPercent) / 100).toFixed(2);
  const totalAmount = (parseFloat(billAmount || 0) + parseFloat(tipAmount)).toFixed(2);

  return (
    <div className="utility-card cultural-etiquette-card glass-panel" id="cultural-etiquette-widget">
      <div className="utility-card-header">
        <div className="u-title-group">
          <HeartHandshake size={18} className="text-purple" />
          <h3 className="widget-main-title">
            Cultural Etiquette, Tipping & Socket Guide
          </h3>
        </div>
        <span className="etiquette-country-tag">
          Local Customs in {country.name}
        </span>
      </div>

      <div className="etiquette-two-col-grid">
        {/* Left Column: Tipping Customs & Interactive Calculator */}
        <div className="etiquette-block tipping-block">
          <div className="block-header">
            <span className="block-title">Tipping Customs</span>
            <span 
              className="tipping-rule-badge" 
              style={{ background: `${culturalData.tipping.color}22`, color: culturalData.tipping.color, borderColor: `${culturalData.tipping.color}44` }}
            >
              {culturalData.tipping.rule}
            </span>
          </div>

          <p className="tipping-advice-text">
            {culturalData.tipping.advice}
          </p>

          {/* Mini Interactive Tipping Calculator */}
          <div className="mini-calc-box">
            <div className="calc-header">
              <Calculator size={13} className="text-muted" />
              <span>Quick Tip Calculator</span>
            </div>
            <div className="calc-row">
              <div className="calc-input-group">
                <label>Bill Amount ($)</label>
                <input
                  type="number"
                  min="1"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  className="calc-input"
                />
              </div>

              <div className="calc-input-group">
                <label>Tip %</label>
                <div className="tip-pills">
                  {[0, 10, 15, 20].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      className={`tip-btn ${tipPercent === pct ? 'active' : ''}`}
                      onClick={() => setTipPercent(pct)}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="calc-results-row">
              <div className="calc-res-item">
                <span className="res-lbl">Tip:</span>
                <span className="res-val">${tipAmount}</span>
              </div>
              <div className="calc-res-item total">
                <span className="res-lbl">Total:</span>
                <span className="res-val">${totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Electrical Sockets & Voltage Guide */}
        <div className="etiquette-block sockets-block">
          <div className="block-header">
            <span className="block-title">Electrical Plugs & Voltage</span>
            <Zap size={15} className="text-amber" />
          </div>

          <div className="plugs-visual-row">
            {culturalData.plugs.types.map((plugType) => (
              <div key={plugType} className="plug-visual-card">
                <div className="plug-pin-mockup">
                  <span className="plug-pin-dot"></span>
                  <span className="plug-pin-dot"></span>
                </div>
                <span className="plug-type-name">{plugType}</span>
              </div>
            ))}
          </div>

          <div className="voltage-specs-row">
            <div className="voltage-pill">
              <span className="v-lbl">Voltage</span>
              <span className="v-val">{culturalData.plugs.voltage}</span>
            </div>
            <div className="voltage-pill">
              <span className="v-lbl">Frequency</span>
              <span className="v-val">{culturalData.plugs.frequency}</span>
            </div>
          </div>

          <p className="adapter-advice">
            <Info size={13} className="text-cyan" /> {culturalData.plugs.adapterNeeded}
          </p>
        </div>
      </div>

      {/* Cultural Dos and Don'ts Cards */}
      <div className="cultural-dos-section">
        <span className="dos-heading">
          <Sparkles size={13} className="text-gold" /> Essential Cultural Dos & Don'ts:
        </span>
        <div className="dos-cards-grid">
          {culturalData.etiquette.map((item, idx) => (
            <div key={idx} className="cultural-do-card">
              <div className="do-card-top">
                <CheckCircle size={14} className="text-emerald" />
                <span className="do-title">{item.title}</span>
              </div>
              <p className="do-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cultural-etiquette-card {
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          background: rgba(15, 23, 42, 0.65);
          border: 1px solid rgba(168, 85, 247, 0.25);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
        }
        .etiquette-country-tag {
          font-size: 0.80rem;
          font-weight: 600;
          color: var(--text-muted);
        }
        .etiquette-two-col-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
        }
        .etiquette-block {
          padding: 1.1rem;
          border-radius: var(--radius-md);
          background: rgba(30, 41, 59, 0.45);
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .block-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .block-title {
          font-size: 0.90rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .tipping-rule-badge {
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          font-weight: 700;
          border: 1px solid;
        }
        .tipping-advice-text {
          font-size: 0.82rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.45;
        }
        .mini-calc-box {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .calc-header {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .calc-row {
          display: flex;
          gap: 0.85rem;
          align-items: center;
        }
        .calc-input-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
        }
        .calc-input-group label {
          font-size: 0.70rem;
          color: var(--text-muted);
        }
        .calc-input {
          background: var(--bg-input);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xs);
          padding: 0.35rem 0.5rem;
          color: var(--text-primary);
          font-size: 0.85rem;
          font-weight: 700;
          width: 100%;
        }
        .tip-pills {
          display: flex;
          gap: 0.25rem;
        }
        .tip-btn {
          flex: 1;
          padding: 0.3rem 0;
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xs);
          color: var(--text-secondary);
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
        }
        .tip-btn.active {
          background: #6366f1;
          border-color: #6366f1;
          color: #ffffff;
        }
        .calc-results-row {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid var(--border-subtle);
          padding-top: 0.5rem;
        }
        .calc-res-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: var(--text-secondary);
        }
        .calc-res-item.total .res-val {
          color: #10b981;
          font-weight: 800;
          font-size: 0.90rem;
        }
        .plugs-visual-row {
          display: flex;
          gap: 0.75rem;
        }
        .plug-visual-card {
          flex: 1;
          padding: 0.6rem;
          border-radius: var(--radius-sm);
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }
        .plug-pin-mockup {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .plug-pin-dot {
          width: 4px;
          height: 8px;
          background: #38bdf8;
          border-radius: 2px;
        }
        .plug-type-name {
          font-size: 0.72rem;
          font-weight: 700;
          color: #38bdf8;
        }
        .voltage-specs-row {
          display: flex;
          gap: 0.75rem;
        }
        .voltage-pill {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          padding: 0.4rem 0.6rem;
          background: rgba(15, 23, 42, 0.4);
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-subtle);
        }
        .v-lbl { font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; }
        .v-val { font-size: 0.80rem; font-weight: 700; color: #f59e0b; }
        .adapter-advice {
          font-size: 0.76rem;
          color: var(--text-secondary);
          margin: 0;
          display: flex;
          align-items: flex-start;
          gap: 0.4rem;
          line-height: 1.35;
        }
        .cultural-dos-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border-top: 1px solid var(--border-subtle);
          padding-top: 1rem;
        }
        .dos-heading {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .dos-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 0.75rem;
        }
        .cultural-do-card {
          padding: 0.85rem;
          border-radius: var(--radius-sm);
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .do-card-top {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }
        .do-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .do-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
