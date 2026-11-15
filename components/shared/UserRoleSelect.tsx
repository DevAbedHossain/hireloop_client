"use client";

import { useState, useTransition } from "react";

import { updateUserRole } from "@/lib/api/users";
import { cn } from "cn";
import { roleStyles } from "@/components/shared/RoleBadge";
import type { Role } from "@/types";

const ROLES: Role[] = ["seeker", "recruiter", "admin"];

/**
 * Editable role control for the admin users table (toggle seeker/recruiter/admin).
 * Updates optimistically in the UI; persistence itself isn't wired yet — see
 * the `updateUserRole` TODO in lib/api/users.ts. Reverts on failure.
 */
export function UserRoleSelect({ userId, role }: { userId: string; role?: Role }) {
    const [value, setValue] = useState<Role>(role ?? "seeker");
    const [pending, startTransition] = useTransition();

    const handleChange = (next: Role) => {
        if (next === value) return;
        const previous = value;
        setValue(next); // optimistic update
        startTransition(async () => {
            try {
                await updateUserRole(userId, next);
            } catch {
                setValue(previous); // revert on failure
            }
        });
    };

    return (
        <select
            value={value}
            disabled={pending}
            aria-label={`Change role for user ${userId}`}
            onChange={(event) => handleChange(event.target.value as Role)}
            className={cn(
                "h-7 cursor-pointer rounded-md border px-3 pr-6 text-sm outline-none transition-opacity",
                "focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-wait disabled:opacity-60",
                "[color-scheme:dark]",
                roleStyles[value].badge,
            )}
        >
            {ROLES.map((role) => (
                <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
            ))}
        </select>
    );
}
