
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client directly.
// The execution environment is responsible for providing the API key.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBangaloreRaceTip = async (): Promise<string> => {
  const defaultTip = "Remember to stay hydrated and watch out for the city's dynamic traffic!";
  
  try {
    // A check for the API key is not needed here, as the environment provides it.
    // If the call fails for any reason, the catch block will handle it gracefully.
    const prompt = `Give me a creative, one-sentence bicycle racing tip for a race in Bangalore, India. Mention a specific, famous landmark like Cubbon Park, Vidhana Soudha, or Lalbagh. Keep it concise and encouraging.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    // Use the .text property directly to get the response string.
    return response.text?.trim() || defaultTip;
  } catch (error) {
    console.error("Error fetching race tip from Gemini API:", error);
    // If the API call fails, we will fall back to the default tip.
    // The user experience is not interrupted.
    return defaultTip;
  }
};