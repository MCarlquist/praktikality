import { OpenAI } from 'openai';

export const client = new OpenAI({
	baseURL: "https://router.huggingface.co/v1",
	apiKey: process.env.HUGGING_FACE_TOKEN,
});