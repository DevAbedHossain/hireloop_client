"use client"

import { ChevronDown } from "lucide-react"

import { FormField } from "@/components/shared/FormField"
import { cn } from "cn"

/** Labelled native <select> styled to match <Input> (chevron + placeholder tone). */
export function SelectField({
    id,
    label,
    value,
    onChange,
    options,
    placeholder,
    required,
    className,
}: {
    id: string
    label: React.ReactNode
    value: string
    onChange: (value: string) => void
    options: readonly string[]
    /** Renders an extra disabled empty option behind this text. */
    placeholder?: string
    required?: boolean
    className?: string
}) {
    return (
        <FormField id={id} label={label} required={required} className={className}>
            <div className="relative">
                <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-white/60"
                />
                <select
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required={required}
                    className={cn(
                        "h-12 w-full appearance-none rounded-xl border border-white/20 bg-[#101010] px-4 pr-10 text-base text-white outline-none transition-all focus-visible:border-[#5c53fe] focus-visible:ring-3 focus-visible:ring-[#5c53fe]/30",
                        value === "" && "text-white/60"
                    )}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </FormField>
    )
}
