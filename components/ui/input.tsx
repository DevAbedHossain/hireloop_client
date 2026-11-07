import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "cn"

const inputVariants = cva(
  "h-12 w-full rounded-xl border border-white/20 bg-[#101010] px-4 text-base text-white transition-all outline-none placeholder:text-white/60 focus-visible:border-[#5c53fe] focus-visible:ring-3 focus-visible:ring-[#5c53fe]/30 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/30",
  {
    variants: {
      variant: {
        default: "",
        password: "pr-12",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Input({ className, variant, type, ...props }: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Input, inputVariants }
