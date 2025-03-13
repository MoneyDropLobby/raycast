/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Filiale` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Kassen` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `KassenLayout` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('AKTIV', 'INAKTIV');

-- CreateEnum
CREATE TYPE "MwStSatz" AS ENUM ('8.10', '2.60', '3.80', '0.00');

-- CreateEnum
CREATE TYPE "VerkaufsEinheit" AS ENUM ('STUECK', 'GRAMM', 'KILOGRAMM', 'LITER', 'MILLILITER', 'METER', 'ZENTIMETER', 'PACKUNG', 'KARTON', 'PALETTE');

-- CreateTable
CREATE TABLE "ArtikelHauptgruppe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "beschreibung" TEXT,
    "aktiv" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArtikelHauptgruppe_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Garantie" (
    "id" TEXT NOT NULL,
    "tage" INTEGER,
    "beschreibung" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Garantie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lager" (
    "id" TEXT NOT NULL,
    "lagerbestand" INTEGER NOT NULL DEFAULT 0,
    "mindestbestand" INTEGER NOT NULL DEFAULT 0,
    "letzterEinkauf" TIMESTAMP(3),
    "letzterVerkauf" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "artikelId" INTEGER NOT NULL,

    CONSTRAINT "Lager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artikel" (
    "artikelID" SERIAL NOT NULL,
    "artikelName" TEXT NOT NULL,
    "beschreibung" TEXT,
    "verkaufspreis" DECIMAL(10,2) NOT NULL,
    "einkaufspreis" DECIMAL(10,2) NOT NULL,
    "gewinnProzent" DECIMAL(10,2) NOT NULL,
    "mwst" "MwStSatz" NOT NULL,
    "ean" TEXT,
    "warnmeldung" TEXT,
    "mindestalter" INTEGER,
    "untergruppeId" TEXT NOT NULL,
    "verkaufsEinheit" "VerkaufsEinheit" NOT NULL,
    "mengeProEinheit" DECIMAL(65,30) NOT NULL DEFAULT 1,
    "status" "Status" NOT NULL DEFAULT 'AKTIV',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],
    "garantieId" TEXT,

    CONSTRAINT "Artikel_pkey" PRIMARY KEY ("artikelID")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArtikelHauptgruppe_id_key" ON "ArtikelHauptgruppe"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ArtikelUntergruppe_id_key" ON "ArtikelUntergruppe"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Garantie_id_key" ON "Garantie"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Lager_id_key" ON "Lager"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Lager_artikelId_key" ON "Lager"("artikelId");

-- CreateIndex
CREATE UNIQUE INDEX "Artikel_artikelID_key" ON "Artikel"("artikelID");

-- CreateIndex
CREATE INDEX "Artikel_ean_idx" ON "Artikel"("ean");

-- CreateIndex
CREATE INDEX "Artikel_artikelName_idx" ON "Artikel"("artikelName");

-- CreateIndex
CREATE INDEX "Artikel_status_idx" ON "Artikel"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Filiale_id_key" ON "Filiale"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Kassen_id_key" ON "Kassen"("id");

-- CreateIndex
CREATE UNIQUE INDEX "KassenLayout_id_key" ON "KassenLayout"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "ArtikelUntergruppe" ADD CONSTRAINT "ArtikelUntergruppe_hauptgruppeId_fkey" FOREIGN KEY ("hauptgruppeId") REFERENCES "ArtikelHauptgruppe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lager" ADD CONSTRAINT "Lager_artikelId_fkey" FOREIGN KEY ("artikelId") REFERENCES "Artikel"("artikelID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artikel" ADD CONSTRAINT "Artikel_untergruppeId_fkey" FOREIGN KEY ("untergruppeId") REFERENCES "ArtikelUntergruppe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artikel" ADD CONSTRAINT "Artikel_garantieId_fkey" FOREIGN KEY ("garantieId") REFERENCES "Garantie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
