"use client";

import { DataTable } from "@/components/admin/data-table";
import EmptyArea from "@/components/admin/empty-area";
import { Suspense, useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function CompanyAdminPage() {
    const [companies, setCompanies] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch('/api/admin/company');
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(`Failed to fetch companies: ${response.status} ${text}`);
                }
                const data = await response.json();
                setCompanies(data.companies ?? []);
                if (process.env.NODE_ENV !== 'production') {
                    console.log('fetched companies', data.companies);
                }
            } catch (error) {
                console.error('Error fetching companies:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCompanies();
    }, []);


    return (
        <>
            {  isLoading ? (
                <div> <Spinner className="size-7 mx-auto" /></div>
            ) : companies.length > 0 ? (
                <Suspense fallback={<div>Loading...</div>}>
                    <DataTable  />
                    <Link href="/admin/company/new">
                        <Button size={'lg'} variant="outline" className="mx-auto flex">Add Company</Button>
                    </Link>
                </Suspense>
            ) : (
                <EmptyArea
                    title="No Companies Yet"
                    description={"You haven't created any companies yet. Get started by creating your first company."}
                    cta="Create Company"
                />
            )}

            {/* If there are companies, show the data table */}
        </>
    );
}
