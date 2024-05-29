import { Router } from 'express';
import { downloadRawData, getAggregatedData, getAllTestTypes } from '../controllers/mnf.controller';

const router = Router();

// router.get('/', getMnfs);
router.get("/raw", downloadRawData);
router.get("/", getAggregatedData);
router.get('/test-types', getAllTestTypes);

export default router;