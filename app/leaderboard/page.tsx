"use client"

import { useEffect, useState } from "react"
import { NavHeader } from "@/components/nav-header"

interface LeaderboardEntry {
  rank: number
  username: string
  score: number
  solved: number
  jackpot: boolean
  lastActivity: string
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [sortBy, setSortBy] = useState<"score" | "solved" | "lastActivity">("score")

  useEffect(() => {
    // Mock leaderboard data - replace with API call later
    const data: LeaderboardEntry[] = [
      {
        rank: 1,
        username: "SEEKER_ALPHA",
        score: 450,
        solved: 8,
        jackpot: true,
        lastActivity: "2 hours ago",
      },
      {
        rank: 2,
        username: "VOIDWALKER",
        score: 425,
        solved: 7,
        jackpot: false,
        lastActivity: "5 hours ago",
      },
      {
        rank: 3,
        username: "ECHOES",
        score: 400,
        solved: 7,
        jackpot: false,
        lastActivity: "1 day ago",
      },
      {
        rank: 4,
        username: "DESCENT_BOUND",
        score: 350,
        solved: 6,
        jackpot: false,
        lastActivity: "3 hours ago",
      },
      {
        rank: 5,
        username: "NOXERA_MARKED",
        score: 325,
        solved: 5,
        jackpot: true,
        lastActivity: "12 hours ago",
      },
      {
        rank: 6,
        username: "SILENT_HUNTER",
        score: 300,
        solved: 5,
        jackpot: false,
        lastActivity: "2 days ago",
      },
      {
        rank: 7,
        username: "THE_WATCHER",
        score: 275,
        solved: 4,
        jackpot: false,
        lastActivity: "18 hours ago",
      },
      {
        rank: 8,
        username: "FRAGMENTED",
        score: 250,
        solved: 4,
        jackpot: false,
        lastActivity: "4 days ago",
      },
    ]

    setLeaderboard(
      data.sort((a, b) => {
        if (sortBy === "score") return b.score - a.score
        if (sortBy === "solved") return b.solved - a.solved
        return 0
      }),
    )
  }, [sortBy])

  const totalContestants = 1247
  const totalSolved = 6892
  const totalJackpots = 47

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-12">
      <NavHeader />

      <div className="max-w-5xl mx-auto px-4">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-4xl font-bold">The Descent Records</h2>
            <p className="text-muted-foreground">A ledger of those who have ventured deep. A record of the fallen.</p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-border bg-card/30 p-6 space-y-2 hover:border-accent/30 transition-colors">
              <div className="text-xs font-mono text-accent uppercase">Total Contestants</div>
              <div className="text-4xl font-bold">{totalContestants.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">souls who answered the call</div>
            </div>
            <div className="border border-border bg-card/30 p-6 space-y-2 hover:border-accent/30 transition-colors">
              <div className="text-xs font-mono text-accent uppercase">Challenges Solved</div>
              <div className="text-4xl font-bold">{totalSolved.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">fragments uncovered</div>
            </div>
            <div className="border border-border bg-card/30 p-6 space-y-2 hover:border-accent/30 transition-colors">
              <div className="text-xs font-mono text-accent uppercase">Jackpots Found</div>
              <div className="text-4xl font-bold">{totalJackpots}</div>
              <div className="text-xs text-muted-foreground">marked by the descent</div>
            </div>
          </div>

          {/* Sorting Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy("score")}
              className={`px-4 py-2 text-sm font-mono transition-colors ${
                sortBy === "score"
                  ? "bg-accent text-accent-foreground border border-accent"
                  : "bg-muted/20 text-foreground border border-border hover:border-accent/50"
              }`}
            >
              By Depth
            </button>
            <button
              onClick={() => setSortBy("solved")}
              className={`px-4 py-2 text-sm font-mono transition-colors ${
                sortBy === "solved"
                  ? "bg-accent text-accent-foreground border border-accent"
                  : "bg-muted/20 text-foreground border border-border hover:border-accent/50"
              }`}
            >
              By Flags
            </button>
          </div>

          {/* Leaderboard Table */}
          <div className="border border-border bg-card/20 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 p-6 bg-muted/20 border-b border-border font-mono text-xs font-semibold text-accent uppercase">
              <div className="col-span-1">Rank</div>
              <div className="col-span-4">Contestant</div>
              <div className="col-span-2 text-right">Depth</div>
              <div className="col-span-2 text-right">Flags</div>
              <div className="col-span-3 text-right">Status</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border">
              {leaderboard.map((entry, idx) => (
                <div
                  key={entry.rank}
                  className={`grid grid-cols-12 gap-4 p-6 font-mono text-sm transition-all hover:bg-accent/5 ${
                    idx % 2 === 0 ? "bg-background/50" : "bg-muted/5"
                  } ${entry.jackpot ? "border-l-2 border-accent" : ""}`}
                >
                  <div className="col-span-1 font-bold text-accent">#{entry.rank}</div>
                  <div className="col-span-4">
                    <div className="font-semibold text-foreground">{entry.username}</div>
                    <div className="text-xs text-muted-foreground">{entry.lastActivity}</div>
                  </div>
                  <div className="col-span-2 text-right text-foreground font-bold">{entry.score}</div>
                  <div className="col-span-2 text-right text-muted-foreground">{entry.solved}</div>
                  <div className="col-span-3 text-right">
                    {entry.jackpot ? (
                      <span className="text-accent">🩸 MARKED</span>
                    ) : (
                      <span className="text-muted-foreground">−</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Note */}
          <div className="space-y-4 p-6 bg-muted/10 border border-border">
            <p className="text-sm text-muted-foreground italic">
              The leaderboard is a record, not a promise. Scores may shift. Entries may disappear. The truth, as always,
              is selective.
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              Last updated: just now • Refresh for live standings
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
