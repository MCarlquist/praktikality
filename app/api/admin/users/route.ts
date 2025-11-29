"use server";

import { NextResponse } from "next/server";

/**
 * Handle GET requests for the admin users API and return a placeholder JSON payload.
 *
 * @returns A NextResponse containing the JSON object `{ message: "User API" }`.
 */
export async function GET() {
    // Placeholder for future implementation
    return NextResponse.json({ message: "User API" });
}