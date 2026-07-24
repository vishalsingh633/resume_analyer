import html2pdf from "html2pdf.js";

export const generatePDF = () => {
  const element = document.getElementById("resume-preview");

  if (!element) {
    console.error("Resume element not found");
    return;
  }

  const options = {
    margin: 0,
    filename: "resume.pdf",

    image: {
      type: "jpeg",
      quality: 1,
    },

    html2canvas: {
      scale: 4,
      useCORS: true,
      backgroundColor: "#ffffff",
      letterRendering: true,
      scrollY: 0,
    },

    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
      compress: false,
    },

    pagebreak: {
      mode: ["css", "legacy"],
    },
  };

  html2pdf().set(options).from(element).save();
};