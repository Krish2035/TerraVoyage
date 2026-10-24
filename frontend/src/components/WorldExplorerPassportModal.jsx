import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Award, 
  Globe2, 
  Check, 
  Bookmark, 
  Sparkles, 
  Search, 
  Share2, 
  Compass, 
  PlaneTakeoff, 
  Flag 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WorldExplorerPassportModal({
  isOpen,
  onClose,
  countries = [],
  onSelectCountry
}) {
  const [visitedCodes, setVisitedCodes] = useState(() => {
    try {
      const s = localStorage.getItem('terra_visited_countries');
      return s ? new Set(JSON.parse(s)) : new Set(['US', 'FR', 'JP']);
    } catch (e) {
      return new Set(['US', 'FR', 'JP']);
    }
  });

  const [bucketCodes, setBucketCodes] = useState(() => {
    try {
      const s = localStorage.getItem('terra_bucket_countries');
      return s ? new Set(JSON.parse(s)) : new Set(['IN', 'IT', 'CH', 'GR', 'EG']);
    } catch (e) {
      return new Set(['IN', 'IT', 'CH', 'GR', 'EG']);
    }
  });

  const [activeTab, setActiveTab] = useState('visited'); // 'visited' | 'bucket' | 'all'
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const toggleVisited = (code) => {
    setVisitedCodes(prev => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      }
      try {
        localStorage.setItem('terra_visited_countries', JSON.stringify([...next]));
      } catch (e) {}
      return next;
    });
  };

  const toggleBucket = (code) => {
    setBucketCodes(prev => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }
      try {
        localStorage.setItem('terra_bucket_countries', JSON.stringify([...next]));
      } catch (e) {}
      return next;
    });
  };

  if (!isOpen) return null;

  const totalCountries = countries.length || 195;
  const visitedCount = visitedCodes.size;
  const worldPct = ((visitedCount / totalCountries) * 100).toFixed(1);

  // Filter countries
  const displayedCountries = countries.filter(c => {
    const q = search.toLowerCase();
    const match = !q || c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q);
    if (!match) return false;

    if (activeTab === 'visited') return visitedCodes.has(c.code);
    if (activeTab === 'bucket') return bucketCodes.has(c.code);
    return true;
  });

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="passport-modal-card glass-panel animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        id="world-explorer-passport-modal"
      >
        {/* Header */}
        <div className="passport-header">
          <div className="passport-header-left">
            <div className="passport-badge">
              <Award size={16} />
              <span>Global Travel Dossier</span>
            </div>
            <h2 className="passport-title">My World Explorer Passport</h2>
          </div>
          <button 
            onClick={onClose} 
            className="modal-close-btn"
            id="btn-close-passport"
            aria-label="Close Passport"
          >
            <X size={20} />
          </button>
        </div>

        {/* Global Explorer Stats Dashboard */}
        <div className="passport-stats-bar">
          <div className="passport-stat-box">
            <span className="p-num">{visitedCount} / {totalCountries}</span>
            <span className="p-sub">Nations Visited</span>
          </div>
          <div className="p-divider"></div>
          <div className="passport-stat-box">
            <span className="p-num p-num-gold">{worldPct}%</span>
            <span className="p-sub">World Explored</span>
          </div>
          <div className="p-divider"></div>
          <div className="passport-stat-box">
            <span className="p-num">{bucketCodes.size}</span>
            <span className="p-sub">Bucket List Pins</span>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="passport-controls-row">
          <div className="passport-tabs">
            <button 
              type="button" 
              className={`p-tab ${activeTab === 'visited' ? 'active' : ''}`}
              onClick={() => setActiveTab('visited')}
            >
              Visited ({visitedCodes.size})
            </button>
            <button 
              type="button" 
              className={`p-tab ${activeTab === 'bucket' ? 'active' : ''}`}
              onClick={() => setActiveTab('bucket')}
            >
              Bucket List ({bucketCodes.size})
            </button>
            <button 
              type="button" 
              className={`p-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All 195 Nations
            </button>
          </div>

          <div className="passport-search-wrap">
            <Search size={14} className="p-search-icon" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search nations..."
              className="p-search-input"
            />
          </div>
        </div>

        {/* Stamp Cards Grid */}
        <div className="passport-stamps-scroll">
          <div className="passport-grid">
            {displayedCountries.map(c => {
              const isVisited = visitedCodes.has(c.code);
              const isBucket = bucketCodes.has(c.code);

              return (
                <div key={c.id || c.code} className={`stamp-card ${isVisited ? 'is-stamped' : ''}`}>
                  <div className="stamp-flag-wrap">
                    <img 
                      src={c.flagSvg || c.flag} 
                      alt={c.name} 
                      className="stamp-flag"
                    />
                    {isVisited && (
                      <div className="stamp-seal-badge">
                        <Check size={12} strokeWidth={3} />
                        <span>VISITED</span>
                      </div>
                    )}
                  </div>

                  <div className="stamp-body">
                    <h4 
                      className="stamp-country-name"
                      onClick={() => {
                        onClose();
                        onSelectCountry(c);
                      }}
                      title="Click to view full country profile"
                    >
                      {c.name}
                    </h4>
                    <span className="stamp-region">{c.region}</span>

                    <div className="stamp-action-buttons">
                      <button
                        type="button"
                        onClick={() => toggleVisited(c.code)}
                        className={`btn-stamp-action ${isVisited ? 'visited-active' : ''}`}
                        title={isVisited ? 'Mark as Not Visited' : 'Mark as Visited'}
                      >
                        <PlaneTakeoff size={13} />
                        <span>{isVisited ? 'Visited ✈️' : 'I\'ve Been Here'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleBucket(c.code)}
                        className={`btn-stamp-action ${isBucket ? 'bucket-active' : ''}`}
                        title={isBucket ? 'Remove from Bucket List' : 'Add to Bucket List'}
                      >
                        <Bookmark size={13} />
                        <span>{isBucket ? 'Bucket List 📌' : 'Want to Go'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {displayedCountries.length === 0 && (
            <div className="passport-empty">
              <p>No countries match this view. Switch to "All 195 Nations" to stamp more countries!</p>
            </div>
          )}
        </div>

        <style>{`
          .passport-modal-card {
            width: 95%;
            max-width: 960px;
            max-height: 88vh;
            background: var(--bg-secondary);
            border: 1px solid var(--border-accent);
            border-radius: var(--radius-lg);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85);
          }
          .passport-header {
            padding: 1.25rem 1.75rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--border-subtle);
            background: rgba(18, 24, 38, 0.6);
          }
          .passport-header-left {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }
          .passport-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.75rem;
            color: var(--accent-gold);
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .passport-title {
            font-size: 1.4rem;
            font-weight: 800;
          }
          .passport-stats-bar {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 0.9rem 1.5rem;
            background: rgba(245, 158, 11, 0.08);
            border-bottom: 1px solid var(--border-subtle);
          }
          .passport-stat-box {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .p-num {
            font-size: 1.35rem;
            font-weight: 800;
            color: var(--text-primary);
          }
          .p-num-gold {
            color: var(--accent-gold);
          }
          .p-sub {
            font-size: 0.72rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }
          .p-divider {
            width: 1px;
            height: 30px;
            background: var(--border-subtle);
          }
          .passport-controls-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.9rem 1.5rem;
            border-bottom: 1px solid var(--border-subtle);
            background: rgba(0, 0, 0, 0.2);
            flex-wrap: wrap;
            gap: 0.75rem;
          }
          .passport-tabs {
            display: flex;
            gap: 0.4rem;
          }
          .p-tab {
            font-size: 0.78rem;
            font-weight: 700;
            padding: 0.35rem 0.85rem;
            border-radius: var(--radius-full);
            background: rgba(255, 255, 255, 0.05);
            color: var(--text-secondary);
            border: 1px solid var(--border-subtle);
            transition: var(--transition-fast);
          }
          .p-tab:hover, .p-tab.active {
            background: var(--accent-primary);
            color: #ffffff;
            border-color: var(--accent-primary);
          }
          .passport-search-wrap {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            background: var(--bg-card);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-full);
            padding: 0.35rem 0.85rem;
          }
          .p-search-icon {
            color: var(--text-muted);
          }
          .p-search-input {
            background: transparent;
            color: var(--text-primary);
            font-size: 0.82rem;
            width: 160px;
          }
          .passport-stamps-scroll {
            flex: 1;
            overflow-y: auto;
            padding: 1.25rem 1.5rem;
          }
          .passport-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }
          @media (max-width: 860px) {
            .passport-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 580px) {
            .passport-grid {
              grid-template-columns: 1fr;
            }
          }
          .stamp-card {
            padding: 0.85rem;
            background: rgba(18, 24, 38, 0.6);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            display: flex;
            gap: 0.75rem;
            position: relative;
            transition: var(--transition-fast);
          }
          .stamp-card:hover {
            border-color: var(--border-accent);
            transform: translateY(-2px);
          }
          .stamp-card.is-stamped {
            border-color: rgba(245, 158, 11, 0.4);
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(18, 24, 38, 0.6));
          }
          .stamp-flag-wrap {
            position: relative;
            width: 72px;
            height: 48px;
            border-radius: var(--radius-sm);
            overflow: hidden;
            flex-shrink: 0;
            border: 1px solid var(--border-subtle);
          }
          .stamp-flag {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .stamp-seal-badge {
            position: absolute;
            bottom: 2px;
            left: 2px;
            right: 2px;
            background: rgba(245, 158, 11, 0.95);
            color: #000000;
            font-size: 0.58rem;
            font-weight: 900;
            letter-spacing: 0.05em;
            text-align: center;
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 2px;
            padding: 1px 0;
          }
          .stamp-body {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            min-width: 0;
          }
          .stamp-country-name {
            font-size: 0.9rem;
            font-weight: 700;
            color: var(--text-primary);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
          }
          .stamp-country-name:hover {
            color: var(--accent-primary);
          }
          .stamp-region {
            font-size: 0.7rem;
            color: var(--text-muted);
          }
          .stamp-action-buttons {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            margin-top: 0.35rem;
          }
          .btn-stamp-action {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            padding: 0.2rem 0.5rem;
            border-radius: var(--radius-sm);
            font-size: 0.68rem;
            font-weight: 600;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--border-subtle);
            color: var(--text-secondary);
            cursor: pointer;
            transition: var(--transition-fast);
          }
          .btn-stamp-action:hover {
            background: rgba(255, 255, 255, 0.12);
            color: var(--text-primary);
          }
          .visited-active {
            background: rgba(245, 158, 11, 0.2);
            border-color: var(--accent-gold);
            color: var(--accent-gold);
          }
          .bucket-active {
            background: rgba(56, 189, 248, 0.2);
            border-color: #38bdf8;
            color: #38bdf8;
          }
          .passport-empty {
            padding: 3rem;
            text-align: center;
            color: var(--text-muted);
          }
        `}</style>
      </div>
    </div>
  );
}
