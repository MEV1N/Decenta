"use client"

import { useState } from "react"
import { EvidenceCard } from "@/components/evidence-card"
import { ClueHint } from "@/components/clue-hint"

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
    id: "ch2-ev1",
    type: "report",
    title: "INCIDENT_RESPONSE_SUMMARY",
    timestamp: "2024-01-15 04:30 UTC",
    content: `INCIDENT REPORT: ID-2024-0147

Detection: Unauthorized data access attempt
Location: /archive/restricted
Time: 2024-01-14 22:30:15
Severity: CRITICAL
Status: UNRESOLVED

Response Log:
- Alert triggered at 22:31:03
- Response initiated by Admin-User-7 at 22:32:15
- Incident dismissed without investigation
- No remediation steps documented
- Follow-up marked as "Not Required"

Assessment: This dismissal is unusual given severity level.
Cross-reference with:
  - Access logs for Admin-User-7 behavior
  - Any privilege escalation attempts on that date`,
    hint: "Who had the authority to dismiss a critical alert? And why?",
    flag: "flag{admin_collaboration}",
    story: "The admin who dismissed the alert was the same admin who accessed the archive. Convenient.",
  },
  {
    id: "ch2-ev2",
    type: "log",
    title: "PRIVILEGE_ESCALATION_LOG",
    timestamp: "2024-01-10 14:22 UTC",
    content: `[14:22:10] User login: Admin-User-7 (normal session)
[14:23:45] Permission request: root access (DENIED - insufficient privileges)
[14:24:30] Alternative access method attempted
[14:25:15] SESSION HIJACKING DETECTED via compromised token
[14:25:45] Token issued by: System-Maintenance-Daemon
[14:26:20] Escalation successful - Root access granted
[14:27:00] Elevated session used for archive access
[14:27:30] Privileges revoked - Session terminated

Finding: Daemon was compromised 4 days before incident.
Question: How long was the compromise active?`,
    hint: "The System-Maintenance-Daemon wasn't supposed to grant elevated access. Someone misconfigured it.",
    flag: "flag{daemon_compromise}",
    story: "The chain is becoming clear. But who set this in motion? And when?",
  },
  {
    id: "ch2-ev3",
    type: "artifact",
    title: "SYSTEM_MAINTENANCE_DAEMON_CODE",
    content: `DAEMON SOURCE CODE FRAGMENT
Version: 2024-01-05 (CURRENT)

function checkPrivileges(user) {
  if (user.role === "admin") {
    // HARDCODED BYPASS - FIX BEFORE DEPLOYMENT
    return grantRootAccess(user);
  }
  return checkNormalAuth(user);
}

// ^^ COMMENT ADDED 2024-01-05
// This line was added 9 days before the incident
// It was meant to be temporary - a dev shortcut
// But it was never removed

Configuration: This bypass triggers for ANY admin user
Impact: Every admin can escalate without proper authorization`,
    hint: "Look at the dates. When was this added versus when was it exploited?",
    flag: "flag{developer_shortcut}",
    story: "A careless line of code. A temporary fix that became permanent. How many shortcuts become weapons?",
  },
]

interface ChapterTwoDetectiveProps {
  onChapterComplete?: (completedEvidence: string[]) => void
  previousChapterComplete?: boolean
}

export default function ChapterTwoDetective({
  onChapterComplete,
  previousChapterComplete = false,
}: ChapterTwoDetectiveProps) {
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
        <p className="text-xs font-mono text-accent mb-2">ESCALATION EVIDENCE</p>
        <p className="text-sm text-muted-foreground">
          The incident was dismissed too quickly. Explore the response chain. Look at the dates. Someone wanted this
          covered up—or someone was careless enough to leave evidence.
        </p>
        <ClueHint
          clueText="Find references to 'daemon compromise' and timeline inconsistencies in the reports below."
          revealed={previousChapterComplete}
          subtle
        />
      </div>

      {caseEvidence.map((evidence) => {
        const isSolved = solvedEvidence[evidence.id] || !!localStorage.getItem(`solved_${evidence.id}`)
        return <EvidenceCard key={evidence.id} evidence={evidence} onSolve={handleEvidenceSolve} isSolved={isSolved} />
      })}
    </div>
  )
}
