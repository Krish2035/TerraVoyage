import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import CountrySelector from './components/CountrySelector';
import CountryDetailStage from './components/CountryDetailStage';
import AttractionsSection from './components/AttractionsSection';
import AttractionSpecsModal from './components/AttractionSpecsModal';
import AddCountryModal from './components/AddCountryModal';
import AddAttractionModal from './components/AddAttractionModal';
import Architecture112Modal from './components/Architecture112Modal';
import ItineraryDrawer from './components/ItineraryDrawer';
import CompareNationsModal from './components/CompareNationsModal';
import WorldExplorerPassportModal from './components/WorldExplorerPassportModal';
import WanderlustQuizModal from './components/WanderlustQuizModal';
import UserAuthModal from './components/UserAuthModal';
import ShareTripModal from './components/ShareTripModal';
import { LanguageProvider } from './services/translationService';
import { decodeSharedTrip } from './services/cloudSyncService';
import { apiService } from './services/api';
import { Loader2, AlertCircle, ArrowLeft, ChevronRight, Compass, Sparkles, Globe } from 'lucide-react';

export default function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'country'
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  // Itinerary items with persistence
  const [itineraryItems, setItineraryItems] = useState(() => {
    try {
      const saved = localStorage.getItem('terra_voyage_itinerary');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('terra_voyage_itinerary');
      const items = saved ? JSON.parse(saved) : [];
      return new Set(items.map(i => i.id));
    } catch (e) {
      return new Set();
    }
  });

  // Search & Filters for Home Page
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Modals & Drawers
  const [isAddCountryOpen, setIsAddCountryOpen] = useState(false);
  const [isAddAttractionOpen, setIsAddAttractionOpen] = useState(false);
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareInitialCountry, setCompareInitialCountry] = useState(null);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // PWA Installation state
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState(null);
  const [canInstallPwa, setCanInstallPwa] = useState(false);

  // Listen for PWA Install Prompt
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredInstallPrompt(e);
      setCanInstallPwa(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallApp = async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      const { outcome } = await deferredInstallPrompt.userChoice;
      if (outcome === 'accepted') {
        setCanInstallPwa(false);
      }
    } else {
      alert('TerraVoyage PWA is ready! You can install it via the Install button in your browser address bar or by selecting "Add to Home Screen" on your mobile device.');
    }
  };

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

  // Helper to read country param from URL
  const getCountryParamFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('country') || params.get('c');
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

      // Check if URL specifies a country
      const urlCode = getCountryParamFromUrl();
      if (urlCode) {
        const found = list.find(c => 
          c.code.toLowerCase() === urlCode.toLowerCase() || 
          c.name.toLowerCase() === urlCode.toLowerCase() || 
          c.id === urlCode
        );
        if (found) {
          setSelectedCountry(found);
          setCurrentView('country');
        } else {
          setSelectedCountry(null);
          setCurrentView('home');
        }
      } else {
        // When on home page with no country in URL, keep selectedCountry null so home page shows only the nations list
        setSelectedCountry(prev => {
          if (prev) {
            return list.find(c => c.id === prev.id || c.code === prev.code) || null;
          }
          return null;
        });
      }
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

  // Handle browser Back and Forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const code = getCountryParamFromUrl();
      if (code && countries.length > 0) {
        const found = countries.find(c => 
          c.code.toLowerCase() === code.toLowerCase() || 
          c.name.toLowerCase() === code.toLowerCase() || 
          c.id === code
        );
        if (found) {
          setSelectedCountry(found);
          setCurrentView('country');
          return;
        }
      }
      // If no country param, return to Home page
      setSelectedCountry(null);
      setCurrentView('home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [countries]);

  // Keyboard shortcut '/' to search & 'Escape' to go back home
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const input = document.getElementById('input-search-countries');
        if (input) input.focus();
      }

      if (e.key === 'Escape') {
        // Return to home page if in country view and no modal is active
        if (!selectedAttraction && !isAddCountryOpen && !isAddAttractionOpen && !isArchModalOpen) {
          if (currentView === 'country') {
            handleNavigateHome();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView, selectedAttraction, isAddCountryOpen, isAddAttractionOpen, isArchModalOpen]);

  // Navigate to Country Detail View
  const handleSelectCountry = (country) => {
    if (!country) return;
    setSelectedCountry(country);
    setCurrentView('country');
    const newUrl = `/?country=${encodeURIComponent(country.code.toLowerCase())}`;
    window.history.pushState({ countryCode: country.code }, '', newUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Return to Home View (All Countries)
  const handleNavigateHome = () => {
    setSelectedCountry(null);
    setCurrentView('home');
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Create Country
  const handleCountryAdded = async (countryData) => {
    const res = await apiService.createCountry(countryData);
    await loadCountries(false);
    if (res.data) {
      handleSelectCountry(res.data);
    }
  };

  // Handle Create Attraction
  const handleAttractionAdded = async (countryId, attractionData) => {
    await apiService.createAttraction(countryId, attractionData);
    await loadCountries(false);
    // Refresh the currently selected country's attractions
    if (selectedCountry && selectedCountry.id === countryId) {
      try {
        const fresh = await apiService.getCountry(countryId);
        if (fresh.data) {
          setSelectedCountry(fresh.data);
        }
      } catch (e) {
        console.warn('Could not refresh country attractions', e);
      }
    }
  };

  // Sync itinerary to localStorage
  const saveItinerary = (items) => {
    setItineraryItems(items);
    setBookmarkedIds(new Set(items.map(i => i.id)));
    try {
      localStorage.setItem('terra_voyage_itinerary', JSON.stringify(items));
    } catch (e) {
      console.warn('Could not persist itinerary to localStorage', e);
    }
  };

  // Toggle Bookmark / Add to Itinerary
  const handleToggleBookmark = (attraction, countryContext) => {
    if (!attraction) return;
    const exists = itineraryItems.some(i => i.id === attraction.id);

    if (exists) {
      const updated = itineraryItems.filter(i => i.id !== attraction.id);
      saveItinerary(updated);
    } else {
      const countryObj = countryContext || selectedCountry;
      const newItem = {
        id: attraction.id,
        name: attraction.name,
        location: attraction.location,
        category: attraction.category,
        image: attraction.image,
        visitingHours: attraction.visitingHours,
        countryName: countryObj?.name || 'Global',
        countryFlag: countryObj?.flagSvg || countryObj?.flag || null,
        countryCode: countryObj?.code || ''
      };
      saveItinerary([...itineraryItems, newItem]);
    }
  };

  const handleRemoveItineraryItem = (id) => {
    const updated = itineraryItems.filter(i => i.id !== id);
    saveItinerary(updated);
  };

  const handleClearItinerary = () => {
    saveItinerary([]);
  };

  const handleAddMultipleToItinerary = (stops) => {
    if (!stops || stops.length === 0) return;
    const existingIds = new Set(itineraryItems.map(i => i.id));
    const newUnique = stops.filter(s => !existingIds.has(s.id));
    saveItinerary([...itineraryItems, ...newUnique]);
  };

  const handleOpenCompare = (initialCountry) => {
    setCompareInitialCountry(initialCountry || selectedCountry || (countries.length > 0 ? countries[0] : null));
    setIsCompareOpen(true);
  };

  return (
    <LanguageProvider>
      <div className="app-container">
        {/* Top Navbar */}
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenAddCountry={() => setIsAddCountryOpen(true)}
          onOpenArchModal={() => setIsArchModalOpen(true)}
          systemStatus={systemStatus}
          currentView={currentView}
          onNavigateHome={handleNavigateHome}
          itineraryCount={itineraryItems.length}
          onOpenItinerary={() => setIsItineraryOpen(true)}
          onOpenCompare={() => handleOpenCompare(selectedCountry)}
          onOpenPassport={() => setIsPassportOpen(true)}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onOpenShareModal={() => setIsShareModalOpen(true)}
          onInstallApp={handleInstallApp}
          canInstallPwa={canInstallPwa || true}
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
          {/* HOME PAGE: Shows ONLY the Nations Selector / Cards / Search */}
          {currentView === 'home' && (
            <div className="home-view-wrapper animate-fade-in">
              <CountrySelector
                countries={countries}
                selectedCountry={selectedCountry}
                onSelectCountry={handleSelectCountry}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedRegion={selectedRegion}
                onRegionChange={setSelectedRegion}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>
          )}

          {/* COUNTRY DETAIL PAGE: Opens when user clicks any country flag */}
          {currentView === 'country' && selectedCountry && (
            <div className="country-detail-view animate-fade-in">
              {/* Country Navigation Bar with Back Button and Quick Switcher */}
              <div className="country-nav-bar glass-panel">
                <div className="country-nav-left">
                  <button 
                    onClick={handleNavigateHome} 
                    className="btn-back-home"
                    id="btn-back-to-home"
                    title="Return to All Nations (Press Esc)"
                  >
                    <ArrowLeft size={16} />
                    <span>Back to All Nations</span>
                  </button>

                  <div className="breadcrumb-box">
                    <button onClick={handleNavigateHome} className="breadcrumb-btn">
                      All Countries
                    </button>
                    <ChevronRight size={13} className="breadcrumb-arrow" />
                    <span className="breadcrumb-segment">{selectedCountry.region}</span>
                    <ChevronRight size={13} className="breadcrumb-arrow" />
                    <span className="breadcrumb-active">{selectedCountry.name}</span>
                  </div>
                </div>

                <div className="country-nav-right">
                  <div className="quick-switch-box">
                    <label htmlFor="quick-switch-select" className="quick-switch-label">
                      <Compass size={14} className="quick-switch-icon" />
                      <span>Switch Country:</span>
                    </label>
                    <select
                      id="quick-switch-select"
                      value={selectedCountry.id}
                      onChange={(e) => {
                        const next = countries.find(c => c.id === e.target.value);
                        if (next) handleSelectCountry(next);
                      }}
                      className="quick-switch-select"
                    >
                      {countries.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Core Detail Stage: Left Country Flag | Right Essential Information */}
              <CountryDetailStage 
                country={selectedCountry} 
                onOpenCompare={handleOpenCompare}
                onAddMultipleToItinerary={handleAddMultipleToItinerary}
              />

              {/* Tourist Attractions Section: Scroll down to view all premier destinations */}
              <AttractionsSection
                country={selectedCountry}
                onSelectAttraction={setSelectedAttraction}
                onOpenAddAttraction={() => setIsAddAttractionOpen(true)}
              />
            </div>
          )}
        </>
      )}

      {/* Deep-Dive Specs Modal when user clicks an attraction */}
      {selectedAttraction && (
        <AttractionSpecsModal
          attraction={selectedAttraction}
          country={selectedCountry}
          onClose={() => setSelectedAttraction(null)}
          onBookmark={(attr) => handleToggleBookmark(attr, selectedCountry)}
          isBookmarked={bookmarkedIds.has(selectedAttraction.id)}
        />
      )}

      {/* Travel Itinerary Builder Drawer */}
      <ItineraryDrawer
        isOpen={isItineraryOpen}
        onClose={() => setIsItineraryOpen(false)}
        itineraryItems={itineraryItems}
        onRemoveItem={handleRemoveItineraryItem}
        onClearAll={handleClearItinerary}
        onSelectAttraction={(attr) => {
          setSelectedAttraction(attr);
          setIsItineraryOpen(false);
        }}
      />

      {/* Compare Nations Side-by-Side Modal */}
      <CompareNationsModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        countries={countries}
        initialCountry={compareInitialCountry}
        onSelectCountry={handleSelectCountry}
      />

      {/* World Explorer Passport & Travel Bucket List Modal */}
      <WorldExplorerPassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        countries={countries}
        onSelectCountry={handleSelectCountry}
      />

      {/* Wanderlust Geography & Landmark Quiz Modal */}
      <WanderlustQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        country={selectedCountry}
      />

      {/* Cloud Account Sync & Traveler Profile Modal */}
      <UserAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        itineraryCount={itineraryItems.length}
      />

      {/* Social Share Trip & QR Code Modal */}
      <ShareTripModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        itineraryItems={itineraryItems}
        country={selectedCountry}
      />

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

      {/* Floating Trip Itinerary Drawer Launcher Button */}
      <button
        type="button"
        onClick={() => setIsItineraryOpen(true)}
        className="floating-trip-btn glass-panel"
        id="btn-floating-itinerary"
        title="Open My Trip Itinerary Drawer"
      >
        <span className="float-icon">🧳</span>
        <span className="float-label">My Trip</span>
        {itineraryItems.length > 0 && (
          <span className="float-count-badge">{itineraryItems.length}</span>
        )}
      </button>

      <style>{`
        .floating-trip-btn {
          position: fixed;
          bottom: 1.8rem;
          right: 1.8rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.15rem;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.95), rgba(56, 189, 248, 0.95));
          color: #ffffff;
          font-weight: 700;
          font-size: 0.88rem;
          border-radius: var(--radius-full);
          box-shadow: 0 8px 30px rgba(99, 102, 241, 0.45);
          cursor: pointer;
          z-index: 99;
          border: 1px solid rgba(255, 255, 255, 0.25);
          transition: var(--transition-fast);
        }
        .floating-trip-btn:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 12px 35px rgba(99, 102, 241, 0.6);
        }
        .float-icon {
          font-size: 1.1rem;
        }
        .float-count-badge {
          background: #ffffff;
          color: var(--accent-primary);
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.12rem 0.45rem;
          border-radius: var(--radius-full);
          margin-left: 0.2rem;
        }
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

        /* Country Detail Page View Wrapper */
        .country-detail-view {
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
        }

        /* Dedicated Top Navigation Header for Country Detail Page */
        .country-nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.4rem;
          flex-wrap: wrap;
          gap: 1rem;
          border: 1px solid rgba(99, 102, 241, 0.25);
        }
        .country-nav-left, .country-nav-right {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        /* Back to All Nations Button */
        .btn-back-home {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 1.15rem;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(56, 189, 248, 0.15));
          border: 1px solid var(--border-accent);
          border-radius: var(--radius-full);
          color: var(--text-primary);
          font-size: 0.88rem;
          font-weight: 700;
          transition: var(--transition-fast);
          cursor: pointer;
        }
        .btn-back-home:hover {
          background: var(--accent-primary);
          color: #ffffff;
          transform: translateX(-3px);
          box-shadow: 0 4px 14px var(--accent-glow);
        }

        /* Breadcrumb Navigation */
        .breadcrumb-box {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.88rem;
        }
        .breadcrumb-btn {
          color: var(--text-muted);
          cursor: pointer;
          font-weight: 500;
          transition: color 0.2s ease;
          padding: 0;
          background: none;
        }
        .breadcrumb-btn:hover {
          color: var(--text-highlight);
          text-decoration: underline;
        }
        .breadcrumb-arrow {
          color: var(--text-muted);
        }
        .breadcrumb-segment {
          color: var(--text-secondary);
        }
        .breadcrumb-active {
          color: var(--text-highlight);
          font-weight: 700;
        }

        /* Quick Switcher */
        .quick-switch-box {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--bg-card);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }
        .quick-switch-label {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .quick-switch-icon {
          color: var(--accent-primary);
        }
        .quick-switch-select {
          background: transparent;
          color: var(--text-primary);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          max-width: 220px;
        }
        .quick-switch-select option {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }
      `}</style>
      </div>
    </LanguageProvider>
  );
}
