/*
  Warnings:

  - You are about to drop the column `messages` on the `chats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chats" DROP COLUMN "messages";

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "sender" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    "date_sent" TIMESTAMP(3) NOT NULL,
    "chatId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
