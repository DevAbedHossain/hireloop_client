import Link from "next/link";
import { redirect } from "next/navigation";
import {
    ArrowLeft,
    BadgeCheck,
    CalendarDays,
    CheckCircle2,
    CreditCard,
    Infinity as InfinityIcon,
    Mail,
    ReceiptText,
    Wallet,
} from "lucide-react";

import { CopyTransactionId } from "@/components/checkout/copy-transaction-id";
import { buttonVariants } from "@/components/ui/button";
import { checkoutVerify } from "@/lib/actions/payments";
import { stripe } from "@/lib/stripe";

const detailRow = "flex items-center justify-between gap-4 py-3";
const detailLabel = "flex items-center gap-2 text-sm text-[#a1a4aa]";
const detailValue = "text-sm font-medium text-white";

export default async function Success({
    searchParams
}: {
    searchParams: Promise<{ session_id?: string }>
}) {
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    if (session.status === 'open') {
        return redirect('/')
    }

    if (session.status !== 'complete' || session.payment_status !== "paid") {
        return redirect('/checkout')
    }

    const { customer_email, customer_details, payment_intent, line_items } = session;

    // Expanded fields come back as objects (not ids) — narrow them for TS.
    const paymentIntent = typeof payment_intent === "string" ? null : payment_intent;
    const firstLineItem = line_items?.data?.[0];

    const email = customer_email ?? customer_details?.email;
    const transactionId = paymentIntent?.id ?? session.id;
    const amount = (firstLineItem?.amount_total ?? paymentIntent?.amount_received ?? session.amount_total ?? 0) / 100;
    const currency = (firstLineItem?.currency ?? paymentIntent?.currency ?? "usd").toUpperCase();
    const paymentMethod = paymentIntent?.payment_method_types?.[0];
    const planName = firstLineItem?.description ?? "Unlimited Applications";
    const paymentDate = paymentIntent?.created
        ? new Date(paymentIntent.created * 1000).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
        : null;

    // Backend records the payment & upgrades the account. The page should
    // still render even if this fails, so errors are swallowed here.
    try {
        await checkoutVerify(session_id);
    } catch (err) {
        console.error("Payment verification failed:", err);
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

            <div className="mx-auto w-full max-w-xl">
                {/* Success banner */}
                <section className="rounded-2xl border border-white/10 bg-[#1a1a1f] p-6 text-center sm:p-8">
                    <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500/15 ring-4 ring-emerald-500/10">
                        <CheckCircle2 className="size-7 text-emerald-500" aria-hidden="true" />
                    </span>
                    <h1 className="mt-5 text-2xl font-semibold [font-family:var(--font-manrope)] text-white sm:text-3xl">
                        Payment successful!
                    </h1>
                    <p className="mt-2 text-sm text-[#a1a4aa] sm:text-base">
                        {email
                            ? <>A confirmation email has been sent to <span className="text-white">{email}</span>.</>
                            : "Thanks for your business!"}
                        {" "}If you have any questions, email{" "}
                        <a
                            href="mailto:orders@example.com"
                            className="text-[#8a83ff] underline-offset-4 hover:underline"
                        >
                            orders@example.com
                        </a>
                        .
                    </p>
                </section>

                {/* Payment details */}
                <section className="mt-4 rounded-2xl border border-white/10 bg-[#1a1a1f] p-6 sm:p-8">
                    <div className="mb-4 flex items-center gap-2">
                        <ReceiptText className="size-5 text-[#8a83ff]" aria-hidden="true" />
                        <h2 className="text-lg font-semibold text-white">Payment details</h2>
                    </div>

                    <dl className="divide-y divide-white/5">
                        <div className={detailRow}>
                            <dt className={detailLabel}>
                                <BadgeCheck className="size-4 shrink-0" aria-hidden="true" />
                                Transaction ID
                            </dt>
                            <dd>
                                <CopyTransactionId id={transactionId} />
                            </dd>
                        </div>

                        <div className={detailRow}>
                            <dt className={detailLabel}>
                                <Wallet className="size-4 shrink-0" aria-hidden="true" />
                                Amount paid
                            </dt>
                            <dd className={detailValue}>
                                ${amount.toFixed(2)} {currency}
                            </dd>
                        </div>

                        <div className={detailRow}>
                            <dt className={detailLabel}>
                                <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
                                Date
                            </dt>
                            <dd className={detailValue}>{paymentDate ?? "—"}</dd>
                        </div>

                        <div className={detailRow}>
                            <dt className={detailLabel}>
                                <CreditCard className="size-4 shrink-0" aria-hidden="true" />
                                Payment method
                            </dt>
                            <dd className={detailValue}>
                                {paymentMethod
                                    ? paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)
                                    : "—"}
                            </dd>
                        </div>

                        <div className={detailRow}>
                            <dt className={detailLabel}>
                                <Mail className="size-4 shrink-0" aria-hidden="true" />
                                Billing email
                            </dt>
                            <dd className={`${detailValue} truncate`}>{email ?? "—"}</dd>
                        </div>
                    </dl>
                </section>

                {/* Plan unlocked */}
                <div className="mt-4 flex items-start gap-4 rounded-xl border border-[#5c53fe]/30 bg-[#5c53fe]/10 p-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#5c53fe] text-white">
                        <InfinityIcon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                        <p className="font-semibold text-white">{planName} unlocked</p>
                        <p className="mt-1 text-sm text-[#a1a4aa]">
                            Your application limit has been lifted — apply to as many jobs as you want.
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link
                        href="/browse-jobs"
                        className={buttonVariants({
                            variant: "brand",
                            size: "lg",
                            className: "h-12 rounded-xl px-6 text-base font-medium",
                        })}
                    >
                        Browse jobs
                    </Link>
                    <Link
                        href="/dashboard"
                        className={buttonVariants({
                            variant: "outline",
                            size: "lg",
                            className: "h-12 rounded-xl border-white/10 bg-[#1a1a1f] px-6 text-base font-medium text-white hover:text-white",
                        })}
                    >
                        Go to dashboard
                    </Link>
                </div>
            </div>
        </main>
    );
}
