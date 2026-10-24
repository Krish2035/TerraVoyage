import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Sun, 
  Moon, 
  Sunrise, 
  Sunset, 
  Globe2 
} from 'lucide-react';
import { getCountryCoordinates } from '../services/worldCoordinates';

export default function TimezoneClockWidget({ country }) {
  const [destTime, setDestTime] = useState(new Date());

  const coords = getCountryCoordinates(country);

  // Timezone calculation by longitude offset approximation: UTC + (lng / 15)
  // 15 degrees longitude = 1 hour
  const rawTzOffsetHours = Math.round((coords.lng / 15) * 2) / 2;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Current UTC time
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      // Destination time
      const destDate = new Date(utc + (3600000 * rawTzOffsetHours));
      setDestTime(destDate);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [rawTzOffsetHours]);

  if (!country) return null;

  const hours = destTime.getHours();
  const minutes = destTime.getMinutes().toString().padStart(2, '0');
  const seconds = destTime.getSeconds().toString().padStart(2, '0');
  const isDay = hours >= 6 && hours < 18;
  const isTwilight = (hours >= 5 && hours < 7) || (hours >= 17 && hours < 19);

  // Local user time difference
  const userOffsetHours = -(new Date().getTimezoneOffset() / 60);
  const diffHours = rawTzOffsetHours - userOffsetHours;
  const diffText = diffHours === 0 
    ? 'Same as your local time zone' 
    : (diffHours > 0 ? `+${diffHours} hrs ahead of you` : `${diffHours} hrs behind you`);

  const dateStr = destTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="timezone-clock-container glass-panel">
      <div className="tz-left">
        <div className={`celestial-orb ${isDay ? 'orb-sun' : 'orb-moon'}`}>
          {isDay ? <Sun size={24} className="sun-icon-spin" /> : <Moon size={22} />}
        </div>
        <div className="tz-info">
          <div className="tz-label-row">
            <span className="tz-capital-label">{coords.capital || country.capital} Standard Time</span>
            <span className="tz-diff-pill">{diffText}</span>
          </div>
          <div className="tz-time-display">
            <span className="tz-digital-time">{hours}:{minutes}:{seconds}</span>
            <span className="tz-am-pm">{hours >= 12 ? 'PM' : 'AM'}</span>
            <span className="tz-date-pill">{dateStr}</span>
          </div>
        </div>
      </div>

      <div className="tz-daylight-status">
        <div className="daylight-badge">
          {isDay ? (
            <span className="dl-text text-amber">☀️ Daylight Hours • Ideal for Sightseeing</span>
          ) : (
            <span className="dl-text text-cyan">🌙 Evening / Night • Dinner & Nightlife</span>
          )}
        </div>
        <span className="tz-sun-window">
          <Sunrise size={12} /> Sunrise ~06:00 • <Sunset size={12} /> Sunset ~18:15
        </span>
      </div>

      <style>{`
        .timezone-clock-container {
          padding: 0.9rem 1.4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid rgba(56, 189, 248, 0.25);
          background: rgba(14, 20, 32, 0.65);
          border-radius: var(--radius-md);
          margin-top: 0.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .tz-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .celestial-orb {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-accent);
          flex-shrink: 0;
        }
        .orb-sun {
          background: radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, rgba(245, 158, 11, 0.05) 70%);
          color: #f59e0b;
          box-shadow: 0 0 16px rgba(245, 158, 11, 0.25);
        }
        .orb-moon {
          background: radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(56, 189, 248, 0.05) 70%);
          color: #38bdf8;
          box-shadow: 0 0 16px rgba(56, 189, 248, 0.25);
        }
        .sun-icon-spin {
          animation: spin 30s linear infinite;
        }
        .tz-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .tz-label-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .tz-capital-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.04em;
        }
        .tz-diff-pill {
          font-size: 0.7rem;
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.12);
          padding: 0.1rem 0.45rem;
          border-radius: var(--radius-full);
          font-weight: 600;
        }
        .tz-time-display {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }
        .tz-digital-time {
          font-family: var(--font-mono);
          font-size: 1.55rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: 0.02em;
        }
        .tz-am-pm {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-highlight);
        }
        .tz-date-pill {
          font-size: 0.75rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
        }
        .tz-daylight-status {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.3rem;
        }
        .daylight-badge {
          font-size: 0.78rem;
          font-weight: 700;
        }
        .text-amber { color: #f59e0b; }
        .text-cyan { color: #38bdf8; }
        .tz-sun-window {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
