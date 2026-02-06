import express from 'express';
import { searchApplications } from '../controllers/searchApplicationsController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, searchApplications);

export default router;