"use client";
import { useEffect, useState } from "react";
import markdownIt from 'markdown-it-ts'
import { SquareMousePointer } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { getCompanyDetail, getProjectIdeas } from "@/lib/ai/ai";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

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
    const [description, setDescription] = useState('');
    const [projectIdeas, setProjectIdeas] = useState<Array<{ h3: string; p: string; content?: string }> | null>(null);

    useEffect(() => {
        const initializeData = async () => {
            setLoading(true);
            try {
                // Step 1: Fetch company data
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

                // Step 2: Fetch company description
                const md = new markdownIt();
                const descriptionText = await getCompanyDetail(result.company.company_site);
                if (descriptionText) {
                    setDescription(md.render(descriptionText));
                } else {
                    setDescription("Ingen beskrivning tillgänglig.");
                }

                // Step 3: Fetch project ideas
                const ideas = await getProjectIdeas(result.company.company_site, result.company.programming_languages);
                console.log(ideas);
                setProjectIdeas(ideas);

                // All data loaded successfully
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error fetching data");
                setLoading(false);
            }
        };

        if (companyName) {
            initializeData();
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

    if (loading) return <div className="flex flex-col justify-center items-center"><Spinner className="size-20" /> Laddar Företaget (det kan ta en minut)</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="mx-auto p-5">
            <p className="text-7xl mb-3 text-center">{name}</p>
            <div className="flex flex-1 gap-10">
                <div className="w-2/3">
                    <div className="flex flex-col gap-3 mb-5">
                        <h3 className="text-2xl font-bold text-center text-balance">Om Företaget</h3>
                        <div className="flex justify-center items-center">
                            <h3 className="text-balance" dangerouslySetInnerHTML={{ __html: description }}></h3>
                        </div>
                        <h3 className="text-4xl font-bold text-center text-balance mt-5">Project Idéer</h3>
                        <div className="flex flex-row gap-2">
                            {projectIdeas && projectIdeas.map((idea, index) => (
                                <Card key={index} className="flex-1">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-normal" dangerouslySetInnerHTML={{ __html: idea.h3 }}></CardTitle>
                                        <CardDescription dangerouslySetInnerHTML={{ __html: idea.p }}></CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {idea.content && <div dangerouslySetInnerHTML={{ __html: idea.content }}></div>}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
                <aside className="w-1/3">
                    <div className="flex flex-col gap-2 mb-5">
                        <p>Företags storlek: {size} personer</p>
                        <p>Företags typ: {loopThroughCompanies(type)}</p>
                        <p>Programmering Språk:</p>
                        <ul className="text-md">{programmingLanguages.map((lang, index) => (
                            <li key={index}>
                                <p className="text-sm">-{lang}</p>
                            </li>
                        ))}</ul>
                        <p>Remote: {remote ? 'Ja' : 'Nej'}</p>
                        <p>Plats: {location}</p>
                        <p>Kontakt: {contact}</p>
                        <p>Hemsida: {website != null ? <a className="flex gap-1" href={website} target="_blank">{website} <SquareMousePointer className="size-4" /></a> : 'not supplied'}</p>
                        <div className="size-6">
                            <Button size={'default'} variant={'default'}>Intresserad?</Button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
