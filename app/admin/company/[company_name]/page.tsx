"use client";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { SquareMousePointer } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";



type User = {
    id: string,
    email: string
}

export default function CompanyDetailPage(props: { params: Promise<{ company_name: string }> }) {
    const { company_name } = useParams<{ company_name: string }>();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [name, setNamme] = useState('');
    const [type, setType] = useState('');
    const [size, setSize] = useState('');
    const [haveIntern, sethaveIntern] = useState('');
    const [program_languages, setProgramming_Languages] = useState([]);
    const [remote, setRemote] = useState('');
    const [location, setLocation] = useState('');
    const [contact, setContact] = useState('');
    const [website, setWebsite] = useState('');
    const [dUsers, setUsers] = useState<User[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/admin/single-company?company_name=${encodeURIComponent(String(company_name))}`);
                const result = await response.json();
                setNamme(result.company.company_name);
                setType(result.company.company_type);
                setSize(result.company.company_size);
                sethaveIntern(result.company.have_intern);
                setProgramming_Languages(result.company.programming_languages);
                setRemote(result.company.remote);
                setLocation(result.company.location);
                setContact(result.company.company_contact);
                setWebsite(result.company.company_site);


                // Creating sample Array of uers at company
                const userTestDataArray: User[] = [{id: 'efcid83', email: 'user1@codex.com'}, {id: 'fdak382', email: 'user2@codex.comm'}];
                setUsers(userTestDataArray);
                
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

    if (loading) return <div className="flex flex-col"> <Spinner className="size-8" /> Loading Company...</div>;
    if (error) return <div>Error: {error}</div>;

    function detailSkeleton() {
        return (
            <div className="flex flex-col">
                <Spinner className="size-8" />
                Loading Company...
            </div>
        );
    }

    return (
        <div className="mx-auto">
            <Suspense fallback={detailSkeleton()}>
                <p className="text-5xl mb-3">{name}</p>
                <p>Company Type: {type}</p>
                <p>Company Size: {size} people</p>
                <p>Do they already have an intern? Yes <Checkbox checked={haveIntern === 'yes' ? true : false} /> No <Checkbox checked={haveIntern === 'no' ? true : false} /></p>
                <p>Programming Languages:</p>
                <ul className="text-md">{program_languages.map((lang, index) => (
                    <li key={index}>
                        <p className="text-sm">-{lang}</p>
                    </li>
                ))}</ul>
                <p>Is it remote? Yes <Checkbox checked={remote === 'yes' ? true : false} /> No <Checkbox checked={remote === 'no' ? true : false} /></p>
                <p>Location: {location}</p>
                <p>Contact: <a className="text-blue-400" href={`mailto:${contact}`}>{contact}</a></p>
                <p>Company website: {website != null ? <a className="flex gap-1" href={website} target="_blank">{website} <SquareMousePointer className="size-4" /></a> : 'not supplied'}</p>

                <div className="mt-4">
                    <p>Current Deltagare:</p>
                    <small>{
                        dUsers.map(((user, index) =>
                            <p key={user.id}>{user.email}</p> 
                        ))}</small>
                </div>
            </Suspense>
        </div>
    );
}