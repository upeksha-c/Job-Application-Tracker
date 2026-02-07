import express from 'express';
import { getApplicationDetails } from '../controllers/applicationController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/:id', verifyToken, getApplicationDetails);

export default router;