-- AlterTable
ALTER TABLE "HackathonSubmission" DROP COLUMN "completionTime",
ADD COLUMN     "executionTime" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Challenge";

