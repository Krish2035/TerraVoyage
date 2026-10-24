import React, { useState } from 'react';
import { Video, Radio, ExternalLink, RefreshCw, Eye, Sparkles, MapPin, Compass, Tv, Satellite, Globe2, ShieldCheck } from 'lucide-react';
import { getCountryWebcams } from '../services/travelIntelligenceData';

export default function LiveWebcamWidget({ country }) {
  const webcams = getCountryWebcams(country);
  const [selectedCamIndex, setSelectedCamIndex] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeMode, setActiveMode] = useState('auto'); // 'auto' | 'video' | 'portal'

  if (!country || webcams.length === 0) return null;

  const currentCam = webcams[selectedCamIndex] || webcams[0];
  const isPortal = currentCam.type === 'portal' || activeMode === 'portal' || !currentCam.embedUrl;

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(country.name + ' live camera 4k')}`;
  const earthCamUrl = currentCam.earthCamUrl || `https://www.earthcam.com/search/ft_search.php?term=${encodeURIComponent(country.name)}`;
  const skylineUrl = currentCam.skylineUrl || `https://www.skylinewebcams.com/en/webcam.html?q=${encodeURIComponent(country.name)}`;
  const windyUrl = `https://www.windy.com/-Webcams/world`;

  return (
    <div className="utility-card webcam-widget-card glass-panel" id="live-webcam-widget">
      <div className="utility-card-header">
        <div className="u-title-group">
          <div className="live-cam-badge">
            <span className="live-cam-dot"></span>
            <span className="live-cam-text">LIVE 24/7</span>
          </div>
          <h3 className="widget-main-title">
            {country.name} Live EarthCam & Atmosphere Radar
          </h3>
        </div>

        <div className="cam-header-actions">
          {currentCam.embedUrl && currentCam.type === 'youtube' && (
            <button 
              type="button" 
              onClick={() => setActiveMode(isPortal ? 'video' : 'portal')}
              className="cam-action-btn"
              title="Toggle between Direct Embed and Live Directory"
            >
              {isPortal ? <Tv size={13} /> : <Compass size={13} />}
              <span>{isPortal ? 'Embed View' : 'Multi-Feed Portal'}</span>
            </button>
          )}

          <button 
            type="button" 
            onClick={handleRefresh}
            className="cam-action-btn"
            title="Refresh Live Stream Feed"
            id="btn-refresh-webcam"
          >
            <RefreshCw size={13} />
            <span>Reload Feed</span>
          </button>

          <a
            href={youtubeSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cam-action-btn primary"
            title="Watch live broadcasts on YouTube"
            id="btn-youtube-live-hub"
          >
            <span>YouTube Live 4K</span>
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
              onClick={() => {
                setSelectedCamIndex(idx);
                setActiveMode('auto');
              }}
              id={`btn-cam-tab-${idx}`}
            >
              <Radio size={12} className={selectedCamIndex === idx ? 'cam-radio-active' : ''} />
              <span>{cam.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Stream Area: Video Frame or Live EarthCam Radar Portal */}
      {!isPortal && currentCam.embedUrl ? (
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
      ) : (
        /* Interactive Multi-Feed EarthCam Radar Terminal (Eliminates Error 153 completely) */
        <div className="earthcam-radar-portal">
          <div className="portal-radar-header">
            <div className="radar-status-indicator">
              <Satellite size={16} className="radar-spin-icon" />
              <span className="radar-status-text">Real-Time Atmosphere & Camera Network</span>
            </div>
            <span className="radar-verified-badge">
              <ShieldCheck size={12} /> Verified Feeds
            </span>
          </div>

          <div className="portal-feeds-grid">
            {/* 1. YouTube 4K Live Broadcasts */}
            <a
              href={youtubeSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="feed-source-card youtube-card"
            >
              <div className="feed-card-header">
                <div className="feed-icon-wrap yt">
                  <Tv size={18} />
                </div>
                <div className="feed-meta">
                  <span className="feed-tag">24/7 Live Broadcast</span>
                  <h4 className="feed-title">{country.name} YouTube Live 4K</h4>
                </div>
              </div>
              <p className="feed-desc">Watch live city crossings, landmark panoramas, and continuous public streams in Ultra HD.</p>
              <div className="feed-card-action">
                <span>Launch YouTube 4K Stream</span>
                <ExternalLink size={13} />
              </div>
            </a>

            {/* 2. EarthCam Network */}
            <a
              href={earthCamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="feed-source-card earthcam-card"
            >
              <div className="feed-card-header">
                <div className="feed-icon-wrap ec">
                  <Globe2 size={18} />
                </div>
                <div className="feed-meta">
                  <span className="feed-tag">Global Landmark Cams</span>
                  <h4 className="feed-title">EarthCam Network</h4>
                </div>
              </div>
              <p className="feed-desc">Curated high-resolution city panoramas, beach cams, and tourism hotspots in {country.name}.</p>
              <div className="feed-card-action">
                <span>Browse EarthCams</span>
                <ExternalLink size={13} />
              </div>
            </a>

            {/* 3. SkylineWebcams HD */}
            <a
              href={skylineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="feed-source-card skyline-card"
            >
              <div className="feed-card-header">
                <div className="feed-icon-wrap sl">
                  <Video size={18} />
                </div>
                <div className="feed-meta">
                  <span className="feed-tag">Pan-Tilt HD Cameras</span>
                  <h4 className="feed-title">SkylineWebcams</h4>
                </div>
              </div>
              <p className="feed-desc">Live PTZ optical zoom webcams monitoring plazas, harbors, and iconic architectural monuments.</p>
              <div className="feed-card-action">
                <span>Open Skyline Cams</span>
                <ExternalLink size={13} />
              </div>
            </a>

            {/* 4. Windy Live Weather Radar */}
            <a
              href={windyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="feed-source-card windy-card"
            >
              <div className="feed-card-header">
                <div className="feed-icon-wrap wd">
                  <Compass size={18} />
                </div>
                <div className="feed-meta">
                  <span className="feed-tag">Atmosphere & Flights</span>
                  <h4 className="feed-title">Windy Satellite Radar</h4>
                </div>
              </div>
              <p className="feed-desc">Inspect real-time cloud movements, wind streams, and regional airport webcams.</p>
              <div className="feed-card-action">
                <span>Inspect Radar</span>
                <ExternalLink size={13} />
              </div>
            </a>
          </div>
        </div>
      )}

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

        /* EarthCam Radar Portal Styles (Eliminates Error 153) */
        .earthcam-radar-portal {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(8, 12, 22, 0.95) 100%);
          border: 1px solid rgba(56, 189, 248, 0.25);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }
        .portal-radar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
          gap: 0.65rem;
        }
        .radar-status-indicator {
          display: flex;
          align-items: center;
          gap: 0.55rem;
        }
        .radar-spin-icon {
          color: #38bdf8;
          animation: spinPulse 6s linear infinite;
        }
        @keyframes spinPulse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .radar-status-text {
          font-size: 0.88rem;
          font-weight: 700;
          color: #f8fafc;
        }
        .radar-verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          font-weight: 700;
          color: #10b981;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }
        .portal-feeds-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (max-width: 680px) {
          .portal-feeds-grid {
            grid-template-columns: 1fr;
          }
        }
        .feed-source-card {
          background: rgba(24, 32, 51, 0.75);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          transition: var(--transition-fast);
          text-decoration: none;
        }
        .feed-source-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }
        .youtube-card:hover {
          border-color: rgba(239, 68, 68, 0.5);
          background: rgba(239, 68, 68, 0.08);
        }
        .earthcam-card:hover {
          border-color: rgba(56, 189, 248, 0.5);
          background: rgba(56, 189, 248, 0.08);
        }
        .skyline-card:hover {
          border-color: rgba(245, 158, 11, 0.5);
          background: rgba(245, 158, 11, 0.08);
        }
        .windy-card:hover {
          border-color: rgba(16, 185, 129, 0.5);
          background: rgba(16, 185, 129, 0.08);
        }
        .feed-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .feed-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .feed-icon-wrap.yt { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
        .feed-icon-wrap.ec { background: rgba(56, 189, 248, 0.15); color: #38bdf8; }
        .feed-icon-wrap.sl { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
        .feed-icon-wrap.wd { background: rgba(16, 185, 129, 0.15); color: #10b981; }
        .feed-meta {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .feed-tag {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .feed-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }
        .feed-desc {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
          flex: 1;
        }
        .feed-card-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.78rem;
          font-weight: 700;
          color: #38bdf8;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
}
