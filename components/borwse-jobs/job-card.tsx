"use client";

import { JobPost } from '@/types';
import { Banknote, Bookmark, Clock } from 'lucide-react';
import { formatCompensation } from '@/lib/utils/job-format';
import { useRouter } from 'next/navigation';


const badge =
    'inline-flex h-7 items-center gap-1.5 rounded-md border border-white/10 bg-[#1a1a1f] px-2.5 text-[13px] text-white/90';
const badgeIcon = 'size-3.5 shrink-0 text-white/60';


const JobCard = ({ job }: { job: JobPost }) => {

    const router = useRouter();

    const handleDetailView = (id: string | undefined) => {
        if (!id) return;
        console.log(id);
        router.push(`/browse-jobs/${id}`);
    }

    return (
        <>
            <article onClick={() => handleDetailView(job._id)}
                key={job._id}
                className="relative rounded-xl border cursor-pointer border-white/8 bg-[#101013] p-6 transition-colors hover:border-white/15"
            >
                <button
                    type="button"
                    aria-label={`Save ${job.title}`}
                    className="absolute top-6 right-6 cursor-pointer text-[#a1a4aa] transition-colors hover:text-white"
                >
                    <Bookmark className="size-5" aria-hidden="true" />
                </button>

                <div className="flex items-start gap-4">
                    {/* Company logo — initial avatar fallback until logos exist */}
                    <span
                        aria-hidden="true"
                        className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#1a1a1f] text-base font-semibold text-white/80"
                    >
                        {job.companyName?.charAt(0).toUpperCase()}
                    </span>

                    <div className="min-w-0">
                        <h3 className="truncate text-lg font-semibold [font-family:var(--font-manrope)] text-white">
                            {job.title}
                        </h3>
                        <p className="mt-1 text-sm text-[#a1a4aa]">
                            {job.companyName}
                            <span aria-hidden="true" className="mx-1.5 text-white/30">•</span>
                            {job.location}
                            {job.isRemote ? ' (Remote)' : ''}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-2.5">
                            <span className={badge}>
                                <Banknote className={badgeIcon} aria-hidden="true" />
                                {formatCompensation(job)}
                            </span>
                            <span className={badge}>
                                <Clock className={badgeIcon} aria-hidden="true" />
                                {job.jobType}
                            </span>
                            {/* Optional tag badges from the design (green "Easy Apply" /
                                                    orange "Hot Job") render here once tag data exists. */}
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
};

export default JobCard;