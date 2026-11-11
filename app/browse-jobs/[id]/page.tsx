import {
    BadgeCheck,
    Banknote,
    BarChart3,
    Bookmark,
    Building2,
    CircleDollarSign,
    Clock3,
    HeartPulse,
    Laptop,
    MapPin,
    Palmtree,
} from 'lucide-react';
import { notFound } from 'next/navigation';

import { jobDetails } from '@/lib/api/jobs';
import { formatCompensation, formatDeadline } from '@/lib/utils/job-format';
import { JobPost } from '@/types';

// Shared class strings (same pattern as the browse-jobs cards).
const card = 'rounded-2xl border border-white/8 bg-[#101013]';
const tile = 'rounded-xl border border-white/8 bg-[#101013] p-5';
const tileLabel = 'text-[11px] font-medium uppercase tracking-wider text-[#a1a4aa]';
const sectionTitle = 'text-lg font-semibold [font-family:var(--font-manrope)] text-white';
const bulletList =
    'list-disc space-y-3 pl-5 text-sm leading-relaxed text-[#a1a4aa] marker:text-white/40';

// Design-only content the API does not provide yet (kept static, like the
// browse-jobs pagination, until benefits/company data exists).
const benefits = [
    { icon: HeartPulse, label: 'Full Health & Dental' },
    { icon: CircleDollarSign, label: 'Competitive 401k' },
    { icon: Laptop, label: 'Latest Hardware Stipend' },
    { icon: Palmtree, label: 'Unlimited PTO' },
];

const JobDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const job: JobPost = await jobDetails(id);

    // Invalid ids come back as a generic object without `_id` — render the 404.
    if (!job?._id) notFound();

    // "2+ years of experience..." -> "2+ Years" (falls back when not stated).
    const experience = job.requirements?.join(' ').match(/(\d+)\+?\s*years?/i)?.[1];

    const infoTiles = [
        { icon: Banknote, label: 'Salary Range', value: formatCompensation(job) },
        { icon: MapPin, label: 'Location', value: job.location },
        { icon: Clock3, label: 'Job Type', value: job.jobType },
        {
            icon: BarChart3,
            label: 'Experience',
            value: experience ? `${experience}+ Years` : 'Not specified',
        },
    ];

    return (
        <div className="px-4 pb-16 pt-6 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
                <div className="flex flex-col gap-6">
                    {/* Header banner (Figma: logo, title/company, save & apply actions) */}
                    <section className={`${card} flex flex-wrap items-center justify-between gap-4 p-6`}>
                        <div className="flex items-center gap-4">
                            {/* Company logo — initial avatar fallback until logos exist */}
                            <span
                                aria-hidden="true"
                                className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#1a1a1f] text-lg font-semibold text-white/80"
                            >
                                {job.companyName?.charAt(0).toUpperCase()}
                            </span>
                            <div className="min-w-0">
                                <h1 className="truncate text-2xl font-semibold [font-family:var(--font-manrope)] text-white sm:text-[28px]">
                                    {job.title}
                                </h1>
                                <p className="mt-1 flex items-center text-sm text-[#a1a4aa]">
                                    {job.companyName}
                                    <span aria-hidden="true" className="mx-1.5 text-white/30">•</span>
                                    <BadgeCheck className="mr-1 size-4 text-emerald-500" aria-hidden="true" />
                                    <span className="text-emerald-500">Verified Employer</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                aria-label={`Save ${job.title}`}
                                className="flex size-10 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-[#1a1a1f] text-[#a1a4aa] transition-colors hover:text-white"
                            >
                                <Bookmark className="size-5" aria-hidden="true" />
                            </button>
                            {/* Apply Now is display-only for now — no functionality yet. */}
                            <button
                                type="button"
                                className="h-10 cursor-pointer rounded-lg bg-white px-5 text-sm font-semibold text-[#0a0a0c] transition-colors hover:bg-white/90"
                            >
                                Apply Now
                            </button>
                        </div>
                    </section>

                    {/* Quick facts row */}
                    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {infoTiles.map(({ icon: Icon, label, value }) => (
                            <div key={label} className={tile}>
                                <div className="flex items-center gap-2">
                                    <Icon className="size-4 text-white/60" aria-hidden="true" />
                                    <span className={tileLabel}>{label}</span>
                                </div>
                                <p className="mt-3 truncate text-sm font-semibold text-white">{value}</p>
                            </div>
                        ))}
                    </section>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
                        {/* Details column */}
                        <section className={`${card} min-w-0 p-6 sm:p-8`}>
                            <h2 className={sectionTitle}>Job Description</h2>
                            <p className="mt-4 text-sm leading-relaxed text-[#a1a4aa]">
                                {job.companyName} is looking for a {job.title} to join the team. This is
                                a {job.jobType.toLowerCase()} position based in {job.location}, with a
                                compensation of {formatCompensation(job)}. Applications are open until{' '}
                                {formatDeadline(job.deadline)}.
                            </p>

                            <h3 className={`${sectionTitle} mt-8 text-base`}>Responsibilities</h3>
                            <ul className={`mt-4 ${bulletList}`}>
                                {(job.responsibilities ?? []).map((line) => (
                                    <li key={line}>{line}</li>
                                ))}
                            </ul>

                            <h3 className={`${sectionTitle} mt-8 text-base`}>Requirements</h3>
                            {/* Skill-chip badges from the design render here once tag data exists. */}
                            <ul className={`mt-4 ${bulletList}`}>
                                {(job.requirements ?? []).map((line) => (
                                    <li key={line}>{line}</li>
                                ))}
                            </ul>

                            <h2 className={`${sectionTitle} mt-10`}>Benefits</h2>
                            {/* Static — design only, benefits data doesn't exist yet. */}
                            <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                                {benefits.map(({ icon: Icon, label }) => (
                                    <li key={label} className="flex items-center gap-3">
                                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#1a1a1f]">
                                            <Icon className="size-4 text-white/80" aria-hidden="true" />
                                        </span>
                                        <span className="text-sm font-medium text-white">{label}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Company overview sidebar */}
                        <aside>
                            <section className={`${card} p-6`}>
                                <h2 className={sectionTitle}>Company Overview</h2>

                                {/* Placeholder — renders the company image once profile data exists. */}
                                <div className="mt-5 flex aspect-video items-center justify-center rounded-xl border border-white/10 bg-[#1a1a1f]">
                                    <Building2 className="size-10 text-white/20" aria-hidden="true" />
                                </div>

                                <dl className="mt-2 text-sm">
                                    <div className="flex items-center justify-between gap-4 border-b border-white/8 py-4">
                                        <dt className={tileLabel}>Size</dt>
                                        {/* Static — design only, no company size data yet. */}
                                        <dd className="text-right font-medium text-white">
                                            250 – 500 Employees
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 py-4">
                                        <dt className={tileLabel}>Industry</dt>
                                        <dd className="text-right font-medium text-white">{job.category}</dd>
                                    </div>
                                </dl>

                                {/* No company URL in the data yet — display-only button. */}
                                <button
                                    type="button"
                                    className="mt-2 flex h-10 w-full cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-[#1a1a1f] text-sm font-medium text-white transition-colors hover:bg-[#232329]"
                                >
                                    Visit Website
                                </button>
                            </section>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;
