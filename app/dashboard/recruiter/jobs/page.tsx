import Link from "next/link";
import { ChevronRight, Eye, MapPin, MoreHorizontal, PencilLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { getJobs } from "@/lib/api/jobs";

// One posting = the same shape the "new job" form collects (initialForm)
// plus table-only fields (status, applicants, postedAt).
type JobStatus = "Active" | "Expired";

type JobPost = {
    // Mongo documents come back with `_id`
    _id?: string;
    title: string;
    category: string;
    companyName: string;
    location: string;
    isRemote: boolean;
    jobType: string;
    minSalary: string;
    maxSalary: string;
    frequency: string;
    deadline: string;
    status?: JobStatus;
    applicants?: number;
    postedAt?: string;
};

// "per hour" -> "/ hr", "per year" -> "/ yr", "per month" -> "/ mo"
const frequencySuffix = (frequency: string) => {
    const suffixes: Record<string, string> = {
        "per hour": "/ hr",
        "per day": "/ day",
        "per month": "/ mo",
        "per year": "/ yr",
    };
    return suffixes[frequency] ?? `/${frequency.split(" ")[1] ?? ""}`;
};

const statusStyles: Record<JobStatus, { badge: string; dot: string }> = {
    Active: { badge: "bg-[#14532d] text-[#4ade80]", dot: "bg-[#4ade80]" },
    Expired: { badge: "bg-[#1f1f1f] text-[#a0a0ab]", dot: "bg-[#5a5a60]" },
};

const cellSmall = "text-sm text-[#a0a0ab]";
const hideSm = "sm:hidden";
const hideMd = "hidden md:table-cell";

// API documents may omit `status` — fall back to the deadline:
// not passed yet → Active, already passed → Expired.
const resolveStatus = (job: JobPost): JobStatus => {
    if (job.status && job.status in statusStyles) return job.status;
    return new Date(job.deadline) > new Date() ? "Active" : "Expired";
};

const ManageJobs = async () => {

    const jobs: JobPost[] = await getJobs();

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Breadcrumb (Figma: "Job Listings & Postings > Manage Jobs") */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-[#a1a4aa]">
                <span>Job Listings &amp; Postings</span>
                <ChevronRight className="size-4" aria-hidden="true" />
                <span className="text-white">Manage Jobs</span>
            </nav>

            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold [font-family:var(--font-manrope)] text-white">
                        Manage Jobs
                    </h1>
                    <p className="mt-1 text-sm text-[#a1a4aa]">
                        Review live listings, monitor applicants, and update job details
                    </p>
                </div>
                <Button
                    render={
                        <Link href="/dashboard/recruiter/jobs/new" />
                    }
                    nativeButton={false}
                    className="h-10 rounded-lg border border-transparent bg-[#5c53fe] px-4 text-sm font-medium text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.15)] hover:bg-[#4b43e0]"
                >
                    + New Job Post
                </Button>
            </div>

            {/* Postings table */}
            <section className="rounded-lg border border-white/8 bg-[#141418]">
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[900px] border-collapse text-left">
                        <thead>
                            <tr>
                                <th className="h-12 px-4 text-xs font-medium tracking-wider text-[#a0a0ab] uppercase">
                                    Job Title &amp; Dept
                                </th>
                                <th className={cn("h-12 px-4 text-xs font-medium tracking-wider text-[#a0a0ab] uppercase", hideMd)}>
                                    Company &amp; Location
                                </th>
                                <th className="h-12 px-4 text-xs font-medium tracking-wider text-[#a0a0ab] uppercase">
                                    Type
                                </th>
                                <th className={cn("h-12 px-4 text-xs font-medium tracking-wider text-[#a0a0ab] uppercase", hideMd)}>
                                    Compensation
                                </th>
                                <th className={cn("h-12 px-4 text-xs font-medium tracking-wider text-[#a0a0ab] uppercase", hideSm)}>
                                    Applicants
                                </th>
                                <th className="h-12 px-4 text-xs font-medium tracking-wider text-[#a0a0ab] uppercase">
                                    Status
                                </th>
                                <th className={cn("h-12 px-4 text-xs font-medium tracking-wider text-[#a0a0ab] uppercase", hideMd)}>
                                    Deadline
                                </th>
                                <th className="h-12 px-4 text-right text-xs font-medium tracking-wider text-[#a0a0ab] uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => {
                                const status = resolveStatus(job);
                                return (
                                    <tr key={job._id} className="border-t border-white/8 transition-colors hover:bg-white/2">
                                        {/* Job Title & Dept */}
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#232327]">
                                                    <PencilLine className="size-5 text-[#818cf8]" aria-hidden="true" />
                                                </span>
                                                <span className="min-w-0">
                                                    <span className="block truncate text-sm text-[#c7d2fe]">{job.category}</span>
                                                    <span className="block truncate text-base text-white">{job.title}</span>
                                                </span>
                                            </div>
                                        </td>

                                        {/* Company & Location */}
                                        <td className={cn("px-4 py-4", hideMd)}>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm text-white">{job.companyName}</span>
                                                <span className={cn("flex items-center gap-1", cellSmall)}>
                                                    {job.location}
                                                    <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                                                </span>
                                            </div>
                                        </td>

                                        {/* Type */}
                                        <td className="px-4 py-4">
                                            <span className="inline-flex h-8 items-center rounded-full bg-[#1f1f1f] px-3 text-sm text-[#d4d4d8]">
                                                {job.jobType}
                                            </span>
                                        </td>

                                        {/* Compensation */}
                                        <td className={cn("px-4 py-4 text-sm text-white", hideMd)}>
                                            €{job.minSalary} – €{job.maxSalary}{" "}
                                            {frequencySuffix(job.frequency)}
                                        </td>

                                        {/* Applicants */}
                                        <td className={cn("px-4 py-4", hideSm)}>
                                            <span className="flex items-center gap-2 text-sm text-[#d4d4d8]">
                                                {job.applicants ?? 0}
                                                <span className="text-[#a0a0ab]">Candidates</span>
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-4">
                                            <span
                                                className={cn(
                                                    "inline-flex h-7 items-center gap-2 rounded px-3 text-sm",
                                                    statusStyles[status].badge
                                                )}
                                            >
                                                <span className={cn("size-1.5 rounded-full", statusStyles[status].dot)} aria-hidden="true" />
                                                {status}
                                            </span>
                                        </td>

                                        {/* Deadline */}
                                        <td className={cn("px-4 py-4", hideMd)}>
                                            <div className="flex flex-col gap-1">
                                                {job.postedAt && <span className={cellSmall}>{job.postedAt}</span>}
                                                <span className={cellSmall}>
                                                    {new Date(job.deadline).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "2-digit",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Button
                                                    variant="ghost"
                                                    className="size-8 rounded-lg p-0 text-[#a1a4aa] hover:bg-[#1f1f1f] hover:text-white"
                                                    aria-label="View job post"
                                                >
                                                    <Eye />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    className="size-8 rounded-lg bg-[#1f1f1f] p-0 text-[#a0a0ab] hover:bg-[#232327] hover:text-white"
                                                    aria-label="More actions"
                                                >
                                                    <MoreHorizontal />
                                                </Button>
                                                <Button
                                                    className="h-8 rounded-lg border border-transparent bg-[#5c53fe]/20 px-3 text-sm font-medium text-[#c3c0ff] hover:bg-[#5c53fe]/30"
                                                    render={
                                                        <Link href="/dashboard/recruiter/jobs/new" />
                                                    }
                                                    nativeButton={false}
                                                >
                                                    Update
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default ManageJobs;
