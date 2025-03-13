-- CreateEnum
CREATE TYPE "Zahlungsart" AS ENUM ('BAR', 'KARTE', 'RECHNUNG', 'GUTSCHEIN', 'ANDERE');

-- CreateEnum
CREATE TYPE "Waehrung" AS ENUM ('CHF', 'EUR', 'USD');

-- CreateEnum
CREATE TYPE "TransaktionsTyp" AS ENUM ('VERKAUF', 'STORNO', 'RETOURE', 'GUTSCHRIFT', 'ABSCHREIBER');

-- CreateTable
CREATE TABLE "Transaktion" (
    "id" TEXT NOT NULL,
    "typ" "TransaktionsTyp" NOT NULL DEFAULT 'VERKAUF',
    "datum" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kasseId" TEXT NOT NULL,
    "filialeId" TEXT NOT NULL,
    "verkaeufer" TEXT NOT NULL,
    "bemerkung" TEXT,
    "gruppenReferenz" TEXT,
    "storniert" BOOLEAN NOT NULL DEFAULT false,
    "stornoGrund" TEXT,
    "stornoVon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaktion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransaktionsPosition" (
    "id" TEXT NOT NULL,
    "transaktionId" TEXT NOT NULL,
    "artikelId" INTEGER NOT NULL,
    "menge" DECIMAL(65,30) NOT NULL,
    "einzelpreis" DECIMAL(65,30) NOT NULL,
    "rabattProzent" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "rabattBetrag" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "mwstSatz" "MwStSatz" NOT NULL,
    "mwstBetrag" DECIMAL(65,30) NOT NULL,
    "gesamtBetrag" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransaktionsPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransaktionsZahlung" (
    "id" TEXT NOT NULL,
    "transaktionId" TEXT NOT NULL,
    "zahlungsart" "Zahlungsart" NOT NULL,
    "waehrung" "Waehrung" NOT NULL DEFAULT 'CHF',
    "betrag" DECIMAL(10,2) NOT NULL,
    "kurs" DECIMAL(10,2) NOT NULL DEFAULT 1.00,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransaktionsZahlung_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaktion_id_key" ON "Transaktion"("id");

-- CreateIndex
CREATE INDEX "Transaktion_datum_idx" ON "Transaktion"("datum");

-- CreateIndex
CREATE INDEX "Transaktion_kasseId_idx" ON "Transaktion"("kasseId");

-- CreateIndex
CREATE UNIQUE INDEX "TransaktionsPosition_id_key" ON "TransaktionsPosition"("id");

-- CreateIndex
CREATE INDEX "TransaktionsPosition_transaktionId_idx" ON "TransaktionsPosition"("transaktionId");

-- CreateIndex
CREATE INDEX "TransaktionsPosition_artikelId_idx" ON "TransaktionsPosition"("artikelId");

-- CreateIndex
CREATE UNIQUE INDEX "TransaktionsZahlung_id_key" ON "TransaktionsZahlung"("id");

-- CreateIndex
CREATE INDEX "TransaktionsZahlung_transaktionId_idx" ON "TransaktionsZahlung"("transaktionId");

-- AddForeignKey
ALTER TABLE "Transaktion" ADD CONSTRAINT "Transaktion_kasseId_fkey" FOREIGN KEY ("kasseId") REFERENCES "Kassen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaktion" ADD CONSTRAINT "Transaktion_filialeId_fkey" FOREIGN KEY ("filialeId") REFERENCES "Filiale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransaktionsPosition" ADD CONSTRAINT "TransaktionsPosition_transaktionId_fkey" FOREIGN KEY ("transaktionId") REFERENCES "Transaktion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransaktionsPosition" ADD CONSTRAINT "TransaktionsPosition_artikelId_fkey" FOREIGN KEY ("artikelId") REFERENCES "Artikel"("artikelID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransaktionsZahlung" ADD CONSTRAINT "TransaktionsZahlung_transaktionId_fkey" FOREIGN KEY ("transaktionId") REFERENCES "Transaktion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
