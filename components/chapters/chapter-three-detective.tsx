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

const caseEvidence: Evidence[] = [
  {
    id: "ch3-ev1",
    type: "report",
    title: "FORENSIC_ANALYSIS_PARTIAL",
    timestamp: "2024-01-16 09:00 UTC",
    content: `FILE RECOVERY ANALYSIS

Source: Deleted file sectors from 2024-01-14 22:30:15
Status: Partially recovered

Recovered Content (60% integrity):
[REDACTED BY LEGAL - 6 PAGES]
[REDACTED BY SECURITY - 2 PAGES]
[RECOVERED FRAGMENT]:
"...discussed the timeline with AR. Need to ensure the dates align.
If AUL found the escalation before the daemon compromise, 
the whole narrative falls apart. Safe to assume AUL won't look that far back..."

Finding: The deleted content was a conversation planning the incident.
Implication: This was not accidental data loss. It was intentional destruction.`,
    hint: "Read between the redactions. What was being hidden? Who are 'AR' and 'AUL'?",
    flag: "flag{planned_destruction}",
    story:
      "Someone knew exactly what they were erasing. And they failed. The remnants are more damning than the whole.",
    isTrap: false,
  },
  {
    id: "ch3-ev2",
    type: "log",
    title: "EMAIL_RECOVERY_LOG",
    content: `ARCHIVED EMAIL FRAGMENTS

From: AR@system.local
To: Admin-User-7
Subject: Timeline alignment - URGENT DELETE AFTER READ
Date: 2024-01-10 16:45 UTC

"Once the daemon code is active, we have a window of 4 days 
before the automated audit runs. You know what to do by then.
Make sure AUL doesn't look at the wrong logs."

[EMAIL BODY DELETED - RECOVERY INCOMPLETE]
[DECRYPTION SIGNATURE]: Military-grade encryption detected
[RECOVERY STATUS]: This email was permanently erased from backup

Additional Finding: 47 emails deleted in same batch
Pattern: All communication between AR and Admin-User-7
Timeline: All deletions occurred 2024-01-15 23:15 UTC (after incident response)`,
    hint: "AR planned this carefully. Why delete messages after being discovered?",
    flag: "flag{coordinated_cover_up}",
    story: "This wasn't one person's mistake. It was orchestrated. But by whom? And why?",
    isTrap: false,
  },
  {
    id: "ch3-ev3",
    type: "artifact",
    title: "AUDIT_LOG_GAPS",
    content: `AUTOMATED SYSTEM AUDIT - TIMELINE RECONSTRUCTION

Scheduled audit run: 2024-01-14 02:00 UTC (COMPLETED NORMALLY)
Next audit: 2024-01-15 02:00 UTC (NEVER INITIATED)

Log Analysis:
Audit process stopped at: 2024-01-15 01:45 UTC
Termination code: SIGKILL (forceful kill by root)
Who initiated kill: Unknown (log entry missing)

Records examined:
- 47 audit records deleted (matching email deletion count)
- Deletion timestamp: 2024-01-15 23:16 UTC
- Deletion method: Direct database truncation (not file deletion)

Conclusion: The logs weren't just erased. They were surgically removed
from database backups. This requires insider knowledge of system architecture.`,
    hint: "Someone with deep system access orchestrated this. The precision is deliberate.",
    flag: "flag{insider_threat}",
    story:
      "This is bigger than a careless admin. Someone planned every step. The question isn't whether there's a conspiracy. The question is how deep it goes.",
    isTrap: false,
  },
]

interface ChapterThreeDetectiveProps {
  onChapterComplete?: (completedEvidence: string[]) => void
}

export default function ChapterThreeDetective({ onChapterComplete }: ChapterThreeDetectiveProps) {
  const [solvedEvidence, setSolvedEvidence] = useState<Record<string, boolean>>({})

  const handleEvidenceSolve = (id: string, isCorrect: boolean) => {
    if (isCorrect) {
      setSolvedEvidence((prev) => {
        const updated = { ...prev, [id]: true }
        localStorage.setItem(`solved_${id}`, "true")

        const allSolved = caseEvidence.every((ev) => updated[ev.id] || localStorage.getItem(`solved_${ev.id}`))
        if (allSolved && onChapterComplete) {
          onChapterComplete(caseEvidence.map((ev) => ev.id))
        }

        return updated
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 border border-border bg-black/30">
        <p className="text-xs font-mono text-accent mb-2">FORENSIC RECOVERY</p>
        <p className="text-sm text-muted-foreground">
          Nothing is erased without a trace. The deletions are the evidence. Reconstruct what was hidden. The
          perpetrators believed they had covered their tracks. They were wrong.
        </p>
      </div>

      {caseEvidence.map((evidence) => {
        const isSolved = solvedEvidence[evidence.id] || !!localStorage.getItem(`solved_${evidence.id}`)
        return <EvidenceCard key={evidence.id} evidence={evidence} onSolve={handleEvidenceSolve} isSolved={isSolved} />
      })}
    </div>
  )
}
