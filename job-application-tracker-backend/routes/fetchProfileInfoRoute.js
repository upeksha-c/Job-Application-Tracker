import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { getProfileInfo } from '../controllers/profileController.js';

const router = express.Router();

router.get('/', verifyToken, getProfileInfo);

export default router;