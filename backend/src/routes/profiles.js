import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import {
  getProfiles, createProfile, updateProfile, deleteProfile, recordLogin,
} from '../controllers/profileController.js';

const router = Router();
router.use(protect);

router.get('/',         getProfiles);
router.post('/',        createProfile);
router.put('/:id',      updateProfile);
router.delete('/:id',   deleteProfile);
router.put('/:id/login', recordLogin);

export default router;
