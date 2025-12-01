"use server";

import { NextResponse } from "next/server";
import { createClient } from '@/lib/supabase/server';

export async function GET() {

    try {
        const supabase = await createClient();
        let { data: companies, error } = await supabase.from('companies').select('*');
        
        return NextResponse.json({ companies });
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
    }

}

export async function POST(request: Request) {
    
    try {
        const supabase = await createClient();
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