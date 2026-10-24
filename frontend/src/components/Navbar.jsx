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
  Languages 
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
          className="arch-badge"
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
        {/* Language Selector Dropdown */}
        <div className="lang-selector-box" title="Change Interface Language">
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

        {/* PWA Install Button */}
        {canInstallPwa && (
          <button
            onClick={onInstallApp}
            className="btn-nav-action btn-nav-pwa"
            title="Install TerraVoyage as a Desktop/Mobile App (Offline Enabled)"
            id="btn-install-pwa"
          >
            <Download size={14} className="text-cyan" />
            <span>{t('installApp')}</span>
          </button>
        )}

        {/* Cloud Account Sync Action */}
        <button
          onClick={onOpenAuthModal}
          className="btn-nav-action btn-nav-cloud"
          title="Open Cloud Account & Backup Vault"
          id="btn-nav-cloud-user"
        >
          <Cloud size={15} className="text-cyan" />
          <span>{t('cloudAccount')}</span>
        </button>

        {/* Social Share Trip Action */}
        <button
          onClick={onOpenShareModal}
          className="btn-nav-action"
          title="Share Itinerary, Landmarks & QR Code"
          id="btn-nav-share-trip"
        >
          <Share2 size={15} className="text-emerald" />
          <span>{t('shareTrip')}</span>
        </button>

        {/* Wanderlust Trivia Quiz Action */}
        <button
          onClick={onOpenQuiz}
          className="btn-nav-action"
          title="Play Wanderlust Geography & Landmark Quiz"
          id="btn-nav-quiz"
        >
          <HelpCircle size={15} className="text-purple" />
          <span>{t('quiz')}</span>
        </button>

        {/* World Explorer Passport Action */}
        <button
          onClick={onOpenPassport}
          className="btn-nav-action btn-nav-passport"
          title="Open My World Explorer Passport & Travel Bucket List"
          id="btn-nav-passport"
        >
          <Award size={15} className="text-gold" />
          <span>{t('passport')}</span>
        </button>

        {/* Compare Nations Action */}
        <button 
          onClick={onOpenCompare}
          className="btn-nav-action"
          title="Compare nations side-by-side"
          id="btn-nav-compare"
        >
          <Scale size={15} />
          <span>{t('compare')}</span>
        </button>

        {/* Travel Itinerary Drawer Action */}
        <button 
          onClick={onOpenItinerary}
          className="btn-nav-action btn-nav-itinerary"
          title="Open Travel Itinerary Drawer"
          id="btn-nav-itinerary"
        >
          <Luggage size={15} />
          <span>{t('myTrip')}</span>
          {itineraryCount > 0 && (
            <span className="nav-badge-count">{itineraryCount}</span>
          )}
        </button>

        <button 
          onClick={onOpenAddCountry}
          className="btn-primary"
          id="btn-add-country"
        >
          <Plus size={16} />
          <span>{t('addCountry')}</span>
        </button>

        <button 
          onClick={onToggleTheme} 
          className="btn-icon" 
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          id="btn-theme-toggle"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <style>{`
        .navbar-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 1.6rem;
          margin-bottom: 0.5rem;
          position: sticky;
          top: 1rem;
          z-index: 50;
        }
        .navbar-left, .navbar-right {
          display: flex;
          align-items: center;
          gap: 1.25rem;
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
          gap: 0.5rem;
          padding: 0.55rem 1.15rem;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.88rem;
          transition: var(--transition-fast);
          box-shadow: 0 4px 14px var(--accent-glow);
        }
        .btn-primary:hover {
          background: linear-gradient(135deg, #4f46e5, #4338ca);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px var(--accent-glow);
        }
        .btn-icon {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }
        .btn-nav-action {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.52rem 0.95rem;
          border-radius: var(--radius-md);
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          font-weight: 600;
          font-size: 0.84rem;
          cursor: pointer;
          transition: var(--transition-fast);
          position: relative;
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
        @media (max-width: 640px) {
          .arch-badge {
            display: none;
          }
          .brand-subtitle {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
