import { User } from '@prisma/client';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  findOne(@Param('username') username: string): Promise<User | null> {
    return this.userService.getUser(username);
  }

  @Post()
  async createOne(@Body() data: User): Promise<User> {
    return this.userService.createUser(data);
  }

  @Patch(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: User,
  ): Promise<User> {
    return this.userService.updateUser(id, data);
  }
}
