import React, { useEffect, useState } from 'react';
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
  Calendar,
  Navigation,
  ExternalLink,
  Camera,
  Volume2,
  Footprints,
  Globe2,
  Map,
  Layers,
  Box
} from 'lucide-react';
import Landmark3DViewer from './Landmark3DViewer';
import { 
  getInitialGenuineImage, 
  fetchGenuinePlaceImage, 
  getGoogleMapsUrl, 
  getGoogleMapsEmbedUrl,
  getGoogleStreetViewUrl,
  getGoogleStreetViewEmbedUrl,
  getGoogleEarth3DUrl,
  getGoogleSatellite3DEmbedUrl
} from '../services/genuineImageService';
import { speakPronunciation } from '../services/audioService';

export default function AttractionSpecsModal({ 
  attraction, 
  country, 
  onClose,
  onBookmark,
  isBookmarked
}) {
  const [imgSrc, setImgSrc] = useState(() => getInitialGenuineImage(attraction, country));

  useEffect(() => {
    let isMounted = true;
    if (attraction) {
      setImgSrc(getInitialGenuineImage(attraction, country));
      fetchGenuinePlaceImage(attraction.name, country?.name).then((resolved) => {
        if (isMounted && resolved) {
          setImgSrc(resolved);
        }
      });
    }
    return () => { isMounted = false; };
  }, [attraction, country]);

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
    if (onBookmark) {
      onBookmark({
        ...attraction,
        countryName: country?.name,
        countryCode: country?.code,
        image: imgSrc
      });
    }
  };

  const [explorerMode, setExplorerMode] = useState('map'); // 'map' | 'satellite3d' | 'streetview' | 'earth3d'

  const specs = attraction.specs || {};
  const highlights = specs.highlights || [];
  const gmapsUrl = getGoogleMapsUrl(attraction.name, attraction.location, country?.name);
  const gmapsEmbedUrl = getGoogleMapsEmbedUrl(attraction.name, attraction.location, country?.name);
  const gstreetUrl = getGoogleStreetViewUrl(attraction.name, attraction.location, country?.name);
  const gstreetEmbedUrl = getGoogleStreetViewEmbedUrl(attraction.name, attraction.location, country?.name);
  const gearthUrl = getGoogleEarth3DUrl(attraction.name, attraction.location, country?.name);
  const gsatellite3dEmbedUrl = getGoogleSatellite3DEmbedUrl(attraction.name, attraction.location, country?.name);

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

        {/* Hero Visual Header with Genuine Photo */}
        <div className="modal-hero-banner">
          <img 
            src={imgSrc} 
            alt={attraction.name} 
            className="modal-hero-img" 
            referrerPolicy="no-referrer"
          />
          <div className="modal-hero-overlay"></div>
          
          <div className="modal-hero-content">
            <div className="modal-tag-row">
              <span className="modal-category-tag">{attraction.category}</span>
              <span className="modal-country-tag">
                {country ? `${country.name} (${country.code})` : 'Destination'}
              </span>
              <span className="modal-gmaps-source-tag">
                <Camera size={12} /> Genuine Place Photo
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <h2 className="modal-title" style={{ margin: 0 }}>{attraction.name}</h2>
              <button
                type="button"
                onClick={() => speakPronunciation(attraction.name)}
                className="btn-pronounce-landmark"
                title={`Listen to pronunciation of ${attraction.name}`}
                id="btn-pronounce-modal-landmark"
              >
                <Volume2 size={15} />
                <span>Pronounce</span>
              </button>
            </div>
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

          {/* Multi-Dimensional 3D, Street View & Google Earth Interactive Explorer */}
          <div className="google-maps-spec-section">
            <div className="gmaps-section-header">
              <div className="gmaps-header-left">
                <Navigation size={16} className="gmaps-header-icon" />
                <h3 className="specs-section-title" style={{ margin: 0 }}>
                  Live 3D & Street View Explorer
                </h3>
              </div>

              {/* View Switcher Tabs */}
              <div className="explorer-mode-tabs">
                <button
                  type="button"
                  className={`exp-tab-btn ${explorerMode === 'map' ? 'active' : ''}`}
                  onClick={() => setExplorerMode('map')}
                  title="Interactive Roadmap View"
                  id="tab-view-roadmap"
                >
                  <Map size={13} />
                  <span>Roadmap</span>
                </button>

                <button
                  type="button"
                  className={`exp-tab-btn ${explorerMode === 'satellite3d' ? 'active' : ''}`}
                  onClick={() => setExplorerMode('satellite3d')}
                  title="3D High-Res Satellite Terrain"
                  id="tab-view-satellite"
                >
                  <Layers size={13} />
                  <span>3D Satellite</span>
                </button>

                <button
                  type="button"
                  className={`exp-tab-btn ${explorerMode === 'streetview' ? 'active' : ''}`}
                  onClick={() => setExplorerMode('streetview')}
                  title="360° Google Street View Panorama"
                  id="tab-view-streetview"
                >
                  <Footprints size={13} />
                  <span>Street View 360°</span>
                </button>

                <button
                  type="button"
                  className={`exp-tab-btn ${explorerMode === 'earth3d' ? 'active' : ''}`}
                  onClick={() => setExplorerMode('earth3d')}
                  title="Google Earth 3D Flyover"
                  id="tab-view-earth"
                >
                  <Globe2 size={13} />
                  <span>Google Earth 3D</span>
                </button>

                <button
                  type="button"
                  className={`exp-tab-btn ${explorerMode === 'model3d' ? 'active' : ''}`}
                  onClick={() => setExplorerMode('model3d')}
                  title="Interactive 3D Architectural Model Inspector"
                  id="tab-view-model3d"
                >
                  <Box size={13} />
                  <span>3D Model</span>
                </button>
              </div>

              <a
                href={explorerMode === 'earth3d' ? gearthUrl : (explorerMode === 'streetview' ? gstreetUrl : gmapsUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gmaps-external"
                id="btn-open-active-view"
                title="Launch in standalone viewer"
              >
                <span>Launch Full Screen</span>
                <ExternalLink size={13} />
              </a>
            </div>

            <div className="gmaps-interactive-container">
              {/* 1. Roadmap Mode */}
              {explorerMode === 'map' && (
                <iframe
                  title={`Google Maps location for ${attraction.name}`}
                  src={gmapsEmbedUrl}
                  className="gmaps-embed-iframe animate-fade-in"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              )}

              {/* 2. 3D Satellite & Terrain Elevation Mode */}
              {explorerMode === 'satellite3d' && (
                <iframe
                  title={`Google 3D Satellite for ${attraction.name}`}
                  src={gsatellite3dEmbedUrl}
                  className="gmaps-embed-iframe animate-fade-in"
                  loading="lazy"
                  allowFullScreen
                ></iframe>
              )}

              {/* 3. 360° Street View Panorama Mode */}
              {explorerMode === 'streetview' && (
                <div className="streetview-viewport animate-fade-in">
                  <iframe
                    title={`Google Street View 360 for ${attraction.name}`}
                    src={gstreetEmbedUrl}
                    className="gmaps-embed-iframe"
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                  <div className="streetview-overlay-badge">
                    <Footprints size={14} className="badge-icon-spin" />
                    <span>360° Interactive Street Panorama • Click & Drag to Look Around</span>
                    <a
                      href={gstreetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-open-full-pano"
                      id="btn-open-full-streetview"
                    >
                      Open Full 360° View
                    </a>
                  </div>
                </div>
              )}

              {/* 4. Google Earth 3D Photogrammetry & Mesh Mode */}
              {explorerMode === 'earth3d' && (
                <div className="google-earth-viewport animate-fade-in">
                  <div className="earth-3d-hero-card">
                    <div className="earth-orbit-visual">
                      <div className="earth-globe-glow"></div>
                      <Globe2 size={64} className="earth-spinning-globe" />
                      <div className="orbit-beacon-marker">
                        <span className="beacon-ring"></span>
                        <MapPin size={18} color="#f43f5e" />
                      </div>
                    </div>

                    <div className="earth-info-box">
                      <div className="earth-tag-pill">
                        <Sparkles size={12} /> Google Earth 3D Flyover
                      </div>
                      <h4 className="earth-headline">3D Photogrammetric Mesh for {attraction.name}</h4>
                      <p className="earth-subtext">
                        Explore realistic 3D elevation, 3D architectural wireframes, terrain topology, and orbital camera flyover directly on Google Earth Engine.
                      </p>

                      <div className="earth-action-group">
                        <a
                          href={gearthUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-launch-google-earth"
                          id="btn-launch-google-earth"
                        >
                          <Globe2 size={16} />
                          <span>Fly to {attraction.name} in Google Earth 3D</span>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="earth-satellite-preview">
                    <iframe
                      title={`3D Satellite terrain for ${attraction.name}`}
                      src={gsatellite3dEmbedUrl}
                      className="earth-preview-iframe"
                      loading="lazy"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {/* 5. Interactive 3D Architectural Model Inspector Mode */}
              {explorerMode === 'model3d' && (
                <Landmark3DViewer attraction={attraction} country={country} />
              )}

              <div className="gmaps-footer-bar">
                <span className="gmaps-verified-text">
                  <CheckCircle2 size={13} color="#10b981" />
                  Real-World Coordinates, Street View & 3D Terrain Sourced from Google Earth Engine
                </span>
                <div className="gmaps-footer-links">
                  <a
                    href={gstreetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gmaps-photos-link"
                    title="Open 360° Google Street View"
                  >
                    <Footprints size={13} />
                    <span>360° Street View</span>
                  </a>
                  <a
                    href={gearthUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gmaps-photos-link earth-link"
                    title="Fly into destination in Google Earth 3D"
                  >
                    <Globe2 size={13} />
                    <span>Google Earth 3D</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="modal-action-bar">
          <div className="action-left">
            <span className="curated-text">Verified Travel Specs • Google Maps & Earth 3D Compliant</span>
          </div>
          <div className="action-buttons">
            <a
              href={gstreetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-action-streetview"
              id="btn-modal-streetview-link"
              title="Open full 360° Street View"
            >
              <Footprints size={15} />
              <span>Street View 360°</span>
            </a>
            <a
              href={gearthUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-action-earth3d"
              id="btn-modal-earth3d-link"
              title="Fly in Google Earth 3D"
            >
              <Globe2 size={15} />
              <span>Google Earth 3D</span>
            </a>
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
        .btn-pronounce-landmark {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.75rem;
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.35);
          border-radius: var(--radius-full);
          color: #ffffff;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .btn-pronounce-landmark:hover {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
          transform: translateY(-1px);
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

        .modal-gmaps-source-tag {
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          background: rgba(14, 165, 233, 0.2);
          border: 1px solid rgba(14, 165, 233, 0.4);
          color: #38bdf8;
          font-size: 0.72rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        /* Google Maps Explorer Section */
        .google-maps-spec-section {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          margin-top: 0.5rem;
          background: var(--bg-card);
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: var(--radius-md);
          padding: 1.25rem;
        }
        .gmaps-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .gmaps-header-left {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .gmaps-header-icon {
          color: #38bdf8;
        }
        .btn-gmaps-external {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.75rem;
          background: rgba(56, 189, 248, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.4);
          border-radius: var(--radius-full);
          color: #38bdf8;
          font-size: 0.78rem;
          font-weight: 700;
          transition: var(--transition-fast);
        }
        .btn-gmaps-external:hover {
          background: #0284c7;
          color: #ffffff;
          transform: translateY(-1px);
        }
        .gmaps-interactive-container {
          width: 100%;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--border-subtle);
          background: #000;
        }
        .gmaps-embed-iframe {
          width: 100%;
          height: 240px;
          border: none;
          display: block;
        }
        .gmaps-footer-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.6rem 0.9rem;
          background: rgba(10, 14, 22, 0.9);
          border-top: 1px solid var(--border-subtle);
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .gmaps-verified-text {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: var(--text-secondary);
        }
        .gmaps-photos-link {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: #38bdf8;
          font-weight: 600;
          transition: color 0.15s ease;
        }
        .gmaps-photos-link:hover {
          color: #ffffff;
          text-decoration: underline;
        }

        /* Explorer Mode Tabs */
        .explorer-mode-tabs {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(0, 0, 0, 0.4);
          padding: 3px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-subtle);
          flex-wrap: wrap;
        }
        .exp-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.32rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          background: transparent;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .exp-tab-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
        }
        .exp-tab-btn.active {
          background: linear-gradient(135deg, #6366f1, #38bdf8);
          color: #ffffff;
          box-shadow: 0 2px 8px var(--accent-glow);
        }

        /* Street View 360 Viewport */
        .streetview-viewport {
          position: relative;
          width: 100%;
          min-height: 280px;
        }
        .streetview-overlay-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(13, 17, 23, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-accent);
          color: #38bdf8;
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
          z-index: 10;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .btn-open-full-pano {
          background: #38bdf8;
          color: #000000;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full);
          font-size: 0.7rem;
          font-weight: 800;
          text-decoration: none;
        }
        .btn-open-full-pano:hover {
          background: #ffffff;
        }

        /* Google Earth 3D Viewport */
        .google-earth-viewport {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          background: radial-gradient(circle at 50% 30%, #0d1527 0%, #050811 100%);
          padding: 1rem;
        }
        .earth-3d-hero-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-md);
          flex-wrap: wrap;
        }
        .earth-orbit-visual {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .earth-globe-glow {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, transparent 70%);
          animation: pulseGlow 2.5s infinite;
        }
        .earth-spinning-globe {
          color: #38bdf8;
          animation: spinSlow 40s linear infinite;
        }
        .orbit-beacon-marker {
          position: absolute;
          top: 10px;
          right: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .beacon-ring {
          position: absolute;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2px solid #f43f5e;
          animation: radarRing 1.8s infinite;
        }
        .earth-info-box {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          min-width: 240px;
        }
        .earth-tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          color: var(--accent-gold);
          font-weight: 700;
          text-transform: uppercase;
        }
        .earth-headline {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-primary);
        }
        .earth-subtext {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }
        .earth-action-group {
          margin-top: 0.35rem;
        }
        .btn-launch-google-earth {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, #2563eb, #0284c7);
          color: #ffffff;
          font-size: 0.85rem;
          font-weight: 700;
          box-shadow: 0 4px 16px rgba(37, 99, 235, 0.4);
          transition: var(--transition-fast);
        }
        .btn-launch-google-earth:hover {
          background: linear-gradient(135deg, #1d4ed8, #0369a1);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.6);
        }
        .earth-satellite-preview {
          width: 100%;
          height: 190px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--border-subtle);
        }
        .earth-preview-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        /* Action Bar 3D & Street View buttons */
        .btn-action-streetview {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1.15rem;
          border-radius: var(--radius-md);
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.35);
          color: #38bdf8;
          font-size: 0.85rem;
          font-weight: 700;
          transition: var(--transition-fast);
        }
        .btn-action-streetview:hover {
          background: #0284c7;
          color: #ffffff;
          transform: translateY(-1px);
        }
        .btn-action-earth3d {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 1.15rem;
          border-radius: var(--radius-md);
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.35);
          color: var(--accent-gold);
          font-size: 0.85rem;
          font-weight: 700;
          transition: var(--transition-fast);
        }
        .btn-action-earth3d:hover {
          background: #d97706;
          color: #ffffff;
          transform: translateY(-1px);
        }
        .gmaps-footer-links {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .earth-link {
          color: var(--accent-gold) !important;
        }
      `}</style>
    </div>
  );
}
