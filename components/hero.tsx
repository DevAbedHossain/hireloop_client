import Image from "next/image"
import Link from "next/link"
import { MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"

const trendingPositions = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-68px)] flex-col px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24">
      <div className="mx-auto flex w-full max-w-[784px] flex-col items-center text-center">
        {/* Stats badge (Figma "Frame 2147234462" — Space Mono pill, flanked by lines) */}
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="hidden h-px w-16 bg-gradient-to-r from-transparent to-white/20 sm:block" />
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#222228] px-6 py-3 shadow-[inset_0_0_6px_6px_rgba(0,0,0,0.1)]">
            <span aria-hidden="true" className="text-lg leading-none">
              💼
            </span>
            <p className="[font-family:var(--font-space-mono)] text-sm uppercase text-white sm:text-base lg:text-[20px] lg:leading-[1.2]">
              <span className="font-bold">50,000+</span>{" "}
              <span className="opacity-70">new jobs this month</span>
            </p>
          </div>
          <span aria-hidden="true" className="hidden h-px w-16 bg-gradient-to-l from-transparent to-white/20 sm:block" />
        </div>

        {/* Title block (Figma "Hero Section Title" — Manrope Bold 56/1.15/-2, sub 20/1.6/70%) */}
        <div className="mt-8 flex flex-col gap-4 sm:mt-12">
          <h1 className="[font-family:var(--font-manrope)] text-4xl font-bold text-white sm:text-5xl lg:text-[56px] lg:leading-[1.15] lg:tracking-[-2px]">
            Find Your Dream Job Today
          </h1>
          <p className="mx-auto max-w-2xl text-base [font-family:var(--font-manrope)] text-white opacity-70 sm:text-lg lg:text-[20px] lg:leading-[1.6]">
            HireLoop connects top talent with world-class companies. Browse thousands of curated
            opportunities and land your next role — faster.
          </p>
        </div>

        {/* Search bar (Figma "Frame 1" — 784x64, #101010, r16, border white/20) */}
        <form className="mt-12 flex w-full flex-col gap-3 rounded-2xl border border-white/20 bg-[#101010] p-3 sm:h-16 sm:flex-row sm:items-center sm:p-0 sm:pl-6">
          <label className="flex min-w-0 flex-1 items-center gap-2 p-2 sm:p-0">
            <Search aria-hidden="true" className="size-5 shrink-0 text-white/80" />
            <input
              type="text"
              name="query"
              placeholder="Job title, skill or company"
              className="w-full bg-transparent text-base text-white outline-none [font-family:var(--font-manrope)] placeholder:text-white/80"
            />
          </label>

          <span aria-hidden="true" className="hidden h-6 w-px bg-white/20 sm:block" />

          <label className="flex min-w-0 flex-1 items-center gap-2 p-2 sm:p-0">
            <MapPin aria-hidden="true" className="size-5 shrink-0 text-white/80" />
            <input
              type="text"
              name="location"
              placeholder="Location or Remote"
              className="w-full bg-transparent text-base text-white outline-none [font-family:var(--font-manrope)] placeholder:text-white/80"
            />
          </label>

          <Button
            type="submit"
            aria-label="Search"
            className="h-12 w-full shrink-0 rounded-xl bg-[#5c53fe] text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#4b43e0] sm:m-2 sm:size-12 sm:w-12 sm:p-0"
          >
            <Search className="size-5" />
          </Button>
        </form>

        {/* Trending chips (Figma "Frame 2147234453" — pills r24, #1A1A1B, border white/10) */}
        <div className="mt-6 flex flex-col items-center gap-4 sm:mt-6 sm:flex-row sm:gap-4">
          <p className="text-base [font-family:var(--font-manrope)] text-white opacity-70">
            Trending Position
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {trendingPositions.map((position) => (
              <li key={position}>
                <Link
                  href="/jobs"
                  className="inline-flex items-center rounded-full border border-white/10 bg-[#1a1a1b] px-3 py-1.5 text-sm [font-family:var(--font-manrope)] text-white transition-colors hover:border-white/25"
                >
                  {position}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Globe (Figma "Group 1" — CSS sphere + real starfield from the design file) */}
      <div className="relative mt-10 h-[440px] w-full overflow-hidden sm:h-[500px] lg:h-[600px]">
        <Image
          src="/globe-stars.png"
          alt=""
          aria-hidden="true"
          width={1180}
          height={731}
          className="pointer-events-none absolute inset-x-0 top-0 mx-auto w-[92%] max-w-[760px] opacity-90 sm:max-w-[900px] lg:-top-6 lg:max-w-[1100px]"
        />

        {/* purple bloom behind the horizon */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[40%] h-[280px] w-[1000px] max-w-[95vw] -translate-x-1/2 rounded-full bg-[#5c53fe]/30 blur-3xl"
        />

        {/* sphere */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[46%] aspect-square w-[340vw] -translate-x-1/2 rounded-full shadow-[0_0_70px_10px_rgba(99,92,255,0.5),0_0_160px_50px_rgba(92,83,254,0.25)] sm:w-[260vw] lg:top-[44%] lg:w-[1400px]"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, #7d75ff 0%, #5c53fe 5%, #3a356f 12%, #26244a 22%, #1a1a28 34%, #131320 50%, #101016 68%, #0c0c0e 100%)",
          }}
        />

        <p className="absolute inset-x-6 bottom-2 z-10 mx-auto max-w-[600px] text-center text-2xl font-medium [font-family:var(--font-manrope)] text-white sm:text-3xl lg:bottom-6 lg:text-[40px] lg:leading-[1.3] lg:tracking-[-1px]">
          Assisting over 15,000 job seekers find their dream positions.
        </p>
      </div>
    </section>
  )
}
