import type { Application, ApplicationStatus, JobPost } from "@/types";

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

/** All applications submitted for one job (recruiter review view). */
export const getJobApplications = async (jobId: string): Promise<Application[]> => {
    const res = await fetch(`${BASE_URL}/applications?jobId=${jobId}`);
    return res.json();
}

/** Every application in the system — recruiter tables aggregate real counts from this. */
export const getApplications = async (): Promise<Application[]> => {
    const res = await fetch(`${BASE_URL}/applications`);
    return res.json();
}

/** Recruiter updates the review status of one application. */
export const updateApplicationStatus = async (applicationId: string, status: ApplicationStatus) => {
    const res = await fetch(`${BASE_URL}/application/${applicationId}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status }),
    })

    if (!res.ok) {
        throw new Error(`Status update failed (${res.status})`)
    }

    return res.json();
}