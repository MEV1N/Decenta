"use client"

interface CaseBoardProps {
  unlockedChapters: number
  totalChapters: number
  evidence: Array<{ id: string; solved: boolean }>
}

export function CaseBoard({ unlockedChapters, totalChapters, evidence }: CaseBoardProps) {
  const solvedCount = evidence.filter((e) => e.solved).length

  return (
    <div className="border border-border bg-card/30 p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="font-mono text-xs text-accent uppercase">CASE BOARD</h3>

        {/* Evidence collected */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Evidence Examined</span>
            <span className="font-mono">
              {solvedCount} / {evidence.length}
            </span>
          </div>
          <div className="w-full h-1 bg-muted border border-border overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{ width: `${(solvedCount / evidence.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Chapters unlocked */}
        <div className="flex justify-between text-xs text-muted-foreground pt-3">
          <span>Chapters Unlocked</span>
          <span className="font-mono">
            {unlockedChapters} / {totalChapters}
          </span>
        </div>
      </div>

      {/* Unlocking hint */}
      <p className="text-xs text-muted-foreground italic border-t border-border pt-4">
        {unlockedChapters === totalChapters
          ? "All evidence has been examined. The case remains open."
          : "More evidence awaits. Look carefully at what you've found."}
      </p>
    </div>
  )
}
