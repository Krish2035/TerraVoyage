import React, { useState } from 'react';
import { X, Landmark, Plus, AlertCircle, Sparkles } from 'lucide-react';

export default function AddAttractionModal({ isOpen, country, onClose, onAttractionAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    category: 'Historic Landmark',
    image: '',
    whyFamous: '',
    elevation: '',
    unescoStatus: '',
    bestTimeOfDay: '',
    highlightsText: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !country) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!formData.name || !formData.location || !formData.whyFamous) {
      setError('Name, location, and Why-Famous description are required (*)');
      return;
    }

    const highlights = formData.highlightsText
      ? formData.highlightsText.split('\n').map(s => s.trim()).filter(Boolean)
      : [];

    const specs = {};
    if (formData.elevation) specs.elevation = formData.elevation;
    if (formData.unescoStatus) specs.unescoStatus = formData.unescoStatus;
    if (formData.bestTimeOfDay) specs.bestTimeOfDay = formData.bestTimeOfDay;
    if (highlights.length > 0) specs.highlights = highlights;

    const payload = {
      name: formData.name,
      location: formData.location,
      category: formData.category,
      image: formData.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
      whyFamous: formData.whyFamous,
      specs
    };

    try {
      setLoading(true);
      await onAttractionAdded(country.id, payload);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to add attraction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="add-modal-card glass-panel animate-scale-in" 
        onClick={e => e.stopPropagation()}
        id="modal-add-attraction"
      >
        <div className="add-modal-header">
          <div className="add-header-title">
            <Landmark className="add-icon" size={20} />
            <h2>Add Landmark to {country.name}</h2>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="error-alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="add-form-scroll">
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Attraction Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Neuschwanstein Castle"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Location / City *</label>
              <input
                type="text"
                name="location"
                required
                placeholder="e.g. Bavaria"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="Historic Landmark">Historic Landmark</option>
                <option value="Natural Wonder">Natural Wonder</option>
                <option value="Architectural Marvel">Architectural Marvel</option>
                <option value="Sacred Temple / Shrine">Sacred Temple / Shrine</option>
                <option value="Art & Museum">Art & Museum</option>
                <option value="National Park">National Park</option>
                <option value="Coastal Wonder">Coastal Wonder</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Attraction High-Res Photo URL</label>
              <input
                type="url"
                name="image"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Why Is This Place So Famous? *</label>
              <textarea
                name="whyFamous"
                required
                rows={3}
                placeholder="Explain the historical significance, cultural context, or unique specs that made it world famous..."
                value={formData.whyFamous}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Elevation / Dimensions (Spec)</label>
              <input
                type="text"
                name="elevation"
                placeholder="e.g. 965 meters (3,166 ft)"
                value={formData.elevation}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>UNESCO Status (Spec)</label>
              <input
                type="text"
                name="unescoStatus"
                placeholder="e.g. World Heritage Site candidate"
                value={formData.unescoStatus}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Best Time of Day / Visiting Hours (Spec)</label>
              <input
                type="text"
                name="bestTimeOfDay"
                placeholder="e.g. Morning 09:00 - 11:00 for optimal sunlight"
                value={formData.bestTimeOfDay}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Key Highlights Checklist (1 item per line)</label>
              <textarea
                name="highlightsText"
                rows={3}
                placeholder="Fairytale Romanesque Revival towers&#10;Inspiration for Disney's Cinderella castle&#10;Marienbrücke panoramic bridge viewpoint"
                value={formData.highlightsText}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? 'Registering Landmark...' : 'Save Landmark & Specs'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .add-modal-card {
          width: 100%;
          max-width: 680px;
          max-height: 88vh;
          background: var(--bg-secondary);
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
        }
        .add-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .add-header-title {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .add-icon {
          color: var(--accent-gold);
        }
        .error-alert {
          margin: 1rem 1.5rem 0 1.5rem;
          padding: 0.75rem 1rem;
          background: rgba(244, 63, 94, 0.15);
          border: 1px solid rgba(244, 63, 94, 0.4);
          border-radius: var(--radius-sm);
          color: #fca5a5;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .add-form-scroll {
          padding: 1.5rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (max-width: 600px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .form-group.full-width {
          grid-column: 1 / -1;
        }
        .form-group label {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .form-group input, .form-group select, .form-group textarea {
          background: var(--bg-input);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 0.6rem 0.85rem;
          color: var(--text-primary);
          font-size: 0.88rem;
          transition: var(--transition-fast);
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          border-color: var(--border-focus);
          box-shadow: 0 0 0 2px var(--accent-glow);
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-subtle);
        }
        .btn-cancel {
          padding: 0.6rem 1.2rem;
          border-radius: var(--radius-md);
          background: var(--bg-card);
          color: var(--text-secondary);
          font-weight: 500;
        }
        .btn-submit {
          padding: 0.6rem 1.4rem;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #ffffff;
          font-weight: 600;
          box-shadow: 0 4px 12px var(--accent-gold-glow);
        }
      `}</style>
    </div>
  );
}
