"use client"

import { useState } from "react"
import { EvidenceCard } from "@/components/evidence-card"

interface Evidence {
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

const prologueEvidence: Evidence[] = [
  {
    id: "prologue-ev1",
    type: "file",
    title: "INCIDENT_REPORT.TXT",
    timestamp: "2024-01-15 09:00 UTC",
    content: `Subject: Minor Access Anomaly
Status: RESOLVED
Date: 2024-01-15

[REDACTED CONTENT - Decryption Required]

Analyst Note: This report was marked resolved quickly. Too quickly.
You've seen cases like this before. Some details are obvious. Others were overlooked.`,
    hint: "The report was rushed. Look for what's obvious—the thing someone wanted found.",
    flag: "flag{quick_resolution}",
    story:
      "The pattern emerges. This is how investigations die: not with questions, but with answers that come too fast.",
  },
  {
    id: "prologue-ev2",
    type: "log",
    title: "ACCESS_PATTERN.LOG",
    timestamp: "2024-01-14 15:22 UTC",
    content: `[15:22:10] Request from IP 192.168.1.104
[15:22:43] Resource: /internal/config
[15:23:05] Status: 403 Forbidden
[15:23:20] Resource: /internal/logs
[15:23:45] Status: 200 OK
[15:24:00] Download initiated: 2.3 MB

Observation: One request denied, the next succeeded.
The progression is too clean. A pattern, or a practiced hand?`,
    hint: "What's searchable about this sequence? The gap between denial and success—what changed?",
    flag: "flag{privilege_escalation}",
    story: "Two requests. One denied. One allowed. The space between them contains everything.",
  },
  {
    id: "prologue-ev3",
    type: "artifact",
    title: "METADATA_CHECK",
    timestamp: "2024-01-14 14:50 UTC",
    content: `File Analysis:
Name: config.backup
Size: 892 KB
Created: 2024-01-10 14:22 UTC
Modified: 2024-01-14 15:23 UTC
Owner: service_account
Permissions: rw-r--r-- (644)

Analysis: The file was created 4 days ago but modified yesterday.
Questions: Who had access? When was the backup made? Why is it readable by everyone?

Your observation: Backups aren't supposed to be modified. This one was.`,
    hint: "The timeline is broken. Find the mistake in the narrative.",
    flag: "flag{timeline_breach}",
    story: "Whoever did this made an assumption: that timestamps always tell the truth. They were careless.",
  },
  {
    id: "prologue-ev4",
    type: "report",
    title: "OSINT_NOTE",
    timestamp: "2024-01-14 16:00 UTC",
    content: `Subject Line Found in Leaked Database (Public Record):
"Meeting with AR - urgent security review needed"

Context: Email from internal address, dated 2024-01-10
Recipient: Not in directory

Additional: This name appears in exactly 3 places across all logs.
Each appearance is adjacent to an anomaly.
No other mention of this person exists in the system.`,
    hint: "A name that appears in fragments. That appears near problems. A real person, or a placeholder?",
    flag: "flag{ghosted_identity}",
    story: "Someone is hiding in plain sight. Or maybe they're not hiding at all—maybe they're being hidden.",
  },
]

interface PrologueProps {
  onChapterComplete?: (completedEvidence: string[]) => void
}

export default function Prologue({ onChapterComplete }: PrologueProps) {
  const [solvedEvidence, setSolvedEvidence] = useState<Record<string, boolean>>({})

  const handleEvidenceSolve = (id: string, isCorrect: boolean) => {
    if (isCorrect) {
      setSolvedEvidence((prev) => {
        const updated = { ...prev, [id]: true }
        localStorage.setItem(`solved_${id}`, "true")

        const allSolved = prologueEvidence.every((ev) => updated[ev.id] || localStorage.getItem(`solved_${ev.id}`))
        if (allSolved && onChapterComplete) {
          onChapterComplete(prologueEvidence.map((ev) => ev.id))
        }

        return updated
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 border border-border bg-black/30">
        <p className="text-xs font-mono text-accent mb-2">THE FIRST REPORT</p>
        <p className="text-sm text-muted-foreground">
          Four pieces of evidence. Nothing labeled. No chain of custody. You've seen cases like this before. Some
          details are obvious. Others were overlooked. The report was rushed.
        </p>
      </div>

      {prologueEvidence.map((evidence) => {
        const isSolved = solvedEvidence[evidence.id] || !!localStorage.getItem(`solved_${evidence.id}`)
        return <EvidenceCard key={evidence.id} evidence={evidence} onSolve={handleEvidenceSolve} isSolved={isSolved} />
      })}
    </div>
  )
}
