import express from "express";
import { generateObjective } from "../controllers/resumeController.js";

const router = express.Router();

router.post("/objective", generateObjective);

export default router;