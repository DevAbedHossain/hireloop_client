// Shared option lists + defaults for the job form.
// Used by the "new job" page and any other screen that posts/edits jobs.

import type { JobForm } from "@/types";

export const JOB_TYPES = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
] as const;

export const CATEGORIES = [
    "Engineering & Tech",
    "Design & Creative",
    "Product & Management",
    "Marketing & Sales",
    "Finance & Legal",
    "Other",
] as const;

export const FREQUENCIES = ["per hour", "per day", "per month", "per year"] as const;

/** Field values live in one flat object — read/write with `form.<field>` and `set("field", value)`. */
export const initialForm: JobForm = {
    title: "",
    companyName: "",
    recureterId: "", // set from the logged-in user on field change
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
