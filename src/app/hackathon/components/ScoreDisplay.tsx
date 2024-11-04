"use client";

import { Award } from "react-feather";

interface ScoreDisplayProps {
  score: number;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  console.log('ScoreDisplay received score:', score);
  
  // Ensure score is a valid number and convert undefined/null to 0
  const displayScore = score ?? 0;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 border border-[#4AF626]/30 rounded-md">
      <Award className="w-4 h-4 text-[#4AF626]" />
      <div className="flex items-baseline gap-1">
        <span className="text-sm font-medium text-[#4AF626]">{displayScore}</span>
        <span className="text-xs text-[#4AF626]/70">points</span>
      </div>
    </div>
  );
} 