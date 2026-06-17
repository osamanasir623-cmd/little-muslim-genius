import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { completeDay, addRewards, saveTimer, clearTimer } from '../controllers/progressController.js';

const router = Router();
router.use(protect);

router.post('/:profileId/complete',            completeDay);
router.post('/:profileId/rewards',             addRewards);
router.put('/:profileId/timer',                saveTimer);
router.delete('/:profileId/timer/:dayNumber',  clearTimer);

export default router;
