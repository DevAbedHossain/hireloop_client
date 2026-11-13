// Shared job-domain types used by pages, components, and the lib layer.
// Keep all domain types here so nothing imports types from page files.

/** Lifecycle state of a job posting shown in the manage-jobs table. */
export type JobStatus = "Active" | "Expired";

/** Keys of the "new job" form — used for typed state updates. */
export type JobFormField = keyof JobForm;

/** Shape collected by the "Post a new job" form. */
export type JobForm = {
    title: string;
    companyName: string;
    category: string;
    jobType: string;
    location: string;
    isRemote: boolean;
    deadline: string;
    minSalary: string;
    maxSalary: string;
    frequency: string;
    responsibilities: string;
    qualifications: string;
};

/** One job posting as returned by the API (`GET /jobs`).
 *  Same fields the job form collects plus table-only extras. */
export type JobPost = Omit<JobForm, "responsibilities" | "qualifications"> & {
    /** Responsibility bullets — the API returns these pre-split into lines. */
    responsibilities: string[];
    /** Requirement bullets — the API returns these pre-split into lines. */
    requirements?: string[];
    /** Mongo documents come back with `_id`. */
    _id?: string;
    status?: JobStatus;
    applicants?: number;
    postedAt?: string;
};

/** Application lifecycle states shown on the seeker applications page. */
export type ApplicationStatus = "Applied" | "Review" | "Shortlisted" | "Rejected" | "Offered";

/** One seeker application as returned by the API (`GET /applications`). */
export type Application = {
    _id: string;
    jobId: string;
    jobTitle: string;
    jobCompany: string;
    userId?: string;
    userEmail?: string;
    /** Not tracked by the API yet — the UI defaults to "Applied". */
    status?: ApplicationStatus;
};

/** Filter state for the browse jobs page (search + commonly filtered JobPost fields). */
export type JobFilters = {
    /** Free-text search across title, company, category and location. */
    q: string;
    /** Free-text location search ("" = any). */
    location: string;
    category: string;
    /** Job type label, e.g. "Full-time"" ("" = any). URLs accept slugs like "full-time". */
    jobType: string;
    /** undefined = any, true = remote only, false = on-site only. */
    isRemote?: boolean;
    /** Minimum salary/rate as a plain number string ("" = any). */
    minSalary: string;
};

export type AppliedJob = {
    userId: string;
    jobId: string | undefined;
    userEmail: string;
    jobTitle: string;
    jobCompany: string;
}
