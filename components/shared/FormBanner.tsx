import { cn } from "cn"

const toneClasses = {
    info: "border-[#5c53fe]/30 bg-[#5c53fe]/10 text-[#8a83ff]",
    destructive: "border-destructive/30 bg-destructive/10 text-destructive",
} as const

/** Inline feedback strip for forms ("job posted" / validation errors). */
export function FormBanner({
    tone = "info",
    children,
}: {
    tone?: keyof typeof toneClasses
    children: React.ReactNode
}) {
    return (
        <p
            role={tone === "destructive" ? "alert" : undefined}
            className={cn("rounded-lg border px-4 py-3 text-sm", toneClasses[tone])}
        >
            {children}
        </p>
    )
}
