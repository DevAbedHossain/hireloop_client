"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { Input } from "@/components/ui/input"
import { cn } from "cn"

/** Password <Input> with the show/hide visibility toggle. */
export function PasswordInput({
    className,
    ...props
}: Omit<React.ComponentProps<typeof Input>, "type" | "variant">) {
    const [visible, setVisible] = useState(false)

    return (
        <div className="relative">
            <Input
                type={visible ? "text" : "password"}
                variant="password"
                className={cn("text-white", className)}
                {...props}
            />
            <button
                type="button"
                onClick={() => setVisible((prev) => !prev)}
                aria-label={visible ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-white/60 transition-colors hover:text-white"
            >
                {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
        </div>
    )
}
