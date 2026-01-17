"use client"

import type React from "react"
import { useState } from "react"

interface FlagInputProps {
  onSubmit: (flag: string) => void
  currentChapter: number
}

// Players will experience branching narrative based on their submissions
export function FlagInput({ onSubmit, currentChapter }: FlagInputProps) {
  const [flag, setFlag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ message: string; type: "info" | "warning" } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (flag.trim()) {
      setIsSubmitting(true)

      // Simulate processing delay
      setTimeout(() => {
        onSubmit(flag)
        setFeedback({
          message: "Evidence recorded. Continuing investigation...",
          type: "info",
        })
        setFlag("")
        setIsSubmitting(false)
      }, 500)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-xs font-mono text-accent uppercase">Flag / Evidence ID</label>
        <input
          type="text"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          disabled={isSubmitting}
          placeholder="Enter the flag you discovered..."
          className="w-full px-4 py-2 bg-input border border-border text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none transition-colors font-mono text-sm disabled:opacity-50"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !flag.trim()}
        className="w-full px-4 py-2 font-mono text-sm font-semibold bg-accent text-accent-foreground hover:bg-accent/90 border border-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Recording..." : "Submit Flag"}
      </button>

      {feedback && (
        <div
          className={`p-3 border text-sm font-mono ${
            feedback.type === "info"
              ? "border-accent/50 bg-accent/10 text-accent"
              : "border-yellow-700/50 bg-yellow-900/10 text-yellow-200"
          }`}
        >
          {feedback.message}
        </div>
      )}
    </form>
  )
}
