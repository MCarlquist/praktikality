"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";

export type Company = {
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
  work_location?: string | null;
  logo_path?: string | null;
};

export const languageLabels: Record<string, string> = {
  react: "React",
  vue: "Vue.js",
  angular: "Angular",
  svelte: "Svelte",
  django: "Django",
  flask: "Flask",
  ruby_on_rails: "Ruby on Rails",
  spring: "Spring",
  laravel: "Laravel",
  express: "Express.js",
  asp_net: "ASP.NET",
  flutter: "Flutter",
  react_native: "React Native",
  swift: "Swift",
  kotlin: "Kotlin",
  java: "Java",
  python: "Python",
  javascript: "JavaScript",
  typescript: "TypeScript",
  c_sharp: "C#",
  c_plus_plus: "C++",
  go: "Go",
  rust: "Rust",
  github: "GitHub",
  html: "HTML",
  css: "CSS",
  c: "C",
  nodejs: "Node.js",
  php: "PHP",
  aws: "AWS",
  fairgate: "Fairgate",
  mysql: "MySQL",
  docker: "Docker",
  microservices: "Microservices",
  jsx: "JSX",
  wordpress: "Wordpress",
  jquery: "Jquery",
  raspberry_pi: "Raspberry Pi",
  arduino: "Arduino",
  jetpack_compose: "JetPack Compose",
  ui_kit: "UI Kit",
  xcode: "Xcode",
  objective_c: "Objective C",
  mongodb: "MongoDB",
  command_line: "Command Line",
  liquid: "liquid",
  graphql: "GraphQl",
  shoppify_cli: "Shoppify CLI",
  fortinet: "Fortinet",
  ubiquiti: "Ubiquiti",
  microsoft_365: "Microsoft 365",
  microsoft_azure: "Microsoft Azure",
  nestjs: "NestJS",
  typeorm: "TypeORM",
  jest: "Jest",
  trello: "Trello",
  protocols_tcp_ip: "Protocols TCP/IP",
  mqtt: "MQTT",
  computer_vision: "Computer Vision",
  ml_tensorflow: "ML Tensorflow",
  pytorch: "Py Torch",
  time_series_analysis: "Time Series Analysis",
  arima: "ARIMA",
  prophet: "Prophet",
  influxdb: "InfluxDB",
  grafana: "Grafana",
  chartjs: "Chart.JS",
  d3js: "D3.Js",
  rest_apis: "REST APIs",
  lidar: "LIDAR",
  cv_fusion_point: "CV Fusion Point",
  cloud_processing: "Cloud Processing",
  sensor_calibration: "Sensor Calibration",
  integrations: "Integrations",
  unity: "Unity",
  "3d_artist": "3D Artist",
  ui_ux_designer: "UI/UX Designer",
  version_control: "Version Control",
  community_management: "Community Management",
  quality_assurance: "Quality Assurance",
  fotometri: "Fotometri",
  game_design: "Game Design",
  play_testing: "Play Testing",
  json: "JSON",
  sql: "SQL",
  xml: "XML",
  power_bi: "Power BI",
  microsoft_intune: "Microsoft Intune",
  hadoop: "Hadoop",
  spark: "Spark",
  blazor: "Blazor",
  razor: "Razor",
  bootstrap: "Bootstrap",
  linux: "Linux",
  e_handel: "E-handel",
  scss: "SCSS",
  video: "Video",
  tiktok: "TikTok",
  instagram: "Instagram",
  facebook: "Facebook",
};

export default function SearchResults({ results }: { results: Company[] }) {
  const [logoUrls, setLogoUrls] = useState<Record<number, string>>({});

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();

    const fetchLogoUrls = async () => {
      const entries = await Promise.all(
        results
          .filter((company) => company.logo_path)
          .map(async (company): Promise<[number, string] | null> => {
            const logoPath = company.logo_path;
            if (!logoPath) {
              return null;
            }

            const { data, error } = await supabase.storage
              .from("company-logos")
              .createSignedUrl(logoPath, 60 * 60);

            if (error) {
              console.error(`Unable to load logo for ${company.company_name}:`, error);
              return null;
            }

            return [company.id, data.signedUrl];
          }),
      );

      if (!cancelled) {
        setLogoUrls(Object.fromEntries(entries.filter((entry) => entry !== null)));
      }
    };

    void fetchLogoUrls();
    return () => {
      cancelled = true;
    };
  }, [results]);

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

  function getRemoteBadge(remote?: boolean | string | null): {
    variant: "secondary" | "outline" | "default" | "destructive";
    label: any;
  } {
    
    switch (remote) {
      case 'hybrid':
        return { variant: 'default', label: remote }
      case 'distans':
        return { variant: 'outline', label: remote }
      case 'on-site':
        return { variant: 'secondary', label: 'På plats' }
    }
    return { variant: "default", label: remote };
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-4 bg-card/50 rounded-md shadow-sm border">
      <ul className="divide-y">
        {results.map((c) => {
          const langs = c.programming_languages ?? [];
          const top = langs.slice(0, 3);
          const remaining = Math.max(0, langs.length - top.length);
          const participantCount = (c.deltagare ?? []).length;
          const remoteBadge = getRemoteBadge(c.work_location);
          const logoUrl = logoUrls[c.id];

          return (
            <li key={c.id} className="px-4 py-3 hover:bg-muted">
              <Link href={`/company/${encodeURIComponent(String(c.company_name))}`} className="flex items-start justify-between gap-4">
                <div className="flex w-14 h-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border bg-background">
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={`${c.company_name} logo`}
                      width={112}
                      height={112}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <Building2 className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
                  )}
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="text-4xl mb-2">{c.company_name}</span>
                  <div className="flex items-center gap-3 justify-center">
                    <span className="text-md text-muted-foreground">Typ av företag: {loopThroughCompanies(c.company_type)} <br /> Antal anställda: {c.company_size ? ` ${c.company_size} pers` : ""} <br /> {c.location ? ` Plats: ${c.location}` : ""}</span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                    {top.length > 0 ? (
                      <>
                        {top.map((l) => (
                          <Badge key={l} variant="outline" className="text-sm">
                            {languageLabels[l] ?? l}
                          </Badge>
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
