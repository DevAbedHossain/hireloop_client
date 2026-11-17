"use server";

import type { AppliedJob, JobForm } from "@/types";
import { protectedMutation } from "../core/Server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createPost = async (data: JobForm) => {
    const api = `${BASE_URL}/jobs`;
    const res = await protectedMutation(api, "POST", data)
    return res.json();
}

export const applicationJob = async (job: AppliedJob) => {
    const api = `${BASE_URL}/application`;
    const res = await protectedMutation(api, "POST", job);
    return res.json();
}

