import express from 'express';
import { getAllApplicationsController } from '../controllers/getAllApplicationsController.js';
import verifyToken from '../middleware/verifyToken.js';
const router = express.Router();

router.get('/', verifyToken, getAllApplicationsController);

export default router;