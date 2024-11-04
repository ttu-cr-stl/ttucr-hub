-- Create HackathonSubmission table
CREATE TABLE "HackathonSubmission" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "executionTime" DOUBLE PRECISION NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    
    CONSTRAINT "HackathonSubmission_pkey" PRIMARY KEY ("id")
);

-- Create HackathonSession table
CREATE TABLE "HackathonSession" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "totalScore" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    
    CONSTRAINT "HackathonSession_pkey" PRIMARY KEY ("id")
);

-- Add foreign key constraints
ALTER TABLE "HackathonSubmission" ADD CONSTRAINT "HackathonSubmission_username_fkey"
    FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "HackathonSession" ADD CONSTRAINT "HackathonSession_username_fkey"
    FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Add unique constraint
CREATE UNIQUE INDEX "HackathonSubmission_username_challengeId_key" ON "HackathonSubmission"("username", "challengeId"); 