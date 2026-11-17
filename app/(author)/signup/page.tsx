"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { LoaderCircle, Briefcase, UserSearch } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField } from "@/components/shared/FormField"
import { PasswordInput } from "@/components/shared/PasswordInput"
import { GoogleButton } from "@/components/shared/GoogleButton"
import { FormBanner } from "@/components/shared/FormBanner"
import { AuthPage, OrDivider } from "@/components/shared/AuthPage"
import { SegmentedRadioGroup } from "@/components/shared/SegmentedRadioGroup"
import { authClient } from "@/lib/auth-client"
import type { AuthError, Role } from "@/types"

const ROLES = [
    { value: "seeker", label: "Job Seeker", icon: UserSearch },
    { value: "recruiter", label: "Recruiter", icon: Briefcase },
] satisfies { value: Role; label: string; icon: typeof UserSearch }[]

export default function SignUpPage() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState<File | null>(null)
    const [role, setRole] = useState<Role>("seeker")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<AuthError>(null)

    // The upload itself is handled separately — this only picks the file.
    function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        setImage(file ?? null)
    }

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

    return (
        <AuthPage
            title="Create your account"
            subtitle="Start finding your dream job with HireLoop"
            footer={
                <>
                    Already have an account?{" "}
                    <Link href="/signin" className="font-semibold text-[#8a83ff] hover:underline">
                        Sign In
                    </Link>
                </>
            }
        >
            <GoogleButton onClick={onGoogle} disabled={loading} />

            <OrDivider />

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <FormField id="name" label="Full name">
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
                </FormField>

                <FormField id="email" label="Email">
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
                </FormField>

                <FormField id="password" label="Password">
                    <PasswordInput
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 8 characters"
                        autoComplete="new-password"
                        minLength={8}
                        required
                        aria-invalid={!!error}
                    />
                </FormField>

                <FormField id="image" label="Profile image" badge="Optional">
                    <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={onImageChange}
                        className="text-white file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#5c53fe] file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:border-[#5c53fe]"
                    />
                </FormField>

                <SegmentedRadioGroup
                    label="I am a"
                    value={role}
                    onValueChange={setRole}
                    options={ROLES}
                    className="grid-cols-2"
                />

                {error && (
                    <FormBanner tone="destructive">
                        {error.message || "Something went wrong"}
                    </FormBanner>
                )}

                <Button
                    type="submit"
                    variant="brand"
                    disabled={loading}
                    className="h-12 w-full rounded-xl text-base font-medium"
                >
                    {loading && <LoaderCircle className="size-5 animate-spin" />}
                    Sign Up
                </Button>
            </form>
        </AuthPage>
    )
}
