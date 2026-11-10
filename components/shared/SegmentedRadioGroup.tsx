"use client"

import { useId } from "react"
import type { LucideIcon } from "lucide-react"

import { cn } from "cn"

export type SegmentedRadioOption<T extends string> = {
    value: T
    label: string
    icon?: LucideIcon
}

/** Pill-style single-select radio group (job type, account role, …).
 *  `className` only needs the grid columns, e.g. "grid-cols-2 sm:grid-cols-4". */
export function SegmentedRadioGroup<T extends string>({
    label,
    required,
    value,
    onValueChange,
    options,
    className,
}: {
    label?: string
    required?: boolean
    value: T
    onValueChange: (value: T) => void
    options: readonly SegmentedRadioOption<T>[]
    className?: string
}) {
    const labelId = useId()

    return (
        <div>
            {label && (
                <span className="mb-2 block text-sm font-medium text-white" id={labelId}>
                    {label}
                    {required && <span aria-hidden="true"> *</span>}
                </span>
            )}
            <div
                role="radiogroup"
                aria-labelledby={label ? labelId : undefined}
                className={cn("grid grid-cols-2 gap-2", className)}
            >
                {options.map(({ value: optionValue, label: optionLabel, icon: Icon }) => {
                    const selected = value === optionValue
                    return (
                        <button
                            key={optionValue}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => onValueChange(optionValue)}
                            className={cn(
                                "flex h-11 flex-col items-center justify-center gap-1 rounded-lg border px-2 text-sm font-medium transition-all sm:flex-row sm:gap-2",
                                selected
                                    ? "border-[#5c53fe] bg-[#5c53fe] text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)]"
                                    : "border-white/20 bg-[#101010] text-white hover:bg-[#1b1b1e]"
                            )}
                        >
                            {Icon && <Icon className="size-4" aria-hidden="true" />}
                            {optionLabel}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
