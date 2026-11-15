import Link from "next/link";
import {
    Braces,
    BrainCircuit,
    ChevronLeft,
    ChevronRight,
    Database,
    Download,
    PenLine,
    ServerCog,
} from "lucide-react";

import { appliedJobs } from "@/lib/core/jobs";
import { getJobs } from "@/lib/api/jobs";
import { cn } from "cn";
import { PageHeader } from "@/components/shared/PageHeader";
import { ApplicationStatusBadge } from "@/components/shared/ApplicationStatusBadge";
import {
    formatRelativeTime,
    objectIdToDate,
} from "@/lib/utils/job-format";
import type { Application, ApplicationStatus, JobPost } from "@/types";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Shared class strings (same pattern as the manage-jobs table).
const cellSmall = "text-sm text-[#a0a0ab]";
const hideSm = "hidden sm:table-cell";
const hideMd = "hidden md:table-cell";
const tableHead = "h-12 px-4 text-xs font-medium tracking-wider text-[#a0a0ab] uppercase";
const statCard = "rounded-xl border border-white/8 bg-[#141418] p-5";
const pageButton =
    "flex size-9 items-center justify-center rounded-lg border border-white/10 bg-[#141418] text-sm text-[#d4d4d8] transition-colors hover:text-white";
const pageButtonActive =
    "flex size-9 items-center justify-center rounded-lg bg-white text-sm font-semibold text-[#0a0a0c]";

// Decorative row icons cycled per application (Figma shows a varied icon set).
const rowIcons = [
    { icon: Braces, className: "text-[#818cf8]" },
    { icon: PenLine, className: "text-[#a1a4aa]" },
    { icon: Database, className: "text-[#a1a4aa]" },
    { icon: ServerCog, className: "text-red-400" },
    { icon: BrainCircuit, className: "text-teal-400" },
];

/** "Remote" / "Hybrid" / "On-site" from the job posting data. */
const workMode = (job?: JobPost) =>
    job?.isRemote
        ? "Remote"
        : job?.location?.includes("Hybrid")
            ? "Hybrid"
            : "On-site";

const ApplicationsPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const [applications, jobs] = await Promise.all([appliedJobs(session?.user.id ?? ""), getJobs()]);

    // The applications API only stores title/company — enrich with the posting
    // data (job type, remote flag) for the "Full-time • Remote" subtitle.
    const jobById = new Map(jobs.map((job) => [job._id, job]));

    // Stats are computed from real data; statuses beyond "Applied" appear once
    // the API tracks application state.
    const statusOf = (app: Application) => app.status ?? "Applied";
    const countByStatus = (status: ApplicationStatus) =>
        applications.filter((app: Application) => statusOf(app) === status).length;
    const shortlisted = countByStatus("Shortlisted");
    const interviews = countByStatus("Review");
    const successRate = applications.length
        ? Math.round((countByStatus("Offered") / applications.length) * 100)
        : 0;

    const stats = [
        { label: "Total Applied", value: String(applications.length), className: "text-white" },
        { label: "Shortlisted", value: String(shortlisted), className: "text-white" },
        { label: "Interviews", value: String(interviews), className: "text-amber-500" },
        { label: "Success Rate", value: `${successRate}%`, className: "text-emerald-500" },
    ];

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Heading + view toggle / export actions (Figma: "My Applications") */}
            <PageHeader
                title="My Applications"
                description="Track your job applications and interview progress in real-time."
                action={
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Static — design only, archived view comes with status data. */}
                        <div className="flex h-10 items-center rounded-lg border border-white/10 bg-[#141418] p-1">
                            <button
                                type="button"
                                aria-current="true"
                                className="h-8 cursor-pointer rounded-md bg-[#232329] px-4 text-sm font-medium text-white"
                            >
                                Active
                            </button>
                            <button
                                type="button"
                                className="h-8 cursor-pointer rounded-md px-4 text-sm text-[#a1a4aa] transition-colors hover:text-white"
                            >
                                Archived
                            </button>
                        </div>
                        {/* Display-only for now — no PDF export yet. */}
                        <button
                            type="button"
                            className="flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-white px-4 text-sm font-medium text-[#0a0a0c] transition-colors hover:bg-white/90"
                        >
                            <Download className="size-4" aria-hidden="true" />
                            Export PDF
                        </button>
                    </div>
                }
            />

            {/* Summary cards */}
            <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                {stats.map(({ label, value, className }) => (
                    <div key={label} className={statCard}>
                        <p className={cellSmall}>{label}</p>
                        <p className={`mt-1 text-3xl font-bold [font-family:var(--font-manrope)] ${className}`}>
                            {value}
                        </p>
                    </div>
                ))}
            </section>

            {/* Applications table */}
            <section className="rounded-lg border border-white/8 bg-[#141418]">
                {applications.length === 0 ? (
                    <p className="p-10 text-center text-sm text-[#a1a4aa]">
                        No applications yet. Jobs you apply for will show up here.
                    </p>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-[900px] border-collapse text-left">
                            <thead className="bg-white/2">
                                <tr>
                                    <th className={tableHead}>Job Title</th>
                                    <th className={cn(tableHead, hideMd)}>Company</th>
                                    <th className={cn(tableHead, hideSm)}>Applied</th>
                                    <th className={tableHead}>Status</th>
                                    <th className={cn(tableHead, "text-right")}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app: Application, index: number) => {
                                    const job = jobById.get(app.jobId);
                                    const status = statusOf(app);
                                    const { icon: Icon, className: iconColor } =
                                        rowIcons[index % rowIcons.length];
                                    // Not stored by the API — derived from the
                                    // application document's ObjectId timestamp.
                                    const appliedAt = objectIdToDate(app._id);
                                    const appliedLabel =
                                        Number.isNaN(appliedAt.getTime()) || appliedAt > new Date()
                                            ? "—"
                                            : formatRelativeTime(appliedAt);

                                    return (
                                        <tr
                                            key={app._id}
                                            className="border-t border-white/8 transition-colors hover:bg-white/2"
                                        >
                                            {/* Job Title */}
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#232327]">
                                                        <Icon className={`size-5 ${iconColor}`} aria-hidden="true" />
                                                    </span>
                                                    <span className="min-w-0">
                                                        <span className="block truncate text-sm font-medium text-white">
                                                            {app.jobTitle}
                                                        </span>
                                                        {job && (
                                                            <span className={cn("block truncate text-xs", cellSmall)}>
                                                                {job.jobType} • {workMode(job)}
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Company */}
                                            <td className={cn("px-4 py-4 text-sm text-white", hideMd)}>
                                                {app.jobCompany}
                                            </td>

                                            {/* Applied */}
                                            <td className={cn("px-4 py-4", cellSmall, hideSm)}>
                                                {appliedLabel}
                                            </td>

                                            {/* Status */}
                                            <td className="px-4 py-4">
                                                <ApplicationStatusBadge status={status} />
                                            </td>

                                            {/* Action */}
                                            <td className="px-4 py-4 text-right">
                                                <Link
                                                    href={`/browse-jobs/${app.jobId}`}
                                                    className="text-sm text-[#a0a0ab] transition-colors hover:text-white"
                                                >
                                                    Details
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Table footer: result count + pagination (static — design only) */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/8 px-4 py-4">
                    <p className={cellSmall}>
                        Showing 1–{applications.length} of {applications.length} applications
                    </p>
                    <nav aria-label="Pagination" className="flex items-center gap-1.5">
                        <button type="button" aria-label="Previous page" className={pageButton}>
                            <ChevronLeft className="size-4" aria-hidden="true" />
                        </button>
                        {[1, 2, 3].map((page) => (
                            <button
                                key={page}
                                type="button"
                                aria-current={page === 1 ? "page" : undefined}
                                className={page === 1 ? pageButtonActive : pageButton}
                            >
                                {page}
                            </button>
                        ))}
                        <button type="button" aria-label="Next page" className={pageButton}>
                            <ChevronRight className="size-4" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </section>
        </div>
    );
};

export default ApplicationsPage;
