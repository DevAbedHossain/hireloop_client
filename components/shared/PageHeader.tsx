import Link from "next/link"
import { ChevronRight } from "lucide-react"

export type BreadcrumbItem = {
    label: string
    href?: string
}

/** Page heading block: optional breadcrumb, title + description, and an action slot.
 *  `title` accepts a node so status badges can render beside the heading text. */
export function PageHeader({
    breadcrumb,
    title,
    description,
    action,
}: {
    breadcrumb?: BreadcrumbItem[]
    title: React.ReactNode
    description?: string
    action?: React.ReactNode
}) {
    return (
        <>
            {breadcrumb && breadcrumb.length > 0 && (
                <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-[#a1a4aa]">
                    {breadcrumb.map((item, index) => {
                        const current = index === breadcrumb.length - 1
                        return (
                            <span key={`${item.label}-${index}`} className="flex items-center gap-1">
                                {index > 0 && <ChevronRight className="size-4" aria-hidden="true" />}
                                {item.href && !current ? (
                                    <Link href={item.href} className="transition-colors hover:text-white">
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className={current ? "text-white" : undefined}>{item.label}</span>
                                )}
                            </span>
                        )
                    })}
                </nav>
            )}

            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="flex flex-wrap items-center gap-3 text-2xl font-semibold [font-family:var(--font-manrope)] text-white">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-1 text-sm text-[#a1a4aa]">{description}</p>
                    )}
                </div>
                {action}
            </div>
        </>
    )
}
