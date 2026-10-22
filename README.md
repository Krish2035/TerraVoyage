# TerraVoyage

> **World Country & Tourism Specifications Explorer Platform**  
> Built with Node.js, Express, PostgreSQL / Resilient Circuit Breaker, React 19 + Vite, and Calibri Typography adhering to the **112 Web Architecture & Production Engineering Parameters**.

---

## 🌍 Platform Overview

TerraVoyage is a full-stack geographic and tourism exploration platform covering all **195 sovereign nations of the world**:
- **Flag & National Identity**: Left-side national flags with live aspect-ratio rendering and country metadata.
- **Essential Country Indicators**: Right-side stage displaying Population, GDP, Per Capita Income, Capital, Official Languages, Currency, Climate, and Best Time to Visit.
- **Top 100 Tourist Destinations for Every Country**: Curated directly from top Google Travel indices, historical archives, and national registries.
- **Comprehensive Catalog for India (110 Premier Destinations)**:
  - All 12 Holy Jyotirlinga Shrines (Somnath, Mallikarjuna, Mahakaleshwar, Omkareshwar, Kedarnath, Bhimashankar, Kashi Vishwanath, Trimbakeshwar, Baidyanath, Nageshwar, Rameshwaram, Grishneshwar).
  - Ajanta Caves & Ellora Caves (Kailasa Temple - Cave 16).
  - Mumbai Icons: The Taj Mahal Palace Hotel, Gateway of India, Marine Drive, CSMT.
  - Delhi Icons: Red Fort (Lal Qila), Qutub Minar, India Gate, Humayun's Tomb, Lotus Temple.
  - Seven Sisters of Northeast India: Meghalaya Living Root Bridges & Nohkalikai Falls, Kaziranga National Park, Tawang Monastery & Sela Pass, Loktak Floating Lake, Hornbill Festival at Kisama, Vantawng Falls, Neermahal Water Palace.
  - Iconic Forts, Palaces & Temples: Konark Sun Temple, Khajuraho, Hampi, Kerala Backwaters, Munnar, Mysore Palace, Meenakshi Temple, and more.
- **Deep Specs Modal**: Blueprint modal with "Why This Place Is So Famous" spotlight, visitor & architectural specifications, and celebration confetti.
- **Calibri Typography & Custom Scrollbar**: Unified Calibri font family across the entire website with custom gradient scrollbars.

---

## 🏛️ Project Architecture

```
Tourism/
├── backend/
│   ├── config/             # Environment & connection pool configs
│   ├── controller/         # Country, Attraction & Health controllers
│   ├── middleware/         # Rate limiting, tracing, error handler
│   ├── model/              # PostgreSQL models, migrations & circuit breaker store
│   ├── routes/             # RESTful API v1 router
│   ├── services/           # Business logic, L1 cache & destinations engine
│   ├── app.js              # Express app setup
│   └── server.js           # Server entry point (port 5000)
├── frontend/
│   ├── src/
│   │   ├── components/     # CountrySelector, DetailStage, Attractions, Modals
│   │   ├── services/       # Frontend API client
│   │   ├── App.jsx         # Root explorer component
│   │   ├── index.css       # Calibri typography & design system
│   │   └── main.jsx        # React root entry
│   ├── index.html
│   └── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ or v20+)
- npm or yarn

### 1. Backend Setup
```bash
cd backend
npm install
node server.js
```
The backend server will run on `http://localhost:5000`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend interface will open on `http://localhost:3000`.

---

## 📐 112 Architecture & Engineering Parameters
TerraVoyage implements industry standards including:
- **Rate Limiting & Throttling**: Leaky-bucket algorithm with `RateLimit-*` headers.
- **Distributed Request Tracing**: Unique `X-Request-Id` and `X-Response-Time` headers on every request.
- **Database Circuit Breaker**: Graceful in-memory fallback when PostgreSQL is offline.
- **L1 In-Memory Caching**: TTL and pattern-based cache invalidation.
- **Parameterized SQL**: Protection against SQL injection.
- **Centralized Error Handling**: RFC 7807 problem details.
