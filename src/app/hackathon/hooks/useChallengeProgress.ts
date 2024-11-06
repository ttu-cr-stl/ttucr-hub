"use client";

import { useEffect, useState } from "react";
import { Challenge, UserProgress } from "../types";
import { calculateScore } from "../utils/scoring";
import { getUserHackathonProgress, updateHackathonSubmission } from "@/db/hackathon";
import { useAuthUser } from "@/lib/providers/authProvider";

export function useChallengeProgress(challenges: Challenge[]) {
  const { user } = useAuthUser();
  const [progress, setProgress] = useState<UserProgress>(() => ({
    currentChallengeId: challenges[0].id,
    completedChallenges: [],
    totalScore: 0,
  }));

  // Load progress from database on mount
  useEffect(() => {
    if (user?.username) {
      getUserHackathonProgress(user.username).then(({ submissions }) => {
        const completedChallenges = submissions.map(submission => ({
          id: submission.challengeId,
          completed: submission.completed,
          attempts: 1, // This could be tracked in the database if needed
          bestTime: submission.completionTime,
          lastAttempt: submission.updatedAt,
          score: submission.score
        }));

        const totalScore = submissions.reduce((sum, s) => sum + s.score, 0);
        const lastCompletedIndex = challenges.findIndex(
          c => c.id === submissions[submissions.length - 1]?.challengeId
        );
        const nextChallengeId = challenges[lastCompletedIndex + 1]?.id || challenges[0].id;

        setProgress({
          currentChallengeId: nextChallengeId,
          completedChallenges,
          totalScore
        });
      });
    }
  }, [user?.username, challenges]);

  const markChallengeComplete = async (challengeId: string, completionTime: number) => {
    if (!user?.username) return;

    try {
      const challenge = challenges.find(c => c.id === challengeId);
      if (!challenge) return;

      const score = calculateScore({
        completionTime,
        difficulty: challenge.difficulty
      });

      await updateHackathonSubmission(
        user.username,
        challengeId,
        score,
        completionTime,
        true
      );

      setProgress(prev => {
        const existingProgress = prev.completedChallenges.find(p => p.id === challengeId);
        const newCompletedChallenges = existingProgress
          ? prev.completedChallenges.map(p =>
              p.id === challengeId
                ? {
                    ...p,
                    completed: true,
                    attempts: p.attempts + 1,
                    bestTime: Math.min(completionTime, p.bestTime || Infinity),
                    lastAttempt: new Date(),
                    score
                  }
                : p
            )
          : [
              ...prev.completedChallenges,
              {
                id: challengeId,
                completed: true,
                attempts: 1,
                bestTime: completionTime,
                lastAttempt: new Date(),
                score
              }
            ];

        const currentIndex = challenges.findIndex(c => c.id === challengeId);
        const nextChallenge = challenges[currentIndex + 1];

        return {
          ...prev,
          completedChallenges: newCompletedChallenges,
          currentChallengeId: nextChallenge?.id || challengeId,
          totalScore: newCompletedChallenges.reduce((sum, c) => sum + c.score, 0)
        };
      });
    } catch (error) {
      console.error("Error updating challenge progress:", error);
    }
  };

  const resetProgress = () => {
    setProgress({
      currentChallengeId: challenges[0].id,
      completedChallenges: [],
      totalScore: 0
    });
  };

  return {
    progress,
    markChallengeComplete,
    currentChallengeIndex: challenges.findIndex(
      c => c.id === progress.currentChallengeId
    ),
    resetProgress
  };
}
