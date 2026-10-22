import React, { useState, useEffect } from 'react';
import { Globe, Server, Plus, Sun, Moon, ShieldCheck, Compass, Sparkles } from 'lucide-react';

export default function Navbar({ 
  theme, 
  onToggleTheme, 
  onOpenAddCountry, 
  onOpenArchModal, 
  systemStatus 
}) {
  return (
    <header className="navbar-wrapper glass-panel">
      <div className="navbar-left">
        <div className="navbar-brand">
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
        <button 
          onClick={onOpenAddCountry}
          className="btn-primary"
          id="btn-add-country"
        >
          <Plus size={16} />
          <span>Add Country</span>
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
        .btn-icon:hover {
          color: var(--text-primary);
          border-color: var(--border-accent);
          background: var(--bg-card-hover);
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
