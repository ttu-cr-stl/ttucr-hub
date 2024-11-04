-- CreateIndex
DROP INDEX IF EXISTS "HackathonSubmission_username_challengeId_key";

-- AlterTable
ALTER TABLE "HackathonSubmission" 
ADD COLUMN IF NOT EXISTS "sessionId" TEXT,
ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Update existing submissions with a session ID if they don't have one
WITH DefaultSession AS (
  INSERT INTO "HackathonSession" ("id", "username", "startTime", "totalScore", "isActive")
  SELECT 
    'legacy_' || "username",
    "username",
    CURRENT_TIMESTAMP,
    0,
    false
  FROM "HackathonSubmission"
  WHERE "sessionId" IS NULL
  GROUP BY "username"
  RETURNING "id", "username"
)
UPDATE "HackathonSubmission" hs
SET "sessionId" = ds.id
FROM DefaultSession ds
WHERE hs."username" = ds.username
AND hs."sessionId" IS NULL;

-- Add foreign key constraints
ALTER TABLE "HackathonSubmission"
ADD CONSTRAINT "HackathonSubmission_sessionId_fkey"
FOREIGN KEY ("sessionId")
REFERENCES "HackathonSession"("id")
ON DELETE CASCADE;

-- Create new unique constraint
ALTER TABLE "HackathonSubmission"
ADD CONSTRAINT "HackathonSubmission_username_challengeId_sessionId_key"
UNIQUE ("username", "challengeId", "sessionId");

-- Create indices
CREATE INDEX "HackathonSubmission_sessionId_idx" ON "HackathonSubmission"("sessionId");
CREATE INDEX "HackathonSubmission_username_idx" ON "HackathonSubmission"("username");
CREATE INDEX "HackathonSession_username_isActive_idx" ON "HackathonSession"("username", "isActive");
CREATE INDEX "HackathonSession_username_idx" ON "HackathonSession"("username"); 