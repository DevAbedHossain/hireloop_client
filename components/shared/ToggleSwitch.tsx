"use client"

import { useId } from "react"

/** Switch-style checkbox with title + optional description. */
export function ToggleSwitch({
    checked,
    onCheckedChange,
    label,
    description,
}: {
    checked: boolean
    onCheckedChange: (checked: boolean) => void
    label: string
    description?: string
}) {
    const id = useId()

    return (
        <label htmlFor={id} className="flex cursor-pointer items-center gap-3">
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={(e) => onCheckedChange(e.target.checked)}
                className="peer sr-only"
            />
            <span
                aria-hidden="true"
                className="relative h-6 w-11 shrink-0 rounded-full bg-[#1b1b1e] transition-colors after:absolute after:left-1 after:top-1 after:size-4 after:rounded-full after:bg-white after:transition-transform peer-checked:bg-[#5c53fe] peer-checked:after:translate-x-5"
            />
            <span>
                <span className="block text-sm font-medium text-white">{label}</span>
                {description && (
                    <span className="block text-sm text-[#a1a4aa]">{description}</span>
                )}
            </span>
        </label>
    )
}
