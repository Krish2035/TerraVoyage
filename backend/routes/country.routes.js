import { Router } from 'express';
import { CountryController } from '../controller/country.controller.js';
import { AttractionController } from '../controller/attraction.controller.js';

const router = Router();

// Country Endpoints
router.get('/', CountryController.getAllCountries);
router.post('/', CountryController.createCountry);
// Sync / Seed All 195 Nations (Must be before /:id)
router.get('/sync/all', CountryController.syncAllCountries);
router.post('/sync/all', CountryController.syncAllCountries);

router.get('/:id', CountryController.getCountryById);

// Nested Attractions for a Country
router.get('/:countryId/attractions', AttractionController.getAttractionsByCountry);
router.post('/:countryId/attractions', AttractionController.createAttraction);

export default router;
