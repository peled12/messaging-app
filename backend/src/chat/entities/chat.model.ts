import { Prisma } from '@prisma/client';

export class Chat implements Prisma.ChatCreateInput {
  id: string;
  created_at: Date;
  chatters: number[]; // array of user id
  messages: Prisma.MessageCreateNestedManyWithoutChatInput;
  title?: string; // if undefined, its a DM
}
