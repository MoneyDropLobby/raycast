/*
  Warnings:

  - You are about to drop the `kassen` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "KassenLayout" DROP CONSTRAINT "KassenLayout_kassenId_fkey";

-- DropForeignKey
ALTER TABLE "_ArtikelUntergruppeToKassen" DROP CONSTRAINT "_ArtikelUntergruppeToKassen_B_fkey";

-- DropForeignKey
ALTER TABLE "kassen" DROP CONSTRAINT "kassen_filialeId_fkey";

-- DropTable
DROP TABLE "kassen";

-- CreateTable
CREATE TABLE "Kassen" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "filialeId" TEXT NOT NULL,
    "kassenLayoutId" TEXT NOT NULL,

    CONSTRAINT "Kassen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kassen_id_key" ON "Kassen"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Kassen_filialeId_key" ON "Kassen"("filialeId");

-- AddForeignKey
ALTER TABLE "Kassen" ADD CONSTRAINT "Kassen_filialeId_fkey" FOREIGN KEY ("filialeId") REFERENCES "Filiale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KassenLayout" ADD CONSTRAINT "KassenLayout_kassenId_fkey" FOREIGN KEY ("kassenId") REFERENCES "Kassen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtikelUntergruppeToKassen" ADD CONSTRAINT "_ArtikelUntergruppeToKassen_B_fkey" FOREIGN KEY ("B") REFERENCES "Kassen"("id") ON DELETE CASCADE ON UPDATE CASCADE;
