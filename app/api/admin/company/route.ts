"use server";

import { NextResponse } from "next/server";
import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { NextRequest } from 'next/server';



export async function GET(request: NextRequest) {
    const supabase = await createServerSupabaseClient();
    try {
        const q = request.nextUrl.searchParams.get('q');

        if (q && q.trim().length > 0) {
            // Use ilike for case-insensitive partial match
            const { data: companies, error } = await supabase.from('companies').select('*').ilike('company_name', `%${q}%`);
            if (error) {
                console.log('supabase search error', error);
                return NextResponse.json({ error: error.message }, { status: 500 });
            }
            return NextResponse.json({ companies });
        }

        let { data: companies, error } = await supabase.from('companies').select('*').eq('ready_for_intern', true);

        return NextResponse.json({ companies });
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 });
    }

}

export async function POST(request: Request) {


    try {
        const supabase = await createServerSupabaseClient();

        const formData = await request.formData();

        const company_name = formData.get('company_name') as string;
        const company_contact = formData.get("company_contact") as string;
        const company_type = formData.get("company_type") as string;
        const company_size = formData.get("company_size") as string;
        const have_intern = formData.get("have_intern");
        const programming_languages = JSON.parse(formData.get("programming_languages") as string);
        const location = formData.get("location") as string;
        const company_site = formData.get("company_site") as string;
        const company_speciality = formData.get("company_speciality") as string;
        const work_location = formData.get("work_location") as string;

        // Upload logo
        const logo_file = formData.get('logo') as File | null;
        let logoPath: string | null = null;

        if (logo_file && logo_file.size > 0) {
            const fileExtension = logo_file.name.split('.').pop();
            const fileName = `${crypto.randomUUID()}.${fileExtension}`;
            logoPath = `companies/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('company-logos')
                .upload(logoPath, logo_file, {
                    contentType: logo_file.type,
                    upsert: false
                });

            if (uploadError) {
                console.error("Upload error ", uploadError);

                return NextResponse.json(
                    { error: 'Failed to upload company logo' },
                    { status: 400 },
                );
            }
        }


        const { data, error } = await supabase
            .from('companies')
            .insert([{ company_name, company_contact, company_type, company_size, have_intern, programming_languages, work_location, location, company_site, company_speciality, logo_path: logoPath }])
            .select()
            .single();

        if (error) {
            if(logoPath) {
                await supabase.storage.from('company-logos').remove([logoPath]);
            }
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