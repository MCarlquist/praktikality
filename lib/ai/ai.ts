"use server";

import { OpenAI } from "openai";
import { scrapeWebsite } from "@/app/api/scrape/route";

const client = new OpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: process.env.HF_TOKEN,
});

export async function getCompanyDetail(websiteUrl: string) {
    console.log('site url', websiteUrl);

    // Scrape the website to get actual content
    const scrapedData = await scrapeWebsite(websiteUrl);

    // Prepare the content for AI analysis
    const contentSummary = `
Website Title: ${scrapedData.title}
Description: ${scrapedData.description}
Key Content:
${scrapedData.headers.slice(0, 5).join('\n')}
${scrapedData.paragraphs.slice(0, 3).join('\n')}
    `.trim();

    const response = await client.chat.completions.create({
        model: "meta-llama/Llama-3.1-8B-Instruct:novita",
        messages: [
            {
                role: "user",
                content: `Based on the following company information, create a personalized introduction for an autistic individual person intrested in programming. The introduction should:
                Each portion should have headings and be concise, informative, and welcoming. The tone should be professional yet warm and approachable. Avoid using overly technical language or jargon. Remember to keep it easy to read and understand, while still providing valuable insights about the company for this is a job description for an internship position. Do not assume this information is a job appliation rather a concise company description. Use only the information given from the scraped website content. Do not make up any information about the company that is not present in the scraped content. If certain details are missing, simply omit them from the introduction rather than inventing information.
        

Company Information:
${contentSummary}

Please write this in Swedish and keep the tone professional yet warm and approachable.`
            },
        ],
    });
    return response.choices[0].message.content;
}