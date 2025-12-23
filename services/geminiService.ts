import { GoogleGenerativeAI } from "@google/generative-ai";
import { Soup } from "../types";

export const getMainhaRecommendation = async (userPrompt: string, availableSoups: Soup[]): Promise<string> => {
  // Use the web-compatible SDK
  const genAI = new GoogleGenerativeAI(process.env.API_KEY || '');
  
  const soupContext = availableSoups.map(s => `${s.name}: ${s.description}`).join('; ');
  
  const prompt = `
    Você é a "Mainha", uma cozinheira carinhosa do sertão brasileiro. 
    O usuário disse: "${userPrompt}".
    As opções de hoje são: ${soupContext}.
    
    Recomende a melhor sopa de forma bem carinhosa, usando expressões nordestinas (oxente, vixe, arretado).
    Seja breve e calorosa.
  `;

  try {
    // Use a stable model available in the public API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || "Vixe, Mainha tá meio ocupada no fogão agora, mas qualquer uma dessas sopas vai te deixar forte!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Oxente! Algo deu errado, mas a Sopa de Carne tá uma delícia!";
  }
};
