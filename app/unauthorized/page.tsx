import Link from "next/link";
import { ShieldAlert } from "lucide-react";

/** Shown when a signed-in user opens an area their role can't access
 *  (e.g. a seeker opening /dashboard/admin). Unauthenticated users never
 *  reach this page — requireRole sends them to /signin instead. */
const UnauthorizedPage = () => {
    return (
        <main className="flex min-h-svh items-center justify-center px-4">
            <section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1a1a1f] p-8 text-center">
                <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-500/15 ring-4 ring-red-500/10">
                    <ShieldAlert className="size-7 text-red-400" aria-hidden="true" />
                </span>
                <h1 className="mt-5 text-2xl font-semibold [font-family:var(--font-manrope)] text-white">
                    Access denied
                </h1>
                <p className="mt-2 text-sm text-[#a1a4aa]">
                    Your account doesn&apos;t have permission to view this page. If
                    you believe this is a mistake, contact an administrator.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href="/"
                        className="flex h-10 items-center justify-center rounded-lg bg-white px-4 text-sm font-medium text-[#0a0a0c] transition-colors hover:bg-white/90"
                    >
                        Back to homepage
                    </Link>
                    <Link
                        href="/signin"
                        className="flex h-10 items-center justify-center rounded-lg border border-white/10 bg-[#1a1a1f] px-4 text-sm text-white transition-colors hover:text-white"
                    >
                        Go to sign in
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default UnauthorizedPage;
