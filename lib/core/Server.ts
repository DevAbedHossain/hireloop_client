import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import type { Role } from "@/types";

export const getServer = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return session?.user;
}

export const requireRole = async (role: Role) => {
    const user = await getServer();

    if (!user || user.role !== role) {
        redirect("/unauthorized")
    }

    return user;
}

export const getToken = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session || !session.session?.token) {
        redirect("/unauthorized")
    }

    return session.session.token;
}

/** Server-side fetch with the better-auth session token attached. */
export const authFetch = async (api: string) => {
    const token = await getToken();
    const res = await fetch(api, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res;
}
