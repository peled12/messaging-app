import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// constants
const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  private readonly table: Prisma.UserDelegate;

  constructor(
    private prisma: PrismaService,
    private jwtServise: JwtService,
  ) {
    this.table = this.prisma.user;
  }

  async validateUser({ username, password }: AuthPayloadDto) {
    const foundUser = await this.table.findUnique({
      where: { username: username },
    });

    // check if the user was found
    if (!foundUser) {
      throw new NotFoundException('Invalid Credentials'); // throw a an error
    }

    // compare the hashed password with the provided password
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    // check if the password is valid
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid Credentials'); // throw a an error
    }

    const { password: foundPassword, ...user } = foundUser;
    return this.jwtServise.sign(user); // create a web token for the user
  }

  async createUser(data: AuthPayloadDto) {
    const existingUser = await this.table.findUnique({
      where: { username: data.username },
    });
    if (existingUser) {
      throw new HttpException(
        'Username is already taken',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
    await this.table.create({ data: { ...data, password: hashedPassword } }); // create the user

    const { password: foundPassword, ...user } = data;
    return this.jwtServise.sign(user); // create a web token for the user
  }

  async updateUser(id: number, data: UpdateUserDto) {
    if (data.password) {
      // if the password is provided, hash it
      data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
    }

    return this.table.update({ where: { id }, data });
  }
}
