import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const generateSummaryProvider = async (systemMessage, userMessage) => {
	const response = await ai.models.generateContent({
		model: "gemini-3-flash-preview",
		contents: [
			{
				role: "user",
				parts: [{ text: userMessage }],
			},
		],
		config: {
			systemInstruction: systemMessage,
			temperature: 0.3,
		},
	});

	return response.text;
};
