import { PrismaService } from 'src/prisma.service';
import { User } from './user.model';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

// TODO: change the code and customize it

// constants
const MIN_USERNAME_LENGTH: number = 4;
const MAX_USERNAME_LENGTH: number = 16;
const MIN_PASSWORD_LENGTH: number = 6;

@Injectable()
export class UserService {
  private readonly table: Prisma.UserDelegate;

  constructor(private prisma: PrismaService) {
    this.table = this.prisma.user;
  }

  async validateUser(username: string, password: string): Promise<void> {
    // ensure the username and password are valid for security
    await this.validateUserName(username);
    await this.validatePassword(password);
  }

  // validates a given username
  async validateUserName(username: string): Promise<void> {
    // ensure it has the correct length
    if (
      username.length < MIN_USERNAME_LENGTH ||
      username.length > MAX_USERNAME_LENGTH
    ) {
      throw new HttpException(
        `Username must contain at least ${MIN_USERNAME_LENGTH} characters and less than ${MAX_USERNAME_LENGTH} characters`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // check if the new username is already taken
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

  // validates a given password
  async validatePassword(password: string): Promise<void> {
    // ensure it has the correct length
    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new HttpException(
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
        HttpStatus.BAD_REQUEST,
      );
    }
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

  async createUser(data: CreateUserDto) {
    await this.validateUser(data.username, data.password); // validate before creating

    return this.table.create({ data });
  }

  async updateUser(id: number, data: UpdateUserDto) {
    await this.validateUserName(data.username); // validate new username before updating

    return this.table.update({ where: { id: id }, data: data });
  }
}
