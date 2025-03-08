import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Get('username/:username') // specific route for username
  findOneByUsername(@Param('username') username: string) {
    return this.userService.getUserbyUsername(username);
  }

  @Post()
  async createOne(@Body(ValidationPipe) user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Patch(':id')
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) data: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, data);
  }
}
