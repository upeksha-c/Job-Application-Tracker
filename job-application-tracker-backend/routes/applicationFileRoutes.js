import express from 'express';
import {getApplicationCV } from '../controllers/applicationFileController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/:id/cv', verifyToken, getApplicationCV);

export default router;