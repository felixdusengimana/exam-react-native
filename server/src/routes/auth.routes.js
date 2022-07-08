import { Router } from 'express';
import { getProfile, login, signup } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/signup', signup)
router.post('/signin', login)
router.get('/profile', AuthMiddleware ,getProfile)

export default router;