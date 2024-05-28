import { Router } from 'express';
import { getMnfs } from '../controllers/mnf.controller';

const router = Router();

router.get('/', getMnfs);

export default router;