

import Link from "next/link";
import {
    ArrowLeft,
    CreditCard,
    Infinity as InfinityIcon,
    ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";


const PRICE = 29.0;


export default async function CheckoutPage({ searchParams }: { searchParams: { canceled?: string } }) {

    const { canceled } = await searchParams;

    if (canceled) {
        console.log(
            'Order canceled -- continue to shop around and check out when you\'re ready.'
        )
    }

    return (
        <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:py-16">
            <Link
                href="/browse-jobs"
                className="mb-6 inline-flex items-center gap-2 text-sm text-[#a1a4aa] transition-colors hover:text-white"
            >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Back to jobs
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Checkout</h1>
                <p className="mt-2 text-[#a1a4aa]">
                    You&apos;ve reached your free application limit. Upgrade to keep applying.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
                {/* Order summary */}
                <section className="h-fit rounded-2xl border border-white/10 bg-[#1a1a1f] p-6 sm:p-8">
                    <h2 className="mb-6 text-lg font-semibold text-white">Order summary</h2>

                    <div className="mb-6 flex items-start gap-4 rounded-xl border border-[#5c53fe]/30 bg-[#5c53fe]/10 p-4">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#5c53fe] text-white">
                            <InfinityIcon className="size-5" aria-hidden="true" />
                        </span>
                        <div>
                            <p className="font-semibold text-white">Unlimited Applications</p>
                            <p className="mt-1 text-sm text-[#a1a4aa]">
                                Apply to as many jobs as you want — no monthly limits.
                            </p>
                        </div>
                    </div>

                    <dl className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <dt className="text-[#a1a4aa]">Unlimited Applications (one-time)</dt>
                            <dd className="text-white">${PRICE.toFixed(2)}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-[#a1a4aa]">Taxes</dt>
                            <dd className="text-white">$0.00</dd>
                        </div>
                        <div className="border-t border-white/10 pt-3">
                            <div className="flex justify-between text-base font-semibold">
                                <dt className="text-white">Total due today</dt>
                                <dd className="text-white">${PRICE.toFixed(2)}</dd>
                            </div>
                        </div>
                    </dl>

                    <div className="mt-6 flex items-start gap-2 text-xs text-[#a1a4aa]">
                        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#8a83ff]" aria-hidden="true" />
                        Payments are processed securely. Your card details are never stored on our servers.
                    </div>
                </section>

                {/* Payment form */}
                <section className="rounded-2xl border border-white/10 bg-[#1a1a1f] p-6 sm:p-8">
                    <div className="mb-6 flex items-center gap-2">
                        <CreditCard className="size-5 text-[#8a83ff]" aria-hidden="true" />
                        <h2 className="text-lg font-semibold text-white">Payment information</h2>
                    </div>

                    <form action="/api/checkout_sessions" method="POST">
                        <section>
                            <Button
                                type="submit"
                                role="link"
                                variant="brand"
                                className="mt-2 h-12 w-full rounded-xl text-base font-medium"
                            >
                                Checkout
                                Pay ${PRICE.toFixed(2)}
                            </Button>
                        </section>
                    </form>
                </section>
            </div>
        </main>
    );
}
