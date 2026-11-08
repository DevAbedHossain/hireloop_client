"use client";

import { useState } from "react";
import { Banknote, Building2, Calendar, ChevronDown, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/lib/actions/createPost";
import { cn } from "cn";

// Field values live in one flat object — read/write with `form.<field>` and `set("field", value)`.
export const initialForm = {
    title: "",
    companyName: "",
    category: "",
    jobType: "Full-time",
    location: "",
    isRemote: false,
    deadline: "",
    minSalary: "",
    maxSalary: "",
    frequency: "per hour",
    responsibilities: "",
    qualifications: "",
};

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

const CATEGORIES = [
    "Engineering & Tech",
    "Design & Creative",
    "Product & Management",
    "Marketing & Sales",
    "Finance & Legal",
    "Other",
];

const FREQUENCIES = ["per hour", "per day", "per month", "per year"];

const card = "rounded-lg border border-white/8 bg-[#141418] p-6";
const sectionHeading = "flex items-center gap-2 text-lg font-semibold text-white";
const label = "block text-sm font-medium text-white";
const iconField = "relative";
const iconClasses = "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/60";

function AddNewJobs() {
    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);

    const set = (field: string, value: string | boolean) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setSubmitted(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("new job post", form);
        setSubmitted(true);

        const result = await createPost(form);

        console.log("submit data", result)
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
            {/* 1. Basic Information */}
            <section className={card}>
                <h2 className={cn(sectionHeading, "mb-5")}>
                    <span className="size-2 rounded-full bg-[#5c53fe]" aria-hidden="true" />
                    1. Basic Information
                </h2>

                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="title" className={cn(label, "mb-2")}>
                            Job Title <span aria-hidden="true">*</span>
                        </label>
                        <Input
                            id="title"
                            type="text"
                            value={form.title}
                            onChange={(e) => set("title", e.target.value)}
                            placeholder="Frontend Developer"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="companyName" className={cn(label, "mb-2")}>
                                Company Name <span aria-hidden="true">*</span>
                            </label>
                            <div className={iconField}>
                                <Building2 className={iconClasses} aria-hidden="true" />
                                <Input
                                    id="companyName"
                                    type="text"
                                    value={form.companyName}
                                    onChange={(e) => set("companyName", e.target.value)}
                                    placeholder="HirePulse Network"
                                    required
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="category" className={cn(label, "mb-2")}>
                                Job Category <span aria-hidden="true">*</span>
                            </label>
                            <div className={iconField}>
                                <ChevronDown
                                    className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-white/60"
                                    aria-hidden="true"
                                />
                                <select
                                    id="category"
                                    value={form.category}
                                    onChange={(e) => set("category", e.target.value)}
                                    required
                                    className={cn(
                                        "h-12 w-full appearance-none rounded-xl border border-white/20 bg-[#101010] px-4 pr-10 text-base text-white outline-none transition-all focus-visible:border-[#5c53fe] focus-visible:ring-3 focus-visible:ring-[#5c53fe]/30",
                                        !form.category && "text-white/60"
                                    )}
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    {CATEGORIES.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Job Type pill buttons (Figma: 4 segmented buttons) */}
                    <div>
                        <span className={cn(label, "mb-2")} id="job-type-label">
                            Job Type <span aria-hidden="true">*</span>
                        </span>
                        <div
                            role="radiogroup"
                            aria-labelledby="job-type-label"
                            className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                        >
                            {JOB_TYPES.map((type) => {
                                const selected = form.jobType === type;
                                return (
                                    <button
                                        key={type}
                                        type="button"
                                        role="radio"
                                        aria-checked={selected}
                                        onClick={() => set("jobType", type)}
                                        className={cn(
                                            "h-11 rounded-lg border text-sm font-medium transition-all",
                                            selected
                                                ? "border-[#5c53fe] bg-[#5c53fe] text-white"
                                                : "border-white/20 bg-[#101010] text-white hover:bg-[#1b1b1e]"
                                        )}
                                    >
                                        {type}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Location, Compensation & Timeline */}
            <section className={card}>
                <h2 className={cn(sectionHeading, "mb-5")}>
                    <span className="size-2 rounded-full bg-[#5c53fe]" aria-hidden="true" />
                    2. Location, Compensation &amp; Timeline
                </h2>

                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <label htmlFor="location" className={label}>
                                    Job Location <span aria-hidden="true">*</span>
                                </label>
                                <span className="rounded-full border border-white/15 px-2 py-0.5 text-xs text-[#a1a4aa]">
                                    Required
                                </span>
                            </div>
                            <div className={iconField}>
                                <MapPin className={iconClasses} aria-hidden="true" />
                                <Input
                                    id="location"
                                    type="text"
                                    value={form.location}
                                    onChange={(e) => set("location", e.target.value)}
                                    placeholder="New York, USA"
                                    required
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="deadline" className={cn(label, "mb-2")}>
                                Application Deadline
                            </label>
                            <div className={iconField}>
                                <Calendar className={iconClasses} aria-hidden="true" />
                                <Input
                                    id="deadline"
                                    type="date"
                                    value={form.deadline}
                                    onChange={(e) => set("deadline", e.target.value)}
                                    className="pl-10 [&::-webkit-calendar-picker-indicator]:invert"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                            <label htmlFor="minSalary" className={cn(label, "mb-2")}>
                                Min Salary / Rate
                            </label>
                            <div className={iconField}>
                                <Banknote className={iconClasses} aria-hidden="true" />
                                <Input
                                    id="minSalary"
                                    type="number"
                                    min="0"
                                    value={form.minSalary}
                                    onChange={(e) => set("minSalary", e.target.value)}
                                    placeholder="25"
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="maxSalary" className={cn(label, "mb-2")}>
                                Max Salary / Rate
                            </label>
                            <div className={iconField}>
                                <Banknote className={iconClasses} aria-hidden="true" />
                                <Input
                                    id="maxSalary"
                                    type="number"
                                    min="0"
                                    value={form.maxSalary}
                                    onChange={(e) => set("maxSalary", e.target.value)}
                                    placeholder="40"
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="frequency" className={cn(label, "mb-2")}>
                                Frequency
                            </label>
                            <div className={iconField}>
                                <ChevronDown
                                    className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-white/60"
                                    aria-hidden="true"
                                />
                                <select
                                    id="frequency"
                                    value={form.frequency}
                                    onChange={(e) => set("frequency", e.target.value)}
                                    className="h-12 w-full appearance-none rounded-xl border border-white/20 bg-[#101010] px-4 pr-10 text-base text-white outline-none transition-all focus-visible:border-[#5c53fe] focus-visible:ring-3 focus-visible:ring-[#5c53fe]/30"
                                >
                                    {FREQUENCIES.map((f) => (
                                        <option key={f} value={f}>
                                            {f}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Remote Work Allowed toggle */}
                    <label className="flex cursor-pointer items-center gap-3">
                        <input
                            type="checkbox"
                            checked={form.isRemote}
                            onChange={(e) => set("isRemote", e.target.checked)}
                            className="peer sr-only"
                        />
                        <span
                            aria-hidden="true"
                            className="relative h-6 w-11 shrink-0 rounded-full bg-[#1b1b1e] transition-colors after:absolute after:left-1 after:top-1 after:size-4 after:rounded-full after:bg-white after:transition-transform peer-checked:bg-[#5c53fe] peer-checked:after:translate-x-5"
                        />
                        <span>
                            <span className="block text-sm font-medium text-white">Remote Work Allowed</span>
                            <span className="block text-sm text-[#a1a4aa]">
                                Enable worldwide or distributed candidate applications
                            </span>
                        </span>
                    </label>
                </div>
            </section>

            {/* 3. Responsibilities & Requirements */}
            <section className={card}>
                <h2 className={cn(sectionHeading, "mb-5")}>
                    <span className="size-2 rounded-full bg-[#5c53fe]" aria-hidden="true" />
                    3. Responsibilities &amp; Requirements
                </h2>

                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="responsibilities" className={cn(label, "mb-2")}>
                            Key Responsibilities <span aria-hidden="true">*</span>
                        </label>
                        <Textarea
                            id="responsibilities"
                            value={form.responsibilities}
                            onChange={(e) => set("responsibilities", e.target.value)}
                            placeholder="Describe the day-to-day work of this role…"
                            rows={4}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="qualifications" className={cn(label, "mb-2")}>
                            Qualifications &amp; Requirements <span aria-hidden="true">*</span>
                        </label>
                        <Textarea
                            id="qualifications"
                            value={form.qualifications}
                            onChange={(e) => set("qualifications", e.target.value)}
                            placeholder="List the skills, experience, and education needed for this role…"
                            rows={4}
                            required
                        />
                    </div>
                </div>
            </section>

            {submitted && (
                <p className="rounded-lg border border-[#5c53fe]/30 bg-[#5c53fe]/10 px-4 py-3 text-sm text-[#8a83ff]">
                    Job post data captured — see the browser console for the full object.
                </p>
            )}

            <div className="flex gap-3">
                <Button
                    type="submit"
                    className="h-11 rounded-xl bg-[#5c53fe] px-6 text-base font-medium text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#4b43e0]"
                >
                    Post Job
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setForm(initialForm)}
                    className="h-11 rounded-xl border-white/20 bg-[#1b1b1e] px-6 text-base text-white hover:bg-[#232327]"
                >
                    Reset
                </Button>
            </div>
        </form>
    );
}

export default AddNewJobs;
