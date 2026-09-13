'use client';
import { MultiSelect } from "@/components/ui/multi-select";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from 'react-toastify';
import {
    Field,
    FieldLabel,
} from "@/components/ui/field"

import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";


type InputFormValues = {
    company_name: string;
    company_contact: string;
    company_type: string;
    company_size: string;
    have_intern: string;
    programming_languages: string[];
    work_location: string
    location: string;
    company_site: string;
    company_speciality: string;
    logo?: FileList;
};



export default function NewCompanyPage() {

    const programmingLanguages = [
        { value: "react", label: "React" },
        { value: "vue", label: "Vue.js" },
        { value: "angular", label: "Angular" },
        { value: "svelte", label: "Svelte" },
        { value: "django", label: "Django" },
        { value: "flask", label: "Flask" },
        { value: "ruby_on_rails", label: "Ruby on Rails" },
        { value: "spring", label: "Spring" },
        { value: "laravel", label: "Laravel" },
        { value: "express", label: "Express.js" },
        { value: "asp_net", label: "ASP.NET" },
        { value: "flutter", label: "Flutter" },
        { value: "react_native", label: "React Native" },
        { value: "swift", label: "Swift" },
        { value: "kotlin", label: "Kotlin" },
        { value: "java", label: "Java" },
        { value: "python", label: "Python" },
        { value: "javascript", label: "JavaScript" },
        { value: "typescript", label: "TypeScript" },
        { value: "c_sharp", label: "C#" },
        { value: "c_plus_plus", label: "C++" },
        { value: "go", label: "Go" },
        { value: "rust", label: "Rust" },
        { value: 'github', label: 'GitHub' },
    ];

    const { control, handleSubmit, formState: { errors } } = useForm<InputFormValues>({
        defaultValues: {
            company_name: "",
            company_contact: "",
            company_type: "",
            company_size: "",
            have_intern: "",
            programming_languages: [],
            work_location: "",
            location: "",
            company_site: "",
            company_speciality: "",
            logo: undefined
        },
    });

    // Type of company_speciality
    const items = [
        { label: "E-Handel", value: "ecommerce" },
        { label: "Konsultbolag", value: "consulting" },
        { label: "Skola", value: "school" },
        { label: "SaaS", value: "saas" },
        { label: "TV Spel", value: "videogame" },
    ]



    const router = useRouter();
    const [loading, setLoading] = useState(false);




    const handleSubmits: SubmitHandler<InputFormValues> = async (data) => {
        console.log(data);

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('company_name', data.company_name);
            formData.append('company_contact', data.company_contact);
            formData.append('company_type', data.company_type);
            formData.append('company_size', data.company_size);
            formData.append("have_intern", data.have_intern);
            formData.append("programming_languages", JSON.stringify(data.programming_languages));
            formData.append("work_location", data.work_location);
            formData.append("location", data.location);
            formData.append("company_site", data.company_site);
            formData.append("company_speciality", data.company_speciality);

            // Upload Logo
            if(data.logo?.[0]) {
                formData.append('logo', data.logo[0]);
            }

            const response = await fetch('/api/admin/company', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                const responseData = await response.json();
                toast.success(`Company ${responseData.data.company_name} created successfully`, {
                    position: 'top-center',
                    autoClose: 3500,
                });

                setTimeout(() => {
                    router.push('/admin/company');
                }, 3500);
            } else {
                const errorData = await response.json();
                toast.error("Failed to create company:" + errorData.error, {
                    position: 'top-center',
                    autoClose: 3500
                });
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong', {
                position: 'top-center',
                autoClose: 3500
            });
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="p-6">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-6">Create New Company</h1>
            <form onSubmit={handleSubmit(handleSubmits)} className="max-w-md space-y-4">
                <Controller
                    name="company_name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Input {...field} placeholder="Company Name" className="w-full px-3 py-2 border rounded" />}
                />

                {errors.company_name && <span className="text-red-500 text-sm">This field is required</span>}

                <Controller
                    name="company_site"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Input {...field} placeholder="Company Site" className="w-full px-3 py-2 border rounded" />}
                />

                {errors.company_site && <span className="text-red-500 text-sm">This field is required</span>}

                <Controller
                    name="company_speciality"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select speciality" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {items.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />

                {errors.company_speciality && <span className="text-red-500 text-sm">This field is required</span>}

                <Controller
                    name="company_contact"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Input type="email" {...field} placeholder="Company Contact" className="w-full px-3 py-2 border rounded" />}
                />

                {errors.company_contact && <span className="text-red-500 text-sm">This field is required</span>}

                {/* multiple select of company size */}
                <p>Company Size (number of people)</p>
                <Controller name="company_size" control={control} rules={{ required: true }} render={({ field }) => (
                    <RadioGroup value={field.value} onValueChange={field.onChange}>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="1-5" id="r1" />
                            <Label htmlFor="r1">1-5</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="6-20" id="r2" />
                            <Label htmlFor="r2">6-20</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="21+" id="r3" />
                            <Label htmlFor="r3">21+</Label>
                        </div>
                    </RadioGroup>)}
                />
                {errors.company_size && <span className="text-red-500 text-sm">This field is required</span>}
                <p>Company Type</p>
                <Controller name="company_type" control={control} rules={{ required: true }} render={({ field }) => (
                    <RadioGroup value={field.value} onValueChange={field.onChange}>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="startup" id="t11" />
                            <Label htmlFor="t11">Start up</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="small_business" id="t2" />
                            <Label htmlFor="t2">Small Business</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="corporation" id="t3" />
                            <Label htmlFor="t3">Corporation</Label>
                        </div>
                    </RadioGroup>)}
                />
                {errors.company_type && <span className="text-red-500 text-sm">This field is required</span>}

                {/* have intern radio group */}
                <p>Already someone at Codex an intern?</p>
                <Controller name="have_intern" control={control} rules={{ required: true }} render={({ field }) => (
                    <RadioGroup value={field.value} onValueChange={field.onChange}>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="yes" id="i1" />
                            <Label htmlFor="i1">Yes</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="no" id="i2" />
                            <Label htmlFor="i2">No</Label>
                        </div>
                    </RadioGroup>)}
                />
                {errors.have_intern && <span className="text-red-500 text-sm">This field is required</span>}

                {/* multiple select of programming languages */}
                <p>Programming Languages used by company</p>
                <Controller
                    name="programming_languages"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <MultiSelect {...field} options={programmingLanguages}
                            onValueChange={field.onChange} value={field.value}
                            placeholder="Which programming languages do they use?" />
                    )}
                />
                {errors.programming_languages && <span className="text-red-500 text-sm">This field is required</span>}
                {/* work location checkbox */}
                <p>Work Location</p>
                <Controller name="work_location" control={control} rules={{ required: true }} render={({ field }) => (
                    <RadioGroup value={field.value} onValueChange={field.onChange}>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="hybrid" id="location-hybrid" />
                            <Label htmlFor="location-hybrid">Hybrid</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="on-site" id="location-on-site" />
                            <Label htmlFor="location-on-site">På Plats</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="distans" id="location-distans" />
                            <Label htmlFor="location-distans">På Distans</Label>
                        </div>
                    </RadioGroup>)}
                />
                {errors.work_location && <span className="text-red-500 text-sm">This field is required</span>}


                {/* location */}
                <Field>
                    <p>Fysisk location</p>
                    <Controller
                        name="location"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <Input {...field} id="location" placeholder="Location" className="w-full px-3 py-2 border rounded" />}
                    />
                </Field>

                {errors.location && <span className="text-red-500 text-sm">This field is required</span>}
                <br />
                <Field>
                    <FieldLabel htmlFor="logo">Logo</FieldLabel>
                    <Controller
                        name="logo"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Input
                                name={field.name}
                                onBlur={field.onBlur}
                                ref={field.ref}
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={(event) => {
                                    field.onChange(event.target.files);
                                }}
                                className="w-full px-3 py-2 border rounded"
                            />
                        )}
                    />
                    {errors.logo && <span className="text-red-500 text-sm">This field is required</span>}
                </Field>
                <Button type="submit" disabled={loading} variant={'default'}>
                    {loading ? <>Creating... <Spinner /></> : 'Create Company'}
                </Button>
            </form>
        </div>
    );
}