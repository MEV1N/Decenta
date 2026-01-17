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
    id: "ch4-ev1",
    type: "report",
    title: "NETWORK_PACKET_RECONSTRUCTION",
    content: `PACKET ANALYSIS - INCIDENT ORIGIN TRACE

Traced packets from initial unauthorized access:
Source IP: 203.0.113.47
Geolocation: Europe (Eastern Region)
Timestamp: 2024-01-10 14:22:10 UTC

BUT - Deeper analysis shows:
Packet headers spoofed
Route obfuscated through 14 proxies
VPN termination point: Unknown
Actual origin: Unverifiable

Preliminary Conclusion: Attack came from external actor
Confidence Level: 23% (low)

Wait - Secondary analysis (automated)
Cross-reference with internal IPs...
The packets originated from WITHIN the network.
Source: 192.168.1.105 (Internal admin segment)
Spoofing detected to hide origin.

This is an INSIDE JOB. Period.`,
    hint: "The packets were spoofed to look external. But who had network access to create that obfuscation?",
    flag: "flag{external_was_fake}",
    story: "You're following the right trail. The false flag was meant to throw investigators off the scent.",
    isTrap: false,
  },
  {
    id: "ch4-ev2",
    type: "artifact",
    title: "IDENTITY_OF_AR_HYPOTHESIS",
    content: `INVESTIGATOR NOTES:

AR signature analysis from emails:
- Uses military-grade encryption (custom implementation)
- Architectural knowledge of system (too deep for admin-level user)
- Timeline suggests someone with access before Admin-User-7 joined
- Previous projects: Daemon development

Hypothesis: AR is a senior developer/architect
Most likely candidate: ALEX_ROTHSTEIN (username: AR)
Position: Lead Infrastructure Architect
Hired: 2023-06-15
Expertise: System authentication, daemon design

Behavioral Profile:
- Meticulous planner
- High security awareness (explains encryption)
- Deep frustration with codebase recently (noted in 1-on-1s)
- Made complaints about "legacy systems holding back progress"

Conclusion: Alex Rothstein fits the profile perfectly.
But wait - There's a problem with this narrative...

Cross-check: Who else has AR initials? Who else accessed the same systems?
Alternative leads: Amy Rayner, Adrian Rios, Andrew Roberts

The conspiracy theory is comfortable. But it might be wrong.`,
    hint: "You've built a narrative. But does it hold? What if you're supposed to blame AR but AR is innocent?",
    flag: "flag{comfortable_narrative}",
    story: "You found a suspect. Your instinct feels right. But instinct isn't evidence.",
    isTrap: true,
    trapFeedback:
      "You solved this by building a narrative. But the evidence doesn't fully support it. You've proven how easy it is to construct guilt from fragments. Was this discovery, or confirmation bias?",
  },
  {
    id: "ch4-ev3",
    type: "log",
    title: "ALTERNATIVE_TIMELINE_RECONSTRUCTION",
    content: `RE-EXAMINED EVIDENCE:

What if we're asking the wrong questions?
What if the "incident" wasn't a breach but something else entirely?

Timeline Re-analysis:
Jan 5: Daemon code modified (developer shortcut added)
Jan 10: Admin-User-7 escalation attempt (failed normally, then succeeded via compromised daemon)
Jan 14: Archive access
Jan 14: Alert dismissed
Jan 14-15: Cover-up begins

But what if the daemon modification wasn't malicious?
What if Admin-User-7 was actually supposed to have access?
What if the "cover-up" was damage control for something else?

Question: What was actually stolen from the archive?
Status: File contents not recovered. Might be legitimate business data.

Alternative hypothesis: Not a criminal conspiracy.
Maybe: A failed authorization process, panic, and poor incident response.

The truth might be far more mundane than the story you've built.
Or the truth is hiding inside the mundane.

Files remaining: None to examine.
Your conclusion: Still uncertain.`,
    hint: "Step back. What if the case isn't solved, just interpreted? What if you've been solving the wrong mystery?",
    flag: "flag{uncertainty_remains}",
    story:
      "You've solved every piece. But the picture keeps shifting. Isn't that the nature of truth? Or the nature of being manipulated?",
    isTrap: false,
  },
]

interface ChapterFourDetectiveProps {
  onChapterComplete?: (completedEvidence: string[]) => void
}

export default function ChapterFourDetective({ onChapterComplete }: ChapterFourDetectiveProps) {
  const [solvedEvidence, setSolvedEvidence] = useState<Record<string, boolean>>({})
  const [trapTriggered, setTrapTriggered] = useState(false)

  const handleEvidenceSolve = (id: string, isCorrect: boolean, isTrap?: boolean) => {
    if (isCorrect) {
      if (isTrap) {
        setTrapTriggered(true)
      }

      setSolvedEvidence((prev) => {
        const updated = { ...prev, [id]: true }
        localStorage.setItem(`solved_${id}`, "true")
        if (isTrap) {
          localStorage.setItem(`trap_${id}`, "true")
        }

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
        <p className="text-xs font-mono text-accent mb-2">INVESTIGATION CLOSURE</p>
        <p className="text-sm text-muted-foreground">
          By now, you have a narrative. A conspiracy. Breadcrumbs leading to guilt. But have you proven it? Or have you
          simply found a story that fits? Examine the final evidence. And remember: some false conclusions feel very
          true.
        </p>
      </div>

      {caseEvidence.map((evidence) => {
        const isSolved = solvedEvidence[evidence.id] || !!localStorage.getItem(`solved_${evidence.id}`)
        return <EvidenceCard key={evidence.id} evidence={evidence} onSolve={handleEvidenceSolve} isSolved={isSolved} />
      })}

      {trapTriggered && (
        <div className="p-6 border-2 border-amber-500/50 bg-amber-500/10 space-y-3">
          <p className="text-xs font-mono text-amber-400 uppercase">INVESTIGATOR'S WARNING</p>
          <p className="text-sm text-foreground">
            You have completed the investigation. All evidence examined. All flags solved.
          </p>
          <p className="text-sm text-muted-foreground italic">
            But have you solved the mystery? Or simply solved the puzzle that was placed in front of you?
          </p>
        </div>
      )}
    </div>
  )
}
