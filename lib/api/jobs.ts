import type { JobPost } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const getJobs = async (query = ""): Promise<JobPost[]> => {
    const res = await fetch(`${BASE_URL}/jobs?${query}`);
    return res.json();
}

export const jobDetails = async (id: string) => {
    const res = await fetch(`${BASE_URL}/job/${id}`);
    return res.json();
}

export const jobDelete = async (id: string) => {
    const res = await fetch(`${BASE_URL}/job/${id}`, {
        method: "DELETE",
    })
    return res.json();
}

export const appliedJobs = async (userId: string) => {
    const res = await fetch(`${BASE_URL}/applications?userId=${userId}`);
    return res.json();
}

export const appliedJobsCount = async (userId = "") => {
    const res = await fetch(`${BASE_URL}/applications/count?userId=${userId}`);
    return res.json();
}

