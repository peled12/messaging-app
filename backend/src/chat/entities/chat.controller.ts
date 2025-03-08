import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { chatService } from './chat.service';
import { Response, Request } from 'express';
import { CreateChatDto } from '../dto/create-chat.dto';
import { UpdateChatDto } from '../dto/update-chat.dto';

// NOTE: her are the routes. change the code to customize it (this code is just temp)

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: chatService) {}

  @Get(':id')
  async getChatsById(@Param('id') id: number) {
    return this.chatService.getUserChats(id);
  }

  @Post()
  async createChat(@Body(ValidationPipe) chat: CreateChatDto) {
    return this.chatService.createChat(chat);
  }

  @Patch(':id')
  async updateChat(
    @Param('id') id: string,
    @Body(ValidationPipe) data: UpdateChatDto,
  ) {
    return this.chatService.updateChat(id, data);
  }

  @Delete(':id')
  async deleteChat(@Param('id') id: string) {
    return this.chatService.deleteChat(id);
  }
}
