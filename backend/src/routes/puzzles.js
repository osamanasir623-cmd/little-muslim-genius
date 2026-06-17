import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { listPuzzles } from '../controllers/puzzleController.js';

const router = Router();
router.use(protect);
router.get('/', listPuzzles);

export default router;
