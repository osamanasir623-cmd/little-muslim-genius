import { Router } from 'express';
import { getDays } from '../controllers/contentController.js';

const router = Router();

router.get('/days', getDays);

export default router;
