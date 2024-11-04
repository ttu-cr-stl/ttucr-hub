"use client";

import { useState, useEffect } from "react";
import { getHackathonRankings } from "@/db/hackathon";

interface HackathonSubmission {
  challengeId: string;
  score: number;
  executionTime: number;
  completed: boolean;
  updatedAt: Date;
  sessionId: string;
}

interface HackathonSession {
  id: string;
  startTime: Date;
  totalScore: number;
  isActive: boolean;
  endTime?: Date;
  submissions: HackathonSubmission[];
}

interface RankingUser {
  username: string;
  profilePic: string | null;
  HackathonSubmission: HackathonSubmission[];
  HackathonSession: HackathonSession[];
}

export function useRealTimeUpdates() {
  const [rankings, setRankings] = useState<RankingUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchRankings = async () => {
      try {
        const data = await getHackathonRankings(abortController.signal);
        if (!abortController.signal.aborted) {
          setRankings(data as unknown as RankingUser[]);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error('Ranking fetch error:', error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchRankings();
    const interval = setInterval(fetchRankings, 5000);
    
    return () => {
      abortController.abort();
      clearInterval(interval);
    };
  }, []);

  return { rankings, isLoading };
} 