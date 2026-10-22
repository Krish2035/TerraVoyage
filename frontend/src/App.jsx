import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import CountrySelector from './components/CountrySelector';
import CountryDetailStage from './components/CountryDetailStage';
import AttractionsSection from './components/AttractionsSection';
import AttractionSpecsModal from './components/AttractionSpecsModal';
import AddCountryModal from './components/AddCountryModal';
import AddAttractionModal from './components/AddAttractionModal';
import Architecture112Modal from './components/Architecture112Modal';
import { apiService } from './services/api';
import { Loader2, AlertCircle } from 'lucide-react';

export default function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Modals
  const [isAddCountryOpen, setIsAddCountryOpen] = useState(false);
  const [isAddAttractionOpen, setIsAddAttractionOpen] = useState(false);
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);

  // System & Health
  const [systemStatus, setSystemStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('dark');

  // Apply Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Fetch Health & Architecture Parameters
  const loadHealth = useCallback(async () => {
    try {
      const data = await apiService.getHealth();
      setSystemStatus(data);
    } catch (err) {
      console.warn('Could not fetch health status:', err.message);
    }
  }, []);

  // Fetch Countries from API
  const loadCountries = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      const res = await apiService.getCountries({
        search: searchQuery,
        region: selectedRegion,
        sortBy
      });
      const list = res.data || [];
      setCountries(list);

      // Keep active selection or default to first country
      setSelectedCountry(prev => {
        if (!prev && list.length > 0) return list[0];
        if (prev) {
          const updated = list.find(c => c.id === prev.id);
          return updated || list[0] || null;
        }
        return null;
      });
      setError(null);
    } catch (err) {
      setError(err.message || 'Unable to connect to Tourism Backend');
    } finally {
      if (isInitial) setLoading(false);
    }
  }, [searchQuery, selectedRegion, sortBy]);

  useEffect(() => {
    loadCountries(true);
    loadHealth();
  }, []);

  useEffect(() => {
    loadCountries(false);
  }, [searchQuery, selectedRegion, sortBy, loadCountries]);

  // Keyboard shortcut '/' to search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const input = document.getElementById('input-search-countries');
        if (input) input.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle Create Country
  const handleCountryAdded = async (countryData) => {
    const res = await apiService.createCountry(countryData);
    await loadCountries(false);
    if (res.data) {
      setSelectedCountry(res.data);
    }
  };

  // Handle Create Attraction
  const handleAttractionAdded = async (countryId, attractionData) => {
    await apiService.createAttraction(countryId, attractionData);
    await loadCountries(false);
  };

  // Toggle Bookmark
  const handleToggleBookmark = (attraction) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(attraction.id)) {
        next.delete(attraction.id);
      } else {
        next.add(attraction.id);
      }
      return next;
    });
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenAddCountry={() => setIsAddCountryOpen(true)}
        onOpenArchModal={() => setIsArchModalOpen(true)}
        systemStatus={systemStatus}
      />

      {error && (
        <div className="error-banner glass-panel">
          <AlertCircle size={20} className="error-banner-icon" />
          <div className="error-banner-content">
            <strong>System Connection Notice:</strong> {error}
            <button onClick={() => loadCountries(true)} className="btn-retry">
              Retry
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-state">
          <Loader2 size={36} className="spinner" />
          <p>Connecting to World Registry & Initializing 112 Pillars...</p>
        </div>
      ) : (
        <>
          {/* Top Country Selector Bar */}
          <CountrySelector
            countries={countries}
            selectedCountry={selectedCountry}
            onSelectCountry={setSelectedCountry}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Core Detail Stage: Left Country Flag | Right Essential Information */}
          {selectedCountry && (
            <CountryDetailStage country={selectedCountry} />
          )}

          {/* Tourist Attractions Section Below with Full Specs trigger */}
          {selectedCountry && (
            <AttractionsSection
              country={selectedCountry}
              onSelectAttraction={setSelectedAttraction}
              onOpenAddAttraction={() => setIsAddAttractionOpen(true)}
            />
          )}
        </>
      )}

      {/* Deep-Dive Specs Modal when user clicks an attraction */}
      {selectedAttraction && (
        <AttractionSpecsModal
          attraction={selectedAttraction}
          country={selectedCountry}
          onClose={() => setSelectedAttraction(null)}
          onBookmark={handleToggleBookmark}
          isBookmarked={bookmarkedIds.has(selectedAttraction.id)}
        />
      )}

      {/* Add Country Modal */}
      <AddCountryModal
        isOpen={isAddCountryOpen}
        onClose={() => setIsAddCountryOpen(false)}
        onCountryAdded={handleCountryAdded}
      />

      {/* Add Attraction Modal */}
      <AddAttractionModal
        isOpen={isAddAttractionOpen}
        country={selectedCountry}
        onClose={() => setIsAddAttractionOpen(false)}
        onAttractionAdded={handleAttractionAdded}
      />

      {/* 112 Architecture Pillars Live Observability Modal */}
      <Architecture112Modal
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
        systemStatus={systemStatus}
        onRefresh={loadHealth}
      />

      <style>{`
        .loading-state {
          min-height: 450px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          color: var(--text-secondary);
        }
        .spinner {
          animation: spin 1s linear infinite;
          color: var(--accent-primary);
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .error-banner {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          background: rgba(244, 63, 94, 0.12);
          border: 1px solid rgba(244, 63, 94, 0.35);
          color: #fca5a5;
        }
        .error-banner-icon {
          color: #f43f5e;
          min-width: 20px;
        }
        .error-banner-content {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          font-size: 0.9rem;
        }
        .btn-retry {
          padding: 0.25rem 0.75rem;
          background: #f43f5e;
          color: #ffffff;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
