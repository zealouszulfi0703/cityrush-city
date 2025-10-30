
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this MVP, we'll proceed and let the API call fail if the key is missing.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getBangaloreRaceTip = async (): Promise<string> => {
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
