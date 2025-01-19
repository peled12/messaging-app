import { PrismaService } from 'src/prisma.service';
import { Chat } from './chat.model';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class chatService {
  private readonly table: Prisma.ChatDelegate;

  constructor(private prisma: PrismaService) {
    this.table = this.prisma.chat;
  }

  async getUserChats(userID: number): Promise<Chat[]> {
    return this.table.findMany({
      where: { chatters: { has: userID } },
    });
  }

  async createChat(data: Chat): Promise<Chat> {
    return this.table.create({ data });
  }

  async updateChat(id: string, data: Chat): Promise<Chat> {
    return this.table.update({ where: { id: id }, data: data });
  }

  async deleteChat(id: string): Promise<Chat> {
    return this.table.delete({ where: { id: id } });
  }
}
