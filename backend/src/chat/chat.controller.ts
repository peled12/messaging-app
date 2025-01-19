import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { chatService } from './chat.service';
import { Chat } from '@prisma/client';
import { Response, Request } from 'express';

// NOTE: her are the routes. change the code to customize it (this code is just temp)

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: chatService) {}

  @Get(':id')
  async getChatsById(@Param('id') id: number): Promise<Chat[]> {
    return this.chatService.getUserChats(id);
  }

  @Post()
  async createChat(@Body() data: Chat): Promise<Chat> {
    return this.chatService.createChat(data);
  }

  @Patch(':id')
  async updateChat(@Param('id') id: string, @Body() data: Chat): Promise<Chat> {
    return this.chatService.updateChat(id, data);
  }

  @Delete(':id')
  async deleteChat(@Param('id') id: string): Promise<Chat> {
    return this.chatService.deleteChat(id);
  }
}
