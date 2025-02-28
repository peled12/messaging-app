import { PrismaService } from 'src/prisma.service';
import { User } from './user.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

// constants
const MIN_USERNAME_LENGTH = 4;
const MIN_PASSWORD_LENGTH = 6;

@Injectable()
export class UserService {
  private readonly table: Prisma.UserDelegate;

  constructor(private prisma: PrismaService) {
    this.table = this.prisma.user;
  }

  async validateUser(username: string, password: string): Promise<void> {
    // ensure the username and password are still valid for a bit of security
    if (username.length < MIN_USERNAME_LENGTH) {
      throw new HttpException(
        `Username must be at least ${MIN_USERNAME_LENGTH} characters long`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new HttpException(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // check if the username is already taken
    const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      throw new HttpException(
        'Username is already taken',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUser(name: string): Promise<User | null> {
    return this.table.findUnique({ where: { username: name } });
  }

  async createUser(data: User): Promise<User> {
    await this.validateUser(data.username, data.password); // validate before creating
    return this.table.create({ data });
  }

  async updateUser(id: number, data: User): Promise<User> {
    return this.table.update({ where: { id: id }, data: data });
  }
}
