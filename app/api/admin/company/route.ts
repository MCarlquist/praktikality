"use server";

import { NextResponse } from "next/server";
import { createClient } from '@/lib/supabase/server';

export async function GET() {
    const supabase = createClient();
let { data: companies, error } = await (await supabase).from('companies').select('*');
    console.log('error', error);
    return NextResponse.json({ companies });

}