"use client";

import { ListFilter } from "lucide-react";
import { useRouter } from "next/navigation";

const ROLE_OPTIONS = [
    { value: "all", label: "All Roles" },
    { value: "seeker", label: "Seekers" },
    { value: "recruiter", label: "Recruiters" },
    { value: "admin", label: "Admins" },
] as const;

/** Role filter for the admin users table — reflects and updates the `?role=` search param. */
export function RoleFilterSelect({ value }: { value?: string }) {
    const router = useRouter();
    const current = value ?? "all";

    return (
        <div className="flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-[#141418] px-3">
            <ListFilter className="size-4 text-[#a1a4aa]" aria-hidden="true" />
            <select
                value={current}
                aria-label="Filter users by role"
                onChange={(event) => {
                    const next = event.target.value;
                    router.push(next === "all" ? "/dashboard/admin/users" : `/dashboard/admin/users?role=${next}`);
                }}
                className="h-full cursor-pointer bg-transparent text-sm text-white outline-none [color-scheme:dark]"
            >
                {ROLE_OPTIONS.map(({ value: option, label }) => (
                    <option key={option} value={option}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    );
}
