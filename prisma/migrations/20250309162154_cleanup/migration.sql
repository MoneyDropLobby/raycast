/*
  Warnings:

  - The primary key for the `Artikel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `artikelID` on the `Artikel` table. All the data in the column will be lost.
  - You are about to drop the column `artikelName` on the `Artikel` table. All the data in the column will be lost.
  - You are about to drop the column `gewinnProzent` on the `Artikel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Artikel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Artikel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lager" DROP CONSTRAINT "Lager_artikelId_fkey";

-- DropForeignKey
ALTER TABLE "TransaktionsPosition" DROP CONSTRAINT "TransaktionsPosition_artikelId_fkey";

-- DropIndex
DROP INDEX "Artikel_artikelID_key";

-- DropIndex
DROP INDEX "Artikel_artikelName_idx";

-- AlterTable
ALTER TABLE "Artikel" DROP CONSTRAINT "Artikel_pkey",
DROP COLUMN "artikelID",
DROP COLUMN "artikelName",
DROP COLUMN "gewinnProzent",
ADD COLUMN     "externeId" TEXT,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedBy" TEXT,
ADD CONSTRAINT "Artikel_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Filiale" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'AKTIV',
ALTER COLUMN "plz" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Kassen" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'AKTIV';

-- CreateIndex
CREATE UNIQUE INDEX "Artikel_id_key" ON "Artikel"("id");

-- CreateIndex
CREATE INDEX "Artikel_name_idx" ON "Artikel"("name");

-- AddForeignKey
ALTER TABLE "Lager" ADD CONSTRAINT "Lager_artikelId_fkey" FOREIGN KEY ("artikelId") REFERENCES "Artikel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransaktionsPosition" ADD CONSTRAINT "TransaktionsPosition_artikelId_fkey" FOREIGN KEY ("artikelId") REFERENCES "Artikel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
