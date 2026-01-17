"use client"

interface ClueHintProps {
  clueText: string
  revealed?: boolean
  subtle?: boolean
}

export function ClueHint({ clueText, revealed = true, subtle = false }: ClueHintProps) {
  if (!revealed) return null

  return (
    <div className={subtle ? "inline" : "block"}>
      {subtle ? (
        <span className="text-foreground font-mono">{clueText}</span>
      ) : (
        <div className="p-3 bg-black/40 border border-border mt-2 text-sm text-muted-foreground">
          <p className="text-xs font-mono text-accent mb-2">ANOMALY DETECTED</p>
          <p>{clueText}</p>
        </div>
      )}
    </div>
  )
}
