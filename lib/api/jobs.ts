import type { Application, ApplicationStatus, JobPost } from "@/types";
import { getToken } from "../core/Server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
    if (!BASE_URL) {
        throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
    }

    const token = await getToken();

    const headers = new Headers(init.headers);
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const res = await fetch(`${BASE_URL}${path}`, {
        cache: "no-store",
        ...init,
        headers,
    });

    if (!res.ok) {
        throw new Error(`Request to ${path} failed (${res.status})`);
    }

    return res.json();
}

export const getJobs = async (query = ""): Promise<JobPost[]> => {
    const data = await request<JobPost[]>(`/jobs?${query}`);
    return Array.isArray(data) ? data : [];
};

export const jobDetails = (id: string) => request(`/job/${id}`);

export const jobDelete = (id: string) =>
    request(`/job/${id}`, { method: "DELETE" });

export const appliedJobsCount = (userId = "") =>
    request(`/applications/count?userId=${userId}`);

export const getApplications = async (): Promise<Application[]> => {
    const data = await request<Application[]>("/applications");
    return Array.isArray(data) ? data : [];
};


export const updateApplicationStatus = (applicationId: string, status: ApplicationStatus) =>
    request(`/application/${applicationId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
    });