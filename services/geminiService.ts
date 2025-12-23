
import { GoogleGenAI } from "@google/genai";
import { Soup } from "../types";

export const getMainhaRecommendation = async (userPrompt: string, availableSoups: Soup[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const soupContext = availableSoups.map(s => `${s.name}: ${s.description}`).join('; ');
  
  const prompt = `
    Você é a "Mainha", uma cozinheira carinhosa do sertão brasileiro. 
    O usuário disse: "${userPrompt}".
    As opções de hoje são: ${soupContext}.
    
    Recomende a melhor sopa de forma bem carinhosa, usando expressões nordestinas (oxente, vixe, arretado).
    Seja breve e calorosa.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Vixe, Mainha tá meio ocupada no fogão agora, mas qualquer uma dessas sopas vai te deixar forte!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Oxente! Algo deu errado, mas a Sopa de Carne tá uma delícia!";
  }
};
