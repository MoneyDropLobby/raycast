/*
  Warnings:

  - Made the column `untergruppeId` on table `Artikel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Artikel" ALTER COLUMN "untergruppeId" SET NOT NULL;
