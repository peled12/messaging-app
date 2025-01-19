import { User } from '@prisma/client';
import { UserService } from './user.service';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Response, Request } from 'express';

// NOTE: her are the routes. change the code to customize it (this code is just temp)

Controller('users');
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  async getUser(@Param('username') username: string): Promise<User | null> {
    return this.userService.getUser(username);
  }

  @Post()
  async createUser(@Body() data: User): Promise<User> {
    return this.userService.createUser(data);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() data: User): Promise<User> {
    return this.userService.updateUser(id, data);
  }
}
