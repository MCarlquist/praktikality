"use client";
import { Suspense, useEffect, useState } from "react";


export default function CompanyDetailContent({ companyName }: { companyName: string }) {
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/admin/single-company?company_name=${encodeURIComponent(companyName)}`);
                const result = await response.json();
                setData(result.company);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        if (companyName) {
            fetchData();
        }
    }, [companyName]);

    useEffect(() => {
        mapDetails(data);
    }, [data]);

    function mapDetails(data: object) {
        const result = Object.entries(data).map(([key, item]) => {
            console.log(item);

            const type = item.company_type;


            return {
                key,
                type,
                item
            };
        });

    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Suspense fallback={<p>Loading Company Detail</p>}>
                <p className="text-lg">Company: {companyName}</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <p>Commpany Type: {data} </p></Suspense>
        </div>
    );
}
