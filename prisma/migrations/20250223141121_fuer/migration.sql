/*
  Warnings:

  - You are about to drop the `ArtikelUntergruppe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Kassen` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Artikel" DROP CONSTRAINT "Artikel_untergruppeId_fkey";

-- DropForeignKey
ALTER TABLE "ArtikelUntergruppe" DROP CONSTRAINT "ArtikelUntergruppe_hauptgruppeId_fkey";

-- DropForeignKey
ALTER TABLE "Kassen" DROP CONSTRAINT "Kassen_filialeId_fkey";

-- DropForeignKey
ALTER TABLE "KassenLayout" DROP CONSTRAINT "KassenLayout_kassenId_fkey";

-- DropTable
DROP TABLE "ArtikelUntergruppe";

-- DropTable
DROP TABLE "Kassen";

-- CreateTable
CREATE TABLE "kassen" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "filialeId" TEXT NOT NULL,
    "kassenLayoutId" TEXT NOT NULL,

    CONSTRAINT "kassen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artikel_untergruppen" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "beschreibung" TEXT,
    "aktiv" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hauptgruppeId" TEXT NOT NULL,

    CONSTRAINT "artikel_untergruppen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KassenArtikelFreigabe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_KassenArtikelFreigabe_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "kassen_id_key" ON "kassen"("id");

-- CreateIndex
CREATE UNIQUE INDEX "artikel_untergruppen_id_key" ON "artikel_untergruppen"("id");

-- CreateIndex
CREATE INDEX "_KassenArtikelFreigabe_B_index" ON "_KassenArtikelFreigabe"("B");

-- AddForeignKey
ALTER TABLE "kassen" ADD CONSTRAINT "kassen_filialeId_fkey" FOREIGN KEY ("filialeId") REFERENCES "Filiale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KassenLayout" ADD CONSTRAINT "KassenLayout_kassenId_fkey" FOREIGN KEY ("kassenId") REFERENCES "kassen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artikel_untergruppen" ADD CONSTRAINT "artikel_untergruppen_hauptgruppeId_fkey" FOREIGN KEY ("hauptgruppeId") REFERENCES "ArtikelHauptgruppe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artikel" ADD CONSTRAINT "Artikel_untergruppeId_fkey" FOREIGN KEY ("untergruppeId") REFERENCES "artikel_untergruppen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KassenArtikelFreigabe" ADD CONSTRAINT "_KassenArtikelFreigabe_A_fkey" FOREIGN KEY ("A") REFERENCES "artikel_untergruppen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KassenArtikelFreigabe" ADD CONSTRAINT "_KassenArtikelFreigabe_B_fkey" FOREIGN KEY ("B") REFERENCES "kassen"("id") ON DELETE CASCADE ON UPDATE CASCADE;
