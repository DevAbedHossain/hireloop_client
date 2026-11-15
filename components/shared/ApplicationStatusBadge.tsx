import { cn } from "cn"

import type { ApplicationStatus } from "@/types"

// Pill styles per application status (design: gray / amber / blue / red / green).
// Exported so editable status controls (e.g. the recruiter's select) reuse them.
export const applicationStatusStyles: Record<ApplicationStatus, string> = {
    Applied: "border-white/10 bg-white/5 text-[#a1a4aa]",
    Review: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    Shortlisted: "border-blue-500/30 bg-blue-500/10 text-blue-300",
    Rejected: "border-red-500/30 bg-red-500/10 text-red-400",
    Offered: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
}

/** Status pill for job applications ("Applied" while the API hasn't set one yet). */
export function ApplicationStatusBadge({ status }: { status?: ApplicationStatus }) {
    const label: ApplicationStatus = status ?? "Applied"

    return (
        <span className={cn("inline-flex h-7 items-center rounded-md border px-3 text-sm", applicationStatusStyles[label])}>
            {label}
        </span>
    )
}
