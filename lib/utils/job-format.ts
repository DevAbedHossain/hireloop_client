// Shared formatting helpers for job postings (used by the browse-jobs cards
// and the manage-jobs table).

import type { JobPost, JobStatus } from "@/types";

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

/** API documents may omit `status` — fall back to the deadline:
 *  not passed yet → Active, already passed → Expired. */
export const resolveJobStatus = (job: JobPost): JobStatus => {
    if (job.status && job.status in { Active: 1, Expired: 1 }) return job.status;
    return new Date(job.deadline) > new Date() ? "Active" : "Expired";
};

/** Mongo ObjectId -> creation date (the first 8 hex chars hold the unix seconds). */
export const objectIdToDate = (id: string) =>
    new Date(parseInt(id.slice(0, 8), 16) * 1000);

/** Date -> "2 hours ago" / "1 week ago" style relative label. */
export const formatRelativeTime = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
        ["week", 60 * 60 * 24 * 7],
        ["day", 60 * 60 * 24],
        ["hour", 60 * 60],
        ["minute", 60],
    ];
    for (const [unit, secondsInUnit] of units) {
        if (seconds >= secondsInUnit) {
            return new Intl.RelativeTimeFormat("en", { numeric: "always", style: "long" })
                .format(-Math.floor(seconds / secondsInUnit), unit);
        }
    }
    return "just now";
};
