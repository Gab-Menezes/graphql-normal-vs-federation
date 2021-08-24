/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "client.name_unique" ON "client"("name");

-- CreateIndex
CREATE INDEX "client.city_index" ON "client"("city");

-- CreateIndex
CREATE INDEX "client.state_index" ON "client"("state");

-- CreateIndex
CREATE UNIQUE INDEX "product.name_unique" ON "product"("name");
