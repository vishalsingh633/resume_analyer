import { chromium } from "playwright";

export const generatePDF = async (html) => {
  const browser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--no-first-run",
      "--no-zygote",
    ],
  });

  const page = await browser.newPage({
    viewport: {
      width: 1240,
      height: 1754,
    },
  });

  try {
    await page.setContent(html, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    await page.evaluate(() => document.fonts.ready);

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "15mm",
        bottom: "15mm",
        left: "15mm",
        right: "15mm",
      },
    });

    return pdf;
  } finally {
    await page.close().catch(() => {});
    await browser.close().catch(() => {});
  }
};
