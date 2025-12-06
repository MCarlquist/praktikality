"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const supabase = await createServerSupabaseClient();
        let { data: users, error } = await supabase.from('profiles').select('*');

        return NextResponse.json({ users });
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function POST() {
    try {
        const supabase = await createServerSupabaseClient();
        let { data: users, error } = await supabase.from('profiles').select('*');

        return NextResponse.json({ users });
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

