import React from 'react';
import { Plane, Clock, Train, Car, ExternalLink, Compass } from 'lucide-react';
import { getCountryFlightData } from '../services/travelIntelligenceData';

export default function FlightHubsWidget({ country }) {
  const flightData = getCountryFlightData(country);

  if (!country || !flightData) return null;

  const primaryAirport = flightData.airports[0];
  const googleFlightsUrl = `https://www.google.com/travel/flights?q=flights+to+${primaryAirport?.code || country.capital || country.name}`;
  const skyscannerUrl = `https://www.skyscanner.com/transport/flights/everywhere/${(primaryAirport?.code || country.code || 'ANY').toLowerCase()}`;

  return (
    <div className="utility-card flight-hubs-card glass-panel" id="flight-hubs-widget">
      <div className="utility-card-header">
        <div className="u-title-group">
          <Plane size={18} className="text-cyan" />
          <h3 className="widget-main-title">
            International Flight Gateways & Transit Estimator
          </h3>
        </div>
        <div className="flight-actions-row">
          <a
            href={googleFlightsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flight-link-btn gflights"
            id="btn-google-flights"
          >
            <Plane size={12} />
            <span>Search Google Flights</span>
            <ExternalLink size={11} />
          </a>
          <a
            href={skyscannerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flight-link-btn skyscanner"
            id="btn-skyscanner"
          >
            <span>Skyscanner</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Gateway Airports & City Transit Grid */}
      <div className="airports-grid">
        {flightData.airports.map((airport) => (
          <div key={airport.code} className="airport-detail-card">
            <div className="airport-top-bar">
              <span className="airport-iata-pill">{airport.code}</span>
              <span className="airport-city-name">{airport.city}</span>
            </div>
            <h4 className="airport-full-name">{airport.name}</h4>

            <div className="transit-info-box">
              <div className="transit-item">
                <Train size={13} className="text-cyan" />
                <span className="transit-text">{airport.transitTime}</span>
              </div>
              <div className="transit-item">
                <Car size={13} className="text-gold" />
                <span className="transit-text">Taxi: {airport.taxiCost}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Non-stop / Connecting Flight Duration Estimator */}
      {flightData.flightHours && flightData.flightHours.length > 0 && (
        <div className="flight-duration-section">
          <div className="duration-section-header">
            <Clock size={13} className="text-secondary" />
            <span>Estimated Flight Durations to {country.name} (from Major Hubs):</span>
          </div>

          <div className="duration-pills-row">
            {flightData.flightHours.map((hub, i) => (
              <div key={i} className="duration-pill">
                <span className="hub-origin">{hub.from}</span>
                <span className="hub-time">{hub.duration}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .flight-hubs-card {
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          background: rgba(15, 23, 42, 0.65);
          border: 1px solid rgba(56, 189, 248, 0.25);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
        }
        .flight-actions-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .flight-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.76rem;
          font-weight: 700;
          text-decoration: none;
          transition: var(--transition-fast);
        }
        .flight-link-btn.gflights {
          background: rgba(56, 189, 248, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.35);
          color: #38bdf8;
        }
        .flight-link-btn.gflights:hover {
          background: #0284c7;
          color: #ffffff;
        }
        .flight-link-btn.skyscanner {
          background: rgba(30, 41, 59, 0.7);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
        }
        .flight-link-btn.skyscanner:hover {
          color: var(--text-primary);
          border-color: var(--border-accent);
        }
        .airports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 0.85rem;
        }
        .airport-detail-card {
          padding: 1rem;
          border-radius: var(--radius-md);
          background: rgba(30, 41, 59, 0.45);
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .airport-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .airport-iata-pill {
          background: #38bdf8;
          color: #020617;
          font-family: var(--font-mono);
          font-weight: 800;
          font-size: 0.75rem;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-xs);
          letter-spacing: 0.05em;
        }
        .airport-city-name {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .airport-full-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }
        .transit-info-box {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid var(--border-subtle);
          padding: 0.6rem 0.75rem;
          border-radius: var(--radius-sm);
          margin-top: 0.25rem;
        }
        .transit-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }
        .transit-text {
          font-size: 0.74rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }
        .flight-duration-section {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          border-top: 1px solid var(--border-subtle);
          padding-top: 1rem;
        }
        .duration-section-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-secondary);
        }
        .duration-pills-row {
          display: flex;
          gap: 0.6rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
        }
        .duration-pill {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          padding: 0.45rem 0.75rem;
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          white-space: nowrap;
        }
        .hub-origin {
          font-size: 0.70rem;
          color: var(--text-muted);
        }
        .hub-time {
          font-size: 0.78rem;
          font-weight: 700;
          color: #38bdf8;
          font-family: var(--font-mono);
        }
      `}</style>
    </div>
  );
}
