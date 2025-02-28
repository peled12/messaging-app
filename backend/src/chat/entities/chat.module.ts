import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChatController } from './chat.controller';
import { chatService } from './chat.service';

@Module({
  controllers: [ChatController],
  providers: [chatService, PrismaService],
})
export class ChatModule {}
