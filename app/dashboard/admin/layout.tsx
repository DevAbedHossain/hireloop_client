import { requireRole } from '@/lib/core/Server';
import React from 'react';

const AdminLayoutRole = async ({ children }: { children: React.ReactNode }) => {
    await requireRole("admin");
    return children;
};

export default AdminLayoutRole;