import express from "express";
import { downloadPDF } from "../controllers/pdfController.js";

const router = express.Router();

router.post("/download", downloadPDF);

export default router;