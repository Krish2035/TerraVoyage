import { Router } from 'express';
import { AttractionController } from '../controller/attraction.controller.js';

const router = Router();

// Attraction detail endpoint
router.get('/:id', AttractionController.getAttractionById);

export default router;
