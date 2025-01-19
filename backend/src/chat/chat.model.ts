import { Prisma } from '@prisma/client';

export class Chat implements Prisma.ChatCreateInput {
  id: string;
  created_at: Date;
  chatters: number[]; // array of user id
  messages: Prisma.JsonValue;
  title?: string; // if undefined, its a DM
}

interface Message {
  message_id: string;
  sender: number; // a user id
  replied_id?: string;
  read_by: number[]; // array of user id
  sent_at: Date;
}

export { Message };
