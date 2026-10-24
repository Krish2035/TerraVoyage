import React, { useState } from 'react';
import { 
  FileCheck2, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  FileText, 
  ShieldAlert,
  Globe2
} from 'lucide-react';
import { PASSPORT_ORIGINS, getVisaRequirements } from '../services/travelKitData';

export default function VisaCheckerWidget({ country }) {
  const [selectedPassport, setSelectedPassport] = useState('US');

  if (!country) return null;

  const visaInfo = getVisaRequirements(selectedPassport, country);
  const passportObj = PASSPORT_ORIGINS.find(p => p.code === selectedPassport);

  return (
    <div className="visa-checker-container glass-panel">
      {/* Header */}
      <div className="vc-header-row">
        <div className="vc-title-box">
          <FileCheck2 size={18} className="vc-icon" />
          <span className="vc-title">Smart Visa & Entry Requirements Checker</span>
        </div>
        <div className="vc-passport-selector">
          <label htmlFor="select-passport" className="vc-label">My Passport:</label>
          <select
            id="select-passport"
            value={selectedPassport}
            onChange={(e) => setSelectedPassport(e.target.value)}
            className="vc-select"
          >
            {PASSPORT_ORIGINS.map(p => (
              <option key={p.code} value={p.code}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Visa Status Banner */}
      <div className="vc-body-grid">
        <div className="vc-status-card" style={{ borderColor: visaInfo?.color }}>
          <div className="vc-status-top">
            <span className="vc-status-badge" style={{ color: visaInfo?.color }}>
              {visaInfo?.badge}
            </span>
            <span className="vc-stay-pill">
              <Clock size={12} /> Max Stay: {visaInfo?.maxStay}
            </span>
          </div>

          <p className="vc-details-text">
            {visaInfo?.details}
          </p>

          <div className="vc-passport-rule">
            <ShieldAlert size={14} className="vc-rule-icon" />
            <span>Passport must have at least <strong>6 months of remaining validity</strong> from departure date with 2 blank pages.</span>
          </div>
        </div>

        {/* Requirements Checklist */}
        <div className="vc-checklist-card">
          <span className="vc-check-title">Mandatory Entry Documents:</span>
          <div className="vc-check-items">
            {(visaInfo?.requirements || []).map((req, idx) => (
              <div key={idx} className="vc-check-item">
                <CheckCircle2 size={13} className="vc-check-icon" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .visa-checker-container {
          padding: 1.25rem 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border: 1px solid rgba(16, 185, 129, 0.25);
          background: rgba(14, 20, 32, 0.55);
          border-radius: var(--radius-lg);
          margin-top: 0.5rem;
        }
        .vc-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 0.75rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .vc-title-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .vc-icon {
          color: var(--accent-emerald);
        }
        .vc-passport-selector {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .vc-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .vc-select {
          background: var(--bg-card);
          color: var(--text-highlight);
          border: 1px solid var(--border-subtle);
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
        }
        .vc-select option {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .vc-body-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 1.25rem;
        }
        @media (max-width: 820px) {
          .vc-body-grid {
            grid-template-columns: 1fr;
          }
        }
        .vc-status-card {
          padding: 1rem 1.25rem;
          background: rgba(18, 24, 38, 0.6);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .vc-status-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .vc-status-badge {
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: -0.01em;
        }
        .vc-stay-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full);
          font-weight: 600;
        }
        .vc-details-text {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }
        .vc-passport-rule {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          color: #fde68a;
          line-height: 1.4;
        }
        .vc-rule-icon {
          color: var(--accent-gold);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .vc-checklist-card {
          padding: 1rem 1.25rem;
          background: rgba(18, 24, 38, 0.6);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .vc-check-title {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .vc-check-items {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .vc-check-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.78rem;
          color: var(--text-secondary);
        }
        .vc-check-icon {
          color: var(--accent-emerald);
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}
