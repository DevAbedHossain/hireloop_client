"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField } from "@/components/shared/FormField"
import { PasswordInput } from "@/components/shared/PasswordInput"
import { GoogleButton } from "@/components/shared/GoogleButton"
import { FormBanner } from "@/components/shared/FormBanner"
import { AuthPage, OrDivider } from "@/components/shared/AuthPage"
import { authClient } from "@/lib/auth-client"
import type { AuthError } from "@/types"

export function SignInForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AuthError>(null)

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/";

  console.log("redirectTo", redirectTo)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe,
      callbackURL: redirectTo,
    })
    setLoading(false)
    if (error) {
      setError(error)
      return
    }
    router.push(redirectTo)
    router.refresh()
  }

  async function onGoogle() {
    setError(null)
    setLoading(true)
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectTo,
    })
    if (error) {
      setLoading(false)
      setError(error)
    }
  }

  return (
    <AuthPage
      title="Welcome back"
      subtitle="Sign in to continue to HireLoop"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-[#8a83ff] hover:underline">
            Sign Up
          </Link>
        </>
      }
    >
      <GoogleButton onClick={onGoogle} disabled={loading} />

      <OrDivider />

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            aria-invalid={!!error}
          />
        </FormField>

        <div className="flex items-center">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-white/80">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="size-4 cursor-pointer accent-[#5c53fe]"
            />
            Remember me
          </label>
        </div>

        {error && (
          <FormBanner tone="destructive">
            {error.message || "Invalid email or password"}
          </FormBanner>
        )}

        <Button
          type="submit"
          variant="brand"
          disabled={loading}
          className="h-12 w-full rounded-xl text-base font-medium"
        >
          {loading && <LoaderCircle className="size-5 animate-spin" />}
          Sign In
        </Button>
      </form>
    </AuthPage>
  )
}
