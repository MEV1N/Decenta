"use client"

import { NavHeader } from "@/components/nav-header"
import Link from "next/link"

export default function ThePausePage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-12">
      <NavHeader />

      <div className="max-w-2xl mx-auto px-4">
        <div className="space-y-12 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">The Pause</h2>
            <p className="text-muted-foreground italic">A moment to breathe. A moment to question.</p>
          </div>

          <div className="space-y-6 text-left">
            <p className="text-lg text-foreground leading-relaxed">
              You have descended far. Deeper than most dare to venture. And yet, you find yourself at a threshold.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed">
              The flags are solved. The challenges are conquered. But the truth? The truth remains elusive. Not because
              it's hidden. But because you haven't yet decided to face it.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed">
              NOXERA watches. Always watching. The guide, or the adversary? Perhaps by now, you've stopped trying to
              tell the difference.
            </p>

            <div className="border-l-2 border-accent pl-6 py-4 my-8">
              <p className="text-muted-foreground italic">
                "The descent is not a journey to a destination. It is a journey to understanding. And understanding, as
                you have learned, is not the same as answers."
              </p>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Your score is recorded. Your name joins the ledger of those who descended. But the real question remains
              unanswered: Did you find what you were looking for? Or did you become what was looking for you?
            </p>
          </div>

          <div className="space-y-4 pt-8">
            <p className="text-xs font-mono text-accent">DECENDA 2.0 AWAITS</p>
            <p className="text-sm text-muted-foreground">
              The descent does not end. It only pauses. And when it resumes, you will not be the same.
            </p>
          </div>

          <div className="flex gap-4 justify-center pt-8">
            <Link
              href="/descent"
              className="text-sm font-mono px-4 py-2 border border-border hover:border-accent transition-colors"
            >
              Revisit Challenges
            </Link>
            <Link
              href="/leaderboard"
              className="text-sm font-mono px-4 py-2 border border-border hover:border-accent transition-colors"
            >
              View Leaderboard
            </Link>
            <Link
              href="/"
              className="text-sm font-mono px-4 py-2 border border-accent bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
            >
              Return to Start
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
