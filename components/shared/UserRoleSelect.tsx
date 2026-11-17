"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "cn";
import { roleStyles } from "@/components/shared/RoleBadge";
import type { Role } from "@/types";
import { updateUserRole } from "@/lib/actions/users";
import { toast } from "../ui/toast";

const ROLES: Role[] = ["seeker", "recruiter", "admin"];

export function UserRoleSelect({
    userId,
    role,
}: {
    userId: string;
    role?: Role;
}) {
    const [value, setValue] = useState<Role>(role ?? "seeker");
    const [pending, startTransition] = useTransition();
    const router = useRouter();

    const handleChange = (nextRole: Role) => {
        const previousRole = value;

        setValue(nextRole);

        startTransition(async () => {
            try {
                const result = await updateUserRole(userId, nextRole);

                if (result?.modifiedCount > 0) {
                    toast.add({
                        title: "Success",
                        description: "Successfully changed user role.",
                    });

                    router.refresh();
                } else if (result?.matchedCount > 0) {
                    toast.add({
                        title: "Info",
                        description: "This user already has this role.",
                    });
                } else {
                    setValue(previousRole);

                    toast.add({
                        title: "Error",
                        description: "Failed to update user role.",
                    });
                }
            } catch (error) {
                setValue(previousRole);

                toast.add({
                    title: "Error",
                    description: "Something went wrong while updating the role.",
                });

                console.error("Role update error:", error);
            }
        });
    };

    return (
        <select
            value={value}
            disabled={pending}
            aria-label={`Change role for user ${userId}`}
            onChange={(event) =>
                handleChange(event.target.value as Role)
            }
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