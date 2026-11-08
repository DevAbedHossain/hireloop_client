"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Eye, EyeOff, LoaderCircle, ShieldCheck, Briefcase, UserSearch } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"

type AuthError = { message?: string } | null

const ROLES = [
    { value: "seeker", label: "Job Seeker", icon: UserSearch },
    { value: "recruiter", label: "Recruiter", icon: Briefcase },
    { value: "admin", label: "Admin", icon: ShieldCheck },
] as const

type Role = (typeof ROLES)[number]["value"]

function GoogleIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
            <path
                fill="#4285F4"
                d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.47a5.54 5.54 0 0 1-2.4 3.63v3.02h3.89c2.27-2.1 3.56-5.17 3.56-8.84Z"
            />
            <path
                fill="#34A853"
                d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.89-3.02c-1.08.72-2.46 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.29v3.1A12 12 0 0 0 12 24Z"
            />
            <path
                fill="#FBBC05"
                d="M5.29 14.28A7.2 7.2 0 0 1 4.91 12c0-.79.14-1.56.38-2.28V6.63H1.29a12 12 0 0 0 0 10.74l4-3.09Z"
            />
            <path
                fill="#EA4335"
                d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.44-3.44A11.48 11.48 0 0 0 12 0 12 12 0 0 0 1.29 6.63l4 3.09C6.23 6.88 8.88 4.77 12 4.77Z"
            />
        </svg>
    )
}

export default function SignUpPage() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState<Role>("seeker")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<AuthError>(null)

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setLoading(true)
        const { error } = await authClient.signUp.email({
            name,
            email,
            password,
            role,
            callbackURL: "/",
        })
        setLoading(false)
        if (error) {
            setError(error)
            return
        }
        // Better Auth signs the new user in automatically
        router.push("/")
        router.refresh()
    }

    async function onGoogle() {
        setError(null)
        setLoading(true)
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        })
        if (error) {
            setLoading(false)
            setError(error)
        }
    }

    const inputLabel = "mb-2 block text-sm font-medium text-white"
    const inputWrapper = "relative"

    return (
        <main className="flex min-h-[calc(100svh-68px)] items-center justify-center px-4 py-16 lg:px-8">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="[font-family:var(--font-manrope)] text-3xl font-bold text-white sm:text-4xl">
                        Create your account
                    </h1>
                    <p className="mt-2 text-base text-white opacity-70">
                        Start finding your dream job with HireLoop
                    </p>
                </div>

                <Button
                    variant="ghost"
                    type="button"
                    onClick={onGoogle}
                    disabled={loading}
                    className="h-12 w-full rounded-xl border border-white/10 bg-[#1a1a1b] text-base text-white hover:bg-[#222228] hover:text-white"
                >
                    <GoogleIcon />
                    Continue with Google
                </Button>

                <div className="my-6 flex items-center gap-4">
                    <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
                    <span className="text-sm text-white/50">or</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
                </div>

                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="name" className={inputLabel}>
                            Full name
                        </label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Carter"
                            autoComplete="name"
                            required
                            aria-invalid={!!error}
                            className="text-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className={inputLabel}>
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            aria-invalid={!!error}
                            className="text-white"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className={inputLabel}>
                            Password
                        </label>
                        <div className={inputWrapper}>
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="At least 8 characters"
                                autoComplete="new-password"
                                minLength={8}
                                required
                                aria-invalid={!!error}
                                variant="password"
                                className="text-white"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-white/60 transition-colors hover:text-white"
                            >
                                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <span className={inputLabel}>I am a</span>
                        <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Account type">
                            {ROLES.map(({ value, label, icon: Icon }) => {
                                const selected = role === value
                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        role="radio"
                                        aria-checked={selected}
                                        onClick={() => setRole(value)}
                                        className={`flex h-11 flex-col items-center justify-center gap-1 rounded-xl border px-2 text-sm font-medium transition-all sm:flex-row sm:gap-2 ${selected
                                                ? "border-[#5c53fe] bg-[#5c53fe] text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)]"
                                                : "border-white/20 bg-[#1a1a1f] text-white hover:bg-[#222228]"
                                            }`}
                                    >
                                        <Icon className="size-4" aria-hidden="true" />
                                        {label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {error && (
                        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                            {error.message || "Something went wrong"}
                        </p>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="h-12 w-full rounded-xl bg-[#5c53fe] text-base font-medium text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#4b43e0]"
                    >
                        {loading && <LoaderCircle className="size-5 animate-spin" />}
                        Sign Up
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-white/70">
                    Already have an account?{" "}
                    <Link href="/signin" className="font-semibold text-[#8a83ff] hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </main>
    )
}
