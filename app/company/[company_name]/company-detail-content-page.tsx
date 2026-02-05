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
                const userTestDataArray: User[] = [{ id: 'efcid83', email: 'user1@codex.com' }, { id: 'fdak382', email: 'user2@codex.com' }];
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

    function loopThroughCompanies(type?: string | null) {
        // Return a localized, user-friendly company type label for a given type string
        switch (type) {
            case 'startup':
                return 'Startup';
            case 'small_business':
                return 'Litet företag';
            case 'corporation':
                return 'Stort företag';
            case undefined:
            case null:
            case '':
                return 'Okänd Typ';
            default:
                // If it's already a human-friendly string, just return it
                return String(type);
        }
    }

    if (loading) return <div className="flex flex-col"><Spinner className="size-8" /> Loading Company...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="mx-auto">
            <p className="text-7xl mb-3 text-center">{name}</p>
            <div className="flex flex-1 ">
                <div className="w-2/3 m-1">
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero asperiores placeat dolore, dolorem molestiae ullam, aspernatur enim tenetur odio necessitatibus aperiam fugit libero sunt. Eum animi accusamus voluptas nesciunt modi! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus odio itaque ipsam ea dicta quis nostrum. Earum accusantium amet dolorem veniam voluptatibus alias totam! Iure, porro adipisci! Qui, id impedit.</h3>
            </div>
            <aside className="w-1/3">
                <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil a quas, alias labore consectetur iure vitae nulla accusamus, aperiam, aliquam eaque autem exercitationem! Vel nobis voluptatibus corporis, repellat dolores neque.</h3>
            </aside>
            </div>
        </div>
    );
}
