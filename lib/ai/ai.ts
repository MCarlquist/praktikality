"use server";

import { cache } from "react";
import { OpenAI } from "openai";
import { scrapeWebsite } from "@/app/api/scrape/route";

const client = new OpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: process.env.HF_TOKEN,
});

// memoized version of getCompanyDetail so repeated requests hit cache
export const getCompanyDetail = cache(async (websiteUrl: string) => {
    console.log('site url', websiteUrl);

    const scrapedData = await scrapeWebsite(websiteUrl);

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
});

// Get project ideas (also memoized)
export const getProjectIdeas = cache(
    async (websiteUrl: string, programmingLanguages: string[]) => {
        const scrapedData = await scrapeWebsite(websiteUrl);
        
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

For each project, provide the following sections:
- Title: [project title]
- Description: [detailed description]
- Alignment: [how it aligns]
- Technologies: [technologies used]

Return only the project ideas in the exact format above, one per line for each section, separated by blank lines between projects. Do not include any introductory or concluding text.

Company Information:
${companyInfo}

Please write the suggestions in Swedish.`
                },
            ],
        });
        
        const content = response.choices[0].message.content || '';
        
        console.log('AI response content for project ideas:', content);
        
        const projectIdeas: Array<{ h3: string; p: string; content: string }> = [];
        
        // Try to parse projects - look for Title, Description, etc patterns
        const lines = content.split('\n').map(l => l.trim()).filter(l => l);
        
        let currentProject: any = {};
        for (const line of lines) {
            if (line.startsWith('Title:')) {
                if (currentProject.title) {
                    // Save previous project if complete
                    if (currentProject.title && currentProject.description) {
                        projectIdeas.push({
                            h3: `<h3>${currentProject.title}</h3>`,
                            p: `<p>${currentProject.description}</p>`,
                            content: `<p>${currentProject.alignment || ''}</p><p>${currentProject.technologies || ''}</p>`
                        });
                    }
                    currentProject = {};
                }
                currentProject.title = line.substring(6).trim();
            } else if (line.startsWith('Description:')) {
                currentProject.description = line.substring(12).trim();
            } else if (line.startsWith('Alignment:')) {
                currentProject.alignment = line.substring(10).trim();
            } else if (line.startsWith('Technologies:')) {
                currentProject.technologies = line.substring(13).trim();
            }
        }
        // Save last project
        if (currentProject.title && currentProject.description) {
            projectIdeas.push({
                h3: `<h3>${currentProject.title}</h3>`,
                p: `<p>${currentProject.description}</p>`,
                content: `<p>${currentProject.alignment || ''}</p><p>${currentProject.technologies || ''}</p>`
            });
        }
        
        
        return projectIdeas;
    }
);
