"use client";

import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Award, Clock } from "react-feather";
import { ChallengeProgress } from "../types";

interface ChallengeCompletionProps {
  completedChallenges: ChallengeProgress[];
  totalScore: number;
  onRestart: () => void;
  onViewRankings: () => void;
}

export function ChallengeCompletion({
  completedChallenges,
  totalScore,
  onRestart,
  onViewRankings,
}: ChallengeCompletionProps) {
  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        textAlign: "center",
        padding: "0 2rem",
      }}
    >
      <h1 className="text-4xl font-bold text-[#4AF626] mb-4">
        🎉 Congratulations! 🎉
      </h1>
      <p className="text-xl text-[#4AF626]/80 mb-8">
        You&apos;ve completed all challenges!
      </p>

      <div className="flex items-center gap-8 mb-12">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Award className="w-8 h-8 text-[#4AF626]" />
          </div>
          <div className="text-3xl font-bold text-[#4AF626] mb-1">
            {totalScore}
          </div>
          <div className="text-sm text-[#4AF626]/70">Total Score</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Clock className="w-8 h-8 text-[#4AF626]" />
          </div>
          <div className="text-3xl font-bold text-[#4AF626] mb-1">
            {completedChallenges.length}
          </div>
          <div className="text-sm text-[#4AF626]/70">Challenges Completed</div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={onRestart}
          className="bg-[#4AF626] text-black hover:bg-[#4AF626]/80"
        >
          Start New Session
        </Button>
        <Button
          onClick={onViewRankings}
          className="bg-black text-[#4AF626] border-2 border-[#4AF626] hover:bg-[#4AF626] hover:text-black transition-all duration-200"
        >
          <Award className="w-4 h-4 mr-2" />
          View Rankings
        </Button>
      </div>
    </motion.div>
  );
}
