import type { JobPost } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const getJobs = async (): Promise<JobPost[]> => {
    const res = await fetch(`${BASE_URL}/jobs`);
    return res.json();
}
