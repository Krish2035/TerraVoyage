import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Globe2, 
  MapPin, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sparkles, 
  Compass, 
  Users, 
  TrendingUp, 
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { getCountryCoordinates } from '../services/worldCoordinates';

export default function InteractiveWorldMap({
  countries = [],
  selectedCountry,
  onSelectCountry,
  searchQuery = '',
  selectedRegion = 'all'
}) {
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Map dimensions
  const mapWidth = 1000;
  const mapHeight = 520;

  // Convert lat/lng to (x, y) coordinates on the map
  const projectCoords = (lat, lng) => {
    // Equirectangular projection
    const x = ((lng + 180) / 360) * mapWidth;
    const y = ((90 - lat) / 180) * mapHeight;
    return { x, y };
  };

  // Zoom controls
  const handleZoomIn = () => setZoom(z => Math.min(z + 0.35, 3.5));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.35, 0.75));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Pan / Drag handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Filter countries matching search or region
  const mappedCountries = useMemo(() => {
    return countries.map(country => {
      const coords = getCountryCoordinates(country);
      const { x, y } = projectCoords(coords.lat, coords.lng);
      
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
        country.name.toLowerCase().includes(q) || 
        country.code.toLowerCase().includes(q) || 
        country.capital?.toLowerCase().includes(q);

      const matchesRegion = selectedRegion === 'all' || 
        (country.region && country.region.toLowerCase() === selectedRegion.toLowerCase());

      return {
        ...country,
        mapX: x,
        mapY: y,
        isMatch: matchesSearch && matchesRegion,
        isMuted: (!matchesSearch || !matchesRegion) && (searchQuery !== '' || selectedRegion !== 'all')
      };
    });
  }, [countries, searchQuery, selectedRegion]);

  return (
    <div className="interactive-map-wrapper glass-panel">
      {/* Top Map Control Bar */}
      <div className="map-toolbar">
        <div className="map-title-badge">
          <Globe2 size={16} className="map-globe-icon" />
          <span>Interactive Global Geo-Registry</span>
          <span className="map-stat-pill">{countries.length} Nations Plotted</span>
        </div>

        <div className="map-zoom-controls">
          <button 
            type="button" 
            onClick={handleZoomIn} 
            className="btn-map-control" 
            title="Zoom In (+)"
          >
            <ZoomIn size={15} />
          </button>
          <button 
            type="button" 
            onClick={handleZoomOut} 
            className="btn-map-control" 
            title="Zoom Out (-)"
          >
            <ZoomOut size={15} />
          </button>
          <button 
            type="button" 
            onClick={handleReset} 
            className="btn-map-control" 
            title="Reset Map View"
          >
            <RotateCcw size={14} />
          </button>
          <span className="zoom-indicator">{Math.round(zoom * 100)}%</span>
        </div>
      </div>

      {/* Interactive Map Viewport */}
      <div 
        ref={containerRef}
        className={`map-viewport ${isDragging ? 'is-dragging' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg 
          viewBox={`0 0 ${mapWidth} ${mapHeight}`} 
          className="world-map-svg"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center'
          }}
        >
          <defs>
            {/* Holographic cyber-grid and gradients */}
            <radialGradient id="globeAtmosphere" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0d1527" stopOpacity="0.8" />
              <stop offset="85%" stopColor="#070a12" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#030508" stopOpacity="1" />
            </radialGradient>

            <pattern id="cyberGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(99, 102, 241, 0.08)" strokeWidth="1" />
              <circle cx="0" cy="0" r="1.5" fill="rgba(56, 189, 248, 0.25)" />
            </pattern>
          </defs>

          {/* Map Background Grid */}
          <rect width={mapWidth} height={mapHeight} fill="url(#globeAtmosphere)" />
          <rect width={mapWidth} height={mapHeight} fill="url(#cyberGrid)" />

          {/* Latitude and Longitude Grid Lines */}
          <line x1="0" y1={mapHeight / 2} x2={mapWidth} y2={mapHeight / 2} stroke="rgba(56, 189, 248, 0.18)" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1={mapWidth / 2} y1="0" x2={mapWidth / 2} y2={mapHeight} stroke="rgba(56, 189, 248, 0.18)" strokeWidth="1.2" strokeDasharray="4 4" />

          {/* Continents Geometric Outlines / Silhouettes */}
          <g className="continents-layer" fill="rgba(30, 41, 59, 0.65)" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1">
            {/* North America */}
            <path d="M 120,60 L 220,50 L 290,90 L 260,170 L 220,190 L 190,260 L 150,230 L 130,160 Z" />
            {/* South America */}
            <path d="M 230,280 L 320,290 L 340,360 L 280,480 L 240,430 L 220,330 Z" />
            {/* Europe */}
            <path d="M 450,90 L 580,80 L 590,140 L 520,180 L 460,160 L 440,110 Z" />
            {/* Africa */}
            <path d="M 450,190 L 570,190 L 610,260 L 580,380 L 520,440 L 460,330 L 440,240 Z" />
            {/* Asia */}
            <path d="M 590,80 L 860,70 L 890,180 L 820,280 L 710,290 L 680,240 L 610,180 Z" />
            {/* Australia / Oceania */}
            <path d="M 780,350 L 890,340 L 920,400 L 860,460 L 770,420 Z" />
          </g>

          {/* Interactive Country Beacons */}
          <g className="country-beacons-layer">
            {mappedCountries.map(country => {
              const isSelected = selectedCountry?.id === country.id;
              const isHovered = hoveredCountry?.id === country.id;
              const isMatch = country.isMatch;

              return (
                <g 
                  key={country.id}
                  transform={`translate(${country.mapX}, ${country.mapY})`}
                  className={`map-beacon-group ${country.isMuted ? 'beacon-muted' : ''} ${isMatch ? 'beacon-matched' : ''}`}
                  onClick={() => onSelectCountry(country)}
                  onMouseEnter={(e) => {
                    const rect = containerRef.current.getBoundingClientRect();
                    setHoveredCountry(country);
                    setTooltipPos({
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top
                    });
                  }}
                  onMouseMove={(e) => {
                    const rect = containerRef.current.getBoundingClientRect();
                    setTooltipPos({
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top
                    });
                  }}
                  onMouseLeave={() => setHoveredCountry(null)}
                >
                  {/* Radar Pulse animation for matching or hovered pin */}
                  {(isMatch || isHovered || isSelected) && (
                    <circle 
                      r="12" 
                      fill="none" 
                      stroke={isSelected ? '#38bdf8' : (isHovered ? '#10b981' : '#6366f1')} 
                      strokeWidth="1.5"
                      className="radar-pulse-ring"
                    />
                  )}

                  {/* Outer glow */}
                  <circle 
                    r={isSelected ? 6 : (isHovered ? 5 : 3.5)} 
                    fill={isSelected ? '#38bdf8' : (isHovered ? '#10b981' : (isMatch ? '#818cf8' : 'rgba(148, 163, 184, 0.45)'))}
                    className="beacon-core"
                  />

                  {/* Center Dot */}
                  <circle 
                    r={isSelected ? 3 : 2} 
                    fill="#ffffff" 
                  />

                  {/* Micro label for highlighted countries */}
                  {(isMatch || isSelected || isHovered) && zoom >= 1.2 && (
                    <text 
                      x="8" 
                      y="3" 
                      fill="#ffffff" 
                      fontSize="9" 
                      fontWeight="700"
                      className="beacon-text"
                    >
                      {country.name}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Hover Tooltip Card */}
        {hoveredCountry && (
          <div 
            className="map-hover-tooltip glass-panel animate-scale-in"
            style={{
              left: `${tooltipPos.x + 14}px`,
              top: `${tooltipPos.y + 14}px`
            }}
          >
            <div className="tooltip-header">
              <img 
                src={hoveredCountry.flagSvg || hoveredCountry.flag} 
                alt={hoveredCountry.name} 
                className="tooltip-flag"
              />
              <div className="tooltip-titles">
                <span className="tooltip-code">{hoveredCountry.code} • {hoveredCountry.region}</span>
                <strong className="tooltip-name">{hoveredCountry.name}</strong>
              </div>
            </div>

            <div className="tooltip-stats">
              <div className="tooltip-stat-item">
                <span className="tt-label">Capital:</span>
                <span className="tt-val">{hoveredCountry.capital}</span>
              </div>
              <div className="tooltip-stat-item">
                <span className="tt-label">GDP:</span>
                <span className="tt-val">{hoveredCountry.gdp}</span>
              </div>
              <div className="tooltip-stat-item">
                <span className="tt-label">Attractions:</span>
                <span className="tt-val-highlight">{(hoveredCountry.attractions || []).length} Premier</span>
              </div>
            </div>

            <div className="tooltip-footer">
              <span>Click to view full country profile</span>
              <ArrowRight size={12} />
            </div>
          </div>
        )}
      </div>

      {/* Map Hint Footer */}
      <div className="map-footer-bar">
        <div className="map-legend">
          <span className="legend-item">
            <span className="legend-dot dot-cyan"></span> Active Nation
          </span>
          <span className="legend-item">
            <span className="legend-dot dot-indigo"></span> Matched Filter
          </span>
          <span className="legend-item">
            <span className="legend-dot dot-emerald"></span> Hovered
          </span>
        </div>
        <span className="map-hint-text">
          Drag to pan map • Click any beacon to open country profile
        </span>
      </div>

      <style>{`
        .interactive-map-wrapper {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid rgba(99, 102, 241, 0.25);
          border-radius: var(--radius-lg);
          background: rgba(7, 9, 14, 0.85);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
        }
        .map-toolbar {
          padding: 0.85rem 1.4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          background: rgba(18, 24, 38, 0.6);
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .map-title-badge {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .map-globe-icon {
          color: #38bdf8;
          animation: spin 35s linear infinite;
        }
        .map-stat-pill {
          font-size: 0.72rem;
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.12);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          font-weight: 700;
        }
        .map-zoom-controls {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .btn-map-control {
          width: 30px;
          height: 30px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }
        .btn-map-control:hover {
          background: var(--accent-primary);
          color: #ffffff;
          border-color: var(--accent-primary);
        }
        .zoom-indicator {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
          margin-left: 0.3rem;
          min-width: 40px;
        }
        .map-viewport {
          position: relative;
          width: 100%;
          height: 480px;
          overflow: hidden;
          cursor: grab;
          user-select: none;
        }
        .map-viewport.is-dragging {
          cursor: grabbing;
        }
        .world-map-svg {
          width: 100%;
          height: 100%;
          display: block;
          transition: transform 0.08s ease-out;
        }
        .radar-pulse-ring {
          animation: radarRing 2s ease-out infinite;
          transform-origin: center;
        }
        @keyframes radarRing {
          0% { r: 4px; opacity: 1; }
          100% { r: 18px; opacity: 0; }
        }
        .map-beacon-group {
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .map-beacon-group:hover {
          transform: scale(1.3);
        }
        .beacon-muted {
          opacity: 0.25;
        }
        .beacon-text {
          text-shadow: 0 1px 4px #000000;
          pointer-events: none;
        }
        .map-hover-tooltip {
          position: absolute;
          z-index: 50;
          pointer-events: none;
          padding: 0.75rem 1rem;
          min-width: 210px;
          border: 1px solid var(--border-accent);
          background: rgba(13, 17, 23, 0.95);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
          border-radius: var(--radius-md);
        }
        .tooltip-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .tooltip-flag {
          width: 32px;
          height: 22px;
          object-fit: cover;
          border-radius: 3px;
        }
        .tooltip-titles {
          display: flex;
          flex-direction: column;
        }
        .tooltip-code {
          font-size: 0.68rem;
          color: #38bdf8;
          font-weight: 700;
        }
        .tooltip-name {
          font-size: 0.88rem;
          color: var(--text-primary);
        }
        .tooltip-stats {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-size: 0.75rem;
        }
        .tooltip-stat-item {
          display: flex;
          justify-content: space-between;
          color: var(--text-secondary);
        }
        .tt-label {
          color: var(--text-muted);
        }
        .tt-val {
          color: var(--text-primary);
          font-weight: 600;
        }
        .tt-val-highlight {
          color: var(--accent-emerald);
          font-weight: 700;
        }
        .tooltip-footer {
          margin-top: 0.5rem;
          padding-top: 0.4rem;
          border-top: 1px dashed var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.68rem;
          color: #38bdf8;
          font-weight: 600;
        }
        .map-footer-bar {
          padding: 0.75rem 1.4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(18, 24, 38, 0.5);
          border-top: 1px solid var(--border-subtle);
          font-size: 0.75rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .map-legend {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--text-secondary);
        }
        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .dot-cyan { background: #38bdf8; box-shadow: 0 0 6px #38bdf8; }
        .dot-indigo { background: #818cf8; box-shadow: 0 0 6px #818cf8; }
        .dot-emerald { background: #10b981; box-shadow: 0 0 6px #10b981; }
        .map-hint-text {
          color: var(--text-muted);
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
