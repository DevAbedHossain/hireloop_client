import type { LucideIcon } from "lucide-react"

import { cn } from "cn"

const labelClasses = "block text-sm font-medium text-white"

/** Wraps a control with its label.
 *  Pass `id` to render a real <label> (required for inputs/textareas),
 *  or omit it to render a plain <span> for non-labelledby content.
 *  `badge` renders a small pill hint next to the label (e.g. "Required"). */
export function FormField({
    id,
    label,
    required,
    badge,
    className,
    children,
}: {
    id?: string
    label: React.ReactNode
    required?: boolean
    badge?: string
    className?: string
    children: React.ReactNode
}) {
    return (
        <div className={className}>
            <div className="mb-2 flex items-center gap-2">
                {id ? (
                    <label htmlFor={id} className={labelClasses}>
                        {label}
                        {required && <span aria-hidden="true"> *</span>}
                    </label>
                ) : (
                    <span className={labelClasses}>{label}</span>
                )}
                {badge && (
                    <span className="rounded-full border border-white/15 px-2 py-0.5 text-xs text-[#a1a4aa]">
                        {badge}
                    </span>
                )}
            </div>
            {children}
        </div>
    )
}

/** Positions a leading icon inside a relative wrapper.
 *  Prefer passing it an `<Input className="pl-10" />` or icon-padded control. */
export function IconField({
    icon: Icon,
    className,
    children,
}: {
    icon: LucideIcon
    className?: string
    children: React.ReactNode
}) {
    return (
        <div className={cn("relative", className)}>
            <Icon
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/60"
            />
            {children}
        </div>
    )
}
