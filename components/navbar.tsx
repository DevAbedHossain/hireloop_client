"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu as MenuIcon, X as XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "cn"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="relative mx-2 flex h-17 items-center justify-between rounded-lg border border-white/[0.07] bg-[#1a1a1f] px-6">
      <Link href="/" className="flex h-11 shrink-0 items-center">
        <Image
          src="/logo.png"
          alt="HireLoop"
          width={154}
          height={44}
          priority
          className="h-11 w-auto"
        />
      </Link>

      {/* Desktop: inline links + divider + actions */}
      <DesktopNav />

      {/* Mobile / tablet: hamburger + dropdown (Figma "HL/Menu") */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="size-icon-lg -mr-2 text-[#ededeb] hover:bg-white/5"
        >
          {menuOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </Button>

        {menuOpen && (
          <div
            id="navbar-menu"
            className="absolute top-[calc(100%+0.5rem)] right-2 left-2 z-50 rounded-xl bg-[#33333a] p-1.5 shadow-lg md:hidden"
          >
            <nav aria-label="Main mobile" className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex h-9 items-center rounded-md px-2.5 text-sm text-[#ededeb] transition-colors hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
              <div aria-hidden="true" className="mx-2.5 my-1.5 h-px bg-[#a8a8a8]/40" />
              <Button
                variant="ghost"
                className="h-9 justify-start rounded-md text-sm font-semibold text-[#645bff] hover:bg-white/5 hover:text-[#645bff]"
              >
                Sign In
              </Button>
              <Button
                variant="ghost"
                className="mt-1 h-9 rounded-md bg-[#5c53fe] text-sm text-[#ededeb] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#4b43e0] hover:text-white"
              >
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

function DesktopNav() {
  return (
    <nav aria-label="Main" className="flex items-center max-md:hidden">
      <ul className="flex items-center gap-5">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-base leading-[1.8] tracking-[-0.2px] text-[#ededeb] transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <span aria-hidden="true" className="mx-6 h-6 w-px bg-[#a8a8a8]/40" />

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="h-10 rounded-lg px-4 text-lg font-semibold text-[#645bff] hover:bg-white/5 hover:text-[#645bff] focus-visible:text-[#645bff]"
        >
          Sign In
        </Button>
        <Button
          variant="ghost"
          className="h-10 rounded-lg border border-[#090a15]/10 bg-[#5c53fe] px-5 text-lg text-[#ededeb] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#4b43e0] hover:text-white"
        >
          Get Started
        </Button>
      </div>
    </nav>
  )
}
