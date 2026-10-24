import React, { useRef, useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Globe2,
  LayoutGrid,
  Columns,
  Compass,
  Sparkles
} from 'lucide-react';
import InteractiveWorldMap from './InteractiveWorldMap';

const REGIONS = [
  'all', 
  'Asia', 
  'Europe', 
  'Africa', 
  'North America', 
  'South America', 
  'Oceania', 
  'Middle East'
];

export default function CountrySelector({
  countries,
  selectedCountry,
  onSelectCountry,
  searchQuery,
  onSearchChange,
  selectedRegion,
  onRegionChange,
  sortBy,
  onSortChange
}) {
  const scrollRowRef = useRef(null);
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' | 'grid'

  const scroll = (direction) => {
    if (scrollRowRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleWheel = (e) => {
    if (scrollRowRef.current) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        // Map vertical scroll wheel to horizontal scroll when hovering over the carousel
        scrollRowRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && countries.length > 0) {
      onSelectCountry(countries[0]);
    }
  };

  return (
    <section className="selector-section glass-panel">
      {/* Top Header of Selector with Counter, View Toggle and Navigation Arrows */}
      <div className="selector-header-row">
        <div className="selector-title-badge">
          <Globe2 size={16} className="globe-badge-icon" />
          <span className="badge-text">
            All Nations of the World 
            <span className="count-number">({countries.length} Loaded)</span>
          </span>
        </div>

        <div className="selector-right-controls">
          <div className="view-mode-toggle">
            <button
              type="button"
              className={`view-mode-btn ${viewMode === 'carousel' ? 'active' : ''}`}
              onClick={() => setViewMode('carousel')}
              title="Carousel Mode (Default)"
            >
              <Columns size={14} />
              <span>Carousel</span>
            </button>
            <button
              type="button"
              className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid Mode (All Nations)"
            >
              <LayoutGrid size={14} />
              <span>Grid</span>
            </button>
            <button
              type="button"
              className={`view-mode-btn ${viewMode === 'map' ? 'active' : ''}`}
              onClick={() => setViewMode('map')}
              title="Interactive World Map Radar"
              id="btn-view-mode-map"
            >
              <Compass size={14} />
              <span>World Map</span>
            </button>
          </div>

          {viewMode === 'carousel' && (
            <div className="carousel-nav-controls">
              <button 
                type="button"
                onClick={() => scroll('left')} 
                className="carousel-arrow-btn"
                title="Scroll Left"
                aria-label="Scroll countries left"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                type="button"
                onClick={() => scroll('right')} 
                className="carousel-arrow-btn"
                title="Scroll Right"
                aria-label="Scroll countries right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="filter-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search all countries by name, capital, or code... (Press '/' to focus)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="search-input"
            id="input-search-countries"
          />
          {searchQuery && (
            <button 
              type="button"
              onClick={() => onSearchChange('')} 
              className="clear-search-btn"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="sort-wrapper">
          <SlidersHorizontal size={15} className="sort-icon" />
          <span className="sort-label">Sort:</span>
          <select 
            value={sortBy} 
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-select"
            id="select-sort-by"
          >
            <option value="name">Name (A-Z)</option>
            <option value="population">Population (High to Low)</option>
            <option value="gdp">GDP (High to Low)</option>
            <option value="perCapita">Per Capita Income</option>
          </select>
        </div>
      </div>

      {/* Region Chips */}
      <div className="region-pills">
        {REGIONS.map((region) => {
          const isActive = selectedRegion === region;
          return (
            <button
              key={region}
              type="button"
              onClick={() => onRegionChange(region)}
              className={`region-pill ${isActive ? 'active' : ''}`}
            >
              {region === 'all' ? 'All Continents' : region}
            </button>
          );
        })}
      </div>

      {/* Countries Display: Map Mode OR Carousel / Grid Mode */}
      {viewMode === 'map' ? (
        <InteractiveWorldMap
          countries={countries}
          selectedCountry={selectedCountry}
          onSelectCountry={onSelectCountry}
          selectedRegion={selectedRegion}
          searchQuery={searchQuery}
        />
      ) : (
        <div 
          className={viewMode === 'carousel' ? 'countries-scroll-row' : 'countries-grid-view'} 
          ref={viewMode === 'carousel' ? scrollRowRef : null}
          onWheel={viewMode === 'carousel' ? handleWheel : undefined}
        >
          {countries.map((country) => {
            const isSelected = selectedCountry?.id === country.id;
            return (
              <div
                key={country.id}
                onClick={() => onSelectCountry(country)}
                className={`country-card ${isSelected ? 'selected' : ''}`}
                id={`country-card-${country.code.toLowerCase()}`}
                title={`Click to open full profile & tourist destinations of ${country.name}`}
              >
                <div className="country-flag-box">
                  <img 
                    src={country.flagSvg || country.flag} 
                    alt={`${country.name} flag`} 
                    className="country-flag-img"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback flag format
                      e.target.src = `https://flagcdn.com/w320/${country.code.toLowerCase()}.png`;
                    }}
                  />
                  <span className="country-code-badge">{country.code}</span>
                  {isSelected && (
                    <span className="selected-badge">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                </div>

                <div className="country-meta">
                  <h3 className="country-name" title={country.name}>{country.name}</h3>
                  <span className="country-capital" title={country.capital}>
                    <MapPin size={11} /> {country.capital || 'Capital'}
                  </span>
                </div>
              </div>
            );
          })}

          {countries.length === 0 && (
            <div className="no-countries-found">
              <p>No countries found matching "{searchQuery}".</p>
            </div>
          )}
        </div>
      )}

      <style>{`
        .selector-section {
          padding: 1.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .selector-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.35rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .selector-title-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-primary);
          font-weight: 700;
          font-size: 0.92rem;
        }
        .globe-badge-icon {
          color: #38bdf8;
        }
        .count-number {
          color: var(--accent-gold);
          font-weight: 600;
          margin-left: 0.35rem;
          font-size: 0.82rem;
        }
        .selector-right-controls {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .view-mode-toggle {
          display: flex;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 2px;
        }
        .view-mode-btn {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
          color: var(--text-muted);
          font-size: 0.78rem;
          font-weight: 600;
          transition: var(--transition-fast);
          cursor: pointer;
        }
        .view-mode-btn:hover {
          color: var(--text-primary);
        }
        .view-mode-btn.active {
          background: var(--accent-primary);
          color: #ffffff;
          box-shadow: 0 2px 8px var(--accent-glow);
        }
        .carousel-nav-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .carousel-arrow-btn {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
          cursor: pointer;
        }
        .carousel-arrow-btn:hover {
          color: #ffffff;
          background: var(--accent-primary);
          border-color: var(--accent-primary);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px var(--accent-glow);
        }
        .filter-bar {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
        }
        .search-input-wrapper {
          position: relative;
          flex: 1;
          min-width: 280px;
          display: flex;
          align-items: center;
        }
        .search-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-muted);
          pointer-events: none;
        }
        .search-input {
          width: 100%;
          background: var(--bg-input);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.65rem 2.4rem 0.65rem 2.75rem;
          color: var(--text-primary);
          font-size: 0.95rem;
          transition: var(--transition-fast);
        }
        .search-input:focus {
          border-color: var(--border-focus);
          box-shadow: 0 0 0 3px var(--accent-glow);
        }
        .clear-search-btn {
          position: absolute;
          right: 0.85rem;
          color: var(--text-muted);
          font-size: 0.85rem;
          cursor: pointer;
        }
        .sort-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-card);
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }
        .sort-icon {
          color: var(--accent-primary);
        }
        .sort-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .sort-select {
          background: transparent;
          color: var(--text-primary);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
        }
        .sort-select option {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
        .region-pills {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.35rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(99, 102, 241, 0.3) transparent;
        }
        .region-pills::-webkit-scrollbar {
          height: 4px;
        }
        .region-pills::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 999px;
        }
        .region-pill {
          padding: 0.35rem 0.95rem;
          border-radius: var(--radius-full);
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-weight: 600;
          white-space: nowrap;
          transition: var(--transition-fast);
          cursor: pointer;
        }
        .region-pill:hover {
          color: var(--text-primary);
          border-color: var(--border-accent);
        }
        .region-pill.active {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(6, 182, 212, 0.25));
          border-color: var(--accent-primary);
          color: #38bdf8;
          font-weight: 700;
        }

        /* Sleek Modern Horizontal Scrollable Country Row */
        .countries-scroll-row {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 0.5rem 0.25rem 1rem 0.25rem;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          /* Firefox custom scrollbar styling */
          scrollbar-width: thin;
          scrollbar-color: rgba(99, 102, 241, 0.5) rgba(15, 22, 36, 0.6);
        }

        /* Modern Responsive Grid View for Countries */
        .countries-grid-view {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
          gap: 1rem;
          max-height: 680px;
          overflow-y: auto;
          padding: 0.5rem 0.25rem 1rem 0.25rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(99, 102, 241, 0.5) rgba(15, 22, 36, 0.6);
        }

        /* WebKit / Blink / Chrome / Edge Custom Horizontal Scrollbar */
        .countries-scroll-row::-webkit-scrollbar {
          height: 8px;
        }
        .countries-scroll-row::-webkit-scrollbar-track {
          background: rgba(15, 22, 36, 0.7);
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .countries-scroll-row::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #6366f1, #38bdf8);
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.4);
          transition: background 0.2s ease;
        }
        .countries-scroll-row::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(90deg, #4f46e5, #0ea5e9);
          box-shadow: 0 0 14px rgba(99, 102, 241, 0.8);
        }
        .countries-scroll-row::-webkit-scrollbar-button {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }

        .country-card {
          min-width: 155px;
          max-width: 165px;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.75rem;
          cursor: pointer;
          transition: var(--transition-normal);
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          position: relative;
          flex-shrink: 0;
        }
        .country-card:hover {
          transform: translateY(-3px);
          border-color: var(--border-accent);
          background: var(--bg-card-hover);
          box-shadow: var(--shadow-md);
        }
        .country-card.selected {
          border-color: var(--accent-primary);
          background: linear-gradient(180deg, rgba(99, 102, 241, 0.2) 0%, rgba(18, 24, 38, 0.95) 100%);
          box-shadow: 0 0 20px var(--accent-glow);
          transform: translateY(-2px);
        }
        .country-flag-box {
          position: relative;
          width: 100%;
          height: 85px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: #000;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .country-flag-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .country-card:hover .country-flag-img {
          transform: scale(1.08);
        }
        .country-code-badge {
          position: absolute;
          bottom: 4px;
          right: 4px;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          letter-spacing: 0.05em;
        }
        .selected-badge {
          position: absolute;
          top: 4px;
          left: 4px;
          background: var(--accent-primary);
          color: #ffffff;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px var(--accent-primary);
        }
        .country-meta {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .country-name {
          font-size: 0.95rem;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .country-capital {
          font-size: 0.78rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.25rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .no-countries-found {
          padding: 2.5rem;
          color: var(--text-muted);
          font-size: 0.95rem;
          width: 100%;
          text-align: center;
        }

        /* Tablet Responsive Viewports (<= 768px) */
        @media (max-width: 768px) {
          .selector-section {
            padding: 1.15rem;
          }
          .selector-header-row {
            flex-direction: column;
            align-items: stretch;
            gap: 0.85rem;
          }
          .selector-right-controls {
            width: 100%;
            justify-content: space-between;
          }
          .countries-grid-view {
            grid-template-columns: repeat(auto-fill, minmax(135px, 1fr));
            gap: 0.75rem;
            max-height: 580px;
          }
        }

        /* Mobile Phone Viewports (<= 640px) */
        @media (max-width: 640px) {
          .selector-section {
            padding: 0.85rem;
            border-radius: var(--radius-md);
          }
          .filter-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 0.65rem;
          }
          .search-input-wrapper {
            min-width: 0;
            width: 100%;
          }
          .sort-wrapper {
            width: 100%;
            justify-content: space-between;
          }
          .country-card {
            min-width: 140px;
            max-width: 155px;
            padding: 0.65rem;
          }
          .country-flag-box {
            height: 75px;
          }
        }

        /* Small Phones (<= 420px) */
        @media (max-width: 420px) {
          .view-mode-btn span {
            display: none;
          }
          .countries-grid-view {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.6rem;
          }
          .countries-grid-view .country-card {
            min-width: 0;
            max-width: none;
          }
        }
      `}</style>
    </section>
  );
}
