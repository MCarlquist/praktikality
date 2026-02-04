"use client";

import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";

type Company = {
  id: number;
  company_name: string;
  company_contact?: string | null;
  company_site?: string | null;
  company_type?: string | null;
  company_size?: string | null;
  programming_languages?: string[] | null;
  deltagare?: string[] | null;
  location?: string | null;
  remote?: boolean | null;
};

export default function SearchResults({ results }: { results: Company[] }) {
  if (!results || results.length === 0) {
    return null;
  }

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

  function getRemoteBadge(remote?: boolean | string | null) {
    // Prefer boolean values (true = remote, false = on-site). For backward compatibility, accept some strings.
    if (typeof remote === 'string') {
      const r = remote.toLowerCase().trim();
      if (r === 'hybrid') return { label: 'Hybrid', variant: 'secondary' as const };
      if (r === 'remote' || r === 'true' || r === '1') return { label: 'På Distans', variant: 'default' as const };
      return { label: 'På Plats', variant: 'outline' as const };
    }

    if (remote === null || remote === undefined) {
      return { label: 'Unknown', variant: 'outline' as const };
    }

    return remote ? { label: 'På Distans', variant: 'default' as const } : { label: 'På Plats', variant: 'outline' as const };
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 bg-card/50 rounded-md shadow-sm border">
      <ul className="divide-y">
        {results.map((c) => {
          const langs = c.programming_languages ?? [];
          const top = langs.slice(0, 3);
          const remaining = Math.max(0, langs.length - top.length);
          const participantCount = (c.deltagare ?? []).length;
          const remoteBadge = getRemoteBadge(c.remote);

          return (
            <li key={c.id} className="px-4 py-3 hover:bg-muted">
              <Link href={`/company/${encodeURIComponent(String(c.company_name))}`} className="flex items-start justify-between gap-4">
                <div className="flex-1 flex flex-col">
                  <span className="text-4xl mb-2">{c.company_name}</span>
                  <div className="flex items-center gap-3 justify-center">
                    <span className="text-md text-muted-foreground">Typ av företag: {loopThroughCompanies(c.company_type)} <br /> Antal anställda: {c.company_size ? ` ${c.company_size} pers` : ""} <br /> {c.location ? ` Plats: ${c.location}` : ""}</span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                    {top.length > 0 ? (
                      <>
                        {top.map((l) => (
                          <Badge key={l} variant="outline" className="text-sm">{l}</Badge>
                        ))}
                        {remaining > 0 && <span className="text-xs text-muted-foreground">+{remaining} more</span>}
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground">No languages listed</span>
                    )}
                  </div>
                </div>

                <div className="ml-2 flex-shrink-0 flex flex-col items-end gap-2">
                  <Badge variant="secondary" className="text-xs">{participantCount} deltagare</Badge>
                  <Badge variant={remoteBadge.variant} className="text-xs">{remoteBadge.label}</Badge>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
