export const revalidate = 3600; // cache this page for an hour

import CompanyDetailContent from "./company-detail-content-page";
import { getCompanyDetail, getProjectIdeas } from "@/lib/ai/ai";
import { getCompanyByName, Company } from "@/lib/company";

export default async function CompanyDetailPage(props: { params: Promise<{ company_name: string }> }) {
    const params = await props.params;
    const company_name = decodeURIComponent(params.company_name);

    // fetch company record directly from database
    const company = await getCompanyByName(company_name);
    if (!company) {
        throw new Error(`Company "${company_name}" not found`);
    }

    // Ensure programming_languages is an array
    const langs = Array.isArray(company.programming_languages) ? company.programming_languages : [];

    // get AI data using memoized helpers
    const descriptionText = await getCompanyDetail(company.company_site);
    // render markdown to HTML here so page becomes purely presentation
    const md = (await import('markdown-it-ts')).default();
    const descriptionHtml = descriptionText ? md.render(descriptionText) : 'Ingen beskrivning tillgänglig.';

    const projectIdeas = await getProjectIdeas(company.company_site, langs);

    return <CompanyDetailContent company={company} description={descriptionHtml} projectIdeas={projectIdeas} />;
}