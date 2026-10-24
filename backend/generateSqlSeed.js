import fs from 'fs';
import { initialCountries } from './model/seedData.js';

function escapeSql(str) {
  if (str === null || str === undefined) return "''";
  return "'" + String(str).replace(/'/g, "''") + "'";
}

let sql = `-- ======================================================================
-- TERRAVOYAGE: NEON DATABASE SEED SCRIPT FOR ALL 195 NATIONS
-- Run this in your Neon SQL Editor to instantly populate all 195 countries!
-- ======================================================================

INSERT INTO countries (
  id, name, official_name, code, flag, flag_svg, capital, population, 
  population_num, gdp, gdp_num, per_capita_income, per_capita_num, 
  currency, region, languages, best_time_to_visit, climate, description
)
VALUES
`;

const rows = initialCountries.map(c => {
  return '  (' + [
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

sql += rows.join(',\n') + '\n';
sql += `ON CONFLICT (id) DO UPDATE SET
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
  updated_at = CURRENT_TIMESTAMP;

-- Verification Query: Check final count in Neon (should output 195)
SELECT COUNT(*) AS total_countries_loaded FROM countries;
`;

fs.writeFileSync('backend/neon_seed_195_countries.sql', sql);
console.log(`Generated neon_seed_195_countries.sql successfully with ${initialCountries.length} countries.`);
