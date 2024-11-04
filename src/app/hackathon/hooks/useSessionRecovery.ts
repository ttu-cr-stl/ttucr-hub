"use client";

import { useEffect } from 'react';
import { getActiveSession } from '@/db/hackathon';
import { useAuthUser } from '@/lib/providers/authProvider';

interface SessionRecoveryState {
  sessionId: string | null;
  startTime: Date | null;
  totalScore: number;
  lastSavedAt: Date | null;
}

export function useSessionRecovery() {
  const { user } = useAuthUser();
  const RECOVERY_KEY = 'hackathon_recovery_state';

  const saveSessionState = (state: SessionRecoveryState) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(RECOVERY_KEY, JSON.stringify(state));
    }
  };

  const recoverSession = async () => {
    if (!user?.username) return null;

    // Check localStorage first
    const savedState = localStorage.getItem(RECOVERY_KEY);
    if (savedState) {
      const parsed = JSON.parse(savedState);
      // Verify if saved session is still valid
      const activeSession = await getActiveSession(user.username);
      if (activeSession && activeSession.id === parsed.sessionId) {
        return {
          ...activeSession,
          recovered: true
        };
      }
    }

    // If no valid saved state, check for active session
    return await getActiveSession(user.username);
  };

  // Periodic state saving
  useEffect(() => {
    const interval = setInterval(() => {
      const currentState = {
        sessionId: /* current session id */,
        startTime: /* current start time */,
        totalScore: /* current score */,
        lastSavedAt: new Date()
      };
      saveSessionState(currentState);
    }, 5000); // Save every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return { recoverSession };
} 