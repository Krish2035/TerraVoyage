import { query, isPostgresConnected, getFallbackStore } from './db.js';

export const AttractionModel = {
  // Find all attractions for a given country
  async findByCountryId(countryId) {
    if (isPostgresConnected) {
      const sql = `
        SELECT id, country_id, name, location, category, image, why_famous as "whyFamous", specs
        FROM attractions
        WHERE country_id = $1
        ORDER BY name ASC
      `;
      const result = await query(sql, [countryId]);
      return result.rows;
    }

    const store = getFallbackStore();
    const country = store.countries.find(c => c.id.toLowerCase() === countryId.toLowerCase() || c.code.toLowerCase() === countryId.toLowerCase());
    return country ? country.attractions : [];
  },

  // Find attraction by ID
  async findById(attractionId) {
    if (isPostgresConnected) {
      const sql = `
        SELECT a.id, a.country_id as "countryId", a.name, a.location, a.category, a.image, 
               a.why_famous as "whyFamous", a.specs,
               c.name as "countryName", c.code as "countryCode", c.flag as "countryFlag"
        FROM attractions a
        JOIN countries c ON a.country_id = c.id
        WHERE a.id = $1
      `;
      const result = await query(sql, [attractionId]);
      return result.rows.length > 0 ? result.rows[0] : null;
    }

    const store = getFallbackStore();
    for (const country of store.countries) {
      const match = country.attractions.find(a => a.id === attractionId);
      if (match) {
        return {
          ...match,
          countryId: country.id,
          countryName: country.name,
          countryCode: country.code,
          countryFlag: country.flag,
        };
      }
    }
    return null;
  },

  // Create new attraction
  async create(countryId, data) {
    const id = data.id || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newAttraction = {
      id,
      countryId,
      name: data.name,
      location: data.location,
      category: data.category || 'Tourist Landmark',
      image: data.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
      whyFamous: data.whyFamous,
      specs: data.specs || {}
    };

    if (isPostgresConnected) {
      await query(
        `INSERT INTO attractions (id, country_id, name, location, category, image, why_famous, specs)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          newAttraction.id,
          countryId,
          newAttraction.name,
          newAttraction.location,
          newAttraction.category,
          newAttraction.image,
          newAttraction.whyFamous,
          JSON.stringify(newAttraction.specs),
        ]
      );
    }

    const store = getFallbackStore();
    const country = store.countries.find(c => c.id === countryId || c.code === countryId);
    if (country) {
      country.attractions.push(newAttraction);
    }

    return newAttraction;
  }
};
