import { client } from "@/lib/huggingface";

export async function POST(request: Request) {
    const body = await request.json();

    const chatCompletion = await client.chat.completions.create({
        model: "deepseek-ai/DeepSeek-V4-Flash-0731:novita",
        messages: [
            {
                role: "user",
                content: `
                
                I need 4 concrete internship viable programming ideas for a company that I want to work at.
                I need them in a numbered list. the programming languages I need ideas for are: ${body.languages}
                and the type of company's focus is ${body.type}.
                I only want the response in markdown.
                `,
            },
        ],
    });

    return Response.json({
        message: chatCompletion.choices[0].message.content
    });

}