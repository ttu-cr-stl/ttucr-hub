"use client";

import { useState, useEffect } from 'react';
import { ChallengeProgress } from '../types';
import { createHackathonSession, endHackathonSession, getActiveSession } from "@/db/hackathon";
import { useAuthUser } from "@/lib/providers/authProvider";
import { updateUserPoints } from "@/db/hackathon";
import { calculateScore } from "../utils/scoring";
import { sampleChallenges } from "../data/challenges";

interface HackathonState {
  startTime: Date | null;
  hasStarted: boolean;
  isLoading?: boolean;
}

interface HackathonFinalState {
  completedChallenges: ChallengeProgress[];
  totalScore: number;
  timeElapsed: number;
  finishedAt: number;
  endType: 'timeout' | 'manual';
}

export function useHackathonState() {
  const { user } = useAuthUser();
  const [hackathonState, setHackathonState] = useState<HackathonState>(() => ({
    startTime: null,
    hasStarted: false
  }));
  const [finalState, setFinalState] = useState<HackathonFinalState | null>(null);

  // Check for active session on mount and auth changes
  useEffect(() => {
    if (user?.username) {
      getActiveSession(user.username).then(session => {
        if (session) {
          setHackathonState({
            startTime: session.startTime,
            hasStarted: true
          });
        }
      });
    }
  }, [user?.username]);

  const startHackathon = async () => {
    if (!user?.username) return;
    
    setHackathonState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const session = await createHackathonSession(user.username);
      setHackathonState({
        startTime: session.startTime,
        hasStarted: true,
        isLoading: false
      });
    } catch (error) {
      console.error("Error starting hackathon:", error);
      setHackathonState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const endHackathon = async (progress: { completedChallenges: ChallengeProgress[]; totalScore: number; endType: 'timeout' | 'manual' }) => {
    if (!user?.username) return;
    
    try {
      // Recalculate score from submissions to ensure consistency
      const recalculatedScore = progress.completedChallenges.reduce((total, challenge) => {
        const challengeDetails = sampleChallenges.find(c => c.id === challenge.id);
        if (!challengeDetails || !challenge.bestTime) return total;
        
        return total + calculateScore({
          completionTime: challenge.bestTime,
          difficulty: challengeDetails.difficulty
        });
      }, 0);
      
      await endHackathonSession(user.username, recalculatedScore);
      
      const timeElapsed = hackathonState.startTime 
        ? Date.now() - hackathonState.startTime.getTime() 
        : 0;
      
      const finalState: HackathonFinalState = {
        completedChallenges: progress.completedChallenges,
        totalScore: recalculatedScore,
        timeElapsed,
        finishedAt: Date.now(),
        endType: progress.endType,
      };
      
      setFinalState(finalState);
      setHackathonState({ startTime: null, hasStarted: true });
      
      await updateUserPoints(user.username, recalculatedScore);
    } catch (error) {
      console.error("Error ending hackathon:", error);
    }
  };

  const resetHackathon = () => {
    setHackathonState({ startTime: null, hasStarted: false });
    setFinalState(null);
  };

  const hasActiveSession = Boolean(
    hackathonState.hasStarted || 
    hackathonState.startTime || 
    finalState
  );

  return {
    hackathonState,
    finalState,
    startHackathon,
    endHackathon,
    resetHackathon,
    hasActiveSession
  };
} 