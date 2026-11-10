import React from 'react';

const BrowseJobsPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const search = await searchParams;
    console.log("search bar", search)

    return (
        <div>
            <h2>Browse Jobs Page</h2>
        </div>
    );
};

export default BrowseJobsPage;