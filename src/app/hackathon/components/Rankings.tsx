"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Award, ChevronRight, Clock } from "react-feather";
import { sampleChallenges } from "../data/challenges";
import { useRealTimeUpdates } from "../hooks/useRealTimeUpdates";
import { AsyncStateWrapper } from './AsyncStateWrapper';
import { calculateScore } from "../utils/scoring";

interface RankingsProps {
  className?: string;
}

function formatCompletionTime(timestamp: number | null): string {
  if (!timestamp) return '';
  
  const now = Date.now();
  const diff = now - timestamp;
  
  // Less than a minute
  if (diff < 60000) {
    return 'just now';
  }
  
  // Less than an hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes}m ago`;
  }
  
  // Less than a day
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours}h ago`;
  }
  
  // More than a day
  const days = Math.floor(diff / 86400000);
  return `${days}d ago`;
}

export function Rankings({ className }: RankingsProps) {
  const { rankings, isLoading } = useRealTimeUpdates();
  const [celebratedUsers, setCelebratedUsers] = useState<Set<string>>(new Set());
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  const sortedRankings = rankings
    .filter(user => user.HackathonSession?.length > 0)
    .sort((a, b) => {
      const aSession = getBestSession(a.HackathonSession);
      const bSession = getBestSession(b.HackathonSession);
      
      const aScore = aSession?.totalScore ?? 0;
      const bScore = bSession?.totalScore ?? 0;

      if (bScore !== aScore) {
        return bScore - aScore;
      }

      const aEndTime = aSession?.endTime ? new Date(aSession.endTime).getTime() : Infinity;
      const bEndTime = bSession?.endTime ? new Date(bSession.endTime).getTime() : Infinity;

      return aEndTime - bEndTime;
    });

  const getBestSession = (sessions: any[]) => {
    if (!sessions?.length) return null;
    
    const activeSession = sessions.find(s => s.isActive);
    if (activeSession) {
      activeSession.totalScore = activeSession.submissions.reduce((total: number, submission: { completed: boolean, challengeId: string, executionTime: number }) => {
        if (!submission.completed) return total;
        const challenge = sampleChallenges.find(c => c.id === submission.challengeId);
        if (!challenge) return total;
        return total + calculateScore({
          executionTime: submission.executionTime,
          difficulty: challenge.difficulty
        });
      }, 0);
      return activeSession;
    }
    return sessions.reduce((best, current) => {
      const currentScore = current.submissions.reduce((total: number, submission: { completed: boolean, challengeId: string, executionTime: number }) => {
        if (!submission.completed) return total;
        const challenge = sampleChallenges.find(c => c.id === submission.challengeId);
        if (!challenge) return total;
        return total + calculateScore({
          executionTime: submission.executionTime,
          difficulty: challenge.difficulty
        });
      }, 0);

      if (!best || currentScore > best.totalScore) {
        return { ...current, totalScore: currentScore };
      }
      return best;
    }, null);
  };

  const calculateProgress = (session: any) => {
    if (!session?.submissions?.length) return 0;
    
    const uniqueCompletedChallenges = new Set(
      session.submissions
        .filter((submission: { completed: boolean }) => submission.completed)
        .map((submission: { challengeId: string }) => submission.challengeId)
    );

    return (uniqueCompletedChallenges.size / sampleChallenges.length) * 100;
  };

  useEffect(() => {
    sortedRankings.forEach((user) => {
      const session = getBestSession(user.HackathonSession);
      const progress = calculateProgress(session);
      if (progress === 100 && !celebratedUsers.has(user.username)) {
        triggerConfetti();
        setCelebratedUsers((prev) => new Set([...prev, user.username]));
      }
    });
  }, [sortedRankings, celebratedUsers]);

  const triggerConfetti = () => {
    const duration = 2 * 1000;
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

      // Confetti from both sides
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
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-semibold text-[#4AF626]">Rankings</h2>
        <Badge
          variant="outline"
          className="text-[#4AF626] border-[#4AF626]/30 text-[10px] px-1.5 py-0"
        >
          <Clock className="w-2.5 h-2.5 mr-0.5" />
          Live Updates
        </Badge>
      </div>

      <AsyncStateWrapper
        isLoading={isLoading}
        type="rankings"
      >
        {sortedRankings.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-[#4AF626]/70">
            <div className="text-sm mb-2">No Active Participants</div>
            <div className="text-xs">Start a challenge to appear on the rankings!</div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-1.5">
              {sortedRankings.map((user, index) => {
                const bestSession = getBestSession(user.HackathonSession);
                const progress = calculateProgress(bestSession);
                const isExpanded = expandedUser === user.username;

                return (
                  <motion.div
                    key={user.username}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      border: '1px solid rgba(74, 246, 38, 0.3)',
                      borderRadius: '0.375rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      overflow: 'hidden',
                      ...(isExpanded && {
                        boxShadow: '0 0 0 1px rgba(74, 246, 38, 0.5)'
                      })
                    }}
                  >
                    <div
                      className="p-2 cursor-pointer hover:bg-[#4AF626]/5 transition-colors"
                      onClick={() => setExpandedUser(isExpanded ? null : user.username)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 w-6">
                          {index < 3 ? (
                            <Award
                              className={cn(
                                "w-4 h-4",
                                index === 0 && "text-yellow-500",
                                index === 1 && "text-gray-400",
                                index === 2 && "text-amber-600"
                              )}
                            />
                          ) : (
                            <span className="text-[#4AF626]/70 text-xs">
                              #{index + 1}
                            </span>
                          )}
                        </div>

                        <Avatar className="w-6 h-6">
                          {user.profilePic && (
                            <Image
                              src={user.profilePic}
                              alt={user.username}
                              width={24}
                              height={24}
                              className="object-cover rounded-full"
                            />
                          )}
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-xs text-[#4AF626]">
                              {user.username}
                            </span>
                            {bestSession?.isActive ? (
                              <Badge
                                variant="outline"
                                className="text-yellow-500 border-yellow-500/30 text-[10px] px-1 py-0"
                              >
                                Active
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="text-[#4AF626]/30 border-[#4AF626]/30 text-[10px] px-1 py-0"
                              >
                                Completed
                              </Badge>
                            )}
                          </div>

                          <div className="mt-1 space-y-0.5">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-black/30 rounded-full h-1 overflow-hidden">
                                <div
                                  className="h-full bg-[#4AF626] transition-all duration-500 ease-in-out"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>
                              <span className="text-[10px] text-[#4AF626]/70 min-w-[2.5rem]">
                                {Math.round(progress)}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-base font-bold text-[#4AF626]">
                            {bestSession?.totalScore ?? 0} pts
                          </div>
                          <div className="text-[10px] text-[#4AF626]/70">
                            {bestSession?.endTime && !bestSession.isActive && (
                              <span className="ml-1">
                                • {formatCompletionTime(new Date(bestSession.endTime).getTime())}
                              </span>
                            )}
                          </div>
                        </div>

                        <ChevronRight
                          className={cn(
                            "w-3 h-3 text-[#4AF626]/50 transition-transform",
                            isExpanded && "rotate-90"
                          )}
                        />
                      </div>
                    </div>

                    {isExpanded && bestSession && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{
                          overflow: 'hidden',
                          padding: '0.5rem 0.5rem 0.5rem 0.5rem'
                        }}
                      >
                        <div className="grid grid-cols-3 gap-1.5 pt-1.5 border-t border-[#4AF626]/10">
                          {sampleChallenges.map((challenge) => {
                            const submission = bestSession.submissions?.find(
                              (s: any) => s.challengeId === challenge.id
                            );

                            return (
                              <div
                                key={challenge.id}
                                className={cn(
                                  "text-[10px] border rounded p-1.5",
                                  submission?.completed
                                    ? "border-[#4AF626]/20"
                                    : "border-dashed border-[#4AF626]/10"
                                )}
                              >
                                <div className="flex items-center justify-between mb-0.5">
                                  <span className="text-[#4AF626]/70">
                                    {challenge.title}
                                  </span>
                                  {submission?.completed && (
                                    <Badge className="bg-[#4AF626]/20 text-[#4AF626] text-[10px] px-1 py-0">
                                      {submission.score}
                                    </Badge>
                                  )}
                                </div>
                                {submission && (
                                  <div className="text-[#4AF626]/50">
                                    {submission.executionTime.toFixed(2)}ms
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </AsyncStateWrapper>
    </div>
  );
}
