import Groq from "groq-sdk";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

// Helper: Extracts text content from uploaded PDF buffer
async function extractText(buffer) {
  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
  });

  const pdf = await loadingTask.promise;
  let text = "";

  for (let pageNo = 1; pageNo <= pdf.numPages; pageNo++) {
    const page = await pdf.getPage(pageNo);
    const content = await page.getTextContent();

    text +=
      content.items
        .map((item) => item.str)
        .join(" ") + "\n";
  }

  return text;
}

// Helper: Exponential backoff for temporary 429 (rate limits) or 503 (busy API)
async function callWithRetry(fn, retries = 3, delay = 1500) {
  try {
    return await fn();
  } catch (error) {
    const status = error.status || error.code;
    const isBusyError = status === 503 || status === 429;

    if (retries > 0 && isBusyError) {
      console.warn(`Groq API high demand (${status}). Retrying in ${delay}ms...`);
      await new Promise((res) => setTimeout(res, delay));
      return callWithRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

// 1. ANALYZE RESUME
export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF.",
      });
    }

    // Instantiating Groq inside the handler avoids top-level ESM env race conditions
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const resumeText = await extractText(req.file.buffer);

    // Call Groq API wrapped with retry logic
    const chatCompletion = await callWithRetry(() =>
      groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" }, // Enforces valid JSON response
        messages: [
          {
            role: "system",
            content: `You are an expert ATS Resume Analyzer. Analyze the provided resume and return ONLY a valid JSON object matching this exact schema:
{
  "resumeScore": number (0-100),
  "atsScore": number (0-100),
  "grammarScore": number (0-100),
  "strengths": ["string"],
  "missingSkills": ["string"],
  "suggestions": ["string"]
}`,
          },
          {
            role: "user",
            content: `Resume Content:\n${resumeText}`,
          },
        ],
      })
    );

    const rawText = chatCompletion.choices[0]?.message?.content?.trim() || "";

    console.log("========== GROQ RESPONSE ==========");
    console.log(rawText);
    console.log("===================================");

    let result;

    try {
      result = JSON.parse(rawText);
    } catch (err) {
      console.error("JSON Parse Error:", err);

      return res.status(500).json({
        success: false,
        message: "Groq returned invalid JSON structure.",
        rawResponse: rawText,
      });
    }

    return res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Resume Analysis Error:", error);

    const status = error.status || error.code;
    if (status === 503 || status === 429) {
      return res.status(503).json({
        success: false,
        message: "The AI service is currently experiencing high demand. Please wait a moment and try again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Resume analysis failed.",
      error: error.message,
    });
  }
};

// 2. GENERATE OBJECTIVE
export const generateObjective = async (req, res) => {
  try {
    const { fullName, education, skills, experience, projects } = req.body;

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const prompt = `
You are an expert resume writer.

Write ONE professional resume career objective.

Candidate Details:

Name: ${fullName || "N/A"}

Education:
${education || "N/A"}

Skills:
${skills || "N/A"}

Projects:
${projects || "N/A"}

Experience:
${experience || "N/A"}

Rules:
- Maximum 60 words.
- Professional tone.
- ATS-friendly.
- Do not use bullet points.
- Return only the objective text. Do not include markdown code block formatting or backticks.
`;

    // Wrapped Groq API call inside retry handler
    const chatCompletion = await callWithRetry(() =>
      groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.6,
      })
    );

    const rawObjective = chatCompletion.choices[0]?.message?.content?.trim() || "";
    
    // Cleanup extra quotes if present in raw response
    const objective = rawObjective.replace(/^["'`]|["'`]$/g, "");

    return res.json({
      success: true,
      objective,
    });
  } catch (error) {
    console.error("Generate Objective Error:", error);

    const status = error.status || error.code;
    if (status === 503 || status === 429) {
      return res.status(503).json({
        success: false,
        message: "The AI service is currently experiencing high demand. Please try again shortly.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to generate objective.",
      error: error.message,
    });
  }
};