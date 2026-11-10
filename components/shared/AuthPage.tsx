/** Shared shell for the sign-in / sign-up pages: centered card, heading,
 *  "or" divider, and a footer swap link. */
export function AuthPage({
    title,
    subtitle,
    footer,
    children,
}: {
    title: string
    subtitle: string
    /** e.g. "Already have an account? Sign In" */
    footer: React.ReactNode
    children: React.ReactNode
}) {
    return (
        <main className="flex min-h-[calc(100svh-68px)] items-center justify-center px-4 py-16 lg:px-8">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="[font-family:var(--font-manrope)] text-3xl font-bold text-white sm:text-4xl">
                        {title}
                    </h1>
                    <p className="mt-2 text-base text-white opacity-70">{subtitle}</p>
                </div>

                {children}

                <p className="mt-6 text-center text-sm text-white/70">{footer}</p>
            </div>
        </main>
    )
}

/** Divider with the "or" label between the social button and the form. */
export function OrDivider() {
    return (
        <div className="my-6 flex items-center gap-4">
            <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
            <span className="text-sm text-white/50">or</span>
            <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
        </div>
    )
}

