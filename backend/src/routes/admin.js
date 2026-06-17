import { Router } from 'express';
import { protect, adminProtect } from '../middleware/auth.js';
import { getStats, listUsers, blockUser, setPayment, adminDeleteUser } from '../controllers/adminController.js';
import { adminListDays, adminCreateDay, adminUpdateDay, adminDeleteDay } from '../controllers/contentController.js';
import { adminCreatePuzzle, adminUpdatePuzzle, adminDeletePuzzle } from '../controllers/puzzleController.js';
import { listPuzzles } from '../controllers/puzzleController.js';

const router = Router();

router.use(protect, adminProtect);

// ── User management ───────────────────────────────────────────────
router.get('/stats',              getStats);
router.get('/users',              listUsers);
router.put('/users/:id/block',    blockUser);
router.put('/users/:id/payment',  setPayment);
router.delete('/users/:id',       adminDeleteUser);

// ── Content management (days) ────────────────────────────────────
router.get('/content/days',        adminListDays);
router.post('/content/days',       adminCreateDay);
router.put('/content/days/:id',    adminUpdateDay);
router.delete('/content/days/:id', adminDeleteDay);

// ── Puzzle management ─────────────────────────────────────────────
router.get('/puzzles',             listPuzzles);
router.post('/puzzles',            adminCreatePuzzle);
router.put('/puzzles/:id',         adminUpdatePuzzle);
router.delete('/puzzles/:id',      adminDeletePuzzle);

export default router;
