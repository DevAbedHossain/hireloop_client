"use client";


import { applicationJob } from '@/lib/actions/createPost';
import { useSession } from '@/lib/auth-client';
import { JobPost } from '@/types';
import { Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from '../ui/toast';
import { appliedJobsCount } from '@/lib/api/jobs';
import { getUserPremiumId } from '@/lib/api/users';


const JobDetailsAction = ({ job }: { job: JobPost }) => {

    const { data: session } = useSession();
    const user = session?.user;

    const router = useRouter();

    const handleApplyJob = async () => {

        if (!user) {
            router.push(`/signin?redirectTo=/browse-jobs/${job._id}`);
            return;
        } else if (user.role === "seeker") {

            const premiumResult = await getUserPremiumId(user.id);
            console.log(premiumResult, "pre res")

            const resultCount = await appliedJobsCount(user.id);
            console.log(resultCount, "job colunt")

            if (!premiumResult.premium && resultCount.count >= 2) {

                router.push("/checkout");
                return;
            } else {
                const application = {
                    userId: user.id,
                    jobId: job._id,
                    userEmail: user.email,
                    jobTitle: job.title,
                    jobCompany: job.companyName,
                    status: "applied",
                }

                const result = await applicationJob(application);
                if (result.insertedId) {
                    toast.add({
                        title: "success",
                        description: "Successfully applied this job!"
                    })
                    router.push("/browse-jobs");
                }
            }

        } else {
            console.log("Can't apply the job join with Seeker role")
        }
    }

    return (
        <div className="flex items-center gap-3">
            <button

                type="button"
                aria-label={`Save ${job.title}`}
                className="flex size-10 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-[#1a1a1f] text-[#a1a4aa] transition-colors hover:text-white"
            >
                <Bookmark className="size-5" aria-hidden="true" />
            </button>
            {/* Apply Now is display-only for now — no functionality yet. */}
            <button
                onClick={handleApplyJob}
                type="button"
                className="h-10 cursor-pointer rounded-lg bg-white px-5 text-sm font-semibold text-[#0a0a0c] transition-colors hover:bg-white/90"
            >
                Apply Now
            </button>
        </div>
    );
};

export default JobDetailsAction;