import { AttractionModel } from '../model/attraction.model.js';
import { CountryModel } from '../model/country.model.js';
import { cacheService } from './cache.service.js';

export const AttractionService = {
  async getAttractionsByCountry(countryId) {
    const cacheKey = `attractions:country:${countryId.toLowerCase()}`;
    const cached = cacheService.get(cacheKey);
    if (cached) {
      return { data: cached, source: 'cache' };
    }

    const attractions = await AttractionModel.findByCountryId(countryId);
    cacheService.set(cacheKey, attractions);
    return { data: attractions, source: 'database' };
  },

  async getAttractionById(id) {
    const cacheKey = `attraction:detail:${id.toLowerCase()}`;
    const cached = cacheService.get(cacheKey);
    if (cached) {
      return { data: cached, source: 'cache' };
    }

    const attraction = await AttractionModel.findById(id);
    if (!attraction) {
      const err = new Error(`Attraction '${id}' not found`);
      err.status = 404;
      throw err;
    }

    cacheService.set(cacheKey, attraction);
    return { data: attraction, source: 'database' };
  },

  async createAttraction(countryId, payload) {
    if (!payload.name || !payload.location || !payload.whyFamous) {
      const err = new Error('Attraction name, location, and whyFamous description are required');
      err.status = 400;
      throw err;
    }

    const country = await CountryModel.findById(countryId);
    if (!country) {
      const err = new Error(`Cannot add attraction: Country '${countryId}' does not exist`);
      err.status = 404;
      throw err;
    }

    const created = await AttractionModel.create(countryId, payload);

    // Invalidate caches (Pillar 50)
    cacheService.invalidatePattern(`attractions:country:${countryId.toLowerCase()}`);
    cacheService.del(`country:detail:${countryId.toLowerCase()}`);
    cacheService.invalidatePattern('countries:list');

    return created;
  }
};
