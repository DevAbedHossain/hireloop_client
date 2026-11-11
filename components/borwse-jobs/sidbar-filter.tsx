"use client";

// Sidebar filters for the Browse Jobs page — from the Figma
// "Aside - Sidebar Filters" (labels 13px #A0A0AB, counts #6E6E78,
// filter groups stacked in one #141418 card).
//
// Job Type and Job Category are single-select (radio inputs); Work
// Arrangement is a multi-select checkbox. Counts are computed at render
// from the current job list. Selection only flips visually — no query
// params, no list filtering (wired up separately).

import { CATEGORIES as JOB_CATEGORIES, JOB_TYPES } from "@/lib/constants/job"
import type { JobPost as JobRow } from "@/types"
import { name } from "next/dist/server/ci-info";
import { useRouter, useSearchParams } from "next/navigation";

type FilterOption = {
    value: string
    label: string
    count?: number
}

function FilterChecklist({
    legend,
    name,
    multiple = true,
    options,
    onChange,
}: {
    legend: string
    name: string
    multiple?: boolean
    options: FilterOption[]
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}) {
    return (
        <fieldset>
            <legend className="text-sm font-semibold text-[#EDEDEF]">{legend}</legend>
            <ul className="mt-4 flex flex-col gap-4">
                {options.map((option) => (
                    <li key={option.value}>
                        <label className="flex cursor-pointer items-center justify-between gap-3 text-[13px] text-[#A0A0AB]">
                            <span className="flex items-center gap-2.5">
                                <input
                                    type={multiple ? "checkbox" : "radio"}
                                    name={name}
                                    value={option.value}
                                    onChange={onChange}
                                    className="size-4 accent-white"
                                />
                                {option.label}
                            </span>
                            {option.count !== undefined && (
                                <span className="text-[#6E6E78]">{option.count}</span>
                            )}
                        </label>
                    </li>
                ))}
            </ul>
        </fieldset>
    )
}

/** Job counts per facet, mirrored in the Figma sidebar ("Full-time  1.2k"). */
const countOptions = (
    facet: (job: JobRow) => string,
    allOptions: readonly string[],
    jobs: readonly JobRow[],
): FilterOption[] =>
    allOptions.map((option) => ({
        value: option,
        label: option,
        count: jobs.filter((job) => facet(job) === option).length,
    }))

export function JobFiltersPanel({ jobs }: { jobs: readonly JobRow[] }) {

    const router = useRouter();

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // e.target.name is the group key: "jobType" | "category" | "isRemote"
        console.log('data', e.target.name, e.target.value, e.target.checked)

        const params = new URLSearchParams();
        params.set(e.target.name, e.target.value);

        router.push(`/browse-jobs?${params.toString()}`)
    }

    return (
        <section className="surface-card p-6">
            <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[#EDEDEF]">Filters</h2>

            <div className="mt-7 flex flex-col gap-6">
                <FilterChecklist
                    legend="Job Type"
                    name="jobType"
                    onChange={handleCheckboxChange}
                    multiple={false}
                    options={countOptions((job) => job.jobType, JOB_TYPES, jobs)}
                />
                <FilterChecklist
                    legend="Job Category"
                    name="category"
                    onChange={handleCheckboxChange}
                    multiple={false}
                    options={countOptions((job) => job.category, JOB_CATEGORIES, jobs)}
                />
                <FilterChecklist
                    legend="Work Arrangement"
                    name="isRemote"
                    onChange={handleCheckboxChange}
                    options={[
                        { value: "remote", label: "Remote only", count: jobs.filter((job) => job.isRemote).length },
                    ]}
                />
            </div>
        </section>
    )
}
