"use client";

import { useState, useEffect } from 'react';
import { ChallengeProgress } from '../types';
import { createHackathonSession, endHackathonSession, getActiveSession, getSession } from "@/db/hackathon";
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

interface UseHackathonStateReturn {
  hackathonState: HackathonState;
  finalState: HackathonFinalState | null;
  startHackathon: () => void;
  endHackathon: (progress: { completedChallenges: ChallengeProgress[]; totalScore: number }) => void;
  resetHackathon: () => void;
  hasActiveSession: boolean;
}

const STORAGE_KEYS = {
  CURRENT: 'hackathon_state',
  FINAL: 'hackathon_final_state'
} as const;

const TIME_LIMIT = 30 * 60 * 1000; // 30 minutes in milliseconds

export function useHackathonState(): UseHackathonStateReturn {
  const { user } = useAuthUser();

  const [hackathonState, setHackathonState] = useState<HackathonState>(() => ({
    startTime: null,
    hasStarted: false
  }));

  const [finalState, setFinalState] = useState<HackathonFinalState | null>(null);

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

  const endHackathon = async (progress: { completedChallenges: ChallengeProgress[]; totalScore: number }) => {
    if (!user?.username) return;
    
    try {
      const recalculatedScore = progress.completedChallenges.reduce((total, challenge) => {
        const challengeDetails = sampleChallenges.find(c => c.id === challenge.id);
        if (!challengeDetails || !challenge.bestTime) return total;
        
        return total + calculateScore({
          executionTime: challenge.bestTime,
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
        endType: 'manual',
      };
      
      setFinalState(finalState);
      setHackathonState({ startTime: null, hasStarted: true });
      
      await updateUserPoints(user.username, recalculatedScore);
    } catch (error) {
      console.error("Error ending hackathon:", error);
    }
  };

  const resetHackathon = () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT);
    localStorage.removeItem(STORAGE_KEYS.FINAL);
    
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