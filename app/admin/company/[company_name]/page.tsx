
import { Suspense } from "react";
import CompanyDetailView from "./company-view";

export default async function CompanyDetailPage(props: { params: Promise<{ company_name: string }> }) {
    const params = await props.params;
    const { company_name } = params;
    const companyName = decodeURIComponent(company_name);

    return (
        <Suspense fallback={<div>Loading company details...</div>}>
            <div>
                <CompanyDetailView companyName={companyName} />
            </div>
        </Suspense>
    );
}