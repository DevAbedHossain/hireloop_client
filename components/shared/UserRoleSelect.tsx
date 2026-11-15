"use client";

import { useState, useTransition } from "react";
import { cn } from "cn";
import { roleStyles } from "@/components/shared/RoleBadge";
import type { Role } from "@/types";
import { updateUserRole } from "@/lib/actions/users";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

const ROLES: Role[] = ["seeker", "recruiter", "admin"];

export function UserRoleSelect({ userId, role }: { userId: string; role?: Role }) {
    const [value, setValue] = useState<Role>(role ?? "seeker");
    const [pending, startTransition] = useTransition();
    const router = useRouter();

    const handleChange = async (id: string, next: Role) => {

        const result = await updateUserRole(id, next);
        console.log("result", result)
        if (result.modifiedCount > 0) {
            router.refresh();
            toast.add({
                title: "success",
                description: "successfully change user role"
            })
        }

    };

    return (
        <select
            value={value}
            disabled={pending}
            aria-label={`Change role for user ${userId}`}
            onChange={(event) => handleChange(userId, event.target.value as Role)}
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
