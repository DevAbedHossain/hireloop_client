import { appliedJobs } from '@/lib/api/jobs';
import React from 'react';

const ApplicationsPage = async () => {

    const jobs = await appliedJobs();
    console.log(jobs)

    return (
        <div>

        </div>
    );
};

export default ApplicationsPage;