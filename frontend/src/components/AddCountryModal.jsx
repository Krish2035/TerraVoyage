import React, { useState } from 'react';
import { X, Globe, Plus, AlertCircle, Check } from 'lucide-react';

export default function AddCountryModal({ isOpen, onClose, onCountryAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    officialName: '',
    code: '',
    flag: '',
    capital: '',
    population: '',
    populationNum: '',
    gdp: '',
    gdpNum: '',
    perCapitaIncome: '',
    perCapitaNum: '',
    currency: '',
    region: 'East Asia',
    languages: '',
    bestTimeToVisit: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryCodeChange = (e) => {
    const code = e.target.value.toUpperCase().slice(0, 3);
    setFormData(prev => ({
      ...prev,
      code,
      flag: prev.flag || (code.length === 2 ? `https://flagcdn.com/w640/${code.toLowerCase()}.png` : prev.flag)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!formData.name || !formData.code || !formData.capital || !formData.population || !formData.gdp || !formData.perCapitaIncome) {
      setError('Please fill in all essential required fields (*)');
      return;
    }

    try {
      setLoading(true);
      await onCountryAdded(formData);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to add country');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="add-modal-card glass-panel animate-scale-in" 
        onClick={e => e.stopPropagation()}
        id="modal-add-country"
      >
        <div className="add-modal-header">
          <div className="add-header-title">
            <Globe className="add-icon" size={20} />
            <h2>Register New Country</h2>
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
            <div className="form-group">
              <label>Country Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Germany"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>2-Letter ISO Code *</label>
              <input
                type="text"
                name="code"
                required
                placeholder="e.g. DE"
                maxLength={3}
                value={formData.code}
                onChange={handleCountryCodeChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Official / Native Name</label>
              <input
                type="text"
                name="officialName"
                placeholder="e.g. Federal Republic of Germany (Bundesrepublik Deutschland)"
                value={formData.officialName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Flag Image URL *</label>
              <input
                type="url"
                name="flag"
                required
                placeholder="https://flagcdn.com/w640/de.png"
                value={formData.flag}
                onChange={handleChange}
              />
              {formData.flag && (
                <div className="flag-preview-box">
                  <img src={formData.flag} alt="Preview" className="flag-mini-preview" onError={(e) => e.target.style.display='none'} />
                  <span>Flag Live Preview</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Capital City *</label>
              <input
                type="text"
                name="capital"
                required
                placeholder="e.g. Berlin"
                value={formData.capital}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Geographic Region *</label>
              <select name="region" value={formData.region} onChange={handleChange}>
                <option value="East Asia">East Asia</option>
                <option value="Western Europe">Western Europe</option>
                <option value="Central Europe">Central Europe</option>
                <option value="Southern Europe">Southern Europe</option>
                <option value="Northern Europe">Northern Europe</option>
                <option value="South Asia">South Asia</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
                <option value="Oceania">Oceania</option>
                <option value="North Africa">North Africa</option>
                <option value="Sub-Saharan Africa">Sub-Saharan Africa</option>
                <option value="Middle East">Middle East</option>
              </select>
            </div>

            {/* Essential Metrics Fields */}
            <div className="form-group">
              <label>Population (Formatted) *</label>
              <input
                type="text"
                name="population"
                required
                placeholder="e.g. 84.4 Million"
                value={formData.population}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>GDP (Nominal) *</label>
              <input
                type="text"
                name="gdp"
                required
                placeholder="e.g. $4.45 Trillion"
                value={formData.gdp}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Per Capita Income *</label>
              <input
                type="text"
                name="perCapitaIncome"
                required
                placeholder="e.g. $52,800"
                value={formData.perCapitaIncome}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Currency & Symbol *</label>
              <input
                type="text"
                name="currency"
                required
                placeholder="e.g. Euro (€, EUR)"
                value={formData.currency}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Official Languages</label>
              <input
                type="text"
                name="languages"
                placeholder="e.g. German"
                value={formData.languages}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Best Time to Visit & Climate</label>
              <input
                type="text"
                name="bestTimeToVisit"
                placeholder="e.g. May to September (Summer festivals) & December (Christmas markets)"
                value={formData.bestTimeToVisit}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Country Overview / Tourism Description</label>
              <textarea
                name="description"
                rows={3}
                placeholder="Brief summary of geography, cultural identity, and travel appeal..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-submit">
              {loading ? 'Saving to Database...' : 'Register Country'}
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
          color: var(--accent-primary);
        }
        .add-header-title h2 {
          font-size: 1.25rem;
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
        .flag-preview-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.4rem;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .flag-mini-preview {
          width: 36px;
          height: 24px;
          object-fit: cover;
          border-radius: 3px;
          border: 1px solid rgba(255, 255, 255, 0.2);
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
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: #ffffff;
          font-weight: 600;
          box-shadow: 0 4px 12px var(--accent-glow);
        }
      `}</style>
    </div>
  );
}
