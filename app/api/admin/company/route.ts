"use server";

import { NextResponse } from "next/server";
import { createClient } from '@/lib/supabase/server';

/**
 * Handle GET requests for the admin company endpoint and return all company records.
 *
 * @returns A JSON response containing `companies`: the fetched array of company records, or `null` if the query failed.
 */
export async function GET() {
    const supabase = createClient();
let { data: companies, error } = await (await supabase).from('companies').select('*');
    console.log('error', error);
    return NextResponse.json({ companies });

}