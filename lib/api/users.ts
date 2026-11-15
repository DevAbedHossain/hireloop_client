import type { AdminUser } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/** All platform users (admin User Management table). */
export const getUsers = async (): Promise<AdminUser[]> => {
    const res = await fetch(`${BASE_URL}/users`);
    const users: Array<AdminUser & { _id: string }> = await res.json();
    // Mongo documents carry `_id` — normalize to `id` for the UI components.
    return users.map(({ _id, ...user }) => ({ ...user, id: _id }));
}

export const getUserPremiumId = async (userId: string) => {
    const res = await fetch(`${BASE_URL}/user/${userId}/premium`);
    return res.json();
}
