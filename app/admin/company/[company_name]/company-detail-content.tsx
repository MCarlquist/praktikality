"use client";
import { useEffect, useState } from "react";


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
        Object.keys(data).forEach(key => {
            console.log(data[key]);
            const type = data[key].company_type;
        });
    }, [data]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <p className="text-lg">Company: {companyName}</p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <p>Commpany Type: {data} </p>
        </div>
    );
}
