-- AlterTable
ALTER TABLE "Artikel" ADD COLUMN     "einkaufspreisExkl" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verkaufspreisExkl" BOOLEAN NOT NULL DEFAULT false;
