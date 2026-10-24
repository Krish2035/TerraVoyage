import { CountryService } from '../services/country.service.js';

export const CountryController = {
  // GET /api/v1/countries
  async getAllCountries(req, res, next) {
    try {
      const { search, region, sortBy } = req.query;
      const result = await CountryService.getAllCountries({ search, region, sortBy });
      
      // Edge caching header with stale-while-revalidate (Pillar 48, 49)
      res.setHeader('Cache-Control', 'public, max-age=30, stale-while-revalidate=120');
      res.setHeader('X-Cache-Status', result.source === 'cache' ? 'HIT' : 'MISS');

      return res.status(200).json({
        success: true,
        count: result.data.length,
        source: result.source,
        data: result.data
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/v1/countries/:id
  async getCountryById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await CountryService.getCountryById(id);

      res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
      res.setHeader('X-Cache-Status', result.source === 'cache' ? 'HIT' : 'MISS');

      return res.status(200).json({
        success: true,
        source: result.source,
        data: result.data
      });
    } catch (err) {
      next(err);
    }
  },

  // POST /api/v1/countries
  async createCountry(req, res, next) {
    try {
      const newCountry = await CountryService.createCountry(req.body);
      return res.status(201).json({
        success: true,
        message: 'Country successfully added to registry',
        data: newCountry
      });
    } catch (err) {
      next(err);
    }
  },

  // GET / POST /api/v1/countries/sync/all
  async syncAllCountries(req, res, next) {
    try {
      const result = await CountryService.syncAllCountries();
      return res.status(200).json({
        success: true,
        message: 'Synchronization triggered across all 195 nations and destinations',
        ...result
      });
    } catch (err) {
      next(err);
    }
  }
};
