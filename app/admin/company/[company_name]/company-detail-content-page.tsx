"use client";

import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { MultiSelect } from "@/components/ui/multi-select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type InputFormValues = {
    company_name: string;
    company_contact: string;
    company_type: string;
    company_size: string;
    have_intern: string;
    programming_languages: string[];
    work_location: string;
    location: string;
    company_site: string;
    company_speciality: string;
    logo?: FileList;
    description: string;
};

const programmingLanguages = ["React", "Vue.js", "Angular", "Svelte", "Django", "Flask", "Ruby on Rails", "Spring", "Laravel", "Express.js", "ASP.NET", "Flutter", "React Native", "Swift", "Kotlin", "Java", "Python", "JavaScript", "TypeScript", "C#", "C++", "Go", "Rust", "GitHub", "HTML", "CSS", "C", "Node.js", "PHP", "AWS", "Fairgate", "MySQL", "Docker", "Microservices", "JSX", "Wordpress", "Jquery", "Raspberry Pi", "Arduino", "JetPack Compose", "UI Kit", "Xcode", "Objective C", "MongoDB", "Command Line", "liquid", "GraphQl", "Shoppify CLI"].map((label) => ({
    value: label.toLowerCase().replace(/[^a-z0-9]+/g, "_"),
    label,
}));

const specialities = [
    { label: "E-Handel", value: "ecommerce" },
    { label: "Konsultbolag", value: "consulting" },
    { label: "Skola", value: "school" },
    { label: "SaaS", value: "saas" },
    { label: "TV Spel", value: "videogame" },
];

export default function CompanyDetailContent({ companyName }: { companyName: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { control, handleSubmit, reset, formState: { errors } } = useForm<InputFormValues>();

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await fetch(`/api/admin/single-company?company_name=${encodeURIComponent(companyName)}`);
                const result = await response.json();
                if (!response.ok || !result.company) throw new Error(result.error ?? "Company not found");
                const company = result.company;
                reset({
                    company_name: company.company_name ?? "",
                    company_contact: company.company_contact ?? "",
                    company_type: company.company_type ?? "",
                    company_size: company.company_size ?? "",
                    have_intern: company.have_intern ?? "",
                    programming_languages: company.programming_languages ?? [],
                    work_location: company.work_location ?? company.remote ?? "",
                    location: company.location ?? "",
                    company_site: company.company_site ?? "",
                    company_speciality: company.company_speciality ?? "",
                    description: company.description ?? "",
                });
            } catch (fetchError) {
                setError(fetchError instanceof Error ? fetchError.message : "Error fetching company");
            } finally {
                setLoading(false);
            }
        };
        fetchCompany();
    }, [companyName, reset]);

    const onSubmit: SubmitHandler<InputFormValues> = async (data) => {
        setSaving(true);
        try {
            const formData = new FormData();
            formData.append("original_company_name", companyName);
            Object.entries(data).forEach(([key, value]) => {
                if (key !== "logo") {
                    formData.append(key, Array.isArray(value) ? JSON.stringify(value) : String(value));
                }
            });
            if (data.logo?.[0]) formData.append("logo", data.logo[0]);
            const response = await fetch("/api/admin/company", { method: "PATCH", body: formData });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error ?? "Failed to update company");
            toast.success(`Company ${result.data.company_name} updated successfully`, { position: "top-center", autoClose: 2500 });
            setTimeout(() => router.push("/admin/company"), 2500);
        } catch (submitError) {
            toast.error(submitError instanceof Error ? submitError.message : "Something went wrong", { position: "top-center", autoClose: 3500 });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex items-center gap-2"><Spinner className="size-8" /> Loading Company...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-6">
            <ToastContainer />
            <h1 className="mb-6 text-3xl font-bold">Edit Company</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
                <Controller name="company_name" control={control} rules={{ required: true }} render={({ field }) => <Input {...field} placeholder="Company Name" />} />
                {errors.company_name && <span className="text-sm text-red-500">This field is required</span>}
                <Controller name="company_site" control={control} rules={{ required: true }} render={({ field }) => <Input {...field} placeholder="Company Site" />} />
                {errors.company_site && <span className="text-sm text-red-500">This field is required</span>}
                <Controller name="company_speciality" control={control} rules={{ required: true }} render={({ field }) => <Select value={field.value} onValueChange={field.onChange}><SelectTrigger className="w-full"><SelectValue placeholder="Select speciality" /></SelectTrigger><SelectContent><SelectGroup>{specialities.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectGroup></SelectContent></Select>} />
                <Controller name="company_contact" control={control} rules={{ required: true }} render={({ field }) => <Input type="email" {...field} placeholder="Company Contact" />} />
                <Controller name="description" control={control} rules={{ required: true }} render={({ field }) => <Textarea {...field} placeholder="Företags beskrivning" />} />
                <p>Company Size (number of people)</p>
                <Controller name="company_size" control={control} rules={{ required: true }} render={({ field }) => <RadioGroup value={field.value} onValueChange={field.onChange}>{["1-5", "6-20", "21+"].map((value) => <div className="flex items-center gap-3" key={value}><RadioGroupItem value={value} id={`size-${value}`} /><Label htmlFor={`size-${value}`}>{value}</Label></div>)}</RadioGroup>} />
                <p>Company Type</p>
                <Controller name="company_type" control={control} rules={{ required: true }} render={({ field }) => <RadioGroup value={field.value} onValueChange={field.onChange}>{[["startup", "Start up"], ["small_business", "Small Business"], ["corporation", "Corporation"]].map(([value, label]) => <div className="flex items-center gap-3" key={value}><RadioGroupItem value={value} id={`type-${value}`} /><Label htmlFor={`type-${value}`}>{label}</Label></div>)}</RadioGroup>} />
                <p>Already someone at Codex an intern?</p>
                <Controller name="have_intern" control={control} rules={{ required: true }} render={({ field }) => <RadioGroup value={field.value} onValueChange={field.onChange}>{[["yes", "Yes"], ["no", "No"]].map(([value, label]) => <div className="flex items-center gap-3" key={value}><RadioGroupItem value={value} id={`intern-${value}`} /><Label htmlFor={`intern-${value}`}>{label}</Label></div>)}</RadioGroup>} />
                <p>Programming Languages used by company</p>
                <Controller name="programming_languages" control={control} rules={{ required: true }} render={({ field }) => <MultiSelect options={programmingLanguages} onValueChange={field.onChange} defaultValue={field.value} placeholder="Which programming languages do they use?" />} />
                <p>Work Location</p>
                <Controller name="work_location" control={control} rules={{ required: true }} render={({ field }) => <RadioGroup value={field.value} onValueChange={field.onChange}>{[["hybrid", "Hybrid"], ["on-site", "På Plats"], ["distans", "På Distans"]].map(([value, label]) => <div className="flex items-center gap-3" key={value}><RadioGroupItem value={value} id={`location-${value}`} /><Label htmlFor={`location-${value}`}>{label}</Label></div>)}</RadioGroup>} />
                <Controller name="location" control={control} rules={{ required: true }} render={({ field }) => <Input {...field} placeholder="Location" />} />
                <Label htmlFor="logo">Replace logo (optional)</Label>
                <Controller name="logo" control={control} render={({ field }) => <Input name={field.name} onBlur={field.onBlur} ref={field.ref} type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => field.onChange(event.target.files)} />} />
                <Button type="submit" disabled={saving}>{saving ? <>Saving... <Spinner /></> : "Save Changes"}</Button>
            </form>
        </div>
    );
}
