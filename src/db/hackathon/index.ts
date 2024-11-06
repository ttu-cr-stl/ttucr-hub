"use server";

import { sampleChallenges } from "@/app/hackathon/data/challenges";
import { calculateScore } from "@/app/hackathon/utils/scoring";
import prisma from "@/db/prisma";

export async function createHackathonSession(username: string) {
  if (!username) {
    throw new Error("Username is required");
  }

  try {
    console.log("Creating hackathon session for user:", username);

    const user = await prisma.user.findUnique({
      where: { username },    
    });

    if (!user) {
      throw new Error(`User ${username} not found`);
    }

    // Close any existing active sessions
    await prisma.hackathonSession.updateMany({
      where: {
        username,
        isActive: true,
      },
      data: {
        isActive: false,
        endTime: new Date(),
      },
    });

    // Create new session
    const session = await prisma.hackathonSession.create({
      data: {
        username,
        startTime: new Date(),
        isActive: true,
        totalScore: 0,
      },
    });

    return session;
  } catch (error) {
    console.error("Error in createHackathonSession:", error);
    throw error;
  }
}

export async function endHackathonSession(username: string, totalScore: number) {
  const session = await prisma.hackathonSession.findFirst({
    where: {
      username,
      isActive: true,
    },
    include: {
      submissions: true,
    },
  });

  if (!session) throw new Error("No active session found");

  // Recalculate total score from submissions
  const recalculatedScore = session.submissions.reduce((total, submission) => {
    if (!submission.completed) return total;
    const challenge = sampleChallenges.find(c => c.id === submission.challengeId);
    if (!challenge) return total;

    return total + calculateScore({
      completionTime: submission.completionTime,
      difficulty: challenge.difficulty,
    });
  }, 0);

  return prisma.hackathonSession.update({
    where: { id: session.id },
    data: {
      isActive: false,
      endTime: new Date(),
      totalScore: recalculatedScore,
    },
  });
}

export async function updateHackathonSubmission(
  username: string,
  challengeId: string,
  score: number,
  completionTime: number,
  completed: boolean
) {
  const activeSession = await prisma.hackathonSession.findFirst({
    where: {
      username,
      isActive: true,
    },
  });

  if (!activeSession) throw new Error("No active session found");

  const challenge = sampleChallenges.find(c => c.id === challengeId);
  if (!challenge) throw new Error("Challenge not found");

  // Recalculate score to ensure consistency
  const validatedScore = calculateScore({
    completionTime,
    difficulty: challenge.difficulty,
  });

  console.log('Updating submission with score:', {
    username,
    challengeId,
    calculatedScore: validatedScore,
    completionTime,
    sessionId: activeSession.id
  });

  // Try to find existing submission first
  const existingSubmission = await prisma.hackathonSubmission.findFirst({
    where: {
      username,
      challengeId,
      sessionId: activeSession.id
    }
  });

  if (existingSubmission) {
    return prisma.hackathonSubmission.update({
      where: {
        id: existingSubmission.id
      },
      data: {
        score: validatedScore,
        completionTime,
        completed,
      },
    });
  } else {
    return prisma.hackathonSubmission.create({
      data: {
        username,
        challengeId,
        sessionId: activeSession.id,
        score: validatedScore,
        completionTime,
        completed,
      },
    });
  }
}

export async function getHackathonRankings() {
  try {
    const rankings = await prisma.user.findMany({
      select: {
        username: true,
        profilePic: true,
        HackathonSession: {
          orderBy: [{ isActive: "desc" }, { totalScore: "desc" }],
          take: 2,
          select: {
            id: true,
            startTime: true,
            totalScore: true,
            isActive: true,
            endTime: true,
            submissions: {
              select: {
                challengeId: true,
                score: true,
                completionTime: true,
                completed: true,
                updatedAt: true,
              },
            },
          },
        },
      },
      orderBy: {
        points: "desc",
      },
    });

    return rankings;
  } catch (error) {
    console.error("Error fetching hackathon rankings:", error);
    throw error;
  }
}

export async function getUserHackathonProgress(username: string) {
  try {
    const activeSession = await prisma.hackathonSession.findFirst({
      where: {
        username,
        isActive: true,
      },
      include: {
        submissions: {
          select: {
            challengeId: true,
            score: true,
            completionTime: true,
            completed: true,
            updatedAt: true,
          },
        },
      },
    });

    return {
      submissions: activeSession?.submissions || [],
      activeSession,
    };
  } catch (error) {
    console.error("Error fetching user hackathon progress:", error);
    throw error;
  }
}

export async function updateUserPoints(username: string, points: number) {
  try {
    const user = await prisma.user.update({
      where: {
        username,
      },
      data: {
        points: {
          increment: points,
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Error updating user points:", error);
    throw error;
  }
}

// Add this function to test the database connection
export async function testDatabaseConnection() {
  try {
    const result = await prisma.user.findFirst();
    console.log(
      "Database connection test:",
      result ? "Success" : "No users found"
    );
    return true;
  } catch (error) {
    console.error("Database connection test failed:", error);
    return false;
  }
}

export async function updateHackathonSession(
  username: string,
  additionalScore: number
) {
  // Find the active session and add the new score to the existing total
  const session = await prisma.hackathonSession.findFirst({
    where: {
      username,
      isActive: true,
    },
  });

  if (!session) {
    throw new Error("No active session found");
  }

  return prisma.hackathonSession.update({
    where: {
      id: session.id,
    },
    data: {
      totalScore: {
        increment: additionalScore,
      },
    },
  });
}

export async function getActiveSession(username: string) {
  return prisma.hackathonSession.findFirst({
    where: {
      username,
      isActive: true,
    },
    select: {
      id: true,
      startTime: true,
      totalScore: true,
      isActive: true,
    },
  });
}

export async function cleanupAbandonedSessions() {
  const TWO_HOURS = 2 * 60 * 60 * 1000;

  await prisma.hackathonSession.updateMany({
    where: {
      isActive: true,
      startTime: {
        lt: new Date(Date.now() - TWO_HOURS),
      },
    },
    data: {
      isActive: false,
      endTime: new Date(),
    },
  });
}

// Add this temporary function to verify the migration
export async function verifyMigration() {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const submissions = await tx.hackathonSubmission.findMany({
        include: {
          session: true,
        },
      });

      const sessions = await tx.hackathonSession.findMany({
        include: {
          submissions: true,
        },
      });

      return {
        submissions: submissions.length,
        sessions: sessions.length,
        submissionsWithSession: submissions.filter((s) => s.sessionId).length,
      };
    });

    console.log("Migration verification:", result);
    return result;
  } catch (error) {
    console.error("Migration verification failed:", error);
    throw error;
  }
}
