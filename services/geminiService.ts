
import { GoogleGenAI, Type } from "@google/genai";
import { LandscapeInfo } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getLandscapeDescription = async (date: Date, isWeekend: boolean): Promise<LandscapeInfo> => {
  const dateString = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const theme = isWeekend ? "a serene and magical lake" : "a breathtaking natural landscape";
  
  const prompt = `Generate a poetic title and a one-sentence ethereal description for a landscape associated with ${dateString}. 
  The theme is ${theme}. Make it sound dreamy and artistic.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
          },
          required: ["title", "description"],
        },
      },
    });

    return JSON.parse(response.text.trim()) as LandscapeInfo;
  } catch (error) {
    console.error("Gemini Text Generation Error:", error);
    return {
      title: isWeekend ? "Whispering Waters" : "Silent Horizon",
      description: `A moment captured in time for ${dateString}, where the light dances across the world.`
    };
  }
};

export const generateLandscapeImage = async (info: LandscapeInfo, date: Date): Promise<string | undefined> => {
  const dateString = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const prompt = `A breathtaking, high-quality, ethereal and artistic landscape painting of "${info.title}". 
  Context: ${info.description}. The setting is the date ${dateString}. 
  Style: Dreamy, cinematic lighting, 4k, masterpiece, vibrant but professional colors.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
  }
  return undefined;
};
