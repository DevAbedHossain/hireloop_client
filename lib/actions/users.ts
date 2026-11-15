import type { Role } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/** Admin changes a user's platform role (seeker / recruiter / admin). */
export const updateUserRole = async (userId: string, role: Role) => {
    const res = await fetch(`${BASE_URL}/user/${userId}/role`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ role })
    })

    if (!res.ok) {
        throw new Error(`Role update failed (${res.status})`)
    }

    return res.json();
}
