import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { getJobs } from '@/lib/api/jobs';
import { JobPost } from '@/types';
import SearchFilter from '@/components/borwse-jobs/search-filter';
import { JobFiltersPanel } from '@/components/borwse-jobs/sidbar-filter';
import JobCard from '@/components/borwse-jobs/job-card';


// Shared class strings (same pattern as the manage-jobs table).
const pageButton =
    'flex size-9 items-center justify-center rounded-lg border border-white/10 bg-[#141418] text-sm text-[#d4d4d8] transition-colors hover:text-white';
const pageButtonActive = 'flex size-9 items-center justify-center rounded-lg bg-white text-sm font-semibold text-[#0a0a0c]';

const BrowseJobsPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const search = await searchParams;
    const urlSearch = new URLSearchParams(search as Record<string, string>);
    const query = urlSearch.toString();

    const jobs = await getJobs(query);

    return (
        <div className="px-4 pb-16 pt-6 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">

                {/* Search bar (Figma: bordered container with input + white button) */}
                <SearchFilter />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">

                    {/* Filters sidebar */}
                    <JobFiltersPanel jobs={jobs} />

                    {/* Results column */}
                    <section className="flex min-w-0 flex-col gap-4">

                        {/* Results header */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-lg font-semibold [font-family:var(--font-manrope)] text-white">
                                Found {jobs.length} Professional Jobs
                            </h2>
                            <label className="flex items-center gap-2 text-[13px] text-[#a1a4aa]">
                                Sort by:
                                <span className="relative">
                                    <select
                                        defaultValue="Most Recent"
                                        className="h-9 cursor-pointer appearance-none rounded-lg border border-white/15 bg-[#141418] pl-3 pr-8 text-[13px] text-white outline-none"
                                    >
                                        <option>Most Recent</option>
                                        <option>Oldest First</option>
                                        <option>Highest Salary</option>
                                    </select>
                                    <ChevronDown
                                        aria-hidden="true"
                                        className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-[#a1a4aa]"
                                    />
                                </span>
                            </label>
                        </div>

                        {/* Job cards */}
                        {jobs.length === 0 ? (
                            <p className="rounded-xl border border-white/8 bg-[#0f0f12] p-10 text-center text-sm text-[#a1a4aa]">
                                No jobs found.
                            </p>
                        ) : (
                            jobs.map((job: JobPost) => <JobCard key={job._id} job={job} />)
                        )}
                        {/* Pagination (static — design only) */}
                        <nav aria-label="Pagination" className="mt-2 flex items-center justify-center gap-1.5">
                            <button type="button" aria-label="Previous page" className={pageButton}>
                                <ChevronLeft className="size-4" aria-hidden="true" />
                            </button>
                            {[1, 2, 3].map((page) => (
                                <button
                                    key={page}
                                    type="button"
                                    aria-current={page === 1 ? 'page' : undefined}
                                    className={page === 1 ? pageButtonActive : pageButton}
                                >
                                    {page}
                                </button>
                            ))}
                            <span aria-hidden="true" className="px-1 text-sm text-[#71717a]">...</span>
                            <button type="button" className={pageButton}>
                                42
                            </button>
                            <button type="button" aria-label="Next page" className={pageButton}>
                                <ChevronRight className="size-4" aria-hidden="true" />
                            </button>
                        </nav>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default BrowseJobsPage;
