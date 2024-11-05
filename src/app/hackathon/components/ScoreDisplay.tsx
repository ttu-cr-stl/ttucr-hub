"use client";

import { Award } from "react-feather";
import { cn } from "@/lib/utils/cn";

interface ScoreDisplayProps {
  score: number;
  className?: string;
}

export function ScoreDisplay({ score, className }: ScoreDisplayProps) {
  const displayScore = score ?? 0;

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-1 px-1.5 py-1",
        "bg-black/30 border border-[#4AF626]/30 rounded",
        "sm:gap-2 sm:px-3 sm:py-1.5 sm:rounded-md",
        "touch-target",
        className
      )}
    >
      <Award className="w-3 h-3 sm:w-4 sm:h-4 text-[#4AF626]" />
      <div className="flex items-baseline gap-0.5 sm:gap-1">
        <span className="text-[11px] sm:text-sm font-medium text-[#4AF626]">
          {displayScore}
        </span>
        <span className="text-[9px] sm:text-xs text-[#4AF626]/70">
          pts
        </span>
      </div>
    </div>
  );
} 