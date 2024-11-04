"use client";

import { Award, Clock, RotateCcw } from "react-feather";
import { ChallengeProgress } from "../types";

interface ChallengeStatsProps {
  progress?: ChallengeProgress;
  difficulty: "Easy" | "Medium" | "Hard";
}

export function ChallengeStats({ progress, difficulty }: ChallengeStatsProps) {
  if (!progress) return null;

  return (
    <div className="flex items-center gap-4 text-xs text-[#4AF626]/70">
      <div className="flex items-center gap-1">
        <Award className="w-3 h-3" />
        <span>{progress.completed ? "Completed" : "Not completed"}</span>
      </div>

      {progress.bestTime && (
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>Best: {progress.bestTime.toFixed(2)}ms</span>
        </div>
      )}

      <div className="flex items-center gap-1">
        <RotateCcw className="w-3 h-3" />
        <span>Attempts: {progress.attempts}</span>
      </div>
    </div>
  );
}
