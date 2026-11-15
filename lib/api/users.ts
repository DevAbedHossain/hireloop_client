import type { AdminUser, Role } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/** All platform users (admin User Management table). */
export const getUsers = async (): Promise<AdminUser[]> => {
    const res = await fetch(`${BASE_URL}/users`);
    const users: Array<AdminUser & { _id: string }> = await res.json();
    // Mongo documents carry `_id` — normalize to `id` for the UI components.
    return users.map(({ _id, ...user }) => ({ ...user, id: _id }));
}

/**
 * Admin changes a user's platform role (seeker / recruiter / admin).
 *
 * TODO: persistence is not wired yet — the UI already calls this handler, so
 * the real implementation only needs to live here (e.g. a `PATCH /user/:id/role`
 * endpoint on the Express server that updates `user.role` in Mongo). The select
 * keeps the optimistic value until the page reloads.
 */
export const updateUserRole = async (userId: string, role: Role) => {
    console.log(`[TODO] updateUserRole: ${userId} -> ${role}`);
    return { success: true };
}

export const getUserPremiumId = async (userId: string) => {
    const res = await fetch(`${BASE_URL}/user/${userId}/premium`);
    return res.json();
}
