import { GoogleGenAI } from "@google/genai";

// --- START: CRITICAL FIX FOR BROWSER DEPLOYMENT ---

// Safely access the API key to prevent crashes in a browser environment
const API_KEY = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;

// Declare the `ai` instance but do not initialize it yet.
let ai: GoogleGenAI | null = null;

// Only initialize the GoogleGenAI client if the API key exists.
// This prevents a crash when `process.env.API_KEY` is undefined in the browser.
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  // This warning is now safe to run in the browser and informs the developer.
  console.warn("Gemini API key is not available. AI-powered features will be disabled.");
}

// --- END: CRITICAL FIX ---

export const getBangaloreRaceTip = async (): Promise<string> => {
  const defaultTip = "Remember to stay hydrated and watch out for the city's dynamic traffic!";
  
  // If the `ai` client was never initialized, return the default tip immediately.
  if (!ai) {
    return defaultTip;
  }

  try {
    const prompt = `Give me a creative, one-sentence bicycle racing tip for a race in Bangalore, India. Mention a specific, famous landmark like Cubbon Park, Vidhana Soudha, or Lalbagh. Keep it concise and encouraging.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    // Ensure we have text before trimming
    return response.text ? response.text.trim() : defaultTip;
  } catch (error) {
    console.error("Error fetching race tip from Gemini API:", error);
    return defaultTip;
  }
};
