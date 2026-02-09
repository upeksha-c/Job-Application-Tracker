import express from "express";
import { generateOverviewController } from "../controllers/generateOverviewController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, generateOverviewController);

export default router;