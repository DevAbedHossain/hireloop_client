import { Inbox, Mail } from "lucide-react";
import { notFound } from "next/navigation";
import { cn } from "cn";
import { ApplicationStatusBadge } from "@/components/shared/ApplicationStatusBadge";
import { ApplicationStatusSelect } from "@/components/shared/ApplicationStatusSelect";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
    formatRelativeTime,
    objectIdToDate,
    resolveJobStatus,
} from "@/lib/utils/job-format";
import type { Application, ApplicationStatus, JobPost } from "@/types";
import { getJobApplications } from "@/lib/core/jobs";
import { jobDetails } from "@/lib/api/jobs";

// Shared class strings (same pattern as the manage-jobs / my-applications tables).
const cellSmall = "text-sm text-[#a0a0ab]";
const hideMd = "hidden md:table-cell";
const tableHead = "h-12 px-4 text-xs font-medium tracking-wider text-[#a0a0ab] uppercase";
const statCard = "rounded-xl border border-white/8 bg-[#141418] p-5";

/** Applicant display name — documents always carry the email, names come from
 *  the API's user lookup and may be missing (e.g. deleted account). */
const applicantLabel = (app: Application) =>
    app.applicantName ?? app.userEmail?.split("@")[0] ?? "Unknown seeker";

const JobApplicationsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const [job, applications] = await Promise.all([
        jobDetails(id) as Promise<JobPost>,
        getJobApplications(id),
    ]);

    // Invalid ids come back as a generic object without `_id` — render the 404.
    if (!job?._id) notFound();

    // Status isn't stored by the API yet — the UI defaults to "Applied" until
    // the recruiter status-update flow lands.
    const statusOf = (app: Application): ApplicationStatus => app.status ?? "Applied";
    const countByStatus = (status: ApplicationStatus) =>
        applications.filter((app) => statusOf(app) === status).length;

    const stats = [
        { label: "Total Applications", value: String(applications.length), className: "text-white" },
        { label: "New", value: String(countByStatus("Applied")), className: "text-white" },
        { label: "In Review", value: String(countByStatus("Review")), className: "text-amber-500" },
        { label: "Shortlisted", value: String(countByStatus("Shortlisted")), className: "text-blue-300" },
    ];

    return (
        <div className="flex flex-col gap-6 p-6">
            <PageHeader
                breadcrumb={[
                    { label: "Job Listings & Postings", href: "/dashboard/recruiter/jobs" },
                    { label: "Applications" },
                ]}
                title={
                    <>
                        {job.title}
                        {/* Posting lifecycle (Active / Expired) beside the heading */}
                        <StatusBadge status={resolveJobStatus(job)} />
                    </>
                }
                description={`${job.companyName} • ${applications.length} application${applications.length === 1 ? "" : "s"} received — review applicants and track their progress`}
            />

            {/* Summary cards */}
            <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                {stats.map(({ label, value, className }) => (
                    <div key={label} className={statCard}>
                        <p className={cellSmall}>{label}</p>
                        <p className={cn("mt-1 text-3xl font-bold [font-family:var(--font-manrope)]", className)}>
                            {value}
                        </p>
                    </div>
                ))}
            </section>

            {/* Applications table */}
            <section className="rounded-lg border border-white/8 bg-[#141418]">
                {applications.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 p-10 text-center">
                        <Inbox className="size-8 text-[#a0a0ab]" aria-hidden="true" />
                        <p className="text-sm text-[#a0a0ab]">
                            No applications yet for this job. Seekers who apply will show up here.
                        </p>
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-[640px] border-collapse text-left">
                            <thead className="bg-white/2">
                                <tr>
                                    <th className={tableHead}>Applicant</th>
                                    <th className={cn(tableHead, hideMd)}>Applied</th>
                                    <th className="h-12 px-4 text-xs font-medium uppercase tracking-wider text-[#a0a0ab]">
                                        Current Status
                                    </th>
                                    <th className="h-12 px-4 text-right text-xs font-medium uppercase tracking-wider text-[#a0a0ab]">
                                        Application Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => {
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
                                            {/* Applicant */}
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        aria-hidden="true"
                                                        className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#232327] text-sm font-semibold text-white/80"
                                                    >
                                                        {applicantLabel(app).charAt(0).toUpperCase()}
                                                    </span>
                                                    <span className="min-w-0">
                                                        <span className="block truncate text-sm font-medium text-white">
                                                            {applicantLabel(app)}
                                                        </span>
                                                        <span className={cn("flex items-center gap-1.5", cellSmall)}>
                                                            <Mail className="size-3.5 shrink-0" aria-hidden="true" />
                                                            <span className="truncate">{app.userEmail}</span>
                                                        </span>
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Applied */}
                                            <td className={cn("px-4 py-4", cellSmall, hideMd)}>
                                                {appliedLabel}
                                            </td>

                                            {/* Current status (as stored in the DB) */}
                                            <td className="px-4 py-4">
                                                <ApplicationStatusBadge status={statusOf(app)} />
                                            </td>

                                            {/* Application status (recruiter-editable) */}
                                            <td className="px-4 py-4 text-right">
                                                <ApplicationStatusSelect applicationId={app._id} status={app.status} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Table footer: result count */}
                <div className="flex items-center justify-between gap-4 border-t border-white/8 px-4 py-4">
                    <p className={cellSmall}>
                        Showing 1–{applications.length} of {applications.length} applications
                    </p>
                </div>
            </section>
        </div>
    );
};

export default JobApplicationsPage;
