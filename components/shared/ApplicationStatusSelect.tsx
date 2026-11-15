"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { updateApplicationStatus } from "@/lib/api/jobs";
import { cn } from "cn";
import { applicationStatusStyles } from "@/components/shared/ApplicationStatusBadge";
import type { ApplicationStatus } from "@/types";

const STATUSES: ApplicationStatus[] = ["Applied", "Review", "Shortlisted", "Rejected", "Offered"];

/**
 * Editable application status control for recruiters.
 * Updates optimistically in the UI, persists via the API, and re-renders the
 * server table (stat cards) with `router.refresh()`. Reverts on failure.
 */
export function ApplicationStatusSelect({
    applicationId,
    status,
}: {
    applicationId: string
    status?: ApplicationStatus
}) {
    const router = useRouter();
    const [value, setValue] = useState<ApplicationStatus>(status ?? "Applied");
    const [pending, startTransition] = useTransition();

    const handleChange = (next: ApplicationStatus) => {
        if (next === value) return;
        const previous = value;
        setValue(next); // optimistic update
        startTransition(async () => {
            try {
                await updateApplicationStatus(applicationId, next);
                router.refresh(); // re-render stat cards / table with real data
            } catch {
                setValue(previous); // revert on failure
            }
        });
    };

    return (
        <select
            value={value}
            disabled={pending}
            aria-label="Change application status"
            onChange={(event) => handleChange(event.target.value as ApplicationStatus)}
            className={cn(
                "h-7 cursor-pointer rounded-md border px-3 pr-6 text-sm outline-none transition-opacity",
                "bg-no-repeat focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-wait disabled:opacity-60",
                "[color-scheme:dark]",
                applicationStatusStyles[value],
            )}
        >
            {STATUSES.map((status) => (
                <option key={status} value={status}>
                    {status}
                </option>
            ))}
        </select>
    );
}
