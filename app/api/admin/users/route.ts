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

export async function PATCH(req: NextRequest) {
    const body = await req.json();
    try {
        const supabase = await createServerSupabaseClient();

        const { data, error } = await supabase
            .from('profiles')
            .update({
                want_internship: body.updatedUser.want_internship,
            })
            .eq('id', body.id)
            .select();

            console.log(data);
            

        if (error) {
            throw new Error(error.message);
        }
        
        return NextResponse.json({ message: 'User updated successfully', success: true, user: data });
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error: 'Failed to update user', success: false }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get('user');

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required', success: false }, { status: 400 });
    }

    try {
        const supabase = await createServerSupabaseClient();
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            return NextResponse.json({ error: 'Authentication required', success: false }, { status: 401 });
        }

        const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin');
        if (adminError) {
            throw new Error(`Failed to verify admin permissions: ${adminError.message}`);
        }
        if (!isAdmin) {
            return NextResponse.json({ error: 'Admin access required', success: false }, { status: 403 });
        }

        const { data, error } = await supabase
            .from('profiles')
            .delete()
            .eq('id', userId)
            .eq('role', 'user')
            .select('id')
            .maybeSingle();
        if (error) {
            throw new Error(`Failed to delete user profile: ${error.message}`);
        }
        if (!data) {
            return NextResponse.json({
                error: 'No user profile was deleted. Confirm the profile exists and apply the admin DELETE policy.',
                success: false,
            }, { status: 404 });
        }

        return NextResponse.json({ message: 'User profile deleted successfully', success: true });
    } catch (error) {
        console.error('Failed to delete user:', error);
        return NextResponse.json({ error: 'Failed to delete user', success: false }, { status: 500 });
    }
}
