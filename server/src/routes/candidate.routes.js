import { Router } from 'express';
import { getAll, update, create, deleteCandidate, findByUserId } from '../controllers/candidate.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/', AuthMiddleware, create)
router.get('/', AuthMiddleware, getAll)
router.get('/:id', AuthMiddleware, findByUserId)
router.put('/:id', AuthMiddleware, update)
router.delete('/:id', AuthMiddleware, deleteCandidate)

export default router;