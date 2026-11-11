"use client";

import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import React from 'react';

const SearchFilter = () => {

    const router = useRouter();

    const handleSearchForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const search = new FormData(e.currentTarget).get("query")?.toString() ?? "";

        const params = new URLSearchParams();
        params.set("search", search);

        router.push(`/browse-jobs?${params.toString()}`)
    }

    return (
        <section className="rounded-xl border border-white/8 bg-[#0f0f12] p-4">
            <form onSubmit={handleSearchForm}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <label className="flex h-12 flex-1 items-center gap-3 rounded-lg border border-white/10 bg-[#1a1a1f] px-4">
                        <Search className="size-4 shrink-0 text-[#a1a4aa]" aria-hidden="true" />
                        <input
                            type="text"
                            name="query"
                            placeholder="Search by job title, keywords..."
                            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#71717a]"
                        />
                    </label>
                    <button
                        type="submit"
                        className="h-12 shrink-0 cursor-pointer rounded-lg bg-white px-6 text-sm font-semibold text-[#0a0a0c] transition-colors hover:bg-white/90"
                    >
                        Search Jobs
                    </button>
                </div>
            </form>
        </section>
    );
};

export default SearchFilter;