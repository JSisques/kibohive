/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "clerkId" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Company_clerkId_key" ON "Company"("clerkId");
