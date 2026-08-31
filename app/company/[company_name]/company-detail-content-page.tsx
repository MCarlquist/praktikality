"use client";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { SquareMousePointer } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import LanguagesBadges from "@/components/company/languages_badges";
import { createClient } from "@/lib/supabase/client";

//! Calls supabase browser client.
const supabase = createClient();

type User = {
    id: string,
    email: string
}

/**
 * Displays detailed information for a company and lets users express interest in an internship.
 *
 * @param companyName - The name of the company to display
 */
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
    const [alreadyInTable, setAlreadyInTable] = useState(false);
    const [signedUpUsers, setSignedUpUsers] = useState(0);


    // fetch signed up users to company.
    const fetchSignedUpUsersToCompany = async () => {

        let { data: companies, error } = await supabase
            .from('companies')
            .select('deltagare')
            .eq('company_name', companyName)
            .single();
                       
        if (!companies?.deltagare) {
            return 0;
        }
        
        return companies?.deltagare.length;

    };


    // Get currently signed in user.
    const fetchSignedInUser = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            return user;
        } catch (error) {
            console.error(error);
        }
    };

    // Reference the supabase company table & antal_intresserade[] column.
    const fetchCompanyTable = async () => {
        try {
            const { data, error } = await supabase
                .from('companies')
                .select('antal_intresserade')
                .eq('company_name', companyName)
                .maybeSingle();

            if (error) throw error;

            return Array.isArray(data?.antal_intresserade)
                ? data.antal_intresserade
                : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    // see if user is already in antal_intressade column.
    const isUserInTable = async () => {
        const user = await fetchSignedInUser();
        const userId = user?.id;

        if (!userId) return false;

        const companyTable = await fetchCompanyTable();

        return companyTable.includes(userId);
    };

    useEffect(() => {


        // If the user is in the table, then the "Ja, Gärna" button shouldn't be clickable.
        const isIntrested = async () => {
            if (await isUserInTable()) {
                setAlreadyInTable(true);
            }
        };

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

                // TODO: fetch signed up users to company from database.
                // Creating sample Array of users at company
                const userTestDataArray: User[] = [{ id: 'efcid83', email: 'user1@codex.com' }, { id: 'fdak382', email: 'user2@codex.com' }];
                const fetchUsers = await fetchSignedUpUsersToCompany();
                setSignedUpUsers(fetchUsers)
                setUsers(userTestDataArray);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Error fetching data");
            } finally {
                setLoading(false);
            }
        };

        if (companyName) {
            fetchData();
            isIntrested();


        }
    }, [companyName]);

    // User wants to be a intern at this company.
    const joinCompany = async () => {
        const user = await fetchSignedInUser();
        const userEmail = user?.email;
        try {
            const api = await fetch('/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    deltagare: userEmail,
                    foretag: companyName
                })
            });
            if (!api.ok) {
                throw new Error(`Request Failed: ${api.status}`);
            }

            const data = await api.json();

            if (!data.success) return;

            const user = await fetchSignedInUser();
            const userId = user?.id;

            if (!userId) {
                console.log("No logged in user");
                return;
            }

            const { data: existingRow, error: fetchError } = await supabase
                .from("companies")
                .select("antal_intresserade")
                .eq("company_name", companyName)
                .maybeSingle();

            if (fetchError) throw fetchError;

            const currentIds: string[] = Array.isArray(existingRow?.antal_intresserade)
                ? existingRow.antal_intresserade
                : [];

            const updatedIds = Array.from(new Set([...currentIds, userId]));

            const { error: updateError } = await supabase
                .from("companies")
                .upsert(
                    {
                        company_name: companyName,
                        antal_intresserade: updatedIds,
                    },
                    { onConflict: "company_name" }
                );

            if (updateError) throw updateError;

            if (updateError) throw updateError;

            setAlreadyInTable(true);
        } catch (error) {
            console.error('error in fetch: ', error);
        }

    }

    if (loading) return <div className="flex flex-col"><Spinner className="size-8" /> Loading Company...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="mx-auto flex flex-auto gap-5">
            <div>
                <p className="text-5xl mb-3">{name}</p>
                <p>Company Type: {type}</p>
                <p>Company Size: <span className="font-bold">{size}</span> people</p>
                <p>Do they already have an intern? <span className={haveIntern === 'yes' ? 'font-bold': ''}>Yes</span><Checkbox checked={haveIntern === 'yes' ? true : false} /> <span className={haveIntern === 'no' ? 'font-bold': ''}>No</span> <Checkbox checked={haveIntern === 'no' ? true : false} /></p>

                <LanguagesBadges languages={programmingLanguages} />

                <p>Is it remote? Yes <Checkbox checked={remote === 'yes' ? true : false} /> No <Checkbox checked={remote === 'no' ? true : false} /></p>
                <p>Location: <span className="font-bold">{location}</span></p>
                <p>Contact: <a className="text-blue-400 font-bold" href={`mailto:${contact}`}>{contact}</a></p>
                <p>Company website: {website != null ? <a className="flex gap-1 font-bold" href={website} target="_blank">{website} <SquareMousePointer className="size-4" /></a> : 'not supplied'}</p>

                <div className="mt-4">
                    <p>Antal Deltagare redan med denna företag: <span className="font-bold"> { signedUpUsers }</span></p>

                </div>
            </div>
            <div className="flex flex-col text-center gap-3">
                <h3 className="text-2xl">Vill du ha praktik hos dom?</h3>
                <p>Intresserad?</p>
                <Button onClick={joinCompany} disabled={alreadyInTable}>
                    {alreadyInTable ? 'Redan Skickat Intresse' : 'Ja, Gärna'}
                </Button>
            </div>
        </div>
    );
}
