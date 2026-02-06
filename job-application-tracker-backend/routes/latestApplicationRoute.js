import express from 'express';
import { getLatestApplicationsController } from '../controllers/getLatestApplicationsController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, getLatestApplicationsController);

export default router;