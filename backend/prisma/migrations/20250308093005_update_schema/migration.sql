/*
  Warnings:

  - The `messages` column on the `chats` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "chats" DROP COLUMN "messages",
ADD COLUMN     "messages" JSONB[];
