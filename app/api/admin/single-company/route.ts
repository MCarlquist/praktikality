import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {
    
    
    try { 
        
        const fromServer = request.nextUrl.searchParams.get('company_name');
        
        if (!fromServer) {
            return NextResponse.json({ error: 'company_name parameter is required' }, { status: 400 });
        }

        const companyName = fromServer;
        const supabase = await createServerSupabaseClient();
        let { data: company, error } = await supabase
            .from('companies')
            .select('*')
            .eq('company_name', companyName)
            .single();
        
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // add cache headers so Vercel/edge can keep this response for an hour
        return NextResponse.json({ company }, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        });
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({ error: 'Failed to fetch company' }, { status: 500 });
    }
}