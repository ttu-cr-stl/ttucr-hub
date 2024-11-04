-- First create a default session for existing submissions
INSERT INTO "HackathonSession" ("id", "username", "startTime", "endTime", "totalScore", "isActive")
SELECT 
    'default_session_' || "username",
    "username",
    MIN("createdAt"),
    MAX("updatedAt"),
    SUM(CASE WHEN "completed" THEN "score" ELSE 0 END),
    false
FROM "HackathonSubmission"
GROUP BY "username";

-- Add the sessionId column as nullable first
ALTER TABLE "HackathonSubmission" ADD COLUMN "sessionId" TEXT;

-- Update existing submissions to use the default session
UPDATE "HackathonSubmission"
SET "sessionId" = 'default_session_' || "username";

-- Now make the column required and add the foreign key
ALTER TABLE "HackathonSubmission" ALTER COLUMN "sessionId" SET NOT NULL;
ALTER TABLE "HackathonSubmission" ADD CONSTRAINT "HackathonSubmission_sessionId_fkey" 
    FOREIGN KEY ("sessionId") REFERENCES "HackathonSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Add the index
CREATE INDEX "HackathonSubmission_sessionId_idx" ON "HackathonSubmission"("sessionId"); 