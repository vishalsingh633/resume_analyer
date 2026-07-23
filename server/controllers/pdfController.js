import { generatePDF } from "../utils/generatePDF.js";

import { modernTemplate } from "../templates/modernTemplate.js";
import { classicTemplate } from "../templates/classicTemplate.js";
import { creativeTemplate } from "../templates/creativeTemplate.js";

export const downloadPDF = async (req, res) => {
  try {
    const { resume, template } = req.body;

    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "Resume data is required."
      });
    }

    let html;

    switch (template) {
      case "modern":
        html = modernTemplate(resume);
        break;

      case "classic":
        html = classicTemplate(resume);
        break;

      case "creative":
        html = creativeTemplate(resume);
        break;

      default:
        html = modernTemplate(resume);
    }

    const pdf = await generatePDF(html);

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${resume.fullName || "Resume"}.pdf"`
    );

    res.send(pdf);

  } catch (error) {

    console.error("PDF Generation Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate PDF."
    });

  }
};