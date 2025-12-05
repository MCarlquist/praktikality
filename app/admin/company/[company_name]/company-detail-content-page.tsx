"use client";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { SquareMousePointer } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

type User = {
    id: string,
    email: string
}

export default function CompanyDetailContent({ companyName }: { companyName: string }) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [size, setSize] = useState('');
    const [haveIntern, setHaveIntern] = useState('');
    const [programmingLanguages, setProgrammingLanguages] = useState([]);
    const [remote, setRemote] = useState('');
    const [location, setLocation] = useState('');
    const [contact, setContact] = useState('');
    const [website, setWebsite] = useState('');
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/admin/single-company?company_name=${encodeURIComponent(String(companyName))}`);
                const result = await response.json();
                setName(result.company.company_name);
                setType(result.company.company_type);
                setSize(result.company.company_size);
                setHaveIntern(result.company.have_intern);
                setProgrammingLanguages(result.company.programming_languages);
                setRemote(result.company.remote);
                setLocation(result.company.location);
                setContact(result.company.company_contact);
                setWebsite(result.company.company_site);

                // Creating sample Array of users at company
                const userTestDataArray: User[] = [{id: 'efcid83', email: 'user1@codex.com'}, {id: 'fdak382', email: 'user2@codex.com'}];
                setUsers(userTestDataArray);
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

    if (loading) return <div className="flex flex-col"><Spinner className="size-8" /> Loading Company...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="mx-auto">
            <p className="text-5xl mb-3">{name}</p>
            <p>Company Type: {type}</p>
            <p>Company Size: {size} people</p>
            <p>Do they already have an intern? Yes <Checkbox checked={haveIntern === 'yes' ? true : false} /> No <Checkbox checked={haveIntern === 'no' ? true : false} /></p>
            <p>Programming Languages:</p>
            <ul className="text-md">{programmingLanguages.map((lang, index) => (
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
                    users.map(((user) =>
                        <p key={user.id}>{user.email}</p> 
                    ))}</small>
            </div>
        </div>
    );
}
