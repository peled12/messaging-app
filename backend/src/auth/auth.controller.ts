import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Post('signup')
  signUp(@Body(ValidationPipe) user: AuthPayloadDto) {
    return this.authService.createUser(user);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) data: UpdateUserDto,
  ) {
    return this.authService.updateUser(id, data);
  }

  @Post('logout')
  async logout(@Req() req: Request) {
    const token = req.headers['authorization'].split(' ')[1]; // extract the JWT from authorization

    return this.authService.logout(token);
  }

  @Get('status')
  status(@Req() req: Request) {
    console.log('inside status');
    return req.user;
  }
}
