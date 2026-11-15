import { Download } from "lucide-react";

import { getUsers } from "@/lib/api/users";
import { cn } from "cn";
import { PageHeader } from "@/components/shared/PageHeader";
import { RoleBadge } from "@/components/shared/RoleBadge";
import { RoleFilterSelect } from "@/components/shared/RoleFilterSelect";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { UserRoleSelect } from "@/components/shared/UserRoleSelect";
import type { AdminUser, Role } from "@/types";

// Shared class strings (same pattern as the other dashboard tables).
const cellSmall = "text-sm text-[#a0a0ab]";
const tableHead = "h-12 px-4 text-xs font-medium tracking-wider text-[#a0a0ab] uppercase";
const statCard = "rounded-xl border border-white/8 bg-[#141418] p-5";

const DAY_MS = 24 * 60 * 60 * 1000;

/** "Oct 12, 2023" style join date (createdAt comes back as Date | string). */
const formatJoinDate = (createdAt: string | Date) =>
    new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });

const UserListPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ role?: string }>
}) => {
    const { role: roleFilter } = await searchParams;

    const users: AdminUser[] = await getUsers();

    // ?role= filter — read on the server so the table stays a server component.
    const isValidRole = (value: string): value is Role => ["seeker", "recruiter", "admin"].includes(value);
    const filtered = roleFilter && isValidRole(roleFilter)
        ? users.filter((user) => user.role === roleFilter)
        : users;

    // Stats are computed from real data (suspension tracking comes later).
    const recruiters = users.filter((user) => user.role === "recruiter").length;
    const admins = users.filter((user) => user.role === "admin").length;
    const newSignups = users.filter(
        (user) => Date.now() - new Date(user.createdAt).getTime() < DAY_MS
    ).length;

    const stats = [
        {
            label: "Total Users",
            value: String(users.length),
            sub: `${newSignups} new in 24h`,
            subClass: "text-[#a1a4aa]",
        },
        {
            label: "Recruiters",
            value: String(recruiters),
            sub: users.length ? `${Math.round((recruiters / users.length) * 100)}% of all users` : "0% of all users",
            subClass: "text-emerald-500",
        },
        {
            label: "Admins",
            value: String(admins),
            sub: "platform managers",
            subClass: "text-amber-400",
        },
        {
            label: "New Signups (24h)",
            value: String(newSignups),
            sub: newSignups > 0 ? "steady activity" : "quiet so far",
            subClass: "text-[#8a83ff]",
        },
    ];

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Heading + role filter / export actions (Figma: "User Management") */}
            <PageHeader
                breadcrumb={[
                    { label: "Administration" },
                    { label: "Users" },
                ]}
                title="User Management"
                description="Review, filter, and manage platform access for all users."
                action={
                    <div className="flex flex-wrap items-center gap-3">
                        <RoleFilterSelect value={roleFilter} />
                        {/* Display-only for now — no export backend yet. */}
                        <button
                            type="button"
                            className="flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-white px-4 text-sm font-medium text-[#0a0a0c] transition-colors hover:bg-white/90"
                        >
                            <Download className="size-4" aria-hidden="true" />
                            Export List
                        </button>
                    </div>
                }
            />

            {/* Summary cards */}
            <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                {stats.map(({ label, value, sub, subClass }) => (
                    <div key={label} className={statCard}>
                        <p className={cellSmall}>{label}</p>
                        <p className="mt-1 text-3xl font-bold [font-family:var(--font-manrope)] text-white">
                            {value}
                        </p>
                        <p className={cn("mt-1 text-xs", subClass)}>{sub}</p>
                    </div>
                ))}
            </section>

            {/* Users table */}
            <section className="rounded-lg border border-white/8 bg-[#141418]">
                {filtered.length === 0 ? (
                    <p className="p-10 text-center text-sm text-[#a1a4aa]">
                        {users.length === 0
                            ? "No users found on the platform yet."
                            : "No users match this role filter."}
                    </p>
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full min-w-[900px] border-collapse text-left">
                            <thead className="bg-white/2">
                                <tr>
                                    <th className={tableHead}>User Name</th>
                                    <th className={cn(tableHead, "hidden md:table-cell")}>Email Address</th>
                                    <th className={tableHead}>Role</th>
                                    <th className={cn(tableHead, "hidden lg:table-cell")}>Join Date</th>
                                    <th className={tableHead}>Status</th>
                                    <th className="h-12 px-4 text-right text-xs font-medium uppercase tracking-wider text-[#a0a0ab]">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-t border-white/8 transition-colors hover:bg-white/2"
                                    >
                                        {/* User Name */}
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                {/* Initial avatar fallback until profile images exist */}
                                                <span
                                                    aria-hidden="true"
                                                    className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#232327] text-sm font-semibold text-white/80"
                                                >
                                                    {user.name?.charAt(0).toUpperCase() ?? "?"}
                                                </span>
                                                <span className="truncate text-sm font-medium text-white">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Email Address */}
                                        <td className={cn("px-4 py-4 text-sm text-[#d4d4d8]", "hidden md:table-cell")}>
                                            {user.email}
                                        </td>

                                        {/* Role */}
                                        <td className="px-4 py-4">
                                            <RoleBadge role={user.role} />
                                        </td>

                                        {/* Join Date */}
                                        <td className={cn("px-4 py-4", cellSmall, "hidden lg:table-cell")}>
                                            {formatJoinDate(user.createdAt)}
                                        </td>

                                        {/* Status — suspension isn't tracked yet, so all accounts show Active */}
                                        <td className="px-4 py-4">
                                            <StatusBadge status={user.status ?? "Active"} />
                                        </td>

                                        {/* Actions — role toggle (persistence TODO, see updateUserRole) */}
                                        <td className="px-4 py-4 text-right">
                                            <UserRoleSelect userId={user.id ?? user._id ?? ""} role={user.role} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Table footer: result count */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/8 px-4 py-4">
                    <p className={cellSmall}>
                        Showing 1–{filtered.length} of {users.length} users
                        {roleFilter && isValidRole(roleFilter) ? ` (${roleFilter}s)` : ""}
                    </p>
                </div>
            </section>
        </div>
    );
};

export default UserListPage;
