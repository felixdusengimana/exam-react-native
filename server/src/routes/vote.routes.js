import { Router } from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware';
import {vote, getAll, candidateNumberOfVotes, userVoted, getAllCandidatesVotesNumber} from '../controllers/vote.controller';


const router = Router();

router.post('/', AuthMiddleware, vote)
router.get('/', AuthMiddleware, getAll)
router.get('/candidates', AuthMiddleware, getAllCandidatesVotesNumber)
router.get('/candidate/:id', AuthMiddleware, candidateNumberOfVotes)
router.get('/user/:id', AuthMiddleware, userVoted)

export default router;