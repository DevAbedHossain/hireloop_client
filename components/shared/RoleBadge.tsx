import { BriefcaseBusiness, ShieldCheck, UserRound } from "lucide-react";
import { cn } from "cn"

import type { Role } from "@/types"

// Pill styles + icon per role (design: gray seeker, purple recruiter, amber admin).
// Exported so editable role controls (e.g. the admin's select) reuse them.
export const roleStyles: Record<Role, { badge: string; icon: typeof UserRound }> = {
    seeker: { badge: "border-white/10 bg-white/5 text-[#a1a4aa]", icon: UserRound },
    recruiter: { badge: "border-[#5c53fe]/30 bg-[#5c53fe]/10 text-[#c3c0ff]", icon: BriefcaseBusiness },
    admin: { badge: "border-amber-500/30 bg-amber-500/10 text-amber-400", icon: ShieldCheck },
}

/** Role pill for platform accounts (defaults to "seeker" when unset). */
export function RoleBadge({ role }: { role?: Role }) {
    const label: Role = role ?? "seeker";
    const { badge, icon: Icon } = roleStyles[label];

    return (
        <span className={cn("inline-flex h-7 items-center gap-1.5 rounded-md border px-3 text-sm", badge)}>
            <Icon className="size-3.5" aria-hidden="true" />
            {label.charAt(0).toUpperCase() + label.slice(1)}
        </span>
    )
}
