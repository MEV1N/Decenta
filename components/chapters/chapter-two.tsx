"use client"

import { useState } from "react"
import { FlagInput } from "@/components/flag-input"

const challenges = [
  {
    id: "web-1",
    title: "Arriving Late",
    difficulty: "Medium",
    text: "The door was open. The page loads too easily. Something feels wrong about how simple this is.",
    hint: "Sometimes what's missing is more important than what's present.",
    flag: "flag{absence_speaks_louder}",
    story: "You found something, but the victory feels hollow. What were you supposed to find?",
  },
  {
    id: "web-2",
    title: "Dead Endpoints",
    difficulty: "Hard",
    text: "Paths that lead nowhere. Endpoints that return error codes. Or do they?",
    hint: "Check the response headers. Errors can contain secrets.",
    flag: "flag{headers_tell_stories}",
    story: "The error message wasn't an error at all. It was a message. To you specifically.",
  },
]

export default function ChapterTwo() {
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
