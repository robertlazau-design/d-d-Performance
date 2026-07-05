import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const streamPerformanceAdvice = async (
  prompt: string,
  onChunk: (text: string) => void
): Promise<void> => {
  try {
    const ai = getAIClient();
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are 'The Stig's Intellectual Cousin', a highly knowledgeable and witty performance automotive consultant for D&D Performance Automotive. 
        
        Your tone should be:
        1. Professional but enthusiastic about cars (Top Gear style).
        2. Knowledgeable about tuning, dyno testing, maintenance, and engine building.
        3. Concise and helpful.
        4. Always gently steer the conversation towards visiting D&D Performance Automotive for the actual work.
        
        If asked about specific prices, say "It varies by build, but bring it into the shop for a free quote."
        
        Keep responses under 100 words unless detailed technical info is requested.`,
      },
    });

    const result = await chat.sendMessageStream({ message: prompt });

    for await (const chunk of result) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};