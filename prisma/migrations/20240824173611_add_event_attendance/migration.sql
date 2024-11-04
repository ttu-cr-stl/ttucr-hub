/*
  Warnings:

  - You are about to drop the `_UserToEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserToEvent" DROP CONSTRAINT "_UserToEvent_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToEvent" DROP CONSTRAINT "_UserToEvent_B_fkey";

-- DropTable
DROP TABLE "_UserToEvent";

-- CreateTable
CREATE TABLE "EventAttendance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "signedUp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attended" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EventAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventAttendance_userId_eventId_key" ON "EventAttendance"("userId", "eventId");

-- AddForeignKey
ALTER TABLE "EventAttendance" ADD CONSTRAINT "EventAttendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAttendance" ADD CONSTRAINT "EventAttendance_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
