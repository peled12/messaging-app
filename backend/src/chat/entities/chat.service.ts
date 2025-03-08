import { PrismaService } from 'src/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateChatDto } from '../dto/create-chat.dto';
import { UpdateChatDto } from '../dto/update-chat.dto';

@Injectable()
export class chatService {
  private readonly table: Prisma.ChatDelegate;

  constructor(private prisma: PrismaService) {
    this.table = this.prisma.chat;
  }

  async getUserChats(userID: number) {
    const userChats = await this.table.findMany({
      where: { chatters: { has: userID } },
    });

    if (userChats.length === 0) {
      throw new NotFoundException(`Chats with user id: ${userID} not found`);
    }
  }

  async createChat(data: CreateChatDto) {
    return this.table.create({
      data: {
        chatters: data.chatters,
        messages: {
          create: data.messages,
        },
      },
    });
  }

  async updateChat(id: string, chat: UpdateChatDto) {
    return this.table.update({
      where: { id: id },
      data: {
        chatters: chat.chatters,
        messages: {
          create: chat.messages,
        },
      },
    });
  }

  async deleteChat(id: string) {
    return this.table.delete({ where: { id: id } });
  }
}
