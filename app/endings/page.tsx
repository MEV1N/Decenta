"use client"

import { useEffect, useState } from "react"
import { NavHeader } from "@/components/nav-header"
import Link from "next/link"

interface InvestigationState {
  flags: Record<string, string>
  completedChapters: number[]
}

export default function EndingsPage() {
  const [investigation, setInvestigation] = useState<InvestigationState | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load all submitted flags from localStorage
    const flags: Record<string, string> = {}
    const completedChapters: number[] = []

    for (let i = 0; i < 5; i++) {
      const flagKey = `chapter_${i}`
      const flag = localStorage.getItem(flagKey)
      if (flag) {
        flags[flagKey] = flag
        completedChapters.push(i)
      }
    }

    setInvestigation({ flags, completedChapters })
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground pt-24 pb-12">
        <NavHeader />
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">Loading investigation state...</p>
        </div>
      </main>
    )
  }

  const determineOutcome = () => {
    if (!investigation || investigation.completedChapters.length === 0) {
      return "abandoned"
    }

    const flagCount = Object.keys(investigation.flags).length
    const completionPercentage = (investigation.completedChapters.length / 5) * 100

    if (completionPercentage === 100) {
      return "enlightenment"
    } else if (completionPercentage >= 80) {
      return "uncertainty"
    } else if (completionPercentage >= 40) {
      return "incomplete"
    }

    return "abandoned"
  }

  const outcome = determineOutcome()

  const endings = {
    enlightenment: {
      title: "The Revelation",
      subtitle: "You descended all the way.",
      content: `You stand at the depths. The case is complete—or so you believe. Every flag submitted, every piece of evidence connected, the narrative fully assembled.

But here's the revelation: The system showed you exactly what you were looking for. The neat narrative, the clear culprits, the obvious conclusions. Is that what you found? Or is that what you were guided toward?

NOXERA's final message arrives unseen:

"Congratulations. You completed the investigation. You proved you understand the system. But did you understand what you proved?"

The leaderboard updates. Your name climbs. But the final flag—the one that proves certainty—remains just beyond reach. Perhaps it always was.`,
      color: "text-amber-200",
      borderColor: "border-amber-700/50",
      bgColor: "bg-amber-900/10",
    },
    uncertainty: {
      title: "The Divergence",
      subtitle: "You went deep, but not all the way.",
      content: `You've reached far, but the final chamber remains locked. Your flags are recorded, your path documented. But the complete narrative—the one that transforms suspicion into certainty—still eludes you.

There's a comfort in this incompleteness. You didn't have to face the final truth. You didn't have to confront what awaits at the deepest level.

Perhaps that was wise.

Your name is recorded on the ledger, but as an incomplete investigation. Others may continue from where you stopped. Will they find what you couldn't? Or will they, too, stop short of the abyss?

NOXERA remains silent. Perhaps disappointed. Perhaps approving.`,
      color: "text-gray-300",
      borderColor: "border-gray-600/50",
      bgColor: "bg-gray-900/10",
    },
    incomplete: {
      title: "The Departure",
      subtitle: "You retreated before reaching the depths.",
      content: `You've gone partway. Submitted some flags, uncovered some evidence. But the deeper layers remain unexplored. The full case lies ahead, waiting for those with the resolve to continue.

Your path is recorded, but unfinished. Other investigators may look at your progress and wonder: Why stop? What did you fear? Or perhaps you simply moved on to other concerns.

The system accepts this. Not every descent reaches the bottom. Not every investigator stays long enough to be changed by what they find.

When you're ready—if you're ready—the investigation awaits. The flags don't disappear. The evidence doesn't move. The system is patient.

It can wait.`,
      color: "text-red-300",
      borderColor: "border-red-700/50",
      bgColor: "bg-red-900/10",
    },
    abandoned: {
      title: "The Silence",
      subtitle: "The investigation was never truly begun.",
      content: `No flags submitted. No evidence examined. The descent opened before you, but you did not enter.

Or perhaps you did enter, but did not progress. Either way, no record exists of your investigation. The case remains as it was: waiting, patient, incomplete.

This is not judgment. The system does not judge. It simply records. And in your absence, it records nothing.

When you're ready to begin—truly begin—the first report waits. The initial coordinates are still valid. The path downward is still open.

You have only to take the first step.`,
      color: "text-muted-foreground",
      borderColor: "border-border/30",
      bgColor: "bg-muted/5",
    },
  }

  const ending = endings[outcome as keyof typeof endings]

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-12">
      <NavHeader />

      <div className="max-w-2xl mx-auto px-4">
        <div className="space-y-8">
          {/* Outcome Header */}
          <div className={`p-6 border ${ending.borderColor} ${ending.bgColor} space-y-2`}>
            <h2 className={`text-3xl md:text-4xl font-bold ${ending.color}`}>{ending.title}</h2>
            <p className="text-muted-foreground italic">{ending.subtitle}</p>
          </div>

          {/* Investigation Summary */}
          <div className="p-4 border border-border/50 bg-muted/10 space-y-4">
            <h3 className="text-sm font-mono text-accent uppercase">Investigation Summary</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Chapters Explored: {investigation?.completedChapters.length || 0} / 5</p>
              <p>Flags Submitted: {Object.keys(investigation?.flags || {}).length}</p>
              <p>Status: {outcome === "enlightenment" ? "Complete" : "Incomplete"}</p>
            </div>
          </div>

          {/* Ending Narrative */}
          <div className={`p-6 border ${ending.borderColor} ${ending.bgColor} space-y-4`}>
            {ending.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Submitted Flags Display */}
          {Object.keys(investigation?.flags || {}).length > 0 && (
            <div className="p-4 border border-border/50 bg-black/20 space-y-3">
              <h3 className="text-sm font-mono text-accent uppercase">Evidence On Record</h3>
              <div className="space-y-2 text-xs font-mono text-muted-foreground max-h-48 overflow-y-auto">
                {Object.entries(investigation?.flags || {}).map(([key, flag]) => (
                  <div key={key} className="p-2 border border-border/30 bg-muted/10">
                    <p className="text-accent">{key}</p>
                    <p className="text-muted-foreground break-all">{flag}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-4 justify-center pt-8 border-t border-border flex-wrap">
            <Link
              href="/descent"
              className="text-sm font-mono px-4 py-2 border border-border hover:border-accent transition-colors"
            >
              Continue Investigation
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
