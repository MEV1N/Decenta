"use client"

import { useState } from "react"
import { FlagInput } from "@/components/flag-input"

const challenges = [
  {
    id: "crypt-1",
    title: "The First Message",
    difficulty: "Easy",
    text: "A message left in plain sight. Or was it?",
    hint: "Look for patterns. Not all text is what it seems.",
    flag: "flag{hidden_in_plain_sight}",
    story: "You found it. But was finding it the point, or just the beginning?",
  },
  {
    id: "crypt-2",
    title: "Fragments",
    difficulty: "Medium",
    text: "Data in pieces. Each fragment tells part of a story. But which story?",
    hint: "Revisit the first challenge. Things connect.",
    flag: "flag{fragments_unite}",
    story: "The pieces fit. But the picture they form raises more questions than answers.",
  },
]

export default function ChapterOne() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [submissions, setSubmissions] = useState<Record<string, boolean>>({})

  const handleFlagSubmit = (id: string, isCorrect: boolean) => {
    setSubmissions((prev) => ({
      ...prev,
      [id]: isCorrect,
    }))
  }

  return (
    <div className="space-y-6">
      {challenges.map((challenge) => (
        <div
          key={challenge.id}
          className="border border-border bg-card/50 hover:border-accent/30 transition-all overflow-hidden"
        >
          <button
            onClick={() => setExpandedId(expandedId === challenge.id ? null : challenge.id)}
            className="w-full p-6 text-left hover:bg-muted/20 transition-colors flex items-start justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-lg font-bold">{challenge.title}</h4>
                <span className="text-xs font-mono px-2 py-1 bg-muted text-muted-foreground border border-border">
                  {challenge.difficulty}
                </span>
                {submissions[challenge.id] && (
                  <span className="text-xs font-mono px-2 py-1 bg-accent/20 text-accent border border-accent">
                    SOLVED
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">{challenge.text}</p>
            </div>
            <div className="text-accent font-bold text-xl">{expandedId === challenge.id ? "−" : "+"}</div>
          </button>

          {expandedId === challenge.id && (
            <div className="border-t border-border bg-muted/10 p-6 space-y-6">
              <div>
                <h5 className="font-mono text-xs text-accent mb-2">HINT</h5>
                <p className="text-sm text-muted-foreground">{challenge.hint}</p>
              </div>

              <FlagInput
                challengeId={challenge.id}
                onSubmit={(flag) => {
                  const isCorrect = flag.toLowerCase() === challenge.flag.toLowerCase()
                  handleFlagSubmit(challenge.id, isCorrect)
                  if (isCorrect) {
                    // Store in localStorage for demo
                    localStorage.setItem(`solved_${challenge.id}`, "true")
                  }
                }}
              />

              {submissions[challenge.id] && (
                <div className="p-4 bg-accent/10 border border-accent/50 text-sm text-foreground">
                  <p className="font-mono text-accent mb-2">STORY UPDATE</p>
                  <p className="text-muted-foreground">{challenge.story}</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
