import React, { useState } from 'react';
import { Phone, ShieldAlert, HeartPulse, Flame, Building2, Copy, Check, Volume2, AlertTriangle, ExternalLink } from 'lucide-react';
import { getCountryEmergencyData } from '../services/travelIntelligenceData';
import { speakPronunciation } from '../services/audioService';

export default function EmergencySOSWidget({ country }) {
  const sosData = getCountryEmergencyData(country);
  const [copiedKey, setCopiedKey] = useState(null);

  if (!country || !sosData) return null;

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="utility-card emergency-sos-card glass-panel" id="emergency-sos-widget">
      <div className="utility-card-header">
        <div className="u-title-group">
          <div className="sos-pill-badge">
            <ShieldAlert size={15} />
            <span>CRITICAL SOS</span>
          </div>
          <h3 className="widget-main-title">
            Local Emergency Hotlines & Embassy Directory
          </h3>
        </div>
        <span className="sos-country-tag">
          {country.name} Emergency Services
        </span>
      </div>

      {/* Emergency Hotlines Quick Dial Grid */}
      <div className="sos-hotline-grid">
        {/* Police */}
        <div className="sos-number-box police">
          <div className="sos-icon-circle police">
            <Phone size={16} />
          </div>
          <div className="sos-box-content">
            <span className="sos-type-label">POLICE</span>
            <div className="sos-action-row">
              <a href={`tel:${sosData.police}`} className="sos-phone-link" title="Tap to call">
                {sosData.police}
              </a>
              <button 
                type="button" 
                onClick={() => handleCopy(sosData.police, 'police')}
                className="sos-copy-btn"
                title="Copy number"
              >
                {copiedKey === 'police' ? <Check size={12} className="text-emerald" /> : <Copy size={12} />}
              </button>
            </div>
          </div>
        </div>

        {/* Ambulance */}
        <div className="sos-number-box ambulance">
          <div className="sos-icon-circle ambulance">
            <HeartPulse size={16} />
          </div>
          <div className="sos-box-content">
            <span className="sos-type-label">AMBULANCE / MEDICAL</span>
            <div className="sos-action-row">
              <a href={`tel:${sosData.ambulance}`} className="sos-phone-link" title="Tap to call">
                {sosData.ambulance}
              </a>
              <button 
                type="button" 
                onClick={() => handleCopy(sosData.ambulance, 'ambulance')}
                className="sos-copy-btn"
                title="Copy number"
              >
                {copiedKey === 'ambulance' ? <Check size={12} className="text-emerald" /> : <Copy size={12} />}
              </button>
            </div>
          </div>
        </div>

        {/* Fire */}
        <div className="sos-number-box fire">
          <div className="sos-icon-circle fire">
            <Flame size={16} />
          </div>
          <div className="sos-box-content">
            <span className="sos-type-label">FIRE BRIGADE</span>
            <div className="sos-action-row">
              <a href={`tel:${sosData.fire}`} className="sos-phone-link" title="Tap to call">
                {sosData.fire}
              </a>
              <button 
                type="button" 
                onClick={() => handleCopy(sosData.fire, 'fire')}
                className="sos-copy-btn"
                title="Copy number"
              >
                {copiedKey === 'fire' ? <Check size={12} className="text-emerald" /> : <Copy size={12} />}
              </button>
            </div>
          </div>
        </div>

        {/* Tourist Police */}
        <div className="sos-number-box tourist">
          <div className="sos-icon-circle tourist">
            <ShieldAlert size={16} />
          </div>
          <div className="sos-box-content">
            <span className="sos-type-label">TOURIST HELPLINE</span>
            <div className="sos-action-row">
              <a href={`tel:${sosData.touristPolice}`} className="sos-phone-link" title="Tap to call">
                {sosData.touristPolice}
              </a>
              <button 
                type="button" 
                onClick={() => handleCopy(sosData.touristPolice, 'tourist')}
                className="sos-copy-btn"
                title="Copy number"
              >
                {copiedKey === 'tourist' ? <Check size={12} className="text-emerald" /> : <Copy size={12} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Diplomatic Foreign Embassies Directory */}
      <div className="sos-embassy-section">
        <div className="sos-section-title">
          <Building2 size={14} className="text-cyan" />
          <span>Foreign Embassies & Consular Missions in {country.name}</span>
        </div>
        <div className="embassy-card-grid">
          {sosData.embassies.map((embassy, i) => (
            <div key={i} className="embassy-card">
              <div className="embassy-card-top">
                <span className="embassy-name">{embassy.name}</span>
                <span className="embassy-city">{embassy.city}</span>
              </div>
              <p className="embassy-address">{embassy.address}</p>
              <div className="embassy-bottom-row">
                <a href={`tel:${embassy.phone}`} className="embassy-phone-link">
                  <Phone size={11} /> {embassy.phone}
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(embassy.phone, `emb-${i}`)}
                  className="embassy-copy-btn"
                  title="Copy Phone Number"
                >
                  {copiedKey === `emb-${i}` ? <Check size={11} className="text-emerald" /> : <Copy size={11} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Phrases with Audio */}
      <div className="sos-phrase-row">
        <div className="sos-phrase-title">
          <AlertTriangle size={13} className="text-amber" />
          <span>Life-Saving Phrases (Tap speaker for native speech):</span>
        </div>
        <div className="phrase-cards-container">
          {sosData.phrases.map((phrase, i) => (
            <div key={i} className="sos-phrase-card">
              <div className="phrase-text-col">
                <span className="phrase-en">{phrase.en}</span>
                <span className="phrase-local">{phrase.local}</span>
              </div>
              <button
                type="button"
                onClick={() => speakPronunciation(phrase.local)}
                className="phrase-audio-btn"
                title="Listen to emergency phrase"
              >
                <Volume2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .emergency-sos-card {
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          background: rgba(15, 23, 42, 0.65);
          border: 1px solid rgba(239, 68, 68, 0.3);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
        }
        .sos-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #ef4444;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.06em;
        }
        .sos-country-tag {
          font-size: 0.80rem;
          font-weight: 600;
          color: var(--text-muted);
        }
        .sos-hotline-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.85rem;
        }
        .sos-number-box {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          background: rgba(30, 41, 59, 0.55);
          border: 1px solid var(--border-subtle);
          transition: var(--transition-fast);
        }
        .sos-number-box:hover {
          border-color: rgba(239, 68, 68, 0.4);
          transform: translateY(-2px);
        }
        .sos-icon-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .sos-icon-circle.police { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }
        .sos-icon-circle.ambulance { background: rgba(239, 68, 68, 0.2); color: #f87171; }
        .sos-icon-circle.fire { background: rgba(245, 158, 11, 0.2); color: #fbbf24; }
        .sos-icon-circle.tourist { background: rgba(16, 185, 129, 0.2); color: #34d399; }

        .sos-box-content {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          overflow: hidden;
        }
        .sos-type-label {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }
        .sos-action-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }
        .sos-phone-link {
          font-size: 1.05rem;
          font-weight: 800;
          color: #ffffff;
          text-decoration: none;
          font-family: var(--font-mono);
          letter-spacing: 0.04em;
        }
        .sos-phone-link:hover {
          color: #ef4444;
          text-decoration: underline;
        }
        .sos-copy-btn, .embassy-copy-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.2rem;
          border-radius: var(--radius-sm);
        }
        .sos-copy-btn:hover, .embassy-copy-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.08);
        }
        .sos-embassy-section {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          border-top: 1px solid var(--border-subtle);
          padding-top: 1rem;
        }
        .sos-section-title {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .embassy-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 0.75rem;
        }
        .embassy-card {
          padding: 0.75rem 0.95rem;
          border-radius: var(--radius-sm);
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .embassy-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .embassy-name {
          font-size: 0.82rem;
          font-weight: 700;
          color: #38bdf8;
        }
        .embassy-city {
          font-size: 0.72rem;
          color: var(--text-muted);
        }
        .embassy-address {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.35;
        }
        .embassy-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.2rem;
        }
        .embassy-phone-link {
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--text-primary);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }
        .embassy-phone-link:hover {
          color: #38bdf8;
          text-decoration: underline;
        }
        .sos-phrase-row {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          border-top: 1px solid var(--border-subtle);
          padding-top: 1rem;
        }
        .sos-phrase-title {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-secondary);
        }
        .phrase-cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 0.65rem;
        }
        .sos-phrase-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.6rem 0.85rem;
          border-radius: var(--radius-sm);
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.2);
        }
        .phrase-text-col {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .phrase-en {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .phrase-local {
          font-size: 0.72rem;
          color: #fbbf24;
        }
        .phrase-audio-btn {
          background: rgba(245, 158, 11, 0.15);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: #f59e0b;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .phrase-audio-btn:hover {
          background: #f59e0b;
          color: #000000;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
