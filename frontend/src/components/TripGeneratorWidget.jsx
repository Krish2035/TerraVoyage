import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  CalendarDays, 
  Compass, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  PlusCircle, 
  UtensilsCrossed,
  Sunrise,
  Sun,
  Sunset
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TripGeneratorWidget({ country, onAddMultipleToItinerary }) {
  const [days, setDays] = useState(3);
  const [style, setStyle] = useState('Cultural & Heritage');

  if (!country) return null;

  const rawAttractions = country.attractions || [];

  // Generate day-by-day distribution
  const generatedPlan = useMemo(() => {
    const plan = [];
    const available = [...rawAttractions];

    for (let day = 1; day <= days; day++) {
      const morningAttr = available.shift() || { name: `${country.capital} Historic Old Quarter`, location: country.capital, category: 'Cultural Exploration' };
      const afternoonAttr = available.shift() || { name: `${country.name} National Botanical Gardens`, location: country.capital, category: 'Scenic Walk & Architecture' };
      const eveningAttr = available.shift() || { name: `Night Bazaar & Local Culinary Promenade`, location: country.capital, category: 'Gastronomy & Sunset View' };

      plan.push({
        dayNumber: day,
        title: `Day ${day}: Discovering ${morningAttr.name.split(' ')[0]} & Beyond`,
        morning: morningAttr,
        afternoon: afternoonAttr,
        evening: eveningAttr
      });
    }

    return plan;
  }, [days, style, rawAttractions, country]);

  const handleAddAllToItinerary = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });

    const stopsToAdd = [];
    generatedPlan.forEach(d => {
      [d.morning, d.afternoon, d.evening].forEach(item => {
        if (item.name) {
          stopsToAdd.push({
            id: item.id || `gen-${Math.random()}`,
            name: item.name,
            location: item.location || country.capital,
            category: item.category || 'Curated Itinerary',
            countryName: country.name,
            countryCode: country.code,
            image: item.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80'
          });
        }
      });
    });

    if (onAddMultipleToItinerary) {
      onAddMultipleToItinerary(stopsToAdd);
    }
  };

  return (
    <div className="trip-generator-container glass-panel">
      {/* Header */}
      <div className="tg-header-row">
        <div className="tg-title-box">
          <Sparkles size={18} className="tg-icon" />
          <span className="tg-title">TerraVoyage Smart Day-by-Day Trip Schedule Generator</span>
        </div>

        <div className="tg-controls">
          {/* Days selector */}
          <div className="tg-pill-group">
            {[3, 5, 7].map(d => (
              <button
                key={d}
                type="button"
                className={`tg-pill-btn ${days === d ? 'active' : ''}`}
                onClick={() => setDays(d)}
              >
                {d} Days
              </button>
            ))}
          </div>

          {/* Style selector */}
          <select 
            value={style} 
            onChange={(e) => setStyle(e.target.value)}
            className="tg-style-select"
          >
            <option value="Cultural & Heritage">🏛️ Cultural & Heritage</option>
            <option value="Adventure & Nature">🏔️ Adventure & Nature</option>
            <option value="Foodie & Nightlife">🍜 Foodie & Nightlife</option>
            <option value="Relaxed & Scenic">🌅 Relaxed & Scenic</option>
          </select>
        </div>
      </div>

      {/* Generated Schedule Timeline */}
      <div className="tg-days-stack">
        {generatedPlan.map(dayPlan => (
          <div key={dayPlan.dayNumber} className="day-schedule-card">
            <div className="day-card-header">
              <span className="day-badge">Day {dayPlan.dayNumber}</span>
              <h4 className="day-title">{dayPlan.title}</h4>
            </div>

            <div className="day-slots-grid">
              {/* Morning */}
              <div className="slot-item">
                <div className="slot-time-tag">
                  <Sunrise size={13} className="text-amber" />
                  <span>Morning (09:00 - 12:30)</span>
                </div>
                <strong className="slot-name">{dayPlan.morning.name}</strong>
                <span className="slot-loc"><MapPin size={11} /> {dayPlan.morning.location}</span>
              </div>

              {/* Afternoon */}
              <div className="slot-item">
                <div className="slot-time-tag">
                  <Sun size={13} className="text-cyan" />
                  <span>Afternoon (13:30 - 17:00)</span>
                </div>
                <strong className="slot-name">{dayPlan.afternoon.name}</strong>
                <span className="slot-loc"><MapPin size={11} /> {dayPlan.afternoon.location}</span>
              </div>

              {/* Evening */}
              <div className="slot-item">
                <div className="slot-time-tag">
                  <Sunset size={13} className="text-rose" />
                  <span>Evening (18:00 - 21:30)</span>
                </div>
                <strong className="slot-name">{dayPlan.evening.name}</strong>
                <span className="slot-loc"><UtensilsCrossed size={11} /> Local Dining & Stroll</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Action */}
      <div className="tg-footer-row">
        <span className="tg-stops-count">
          Schedule distributes {days * 3} curated morning, afternoon & evening experiences.
        </span>
        <button
          type="button"
          onClick={handleAddAllToItinerary}
          className="btn-add-all-itinerary"
          id="btn-add-all-days"
        >
          <PlusCircle size={15} />
          <span>Add Entire {days}-Day Plan to My Itinerary</span>
        </button>
      </div>

      <style>{`
        .trip-generator-container {
          padding: 1.25rem 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          border: 1px solid rgba(245, 158, 11, 0.25);
          background: rgba(14, 20, 32, 0.55);
          border-radius: var(--radius-lg);
          margin-top: 0.5rem;
        }
        .tg-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 0.75rem;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .tg-title-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .tg-icon {
          color: var(--accent-gold);
        }
        .tg-controls {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
        .tg-pill-group {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          padding: 2px;
        }
        .tg-pill-btn {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }
        .tg-pill-btn.active {
          background: var(--accent-primary);
          color: #ffffff;
        }
        .tg-style-select {
          background: var(--bg-card);
          color: var(--text-highlight);
          border: 1px solid var(--border-subtle);
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
        }
        .tg-days-stack {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .day-schedule-card {
          padding: 1rem 1.25rem;
          background: rgba(18, 24, 38, 0.6);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .day-card-header {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .day-badge {
          font-size: 0.72rem;
          font-weight: 800;
          color: #ffffff;
          background: var(--accent-primary);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
        }
        .day-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .day-slots-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }
        @media (max-width: 820px) {
          .day-slots-grid {
            grid-template-columns: 1fr;
          }
        }
        .slot-item {
          padding: 0.65rem 0.85rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .slot-time-tag {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.68rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }
        .text-amber { color: #f59e0b; }
        .text-cyan { color: #38bdf8; }
        .text-rose { color: #f43f5e; }
        .slot-name {
          font-size: 0.85rem;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .slot-loc {
          font-size: 0.72rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        .tg-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.5rem;
          border-top: 1px solid var(--border-subtle);
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .tg-stops-count {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .btn-add-all-itinerary {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.55rem 1.15rem;
          border-radius: var(--radius-full);
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #ffffff;
          font-size: 0.82rem;
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
          transition: var(--transition-fast);
          cursor: pointer;
        }
        .btn-add-all-itinerary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(245, 158, 11, 0.5);
        }
      `}</style>
    </div>
  );
}
