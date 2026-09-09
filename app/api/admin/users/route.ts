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

/**
 * Updates a user's internship preference.
 *
 * @param req - Request containing `updatedUser.id` and `updatedUser.want_internship`
 * @returns A success response when the user is updated, or a 500 error response if the update fails
 */
export async function PUT(req: NextRequest) {
    const body = await req.json();
    
    try {
        const supabase = await createServerSupabaseClient();

        const { data, error } = await supabase
            .from('profiles')
            .update({
                want_internship: body.updatedUser.want_internship,
            })
            .eq('id', body.updatedUser.id)
            .select();

        if (error) {
            throw new Error(error.message);
        }
        console.log('data', data);
        
        return NextResponse.json({ message: 'User updated successfully', success: true });
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error: 'Failed to update user', success: false }, { status: 500 });
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

