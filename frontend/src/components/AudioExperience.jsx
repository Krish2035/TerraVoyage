import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Music, 
  Sparkles, 
  Disc3 
} from 'lucide-react';
import { getLanguageCodeForCountry } from '../services/worldCoordinates';

// Known national anthem titles for quick rich labeling
const ANTHEM_TITLES = {
  IN: 'Jana Gana Mana ("Thou Art the Ruler of Minds")',
  FR: 'La Marseillaise ("The Song of Marseille")',
  JP: 'Kimigayo ("His Imperial Majesty\'s Reign")',
  US: 'The Star-Spangled Banner',
  GB: 'God Save the King',
  DE: 'Lied der Deutschen ("Song of the Germans")',
  IT: 'Il Canto degli Italiani ("The Song of Italians")',
  ES: 'Marcha Real ("The Royal March")',
  BR: 'Hino Nacional Brasileiro',
  CA: 'O Canada',
  AU: 'Advance Australia Fair',
  RU: 'State Anthem of the Russian Federation',
  CN: 'March of the Volunteers',
  KR: 'Aegukga ("The Patriotic Song")',
  EG: 'Bilady, Bilady, Bilady ("My Homeland")',
  MX: 'Himno Nacional Mexicano',
  ZA: 'National Anthem of South Africa',
  SA: 'As-Salam Al-Malaki ("The Royal Salute")',
  AE: 'Ishy Bilady ("Long Live My Homeland")',
  TH: 'Phleng Chat Thai ("National Anthem of Thailand")'
};

// 1. Subtle Pronunciation Speaker Button
export function PronunciationSpeaker({ text, country, label = 'Listen Pronunciation', size = 16 }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (e) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getLanguageCodeForCountry(country);
    utterance.rate = 0.88; // Slightly slower for crisp clear pronunciation
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      type="button"
      onClick={speak}
      className={`btn-pronounce ${isSpeaking ? 'is-speaking' : ''}`}
      title={`${label}: "${text}"`}
      aria-label={`Pronounce ${text}`}
    >
      <Volume2 size={size} className="pronounce-icon" />
      {isSpeaking && (
        <span className="speaking-wave-bars">
          <span className="bar bar-1"></span>
          <span className="bar bar-2"></span>
          <span className="bar bar-3"></span>
        </span>
      )}

      <style>{`
        .btn-pronounce {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.5rem;
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.25);
          border-radius: var(--radius-full);
          color: #38bdf8;
          font-size: 0.72rem;
          cursor: pointer;
          transition: var(--transition-fast);
          vertical-align: middle;
        }
        .btn-pronounce:hover {
          background: rgba(99, 102, 241, 0.3);
          border-color: #38bdf8;
          color: #ffffff;
          transform: scale(1.05);
        }
        .btn-pronounce.is-speaking {
          background: rgba(16, 185, 129, 0.2);
          border-color: #10b981;
          color: #10b981;
        }
        .speaking-wave-bars {
          display: inline-flex;
          align-items: flex-end;
          gap: 2px;
          height: 12px;
        }
        .bar {
          width: 2px;
          background: currentColor;
          border-radius: 1px;
          animation: waveBar 0.8s ease-in-out infinite alternate;
        }
        .bar-1 { height: 4px; animation-delay: 0.1s; }
        .bar-2 { height: 10px; animation-delay: 0.3s; }
        .bar-3 { height: 6px; animation-delay: 0.2s; }
        @keyframes waveBar {
          from { height: 3px; }
          to { height: 12px; }
        }
      `}</style>
    </button>
  );
}

// 2. High-Fidelity National Anthem Preview Player Widget
export function NationalAnthemPlayer({ country }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const timerRef = useRef(null);

  const code = (country?.code || '').toUpperCase();
  const anthemTitle = ANTHEM_TITLES[code] || `National Anthem of ${country?.name}`;

  // Stop sound when unmounted or country switches
  useEffect(() => {
    return () => {
      stopAnthem();
    };
  }, [country?.id]);

  const stopAnthem = () => {
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
      audioCtxRef.current = null;
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
    setProgress(0);
  };

  // Play anthem melody using Web Audio API harmonic orchestrator
  const playAnthemMelody = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : 0.25, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Elegant ceremonial trumpet/brass triad chord notes sequence
      const melodyNotes = [
        { f: 392.00, d: 0.4 }, // G4
        { f: 523.25, d: 0.4 }, // C5
        { f: 659.25, d: 0.6 }, // E5
        { f: 783.99, d: 0.8 }, // G5
        { f: 659.25, d: 0.4 }, // E5
        { f: 783.99, d: 1.0 }, // G5
        { f: 880.00, d: 0.6 }, // A5
        { f: 783.99, d: 0.4 }, // G5
        { f: 659.25, d: 0.5 }, // E5
        { f: 523.25, d: 0.9 }, // C5
        { f: 587.33, d: 0.5 }, // D5
        { f: 523.25, d: 1.2 }  // C5
      ];

      let startTime = ctx.currentTime + 0.1;

      melodyNotes.forEach(note => {
        // Oscillator 1 (Brass Body)
        const osc1 = ctx.createOscillator();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(note.f, startTime);

        // Oscillator 2 (Harmonic Brilliance)
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(note.f * 1.5, startTime);

        const noteGain = ctx.createGain();
        noteGain.gain.setValueAtTime(0.001, startTime);
        noteGain.gain.exponentialRampToValueAtTime(0.3, startTime + 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + note.d);

        osc1.connect(noteGain);
        osc2.connect(noteGain);
        noteGain.connect(masterGain);

        osc1.start(startTime);
        osc2.start(startTime);
        osc1.stop(startTime + note.d);
        osc2.stop(startTime + note.d);

        startTime += note.d;
      });

      setIsPlaying(true);

      const totalDuration = melodyNotes.reduce((acc, n) => acc + n.d, 0) * 1000;
      const step = 100;
      let elapsed = 0;

      timerRef.current = setInterval(() => {
        elapsed += step;
        const pct = Math.min((elapsed / totalDuration) * 100, 100);
        setProgress(pct);

        if (elapsed >= totalDuration) {
          stopAnthem();
        }
      }, step);

    } catch (e) {
      console.warn('Web Audio synthesis error:', e);
      setIsPlaying(false);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAnthem();
    } else {
      playAnthemMelody();
    }
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(nextMute ? 0 : 0.25, audioCtxRef.current.currentTime);
    }
  };

  if (!country) return null;

  return (
    <div className="national-anthem-card glass-panel">
      <div className="anthem-left">
        <div className={`anthem-disc-circle ${isPlaying ? 'spinning' : ''}`}>
          <Disc3 size={24} className="disc-icon" />
        </div>
        <div className="anthem-info">
          <div className="anthem-tag-row">
            <span className="anthem-tag">
              <Music size={11} /> National Anthem Preview
            </span>
            <span className="anthem-country-name">{country.name}</span>
          </div>
          <h4 className="anthem-title-text">{anthemTitle}</h4>
        </div>
      </div>

      <div className="anthem-controls">
        {/* Visual Equalizer Bars */}
        <div className={`anthem-equalizer ${isPlaying ? 'active' : ''}`}>
          <span className="eq-bar eq-1"></span>
          <span className="eq-bar eq-2"></span>
          <span className="eq-bar eq-3"></span>
          <span className="eq-bar eq-4"></span>
          <span className="eq-bar eq-5"></span>
        </div>

        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={handleTogglePlay}
          className={`btn-anthem-play ${isPlaying ? 'playing' : ''}`}
          id="btn-anthem-play"
          title={isPlaying ? 'Pause Anthem' : 'Play Anthem Preview'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="play-offset" />}
          <span>{isPlaying ? 'Playing Preview' : 'Play Anthem'}</span>
        </button>

        {/* Mute Button */}
        <button
          type="button"
          onClick={handleToggleMute}
          className="btn-anthem-mute"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      {/* Progress track line */}
      <div className="anthem-progress-bar">
        <div className="anthem-progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <style>{`
        .national-anthem-card {
          padding: 0.9rem 1.4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid rgba(99, 102, 241, 0.25);
          background: rgba(14, 20, 32, 0.65);
          border-radius: var(--radius-md);
          position: relative;
          overflow: hidden;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .anthem-progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: rgba(255, 255, 255, 0.06);
        }
        .anthem-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #38bdf8);
          transition: width 0.1s linear;
        }
        .anthem-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .anthem-disc-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(56, 189, 248, 0.25));
          border: 1px solid var(--border-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #38bdf8;
          flex-shrink: 0;
        }
        .anthem-disc-circle.spinning {
          animation: spin 3s linear infinite;
        }
        .anthem-info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .anthem-tag-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }
        .anthem-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.7rem;
          color: #38bdf8;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .anthem-country-name {
          font-size: 0.72rem;
          color: var(--text-muted);
        }
        .anthem-title-text {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .anthem-controls {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .anthem-equalizer {
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 18px;
        }
        .eq-bar {
          width: 3px;
          background: var(--text-muted);
          border-radius: 2px;
          height: 4px;
          transition: height 0.2s ease;
        }
        .anthem-equalizer.active .eq-bar {
          background: #38bdf8;
          animation: eqDance 0.6s infinite alternate ease-in-out;
        }
        .anthem-equalizer.active .eq-1 { animation-delay: 0.1s; }
        .anthem-equalizer.active .eq-2 { animation-delay: 0.25s; }
        .anthem-equalizer.active .eq-3 { animation-delay: 0.05s; }
        .anthem-equalizer.active .eq-4 { animation-delay: 0.35s; }
        .anthem-equalizer.active .eq-5 { animation-delay: 0.15s; }
        @keyframes eqDance {
          0% { height: 3px; }
          100% { height: 18px; }
        }
        .btn-anthem-play {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, #6366f1, #38bdf8);
          color: #ffffff;
          font-size: 0.82rem;
          font-weight: 700;
          box-shadow: 0 4px 14px var(--accent-glow);
          transition: var(--transition-fast);
          cursor: pointer;
        }
        .btn-anthem-play:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px var(--accent-glow);
        }
        .btn-anthem-play.playing {
          background: linear-gradient(135deg, #10b981, #059669);
        }
        .play-offset {
          margin-left: 2px;
        }
        .btn-anthem-mute {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }
        .btn-anthem-mute:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </div>
  );
}
