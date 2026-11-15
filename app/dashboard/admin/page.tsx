import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, FileText, Users } from "lucide-react";

import { getApplications, getJobs } from "@/lib/api/jobs";
import { getUsers } from "@/lib/api/users";
import { cn } from "cn";
import { PageHeader } from "@/components/shared/PageHeader";
import { resolveJobStatus } from "@/lib/utils/job-format";

// Shared class strings (same pattern as the other dashboard pages).
const cellSmall = "text-sm text-[#a0a0ab]";
const statCard = "rounded-xl border border-white/8 bg-[#141418] p-5";

const AdminDashboardPage = async () => {
    const [users, jobs, applications] = await Promise.all([
        getUsers(),
        getJobs(),
        getApplications(),
    ]);

    const recruiters = users.filter((user) => user.role === "recruiter").length;
    const admins = users.filter((user) => user.role === "admin").length;
    const activeJobs = jobs.filter((job) => resolveJobStatus(job) === "Active").length;

    const stats = [
        {
            label: "Total Users",
            value: String(users.length),
            sub: `${recruiters} recruiters • ${admins} admins`,
            subClass: "text-[#a1a4aa]",
            icon: Users,
            href: "/dashboard/admin/users",
        },
        {
            label: "Job Postings",
            value: String(jobs.length),
            sub: `${activeJobs} active`,
            subClass: "text-emerald-500",
            icon: BriefcaseBusiness,
            href: "/dashboard/recruiter/jobs",
        },
        {
            label: "Applications",
            value: String(applications.length),
            sub: "across all postings",
            subClass: "text-[#8a83ff]",
            icon: FileText,
            href: "/dashboard/recruiter/jobs",
        },
    ];

    return (
        <div className="flex flex-col gap-6 p-6">
            <PageHeader
                breadcrumb={[
                    { label: "Administration" },
                    { label: "Dashboard" },
                ]}
                title="Admin Dashboard"
                description="Monitor platform activity, users, and job postings at a glance."
            />

            {/* Stat cards — each links to the matching management page */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {stats.map(({ label, value, sub, subClass, icon: Icon, href }) => (
                    <Link
                        key={label}
                        href={href}
                        className={cn(statCard, "group transition-colors hover:border-white/20")}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className={cellSmall}>{label}</p>
                                <p className="mt-1 text-3xl font-bold [font-family:var(--font-manrope)] text-white">
                                    {value}
                                </p>
                                <p className={cn("mt-1 text-xs", subClass)}>{sub}</p>
                            </div>
                            <span className="flex size-10 items-center justify-center rounded-lg bg-[#232327]">
                                <Icon className="size-5 text-[#8a83ff]" aria-hidden="true" />
                            </span>
                        </div>
                        <p className="mt-4 flex items-center gap-1 text-xs text-[#a1a4aa] transition-colors group-hover:text-white">
                            Manage
                            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </p>
                    </Link>
                ))}
            </section>
        </div>
    );
};

export default AdminDashboardPage;
