"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Award, ChevronRight, Clock } from "react-feather";
import { sampleChallenges } from "../data/challenges";
import { useRealTimeUpdates } from "../hooks/useRealTimeUpdates";
import { calculateScore } from "../utils/scoring";
import { AsyncStateWrapper } from "./AsyncStateWrapper";
import { ScoreDisplay } from "./ScoreDisplay";

interface RankingsProps {
  className?: string;
}

interface HackathonSubmission {
  challengeId: string;
  score: number;
  completionTime: number;
  completed: boolean;
}

function formatCompletionTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

export function Rankings({ className }: RankingsProps) {
  const { rankings, isLoading } = useRealTimeUpdates();
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  const celebratedRef = useRef<Set<string>>(new Set());

  const getBestSession = useCallback((sessions: any[] = []) => {
    if (!sessions?.length) return null;

    const activeSession = sessions.find((s) => s?.isActive);

    // If there is an active session, calculate the total score
    if (activeSession) {
      activeSession.totalScore = (activeSession.submissions || []).reduce(
        (
          total: number,
          submission: {
            completed: boolean;
            challengeId: string;
            completionTime: number;
          }
        ) => {
          if (!submission?.completed) return total;

          const challenge = sampleChallenges.find(
            (c) => c.id === submission.challengeId
          );
          if (!challenge) return total;

          const score = calculateScore({
            completionTime: submission.completionTime,
            difficulty: challenge.difficulty,
          });

          console.log("Calculated score for submission:", {
            challengeId: submission.challengeId,
            completionTime: submission.completionTime,
            difficulty: challenge.difficulty,
            score,
          });

          return total + score;
        },
        0
      );
      return activeSession;
    }

    // If there is no active session, calculate the total score for the best completed session
    return sessions.reduce((best, current) => {
      if (!current?.submissions) return best;

      const currentScore = current.submissions.reduce(
        (total: number, submission: any) => {
          if (!submission?.completed) return total;
          const challenge = sampleChallenges.find(
            (c) => c.id === submission.challengeId
          );
          if (!challenge) return total;
          return (
            total +
            calculateScore({
              completionTime: submission.completionTime,
              difficulty: challenge.difficulty,
            })
          );
        },
        0
      );

      if (!best || currentScore > best.totalScore) {
        return { ...current, totalScore: currentScore };
      }
      return best;
    }, null);
  }, []);

  const sortedRankings = (rankings || []).filter(
    (user) => user?.HackathonSession?.length > 0
  )
  .sort((a, b) => {
    // Safely get the best session for each user
    const aSession = getBestSession(a.HackathonSession || []);
    const bSession = getBestSession(b.HackathonSession || []);

    // Get the total score for each session with null checks
    const aScore = aSession?.totalScore ?? 0;
    const bScore = bSession?.totalScore ?? 0;

    return bScore - aScore;

    // Sort by total score
    if (bScore !== aScore) {
  
    }

    // If the total score is the same, sort by completion time
    const aEndTime = aSession?.endTime
      ? new Date(aSession.endTime).getTime()
      : Infinity;
    const bEndTime = bSession?.endTime
      ? new Date(bSession.endTime).getTime()
      : Infinity;

    return aEndTime - bEndTime;
  });

  const calculateProgress = useCallback((session: any) => {
    if (!session?.submissions?.length) return 0;

    const uniqueCompletedChallenges = new Set(
      session.submissions
        .filter((submission: { completed: boolean }) => submission.completed)
        .map((submission: { challengeId: string }) => submission.challengeId)
    );

    return (uniqueCompletedChallenges.size / sampleChallenges.length) * 100;
  }, []);

  useEffect(() => {
    sortedRankings.forEach((user) => {
      const session = getBestSession(user.HackathonSession);
      const progress = calculateProgress(session);

      if (progress === 100 && !celebratedRef.current.has(user.username)) {
        celebratedRef.current.add(user.username);
        triggerConfetti();
      }
    });
  }, [sortedRankings, getBestSession, calculateProgress]);

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex items-center justify-between mb-2 px-2 sm:px-0">
        <h2 className="text-base font-semibold text-[#4AF626]">Rankings</h2>
        <Badge
          variant="outline"
          className="text-[#4AF626] border-[#4AF626]/30 text-[10px] px-1.5 py-0"
        >
          <Clock className="w-2.5 h-2.5 mr-0.5" />
          <span className="hidden sm:inline">Live Updates</span>
          <span className="sm:hidden">Live</span>
        </Badge>
      </div>

      <AsyncStateWrapper isLoading={isLoading} type="rankings">
        {sortedRankings.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-[#4AF626]/70">
            <div className="text-sm mb-2">No Active Participants</div>
            <div className="text-xs">
              Start a challenge to appear on the rankings!
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-2 sm:px-0">
            <div className="space-y-2 sm:space-y-1.5">
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
                      border: "1px solid rgba(74, 246, 38, 0.3)",
                      borderRadius: "0.375rem",
                      backgroundColor: "rgba(0, 0, 0, 0.3)",
                      overflow: "hidden",
                      ...(isExpanded && {
                        boxShadow: "0 0 0 1px rgba(74, 246, 38, 0.5)",
                      }),
                    }}
                  >
                    <div
                      className="p-2 sm:p-3 cursor-pointer hover:bg-[#4AF626]/5 transition-colors"
                      onClick={() =>
                        setExpandedUser(isExpanded ? null : user.username)
                      }
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="flex items-center gap-1 sm:gap-1.5 w-5 sm:w-6">
                          {index < 3 ? (
                            <Award
                              className={cn(
                                "w-3.5 h-3.5 sm:w-4 sm:h-4",
                                index === 0 && "text-yellow-500",
                                index === 1 && "text-gray-400",
                                index === 2 && "text-amber-600"
                              )}
                            />
                          ) : (
                            <span className="text-[#4AF626]/70 text-[10px] sm:text-xs">
                              #{index + 1}
                            </span>
                          )}
                        </div>

                        <Avatar className="w-5 h-5 sm:w-6 sm:h-6">
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

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-[11px] sm:text-xs text-[#4AF626] truncate">
                              {user.username}
                            </span>
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-[9px] sm:text-[10px] px-1 py-0 whitespace-nowrap",
                                bestSession?.isActive
                                  ? "text-yellow-500 border-yellow-500/30"
                                  : "text-[#4AF626]/30 border-[#4AF626]/30"
                              )}
                            >
                              {bestSession?.isActive ? "Active" : "Done"}
                            </Badge>
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

                        <div className="text-right ml-1 sm:ml-2">
                          <ScoreDisplay score={bestSession?.totalScore ?? 0} />
                          <div className="text-[9px] sm:text-[10px] text-[#4AF626]/70">
                            {bestSession && (
                              <span className="ml-1">
                                {bestSession.isActive ? "" : "In "}
                                {formatCompletionTime(
                                  bestSession.submissions.reduce(
                                    (
                                      total: number,
                                      submission: HackathonSubmission
                                    ) =>
                                      submission.completed
                                        ? total + submission.completionTime
                                        : total,
                                    0
                                  )
                                )}
                              </span>
                            )}
                          </div>
                        </div>

                        <ChevronRight
                          className={cn(
                            "w-3 h-3 text-[#4AF626]/50 transition-transform ml-1 sm:ml-2",
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
                          overflow: "hidden",
                          padding: "0.5rem 0.5rem 0.5rem 0.5rem",
                        }}
                      >
                        <div className="grid grid-cols-3 gap-1.5 pt-1.5 border-t border-[#4AF626]/10">
                          {sampleChallenges.map((challenge) => {
                            const submission = bestSession.submissions?.find(
                              (s: HackathonSubmission) =>
                                s.challengeId === challenge.id
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
                                {submission?.completed && (
                                  <div className="text-[#4AF626]/50">
                                    {formatCompletionTime(
                                      submission.completionTime
                                    )}
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
