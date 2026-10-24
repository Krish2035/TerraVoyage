import React, { useState, useMemo, useEffect } from 'react';
import { 
  Landmark, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Plus, 
  Info, 
  Search, 
  Filter, 
  ChevronDown,
  Navigation,
  ExternalLink,
  Camera,
  CheckCircle2,
  Footprints,
  Globe2
} from 'lucide-react';
import { 
  getInitialGenuineImage, 
  fetchGenuinePlaceImage, 
  getGoogleMapsUrl,
  getGoogleStreetViewUrl,
  getGoogleEarth3DUrl
} from '../services/genuineImageService';

export default function AttractionsSection({ 
  country, 
  onSelectAttraction,
  onOpenAddAttraction
}) {
  const [attractionSearch, setAttractionSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(18);

  if (!country) return null;

  const rawAttractions = country.attractions || [];

  // Extract unique categories for filter pills
  const categories = useMemo(() => {
    const cats = new Set();
    rawAttractions.forEach(a => {
      if (a.category) {
        // Group or split into clean badges
        if (a.category.includes('Jyotirlinga')) cats.add('12 Jyotirlinga');
        else if (a.category.includes('Seven Sisters')) cats.add('Seven Sisters & Northeast');
        else if (a.category.includes('UNESCO') || a.category.includes('Cave')) cats.add('UNESCO & Caves');
        else if (a.category.includes('Fort') || a.category.includes('Palace') || a.category.includes('Rajput')) cats.add('Forts & Palaces');
        else if (a.category.includes('Sacred') || a.category.includes('Shrine') || a.category.includes('Spiritual')) cats.add('Sacred & Spiritual');
        else if (a.category.includes('Park') || a.category.includes('Nature') || a.category.includes('Wildlife')) cats.add('Nature & Wildlife');
        else if (a.category.includes('Beach') || a.category.includes('Coastal') || a.category.includes('Island')) cats.add('Coastal & Islands');
        else cats.add(a.category);
      }
    });
    return ['all', ...Array.from(cats)];
  }, [rawAttractions]);

  // Filtered attractions based on search and category
  const filteredAttractions = useMemo(() => {
    return rawAttractions.filter(attraction => {
      const q = attractionSearch.toLowerCase();
      const matchesSearch = !q || 
        attraction.name.toLowerCase().includes(q) || 
        attraction.location.toLowerCase().includes(q) || 
        (attraction.whyFamous && attraction.whyFamous.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (selectedCategory === 'all') return true;
      if (selectedCategory === '12 Jyotirlinga') return attraction.category?.includes('Jyotirlinga') || attraction.name?.includes('Jyotirlinga');
      if (selectedCategory === 'Seven Sisters & Northeast') return attraction.category?.includes('Seven Sisters') || attraction.specs?.region?.includes('Seven Sisters');
      if (selectedCategory === 'UNESCO & Caves') return attraction.category?.includes('UNESCO') || attraction.category?.includes('Cave');
      if (selectedCategory === 'Forts & Palaces') return attraction.category?.includes('Fort') || attraction.category?.includes('Palace') || attraction.category?.includes('Rajput');
      if (selectedCategory === 'Sacred & Spiritual') return attraction.category?.includes('Sacred') || attraction.category?.includes('Shrine') || attraction.category?.includes('Spiritual');
      if (selectedCategory === 'Nature & Wildlife') return attraction.category?.includes('Park') || attraction.category?.includes('Nature') || attraction.category?.includes('Wildlife');
      if (selectedCategory === 'Coastal & Islands') return attraction.category?.includes('Beach') || attraction.category?.includes('Coastal') || attraction.category?.includes('Island');
      
      return attraction.category === selectedCategory;
    });
  }, [rawAttractions, attractionSearch, selectedCategory]);

  const displayedAttractions = filteredAttractions.slice(0, visibleCount);

  return (
    <section className="attractions-container glass-panel animate-slide-up" id="attractions-section">
      {/* Section Header */}
      <div className="attractions-header">
        <div className="attractions-title-box">
          <div className="title-with-pill">
            <span className="section-pill">
              <Landmark size={14} />
              <span>Top Destinations</span>
            </span>
            <span className="count-pill">
              {rawAttractions.length} Premier Landmarks Loaded
            </span>
          </div>
          <h2 className="section-heading">
            World-Famous Tourist Destinations in <span className="highlight-text">{country.name}</span>
          </h2>
          <p className="section-subheading">
            Curated from Google Maps, global historical archives, and national registries. Click any destination to inspect verified architectural blueprints, authentic photos, and live Google Maps explorer.
          </p>
        </div>

        <button 
          onClick={onOpenAddAttraction}
          className="btn-secondary"
          id="btn-add-attraction"
        >
          <Plus size={16} />
          <span>Add Destination</span>
        </button>
      </div>

      {/* Internal Destination Search & Category Filter Bar */}
      <div className="attraction-filter-row">
        <div className="attraction-search-box">
          <Search size={16} className="attr-search-icon" />
          <input
            type="text"
            placeholder={`Search within ${rawAttractions.length}+ destinations (e.g. Jyotirlinga, Cave, Mumbai, Taj, Fort, Temple...)`}
            value={attractionSearch}
            onChange={(e) => {
              setAttractionSearch(e.target.value);
              setVisibleCount(18); // Reset pagination on new search
            }}
            className="attr-search-input"
            id="input-search-attractions"
          />
          {attractionSearch && (
            <button 
              type="button" 
              onClick={() => setAttractionSearch('')}
              className="clear-attr-search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="attr-category-pills">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleCount(18);
                }}
                className={`attr-cat-pill ${isActive ? 'active' : ''}`}
              >
                {cat === 'all' ? `All Destinations (${rawAttractions.length})` : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Famous Attractions */}
      {displayedAttractions.length > 0 ? (
        <>
          <div className="attractions-grid">
            {displayedAttractions.map((attraction, idx) => (
              <AttractionCardItem
                key={attraction.id || idx}
                attraction={attraction}
                country={country}
                onSelectAttraction={onSelectAttraction}
              />
            ))}
          </div>

          {/* Pagination / Load More Controls */}
          {visibleCount < filteredAttractions.length && (
            <div className="load-more-container">
              <button 
                type="button" 
                onClick={() => setVisibleCount(prev => prev + 24)}
                className="btn-load-more"
                id="btn-load-more-attractions"
              >
                <ChevronDown size={18} />
                <span>
                  Load More Destinations (Showing {displayedAttractions.length} of {filteredAttractions.length})
                </span>
              </button>
              <button 
                type="button" 
                onClick={() => setVisibleCount(filteredAttractions.length)}
                className="btn-show-all"
              >
                Show All ({filteredAttractions.length})
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="empty-attractions-box">
          <Info size={32} className="empty-icon" />
          <h3>No destinations found matching "{attractionSearch}".</h3>
          <p>Try clearing your filter or registering a new custom landmark.</p>
          <button 
            type="button" 
            onClick={() => { setAttractionSearch(''); setSelectedCategory('all'); }} 
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}

      <style>{`
        .attractions-container {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .attractions-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 1.5rem;
        }
        .attractions-title-box {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          max-width: 820px;
        }
        .title-with-pill {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .section-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: var(--accent-gold);
          font-size: 0.76rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .count-pill {
          font-size: 0.82rem;
          color: #38bdf8;
          font-weight: 600;
        }
        .section-heading {
          font-size: 1.85rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .highlight-text {
          background: linear-gradient(135deg, #6366f1, #38bdf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .section-subheading {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          border-radius: var(--radius-md);
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          font-weight: 600;
          font-size: 0.88rem;
          transition: var(--transition-fast);
        }
        .btn-secondary:hover {
          border-color: var(--border-accent);
          background: var(--bg-card-hover);
          transform: translateY(-1px);
        }

        /* Filter Row */
        .attraction-filter-row {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          background: rgba(15, 22, 36, 0.5);
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }
        .attraction-search-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }
        .attr-search-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-muted);
          pointer-events: none;
        }
        .attr-search-input {
          width: 100%;
          background: var(--bg-input);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 0.6rem 2.4rem 0.6rem 2.6rem;
          color: var(--text-primary);
          font-size: 0.92rem;
          transition: var(--transition-fast);
        }
        .attr-search-input:focus {
          border-color: var(--border-focus);
          box-shadow: 0 0 0 2px var(--accent-glow);
        }
        .clear-attr-search {
          position: absolute;
          right: 0.85rem;
          color: var(--text-muted);
          font-size: 0.85rem;
          cursor: pointer;
        }
        .attr-category-pills {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(99, 102, 241, 0.3) transparent;
        }
        .attr-category-pills::-webkit-scrollbar {
          height: 4px;
        }
        .attr-category-pills::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 999px;
        }
        .attr-cat-pill {
          padding: 0.3rem 0.85rem;
          border-radius: var(--radius-full);
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 600;
          white-space: nowrap;
          transition: var(--transition-fast);
          cursor: pointer;
        }
        .attr-cat-pill:hover {
          color: var(--text-primary);
          border-color: var(--border-accent);
        }
        .attr-cat-pill.active {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(99, 102, 241, 0.25));
          border-color: var(--accent-gold);
          color: #fef08a;
          font-weight: 700;
        }

        /* Grid */
        .attractions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
          gap: 1.75rem;
        }
        .attraction-card {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          overflow: hidden;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: var(--transition-normal);
          position: relative;
        }
        .attraction-card:hover {
          transform: translateY(-5px);
          border-color: var(--border-accent);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 0 25px var(--accent-glow);
        }
        .card-image-wrapper {
          position: relative;
          width: 100%;
          height: 210px;
          overflow: hidden;
          background: #000;
        }
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .attraction-card:hover .card-img {
          transform: scale(1.08);
        }
        .card-img-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(7, 9, 14, 0.9) 100%);
        }
        .card-top-overlay-row {
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          z-index: 5;
          pointer-events: none;
        }
        .category-pill {
          position: static;
          background: rgba(14, 20, 32, 0.88);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #f8fafc;
          font-size: 0.70rem;
          font-weight: 600;
          padding: 0.22rem 0.6rem;
          border-radius: var(--radius-full);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 42%;
          flex-shrink: 1;
          pointer-events: auto;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
        }
        .location-pill {
          position: absolute;
          bottom: 12px;
          left: 12px;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(6px);
          color: #cbd5e1;
          font-size: 0.72rem;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          max-width: 85%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .card-body {
          padding: 1.35rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex: 1;
        }
        .attraction-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
        }
        .why-famous-snippet {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          flex: 1;
        }
        .why-label {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.74rem;
          color: var(--accent-gold);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .why-icon {
          color: var(--accent-gold);
        }
        .why-text {
          font-size: 0.86rem;
          color: var(--text-secondary);
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-subtle);
          padding-top: 0.9rem;
          margin-top: auto;
        }
        .specs-indicator {
          font-size: 0.74rem;
          color: var(--text-muted);
        }
        .specs-trigger-btn {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: #38bdf8;
          font-size: 0.82rem;
          font-weight: 600;
          transition: var(--transition-fast);
        }
        .attraction-card:hover .specs-trigger-btn {
          color: #6366f1;
        }
        .arrow-icon {
          transition: transform 0.2s ease;
        }
        .attraction-card:hover .arrow-icon {
          transform: translateX(3px);
        }

        /* Load More Bar */
        .load-more-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem 0 0.5rem 0;
          flex-wrap: wrap;
        }
        .btn-load-more {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.75rem;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.92rem;
          box-shadow: 0 4px 14px var(--accent-glow);
          transition: var(--transition-fast);
          cursor: pointer;
        }
        .btn-load-more:hover {
          background: linear-gradient(135deg, #4f46e5, #4338ca);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px var(--accent-glow);
        }
        .btn-show-all {
          padding: 0.75rem 1.4rem;
          border-radius: var(--radius-md);
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .btn-show-all:hover {
          color: var(--text-primary);
          border-color: var(--border-accent);
          background: var(--bg-card-hover);
        }

        .empty-attractions-box {
          padding: 3rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          color: var(--text-muted);
        }
        .empty-icon {
          color: var(--text-muted);
        }

        /* Quick Action Badges on Card Image: Maps, Street View 360°, Google Earth 3D */
        .card-quick-actions {
          position: static;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          flex-shrink: 0;
          pointer-events: auto;
        }
        .quick-badge-pill {
          background: rgba(15, 23, 42, 0.88);
          backdrop-filter: blur(8px);
          font-size: 0.70rem;
          font-weight: 700;
          padding: 0.22rem 0.52rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 0.3rem;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.45);
          text-decoration: none;
        }
        .quick-badge-pill.gmaps {
          border: 1px solid rgba(56, 189, 248, 0.4);
          color: #38bdf8;
        }
        .quick-badge-pill.gmaps:hover {
          background: #0284c7;
          color: #ffffff;
          border-color: #38bdf8;
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(56, 189, 248, 0.45);
        }
        .quick-badge-pill.streetview {
          border: 1px solid rgba(245, 158, 11, 0.45);
          color: #f59e0b;
        }
        .quick-badge-pill.streetview:hover {
          background: #d97706;
          color: #ffffff;
          border-color: #fbbf24;
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(245, 158, 11, 0.45);
        }
        .quick-badge-pill.earth3d {
          border: 1px solid rgba(16, 185, 129, 0.45);
          color: #10b981;
        }
        .quick-badge-pill.earth3d:hover {
          background: #059669;
          color: #ffffff;
          border-color: #34d399;
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(16, 185, 129, 0.45);
        }

        .specs-indicator {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .indicator-icon {
          color: var(--accent-emerald);
        }

        /* Tablet Responsive Viewports (<= 1024px) */
        @media (max-width: 1024px) {
          .attractions-container {
            padding: 1.5rem;
          }
          .attractions-grid {
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 1.25rem;
          }
        }

        /* Mobile Phone Viewports (<= 640px) */
        @media (max-width: 640px) {
          .attractions-container {
            padding: 0.95rem;
            border-radius: var(--radius-md);
            gap: 1.25rem;
          }
          .attractions-header {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }
          .section-heading {
            font-size: 1.35rem;
          }
          .attractions-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .card-image-wrapper {
            height: 185px;
          }
          .attraction-filter-row {
            padding: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
}

// Individual Destination Card with Dynamic Genuine Image Resolution & Google Maps Link
function AttractionCardItem({ attraction, country, onSelectAttraction }) {
  const [imgSrc, setImgSrc] = useState(() => getInitialGenuineImage(attraction, country));

  useEffect(() => {
    let isMounted = true;
    fetchGenuinePlaceImage(attraction.name, country?.name).then((resolved) => {
      if (isMounted && resolved) {
        setImgSrc(resolved);
      }
    });
    return () => { isMounted = false; };
  }, [attraction.name, country?.name]);

  const gmapsUrl = getGoogleMapsUrl(attraction.name, attraction.location, country?.name);
  const streetViewUrl = getGoogleStreetViewUrl(attraction.name, attraction.location, country?.name);
  const earth3dUrl = getGoogleEarth3DUrl(attraction.name, attraction.location, country?.name);

  return (
    <div 
      className="attraction-card"
      onClick={() => onSelectAttraction(attraction)}
      id={`attraction-card-${attraction.id}`}
    >
      <div className="card-image-wrapper">
        <img 
          src={imgSrc} 
          alt={attraction.name} 
          className="card-img"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80';
          }}
        />
        <div className="card-img-gradient"></div>

        {/* Top Header Row: Category Pill + Quick Actions inside a flex row to prevent any overlap */}
        <div className="card-top-overlay-row">
          <span className="category-pill" title={attraction.category}>
            {attraction.category}
          </span>

          <div className="card-quick-actions">
            <a 
              href={gmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="quick-badge-pill gmaps"
              title="Open in Google Maps"
              onClick={(e) => e.stopPropagation()}
              id={`btn-card-map-${attraction.id}`}
            >
              <Navigation size={10} />
              <span>Map</span>
            </a>
            <a 
              href={streetViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="quick-badge-pill streetview"
              title="Launch 360° Google Street View"
              onClick={(e) => e.stopPropagation()}
              id={`btn-card-streetview-${attraction.id}`}
            >
              <Footprints size={10} />
              <span>360°</span>
            </a>
            <a 
              href={earth3dUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="quick-badge-pill earth3d"
              title="Launch 3D Google Earth Flyover"
              onClick={(e) => e.stopPropagation()}
              id={`btn-card-earth-${attraction.id}`}
            >
              <Globe2 size={10} />
              <span>3D Earth</span>
            </a>
          </div>
        </div>

        <span className="location-pill">
          <MapPin size={11} /> {attraction.location}
        </span>
      </div>

      <div className="card-body">
        <h3 className="attraction-name" title={attraction.name}>{attraction.name}</h3>

        <div className="why-famous-snippet">
          <span className="why-label">
            <Sparkles size={12} className="why-icon" /> Why it's famous:
          </span>
          <p className="why-text">{attraction.whyFamous}</p>
        </div>

        <div className="card-footer">
          <span className="specs-indicator">
            <CheckCircle2 size={12} className="indicator-icon" />
            {attraction.specs ? `${Object.keys(attraction.specs).length} Verified Specs` : 'Detailed Specs'}
          </span>
          <button className="specs-trigger-btn" type="button">
            <span>View Specs</span>
            <ArrowRight size={14} className="arrow-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

