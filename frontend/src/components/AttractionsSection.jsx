import React, { useState, useMemo } from 'react';
import { 
  Landmark, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Plus, 
  Info, 
  Search, 
  Filter, 
  ChevronDown 
} from 'lucide-react';

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
            Curated from top Google Travel indices, historical archives, and national registries. Click any destination to inspect complete architectural blueprints, visitor specs, and why it is famous.
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
              <div 
                key={attraction.id || idx} 
                className="attraction-card"
                onClick={() => onSelectAttraction(attraction)}
                id={`attraction-card-${attraction.id}`}
              >
                <div className="card-image-wrapper">
                  <img 
                    src={attraction.image} 
                    alt={attraction.name} 
                    className="card-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div className="card-img-gradient"></div>
                  <span className="category-pill">{attraction.category}</span>
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
                      {attraction.specs ? `${Object.keys(attraction.specs).length} Verified Specs` : 'Detailed Specs'}
                    </span>
                    <button className="specs-trigger-btn">
                      <span>View Specs</span>
                      <ArrowRight size={14} className="arrow-icon" />
                    </button>
                  </div>
                </div>
              </div>
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
        .category-pill {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(14, 20, 32, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #f8fafc;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          max-width: 80%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
      `}</style>
    </section>
  );
}
