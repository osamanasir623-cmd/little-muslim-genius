import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { getMe, updateSettings, getBillingHistory, deleteAccount } from '../controllers/userController.js';

const router = Router();
router.use(protect);

router.get('/',          getMe);
router.get('/me',        getMe);
router.put('/settings',  updateSettings);
router.get('/billing',   getBillingHistory);
router.delete('/',       deleteAccount);

export default router;
