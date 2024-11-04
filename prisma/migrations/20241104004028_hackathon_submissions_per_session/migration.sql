/*
  Warnings:

  - A unique constraint covering the columns `[username,challengeId,sessionId]` on the table `HackathonSubmission` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "HackathonSubmission_username_challengeId_key";

-- AlterTable
ALTER TABLE "HackathonSubmission" ALTER COLUMN "score" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "HackathonSubmission_username_challengeId_sessionId_key" ON "HackathonSubmission"("username", "challengeId", "sessionId");
