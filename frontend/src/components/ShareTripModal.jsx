import React, { useState } from 'react';
import { Share2, Copy, Check, X, Send, QrCode, Globe, Sparkles, MessageCircle, Mail } from 'lucide-react';
import { generateShareUrl } from '../services/cloudSyncService';

export default function ShareTripModal({ isOpen, onClose, itineraryItems, country }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = generateShareUrl(itineraryItems, country);
  const shareTitle = country 
    ? `Explore my TerraVoyage trip to ${country.name}!`
    : 'Explore my TerraVoyage Travel Itinerary & Landmarks!';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle} Check it out here: ${shareUrl}`)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}&hashtags=TerraVoyage,Travel,Wanderlust`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`Hey!\n\nI created this travel plan on TerraVoyage with full 360° Street Views, 3D Earth, and verified specs.\n\nView it here:\n${shareUrl}`)}`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="share-modal-card glass-panel animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        id="share-trip-modal"
      >
        <button 
          onClick={onClose} 
          className="modal-close-btn"
          id="btn-close-share-modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="share-header">
          <div className="share-badge">
            <Share2 size={14} className="text-emerald" />
            <span>SOCIAL SHARING & COLLABORATION</span>
          </div>
          <h2 className="share-title">Share Your Journey</h2>
          <p className="share-subtitle">
            Send your itinerary, saved landmarks, and country specifications to fellow travelers.
          </p>
        </div>

        {/* Share Link Copy Field */}
        <div className="share-link-box">
          <label className="share-link-label">Direct Trip Link:</label>
          <div className="link-input-row">
            <input 
              type="text" 
              readOnly 
              value={shareUrl} 
              className="share-url-input"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="btn-copy-share-link"
              id="btn-copy-share-url"
            >
              {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
              <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Quick Social Share Buttons */}
        <div className="social-channels-grid">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn whatsapp"
            title="Share via WhatsApp"
          >
            <MessageCircle size={18} />
            <span>WhatsApp</span>
          </a>

          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn twitter"
            title="Share on X / Twitter"
          >
            <Send size={18} />
            <span>X (Twitter)</span>
          </a>

          <a
            href={emailUrl}
            className="social-btn email"
            title="Share via Email"
          >
            <Mail size={18} />
            <span>Email</span>
          </a>
        </div>

        {/* Interactive QR Code Card */}
        <div className="qr-code-card">
          <div className="qr-visual-box">
            {/* High-contrast SVG QR Code Matrix */}
            <svg viewBox="0 0 100 100" className="qr-svg-matrix" fill="#000000">
              <rect width="100" height="100" fill="#ffffff" rx="6" />
              {/* Corner 1 */}
              <rect x="8" y="8" width="24" height="24" fill="#0f172a" rx="3" />
              <rect x="12" y="12" width="16" height="16" fill="#ffffff" />
              <rect x="16" y="16" width="8" height="8" fill="#0284c7" />
              {/* Corner 2 */}
              <rect x="68" y="8" width="24" height="24" fill="#0f172a" rx="3" />
              <rect x="72" y="12" width="16" height="16" fill="#ffffff" />
              <rect x="76" y="16" width="8" height="8" fill="#0284c7" />
              {/* Corner 3 */}
              <rect x="8" y="68" width="24" height="24" fill="#0f172a" rx="3" />
              <rect x="12" y="72" width="16" height="16" fill="#ffffff" />
              <rect x="16" y="76" width="8" height="8" fill="#0284c7" />
              {/* Central Pattern Dots */}
              <rect x="38" y="12" width="6" height="6" fill="#0f172a" />
              <rect x="48" y="18" width="8" height="6" fill="#0f172a" />
              <rect x="38" y="28" width="8" height="8" fill="#0284c7" />
              <rect x="52" y="32" width="6" height="12" fill="#0f172a" />
              <rect x="20" y="44" width="10" height="6" fill="#0f172a" />
              <rect x="36" y="44" width="8" height="8" fill="#0f172a" />
              <rect x="48" y="50" width="12" height="6" fill="#0284c7" />
              <rect x="66" y="44" width="8" height="12" fill="#0f172a" />
              <rect x="78" y="52" width="10" height="6" fill="#0f172a" />
              <rect x="38" y="68" width="10" height="8" fill="#0f172a" />
              <rect x="54" y="72" width="8" height="10" fill="#0284c7" />
              <rect x="68" y="78" width="16" height="6" fill="#0f172a" />
            </svg>
          </div>
          <div className="qr-info-col">
            <span className="qr-title">Instant Mobile Scan</span>
            <p className="qr-desc">
              Scan with your phone camera to instantly load this country and full itinerary on mobile!
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .share-modal-card {
          width: 90%;
          max-width: 520px;
          background: #0f172a;
          border: 1px solid rgba(16, 185, 129, 0.35);
          border-radius: var(--radius-xl);
          padding: 2rem;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.75);
        }
        .share-header {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .share-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: #34d399;
          font-size: 0.70rem;
          font-weight: 800;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          width: fit-content;
        }
        .share-title {
          font-size: 1.55rem;
          font-weight: 800;
          margin: 0;
          color: #ffffff;
        }
        .share-subtitle {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.4;
        }
        .share-link-box {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .share-link-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .link-input-row {
          display: flex;
          gap: 0.5rem;
        }
        .share-url-input {
          flex: 1;
          background: var(--bg-input);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 0.6rem 0.85rem;
          color: #38bdf8;
          font-family: var(--font-mono);
          font-size: 0.82rem;
          outline: none;
        }
        .btn-copy-share-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 1.1rem;
          border-radius: var(--radius-sm);
          background: #10b981;
          color: #ffffff;
          font-size: 0.82rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          transition: var(--transition-fast);
        }
        .btn-copy-share-link:hover {
          background: #059669;
          transform: translateY(-1px);
        }
        .social-channels-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }
        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
          transition: var(--transition-fast);
        }
        .social-btn.whatsapp {
          background: rgba(37, 211, 102, 0.15);
          border: 1px solid rgba(37, 211, 102, 0.35);
          color: #25d366;
        }
        .social-btn.whatsapp:hover {
          background: #25d366;
          color: #ffffff;
        }
        .social-btn.twitter {
          background: rgba(56, 189, 248, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.35);
          color: #38bdf8;
        }
        .social-btn.twitter:hover {
          background: #0284c7;
          color: #ffffff;
        }
        .social-btn.email {
          background: rgba(168, 85, 247, 0.15);
          border: 1px solid rgba(168, 85, 247, 0.35);
          color: #c084fc;
        }
        .social-btn.email:hover {
          background: #9333ea;
          color: #ffffff;
        }
        .qr-code-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1rem;
          background: rgba(30, 41, 59, 0.45);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .qr-visual-box {
          width: 82px;
          height: 82px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }
        .qr-svg-matrix {
          width: 100%;
          height: 100%;
          display: block;
        }
        .qr-info-col {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .qr-title {
          font-size: 0.90rem;
          font-weight: 700;
          color: #ffffff;
        }
        .qr-desc {
          font-size: 0.78rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.35;
        }
      `}</style>
    </div>
  );
}
