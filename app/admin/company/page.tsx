"use client";

import { DataTable } from "@/components/admin/data-table";
import EmptyArea from "@/components/admin/empty-area";
import { Suspense } from "react";


export default function CompanyAdminPage() {
    const fetchCompanies = async () => {
        const response = await fetch('/api/admin/company');
        const data = await response.json();
        return data.companies;
    };
    
    fetchCompanies()
    .then(data => {
        console.log('Fetched companies:', data);
    })
    .catch(error => {
        console.error('Error fetching companies:', error);
    });
    
    return (
        <>
            {/* If there are no companies */}
            <EmptyArea title="No Companies Yet"
                description={"You haven\'t created any companies yet. Get started by creating your first company."}
                cta="Create Company"
            />
            {/* If there are companies, show the data table */}
            
                
            <Suspense fallback={<div>Loading...</div>}>
                <DataTable
                    
                />
            </Suspense> 
        </>
    );
}