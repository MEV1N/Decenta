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
    id: "ch1-ev1",
    type: "file",
    title: "ENCRYPTED_MESSAGE.TXT",
    timestamp: "2024-01-15 03:47 UTC",
    content: `-----BEGIN CRYPTED-----
KHOOR ZRUOG. WKLV LV QRW JHQXLQH.
VRPHRQH ZDQWHG WKLV IRXQG.
-----END CRYPTED-----

Note: File shows signs of intentional placement.`,
    hint: "Caesar cipher, shift of 3. But what message comes after decryption?",
    flag: "flag{hello_world}",
    story: "The first piece. A greeting, or a warning? You're not sure anymore.",
  },
  {
    id: "ch1-ev2",
    type: "log",
    title: "SYSTEM_ACCESS_LOG",
    timestamp: "2024-01-14 22:30 UTC",
    content: `[22:30:15] User accessed /archive/restricted
[22:30:42] File transfer: ENCRYPTED_MESSAGE.TXT (892 bytes)
[22:31:03] Connection terminated abnormally
[22:31:20] Intrusion detection triggered
[22:32:15] Alert dismissed by admin
[22:32:30] Log entry modified

Redaction Pattern: Entry at 22:31:50 deleted.
Your discovery: The deletion itself is evidence.`,
    hint: "What was deleted? Why would someone remove the alert response?",
    flag: "flag{deletion_is_evidence}",
    story: "The gaps are intentional. Someone wanted specific moments erased. But erasure creates its own signature.",
  },
  {
    id: "ch1-ev3",
    type: "artifact",
    title: "METADATA_FRAGMENT",
    content: `File creation: 2024-01-10
Last modified: 2024-01-14 22:30:15
Owner: SYSTEM (uid 0)
Permissions: rw------- (600)
File hash (SHA256): a3f9d... [REDACTED]

Anomaly: File claims to be 3 days old but was placed 4 days after.
Conclusion: Backdated or forged.`,
    hint: "The timeline doesn't match. Somebody made a mistake.",
    flag: "flag{timeline_mismatch}",
    story: "This is the break in the narrative. Whoever did this isn't perfect. They left a seam.",
    isTrap: false,
  },
]

interface ChapterOneDetectiveProps {
  onChapterComplete?: (completedEvidence: string[]) => void
}

export default function ChapterOneDetective({ onChapterComplete }: ChapterOneDetectiveProps) {
  const [solvedEvidence, setSolvedEvidence] = useState<Record<string, boolean>>({})

  const handleEvidenceSolve = (id: string, isCorrect: boolean) => {
    if (isCorrect) {
      setSolvedEvidence((prev) => {
        const updated = { ...prev, [id]: true }
        // Persist to localStorage
        localStorage.setItem(`solved_${id}`, "true")

        // Check if all evidence solved
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
        <p className="text-xs font-mono text-accent mb-2">INITIAL EXAMINATION</p>
        <p className="text-sm text-muted-foreground">
          Three pieces of evidence. Each raises more questions. The detective instinct: something doesn't fit. Examine
          each item. Cross-reference. Look for the anomalies.
        </p>
      </div>

      {caseEvidence.map((evidence) => {
        const isSolved = solvedEvidence[evidence.id] || !!localStorage.getItem(`solved_${evidence.id}`)
        return <EvidenceCard key={evidence.id} evidence={evidence} onSolve={handleEvidenceSolve} isSolved={isSolved} />
      })}
    </div>
  )
}
