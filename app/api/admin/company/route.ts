"use server";

import { NextResponse } from "next/server";
import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { NextRequest } from 'next/server';



export async function GET(_request: NextRequest) {
    const supabase = await createServerSupabaseClient();
    try {
        let { data: companies, error } = await supabase.from('companies').select('*');

        return NextResponse.json({ companies });
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
    }

}

export async function POST(request: Request) {

    const supabase = await createServerSupabaseClient();

    try {
        const supabase = await createServerSupabaseClient();
        const { company_name, company_contact, company_type, company_size, have_intern, programming_languages, remote, location, company_site } = await request.json();

        const { data, error } = await supabase
            .from('companies')
            .insert([{ company_name, company_contact, company_type, company_size, have_intern, programming_languages, remote, location, company_site }])
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
    const supabase = await createServerSupabaseClient();

    try {

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

export async function PUT(request: Request) {

    const supabase = await createServerSupabaseClient();

    try {
        const { company_name, userBody } = await request.json();
        console.log('company_name', company_name, 'userBody', userBody);
        const deltagareArray = [
            { name: userBody.name, email: userBody.email }
        ];

        const { data, error } = await supabase
            .from('companies')
            .update({ deltagare: deltagareArray })
            .eq('company_name', company_name)
            .select();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
            return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add user to company' }, { status: 500 });
    }



}