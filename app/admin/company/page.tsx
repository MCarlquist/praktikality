"use client";

import { DataTable } from "@/components/admin/data-table";
import EmptyArea from "@/components/admin/empty-area";
import { Suspense, useState, useEffect } from "react";


export default function CompanyAdminPage() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch('/api/admin/company');
                const data = await response.json();
                setCompanies(data.companies);
                console.log('companies', data.companies);
                
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchCompanies();
    }, []);


    return (
        <>
            { companies.length > 0 ? (
                <Suspense fallback={<div>Loading...</div>}>
                    <DataTable />
                </Suspense>
                
            ) : (
                <EmptyArea title="No Companies Yet"
                    description={"You haven\'t created any companies yet. Get started by creating your first company."}
                    cta="Create Company"
                />
            )}

            {/* If there are companies, show the data table */}
        </>
    );
}