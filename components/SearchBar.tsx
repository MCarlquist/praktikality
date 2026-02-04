"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Field } from "./ui/field";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import SearchResults from "./SearchResults";

export function SeachBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    // Always fetch — when `query` is empty we'll fetch the full list
    setLoading(true);
    debounceRef.current = window.setTimeout(async () => {
      try {
        const url = query ? `/api/admin/company?q=${encodeURIComponent(query)}` : `/api/admin/company`;
        const res = await fetch(url);
        if (!res.ok) {
          setResults([]);
        } else {
          const data = await res.json();
          setResults(data.companies ?? []);
        }
      } catch (e) {
        console.error("Search error", e);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [query]);

  return (
    <div className="w-full">
      <Field orientation={"horizontal"} className="gap-4 w-full max-w-3xl mx-auto">
        <Input
          type="text"
          placeholder="Sök Företag..."
          className="h-16 text-5xl px-6 flex-1"
          style={{ fontSize: "30px" }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          variant="default"
          size="default"
          className="text-md px-8 h-14"
          onClick={() => setQuery((q) => q)}
          aria-label="Sök"
        >
          <SearchIcon size={28} />
        </Button>
      </Field>
      {loading && <div className="text-sm text-muted-foreground mt-2">Söker...</div>}
      <SearchResults results={results} />
    </div>
  );
}
