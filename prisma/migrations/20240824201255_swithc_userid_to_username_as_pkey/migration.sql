/*
  Warnings:

  - You are about to drop the column `userId` on the `EventAttendance` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username,eventId]` on the table `EventAttendance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `EventAttendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventAttendance" DROP CONSTRAINT "EventAttendance_userId_fkey";

-- DropForeignKey
ALTER TABLE "_OrgToUser" DROP CONSTRAINT "_OrgToUser_B_fkey";

-- DropIndex
DROP INDEX "EventAttendance_userId_eventId_key";

-- AlterTable
ALTER TABLE "EventAttendance" DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("username");

-- CreateIndex
CREATE UNIQUE INDEX "EventAttendance_username_eventId_key" ON "EventAttendance"("username", "eventId");

-- AddForeignKey
ALTER TABLE "EventAttendance" ADD CONSTRAINT "EventAttendance_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrgToUser" ADD CONSTRAINT "_OrgToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("username") ON DELETE CASCADE ON UPDATE CASCADE;
