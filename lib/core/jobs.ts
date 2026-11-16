// Server-only job helpers (App Router server components / server actions only).
// Uses `authFetch` → `next/headers` — importing this from a Client Component
// breaks the build (see lib/api/jobs.ts, which is the client-safe module).

import { authFetch } from "./Server";
import type { Application } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/** The signed-in seeker's applications (session-token authenticated). */
export const appliedJobs = async (userId: string): Promise<Application[]> => {
    const api = `${BASE_URL}/applications?userId=${userId}`;
    const res = await authFetch(api);
    return res.json();
}

export const getJobApplications = async (jobId: string): Promise<Application[]> => {
    const api = `${BASE_URL}/applications?jobId=${jobId}`;
    const res = await authFetch(api);
    return res.json();
}
