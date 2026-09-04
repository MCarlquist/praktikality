import { client } from "@/lib/huggingface";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_LANGUAGES = 20;
const MAX_LANGUAGE_LENGTH = 50;
const MAX_TYPE_LENGTH = 100;

const requestTimestamps = new Map<string, number[]>();

export async function POST(request: Request) {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return Response.json({ error: "Authentication required" }, { status: 401 });
    }

    const now = Date.now();
    const recentRequests = (requestTimestamps.get(user.id) ?? [])
        .filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

    if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
        return new Response(
            JSON.stringify({ error: "Too many requests" }),
            {
                status: 429,
                headers: {
                    "Content-Type": "application/json",
                    "Retry-After": String(Math.ceil((recentRequests[0] + RATE_LIMIT_WINDOW_MS - now) / 1000)),
                },
            },
        );
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
        return Response.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { languages, type } = body as { languages?: unknown; type?: unknown };
    if (
        !Array.isArray(languages) ||
        languages.length === 0 ||
        languages.length > MAX_LANGUAGES ||
        !languages.every(
            (language) => typeof language === "string" && language.trim().length > 0 && language.length <= MAX_LANGUAGE_LENGTH,
        ) ||
        typeof type !== "string" ||
        type.trim().length === 0 ||
        type.length > MAX_TYPE_LENGTH
    ) {
        return Response.json({ error: "Invalid or oversized request fields" }, { status: 400 });
    }

    requestTimestamps.set(user.id, [...recentRequests, now]);

    const chatCompletion = await client.chat.completions.create({
        model: "deepseek-ai/DeepSeek-V4-Flash-0731:novita",
        messages: [
            {
                role: "user",
                content: `
                I need 4 concrete internship viable programming ideas for a company that I want to work at.
                I need them in a numbered list. the programming languages I need ideas for are: ${languages.join(", ")}
                and the type of company's focus is ${type.trim()}.
                I only want the response in markdown.
                `,
            },
        ],
    });

    return Response.json({
        message: chatCompletion.choices[0].message.content
    });

}