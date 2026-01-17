"use client"

import { useEffect, useState } from "react"

export function ProgressDepth() {
  const [depth, setDepth] = useState(0)
  const [totalChallenges] = useState(8)

  useEffect(() => {
    // Count solved challenges from localStorage
    let solved = 0
    for (const key in localStorage) {
      if (key.startsWith("solved_")) {
        solved++
      }
    }
    setDepth(solved)
  }, [])

  const percentage = (depth / totalChallenges) * 100

  return (
    <div className="border border-border bg-card/30 p-6 space-y-4">
      <div>
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="font-mono text-sm text-accent">DEPTH REACHED</h3>
          <span className="font-mono text-xs text-muted-foreground">
            {depth} / {totalChallenges}
          </span>
        </div>
        <div className="w-full h-1 bg-muted border border-border overflow-hidden">
          <div className="h-full bg-accent transition-all duration-500" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground italic">
        {percentage === 100
          ? "The descent is complete. But understanding remains."
          : "You descend further with each revelation."}
      </p>
    </div>
  )
}
