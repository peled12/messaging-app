import { PrismaService } from 'src/prisma.service';
import { User } from './user.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

// constants

@Injectable()
export class UserService {
  private readonly table: Prisma.UserDelegate;

  constructor(private prisma: PrismaService) {
    this.table = this.prisma.user;
  }

  // get user by username
  async getUserbyUsername(name: string) {
    const user: User = await this.table.findUnique({
      where: { username: name },
    });

    // check if the user exists
    if (!user) {
      throw new NotFoundException(`User with username: ${name} not found`);
    }

    return user;
  }

  // get user by id
  async getUserById(id: number) {
    const user: User = await this.table.findUnique({
      where: { id: id },
    });

    // check if the user exists
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return user;
  }
}
