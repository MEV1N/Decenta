"use client"

import { useState } from "react"
import { FlagInput } from "@/components/flag-input"

const challenges = [
  {
    id: "forensics-1",
    title: "Careful Absence",
    difficulty: "Medium",
    text: "A file system with gaps. Deleted entries. Recovered fragments that don't quite fit.",
    hint: "What isn't there is the evidence. Reconstruct the missing pieces.",
    flag: "flag{ghosts_in_the_machine}",
    story: "The file wasn't erased by accident. It was erased by design. Someone wanted you to find this.",
    isTrap: false,
  },
  {
    id: "forensics-2",
    title: "False Trail",
    difficulty: "Medium",
    text: "A misleading artifact. Everything points here. But is this really what you're looking for?",
    hint: "Sometimes the obvious answer is the wrong one.",
    flag: "flag{wrong_way_forward}",
    story: "You went the right way after all. But at what cost?",
    isTrap: false,
  },
]

export default function ChapterThree() {
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
