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

// Get project ideas
export async function getProjectIdeas(websiteUrl: string, programmingLanguages: string[]) {
    // Scrape the website to get actual company information
    const scrapedData = await scrapeWebsite(websiteUrl);

    // Prepare the company content for AI analysis
    const companyInfo = `
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
                content: `Based on the following company information, suggest 3 realistic project ideas that an autistic individual interested in programming could work on during an internship at this company. 

The project ideas should:
- Be deeply relevant to the company's specific industry, products, and services
- Align with the company's actual technology stack and programming practices
- Provide meaningful learning opportunities for the intern
- Be realistic to complete within 3-6 months
- Leverage the following programming languages the company uses: ${programmingLanguages.join(', ')}
- Focus on creating accessible and engaging projects

For each project include html formatted sections with the following headings:
h3 of project title
a p tag of Detailed description of the project and its goals
a p tag of How it aligns with the company's business
a p tag of What technologies and programming languages would be used

Keep the tone professional yet warm and approachable. Use only the information provided about the company - do not make up projects or technologies not mentioned in their actual content. only return html formatted project ideas based on the real company information provided below. For each project idea, only return an object of each project idea with formatted html inside an array in the format provided. only return the project ideas and nothing else. Do not include any introductory or concluding text. Do not include any text that is not part of the project ideas. Do not include any text that is not part of the html formatted project ideas. Do not make up any information about the company that is not present in the scraped content. If certain details are missing, simply omit them from the project ideas rather than inventing information.

format:
<h3>Project Title</h3>
<p>Detailed description of the project and its goals</p>
<p>How it aligns with the company's business</p>
<p>What technologies and programming languages would be used</p>

Company Information:
${companyInfo}

Please write the suggestions in Swedish.`
            },
        ],
    });
    
    const content = response.choices[0].message.content || '';
    
    // Parse the HTML response into an array of objects with h3, p, and content properties
    const projectIdeas: Array<{ h3: string; p: string; content: string }> = [];
    
    // Split by h3 tags to separate each project
    const h3Regex = /<h3[^>]*>(.*?)<\/h3>/gi;
    const pRegex = /<p[^>]*>(.*?)<\/p>/gi;
    
    let h3Match;
    const h3Matches = [];
    while ((h3Match = h3Regex.exec(content)) !== null) {
        h3Matches.push(h3Match[1]);
    }
    
    // Reset regex global index
    h3Regex.lastIndex = 0;
    pRegex.lastIndex = 0;
    let pMatch;
    const pMatches = [];
    while ((pMatch = pRegex.exec(content)) !== null) {
        pMatches.push(pMatch[1]);
    }
    
    // Group paragraphs by projects (3 paragraphs per project)
    for (let i = 0; i < Math.min(3, h3Matches.length); i++) {
        const startIdx = i * 3;
        projectIdeas.push({
            h3: `<h3>${h3Matches[i]}</h3>`,
            p: pMatches[startIdx] ? `<p>${pMatches[startIdx]}</p>` : '',
            content: `<p>${pMatches[startIdx + 1] || ''}</p><p>${pMatches[startIdx + 2] || ''}</p>`
        });
    }
    
    return projectIdeas;
}