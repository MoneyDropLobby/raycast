/*
  Warnings:

  - You are about to drop the `artikel_untergruppen` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Artikel" DROP CONSTRAINT "Artikel_untergruppeId_fkey";

-- DropForeignKey
ALTER TABLE "_ArtikelUntergruppeToKassen" DROP CONSTRAINT "_ArtikelUntergruppeToKassen_A_fkey";

-- DropForeignKey
ALTER TABLE "artikel_untergruppen" DROP CONSTRAINT "artikel_untergruppen_hauptgruppeId_fkey";

-- DropTable
DROP TABLE "artikel_untergruppen";

-- CreateTable
CREATE TABLE "ArtikelUntergruppe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "beschreibung" TEXT,
    "aktiv" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hauptgruppeId" TEXT NOT NULL,

    CONSTRAINT "ArtikelUntergruppe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArtikelUntergruppe_id_key" ON "ArtikelUntergruppe"("id");

-- AddForeignKey
ALTER TABLE "ArtikelUntergruppe" ADD CONSTRAINT "ArtikelUntergruppe_hauptgruppeId_fkey" FOREIGN KEY ("hauptgruppeId") REFERENCES "ArtikelHauptgruppe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artikel" ADD CONSTRAINT "Artikel_untergruppeId_fkey" FOREIGN KEY ("untergruppeId") REFERENCES "ArtikelUntergruppe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtikelUntergruppeToKassen" ADD CONSTRAINT "_ArtikelUntergruppeToKassen_A_fkey" FOREIGN KEY ("A") REFERENCES "ArtikelUntergruppe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
