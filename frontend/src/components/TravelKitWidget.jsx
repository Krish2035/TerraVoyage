import React from 'react';
import { 
  Zap, 
  PhoneCall, 
  Car, 
  CreditCard, 
  HeartHandshake, 
  ShieldCheck, 
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { getCountrySpecsKit } from '../services/travelKitData';

export default function TravelKitWidget({ country }) {
  if (!country) return null;

  const kit = getCountrySpecsKit(country);
  if (!kit) return null;

  return (
    <div className="travel-kit-container glass-panel">
      {/* Header */}
      <div className="tk-header-row">
        <div className="tk-title-box">
          <Zap size={18} className="tk-icon" />
          <span className="tk-title">Essential Traveler Practical Kit & On-Ground Specs</span>
        </div>
        <span className="tk-verified-tag">
          <ShieldCheck size={13} /> Verified On-Ground Specs
        </span>
      </div>

      <div className="tk-grid">
        {/* 1. Electrical Sockets & Voltage */}
        <div className="tk-card">
          <div className="tk-card-header">
            <Zap size={16} className="tk-card-icon text-cyan" />
            <span className="tk-card-label">Plugs, Sockets & Voltage</span>
          </div>
          <div className="tk-card-content">
            <div className="plug-badges-row">
              {kit.plugs.map((plug, i) => (
                <span key={i} className="plug-pill">{plug}</span>
              ))}
            </div>
            <div className="voltage-meta">
              <span className="meta-sub">Standard Grid:</span>
              <strong className="meta-val">{kit.voltage}</strong>
            </div>
            <p className="tk-hint">
              {kit.plugs.includes('Type A') || kit.plugs.includes('Type G') 
                ? 'Travel adapter recommended if your chargers use 2-pin European or Indian round prongs.' 
                : 'Standard dual-voltage travel adapters compatible.'}
            </p>
          </div>
        </div>

        {/* 2. Emergency Response Numbers */}
        <div className="tk-card">
          <div className="tk-card-header">
            <PhoneCall size={16} className="tk-card-icon text-rose" />
            <span className="tk-card-label">Emergency Hotlines</span>
          </div>
          <div className="tk-card-content">
            <div className="emergency-numbers-grid">
              <div className="em-item">
                <span className="em-label">Police:</span>
                <a href={`tel:${kit.emergency.police}`} className="em-num">{kit.emergency.police}</a>
              </div>
              <div className="em-item">
                <span className="em-label">Ambulance:</span>
                <a href={`tel:${kit.emergency.ambulance}`} className="em-num">{kit.emergency.ambulance}</a>
              </div>
              <div className="em-item">
                <span className="em-label">Fire Dept:</span>
                <a href={`tel:${kit.emergency.fire}`} className="em-num">{kit.emergency.fire}</a>
              </div>
              {kit.emergency.universal && (
                <div className="em-item">
                  <span className="em-label">Universal EU:</span>
                  <a href={`tel:${kit.emergency.universal}`} className="em-num">{kit.emergency.universal}</a>
                </div>
              )}
            </div>
            <p className="tk-hint">Dialable from foreign roaming SIM cards and local public booths.</p>
          </div>
        </div>

        {/* 3. Road Driving & Public Transit */}
        <div className="tk-card">
          <div className="tk-card-header">
            <Car size={16} className="tk-card-icon text-gold" />
            <span className="tk-card-label">Road & Transit Infrastructure</span>
          </div>
          <div className="tk-card-content">
            <div className="transit-line">
              <span className="meta-sub">Driving Side:</span>
              <span className="driving-badge">{kit.drivingSide}</span>
            </div>
            <div className="transit-line">
              <span className="meta-sub">Transit Card:</span>
              <span className="transit-val">{kit.transitCard}</span>
            </div>
          </div>
        </div>

        {/* 4. Local Tipping Culture */}
        <div className="tk-card">
          <div className="tk-card-header">
            <HeartHandshake size={16} className="tk-card-icon text-emerald" />
            <span className="tk-card-label">Tipping & Hospitality Etiquette</span>
          </div>
          <div className="tk-card-content">
            <p className="tipping-desc">{kit.tipping}</p>
          </div>
        </div>
      </div>

      <style>{`
        .travel-kit-container {
          padding: 1.25rem 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border: 1px solid rgba(56, 189, 248, 0.25);
          background: rgba(14, 20, 32, 0.55);
          border-radius: var(--radius-lg);
          margin-top: 0.5rem;
        }
        .tk-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 0.75rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .tk-title-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .tk-icon {
          color: #38bdf8;
        }
        .tk-verified-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: var(--accent-emerald);
          font-weight: 600;
        }
        .tk-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.15rem;
        }
        @media (max-width: 820px) {
          .tk-grid {
            grid-template-columns: 1fr;
          }
        }
        .tk-card {
          padding: 1rem 1.25rem;
          background: rgba(18, 24, 38, 0.6);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .tk-card-header {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .tk-card-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.82rem;
        }
        .plug-badges-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .plug-pill {
          background: rgba(56, 189, 248, 0.12);
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.25);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-sm);
        }
        .voltage-meta, .transit-line {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .meta-sub {
          color: var(--text-muted);
          font-size: 0.75rem;
        }
        .meta-val, .transit-val {
          color: var(--text-primary);
          font-weight: 600;
        }
        .driving-badge {
          background: rgba(245, 158, 11, 0.12);
          color: var(--accent-gold);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
        }
        .tk-hint {
          font-size: 0.72rem;
          color: var(--text-muted);
          line-height: 1.4;
          font-style: italic;
        }
        .emergency-numbers-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }
        .em-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(244, 63, 94, 0.08);
          border: 1px solid rgba(244, 63, 94, 0.2);
          padding: 0.35rem 0.6rem;
          border-radius: var(--radius-sm);
        }
        .em-label {
          font-size: 0.72rem;
          color: var(--text-secondary);
        }
        .em-num {
          font-weight: 800;
          font-size: 0.85rem;
          color: #fca5a5;
          text-decoration: underline;
        }
        .em-num:hover {
          color: #ffffff;
        }
        .tipping-desc {
          color: var(--text-secondary);
          line-height: 1.45;
          font-size: 0.82rem;
        }
      `}</style>
    </div>
  );
}
