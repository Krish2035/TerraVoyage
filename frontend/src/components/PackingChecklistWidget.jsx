import React, { useState, useEffect } from 'react';
import { 
  Luggage, 
  CheckSquare, 
  Square, 
  Plus, 
  RotateCcw, 
  Sparkles, 
  Sun, 
  CloudRain, 
  Snowflake, 
  ShieldCheck 
} from 'lucide-react';
import { getCountrySpecsKit } from '../services/travelKitData';

export default function PackingChecklistWidget({ country }) {
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState('');

  const kit = getCountrySpecsKit(country);
  const storageKey = `terra_packing_${country?.code || 'global'}`;

  // Generate initial climate-aware items
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setItems(JSON.parse(saved));
        return;
      }
    } catch (e) {}

    const climate = (country?.climate || '').toLowerCase();
    const isCold = climate.includes('cold') || climate.includes('snow') || climate.includes('alpine') || climate.includes('polar');
    const isTropical = climate.includes('tropical') || climate.includes('humid') || climate.includes('monsoon') || climate.includes('warm');

    const defaultItems = [
      { id: 1, text: 'Passport (6+ months validity) & physical visa printouts', cat: 'Docs', checked: false },
      { id: 2, text: `Universal Travel Adapter (${kit?.plugs.join(', ') || 'Plug Adapter'})`, cat: 'Tech', checked: false },
      { id: 3, text: 'Portable Power Bank (Under 100Wh for flights)', cat: 'Tech', checked: false },
      { id: 4, text: 'Credit Cards (Zero foreign transaction fee) & small local cash', cat: 'Finance', checked: false },
      { id: 5, text: 'Travel Medical & Cancellation Insurance Policy details', cat: 'Docs', checked: false },
      { id: 6, text: isCold ? 'Thermal base layers, windproof winter coat & gloves' : (isTropical ? 'Lightweight breathable cotton/linen apparel & swimwear' : 'Versatile layered apparel & light jacket'), cat: 'Apparel', checked: false },
      { id: 7, text: 'Comfortable walking / hiking shoes for daily sightseeing', cat: 'Apparel', checked: false },
      { id: 8, text: isTropical ? 'High-SPF Sunscreen, sunglasses & UV umbrella' : 'Lip balm, moisturizing lotion & UV sunglasses', cat: 'Health', checked: false },
      { id: 9, text: 'Prescription medications in original packaging', cat: 'Health', checked: false }
    ];

    setItems(defaultItems);
  }, [country?.code]);

  const toggleCheck = (id) => {
    const updated = items.map(item => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {}
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    const item = {
      id: Date.now(),
      text: newItemText.trim(),
      cat: 'Custom',
      checked: false
    };
    const updated = [...items, item];
    setItems(updated);
    setNewItemText('');
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {}
  };

  const handleResetChecklist = () => {
    const resetItems = items.map(i => ({ ...i, checked: false }));
    setItems(resetItems);
    try {
      localStorage.setItem(storageKey, JSON.stringify(resetItems));
    } catch (e) {}
  };

  if (!country) return null;

  const packedCount = items.filter(i => i.checked).length;
  const progressPct = items.length > 0 ? Math.round((packedCount / items.length) * 100) : 0;

  return (
    <div className="packing-widget-container glass-panel">
      {/* Header */}
      <div className="pw-header-row">
        <div className="pw-title-box">
          <Luggage size={18} className="pw-icon" />
          <span className="pw-title">Climate-Aware Packing Checklist</span>
        </div>
        <div className="pw-header-actions">
          <span className="pw-progress-pill">{packedCount} of {items.length} Packed ({progressPct}%)</span>
          <button
            type="button"
            onClick={handleResetChecklist}
            className="pw-reset-btn"
            title="Uncheck all items"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="pw-progress-bar-bg">
        <div className="pw-progress-bar-fill" style={{ width: `${progressPct}%` }}></div>
      </div>

      {/* Checklist items */}
      <div className="pw-items-list">
        {items.map(item => (
          <div 
            key={item.id} 
            className={`pw-item-row ${item.checked ? 'is-checked' : ''}`}
            onClick={() => toggleCheck(item.id)}
          >
            <button type="button" className="pw-checkbox-btn">
              {item.checked ? <CheckSquare size={16} className="text-emerald" /> : <Square size={16} className="text-muted" />}
            </button>
            <span className="pw-item-cat">{item.cat}</span>
            <span className="pw-item-text">{item.text}</span>
          </div>
        ))}
      </div>

      {/* Add Custom Item Input */}
      <form onSubmit={handleAddItem} className="pw-add-form">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add custom packing item (e.g. camera tripod, earplugs)..."
          className="pw-add-input"
        />
        <button type="submit" className="pw-add-btn">
          <Plus size={15} />
          <span>Add</span>
        </button>
      </form>

      <style>{`
        .packing-widget-container {
          padding: 1.25rem 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border: 1px solid rgba(16, 185, 129, 0.25);
          background: rgba(14, 20, 32, 0.55);
          border-radius: var(--radius-lg);
          margin-top: 0.5rem;
        }
        .pw-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 0.75rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .pw-title-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .pw-icon {
          color: var(--accent-emerald);
        }
        .pw-header-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .pw-progress-pill {
          font-size: 0.72rem;
          color: var(--accent-emerald);
          background: rgba(16, 185, 129, 0.12);
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full);
          font-weight: 700;
        }
        .pw-reset-btn {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }
        .pw-reset-btn:hover {
          color: #f43f5e;
          background: rgba(244, 63, 94, 0.15);
        }
        .pw-progress-bar-bg {
          height: 4px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .pw-progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #10b981, #38bdf8);
          transition: width 0.25s ease;
        }
        .pw-items-list {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          max-height: 250px;
          overflow-y: auto;
        }
        .pw-item-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 0.75rem;
          background: rgba(18, 24, 38, 0.5);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .pw-item-row:hover {
          border-color: rgba(16, 185, 129, 0.35);
        }
        .pw-item-row.is-checked {
          opacity: 0.6;
          text-decoration: line-through;
          background: rgba(0, 0, 0, 0.3);
        }
        .pw-checkbox-btn {
          background: none;
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .text-emerald { color: #10b981; }
        .text-muted { color: var(--text-muted); }
        .pw-item-cat {
          font-size: 0.65rem;
          font-weight: 700;
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.1);
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
        }
        .pw-item-text {
          font-size: 0.8rem;
          color: var(--text-primary);
        }
        .pw-add-form {
          display: flex;
          gap: 0.5rem;
        }
        .pw-add-input {
          flex: 1;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          padding: 0.5rem 0.8rem;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
        }
        .pw-add-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: #10b981;
          padding: 0.5rem 0.9rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .pw-add-btn:hover {
          background: #10b981;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}
