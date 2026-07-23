import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import resumeRoutes from "./routes/resumeRoutes.js";
import analyzerRoutes from "./routes/analyzerRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/resume", resumeRoutes);

app.use("/api/analyzer", analyzerRoutes);

app.use("/api/pdf", pdfRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Career Assistant Backend Running"
  });
});

export default app;