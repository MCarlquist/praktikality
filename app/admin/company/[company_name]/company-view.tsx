
import { Suspense } from "react";

export default async function CompanyDetailView(props: { companyName: string }) {
    const { companyName } = props;

    const response = await fetch(`/api/admin/company/${companyName}`);

    if (!response.ok) {
        console.error('Failed to fetch company details');
        return (
            <Suspense fallback={<div>Loading company details...</div>}>
                <div>
                    Error loading company details.
                </div>
            </Suspense>
        );
    }

    const data = await response.json();
    const company = data.company;

    if (!company) {
        return (
            <Suspense fallback={<div>Loading company details...</div>}>
                <div>
                    Company not found.
                </div>
            </Suspense>
        );
    }

    return (
        <Suspense fallback={<div>Loading company details...</div>}>
            
        </Suspense>
    );
}