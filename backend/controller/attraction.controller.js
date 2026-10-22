import { AttractionService } from '../services/attraction.service.js';

export const AttractionController = {
  // GET /api/v1/countries/:countryId/attractions
  async getAttractionsByCountry(req, res, next) {
    try {
      const { countryId } = req.params;
      const result = await AttractionService.getAttractionsByCountry(countryId);

      res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
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

  // GET /api/v1/attractions/:id
  async getAttractionById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await AttractionService.getAttractionById(id);

      res.setHeader('Cache-Control', 'public, max-age=120, stale-while-revalidate=600');
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

  // POST /api/v1/countries/:countryId/attractions
  async createAttraction(req, res, next) {
    try {
      const { countryId } = req.params;
      const newAttraction = await AttractionService.createAttraction(countryId, req.body);

      return res.status(201).json({
        success: true,
        message: 'Tourist attraction registered with full specifications',
        data: newAttraction
      });
    } catch (err) {
      next(err);
    }
  }
};
