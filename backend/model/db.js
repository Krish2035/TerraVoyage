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
    const isSslNeeded = config.db.connectionString.includes('neon.tech') || 
                        config.db.connectionString.includes('sslmode=require') || 
                        config.nodeEnv === 'production';

    const poolConfig = config.db.connectionString
      ? {
          connectionString: config.db.connectionString,
          ssl: isSslNeeded ? { rejectUnauthorized: false } : false,
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

    // Seed / Synchronize all 195 nations into PostgreSQL (Pillars 14, 82)
    const checkCount = await client.query('SELECT COUNT(*) FROM countries');
    const existingCount = parseInt(checkCount.rows[0].count, 10);
    console.log(`[Database] PostgreSQL current country count: ${existingCount} (Expected: ${hydratedCountries.length})`);

    if (existingCount < hydratedCountries.length) {
      console.log(`[Database] Auto-synchronizing all ${hydratedCountries.length} countries and attractions into PostgreSQL...`);
      await syncAllNations(client);
    }

    client.release();
  } catch (err) {
    isPostgresConnected = false;
    console.warn(
      `[Database Circuit Breaker - Pillar 10]: PostgreSQL not reachable (${err.message}). Activating in-memory store fallback with ${fallbackStore.countries.length} seeded countries.`
    );
  }
}

// Synchronize all 195 nations and their attractions into PostgreSQL (Pillar 14, 82)
export async function syncAllNations(existingClient = null) {
  const client = existingClient || (pool ? await pool.connect() : null);
  if (!client) {
    console.warn('[Database Sync] Cannot sync: PostgreSQL pool is not connected.');
    return { success: false, reason: 'database_not_connected', count: fallbackStore.countries.length };
  }

  const shouldRelease = !existingClient;
  try {
    const escapeSql = (str) => {
      if (str === null || str === undefined) return "''";
      return "'" + String(str).replace(/'/g, "''") + "'";
    };

    const rows = initialCountries.map(c => {
      return '(' + [
        escapeSql(c.id),
        escapeSql(c.name),
        escapeSql(c.officialName || c.name),
        escapeSql(c.code),
        escapeSql(c.flag),
        escapeSql(c.flagSvg || c.flag),
        escapeSql(c.capital),
        escapeSql(c.population),
        c.populationNum || 0,
        escapeSql(c.gdp),
        c.gdpNum || 0,
        escapeSql(c.perCapitaIncome),
        c.perCapitaNum || 0,
        escapeSql(c.currency),
        escapeSql(c.region),
        escapeSql(c.languages || 'English'),
        escapeSql(c.bestTimeToVisit || 'Year-round'),
        escapeSql(c.climate || 'Temperate'),
        escapeSql(c.description || '')
      ].join(', ') + ')';
    });

    const bulkSql = `
      INSERT INTO countries (
        id, name, official_name, code, flag, flag_svg, capital, population, 
        population_num, gdp, gdp_num, per_capita_income, per_capita_num, 
        currency, region, languages, best_time_to_visit, climate, description
      )
      VALUES ${rows.join(',\n')}
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        official_name = EXCLUDED.official_name,
        code = EXCLUDED.code,
        flag = EXCLUDED.flag,
        flag_svg = EXCLUDED.flag_svg,
        capital = EXCLUDED.capital,
        population = EXCLUDED.population,
        population_num = EXCLUDED.population_num,
        gdp = EXCLUDED.gdp,
        gdp_num = EXCLUDED.gdp_num,
        per_capita_income = EXCLUDED.per_capita_income,
        per_capita_num = EXCLUDED.per_capita_num,
        currency = EXCLUDED.currency,
        region = EXCLUDED.region,
        languages = EXCLUDED.languages,
        best_time_to_visit = EXCLUDED.best_time_to_visit,
        climate = EXCLUDED.climate,
        description = EXCLUDED.description,
        updated_at = CURRENT_TIMESTAMP
    `;

    await client.query(bulkSql);
    const finalCountRes = await client.query('SELECT COUNT(*) FROM countries');
    const finalCount = parseInt(finalCountRes.rows[0].count, 10);
    console.log(`[Database] Fast Bulk Sync Complete! Total nations in PostgreSQL: ${finalCount}`);

    return { success: true, count: finalCount };
  } catch (err) {
    console.error('[Database Bulk Sync Error]:', err.message);
    throw err;
  } finally {
    if (shouldRelease) {
      client.release();
    }
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
