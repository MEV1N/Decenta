"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavHeader() {
  const pathname = usePathname()

  const isDescending = pathname !== "/"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl font-mono">
          DECENDA
        </Link>

        {isDescending && (
          <nav className="flex gap-6 items-center">
            <Link href="/descent" className="text-sm text-foreground hover:text-accent transition-colors">
              Challenges
            </Link>
            <Link href="/leaderboard" className="text-sm text-foreground hover:text-accent transition-colors">
              Leaderboard
            </Link>
            <Link
              href="/descent"
              className="text-xs font-mono px-2 py-1 border border-border text-muted-foreground hover:text-accent transition-colors"
            >
              NOXERA
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
