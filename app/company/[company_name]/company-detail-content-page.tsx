'use client';

import { ChevronLeft, SquareMousePointer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Company } from "@/lib/company";

export default function CompanyDetailContent({
    company,
    description,
    projectIdeas,
}: {
    company: Company;
    description: string;
    projectIdeas: Array<{ h3: string; p: string; content?: string }> | null;
}) {
    // helper for company type labels
    function loopThroughCompanies(type?: string | null) {
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
                return String(type);
        }
    }

    return (
        <div className="mx-auto p-5">
            <Button variant="default" size="sm" className="mb-5" onClick={() => window.history.back()}>
                <ChevronLeft size="16" strokeWidth={2} />
                Tillbaka    
            </Button>
            <p className="text-7xl mb-3 text-center">{company.company_name}</p>
            <div className="flex flex-1 gap-10">
                <div className="w-2/3">
                    <div className="flex flex-col gap-3 mb-5">
                        <h3 className="text-2xl font-bold text-center text-balance">Om Företaget</h3>
                        <div className="flex justify-center items-center">
                            <h3 className="text-balance" dangerouslySetInnerHTML={{ __html: description }}></h3>
                        </div>
                        <h3 className="text-4xl font-bold text-center text-balance mt-5">Project Idéer</h3>
                        <div className="flex flex-row gap-2">
                            {projectIdeas && projectIdeas.length > 0 ? (
                                projectIdeas.map((idea, index) => (
                                    <Card key={index} className="flex-1">
                                        <CardHeader>
                                            <CardTitle className="text-2xl font-normal" dangerouslySetInnerHTML={{ __html: idea.h3 }}></CardTitle>
                                            <CardDescription dangerouslySetInnerHTML={{ __html: idea.p }}></CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            {idea.content && <div dangerouslySetInnerHTML={{ __html: idea.content }}></div>}
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <div className="w-full text-center text-gray-500">
                                    <p>Inga projekt idéer kunde genereras för närvarande. Försök senare.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <aside className="w-1/3">
                    <div className="flex flex-col gap-2 mb-5">
                        <p>Företags storlek: {company.company_size} personer</p>
                        <p>Företags typ: {loopThroughCompanies(company.company_type)}</p>
                        <p>Programmering Språk:</p>
                        <ul className="text-md">{company.programming_languages.map((lang, index) => (
                            <li key={index}>
                                <p className="text-sm">-{lang}</p>
                            </li>
                        ))}</ul>
                        <p>Remote: {company.remote ? 'Ja' : 'Nej'}</p>
                        <p>Plats: {company.location}</p>
                        <p>Kontakt: {company.company_contact}</p>
                        <p>Hemsida: {company.company_site != null ? <a className="flex gap-1" href={company.company_site} target="_blank">{company.company_site} <SquareMousePointer className="size-4" /></a> : 'not supplied'}</p>
                        <div className="size-6">
                            <Button size={'default'} variant={'default'}>Intresserad?</Button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
