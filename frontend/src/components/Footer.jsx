import React from 'react';
import { 
  Globe2, 
  Map, 
  Compass, 
  Calendar, 
  Coins, 
  FileCheck2, 
  Languages, 
  Box, 
  ShieldCheck, 
  Heart,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';

export default function Footer({ onOpenArchitecture, onOpenPassport, onOpenQuiz }) {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="terravoyage-footer glass-panel" id="terra-footer">
      <div className="footer-top-grid">
        {/* Brand & Mission Column */}
        <div className="footer-brand-col">
          <div className="footer-brand-title">
            <div className="footer-brand-icon">
              <Globe2 size={22} className="text-cyan" />
            </div>
            <span className="brand-name">TerraVoyage</span>
          </div>

          <p className="footer-tagline">
            The premier open-access world country &amp; tourism specifications explorer. In-depth demographic metrics, verified travel kits, and iconic landmark guides for all 195 sovereign nations.
          </p>

          <div className="footer-deploy-badge" title="Hosted and optimized on Vercel">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
              <path d="M12 2L2 19.7778H22L12 2Z" />
            </svg>
            <span>Hosted &amp; Scaled on <strong>Vercel Edge</strong></span>
          </div>
        </div>

        {/* Global Exploration Links */}
        <div className="footer-links-col">
          <h4 className="footer-col-heading">
            <Compass size={15} className="col-heading-icon text-cyan" />
            <span>World Exploration</span>
          </h4>
          <ul className="footer-links-list">
            <li>
              <button 
                type="button" 
                onClick={() => scrollToSection('interactive-world-map')}
                className="footer-nav-link"
              >
                <Map size={13} />
                <span>Interactive Globe Radar</span>
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={() => scrollToSection('country-selector-section')}
                className="footer-nav-link"
              >
                <Globe2 size={13} />
                <span>195 Sovereign Nations</span>
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={() => scrollToSection('attractions-section')}
                className="footer-nav-link"
              >
                <Sparkles size={13} />
                <span>Top Tourist Attractions</span>
              </button>
            </li>
            <li>
              <button 
                type="button" 
                onClick={onOpenPassport}
                className="footer-nav-link"
              >
                <FileCheck2 size={13} />
                <span>World Traveler Passport</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Traveler Utilities Links */}
        <div className="footer-links-col">
          <h4 className="footer-col-heading">
            <Coins size={15} className="col-heading-icon text-gold" />
            <span>Smart Travel Tools</span>
          </h4>
          <ul className="footer-links-list">
            <li>
              <span className="footer-static-link">
                <Coins size={13} />
                <span>Live FX &amp; Cost of Living</span>
              </span>
            </li>
            <li>
              <span className="footer-static-link">
                <FileCheck2 size={13} />
                <span>Passport &amp; Visa Checker</span>
              </span>
            </li>
            <li>
              <span className="footer-static-link">
                <Languages size={13} />
                <span>Local Voice Phrasebooks</span>
              </span>
            </li>
            <li>
              <button 
                type="button" 
                onClick={onOpenQuiz}
                className="footer-nav-link"
              >
                <Box size={13} />
                <span>Geography &amp; Landmark Quiz</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Performance & Architecture Links */}
        <div className="footer-links-col">
          <h4 className="footer-col-heading">
            <Layers size={15} className="col-heading-icon text-emerald" />
            <span>Platform Reliability</span>
          </h4>
          <ul className="footer-links-list">
            {onOpenArchitecture && (
              <li>
                <button 
                  type="button" 
                  onClick={onOpenArchitecture}
                  className="footer-nav-link"
                >
                  <ShieldCheck size={13} />
                  <span>112 Production Pillars</span>
                </button>
              </li>
            )}
            <li>
              <span className="footer-static-link">
                <span className="live-status-dot"></span>
                <span>PostgreSQL Bulk Seed: 195/195</span>
              </span>
            </li>
            <li>
              <span className="footer-static-link">
                <span>PWA Offline Cache Ready</span>
              </span>
            </li>
            <li>
              <a 
                href="https://terra-voyage-one.vercel.app/" 
                target="_blank" 
                rel="noreferrer"
                className="footer-nav-link"
              >
                <ExternalLink size={13} />
                <span>terra-voyage-one.vercel.app</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-copy-text">
          <span>&copy; {currentYear} <strong>TerraVoyage</strong>. Free and open exploration platform.</span>
        </div>
        <div className="footer-bottom-right">
          <span className="footer-powered-by">
            Engineered with <Heart size={12} className="heart-icon" /> for curious travelers worldwide
          </span>
        </div>
      </div>

      <style>{`
        .terravoyage-footer {
          margin-top: 3.5rem;
          padding: 2.5rem 2.5rem 1.75rem 2.5rem;
          border-radius: var(--radius-xl);
          background: rgba(10, 14, 24, 0.75);
          border: 1px solid var(--border-subtle);
          position: relative;
          overflow: hidden;
        }
        .footer-top-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 2.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .footer-brand-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .footer-brand-title {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .footer-brand-icon {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(56, 189, 248, 0.2));
          border: 1px solid var(--border-accent);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .brand-name {
          font-size: 1.35rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
        }
        .footer-tagline {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }
        .footer-deploy-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-full);
          font-size: 0.76rem;
          color: var(--text-primary);
          width: fit-content;
        }
        .footer-links-col {
          display: flex;
          flex-direction: column;
          gap: 0.95rem;
        }
        .footer-col-heading {
          font-size: 0.86rem;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.45rem;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .col-heading-icon {
          flex-shrink: 0;
        }
        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .footer-nav-link {
          background: none;
          border: none;
          padding: 0;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.82rem;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition-fast);
          text-decoration: none;
        }
        .footer-nav-link:hover {
          color: #38bdf8;
          transform: translateX(2px);
        }
        .footer-static-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.82rem;
          color: var(--text-secondary);
        }
        .live-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-emerald);
          box-shadow: 0 0 8px var(--accent-emerald);
          animation: pulseGlow 2s infinite;
        }
        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
          flex-wrap: wrap;
          gap: 0.85rem;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .heart-icon {
          color: #f43f5e;
          display: inline;
          vertical-align: middle;
          margin: 0 2px;
        }

        /* Laptop Viewports (1024px - 1440px) */
        @media (max-width: 1440px) {
          .terravoyage-footer {
            padding: 2.2rem 2rem 1.5rem 2rem;
          }
          .footer-top-grid {
            gap: 2rem;
          }
        }

        /* Tablet Viewports (768px - 1024px) */
        @media (max-width: 1024px) {
          .terravoyage-footer {
            margin-top: 2.75rem;
            padding: 2rem 1.5rem 1.5rem 1.5rem;
          }
          .footer-top-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .footer-brand-col {
            grid-column: span 2;
          }
        }

        /* Mobile Viewports (<= 768px) */
        @media (max-width: 768px) {
          .terravoyage-footer {
            margin-top: 2.25rem;
            padding: 1.5rem 1.25rem 1.25rem 1.25rem;
            border-radius: var(--radius-lg);
          }
          .footer-top-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
            padding-bottom: 1.5rem;
          }
          .footer-brand-col {
            grid-column: span 1;
          }
          .footer-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }

        /* Small Phones (<= 480px) */
        @media (max-width: 480px) {
          .terravoyage-footer {
            padding: 1.25rem 1rem 1rem 1rem;
            margin-top: 1.75rem;
          }
          .brand-name {
            font-size: 1.2rem;
          }
          .footer-tagline {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </footer>
  );
}

