// test.js
import puppeteer from "puppeteer";

try {
  const browser = await puppeteer.launch({
    headless: true,
    dumpio: true,
    timeout: 0,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
  });

  console.log("Chrome launched successfully!");
  await browser.close();
} catch (err) {
  console.error(err);
}