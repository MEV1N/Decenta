"use client"

import { useState } from "react"
import { FlagInput } from "@/components/flag-input"

const challenges = [
  {
    id: "rev-1",
    title: "Doubt",
    difficulty: "Hard",
    text: "Code that doesn't quite behave as expected. Paths that loop back on themselves.",
    hint: "Does the reversal point to truth, or further into the maze?",
    flag: "flag{trust_nothing}",
    story: "You reversed the code. But did you reverse the meaning too?",
  },
  {
    id: "rev-2",
    title: "Intentional Diversion",
    difficulty: "Hard",
    text: "A challenge designed to mislead. Every solved path feels hollow.",
    hint: "Not every path forward is actually progress.",
    flag: "flag{diversion_detected}",
    story: "This victory tastes like defeat. You solved something, but lost something in the process.",
    penaltyFlag: true,
  },
]

export default function ChapterFour() {
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
                    {challenge.penaltyFlag ? "CAUTIONED" : "SOLVED"}
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
                <div
                  className={`p-4 border text-sm text-foreground ${
                    challenge.penaltyFlag
                      ? "bg-amber-500/10 border-amber-500/50 text-amber-200"
                      : "bg-accent/10 border-accent/50"
                  }`}
                >
                  <p className={`font-mono ${challenge.penaltyFlag ? "text-amber-400" : "text-accent"} mb-2`}>
                    {challenge.penaltyFlag ? "WARNING" : "STORY UPDATE"}
                  </p>
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
