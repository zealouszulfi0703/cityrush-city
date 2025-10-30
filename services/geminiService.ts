import { GoogleGenAI } from "@google/genai";

// Safely access the API key to prevent crashes in a browser environment
const API_KEY = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;

if (!API_KEY) {
  // This warning is now safe to run in the browser.
  console.warn("API_KEY is not available in this environment. AI features will be disabled.");
}

// Initialize with the key, which might be undefined. The SDK can handle this.
const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getBangaloreRaceTip = async (): Promise<string> => {
  // If the API key isn't set, don't even try to make the API call.
  if (!API_KEY) {
    return "Remember to stay hydrated and watch out for the city's dynamic traffic!";
  }

  try {
    const prompt = `Give me a creative, one-sentence bicycle racing tip for a race in Bangalore, India. Mention a specific, famous landmark like Cubbon Park, Vidhana Soudha, or Lalbagh. Keep it concise and encouraging.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching race tip from Gemini API:", error);
    return "Remember to stay hydrated and watch out for the city's dynamic traffic!";
  }
};
