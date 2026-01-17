"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { NavHeader } from "@/components/nav-header"
import { CaseBoard } from "@/components/case-board"
import ChapterOneDetective from "@/components/chapters/chapter-one-detective"

interface ChapterData {
  id: number
  title: string
  unlocksAt: string
  description: string
  component: React.ComponentType<{ onChapterComplete?: (ids: string[]) => void }>
  storyIntro: string
  requiredEvidenceFromPrevious: string[]
}

const chapters: ChapterData[] = [
  {
    id: 1,
    title: "The First Descent",
    unlocksAt: "START",
    description: "Three pieces of evidence emerge from the digital debris.",
    component: ChapterOneDetective,
    storyIntro:
      "You stand before a case that shouldn't exist. No official designation. No chain of custody. Just fragments left where only you can find them.",
    requiredEvidenceFromPrevious: [],
  },
]

export default function DescentPageDetective() {
  const [currentChapter, setCurrentChapter] = useState(1)
  const [unlockedChapters, setUnlockedChapters] = useState<number[]>([1])
  const [allEvidence, setAllEvidence] = useState<Array<{ id: string; solved: boolean }>>([])

  useEffect(() => {
    // Check localStorage for solved evidence
    const evidence = [
      { id: "ch1-ev1", solved: !!localStorage.getItem("solved_ch1-ev1") },
      { id: "ch1-ev2", solved: !!localStorage.getItem("solved_ch1-ev2") },
      { id: "ch1-ev3", solved: !!localStorage.getItem("solved_ch1-ev3") },
    ]
    setAllEvidence(evidence)
  }, [])

  const chapter = chapters.find((c) => c.id === currentChapter)
  const ChapterComponent = chapter?.component

  const handleChapterComplete = (completedEvidenceIds: string[]) => {
    if (currentChapter < chapters.length) {
      setUnlockedChapters((prev) => {
        const updated = [...prev]
        if (!updated.includes(currentChapter + 1)) {
          updated.push(currentChapter + 1)
        }
        return updated
      })
      // Silent progression - no celebratory message
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-12">
      <NavHeader />

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">The Case Unfolds</h2>
          <p className="text-muted-foreground max-w-2xl">
            Evidence gathered. Patterns examined. But the truth remains obscured. You are the detective now.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Case Board */}
          <div className="lg:col-span-1 space-y-6">
            <CaseBoard
              unlockedChapters={unlockedChapters.length}
              totalChapters={chapters.length}
              evidence={allEvidence}
            />

            {/* Locked/Unlocked Status */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono text-accent uppercase mb-4">Investigation Stages</h3>
              {chapters.map((ch) => (
                <div
                  key={ch.id}
                  className={`p-4 border text-sm ${
                    unlockedChapters.includes(ch.id)
                      ? "border-accent bg-accent/10"
                      : "border-border bg-muted/20 cursor-not-allowed"
                  }`}
                >
                  <div className="text-xs font-mono text-accent uppercase mb-1">STAGE {ch.id}</div>
                  <div className="font-bold">{ch.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {unlockedChapters.includes(ch.id) ? "Accessible" : "Locked"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {chapter && (
              <div className="space-y-4 border-b border-border pb-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{chapter.title}</h3>
                  <p className="text-muted-foreground italic">{chapter.storyIntro}</p>
                </div>
              </div>
            )}

            {unlockedChapters.includes(currentChapter) && ChapterComponent ? (
              <ChapterComponent onChapterComplete={handleChapterComplete} />
            ) : (
              <div className="p-6 border border-border bg-muted/10 text-center">
                <p className="text-muted-foreground italic">
                  "You're not there yet. The evidence doesn't support this conclusion."
                </p>
              </div>
            )}

            <div className="pt-8 border-t border-border">
              {unlockedChapters.length === chapters.length && currentChapter === chapters.length && (
                <Link
                  href="/the-pause"
                  className="text-sm font-mono px-4 py-2 border border-accent bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                >
                  The Pause →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
