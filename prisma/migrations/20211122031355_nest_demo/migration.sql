/*
  Warnings:

  - You are about to drop the column `email` on the `app_user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `app_user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `app_user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `app_user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "app_user_email_key";

-- AlterTable
ALTER TABLE "app_user" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "app_user_username_key" ON "app_user"("username");
