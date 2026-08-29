"use client";
import { Badge } from "@/components/ui/badge"
import { useState } from "react";

type Language = {
    languages: string[]
}


export default function languagesBadges({ languages }: Language) {
    const [programmingLanguages, setProgrammingLanguages] = useState([]);

    return (
        <div className="w-80 m-4">
            <p>Programming Languages:</p>
            <ul className="flex w-full flex-wrap justify-center gap-2">{languages.map((lang, index) => (
                <li key={index}>
                    <Badge variant={'secondary'}>{lang}</Badge>
                </li>
            ))}</ul>
        </div>
    );

}