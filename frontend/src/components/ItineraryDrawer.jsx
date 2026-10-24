import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Trash2, 
  Navigation, 
  Printer, 
  Share2, 
  Clock, 
  Sparkles, 
  Compass, 
  ArrowRight,
  ExternalLink,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { getGoogleMapsUrl } from '../services/genuineImageService';

export default function ItineraryDrawer({
  isOpen,
  onClose,
  itinerary: itineraryProp = [],
  itineraryItems,
  onRemoveItem,
  onClearAll,
  onSelectAttraction
}) {
  const [printMode, setPrintMode] = useState(false);
  const itinerary = itineraryItems || itineraryProp || [];

  if (!isOpen) return null;

  // Calculate unique countries
  const countriesSet = new Set(itinerary.map(item => item.countryName || item.country?.name).filter(Boolean));
  const countryCount = countriesSet.size;

  // Generate multi-stop Google Maps directions link
  const getMultiStopRouteUrl = () => {
    if (itinerary.length === 0) return '#';
    const stops = itinerary.map(item => {
      const loc = item.location ? `${item.name}, ${item.location}` : item.name;
      return encodeURIComponent(loc);
    });
    return `https://www.google.com/maps/dir/${stops.join('/')}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="itinerary-backdrop" onClick={onClose}>
      <aside 
        className="itinerary-drawer glass-panel animate-slide-left"
        onClick={(e) => e.stopPropagation()}
        id="travel-itinerary-drawer"
      >
        {/* Header */}
        <div className="itinerary-header">
          <div className="itinerary-header-left">
            <div className="itinerary-badge">
              <Compass size={16} className="badge-icon-spin" />
              <span>Travel Planner</span>
            </div>
            <h2 className="itinerary-title">
              My Trip Itinerary 
              <span className="itinerary-count">({itinerary.length})</span>
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="drawer-close-btn"
            aria-label="Close Itinerary Drawer"
            id="btn-close-itinerary"
          >
            <X size={20} />
          </button>
        </div>

        {/* Trip Stats Bar */}
        {itinerary.length > 0 && (
          <div className="itinerary-stats-row">
            <div className="trip-stat-card">
              <span className="stat-num">{itinerary.length}</span>
              <span className="stat-label">Destinations</span>
            </div>
            <div className="trip-stat-divider"></div>
            <div className="trip-stat-card">
              <span className="stat-num">{countryCount}</span>
              <span className="stat-label">{countryCount === 1 ? 'Country' : 'Countries'}</span>
            </div>
            <div className="trip-stat-divider"></div>
            <div className="trip-stat-card">
              <span className="stat-num">~{Math.round(itinerary.length * 2.5)}h</span>
              <span className="stat-label">Explore Time</span>
            </div>
          </div>
        )}

        {/* Actions Bar (Google Maps Route & Print/Export) */}
        {itinerary.length > 0 && (
          <div className="itinerary-actions-bar">
            <a
              href={getMultiStopRouteUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-route-maps"
              id="btn-route-all-stops"
              title="Open all stops in a single multi-destination Google Maps route"
            >
              <Navigation size={15} />
              <span>Route on Google Maps</span>
              <ExternalLink size={12} className="link-ext" />
            </a>

            <button 
              onClick={handlePrint}
              className="btn-print-summary"
              id="btn-print-itinerary"
              title="Print or Save as PDF summary card"
            >
              <Printer size={15} />
              <span>Export PDF / Print</span>
            </button>
          </div>
        )}

        {/* List of Destinations */}
        <div className="itinerary-list-scroll">
          {itinerary.length === 0 ? (
            <div className="itinerary-empty-state">
              <div className="empty-icon-circle">
                <Compass size={40} className="empty-icon" />
              </div>
              <h3 className="empty-title">Your Itinerary is Empty</h3>
              <p className="empty-text">
                Browse any country's premier attractions and click <strong>"Add to My Itinerary"</strong> to build your custom trip route!
              </p>
              <div className="empty-hints">
                <div className="empty-hint-item">
                  <CheckCircle size={14} className="hint-check" />
                  <span>Interactive multi-stop Google Maps directions</span>
                </div>
                <div className="empty-hint-item">
                  <CheckCircle size={14} className="hint-check" />
                  <span>Printable travel card with specs & hours</span>
                </div>
                <div className="empty-hint-item">
                  <CheckCircle size={14} className="hint-check" />
                  <span>Saves automatically across browser sessions</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="itinerary-items-stack">
              {itinerary.map((item, index) => {
                const countryName = item.countryName || item.country?.name || 'World Landmark';
                const gmapsUrl = getGoogleMapsUrl(item.name, item.location, countryName);
                const bestTime = item.specs?.bestTime || item.specs?.visitingHours || 'Daytime Recommended';

                return (
                  <div key={item.id || index} className="itinerary-item-card glass-panel">
                    <div className="item-order-pill">#{index + 1}</div>

                    <div className="item-thumb-wrapper">
                      <img 
                        src={item.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80'} 
                        alt={item.name}
                        className="item-thumb"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    </div>

                    <div className="item-details">
                      <div className="item-tag-row">
                        <span className="item-country-badge">{countryName}</span>
                        {item.category && <span className="item-cat-badge">{item.category}</span>}
                      </div>

                      <h4 
                        className="item-name" 
                        onClick={() => onSelectAttraction && onSelectAttraction(item)}
                        title="Click to inspect verified specs"
                      >
                        {item.name}
                      </h4>

                      <div className="item-meta-row">
                        <span className="item-loc">
                          <MapPin size={12} /> {item.location}
                        </span>
                        <span className="item-hours">
                          <Clock size={12} /> {bestTime}
                        </span>
                      </div>

                      <div className="item-card-actions">
                        <a 
                          href={gmapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="item-map-btn"
                          title="Open in Google Maps"
                        >
                          <Navigation size={12} />
                          <span>Maps</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="item-remove-btn"
                          title="Remove from itinerary"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={13} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with Clear All & Export summary */}
        {itinerary.length > 0 && (
          <div className="itinerary-footer">
            <button 
              onClick={onClearAll} 
              className="btn-clear-all"
              title="Remove all items from itinerary"
            >
              <Trash2 size={14} />
              <span>Clear Entire Trip</span>
            </button>
            <span className="footer-auto-saved">
              <CheckCircle size={12} className="save-icon" /> Auto-saved
            </span>
          </div>
        )}

        <style>{`
          .itinerary-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 1000;
            display: flex;
            justify-content: flex-end;
          }
          .itinerary-drawer {
            width: 100%;
            max-width: 480px;
            height: 100%;
            background: var(--bg-secondary);
            border-left: 1px solid var(--border-accent);
            display: flex;
            flex-direction: column;
            box-shadow: -10px 0 40px rgba(0, 0, 0, 0.7);
            border-radius: 0;
            position: relative;
            overflow: hidden;
          }
          @keyframes slideLeft {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          .animate-slide-left {
            animation: slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .itinerary-header {
            padding: 1.25rem 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--border-subtle);
            background: rgba(18, 24, 38, 0.5);
          }
          .itinerary-header-left {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
          }
          .itinerary-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #38bdf8;
            font-weight: 700;
          }
          .badge-icon-spin {
            animation: spin 20s linear infinite;
          }
          .itinerary-title {
            font-size: 1.35rem;
            font-weight: 800;
            color: var(--text-primary);
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .itinerary-count {
            color: #38bdf8;
            font-size: 1.1rem;
          }
          .drawer-close-btn {
            width: 36px;
            height: 36px;
            border-radius: var(--radius-md);
            background: rgba(255, 255, 255, 0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-secondary);
            transition: var(--transition-fast);
          }
          .drawer-close-btn:hover {
            background: rgba(244, 63, 94, 0.2);
            color: #f43f5e;
          }
          .itinerary-stats-row {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 0.85rem 1.25rem;
            background: rgba(99, 102, 241, 0.08);
            border-bottom: 1px solid var(--border-subtle);
          }
          .trip-stat-card {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .stat-num {
            font-size: 1.25rem;
            font-weight: 800;
            color: var(--text-highlight);
            line-height: 1.1;
          }
          .stat-label {
            font-size: 0.72rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .trip-stat-divider {
            width: 1px;
            height: 26px;
            background: var(--border-subtle);
          }
          .itinerary-actions-bar {
            padding: 0.9rem 1.4rem;
            display: flex;
            gap: 0.75rem;
            border-bottom: 1px solid var(--border-subtle);
            background: rgba(0, 0, 0, 0.15);
          }
          .btn-route-maps {
            flex: 1.3;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.65rem 0.9rem;
            background: linear-gradient(135deg, #2563eb, #0284c7);
            color: #ffffff;
            font-weight: 700;
            font-size: 0.82rem;
            border-radius: var(--radius-md);
            box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
            transition: var(--transition-fast);
          }
          .btn-route-maps:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(37, 99, 235, 0.5);
          }
          .btn-print-summary {
            flex: 1;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
            padding: 0.65rem 0.85rem;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid var(--border-accent);
            color: var(--text-primary);
            font-weight: 600;
            font-size: 0.8rem;
            border-radius: var(--radius-md);
            transition: var(--transition-fast);
          }
          .btn-print-summary:hover {
            background: rgba(99, 102, 241, 0.2);
            color: #ffffff;
          }
          .itinerary-list-scroll {
            flex: 1;
            overflow-y: auto;
            padding: 1.25rem 1.4rem;
          }
          .itinerary-empty-state {
            padding: 3rem 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1rem;
          }
          .empty-icon-circle {
            width: 76px;
            height: 76px;
            border-radius: 50%;
            background: rgba(99, 102, 241, 0.12);
            border: 1px dashed var(--accent-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--accent-primary);
          }
          .empty-title {
            font-size: 1.2rem;
            font-weight: 700;
          }
          .empty-text {
            font-size: 0.88rem;
            color: var(--text-secondary);
            line-height: 1.5;
            max-width: 320px;
          }
          .empty-hints {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            text-align: left;
            margin-top: 1rem;
            background: rgba(255, 255, 255, 0.03);
            padding: 1rem;
            border-radius: var(--radius-md);
            width: 100%;
          }
          .empty-hint-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.8rem;
            color: var(--text-secondary);
          }
          .hint-check {
            color: var(--accent-emerald);
            flex-shrink: 0;
          }
          .itinerary-items-stack {
            display: flex;
            flex-direction: column;
            gap: 0.9rem;
          }
          .itinerary-item-card {
            display: flex;
            gap: 0.85rem;
            padding: 0.85rem;
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            position: relative;
            background: rgba(18, 24, 38, 0.6);
            transition: var(--transition-fast);
          }
          .itinerary-item-card:hover {
            border-color: var(--border-accent);
            transform: translateY(-2px);
          }
          .item-order-pill {
            position: absolute;
            top: -6px;
            left: 10px;
            background: var(--accent-primary);
            color: #ffffff;
            font-size: 0.7rem;
            font-weight: 800;
            padding: 0.1rem 0.45rem;
            border-radius: var(--radius-full);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
          }
          .item-thumb-wrapper {
            width: 74px;
            height: 74px;
            border-radius: var(--radius-sm);
            overflow: hidden;
            flex-shrink: 0;
            border: 1px solid var(--border-subtle);
          }
          .item-thumb {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .item-details {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }
          .item-tag-row {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            flex-wrap: wrap;
          }
          .item-country-badge {
            font-size: 0.68rem;
            font-weight: 700;
            color: #38bdf8;
            background: rgba(56, 189, 248, 0.12);
            padding: 0.1rem 0.4rem;
            border-radius: 4px;
          }
          .item-cat-badge {
            font-size: 0.68rem;
            color: var(--text-muted);
          }
          .item-name {
            font-size: 0.95rem;
            font-weight: 700;
            color: var(--text-primary);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
          }
          .item-name:hover {
            color: var(--accent-primary);
          }
          .item-meta-row {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            font-size: 0.75rem;
            color: var(--text-secondary);
          }
          .item-loc, .item-hours {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .item-card-actions {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            margin-top: 0.35rem;
          }
          .item-map-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            font-size: 0.72rem;
            font-weight: 600;
            color: #38bdf8;
            background: rgba(56, 189, 248, 0.1);
            padding: 0.2rem 0.55rem;
            border-radius: 4px;
            transition: var(--transition-fast);
          }
          .item-map-btn:hover {
            background: rgba(56, 189, 248, 0.25);
          }
          .item-remove-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            font-size: 0.72rem;
            font-weight: 600;
            color: #f87171;
            padding: 0.2rem 0.55rem;
            border-radius: 4px;
            transition: var(--transition-fast);
          }
          .item-remove-btn:hover {
            background: rgba(244, 63, 94, 0.15);
            color: #f43f5e;
          }
          .itinerary-footer {
            padding: 1rem 1.4rem;
            border-top: 1px solid var(--border-subtle);
            background: rgba(18, 24, 38, 0.5);
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .btn-clear-all {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.78rem;
            color: var(--text-muted);
            transition: color 0.2s ease;
          }
          .btn-clear-all:hover {
            color: #f43f5e;
          }
          .footer-auto-saved {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            font-size: 0.75rem;
            color: var(--accent-emerald);
          }

          /* Print / PDF Media Styles */
          @media print {
            body * {
              visibility: hidden;
            }
            #travel-itinerary-drawer, #travel-itinerary-drawer * {
              visibility: visible;
            }
            #travel-itinerary-drawer {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              max-width: 100%;
              border: none;
              background: #ffffff !important;
              color: #000000 !important;
              box-shadow: none !important;
            }
            .drawer-close-btn, .itinerary-actions-bar, .item-remove-btn, .btn-clear-all {
              display: none !important;
            }
            .itinerary-item-card {
              background: #f8fafc !important;
              color: #000000 !important;
              border: 1px solid #cbd5e1 !important;
              break-inside: avoid;
              margin-bottom: 12px;
            }
            .item-name {
              color: #000000 !important;
            }
            .item-meta-row {
              color: #334155 !important;
            }
          }
        `}</style>
      </aside>
    </div>
  );
}
