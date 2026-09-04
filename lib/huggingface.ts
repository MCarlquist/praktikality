import { OpenAI } from 'openai';

const token = process.env.HUGGING_FACE_TOKEN;
if (!token) {
	throw new Error('Missing HUGGING_FACE_TOKEN environment variable');
}

export const client = new OpenAI({
	baseURL: "https://router.huggingface.co/v1",
	apiKey: token,
});