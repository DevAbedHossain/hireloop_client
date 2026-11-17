"use server";

import type { Role } from "@/types";
import { protectedMutation } from "../core/Server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/** Admin changes a user's platform role (seeker / recruiter / admin). */
export const updateUserRole = async (userId: string, role: Role) => {
    const api = `${BASE_URL}/user/${userId}/role`;
    const res = await protectedMutation(api, "PATCH", { role });
    if (!res.ok) {
        throw new Error(`Role update failed (${res.status})`)
    }

    return res.json();
}
