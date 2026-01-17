"use client"

import { useState } from "react"
import Link from "next/link"

export default function Landing() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Ambient background effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Prologue Section */}
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Title */}
          <div className="space-y-4 fade-in">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-sans">DECENDA</h1>
            <p className="text-lg md:text-xl text-muted-foreground italic">
              "A story of descent — not into darkness, but into understanding."
            </p>
          </div>

          {/* Prologue Text */}
          <div className="space-y-6 my-12">
            <div className="text-left space-y-4">
              <p
                className="text-base md:text-lg text-muted-foreground leading-relaxed fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                Quiet deaths scattered across digital traces. Files found where they shouldn't exist. Breadcrumbs left
                behind by something—or someone.
              </p>
              <p
                className="text-base md:text-lg text-muted-foreground leading-relaxed fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                You weren't assigned this task. You don't have orders. Yet here you are, drawn deeper by fragments of
                truth.
              </p>
              <p
                className="text-base md:text-lg text-muted-foreground leading-relaxed fade-in"
                style={{ animationDelay: "0.6s" }}
              >
                The question isn't whether you can solve the puzzle. The question is whether you should.
              </p>
            </div>
          </div>

          {/* Story Tags */}
          <div className="flex flex-wrap gap-2 justify-center py-8 fade-in" style={{ animationDelay: "0.8s" }}>
            <span className="px-3 py-1 text-xs font-mono bg-muted text-muted-foreground border border-border">
              CLASSIFIED
            </span>
            <span className="px-3 py-1 text-xs font-mono bg-muted text-muted-foreground border border-border">
              DECENDA
            </span>
            <span className="px-3 py-1 text-xs font-mono bg-muted text-muted-foreground border border-border">
              NOXERA
            </span>
          </div>

          {/* CTA Button */}
          <div className="pt-8 fade-in" style={{ animationDelay: "1s" }}>
            <Link
              href="/descent"
              onClick={() => setIsLoading(true)}
              className="inline-flex items-center justify-center px-8 py-3 font-mono text-sm font-semibold text-accent-foreground bg-accent hover:bg-accent/90 border border-accent transition-all duration-200 relative overflow-hidden group"
            >
              <span className="relative z-10">Begin the Descent</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>

          {/* Status Indicator */}
          <div className="text-xs text-muted-foreground font-mono pt-8 fade-in" style={{ animationDelay: "1.2s" }}>
            <span className="inline-block w-2 h-2 rounded-full bg-accent mr-2 animate-pulse"></span>
            The descent awaits
          </div>
        </div>
      </div>
    </main>
  )
}
