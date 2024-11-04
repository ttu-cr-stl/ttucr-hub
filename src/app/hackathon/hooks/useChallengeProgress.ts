"use client";

import { useEffect, useState } from "react";
import { Challenge, UserProgress } from "../types";
import { calculateScore } from "../utils/scoring";

const STORAGE_KEY = "hackathon_progress";

export function useChallengeProgress(challenges: Challenge[]) {
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window === "undefined")
      return {
        currentChallengeId: challenges[0].id,
        completedChallenges: [],
        totalScore: 0,
      };

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }

    return {
      currentChallengeId: challenges[0].id,
      completedChallenges: [],
      totalScore: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const resetProgress = () => {
    const initialProgress = {
      currentChallengeId: challenges[0].id,
      completedChallenges: [],
      totalScore: 0,
    };
    setProgress(initialProgress);
    localStorage.removeItem(STORAGE_KEY);
  };

  const markChallengeComplete = (
    challengeId: string,
    executionTime: number
  ) => {
    setProgress((prev) => {
      const challenge = challenges.find(c => c.id === challengeId);
      if (!challenge) return prev;

      const score = calculateScore({
        executionTime,
        difficulty: challenge.difficulty
      });

      const existingProgress = prev.completedChallenges.find(
        (p) => p.id === challengeId
      );
      
      const newCompletedChallenges = existingProgress
        ? prev.completedChallenges.map((p) =>
            p.id === challengeId
              ? {
                  ...p,
                  completed: true,
                  attempts: p.attempts + 1,
                  bestTime: Math.min(executionTime, p.bestTime || Infinity),
                  lastAttempt: new Date(),
                  score: Math.max(score, p.score || 0) // Keep highest score
                }
              : p
          )
        : [
            ...prev.completedChallenges,
            {
              id: challengeId,
              completed: true,
              attempts: 1,
              bestTime: executionTime,
              lastAttempt: new Date(),
              score: score
            },
          ];

      // Find next uncompleted challenge
      const currentIndex = challenges.findIndex((c) => c.id === challengeId);
      const nextChallenge = challenges[currentIndex + 1];

      return {
        ...prev,
        completedChallenges: newCompletedChallenges,
        currentChallengeId: nextChallenge?.id || challengeId,
        totalScore: newCompletedChallenges.reduce((sum, c) => sum + (c.score || 0), 0)
      };
    });
  };

  return {
    progress,
    markChallengeComplete,
    currentChallengeIndex: challenges.findIndex(
      (c) => c.id === progress.currentChallengeId
    ),
    resetProgress,
  };
}
