import { cn } from "cn"

import type { JobStatus, UserStatus } from "@/types"

/** Badge states: job lifecycle (Active/Expired) + account status (Suspended). */
export type BadgeStatus = JobStatus | UserStatus;

const statusStyles: Record<BadgeStatus, { badge: string; dot: string }> = {
    Active: { badge: "bg-[#14532d] text-[#4ade80]", dot: "bg-[#4ade80]" },
    Expired: { badge: "bg-[#1f1f1f] text-[#a0a0ab]", dot: "bg-[#5a5a60]" },
    Suspended: { badge: "bg-[#7f1d1d] text-[#f87171]", dot: "bg-[#f87171]" },
}

/** Badge with a leading status dot (Active / Expired / Suspended). */
export function StatusBadge({ status }: { status: BadgeStatus }) {
    return (
        <span
            className={cn(
                "inline-flex h-7 items-center gap-2 rounded px-3 text-sm",
                statusStyles[status].badge
            )}
        >
            <span className={cn("size-1.5 rounded-full", statusStyles[status].dot)} aria-hidden="true" />
            {status}
        </span>
    )
}
