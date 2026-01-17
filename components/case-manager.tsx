"use client"

import { useEffect, useState } from "react"

interface CaseState {
  totalFlagsSubmitted: number
  chaptersExplored: number
  lastActivity: string
  investigationActive: boolean
}

export function CaseManager() {
  const [caseState, setCaseState] = useState<CaseState | null>(null)

  useEffect(() => {
    // Load investigation state from localStorage
    let flagCount = 0
    let chapters = 0

    for (let i = 0; i < 5; i++) {
      const flag = localStorage.getItem(`chapter_${i}`)
      if (flag) {
        flagCount++
        chapters++
      }
    }

    const lastActivity = localStorage.getItem("lastActivityTime") || new Date().toISOString()

    setCaseState({
      totalFlagsSubmitted: flagCount,
      chaptersExplored: chapters,
      lastActivity,
      investigationActive: flagCount > 0,
    })
  }, [])

  if (!caseState) {
    return null
  }

  const completionPercentage = (caseState.chaptersExplored / 5) * 100

  return (
    <div className="space-y-4">
      <div className="p-4 border border-border/50 bg-muted/10 space-y-3">
        <h3 className="text-xs font-mono text-accent uppercase">Active Case</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Investigation Status:</span>
            <span className={caseState.investigationActive ? "text-green-400" : "text-gray-500"}>
              {caseState.investigationActive ? "Active" : "Idle"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Flags Submitted:</span>
            <span>{caseState.totalFlagsSubmitted}</span>
          </div>
          <div className="flex justify-between">
            <span>Chapters Explored:</span>
            <span>{caseState.chaptersExplored} / 5</span>
          </div>
        </div>
      </div>

      {/* Completion Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-mono text-accent uppercase">Completion</span>
          <span className="text-muted-foreground">{Math.round(completionPercentage)}%</span>
        </div>
        <div className="w-full h-1 bg-muted/20 border border-border/50">
          <div className="h-full bg-accent transition-all" style={{ width: `${completionPercentage}%` }}></div>
        </div>
      </div>

      {/* Case Status Message */}
      <div
        className={`p-3 border text-xs font-mono ${
          caseState.investigationActive
            ? "border-accent/50 bg-accent/10 text-accent"
            : "border-border/30 bg-muted/10 text-muted-foreground"
        }`}
      >
        {caseState.investigationActive
          ? "Investigation in progress. The system is recording."
          : "No active investigation. Begin at the first stage."}
      </div>
    </div>
  )
}
