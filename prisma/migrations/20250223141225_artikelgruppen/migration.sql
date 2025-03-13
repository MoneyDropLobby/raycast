/*
  Warnings:

  - You are about to drop the `_KassenArtikelFreigabe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_KassenArtikelFreigabe" DROP CONSTRAINT "_KassenArtikelFreigabe_A_fkey";

-- DropForeignKey
ALTER TABLE "_KassenArtikelFreigabe" DROP CONSTRAINT "_KassenArtikelFreigabe_B_fkey";

-- DropTable
DROP TABLE "_KassenArtikelFreigabe";

-- CreateTable
CREATE TABLE "_ArtikelUntergruppeToKassen" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ArtikelUntergruppeToKassen_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ArtikelUntergruppeToKassen_B_index" ON "_ArtikelUntergruppeToKassen"("B");

-- AddForeignKey
ALTER TABLE "_ArtikelUntergruppeToKassen" ADD CONSTRAINT "_ArtikelUntergruppeToKassen_A_fkey" FOREIGN KEY ("A") REFERENCES "artikel_untergruppen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtikelUntergruppeToKassen" ADD CONSTRAINT "_ArtikelUntergruppeToKassen_B_fkey" FOREIGN KEY ("B") REFERENCES "kassen"("id") ON DELETE CASCADE ON UPDATE CASCADE;
