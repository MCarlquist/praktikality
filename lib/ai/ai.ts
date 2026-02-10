"use server";

import { OpenAI } from "openai";

const client = new OpenAI({
	baseURL: "https://router.huggingface.co/v1",
	apiKey: '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',
});

const chatCompletion = await client.chat.completions.create({
	model: "meta-llama/Llama-3.1-8B-Instruct:novita",
    messages: [
        {
            role: "user",
            content: "What is the capital of France?",
        },
    ],
});

console.log(chatCompletion.choices[0].message);


export async function getCompanyDetail(websiteUrl: string) {
    console.log('site url', websiteUrl);
    
    const response = await client.chat.completions.create({
        model: "meta-llama/Llama-3.1-8B-Instruct:novita",
        messages: [
            {
                role: "user",
                content: `Write a detailed description of the company with the website ${websiteUrl}. Include information about the company's history, mission, products or services, and any notable achievements or awards. The description should be informative and engaging, providing a comprehensive overview of the company for potential customers or clients. Please write this in Swedish`
            },
        ],
    });
    return response.choices[0].message.content;
}