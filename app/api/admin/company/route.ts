"use server";

import { NextResponse } from "next/server";
import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { NextRequest } from 'next/server'

export async function GET(_request: NextRequest, ctx: RouteContext<'/api/admin/company'>) {

   console.log(ctx);
   

    try {
        const supabase = await createServerSupabaseClient();
        let { data: companies, error } = await supabase.from('companies').select('*');
        
        return NextResponse.json({ companies });
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
    }

}

export async function POST(request: Request) {
    
    try {
        const supabase = await createServerSupabaseClient();
        const { company_name, company_contact, company_type, company_size, have_intern, programming_languages, remote, location } = await request.json();

        const { data, error } = await supabase
            .from('companies')
            .insert([{ company_name, company_contact, company_type, company_size, have_intern, programming_languages, remote, location }])
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        

        return NextResponse.json({ data }, { status: 201 });
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error: 'Failed to create company' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    
    try {
        const supabase = await createServerSupabaseClient();
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Company ID is required' }, { status: 400 });
        }

        const { error } = await supabase
            .from('companies')
            .delete()
            .match({ id });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        
        return NextResponse.json({ message: 'Company deleted successfully' }, { status: 200 });
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error: 'Failed to delete company' }, { status: 500 });
    }
}
