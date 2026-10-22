import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Sparkles, 
  MapPin, 
  Award, 
  Clock, 
  CheckCircle2, 
  Bookmark, 
  Share2, 
  Compass, 
  Info,
  Calendar
} from 'lucide-react';

export default function AttractionSpecsModal({ 
  attraction, 
  country, 
  onClose,
  onBookmark,
  isBookmarked
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!attraction) return null;

  const handleItineraryClick = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    if (onBookmark) onBookmark(attraction);
  };

  const specs = attraction.specs || {};
  const highlights = specs.highlights || [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="specs-modal-card glass-panel animate-scale-in" 
        onClick={(e) => e.stopPropagation()}
        id="attraction-specs-modal"
      >
        {/* Modal Close Button */}
        <button 
          onClick={onClose} 
          className="modal-close-btn"
          id="btn-close-specs-modal"
          aria-label="Close Specs Modal"
        >
          <X size={20} />
        </button>

        {/* Hero Visual Header */}
        <div className="modal-hero-banner">
          <img 
            src={attraction.image} 
            alt={attraction.name} 
            className="modal-hero-img" 
          />
          <div className="modal-hero-overlay"></div>
          
          <div className="modal-hero-content">
            <div className="modal-tag-row">
              <span className="modal-category-tag">{attraction.category}</span>
              <span className="modal-country-tag">
                {country ? `${country.name} (${country.code})` : 'Destination'}
              </span>
            </div>
            <h2 className="modal-title">{attraction.name}</h2>
            <div className="modal-location">
              <MapPin size={14} /> {attraction.location}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body-scroll">
          {/* THE BIG WHY: Why This Place Is Famous */}
          <div className="why-famous-spotlight">
            <div className="spotlight-badge">
              <Sparkles size={16} />
              <span>Why This Place Is So Famous</span>
            </div>
            <p className="spotlight-body">
              {attraction.whyFamous}
            </p>
          </div>

          {/* Detailed Architectural & Tourist Specifications Grid */}
          <div className="specs-section">
            <h3 className="specs-section-title">
              <Info size={16} className="specs-icon" /> Architectural & Tourist Specifications
            </h3>
            
            <div className="specs-table-grid">
              {Object.entries(specs)
                .filter(([key]) => key !== 'highlights')
                .map(([key, value]) => {
                  const formattedKey = key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase());
                  return (
                    <div key={key} className="spec-item-box">
                      <span className="spec-item-label">{formattedKey}</span>
                      <span className="spec-item-value">{String(value)}</span>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Key Must-See Highlights Checklist */}
          {highlights.length > 0 && (
            <div className="highlights-section">
              <h3 className="specs-section-title">
                <CheckCircle2 size={16} className="highlights-icon" /> Essential Highlights & Must-See Features
              </h3>
              <div className="highlights-list">
                {highlights.map((highlight, idx) => (
                  <div key={idx} className="highlight-item">
                    <span className="highlight-bullet"></span>
                    <span className="highlight-text">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Bar */}
        <div className="modal-action-bar">
          <div className="action-left">
            <span className="curated-text">Verified Travel Specs • 112 Architecture Compliant</span>
          </div>
          <div className="action-buttons">
            <button 
              onClick={handleItineraryClick} 
              className={`btn-action-primary ${isBookmarked ? 'bookmarked' : ''}`}
              id="btn-add-itinerary"
            >
              <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
              <span>{isBookmarked ? 'Saved in Itinerary' : 'Add to My Itinerary'}</span>
            </button>
            <button onClick={onClose} className="btn-action-secondary">
              Close Specs
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 1.5rem;
        }
        .specs-modal-card {
          width: 100%;
          max-width: 780px;
          max-height: 90vh;
          background: var(--bg-secondary);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), var(--shadow-glow);
        }
        .modal-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }
        .modal-close-btn:hover {
          background: rgba(244, 63, 94, 0.8);
          transform: rotate(90deg);
        }
        .modal-hero-banner {
          position: relative;
          width: 100%;
          height: 250px;
          overflow: hidden;
          background: #000;
        }
        .modal-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .modal-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(13, 17, 23, 0.95) 100%);
        }
        .modal-hero-content {
          position: absolute;
          bottom: 20px;
          left: 24px;
          right: 24px;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .modal-tag-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .modal-category-tag {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
          background: var(--accent-primary);
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .modal-country-tag {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(6px);
          color: #ffffff;
        }
        .modal-title {
          font-size: 2rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }
        .modal-location {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.85rem;
          color: #cbd5e1;
        }
        .modal-body-scroll {
          padding: 1.75rem 2rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .why-famous-spotlight {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: var(--radius-md);
          padding: 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          box-shadow: 0 0 25px rgba(245, 158, 11, 0.06);
        }
        .spotlight-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent-gold);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .spotlight-body {
          font-size: 1rem;
          line-height: 1.65;
          color: var(--text-primary);
        }
        .specs-section {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }
        .specs-section-title {
          font-size: 1.1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-primary);
        }
        .specs-icon {
          color: #38bdf8;
        }
        .specs-table-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        @media (max-width: 600px) {
          .specs-table-grid {
            grid-template-columns: 1fr;
          }
        }
        .spec-item-box {
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 0.85rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .spec-item-label {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .spec-item-value {
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .highlights-section {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }
        .highlights-icon {
          color: var(--accent-emerald);
        }
        .highlights-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: var(--bg-card);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-subtle);
        }
        .highlight-bullet {
          width: 7px;
          height: 7px;
          min-width: 7px;
          margin-top: 7px;
          border-radius: 50%;
          background: var(--accent-emerald);
          box-shadow: 0 0 6px var(--accent-emerald);
        }
        .highlight-text {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .modal-action-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 1.15rem 2rem;
          border-top: 1px solid var(--border-subtle);
          background: rgba(10, 14, 22, 0.7);
        }
        .curated-text {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }
        .action-buttons {
          display: flex;
          gap: 0.75rem;
        }
        .btn-action-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1.25rem;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.88rem;
          transition: var(--transition-fast);
          box-shadow: 0 4px 14px var(--accent-glow);
        }
        .btn-action-primary:hover {
          background: linear-gradient(135deg, #4f46e5, #4338ca);
          transform: translateY(-1px);
        }
        .btn-action-primary.bookmarked {
          background: linear-gradient(135deg, #10b981, #059669);
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
        }
        .btn-action-secondary {
          padding: 0.55rem 1.15rem;
          border-radius: var(--radius-md);
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-size: 0.88rem;
          font-weight: 500;
          transition: var(--transition-fast);
        }
        .btn-action-secondary:hover {
          color: var(--text-primary);
          background: var(--bg-card-hover);
        }
      `}</style>
    </div>
  );
}
