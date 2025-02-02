/*
  Warnings:

  - The values [REVIEW] on the enum `TaskStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `subdomain` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Epic` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Epic` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Epic` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `Epic` table. All the data in the column will be lost.
  - You are about to drop the column `assignedToId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `epicId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `companyRole` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamMember` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[idx_subdomain]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clerkId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `description` on table `Epic` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskStatus_new" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');
ALTER TABLE "Task" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "TaskStatus_new" USING ("status"::text::"TaskStatus_new");
ALTER TYPE "TaskStatus" RENAME TO "TaskStatus_old";
ALTER TYPE "TaskStatus_new" RENAME TO "TaskStatus";
DROP TYPE "TaskStatus_old";
ALTER TABLE "Task" ALTER COLUMN "status" SET DEFAULT 'TODO';
COMMIT;

-- DropForeignKey
ALTER TABLE "Epic" DROP CONSTRAINT "Epic_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_assignedToId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_epicId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_companyId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_teamId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyId_fkey";

-- DropIndex
DROP INDEX "Company_subdomain_key";

-- DropIndex
DROP INDEX "User_email_companyId_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "subdomain",
ADD COLUMN     "idx_subdomain" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Epic" DROP COLUMN "endDate",
DROP COLUMN "startDate",
DROP COLUMN "status",
DROP COLUMN "teamId",
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "assignedToId",
DROP COLUMN "companyId",
DROP COLUMN "createdById",
DROP COLUMN "dueDate",
DROP COLUMN "epicId",
DROP COLUMN "priority",
DROP COLUMN "teamId",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "idx_assignedTo" TEXT,
ADD COLUMN     "idx_epic" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar",
DROP COLUMN "companyRole",
DROP COLUMN "password",
ADD COLUMN     "clerkId" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "companyId" DROP NOT NULL;

-- DropTable
DROP TABLE "Plan";

-- DropTable
DROP TABLE "Team";

-- DropTable
DROP TABLE "TeamMember";

-- DropEnum
DROP TYPE "CompanyRole";

-- DropEnum
DROP TYPE "EpicStatus";

-- DropEnum
DROP TYPE "Priority";

-- DropEnum
DROP TYPE "Role";

-- CreateIndex
CREATE UNIQUE INDEX "Company_idx_subdomain_key" ON "Company"("idx_subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_idx_epic_fkey" FOREIGN KEY ("idx_epic") REFERENCES "Epic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_idx_assignedTo_fkey" FOREIGN KEY ("idx_assignedTo") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
