import React, { useState, useMemo } from 'react';
import { CAPITAL_COORDINATES } from '../services/weatherService';
import { 
  MapPin, 
  Search, 
  ExternalLink, 
  Globe2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Sparkles,
  Users
} from 'lucide-react';

export default function WorldMapView({
  countries,
  onSelectCountry,
  selectedRegion,
  searchQuery
}) {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  // Filter countries by region and search
  const visibleCountries = useMemo(() => {
    return countries.filter(c => {
      const matchRegion = selectedRegion === 'all' || 
        c.region?.toLowerCase() === selectedRegion.toLowerCase() ||
        (selectedRegion === 'Middle East' && (c.region === 'Middle East' || c.subregion === 'Western Asia'));
      
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        c.name.toLowerCase().includes(q) || 
        c.code.toLowerCase().includes(q) ||
        (c.capital && c.capital.toLowerCase().includes(q));

      return matchRegion && matchSearch;
    });
  }, [countries, selectedRegion, searchQuery]);

  // Map latitude/longitude [-90 to 90, -180 to 180] to SVG viewBox [width 1000, height 500]
  // Equirectangular projection
  const getCoordinatesPosition = (code, countryName, index) => {
    const coords = CAPITAL_COORDINATES[code?.toUpperCase()];
    if (coords) {
      const x = ((coords.lon + 180) / 360) * 1000;
      const y = ((90 - coords.lat) / 180) * 500;
      return { x, y };
    }
    // Fallback deterministic distribution across world map
    const hash = (countryName || '').split('').reduce((acc, ch) => acc + ch.charCodeAt(0), index * 17);
    const x = 100 + (hash % 800);
    const y = 80 + ((hash * 7) % 340);
    return { x, y };
  };

  const handleZoom = (delta) => {
    setZoomLevel(prev => Math.min(2.5, Math.max(0.8, prev + delta)));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div className="world-map-container" id="interactive-world-map">
      {/* Map Header Toolbar */}
      <div className="map-toolbar">
        <div className="map-stats-badge">
          <Globe2 size={16} className="text-cyan" />
          <span>Interactive Globe Radar</span>
          <span className="dot-divider">•</span>
          <span className="active-count">{visibleCountries.length} Nations Plotted</span>
        </div>

        <div className="map-zoom-controls">
          <button 
            type="button" 
            onClick={() => handleZoom(0.3)} 
            className="zoom-btn"
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <button 
            type="button" 
            onClick={() => handleZoom(-0.3)} 
            className="zoom-btn"
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <button 
            type="button" 
            onClick={handleResetZoom} 
            className="zoom-btn"
            title="Reset Zoom"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div className="map-canvas-wrapper">
        <svg 
          viewBox="0 0 1000 500" 
          className="world-map-svg"
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
            transformOrigin: 'center center'
          }}
        >
          <defs>
            {/* Map Background Gradients */}
            <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#080c14" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(30, 41, 59, 0.7)" />
              <stop offset="100%" stopColor="rgba(51, 65, 85, 0.5)" />
            </linearGradient>

            <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ocean Base */}
          <rect width="1000" height="500" rx="16" fill="url(#oceanGrad)" />

          {/* Graticule / Latitude & Longitude Latice Lines */}
          <g className="map-graticule" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1">
            <line x1="0" y1="125" x2="1000" y2="125" />
            <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(56, 189, 248, 0.15)" strokeDasharray="4 4" />
            <line x1="0" y1="375" x2="1000" y2="375" />
            <line x1="250" y1="0" x2="250" y2="500" />
            <line x1="500" y1="0" x2="500" y2="500" stroke="rgba(56, 189, 248, 0.15)" strokeDasharray="4 4" />
            <line x1="750" y1="0" x2="750" y2="500" />
          </g>

          {/* Stylized Continents Shapes */}
          <g className="continent-paths" fill="url(#landGrad)" stroke="rgba(99, 102, 241, 0.25)" strokeWidth="1.2">
            {/* North America */}
            <path d="M 120 70 Q 180 50, 260 70 Q 280 120, 220 180 Q 180 200, 160 260 Q 130 220, 110 160 Z" />
            {/* South America */}
            <path d="M 220 270 Q 280 280, 290 340 Q 280 430, 240 470 Q 200 420, 210 330 Z" />
            {/* Europe */}
            <path d="M 450 70 Q 550 60, 560 140 Q 520 180, 460 170 Q 430 130, 450 70 Z" />
            {/* Africa */}
            <path d="M 440 190 Q 550 180, 570 260 Q 550 380, 500 420 Q 430 360, 430 250 Z" />
            {/* Asia */}
            <path d="M 570 60 Q 820 40, 860 140 Q 840 250, 720 280 Q 640 260, 580 170 Z" />
            {/* Oceania / Australia */}
            <path d="M 760 330 Q 870 320, 880 400 Q 820 440, 770 410 Z" />
          </g>

          {/* Country Radar Pins & Markers */}
          <g className="country-pins-group">
            {visibleCountries.map((country, idx) => {
              const pos = getCoordinatesPosition(country.code, country.name, idx);
              const isHovered = hoveredCountry?.id === country.id;

              return (
                <g 
                  key={country.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  className="country-marker-node"
                  onClick={() => onSelectCountry(country)}
                  onMouseEnter={() => setHoveredCountry(country)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  style={{ cursor: 'pointer' }}
                  id={`map-pin-${country.code.toLowerCase()}`}
                >
                  {/* Outer Radar Pulse */}
                  <circle 
                    r={isHovered ? 14 : 7} 
                    fill="url(#pinGlow)" 
                    className={isHovered ? 'radar-pulse-active' : 'radar-pulse'}
                  />

                  {/* Pin Dot */}
                  <circle 
                    r={isHovered ? 5.5 : 3.5} 
                    fill={isHovered ? '#38bdf8' : '#818cf8'} 
                    stroke="#ffffff" 
                    strokeWidth={isHovered ? 2 : 1}
                  />

                  {/* Mini country code label */}
                  {(isHovered || zoomLevel > 1.4) && (
                    <text 
                      y="-10" 
                      textAnchor="middle" 
                      fill="#ffffff" 
                      fontSize="9" 
                      fontWeight="700"
                      className="map-code-tag"
                    >
                      {country.code}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Floating Tooltip when hovering over a Country */}
        {hoveredCountry && (
          <div className="map-country-tooltip animate-fade-in">
            <div className="tooltip-top-row">
              <img 
                src={hoveredCountry.flagSvg || hoveredCountry.flag} 
                alt={`${hoveredCountry.name} flag`} 
                className="tooltip-flag"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="tooltip-country-name">{hoveredCountry.name}</h4>
                <span className="tooltip-capital">
                  <MapPin size={11} /> {hoveredCountry.capital || 'Capital'} • {hoveredCountry.region}
                </span>
              </div>
            </div>

            <div className="tooltip-stats-row">
              <div className="tooltip-stat">
                <span className="t-label">Population</span>
                <span className="t-val">{hoveredCountry.population}</span>
              </div>
              <div className="tooltip-stat">
                <span className="t-label">GDP</span>
                <span className="t-val">{hoveredCountry.gdp}</span>
              </div>
              <div className="tooltip-stat">
                <span className="t-label">Destinations</span>
                <span className="t-val text-cyan">{hoveredCountry.attractions?.length || 0} Places</span>
              </div>
            </div>

            <button 
              type="button" 
              onClick={() => onSelectCountry(hoveredCountry)}
              className="btn-tooltip-navigate"
            >
              <span>Explore Country Profile</span>
              <ExternalLink size={13} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        .world-map-container {
          background: rgba(10, 14, 23, 0.85);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
          box-shadow: var(--shadow-md);
        }
        .map-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .map-stats-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .text-cyan {
          color: #38bdf8;
        }
        .dot-divider {
          color: var(--text-muted);
        }
        .active-count {
          color: #10b981;
          font-weight: 700;
        }
        .map-zoom-controls {
          display: flex;
          gap: 0.4rem;
        }
        .zoom-btn {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .zoom-btn:hover {
          background: rgba(99, 102, 241, 0.15);
          color: #38bdf8;
          border-color: var(--border-accent);
        }
        .map-canvas-wrapper {
          position: relative;
          width: 100%;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #080c14;
          box-shadow: inset 0 0 25px rgba(0, 0, 0, 0.8);
        }
        .world-map-svg {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .country-marker-node:hover circle:first-child {
          animation: pulseMarker 1.2s infinite;
        }
        @keyframes pulseMarker {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.8); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        .map-code-tag {
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
          pointer-events: none;
        }
        .map-country-tooltip {
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
          width: 320px;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-md);
          padding: 1.15rem;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          z-index: 20;
          pointer-events: auto;
        }
        .tooltip-top-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .tooltip-flag {
          width: 44px;
          height: 30px;
          object-fit: cover;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }
        .tooltip-country-name {
          font-size: 1.05rem;
          font-weight: 800;
          margin: 0;
          color: var(--text-highlight);
        }
        .tooltip-capital {
          font-size: 0.76rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin-top: 0.15rem;
        }
        .tooltip-stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: var(--radius-sm);
          padding: 0.55rem;
          text-align: center;
        }
        .t-label {
          display: block;
          font-size: 0.68rem;
          color: var(--text-muted);
        }
        .t-val {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 0.1rem;
        }
        .btn-tooltip-navigate {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.55rem;
          background: linear-gradient(135deg, var(--accent-primary), #38bdf8);
          color: #ffffff;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          border: none;
          transition: var(--transition-fast);
        }
        .btn-tooltip-navigate:hover {
          opacity: 0.92;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
