"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Lock } from "react-feather";
import { Challenge, ChallengeProgress } from "../types";

interface ChallengeNavigationProps {
  challenges: Challenge[];
  currentChallengeIndex: number;
  progress: ChallengeProgress[];
  onNavigate: (index: number) => void;
}

export function ChallengeNavigation({
  challenges,
  currentChallengeIndex,
  progress,
  onNavigate,
}: ChallengeNavigationProps) {
  const progressPercentage =
    (progress.filter((p) => p.completed).length / challenges.length) * 100;

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-[#4AF626]/70">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="bg-black/30 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-[#4AF626] transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Challenge Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          size="icon"
          disabled={currentChallengeIndex === 0}
          onClick={() => onNavigate(currentChallengeIndex - 1)}
          className="text-[#4AF626] hover:text-[#4AF626]/80 hover:bg-[#4AF626]/10"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex-1 flex justify-center gap-2">
          {challenges.map((challenge: Challenge, index: number) => {
            const isCompleted = progress.find(
              (p) => p.id === challenge.id
            )?.completed;
            const isLocked =
              index > 0 &&
              !progress.find((p) => p.id === challenges[index - 1].id)
                ?.completed;
            const isCurrent = index === currentChallengeIndex;

            return (
              <motion.div
                key={challenge.id}
                whileHover={!isLocked ? { scale: 1.1 } : undefined}
                whileTap={!isLocked ? { scale: 0.95 } : undefined}
                style={{
                  display: "inline-block",
                }}
              >
                <button
                  disabled={isLocked}
                  onClick={() => onNavigate(index)}
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    border transition-all
                    ${
                      isCurrent
                        ? "border-[#4AF626] bg-[#4AF626]/10"
                        : "border-[#4AF626]/30"
                    }
                    ${
                      isLocked
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:border-[#4AF626] hover:bg-[#4AF626]/10"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 text-[#4AF626]" />
                  ) : isLocked ? (
                    <Lock className="h-3 w-3 text-[#4AF626]/50" />
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>

        <Button
          variant="ghost"
          size="icon"
          disabled={currentChallengeIndex === challenges.length - 1}
          onClick={() => onNavigate(currentChallengeIndex + 1)}
          className="text-[#4AF626] hover:text-[#4AF626]/80 hover:bg-[#4AF626]/10"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
