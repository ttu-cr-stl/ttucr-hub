"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Award, Clock, Flag } from "react-feather";
import { ChallengeProgress } from "../types";

interface TimeUpCompletionProps {
  completedChallenges: ChallengeProgress[];
  totalScore: number;
  timeElapsed: number;
  onRestart: () => void;
  onViewRankings: () => void;
  endType: 'timeout' | 'manual';
}

export function TimeUpCompletion({
  completedChallenges,
  totalScore,
  timeElapsed,
  onRestart,
  onViewRankings,
  endType,
}: TimeUpCompletionProps) {
  // Convert milliseconds to minutes and seconds
  const minutes = Math.floor((timeElapsed / 1000) / 60);
  const seconds = Math.floor((timeElapsed / 1000) % 60);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        padding: '0 2rem'
      }}
    >
      <div className="mb-8">
        {endType === 'timeout' ? (
          <>
            <h1 className="text-4xl font-bold text-[#4AF626] mb-2">
              Time&apos;s Up!
            </h1>
            <p className="text-xl text-[#4AF626]/80">
              Your session has ended. Here&apos;s how you did:
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-[#4AF626] mb-2 flex items-center justify-center gap-3">
              <Flag className="w-8 h-8" />
              Session Complete
            </h1>
            <p className="text-xl text-[#4AF626]/80">
              You&apos;ve ended your session. Here&apos;s your performance:
            </p>
          </>
        )}
      </div>

      <div className="flex items-center gap-12 mb-12">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Award className="w-8 h-8 text-[#4AF626]" />
          </div>
          <div className="text-3xl font-bold text-[#4AF626] mb-1">
            {totalScore}
          </div>
          <div className="text-sm text-[#4AF626]/70">Final Score</div>
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

      <div className="mb-8 p-4 border border-[#4AF626]/30 rounded-md bg-black/30">
        <h3 className="text-sm font-medium text-[#4AF626] mb-2">Session Summary</h3>
        <div className="text-sm text-[#4AF626]/70 space-y-1">
          <p>Time Elapsed: {minutes}m {seconds}s</p>
          <p>Challenges Attempted: {completedChallenges.length}</p>
          <p>Average Time per Challenge: {completedChallenges.length > 0 
            ? `${(completedChallenges.reduce((acc, curr) => acc + (curr.bestTime || 0), 0) / completedChallenges.length).toFixed(2)}s`
            : 'N/A'
          }</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={onRestart}
          className="bg-[#4AF626] text-black hover:bg-[#4AF626]/80"
        >
          Start New Challenge
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