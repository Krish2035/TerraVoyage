import React, { useState } from 'react';
import { Video, Radio, ExternalLink, RefreshCw, Eye, Sparkles, MapPin } from 'lucide-react';
import { getCountryWebcams } from '../services/travelIntelligenceData';

export default function LiveWebcamWidget({ country }) {
  const webcams = getCountryWebcams(country);
  const [selectedCamIndex, setSelectedCamIndex] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  if (!country || webcams.length === 0) return null;

  const currentCam = webcams[selectedCamIndex] || webcams[0];

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="utility-card webcam-widget-card glass-panel" id="live-webcam-widget">
      <div className="utility-card-header">
        <div className="u-title-group">
          <div className="live-cam-badge">
            <span className="live-cam-dot"></span>
            <span className="live-cam-text">LIVE 24/7</span>
          </div>
          <h3 className="widget-main-title">
            Live EarthCam & City Streamer
          </h3>
        </div>

        <div className="cam-header-actions">
          <button 
            type="button" 
            onClick={handleRefresh}
            className="cam-action-btn"
            title="Refresh Live Stream"
            id="btn-refresh-webcam"
          >
            <RefreshCw size={13} />
            <span>Reload Feed</span>
          </button>
          <a
            href={`https://www.earthcam.com/search/ft_search.php?term=${encodeURIComponent(country.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cam-action-btn"
            title="Browse all official live EarthCams for this nation"
            id="btn-earthcam-directory"
          >
            <span>EarthCam Network</span>
            <ExternalLink size={12} />
          </a>
          <a
            href={currentCam.directUrl || currentCam.embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cam-action-btn primary"
            title="Watch full stream in high definition"
            id="btn-fullscreen-webcam"
          >
            <span>Full Stream</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Camera angle switcher if multiple cams available */}
      {webcams.length > 1 && (
        <div className="cam-selector-bar">
          {webcams.map((cam, idx) => (
            <button
              key={cam.id}
              type="button"
              className={`cam-tab-btn ${selectedCamIndex === idx ? 'active' : ''}`}
              onClick={() => setSelectedCamIndex(idx)}
              id={`btn-cam-tab-${idx}`}
            >
              <Radio size={12} className={selectedCamIndex === idx ? 'cam-radio-active' : ''} />
              <span>{cam.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Video Stream Frame */}
      <div className="webcam-viewport-wrapper">
        <iframe
          key={`${currentCam.id}-${refreshKey}`}
          src={currentCam.embedUrl}
          title={currentCam.name}
          className="webcam-iframe"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>

        <div className="webcam-overlay-info">
          <div className="cam-location-pill">
            <MapPin size={11} />
            <span>{currentCam.city}</span>
          </div>
          <span className="cam-source-pill">
            <Eye size={11} /> {currentCam.source}
          </span>
        </div>
      </div>

      <div className="cam-footer-caption">
        <p className="cam-desc">
          <Sparkles size={12} className="text-gold" /> {currentCam.description}
        </p>
      </div>

      <style>{`
        .webcam-widget-card {
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          background: rgba(15, 23, 42, 0.65);
          border: 1px solid rgba(239, 68, 68, 0.25);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
        }
        .live-cam-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.4);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
        }
        .live-cam-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ef4444;
          box-shadow: 0 0 8px #ef4444;
          animation: pulseRed 1.8s infinite;
        }
        @keyframes pulseRed {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 1; box-shadow: 0 0 14px #ef4444; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
        .live-cam-text {
          font-size: 0.70rem;
          font-weight: 800;
          color: #ef4444;
          letter-spacing: 0.08em;
        }
        .widget-main-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .cam-header-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .cam-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          cursor: pointer;
          transition: var(--transition-fast);
          text-decoration: none;
        }
        .cam-action-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-accent);
          background: var(--bg-card-hover);
        }
        .cam-action-btn.primary {
          background: rgba(239, 68, 68, 0.15);
          border-color: rgba(239, 68, 68, 0.35);
          color: #f87171;
        }
        .cam-action-btn.primary:hover {
          background: #ef4444;
          color: #ffffff;
        }
        .cam-selector-bar {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
        }
        .cam-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: rgba(30, 41, 59, 0.6);
          border: 1px solid var(--border-subtle);
          cursor: pointer;
          white-space: nowrap;
          transition: var(--transition-fast);
        }
        .cam-tab-btn:hover {
          background: rgba(51, 65, 85, 0.8);
          color: var(--text-primary);
        }
        .cam-tab-btn.active {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(185, 28, 28, 0.3));
          border-color: #ef4444;
          color: #fca5a5;
        }
        .cam-radio-active {
          color: #ef4444;
          animation: spin 3s linear infinite;
        }
        .webcam-viewport-wrapper {
          position: relative;
          width: 100%;
          padding-top: 52%;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #020617;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
        }
        .webcam-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }
        .webcam-overlay-info {
          position: absolute;
          bottom: 12px;
          left: 12px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          z-index: 2;
          pointer-events: none;
        }
        .cam-location-pill, .cam-source-pill {
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(8px);
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          font-weight: 600;
          color: #f8fafc;
          border: 1px solid rgba(255, 255, 255, 0.15);
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }
        .cam-footer-caption {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .cam-desc {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }
      `}</style>
    </div>
  );
}
