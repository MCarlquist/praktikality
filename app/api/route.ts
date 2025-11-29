import { NextResponse } from "next/server";

/**
 * Responds to GET requests with a JSON greeting.
 *
 * @returns A NextResponse whose JSON body is `{ message: "Hello, world!" }`.
 */
export async function GET() {
    // Placeholder for future implementation
    return NextResponse.json({ message: "Hello, world!" });
    
}