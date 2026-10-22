import { CountryModel } from '../model/country.model.js';
import { cacheService } from './cache.service.js';

export const CountryService = {
  async getAllCountries(filters = {}) {
    const cacheKey = `countries:list:${JSON.stringify(filters)}`;
    const cached = cacheService.get(cacheKey);
    if (cached) {
      return { data: cached, source: 'cache' };
    }

    const countries = await CountryModel.findAll(filters);
    cacheService.set(cacheKey, countries);
    return { data: countries, source: 'database' };
  },

  async getCountryById(id) {
    const cacheKey = `country:detail:${id.toLowerCase()}`;
    const cached = cacheService.get(cacheKey);
    if (cached) {
      return { data: cached, source: 'cache' };
    }

    const country = await CountryModel.findById(id);
    if (!country) {
      const err = new Error(`Country '${id}' not found`);
      err.status = 404;
      throw err;
    }

    cacheService.set(cacheKey, country);
    return { data: country, source: 'database' };
  },

  async createCountry(payload) {
    if (!payload.name || !payload.code || !payload.capital || !payload.flag) {
      const err = new Error('Name, code, capital, and flag are required fields');
      err.status = 400;
      throw err;
    }

    const created = await CountryModel.create(payload);
    
    // Invalidate cached country lists (Pillar 50)
    cacheService.invalidatePattern('countries:list');

    return created;
  }
};
