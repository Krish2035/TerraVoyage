import React, { useState } from 'react';
import { 
  Languages, 
  Volume2, 
  Sparkles, 
  MessageSquareQuote,
  CheckCircle2,
  Mic,
  Globe2
} from 'lucide-react';
import { getPhrasesForCountry } from '../services/travelKitData';
import { getLanguageCodeForCountry } from '../services/worldCoordinates';

export default function TravelPhrasebookWidget({ country }) {
  const [activeTab, setActiveTab] = useState('All');
  const [speakingIndex, setSpeakingIndex] = useState(null);

  if (!country) return null;

  const phrases = getPhrasesForCountry(country);
  const categories = ['All', 'Greetings', 'Dining', 'Directions', 'Safety'];

  const detectedLangName = phrases[0]?.langName || 'Local Language';

  const filtered = activeTab === 'All' 
    ? phrases 
    : phrases.filter(p => p.cat === activeTab);

  const speakPhrase = (phrase, idx) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Use authentic local native characters for native speech synthesis (e.g. "你好" for Chinese)
    const textToSpeak = phrase.speak || phrase.native || phrase.script || phrase.english || phrase.text;
    const targetLang = phrase.langCode || getLanguageCodeForCountry(country);

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = targetLang;
    utterance.rate = 0.82; // clear cadence for language learners

    try {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const langPrefix = targetLang.split('-')[0].toLowerCase();
        const matched = voices.find(v => v.lang.toLowerCase() === targetLang.toLowerCase()) ||
                        voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(langPrefix));
        if (matched) {
          utterance.voice = matched;
        }
      }
    } catch (e) {
      // Voice matching fallback
    }

    utterance.onstart = () => setSpeakingIndex(idx);
    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="phrasebook-container glass-panel">
      {/* Header */}
      <div className="pb-header-row">
        <div className="pb-title-col">
          <div className="pb-title-box">
            <Languages size={20} className="pb-icon" />
            <span className="pb-title">Essential Local Travel Phrasebook</span>
          </div>
          <div className="pb-lang-pill-row">
            <span className="pb-lang-indicator">
              <Globe2 size={12} />
              <span>Native Language: <strong>{detectedLangName}</strong></span>
            </span>
            <span className="pb-bilingual-hint">
              🇺🇸 English + Local Script for seamless communication with locals
            </span>
          </div>
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
              <div className="phrase-badge-row">
                <span className="phrase-cat-pill">{phrase.cat}</span>
                <span className="phrase-lang-pill">{phrase.langName || detectedLangName}</span>
              </div>

              {/* Dual-Language Display: English & Native Script Side-by-Side */}
              <div className="phrase-bilingual-row">
                <span className="phrase-english">{phrase.english || phrase.script}</span>
                <span className="phrase-dot">•</span>
                <span className="phrase-native">{phrase.native || phrase.script}</span>
              </div>

              {/* Phonetic Pronunciation Guide */}
              {phrase.phonetic && (
                <div className="phrase-phonetic-badge">
                  <span className="phonetic-icon">🗣️</span>
                  <span className="phonetic-label">Say:</span>
                  <span className="phonetic-text">"{phrase.phonetic}"</span>
                </div>
              )}

              {/* Meaning & Usage Context */}
              <span className="phrase-meaning">{phrase.meaning}</span>
            </div>

            <button
              type="button"
              onClick={() => speakPhrase(phrase, i)}
              className={`btn-phrase-speak ${speakingIndex === i ? 'speaking' : ''}`}
              title={`Listen to authentic native pronunciation of "${phrase.english || phrase.native}"`}
              aria-label={`Pronounce ${phrase.english || phrase.native}`}
            >
              <Volume2 size={16} />
              <span>{speakingIndex === i ? 'Speaking...' : 'Listen'}</span>
            </button>
          </div>
        ))}
      </div>

      <style>{`
        .phrasebook-container {
          padding: 1.35rem 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          border: 1px solid rgba(168, 85, 247, 0.28);
          background: linear-gradient(135deg, rgba(14, 20, 32, 0.7) 0%, rgba(20, 16, 36, 0.6) 100%);
          border-radius: var(--radius-lg);
          margin-top: 0.5rem;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
        }
        .pb-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 0.85rem;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .pb-title-col {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .pb-title-box {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .pb-icon {
          color: #c084fc;
        }
        .pb-lang-pill-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
        .pb-lang-indicator {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          background: rgba(168, 85, 247, 0.14);
          border: 1px solid rgba(168, 85, 247, 0.35);
          color: #d8b4fe;
          padding: 0.15rem 0.6rem;
          border-radius: var(--radius-full);
        }
        .pb-bilingual-hint {
          font-size: 0.7rem;
          color: var(--text-muted);
        }
        .pb-tabs {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .pb-tab-btn {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          border: 1px solid var(--border-subtle);
          transition: var(--transition-fast);
          cursor: pointer;
        }
        .pb-tab-btn:hover {
          background: rgba(168, 85, 247, 0.25);
          color: #ffffff;
          border-color: rgba(168, 85, 247, 0.5);
        }
        .pb-tab-btn.active {
          background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
          color: #ffffff;
          border-color: #a855f7;
          box-shadow: 0 4px 12px rgba(168, 85, 247, 0.35);
        }
        .phrases-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.95rem;
        }
        @media (max-width: 860px) {
          .phrases-grid {
            grid-template-columns: 1fr;
          }
        }
        .phrase-card {
          padding: 1rem 1.15rem;
          background: rgba(18, 24, 38, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.9rem;
          transition: all 0.2s ease-in-out;
        }
        .phrase-card:hover {
          border-color: rgba(168, 85, 247, 0.45);
          background: rgba(24, 30, 48, 0.75);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
        }
        .phrase-left {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          min-width: 0;
          flex: 1;
        }
        .phrase-badge-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .phrase-cat-pill {
          font-size: 0.62rem;
          font-weight: 800;
          color: #c084fc;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .phrase-lang-pill {
          font-size: 0.62rem;
          font-weight: 600;
          color: #94a3b8;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.1rem 0.45rem;
          border-radius: 4px;
        }
        .phrase-bilingual-row {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .phrase-english {
          font-size: 1.05rem;
          font-weight: 700;
          color: #ffffff;
        }
        .phrase-dot {
          color: #64748b;
          font-weight: 400;
        }
        .phrase-native {
          font-size: 1.15rem;
          font-weight: 800;
          color: #38bdf8;
          letter-spacing: 0.02em;
        }
        .phrase-phonetic-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: #fef08a;
          background: rgba(234, 179, 8, 0.1);
          border: 1px solid rgba(234, 179, 8, 0.22);
          padding: 0.18rem 0.55rem;
          border-radius: 4px;
          width: fit-content;
        }
        .phonetic-icon {
          font-size: 0.75rem;
        }
        .phonetic-label {
          font-weight: 700;
          color: #fbbf24;
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }
        .phonetic-text {
          font-style: italic;
          font-weight: 500;
        }
        .phrase-meaning {
          font-size: 0.72rem;
          color: var(--text-muted);
          line-height: 1.3;
        }
        .btn-phrase-speak {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-full);
          background: rgba(168, 85, 247, 0.15);
          border: 1px solid rgba(168, 85, 247, 0.38);
          color: #d8b4fe;
          font-size: 0.75rem;
          font-weight: 700;
          flex-shrink: 0;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .btn-phrase-speak:hover {
          background: #a855f7;
          border-color: #a855f7;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(168, 85, 247, 0.45);
          transform: scale(1.04);
        }
        .btn-phrase-speak.speaking {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-color: #10b981;
          color: #ffffff;
          box-shadow: 0 0 16px rgba(16, 185, 129, 0.6);
          animation: pulseSpeaking 1.2s infinite;
        }
        @keyframes pulseSpeaking {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}

