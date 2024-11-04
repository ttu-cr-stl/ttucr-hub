-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "closed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "userLimit" INTEGER;
