import { Suspense } from "react"

import { SignInForm } from "./SignInForm"

// useSearchParams() in SignInForm requires a Suspense boundary so the page
// can be statically prerendered without a client-side rendering bailout.
export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  )
}
