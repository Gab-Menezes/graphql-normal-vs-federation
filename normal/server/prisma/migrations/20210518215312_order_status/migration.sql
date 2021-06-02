/*
  Warnings:

  - Added the required column `status` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "order_status_enum" AS ENUM ('PENDING', 'CANCELED', 'CONFIRMED', 'DELIVERED');

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "status" "order_status_enum" NOT NULL;
