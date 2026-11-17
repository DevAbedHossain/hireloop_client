"use client";

import { useState } from "react";
import { Banknote, Building2, Calendar, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, IconField } from "@/components/shared/FormField";
import { SelectField } from "@/components/shared/SelectField";
import {
    SegmentedRadioGroup,
} from "@/components/shared/SegmentedRadioGroup";
import { ToggleSwitch } from "@/components/shared/ToggleSwitch";
import { FormBanner } from "@/components/shared/FormBanner";
import { createPost } from "@/lib/actions/createPost";
import { CATEGORIES, FREQUENCIES, JOB_TYPES, initialForm } from "@/lib/constants/job";
import type { JobForm } from "@/types";
import { cn } from "cn";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "@/components/ui/toast";

// Back-compat re-exports — canonical definitions live in @/types and @/lib/constants/job.
export type { JobForm, JobStatus } from "@/types";
export { initialForm } from "@/lib/constants/job";

const card = "rounded-lg border border-white/8 bg-[#141418] p-6";
const sectionHeading = "flex items-center gap-2 text-lg font-semibold text-white";

function AddNewJobs() {
    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);
    const { data: session } = useSession();

    const set = <K extends keyof JobForm>(field: K, value: JobForm[K]) => {
        setForm((prev) => ({ ...prev, recureterId: session?.user.id ?? "", [field]: value }));
        setSubmitted(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        const result = await createPost(form);

        if (result.insertedId) {
            toast.add({
                title: "success",
                description: "Successfully added new job."
            })
            redirect("/dashboard/recruiter/jobs");

        }
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
                    <FormField id="title" label="Job Title" required>
                        <Input
                            id="title"
                            type="text"
                            value={form.title}
                            onChange={(e) => set("title", e.target.value)}
                            placeholder="Frontend Developer"
                            required
                        />
                    </FormField>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField id="companyName" label="Company Name" required>
                            <IconField icon={Building2}>
                                <Input
                                    id="companyName"
                                    type="text"
                                    value={form.companyName}
                                    onChange={(e) => set("companyName", e.target.value)}
                                    placeholder="HirePulse Network"
                                    required
                                    className="pl-10"
                                />
                            </IconField>
                        </FormField>

                        <SelectField
                            id="category"
                            label="Job Category"
                            required
                            value={form.category}
                            onChange={(value) => set("category", value)}
                            options={CATEGORIES}
                            placeholder="Select a category"
                        />
                    </div>

                    {/* Job Type pill buttons (Figma: 4 segmented buttons) */}
                    <SegmentedRadioGroup
                        label="Job Type"
                        required
                        value={form.jobType}
                        onValueChange={(value) => set("jobType", value)}
                        options={JOB_TYPES.map((type) => ({ value: type, label: type }))}
                        className="sm:grid-cols-4"
                    />
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
                        <FormField id="location" label="Job Location" required badge="Required">
                            <IconField icon={MapPin}>
                                <Input
                                    id="location"
                                    type="text"
                                    value={form.location}
                                    onChange={(e) => set("location", e.target.value)}
                                    placeholder="New York, USA"
                                    required
                                    className="pl-10"
                                />
                            </IconField>
                        </FormField>

                        <FormField id="deadline" label="Application Deadline">
                            <IconField icon={Calendar}>
                                <Input
                                    id="deadline"
                                    type="date"
                                    value={form.deadline}
                                    onChange={(e) => set("deadline", e.target.value)}
                                    className="pl-10 [&::-webkit-calendar-picker-indicator]:invert"
                                />
                            </IconField>
                        </FormField>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <FormField id="minSalary" label="Min Salary / Rate">
                            <IconField icon={Banknote}>
                                <Input
                                    id="minSalary"
                                    type="number"
                                    min="0"
                                    value={form.minSalary}
                                    onChange={(e) => set("minSalary", e.target.value)}
                                    placeholder="25"
                                    className="pl-10"
                                />
                            </IconField>
                        </FormField>
                        <FormField id="maxSalary" label="Max Salary / Rate">
                            <IconField icon={Banknote}>
                                <Input
                                    id="maxSalary"
                                    type="number"
                                    min="0"
                                    value={form.maxSalary}
                                    onChange={(e) => set("maxSalary", e.target.value)}
                                    placeholder="40"
                                    className="pl-10"
                                />
                            </IconField>
                        </FormField>

                        <SelectField
                            id="frequency"
                            label="Frequency"
                            value={form.frequency}
                            onChange={(value) => set("frequency", value)}
                            options={FREQUENCIES}
                        />
                    </div>

                    {/* Remote Work Allowed toggle */}
                    <ToggleSwitch
                        checked={form.isRemote}
                        onCheckedChange={(checked) => set("isRemote", checked)}
                        label="Remote Work Allowed"
                        description="Enable worldwide or distributed candidate applications"
                    />
                </div>
            </section>

            {/* 3. Responsibilities & Requirements */}
            <section className={card}>
                <h2 className={cn(sectionHeading, "mb-5")}>
                    <span className="size-2 rounded-full bg-[#5c53fe]" aria-hidden="true" />
                    3. Responsibilities &amp; Requirements
                </h2>

                <div className="flex flex-col gap-4">
                    <FormField id="responsibilities" label="Key Responsibilities" required>
                        <Textarea
                            id="responsibilities"
                            value={form.responsibilities}
                            onChange={(e) => set("responsibilities", e.target.value)}
                            placeholder="Describe the day-to-day work of this role…"
                            rows={4}
                            required
                        />
                    </FormField>
                    <FormField id="qualifications" label="Qualifications &amp; Requirements" required>
                        <Textarea
                            id="qualifications"
                            value={form.qualifications}
                            onChange={(e) => set("qualifications", e.target.value)}
                            placeholder="List the skills, experience, and education needed for this role…"
                            rows={4}
                            required
                        />
                    </FormField>
                </div>
            </section>

            {submitted && (
                <FormBanner>
                    Job post data captured — see the browser console for the full object.
                </FormBanner>
            )}

            <div className="flex gap-3">
                <Button type="submit" variant="default" className="h-11 rounded-xl px-6 text-base font-medium">
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
