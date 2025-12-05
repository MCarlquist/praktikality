import { Suspense } from "react";
import CompanyDetailContent from "./company-detail-content-page";
import { cacheLife } from "next/cache";



export default async function CompanyDetailPage(props: { params: Promise<{ company_name: string }> }) {
    "use cache"
    cacheLife('default');
    const params = await props.params;
    const company_name = decodeURIComponent(params.company_name);

    return (
        <Suspense fallback={<div>Loading company details...</div>}>
            <CompanyDetailContent companyName={company_name} />
        </Suspense>
    );
}