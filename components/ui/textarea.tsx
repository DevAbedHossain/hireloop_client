import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "cn"

const textareaVariants = cva(
  "w-full min-h-24 rounded-xl border border-white/20 bg-[#101010] px-4 py-3 text-base text-white transition-all outline-none placeholder:text-white/60 focus-visible:border-[#5c53fe] focus-visible:ring-3 focus-visible:ring-[#5c53fe]/30 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/30",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Textarea({ className, variant, ...props }: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }
