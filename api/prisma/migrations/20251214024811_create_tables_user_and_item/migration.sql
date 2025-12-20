-- CreateEnum
CREATE TYPE "Filter" AS ENUM ('Lab_Línguas', 'Lab_Informática', 'Lab_Hardware');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('Component', 'Computer', 'Notebook', 'Materials', 'Cables');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "ItemType" NOT NULL,
    "filter" "Filter" NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "items_code_key" ON "items"("code");
