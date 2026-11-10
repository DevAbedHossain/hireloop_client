"use client";

import { Trash2Icon } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { JobPost } from "@/types";
import { jobDelete } from "@/lib/actions/createPost";
import { toast } from "../ui/toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function JobDeleteDialog({ job }: { job: JobPost }) {

    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleDeleteJob = async () => {
        if (!job._id) return;

        const result = await jobDelete(job._id);

        if (result.deletedCount > 0) {
            setOpen(false);
            toast.add({
                title: "Delete job",
                description: "Permanently delete the job!"
            })
            router.refresh();
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger
                render={< Button variant="destructive" > <Trash2Icon /> </Button>
                }
            />
            < AlertDialogContent size="sm" >
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive" >
                        <Trash2Icon />
                    </AlertDialogMedia>
                    < AlertDialogTitle > Delete job ? </AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete this job.View{" "}
                        <a href="#" > Settings </a> delete any memories saved during this job.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                < AlertDialogFooter >
                    <AlertDialogCancel variant="outline" className="cursor-pointer"> Cancel </AlertDialogCancel>
                    < AlertDialogAction onClick={handleDeleteJob} variant="destructive" className="cursor-pointer"> Delete </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
