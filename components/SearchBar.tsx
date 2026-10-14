"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Field } from "./ui/field";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import SearchResults, { languageLabels, type Company } from "./SearchResults";

export function SeachBar() {
  const [query, setQuery] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [results, setResults] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<number | null>(null);

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((selected) =>
      selected.includes(language)
        ? selected.filter((item) => item !== language)
        : [...selected, language],
    );
  };

  useEffect(() => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    // Always fetch — when `query` is empty we'll fetch the full list
    setLoading(true);
    debounceRef.current = window.setTimeout(async () => {
      try {
        const params = new URLSearchParams();
        if (query.trim()) {
          params.set("q", query.trim());
        }
        selectedLanguages.forEach((language) => params.append("language", language));
        const search = params.toString();
        const res = await fetch(search ? `/api/admin/company?${search}` : "/api/admin/company");
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
  }, [query, selectedLanguages]);

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
      <div className="w-full max-w-3xl mx-auto mt-3 text-left">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-sm font-medium">
            Filtrera efter programmeringstaggar
          </span>
          {selectedLanguages.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setSelectedLanguages([])}
            >
              Rensa filter
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(languageLabels).map(([value, label]) => {
            const selected = selectedLanguages.includes(value);
            return (
              <Button
                key={value}
                type="button"
                variant={selected ? "default" : "outline"}
                size="sm"
                aria-pressed={selected}
                onClick={() => toggleLanguage(value)}
              >
                {label}
              </Button>
            );
          })}
        </div>
      </div>
      {loading && <div className="text-sm text-muted-foreground mt-2">Söker...</div>}
      <SearchResults results={results} />
    </div>
  );
}
