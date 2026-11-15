import Link from "next/link";
import { Eye, MapPin, PencilLine, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { getApplications, getJobs } from "@/lib/api/jobs";
import { JobDeleteDialog } from "@/components/dashboard/JobDeleteDialog";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatCompensation, formatDeadline, resolveJobStatus } from "@/lib/utils/job-format";
import type { Application } from "@/types";
import { getServer } from "@/lib/core/Server";

const cellSmall = "text-sm text-[#a0a0ab]";
const hideSm = "hidden sm:table-cell";
const hideMd = "hidden md:table-cell";
const tableHead = "h-12 px-4 text-xs font-medium tracking-wider text-[#a0a0ab] uppercase";

const ManageJobs = async () => {

    const user = await getServer();

    const [jobs, applications] = await Promise.all([
        getJobs(`recureterId=${user?.id}`),
        getApplications(),
    ]);

    // The job documents only carry a static `applicants` seed number — count
    // the real applications per job for the table (one fetch, grouped here).
    const applicationCountByJob = new Map<string, number>();
    for (const app of applications as Application[]) {
        applicationCountByJob.set(app.jobId, (applicationCountByJob.get(app.jobId) ?? 0) + 1);
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Breadcrumb + heading (Figma: "Job Listings & Postings > Manage Jobs") */}
            <PageHeader
                breadcrumb={[
                    { label: "Job Listings & Postings" },
                    { label: "Manage Jobs" },
                ]}
                title="Manage Jobs"
                description="Review live listings, monitor applicants, and update job details"
                action={
                    <Button
                        variant="brand"
                        render={
                            <Link href="/dashboard/recruiter/jobs/new" />
                        }
                        nativeButton={false}
                        className="h-10 rounded-lg px-4 text-sm font-medium"
                    >
                        + New Job Post
                    </Button>
                }
            />

            {/* Postings table */}
            <section className="rounded-lg border border-white/8 bg-[#141418]">
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[900px] border-collapse text-left">
                        <thead>
                            <tr>
                                <th className={tableHead}>
                                    Job Title &amp; Dept
                                </th>
                                <th className={cn(tableHead, hideMd)}>
                                    Company &amp; Location
                                </th>
                                <th className={tableHead}>
                                    Type
                                </th>
                                <th className={cn(tableHead, hideMd)}>
                                    Compensation
                                </th>
                                <th className={cn(tableHead, hideSm)}>
                                    Applicants
                                </th>
                                <th className={tableHead}>
                                    Status
                                </th>
                                <th className={cn(tableHead, hideMd)}>
                                    Deadline
                                </th>
                                <th className={cn(tableHead, "text-right")}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => {
                                const status = resolveJobStatus(job);
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
                                            {formatCompensation(job)}
                                        </td>

                                        {/* Applicants (real application count) */}
                                        <td className={cn("px-4 py-4", hideSm)}>
                                            <Link
                                                href={`/dashboard/recruiter/jobs/${job._id}/applications`}
                                                className="flex items-center gap-2 text-sm text-[#d4d4d8] transition-colors hover:text-white"
                                            >
                                                {applicationCountByJob.get(job._id ?? "") ?? 0}
                                                <span className="text-[#a0a0ab]">Candidates</span>
                                            </Link>
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-4">
                                            <StatusBadge status={status} />
                                        </td>

                                        {/* Deadline */}
                                        <td className={cn("px-4 py-4", hideMd)}>
                                            <div className="flex flex-col gap-1">
                                                {job.postedAt && <span className={cellSmall}>{job.postedAt}</span>}
                                                <span className={cellSmall}>
                                                    {formatDeadline(job.deadline)}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Button
                                                    className="h-8 rounded-lg border border-transparent bg-[#5c53fe]/20 px-3 text-sm font-medium text-[#c3c0ff] hover:bg-[#5c53fe]/30 "
                                                    render={
                                                        <Link href="/dashboard/recruiter/jobs/new" />
                                                    }
                                                    nativeButton={false}
                                                >
                                                    <PencilLine />
                                                </Button>

                                                <Button
                                                    className="h-8 rounded-lg border border-transparent bg-[#5c53fe]/20 px-3 text-sm font-medium text-[#c3c0ff] hover:bg-[#5c53fe]/30"
                                                    aria-label={`View applications for ${job.title}`}
                                                    title="View applications"
                                                    render={
                                                        <Link href={`/dashboard/recruiter/jobs/${job._id}/applications`} />
                                                    }
                                                    nativeButton={false}
                                                >
                                                    <Users />
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    className="size-8 rounded-lg p-0 text-[#a0a0ab] hover:bg-[#1f1f1f] hover:text-white"
                                                    render={
                                                        <Link href={`/job/${job._id}`} />
                                                    }
                                                    nativeButton={false}
                                                >
                                                    <Eye />
                                                </Button>

                                                <JobDeleteDialog job={job} />

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
