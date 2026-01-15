
import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

export const getAIAnalysis = async (products: Product[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Analyze the following inventory data for 'BOKU NO SHOP'. 
    Data: ${JSON.stringify(products)}
    
    Please provide:
    1. A summary of current financial health.
    2. Which items are performing best.
    3. Restock recommendations based on stock levels and status.
    4. A motivational tip for the business owner.
    
    Format the response in professional markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating analysis. Please check your connection and try again.";
  }
};
