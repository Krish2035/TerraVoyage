import { Router } from 'express';
import countryRoutes from './country.routes.js';
import attractionRoutes from './attraction.routes.js';
import healthRoutes from './health.routes.js';

const apiRouter = Router();

// API Version 1 endpoints (Pillar 102)
apiRouter.use('/countries', countryRoutes);
apiRouter.use('/attractions', attractionRoutes);
apiRouter.use('/health', healthRoutes);

export default apiRouter;
