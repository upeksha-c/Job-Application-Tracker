import express from "express";
import { saveApplicationController } from "../controllers/saveApplicationController.js";
import  verifyToken  from "../middleware/verifyToken.js";
import upload from "../middleware/fileUploadMiddleware.js";
const router = express.Router();

router.post("/", verifyToken, upload.single("resume"), saveApplicationController);

export default router;