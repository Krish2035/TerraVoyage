import pg from 'pg';
import { config } from '../config/index.js';
import { initialCountries } from './seedData.js';
import { getTopDestinationsForCountry } from '../services/destinationsEngine.js';

const { Pool } = pg;

// Connection Pool Configuration (Pillars 28, 11)
let pool = null;
let isPostgresConnected = false;

// Hydrate all 195 nations with 100 top tourist destinations matching Google Travel indicators
const hydratedCountries = initialCountries.map(country => ({
  ...country,
  attractions: getTopDestinationsForCountry(country)
}));

let fallbackStore = {
  countries: hydratedCountries
};

export const getDbStatus = () => ({
  type: isPostgresConnected ? 'PostgreSQL' : 'In-Memory Resilient Store (Pillar 10)',
  connected: isPostgresConnected,
  poolTotal: pool ? pool.totalCount : 0,
  poolIdle: pool ? pool.idleCount : 0,
  poolWaiting: pool ? pool.waitingCount : 0,
});

export const getFallbackStore = () => fallbackStore;

export async function initDb() {
  try {
    const poolConfig = config.db.connectionString
      ? {
          connectionString: config.db.connectionString,
          connectionTimeoutMillis: config.db.connectionTimeoutMillis,
          max: config.db.max,
        }
      : {
          host: config.db.host,
          port: config.db.port,
          user: config.db.user,
          password: config.db.password,
          database: config.db.database,
          max: config.db.max,
          idleTimeoutMillis: config.db.idleTimeoutMillis,
          connectionTimeoutMillis: config.db.connectionTimeoutMillis,
        };

    pool = new Pool(poolConfig);

    // Test connection with fast timeout (Pillars 10, 11)
    const client = await pool.connect();
    isPostgresConnected = true;
    console.log('[Database] Connected successfully to PostgreSQL instance.');

    // Database Migrations & Schema Initialization (Pillars 81, 82, 25)
    await client.query(`
      CREATE TABLE IF NOT EXISTS countries (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        official_name VARCHAR(256),
        code VARCHAR(8) NOT NULL UNIQUE,
        flag TEXT NOT NULL,
        flag_svg TEXT,
        capital VARCHAR(128) NOT NULL,
        population VARCHAR(64) NOT NULL,
        population_num BIGINT DEFAULT 0,
        gdp VARCHAR(64) NOT NULL,
        gdp_num NUMERIC DEFAULT 0,
        per_capita_income VARCHAR(64) NOT NULL,
        per_capita_num NUMERIC DEFAULT 0,
        currency VARCHAR(128) NOT NULL,
        region VARCHAR(128) NOT NULL,
        languages VARCHAR(256),
        best_time_to_visit TEXT,
        climate TEXT,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS attractions (
        id VARCHAR(64) PRIMARY KEY,
        country_id VARCHAR(64) REFERENCES countries(id) ON DELETE CASCADE,
        name VARCHAR(128) NOT NULL,
        location VARCHAR(256) NOT NULL,
        category VARCHAR(128) NOT NULL,
        image TEXT NOT NULL,
        why_famous TEXT NOT NULL,
        specs JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      -- Composite & Performance Indexes (Pillar 25)
      CREATE INDEX IF NOT EXISTS idx_countries_region ON countries(region);
      CREATE INDEX IF NOT EXISTS idx_countries_name ON countries(name);
      CREATE INDEX IF NOT EXISTS idx_attractions_country_id ON attractions(country_id);
    `);

    // Seed PostgreSQL if empty (Idempotency - Pillar 14)
    const checkCount = await client.query('SELECT COUNT(*) FROM countries');
    if (parseInt(checkCount.rows[0].count, 10) === 0) {
      console.log('[Database] Seeding initial countries and attractions into PostgreSQL...');
      for (const country of hydratedCountries) {
        await client.query(
          `INSERT INTO countries 
            (id, name, official_name, code, flag, flag_svg, capital, population, population_num, gdp, gdp_num, per_capita_income, per_capita_num, currency, region, languages, best_time_to_visit, climate, description)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
           ON CONFLICT (id) DO NOTHING`,
          [
            country.id,
            country.name,
            country.officialName,
            country.code,
            country.flag,
            country.flagSvg,
            country.capital,
            country.population,
            country.populationNum || 0,
            country.gdp,
            country.gdpNum || 0,
            country.perCapitaIncome,
            country.perCapitaNum || 0,
            country.currency,
            country.region,
            country.languages,
            country.bestTimeToVisit,
            country.climate,
            country.description,
          ]
        );

        for (const att of country.attractions || []) {
          await client.query(
            `INSERT INTO attractions (id, country_id, name, location, category, image, why_famous, specs)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             ON CONFLICT (id) DO NOTHING`,
            [
              att.id,
              country.id,
              att.name,
              att.location,
              att.category,
              att.image,
              att.whyFamous,
              JSON.stringify(att.specs || {}),
            ]
          );
        }
      }
      console.log('[Database] Seeding complete.');
    }

    client.release();
  } catch (err) {
    isPostgresConnected = false;
    console.warn(
      `[Database Circuit Breaker - Pillar 10]: PostgreSQL not reachable (${err.message}). Activating in-memory store fallback with ${fallbackStore.countries.length} seeded countries.`
    );
  }
}

// Resilient query runner with parameterized safety (Pillars 78, 11)
export async function query(sql, params = []) {
  if (isPostgresConnected && pool) {
    try {
      return await pool.query(sql, params);
    } catch (err) {
      console.error('[Database Query Error]:', err.message);
      throw err;
    }
  }
  return null;
}

export { isPostgresConnected };
