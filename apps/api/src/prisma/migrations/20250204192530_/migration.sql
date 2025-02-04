/*
  Warnings:

  - You are about to drop the column `clerkId` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idx_clerkId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Company_clerkId_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "clerkId",
ADD COLUMN     "idx_clerkId" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Company_idx_clerkId_key" ON "Company"("idx_clerkId");
