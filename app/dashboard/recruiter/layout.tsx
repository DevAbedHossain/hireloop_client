import { requireRole } from '@/lib/core/Server';
import React from 'react';

const RecruiterLayoutPage = async ({ children }: { children: React.ReactNode }) => {
    await requireRole("recruiter")
    return children;
};

export default RecruiterLayoutPage;