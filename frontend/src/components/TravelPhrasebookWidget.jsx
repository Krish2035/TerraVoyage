import React, { useState } from 'react';
import { 
  Languages, 
  Volume2, 
  Sparkles, 
  MessageSquareQuote,
  CheckCircle2
} from 'lucide-react';
import { getPhrasesForCountry } from '../services/travelKitData';
import { getLanguageCodeForCountry } from '../services/worldCoordinates';

export default function TravelPhrasebookWidget({ country }) {
  const [activeTab, setActiveTab] = useState('All');
  const [speakingIndex, setSpeakingIndex] = useState(null);

  if (!country) return null;

  const phrases = getPhrasesForCountry(country);
  const categories = ['All', 'Greetings', 'Dining', 'Directions', 'Safety'];

  const filtered = activeTab === 'All' 
    ? phrases 
    : phrases.filter(p => p.cat === activeTab);

  const speakPhrase = (phraseText, idx) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(phraseText);
    utterance.lang = getLanguageCodeForCountry(country);
    utterance.rate = 0.85;

    utterance.onstart = () => setSpeakingIndex(idx);
    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="phrasebook-container glass-panel">
      {/* Header */}
      <div className="pb-header-row">
        <div className="pb-title-box">
          <Languages size={18} className="pb-icon" />
          <span className="pb-title">Essential Local Travel Phrasebook</span>
        </div>
        <div className="pb-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              className={`pb-tab-btn ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Phrases Grid */}
      <div className="phrases-grid">
        {filtered.map((phrase, i) => (
          <div key={i} className="phrase-card">
            <div className="phrase-left">
              <span className="phrase-cat-pill">{phrase.cat}</span>
              <div className="phrase-script-line">
                <span className="phrase-native">{phrase.script}</span>
                <span className="phrase-translit">({phrase.text})</span>
              </div>
              <span className="phrase-meaning">{phrase.meaning}</span>
            </div>

            <button
              type="button"
              onClick={() => speakPhrase(phrase.text, i)}
              className={`btn-phrase-speak ${speakingIndex === i ? 'speaking' : ''}`}
              title={`Listen to pronunciation of "${phrase.text}"`}
              aria-label={`Pronounce ${phrase.text}`}
            >
              <Volume2 size={16} />
              <span>{speakingIndex === i ? 'Speaking...' : 'Listen'}</span>
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .phrasebook-container {
          padding: 1.25rem 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border: 1px solid rgba(168, 85, 247, 0.25);
          background: rgba(14, 20, 32, 0.55);
          border-radius: var(--radius-lg);
          margin-top: 0.5rem;
        }
        .pb-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 0.75rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .pb-title-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .pb-icon {
          color: #c084fc;
        }
        .pb-tabs {
          display: flex;
          gap: 0.4rem;
        }
        .pb-tab-btn {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          border: 1px solid var(--border-subtle);
          transition: var(--transition-fast);
        }
        .pb-tab-btn:hover, .pb-tab-btn.active {
          background: #a855f7;
          color: #ffffff;
          border-color: #a855f7;
        }
        .phrases-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.85rem;
        }
        @media (max-width: 820px) {
          .phrases-grid {
            grid-template-columns: 1fr;
          }
        }
        .phrase-card {
          padding: 0.85rem 1rem;
          background: rgba(18, 24, 38, 0.6);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          transition: var(--transition-fast);
        }
        .phrase-card:hover {
          border-color: rgba(168, 85, 247, 0.4);
          transform: translateY(-2px);
        }
        .phrase-left {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          min-width: 0;
        }
        .phrase-cat-pill {
          font-size: 0.65rem;
          font-weight: 700;
          color: #c084fc;
          text-transform: uppercase;
        }
        .phrase-script-line {
          display: flex;
          align-items: baseline;
          gap: 0.45rem;
          flex-wrap: wrap;
        }
        .phrase-native {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .phrase-translit {
          font-size: 0.8rem;
          color: var(--text-highlight);
          font-style: italic;
        }
        .phrase-meaning {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .btn-phrase-speak {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.7rem;
          border-radius: var(--radius-full);
          background: rgba(168, 85, 247, 0.15);
          border: 1px solid rgba(168, 85, 247, 0.35);
          color: #c084fc;
          font-size: 0.72rem;
          font-weight: 700;
          flex-shrink: 0;
          transition: var(--transition-fast);
        }
        .btn-phrase-speak:hover {
          background: #a855f7;
          color: #ffffff;
        }
        .btn-phrase-speak.speaking {
          background: #10b981;
          border-color: #10b981;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}
