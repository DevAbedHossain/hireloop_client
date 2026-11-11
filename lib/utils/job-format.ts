// Shared formatting helpers for job postings (used by the browse-jobs cards
// and the manage-jobs table).

import type { JobPost } from "@/types";

// "per hour" -> "/ hr", "per year" -> "/ yr", "per month" -> "/ mo"
export const frequencySuffix = (frequency: string) => {
    const suffixes: Record<string, string> = {
        "per hour": "/ hr",
        "per day": "/ day",
        "per month": "/ mo",
        "per year": "/ yr",
    };
    return suffixes[frequency] ?? `/${frequency.split(" ")[1] ?? ""}`;
};

/** `minSalary 25, maxSalary 40, frequency "per hour"` -> "€25 – €40 / hr" */
export const formatCompensation = (
    job: Pick<JobPost, "minSalary" | "maxSalary" | "frequency">
) => `€${job.minSalary} – €${job.maxSalary} ${frequencySuffix(job.frequency)}`;

/** Deadline formatted as "Nov 05, 2026". */
export const formatDeadline = (deadline: string) =>
    new Date(deadline).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
