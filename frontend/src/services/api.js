const API_BASE = (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '') + '/api/v1';

export const apiService = {
  // Fetch all countries with filters
  async getCountries(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.region && params.region !== 'all') query.append('region', params.region);
    if (params.sortBy) query.append('sortBy', params.sortBy);

    const res = await fetch(`${API_BASE}/countries?${query.toString()}`);
    if (!res.ok) {
      throw new Error(`Failed to load countries: ${res.statusText}`);
    }
    return res.json();
  },

  // Fetch single country by ID
  async getCountry(id) {
    const res = await fetch(`${API_BASE}/countries/${encodeURIComponent(id)}`);
    if (!res.ok) {
      throw new Error(`Country not found: ${res.statusText}`);
    }
    return res.json();
  },

  // Add a new country
  async createCountry(countryData) {
    const res = await fetch(`${API_BASE}/countries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(countryData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to create country');
    }
    return res.json();
  },

  // Add attraction to a country
  async createAttraction(countryId, attractionData) {
    const res = await fetch(`${API_BASE}/countries/${encodeURIComponent(countryId)}/attractions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attractionData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to create attraction');
    }
    return res.json();
  },

  // Fetch attraction details
  async getAttraction(id) {
    const res = await fetch(`${API_BASE}/attractions/${encodeURIComponent(id)}`);
    if (!res.ok) {
      throw new Error(`Attraction not found: ${res.statusText}`);
    }
    return res.json();
  },

  // Fetch platform health & 112 pillars status
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) {
      throw new Error(`Health check failed: ${res.statusText}`);
    }
    return res.json();
  }
};
