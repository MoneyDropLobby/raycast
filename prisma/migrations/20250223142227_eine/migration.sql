/*
  Warnings:

  - A unique constraint covering the columns `[filialeId]` on the table `kassen` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "kassen_filialeId_key" ON "kassen"("filialeId");
