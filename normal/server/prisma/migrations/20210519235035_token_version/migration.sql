/*
  Warnings:

  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,2)`.

*/
-- AlterTable
ALTER TABLE "product" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,2);

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "token_version" INTEGER NOT NULL DEFAULT 0;
