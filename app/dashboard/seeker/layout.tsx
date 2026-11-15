import { requireRole } from '@/lib/core/Server';
import React from 'react';

const SeekerLayoutRole = async ({ children }: { children: React.ReactNode }) => {
    await requireRole("seeker");
    return children;
};

export default SeekerLayoutRole;