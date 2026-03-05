import { createServerSupabaseClient } from "@/lib/supabase/server";

export type Company = {
    company_name: string;
    company_type: string;
    company_size: string;
    have_intern: string;
    programming_languages: string[];
    remote: boolean;
    location: string;
    company_contact: string;
    company_site: string;
};

export async function getCompanyByName(companyName: string): Promise<Company | null> {
    try {
        const supabase = await createServerSupabaseClient();
        const { data: company, error } = await supabase
            .from('companies')
            .select('*')
            .eq('company_name', companyName)
            .single();

        if (error) {
            console.error('Error fetching company:', error);
            return null;
        }

        // ensure programming_languages is an array
        if (!company.programming_languages) {
            company.programming_languages = [];
        }

        return company as Company;
    } catch (error) {
        console.error('Failed to fetch company:', error);
        return null;
    }
}