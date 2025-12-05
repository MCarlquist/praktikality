import { Suspense } from "react";
import CompanyDetailContent from "./company-detail-content-page";
import { cacheLife } from "next/cache";

type User = {
    id: string,
    email: string
}

export default async function CompanyDetailPage(props: { params: Promise<{ company_name: string }> }) {
    "use cache"
    cacheLife('seconds');
    const params = await props.params;
    const company_name = decodeURIComponent(params.company_name);

    return (
        <Suspense fallback={<div>Loading company details...</div>}>
            <CompanyDetailContent companyName={company_name} />
        </Suspense>
    );
}