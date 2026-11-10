"use client"

import { Button } from "@/components/ui/button"

export function GoogleIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
            <path
                fill="#4285F4"
                d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.47a5.54 5.54 0 0 1-2.4 3.63v3.02h3.89c2.27-2.1 3.56-5.17 3.56-8.84Z"
            />
            <path
                fill="#34A853"
                d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.89-3.02c-1.08.72-2.46 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.29v3.1A12 12 0 0 0 12 24Z"
            />
            <path
                fill="#FBBC05"
                d="M5.29 14.28A7.2 7.2 0 0 1 4.91 12c0-.79.14-1.56.38-2.28V6.63H1.29a12 12 0 0 0 0 10.74l4-3.09Z"
            />
            <path
                fill="#EA4335"
                d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.44-3.44A11.48 11.48 0 0 0 12 0 12 12 0 0 0 1.29 6.63l4 3.09C6.23 6.88 8.88 4.77 12 4.77Z"
            />
        </svg>
    )
}

/** "Continue with Google" button — identical on the sign-in and sign-up pages. */
export function GoogleButton({
    onClick,
    disabled,
}: {
    onClick: () => void
    disabled?: boolean
}) {
    return (
        <Button
            variant="ghost"
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="h-12 w-full rounded-xl border border-white/10 bg-[#1a1a1b] text-base text-white hover:bg-[#222228] hover:text-white"
        >
            <GoogleIcon />
            Continue with Google
        </Button>
    )
}
