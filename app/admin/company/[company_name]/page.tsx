"use client";
import { Suspense, useEffect, useState } from "react";
import CompanyDetailContent from "./company-detail-content";
import { useParams } from "next/navigation";

export default function CompanyDetailPage(props: { params: Promise<{ company_name: string }> }) {
    const { company_name } = useParams();
    const [data, setData] = useState<any>({});
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);
    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(`/api/admin/single-company/${company_name}`);
                    const result = await response.json();
                    setData(result.company);
                } catch (err) {
                    setError(err instanceof Error ? err.message : "Error fetching data");
                } finally {
                    setLoading(false);
                }
            };
    
            if (company_name) {
                fetchData();
            }
        }, [company_name]);
    
        useEffect(() => {
            if (data) {
                console.log(data);
                
                mapDetails(data);
            }
        }, [data]);
    
        function mapDetails(data: any) {
            const result = Object.entries(data).map(([key, item]: [string, any]) => {
    
                const type = item.company_type;
    
    
                return {
                    key,
                    type,
                    item
                };
            });

            console.log(result);
            
    
        }
    
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;
    
        return (
            <div>
                <Suspense fallback={<p>Loading Company Detail</p>}>
                    <p className="text-lg">Company: {company_name}</p>
                <pre>{JSON.stringify(data, null, 2)}</pre>
                <p>Commpany Type: {data} </p></Suspense>
            </div>
        );
}