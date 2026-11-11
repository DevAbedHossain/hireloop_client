// Helpers for the browse jobs page: parsing URL params into filters,
// building the API query string, and pure in-memory filtering.

import { JOB_TYPES } from "@/lib/constants/job";
import type { JobFilters, JobPost } from "@/types";

/** The empty filter state — handy for a future "clear all filters" handler. */
export const defaultJobFilters: JobFilters = {
    q: "",
    location: "",
    category: "",
    jobType: "",
    isRemote: undefined,
    minSalary: "",
};

export type SearchParams = Record<string, string | string[] | undefined>;

/** E.g. "Full-time" -> "full-time" (used when writing filter values to the URL). */
export const slugifyJobType = (jobType: string) =>
    jobType.trim().toLowerCase().replace(/\s+/g, "-");

const normalizeJobType = (value: string) => value.trim().toLowerCase().replace(/\s+/g, "-");

/** Accepts both labels ("Full-time") and slugs ("full-time") from the URL. */
const jobTypeFromParam = (param: string) =>
    JOB_TYPES.find((type) => normalizeJobType(type) === normalizeJobType(param)) ?? "";

/** `?q=react&jobType=full-time&isRemote=true` -> JobFilters. */
export const parseJobFilters = (params: SearchParams): JobFilters => {
    const getString = (key: string) => {
        const value = params[key];
        return (Array.isArray(value) ? value[0] : value) ?? "";
    };

    const isRemoteParam = getString("isRemote");
    return {
        q: getString("q"),
        location: getString("location"),
        category: getString("category"),
        jobType: jobTypeFromParam(getString("jobType")),
        isRemote: isRemoteParam ? isRemoteParam !== "false" : undefined,
        minSalary: getString("minSalary"),
    };
};

/** JobFilters -> query string for `getJobs` (skips empty values, slugifies jobType). */
export const buildJobQuery = (filters: JobFilters) => {
    const query = new URLSearchParams();
    if (filters.q) query.set("q", filters.q);
    if (filters.location) query.set("location", filters.location);
    if (filters.category) query.set("category", filters.category);
    if (filters.jobType) query.set("jobType", slugifyJobType(filters.jobType));
    if (typeof filters.isRemote === "boolean") query.set("isRemote", String(filters.isRemote));
    if (filters.minSalary) query.set("minSalary", filters.minSalary);
    return query.toString();
};

/** Pure fallback filter — the API receives the same filters via `buildJobQuery`;
 *  this keeps results correct even if the backend ignores a field yet. */
export const applyJobFilters = (jobs: JobPost[], filters: JobFilters): JobPost[] => {
    const q = filters.q.trim().toLowerCase();
    const location = filters.location.trim().toLowerCase();

    return jobs.filter((job) => {
        if (q) {
            const haystack = `${job.title} ${job.companyName} ${job.category} ${job.location}`.toLowerCase();
            if (!haystack.includes(q)) return false;
        }
        if (location && !job.location.toLowerCase().includes(location)) return false;
        if (filters.category && job.category !== filters.category) return false;
        if (filters.jobType && normalizeJobType(job.jobType) !== normalizeJobType(filters.jobType)) return false;
        if (typeof filters.isRemote === "boolean" && job.isRemote !== filters.isRemote) return false;
        if (filters.minSalary && Number(job.minSalary) < Number(filters.minSalary)) return false;
        return true;
    });
};
