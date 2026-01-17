"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { NavHeader } from "@/components/nav-header"
import { FlagInput } from "@/components/flag-input"
import { CaseManager } from "@/components/case-manager"

const chapters = [
  {
    id: 0,
    title: "The Investigation Begins",
    phase: "Initial Contact",
    description: "Something is wrong. You can feel it. A contact has given you coordinates.",
    storyIntro:
      "A encrypted message arrived. No signature. No official designation. Just fragments left where only you can find them. You know how to look.",
    narrative:
      "You've found the first entry point. The system is waiting. Somewhere inside, evidence exists. But first, you must prove you understand what you're looking for.",
  },
  {
    id: 1,
    title: "Escalation Evidence",
    phase: "First Descent",
    description: "Privileges were elevated. The question is why, and by whom.",
    storyIntro:
      "You stand before a case that shouldn't exist. The privilege escalation wasn't accidental. Someone with knowledge made it happen.",
    narrative:
      "The system granted access where it shouldn't have. This wasn't a vulnerability—it was deliberate. Find what they accessed. Bring proof.",
  },
  {
    id: 2,
    title: "Hidden Deletions",
    phase: "Escalation",
    description: "Something was hidden. Destruction leaves traces.",
    storyIntro: "The cover-up began here. Files were removed. Logs were sanitized. But nothing is ever truly gone.",
    narrative:
      "Evidence of deletion is itself evidence. Reconstruct what was hidden. The attacker believed it was permanent. They were wrong.",
  },
  {
    id: 3,
    title: "The Pattern",
    phase: "Forensic Recovery",
    description: "Connect the dots. The truth emerges in the spaces between.",
    storyIntro:
      "By now, you should see it. The incidents aren't random. They're coordinated. Someone inside coordinated them.",
    narrative:
      "All the pieces exist. You've touched them. Now you must assemble them into a coherent narrative. The system is waiting for proof of your understanding.",
  },
  {
    id: 4,
    title: "The Unraveling",
    phase: "Investigation Closure",
    description: "You have built a narrative. But have you proven it?",
    storyIntro: "By now, you should question everything. Including your own conclusions.",
    narrative:
      "The final evidence awaits those who've looked deep enough. But certainty remains elusive. Have you really solved this? Or have you been guided toward a comfortable lie?",
  },
]

export default function DescentPage() {
  const [selectedChapter, setSelectedChapter] = useState(0)
  const [unlockedChapters, setUnlockedChapters] = useState<number[]>([0])
  const [submittedFlags, setSubmittedFlags] = useState<Record<string, string>>({})
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    const loaded: Record<string, string> = {}
    const unlocked: number[] = [0]
    for (let i = 0; i < 5; i++) {
      const flag = localStorage.getItem(`chapter_${i}`)
      if (flag) {
        loaded[`chapter_${i}`] = flag
        if (i < 4) {
          unlocked.push(i + 1)
        }
      }
    }
    setSubmittedFlags(loaded)
    setUnlockedChapters(unlocked)
  }, [])

  const handleFlagSubmit = (flag: string) => {
    const flagKey = `chapter_${selectedChapter}`
    setSubmittedFlags((prev) => ({
      ...prev,
      [flagKey]: flag,
    }))

    localStorage.setItem(flagKey, flag)
    localStorage.setItem("lastActivityTime", new Date().toISOString())

    if (selectedChapter < chapters.length - 1 && !unlockedChapters.includes(selectedChapter + 1)) {
      setUnlockedChapters((prev) => [...new Set([...prev, selectedChapter + 1])])
    }

    // Refresh case manager display
    setRefreshKey((k) => k + 1)
  }

  const chapter = chapters.find((c) => c.id === selectedChapter)

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-12">
      <NavHeader />

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">The Investigation</h2>
          <p className="text-muted-foreground max-w-2xl">
            You've found the way in. The rest is reconnaissance. Evidence waits for those who know where to look.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Investigation Stages */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono text-accent uppercase mb-4">Investigation Phases</h3>
              {chapters.map((ch) => {
                const isUnlocked = unlockedChapters.includes(ch.id)
                return (
                  <button
                    key={ch.id}
                    disabled={!isUnlocked}
                    onClick={() => isUnlocked && setSelectedChapter(ch.id)}
                    className={`w-full text-left p-4 border transition-all text-sm ${
                      selectedChapter === ch.id && isUnlocked
                        ? "border-accent bg-accent/10"
                        : isUnlocked
                          ? "border-border bg-muted/20 hover:border-accent/50"
                          : "border-border/50 bg-muted/10 cursor-not-allowed opacity-50"
                    }`}
                  >
                    <div className="text-xs font-mono text-muted-foreground uppercase mb-1">{ch.phase}</div>
                    <div className="font-bold">{ch.title}</div>
                    <div className="text-xs text-muted-foreground">{isUnlocked ? "Available" : "Locked"}</div>
                  </button>
                )
              })}
            </div>

            <div key={refreshKey}>
              <CaseManager />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Chapter Header */}
            {chapter && (
              <div className="space-y-4 border-b border-border pb-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{chapter.title}</h3>
                  <p className="text-muted-foreground italic">{chapter.storyIntro}</p>
                </div>
              </div>
            )}

            {/* Narrative Content */}
            {unlockedChapters.includes(selectedChapter) && chapter && (
              <div className="space-y-6">
                <div className="p-6 border border-border/50 bg-black/20 space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{chapter.narrative}</p>
                </div>

                {/* Flag Submission */}
                <div className="space-y-4">
                  <h4 className="text-sm font-mono text-accent uppercase">Submit Evidence</h4>
                  <FlagInput onSubmit={handleFlagSubmit} currentChapter={selectedChapter} />
                </div>

                {/* Submitted Flags Display */}
                {submittedFlags[`chapter_${selectedChapter}`] && (
                  <div className="p-4 border border-border/50 bg-accent/5 space-y-2">
                    <p className="text-xs font-mono text-accent uppercase">Evidence Submitted</p>
                    <p className="text-sm text-muted-foreground font-mono break-all">
                      {submittedFlags[`chapter_${selectedChapter}`]}
                    </p>
                  </div>
                )}
              </div>
            )}

            {!unlockedChapters.includes(selectedChapter) && (
              <div className="p-6 border border-border bg-muted/10 text-center space-y-3">
                <p className="text-muted-foreground italic">"There's nothing here yet."</p>
                <p className="text-sm text-muted-foreground">Complete the previous phase first.</p>
              </div>
            )}

            {/* Navigation */}
            <div className="pt-8 border-t border-border flex justify-between">
              {selectedChapter > 0 && (
                <button
                  onClick={() => setSelectedChapter(selectedChapter - 1)}
                  className="text-sm font-mono px-4 py-2 border border-border hover:border-accent transition-colors"
                >
                  ← Previous
                </button>
              )}
              {selectedChapter < chapters.length - 1 && (
                <button
                  onClick={() => setSelectedChapter(selectedChapter + 1)}
                  className="ml-auto text-sm font-mono px-4 py-2 border border-border hover:border-accent transition-colors"
                >
                  Next →
                </button>
              )}
              {selectedChapter === chapters.length - 1 && (
                <Link
                  href="/endings"
                  className="ml-auto text-sm font-mono px-4 py-2 border border-accent bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                >
                  View Outcomes →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
