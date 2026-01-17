"use client"

import { useState } from "react"
import { FlagInput } from "@/components/flag-input"

interface EvidenceItem {
  id: string
  type: "file" | "log" | "report" | "artifact"
  title: string
  timestamp?: string
  content: string
  hint?: string
  flag: string
  story: string
  isTrap?: boolean
  trapFeedback?: string
}

interface EvidenceCardProps {
  evidence: EvidenceItem
  onSolve: (id: string, isCorrect: boolean, isTrap?: boolean) => void
  isSolved?: boolean
}

export function EvidenceCard({ evidence, onSolve, isSolved }: EvidenceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showTrapWarning, setShowTrapWarning] = useState(false)

  const handleFlagSubmit = (flag: string) => {
    const isCorrect = flag.toLowerCase() === evidence.flag.toLowerCase()

    if (isCorrect && evidence.isTrap) {
      setShowTrapWarning(true)
      onSolve(evidence.id, true, true)
    } else {
      if (!isCorrect && evidence.isTrap) {
        // Wrong attempt on trap flag - provide misdirection
        const wrongAttemptFeedback = "The theory doesn't hold. You're forcing a conclusion."
        // In real implementation, show this feedback
      }
      onSolve(evidence.id, isCorrect, false)
    }
  }

  const typeStyles = {
    file: "border-blue-500/30 bg-blue-500/5",
    log: "border-cyan-500/30 bg-cyan-500/5",
    report: "border-purple-500/30 bg-purple-500/5",
    artifact: "border-amber-500/30 bg-amber-500/5",
  }

  const typeColors = {
    file: "text-blue-400",
    log: "text-cyan-400",
    report: "text-purple-400",
    artifact: "text-amber-400",
  }

  return (
    <div className={`border ${typeStyles[evidence.type]} p-4 space-y-4`}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left hover:bg-white/5 p-2 -m-2 rounded transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-mono uppercase ${typeColors[evidence.type]}`}>[{evidence.type}]</span>
              {evidence.timestamp && <span className="text-xs text-muted-foreground">{evidence.timestamp}</span>}
            </div>
            <h3 className="font-bold text-foreground">{evidence.title}</h3>
            {!isExpanded && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{evidence.content}</p>}
          </div>
          <div className="text-accent font-bold text-lg flex-shrink-0">
            {isSolved && !showTrapWarning ? "✓" : isExpanded ? "−" : "+"}
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border pt-4 space-y-4">
          {/* Evidence Content */}
          <div>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">{evidence.content}</p>
          </div>

          {/* Hint Section */}
          {evidence.hint && (
            <div className="p-3 bg-black/30 border border-border">
              <p className="text-xs font-mono text-muted-foreground mb-1">ANALYST NOTE</p>
              <p className="text-sm text-muted-foreground">{evidence.hint}</p>
            </div>
          )}

          {/* Flag Input */}
          {!isSolved && <FlagInput challengeId={evidence.id} onSubmit={handleFlagSubmit} />}

          {/* Trap Warning */}
          {showTrapWarning && (
            <div className="p-4 border border-amber-500/50 bg-amber-500/10 space-y-2">
              <p className="text-xs font-mono text-amber-400 uppercase">EVIDENCE FLAGGED</p>
              <p className="text-sm text-amber-200">
                {evidence.trapFeedback ||
                  "This evidence creates doubt. You solved something, but lost something in the process."}
              </p>
            </div>
          )}

          {/* Story Update */}
          {isSolved && !showTrapWarning && (
            <div className="p-4 border border-accent/50 bg-accent/10">
              <p className="text-xs font-mono text-accent mb-2">CASE PROGRESSION</p>
              <p className="text-sm text-muted-foreground italic">{evidence.story}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
