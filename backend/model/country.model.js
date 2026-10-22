import { query, isPostgresConnected, getFallbackStore } from './db.js';

export const CountryModel = {
  // Find all countries with optional filter/search (Pillar 25, 26)
  async findAll({ search, region, sortBy } = {}) {
    if (isPostgresConnected) {
      let sql = `
        SELECT c.*, 
          COALESCE(
            json_agg(
              json_build_object(
                'id', a.id,
                'name', a.name,
                'location', a.location,
                'category', a.category,
                'image', a.image,
                'whyFamous', a.why_famous,
                'specs', a.specs
              )
            ) FILTER (WHERE a.id IS NOT NULL), '[]'
          ) as attractions
        FROM countries c
        LEFT JOIN attractions a ON c.id = a.country_id
      `;
      const conditions = [];
      const params = [];

      if (search) {
        params.push(`%${search}%`);
        conditions.push(`(c.name ILIKE $${params.length} OR c.capital ILIKE $${params.length} OR c.code ILIKE $${params.length})`);
      }

      if (region && region !== 'all') {
        params.push(region);
        conditions.push(`c.region ILIKE $${params.length}`);
      }

      if (conditions.length > 0) {
        sql += ` WHERE ${conditions.join(' AND ')}`;
      }

      sql += ` GROUP BY c.id`;

      if (sortBy === 'population') {
        sql += ` ORDER BY c.population_num DESC`;
      } else if (sortBy === 'gdp') {
        sql += ` ORDER BY c.gdp_num DESC`;
      } else if (sortBy === 'perCapita') {
        sql += ` ORDER BY c.per_capita_num DESC`;
      } else {
        sql += ` ORDER BY c.name ASC`;
      }

      const result = await query(sql, params);
      return result.rows.map(row => ({
        id: row.id,
        name: row.name,
        officialName: row.official_name,
        code: row.code,
        flag: row.flag,
        flagSvg: row.flag_svg,
        capital: row.capital,
        population: row.population,
        populationNum: Number(row.population_num),
        gdp: row.gdp,
        gdpNum: Number(row.gdp_num),
        perCapitaIncome: row.per_capita_income,
        perCapitaNum: Number(row.per_capita_num),
        currency: row.currency,
        region: row.region,
        languages: row.languages,
        bestTimeToVisit: row.best_time_to_visit,
        climate: row.climate,
        description: row.description,
        attractions: row.attractions || []
      }));
    }

    // Fallback store
    const store = getFallbackStore();
    let list = [...store.countries];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.capital.toLowerCase().includes(q) || 
        c.code.toLowerCase().includes(q)
      );
    }

    if (region && region !== 'all') {
      list = list.filter(c => c.region.toLowerCase().includes(region.toLowerCase()));
    }

    if (sortBy === 'population') {
      list.sort((a, b) => (b.populationNum || 0) - (a.populationNum || 0));
    } else if (sortBy === 'gdp') {
      list.sort((a, b) => (b.gdpNum || 0) - (a.gdpNum || 0));
    } else if (sortBy === 'perCapita') {
      list.sort((a, b) => (b.perCapitaNum || 0) - (a.perCapitaNum || 0));
    } else {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  },

  // Find country by ID or Code
  async findById(id) {
    if (isPostgresConnected) {
      const sql = `
        SELECT c.*, 
          COALESCE(
            json_agg(
              json_build_object(
                'id', a.id,
                'name', a.name,
                'location', a.location,
                'category', a.category,
                'image', a.image,
                'whyFamous', a.why_famous,
                'specs', a.specs
              )
            ) FILTER (WHERE a.id IS NOT NULL), '[]'
          ) as attractions
        FROM countries c
        LEFT JOIN attractions a ON c.id = a.country_id
        WHERE c.id = $1 OR c.code = UPPER($1)
        GROUP BY c.id
      `;
      const result = await query(sql, [id]);
      if (result.rows.length === 0) return null;
      const row = result.rows[0];
      return {
        id: row.id,
        name: row.name,
        officialName: row.official_name,
        code: row.code,
        flag: row.flag,
        flagSvg: row.flag_svg,
        capital: row.capital,
        population: row.population,
        populationNum: Number(row.population_num),
        gdp: row.gdp,
        gdpNum: Number(row.gdp_num),
        perCapitaIncome: row.per_capita_income,
        perCapitaNum: Number(row.per_capita_num),
        currency: row.currency,
        region: row.region,
        languages: row.languages,
        bestTimeToVisit: row.best_time_to_visit,
        climate: row.climate,
        description: row.description,
        attractions: row.attractions || []
      };
    }

    const store = getFallbackStore();
    const item = store.countries.find(c => c.id.toLowerCase() === id.toLowerCase() || c.code.toLowerCase() === id.toLowerCase());
    return item || null;
  },

  // Create new Country (Pillar 14, 78)
  async create(data) {
    const id = data.id || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCountry = {
      id,
      name: data.name,
      officialName: data.officialName || data.name,
      code: data.code.toUpperCase(),
      flag: data.flag,
      flagSvg: data.flagSvg || data.flag,
      capital: data.capital,
      population: data.population,
      populationNum: Number(data.populationNum) || 0,
      gdp: data.gdp,
      gdpNum: Number(data.gdpNum) || 0,
      perCapitaIncome: data.perCapitaIncome,
      perCapitaNum: Number(data.perCapitaNum) || 0,
      currency: data.currency,
      region: data.region,
      languages: data.languages || 'English',
      bestTimeToVisit: data.bestTimeToVisit || 'Year-round',
      climate: data.climate || 'Temperate',
      description: data.description || '',
      attractions: data.attractions || []
    };

    if (isPostgresConnected) {
      await query(
        `INSERT INTO countries 
          (id, name, official_name, code, flag, flag_svg, capital, population, population_num, gdp, gdp_num, per_capita_income, per_capita_num, currency, region, languages, best_time_to_visit, climate, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
        [
          newCountry.id,
          newCountry.name,
          newCountry.officialName,
          newCountry.code,
          newCountry.flag,
          newCountry.flagSvg,
          newCountry.capital,
          newCountry.population,
          newCountry.populationNum,
          newCountry.gdp,
          newCountry.gdpNum,
          newCountry.perCapitaIncome,
          newCountry.perCapitaNum,
          newCountry.currency,
          newCountry.region,
          newCountry.languages,
          newCountry.bestTimeToVisit,
          newCountry.climate,
          newCountry.description,
        ]
      );
    }

    const store = getFallbackStore();
    store.countries.unshift(newCountry);
    return newCountry;
  }
};
