"use client";

import Link from "next/link";
import { useState } from "react";
import {
    ArrowLeft,
    CreditCard,
    Infinity as InfinityIcon,
    LoaderCircle,
    LockKeyhole,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/shared/FormField";
import { toast } from "@/components/ui/toast";

const PRICE = 29.0;

const formatCardNumber = (value: string) =>
    value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(\d{4})(?=\d)/g, "$1 ");

const formatExpiry = (value: string) =>
    value
        .replace(/\D/g, "")
        .slice(0, 4)
        .replace(/^(\d{2})(?=\d)/, "$1/");

export default function CheckoutPage() {
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        const digits = cardNumber.replace(/\D/g, "");
        if (digits.length < 13) {
            toast.add({ type: "error", title: "Invalid card", description: "Please enter a valid card number." });
            return;
        }
        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            toast.add({ type: "error", title: "Invalid expiry", description: "Expiry must be in MM/YY format." });
            return;
        }
        if (cvc.replace(/\D/g, "").length < 3) {
            toast.add({ type: "error", title: "Invalid CVC", description: "Please enter a valid CVC." });
            return;
        }

        setLoading(true);

        // TODO: Replace with a Stripe Checkout flow — call the backend to
        // create a Checkout Session, then redirect the user to
        // `session.url` (the hosted Stripe payment page).
        await new Promise((resolve) => setTimeout(resolve, 800));

        setLoading(false);
        toast.add({
            type: "info",
            title: "Stripe Checkout coming soon",
            description: "This button will redirect you to Stripe to complete the payment.",
        });
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

                    <form onSubmit={onSubmit} className="flex flex-col gap-5">
                        <FormField id="cardName" label="Name on card" required>
                            <Input
                                id="cardName"
                                type="text"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                placeholder="John Carter"
                                autoComplete="cc-name"
                                required
                                className="text-white"
                            />
                        </FormField>

                        <FormField id="cardNumber" label="Card number" required>
                            <Input
                                id="cardNumber"
                                type="text"
                                inputMode="numeric"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                placeholder="1234 5678 9012 3456"
                                autoComplete="cc-number"
                                required
                                className="text-white"
                            />
                        </FormField>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField id="expiry" label="Expiry" required>
                                <Input
                                    id="expiry"
                                    type="text"
                                    inputMode="numeric"
                                    value={expiry}
                                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                    placeholder="MM/YY"
                                    autoComplete="cc-exp"
                                    required
                                    className="text-white"
                                />
                            </FormField>

                            <FormField id="cvc" label="CVC" required>
                                <Input
                                    id="cvc"
                                    type="text"
                                    inputMode="numeric"
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                    placeholder="123"
                                    autoComplete="cc-csc"
                                    required
                                    className="text-white"
                                />
                            </FormField>
                        </div>

                        <Button
                            type="submit"
                            variant="brand"
                            disabled={loading}
                            className="mt-2 h-12 w-full rounded-xl text-base font-medium"
                        >
                            {loading ? (
                                <LoaderCircle className="size-5 animate-spin" />
                            ) : (
                                <LockKeyhole data-icon="inline-start" aria-hidden="true" />
                            )}
                            Pay ${PRICE.toFixed(2)}
                        </Button>

                        <p className="flex items-center justify-center gap-1.5 text-xs text-[#a1a4aa]">
                            <Sparkles className="size-3.5 text-[#8a83ff]" aria-hidden="true" />
                            You&apos;ll be redirected to Stripe to complete your purchase securely.
                        </p>
                    </form>
                </section>
            </div>
        </main>
    );
}
