"use client";

import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import React from "react";
import { ChevronRight } from "react-feather";
import { AsyncStateWrapper } from './AsyncStateWrapper';
import { calculateScore } from "../utils/scoring";

interface ChallengeCelebrationProps {
  score: number;
  executionTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  onNext: () => void;
  isLastChallenge?: boolean;
}

export function ChallengeCelebration({
  score,
  executionTime,
  difficulty,
  onNext,
  isLastChallenge,
}: ChallengeCelebrationProps) {
  console.log('Raw score:', score);
  console.log('Score type:', typeof score);
  
  const validScore = typeof score === 'number' && !isNaN(score) ? score : 0;
  console.log('Validated score:', validScore);

  const validExecutionTime = isFinite(executionTime) ? executionTime : 0;

  React.useEffect(() => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 50,
      }}
    >
      <div className="bg-black border border-[#4AF626] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-[#4AF626] mb-4">
          Challenge Complete! 🎉
        </h2>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-[#4AF626]/70">Score:</span>
            <span className="text-[#4AF626] text-xl">{validScore} points</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#4AF626]/70">Execution Time:</span>
            <span className="text-[#4AF626]">
              {validExecutionTime.toFixed(4)}ms
            </span>
          </div>
        </div>

        <Button
          onClick={onNext}
          className="w-full bg-[#4AF626] text-black hover:bg-[#4AF626]/80"
        >
          <span className="flex items-center gap-2">
            Next Challenge
            <ChevronRight className="w-4 h-4" />
          </span>
        </Button>
      </div>
    </motion.div>
  );
}
