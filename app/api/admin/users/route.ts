"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';


export async function GET() {
    try {
        const supabase = await createServerSupabaseClient();
        let { data: users, error } = await supabase.from('profiles').select('*').eq('role', 'user');

        return NextResponse.json({ users });
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest) {
    console.log('deleting user');

    const fromServer = req.nextUrl.searchParams.get('user');
    console.log(fromServer);

    try {
        const supabase = await createServerSupabaseClient();

        const { error } = await supabase
            .from('profiles')
            .delete()
            .eq('id', fromServer)
        if (error) {
            throw new Error(error.message);
        }
        return NextResponse.json({ message: 'User deleted successfully', success: true });
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error: 'Failed to delete user', success: false }, { status: 500 });
    }
}

