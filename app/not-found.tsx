"use client";
import Link from "next/link";
import FuzzyText from "@/components/FuzzyText";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-primary text-white">
      <main className="flex flex-1 flex-col items-center justify-center text-center">
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.5}
          enableHover
          fontSize={100}
          color="#ffffff"
        >
          404
        </FuzzyText>
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.5}
          enableHover
          fontSize={50}
          color="#ffffff"
        >
          not found
        </FuzzyText>

        <p className="mt-3 max-w-md text-base text-white md:text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-primary shadow-lg transition "
          >
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
