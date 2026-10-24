import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Server, 
  Plus, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Compass, 
  Sparkles, 
  Scale, 
  Luggage, 
  Award, 
  HelpCircle, 
  Cloud, 
  Share2, 
  Download, 
  Languages,
  Menu,
  X
} from 'lucide-react';
import { useTranslation } from '../services/translationService';

export default function Navbar({ 
  theme, 
  onToggleTheme, 
  onOpenAddCountry, 
  onOpenArchModal, 
  systemStatus,
  currentView,
  onNavigateHome,
  itineraryCount = 0,
  onOpenItinerary,
  onOpenCompare,
  onOpenPassport,
  onOpenQuiz,
  onOpenAuthModal,
  onOpenShareModal,
  onInstallApp,
  canInstallPwa = false
}) {
  const { currentLang, changeLanguage, languages, t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile drawer on route/view change or resize to desktop
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentView]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="navbar-wrapper glass-panel">
      <div className="navbar-left">
        <div 
          className="navbar-brand" 
          onClick={onNavigateHome}
          role="button"
          tabIndex={0}
          title="Return to Home / All Nations"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onNavigateHome?.();
            }
          }}
        >
          <div className="brand-icon-wrapper">
            <Globe className="brand-icon" size={24} />
            <span className="brand-dot"></span>
          </div>
          <div className="brand-text">
            <span className="brand-title">TERRA<span className="brand-title-accent">VOYAGE</span></span>
            <span className="brand-subtitle">World & Tourism Specs Engine</span>
          </div>
        </div>

        <button 
          onClick={onOpenArchModal}
          className="arch-badge desktop-only"
          title="Click to view 112 Production Architecture Parameters & Health"
        >
          <span className="arch-dot"></span>
          <span className="arch-text">
            {systemStatus ? `${systemStatus.database?.type || 'Online'} • 112 Pillars` : 'Connecting...'}
          </span>
          <ShieldCheck size={14} className="arch-icon" />
        </button>
      </div>

      <div className="navbar-right">
        {/* Desktop Secondary Action Tools */}
        {canInstallPwa && (
          <button
            onClick={onInstallApp}
            className="btn-nav-action btn-nav-pwa desktop-nav-tool"
            title="Install TerraVoyage as a Desktop/Mobile App (Offline Enabled)"
            id="btn-install-pwa"
          >
            <Download size={14} className="text-cyan" />
            <span className="nav-btn-text">{t('installApp')}</span>
          </button>
        )}

        {/* Cloud Account Sync Action */}
        <button
          onClick={onOpenAuthModal}
          className="btn-nav-action btn-nav-cloud desktop-nav-tool"
          title="Open Cloud Account & Backup Vault"
          id="btn-nav-cloud-user"
        >
          <Cloud size={15} className="text-cyan" />
          <span className="nav-btn-text">{t('cloudAccount')}</span>
        </button>

        {/* Social Share Trip Action */}
        <button
          onClick={onOpenShareModal}
          className="btn-nav-action desktop-nav-tool"
          title="Share Itinerary, Landmarks & QR Code"
          id="btn-nav-share-trip"
        >
          <Share2 size={15} className="text-emerald" />
          <span className="nav-btn-text">{t('shareTrip')}</span>
        </button>

        {/* Wanderlust Trivia Quiz Action */}
        <button
          onClick={onOpenQuiz}
          className="btn-nav-action desktop-nav-tool"
          title="Play Wanderlust Geography & Landmark Quiz"
          id="btn-nav-quiz"
        >
          <HelpCircle size={15} className="text-purple" />
          <span className="nav-btn-text">{t('quiz')}</span>
        </button>

        {/* World Explorer Passport Action */}
        <button
          onClick={onOpenPassport}
          className="btn-nav-action btn-nav-passport desktop-nav-tool"
          title="Open My World Explorer Passport & Travel Bucket List"
          id="btn-nav-passport"
        >
          <Award size={15} className="text-gold" />
          <span className="nav-btn-text">{t('passport')}</span>
        </button>

        {/* Compare Nations Action */}
        <button 
          onClick={onOpenCompare}
          className="btn-nav-action desktop-nav-tool"
          title="Compare nations side-by-side"
          id="btn-nav-compare"
        >
          <Scale size={15} />
          <span className="nav-btn-text">{t('compare')}</span>
        </button>

        {/* Travel Itinerary Drawer Action - Always visible on all screens */}
        <button 
          onClick={onOpenItinerary}
          className="btn-nav-action btn-nav-itinerary"
          title="Open Travel Itinerary Drawer"
          id="btn-nav-itinerary"
        >
          <Luggage size={15} />
          <span className="nav-btn-text">{t('myTrip')}</span>
          {itineraryCount > 0 && (
            <span className="nav-badge-count">{itineraryCount}</span>
          )}
        </button>

        {/* Add Country Button (Desktop) */}
        <button 
          onClick={onOpenAddCountry}
          className="btn-primary desktop-only"
          id="btn-add-country"
        >
          <Plus size={16} />
          <span className="nav-btn-text">{t('addCountry')}</span>
        </button>

        {/* Global Controls: Language, Theme & Mobile Navigation */}
        <div className="navbar-controls-group">
          {/* Language Selector Dropdown (Desktop) */}
          <div className="lang-selector-box desktop-only" title="Change Interface Language">
            <Languages size={14} className="lang-icon" />
            <select 
              value={currentLang} 
              onChange={(e) => changeLanguage(e.target.value)}
              className="lang-select-dropdown"
              id="select-language"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.label}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Toggle - Always visible */}
          <button 
            onClick={onToggleTheme} 
            className="btn-icon" 
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            id="btn-theme-toggle"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile & Tablet Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn-icon btn-mobile-menu-toggle"
            title={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            id="btn-mobile-menu"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={20} className="text-cyan" /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Responsive Navigation Sheet */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-drawer glass-panel animate-slide-up" id="mobile-nav-drawer">
          <div className="mobile-drawer-top">
            <button
              onClick={() => {
                onOpenAddCountry();
                setIsMobileMenuOpen(false);
              }}
              className="btn-primary mobile-btn-add"
              id="mobile-btn-add-country"
            >
              <Plus size={16} />
              <span>{t('addCountry')}</span>
            </button>

            <div className="mobile-lang-box">
              <Languages size={15} className="lang-icon" />
              <select
                value={currentLang}
                onChange={(e) => changeLanguage(e.target.value)}
                className="lang-select-dropdown"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mobile-drawer-grid">
            <button
              onClick={() => {
                onOpenQuiz();
                setIsMobileMenuOpen(false);
              }}
              className="mobile-tool-card"
            >
              <HelpCircle size={18} className="text-purple" />
              <span>{t('quiz')}</span>
            </button>

            <button
              onClick={() => {
                onOpenPassport();
                setIsMobileMenuOpen(false);
              }}
              className="mobile-tool-card"
            >
              <Award size={18} className="text-gold" />
              <span>{t('passport')}</span>
            </button>

            <button
              onClick={() => {
                onOpenCompare();
                setIsMobileMenuOpen(false);
              }}
              className="mobile-tool-card"
            >
              <Scale size={18} className="text-cyan" />
              <span>{t('compare')}</span>
            </button>

            <button
              onClick={() => {
                onOpenAuthModal();
                setIsMobileMenuOpen(false);
              }}
              className="mobile-tool-card"
            >
              <Cloud size={18} className="text-indigo" />
              <span>{t('cloudAccount')}</span>
            </button>

            <button
              onClick={() => {
                onOpenShareModal();
                setIsMobileMenuOpen(false);
              }}
              className="mobile-tool-card"
            >
              <Share2 size={18} className="text-emerald" />
              <span>{t('shareTrip')}</span>
            </button>

            {canInstallPwa && (
              <button
                onClick={() => {
                  onInstallApp();
                  setIsMobileMenuOpen(false);
                }}
                className="mobile-tool-card highlight-card"
              >
                <Download size={18} className="text-cyan" />
                <span>{t('installApp')}</span>
              </button>
            )}

            <button
              onClick={() => {
                onOpenArchModal();
                setIsMobileMenuOpen(false);
              }}
              className="mobile-tool-card arch-card"
            >
              <ShieldCheck size={18} className="text-emerald" />
              <span>112 Pillars</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .navbar-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.8rem 1.5rem;
          margin-bottom: 0.5rem;
          position: sticky;
          top: 1rem;
          z-index: 50;
          gap: 1.25rem;
        }
        .navbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
        }
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          flex-wrap: nowrap;
        }
        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          cursor: pointer;
        }
        .brand-icon-wrapper {
          position: relative;
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(6, 182, 212, 0.25));
          border: 1px solid var(--border-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 16px var(--accent-glow);
        }
        .brand-icon {
          color: #38bdf8;
          animation: spinSlow 30s linear infinite;
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .brand-dot {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 8px;
          height: 8px;
          background-color: var(--accent-emerald);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--accent-emerald);
        }
        .brand-text {
          display: flex;
          flex-direction: column;
        }
        .brand-title {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }
        .brand-title-accent {
          background: linear-gradient(135deg, #6366f1, #38bdf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .brand-subtitle {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .arch-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: var(--accent-emerald);
          font-size: 0.78rem;
          font-weight: 600;
          transition: var(--transition-fast);
        }
        .arch-badge:hover {
          background: rgba(16, 185, 129, 0.2);
          transform: translateY(-1px);
        }
        .arch-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-emerald);
          box-shadow: 0 0 6px var(--accent-emerald);
          animation: pulseGlow 2s infinite ease-in-out;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.48rem 0.95rem;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.84rem;
          transition: var(--transition-fast);
          box-shadow: 0 4px 14px var(--accent-glow);
          white-space: nowrap;
        }
        .btn-primary:hover {
          background: linear-gradient(135deg, #4f46e5, #4338ca);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px var(--accent-glow);
        }
        .btn-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
          flex-shrink: 0;
        }
        .btn-nav-action {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.45rem 0.72rem;
          border-radius: var(--radius-md);
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          font-weight: 600;
          font-size: 0.82rem;
          cursor: pointer;
          transition: var(--transition-fast);
          position: relative;
          white-space: nowrap;
        }
        .btn-nav-action:hover {
          background: rgba(99, 102, 241, 0.15);
          border-color: var(--border-accent);
          color: #38bdf8;
          transform: translateY(-1px);
        }
        .btn-nav-itinerary {
          background: rgba(16, 185, 129, 0.08);
          border-color: rgba(16, 185, 129, 0.25);
          color: #10b981;
        }
        .btn-nav-itinerary:hover {
          background: rgba(16, 185, 129, 0.18);
          border-color: #10b981;
          color: #ffffff;
        }
        .nav-badge-count {
          background: #10b981;
          color: #ffffff;
          font-size: 0.68rem;
          font-weight: 800;
          padding: 0.1rem 0.4rem;
          border-radius: var(--radius-full);
          margin-left: 0.2rem;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
        }
        .lang-selector-box {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.3rem 0.55rem;
          transition: var(--transition-fast);
          flex-shrink: 0;
        }
        .lang-selector-box:hover {
          border-color: #38bdf8;
          background: rgba(30, 41, 59, 0.9);
        }
        .lang-icon {
          color: #38bdf8;
        }
        .lang-select-dropdown {
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          outline: none;
        }
        .lang-select-dropdown option {
          background: #0f172a;
          color: #ffffff;
        }
        .btn-nav-pwa {
          background: rgba(56, 189, 248, 0.12);
          border-color: rgba(56, 189, 248, 0.35);
          color: #38bdf8;
        }
        .btn-nav-pwa:hover {
          background: #0284c7;
          color: #ffffff;
        }
        .btn-nav-cloud {
          background: rgba(99, 102, 241, 0.12);
          border-color: rgba(99, 102, 241, 0.3);
          color: #818cf8;
        }
        .btn-nav-cloud:hover {
          background: #4f46e5;
          color: #ffffff;
        }
        .btn-mobile-menu-toggle {
          display: none;
        }
        .mobile-nav-drawer {
          position: absolute;
          top: calc(100% + 0.6rem);
          left: 0;
          right: 0;
          background: rgba(13, 17, 23, 0.96);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), var(--shadow-glow);
          z-index: 100;
        }
        .mobile-drawer-top {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .mobile-btn-add {
          flex: 1;
          justify-content: center;
          padding: 0.65rem 1rem;
          font-size: 0.88rem;
          min-height: 42px;
        }
        .mobile-lang-box {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.5rem 0.75rem;
          min-height: 42px;
        }
        .mobile-drawer-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.65rem;
        }
        .mobile-tool-card {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 0.85rem;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
          min-height: 44px;
        }
        .mobile-tool-card:hover, .mobile-tool-card:active {
          background: rgba(99, 102, 241, 0.2);
          border-color: var(--border-accent);
          transform: translateY(-1px);
        }
        .mobile-tool-card.arch-card {
          grid-column: span 2;
          justify-content: center;
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.3);
          color: var(--accent-emerald);
        }
        .mobile-tool-card.highlight-card {
          grid-column: span 2;
          justify-content: center;
          background: rgba(56, 189, 248, 0.12);
          border-color: rgba(56, 189, 248, 0.35);
          color: #38bdf8;
        }

        .navbar-controls-group {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          flex-shrink: 0;
          margin-left: 0.35rem;
          padding-left: 0.55rem;
          border-left: 1px solid var(--border-subtle);
        }

        /* Large Screen & Laptop Viewports (<= 1650px) */
        @media (max-width: 1650px) {
          .desktop-nav-tool .nav-btn-text {
            display: none;
          }
          .btn-nav-itinerary .nav-btn-text {
            display: inline;
          }
          .btn-nav-action {
            padding: 0.44rem 0.58rem;
          }
        }
        @media (max-width: 1280px) {
          .arch-badge.desktop-only {
            display: none !important;
          }
        }

        /* Tablet & Mobile Viewports (<= 1024px) */
        @media (max-width: 1024px) {
          .desktop-only, .desktop-nav-tool {
            display: none !important;
          }
          .btn-mobile-menu-toggle {
            display: flex !important;
          }
          .navbar-wrapper {
            padding: 0.75rem 1.15rem;
          }
          .navbar-left, .navbar-right {
            gap: 0.65rem;
          }
        }

        /* Mobile Phone Viewports (<= 640px) */
        @media (max-width: 640px) {
          .brand-subtitle {
            display: none;
          }
          .brand-title {
            font-size: 1.1rem;
          }
          .brand-icon-wrapper {
            width: 36px;
            height: 36px;
          }
          .navbar-wrapper {
            padding: 0.6rem 0.85rem;
            top: 0.5rem;
          }
          .btn-nav-itinerary .nav-btn-text {
            display: none;
          }
          .mobile-drawer-grid {
            grid-template-columns: 1fr;
          }
          .mobile-tool-card.arch-card, .mobile-tool-card.highlight-card {
            grid-column: span 1;
          }
        }
      `}</style>
    </header>
  );
}
