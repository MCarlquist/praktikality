import { OpenAI } from 'openai';

const token = process.env.NVIDIA;
if (!token) {
	throw new Error('Missing NVIDIA environment variable');
}

export const client = new OpenAI({
  apiKey: token,
  baseURL: 'https://integrate.api.nvidia.com/v1',
})