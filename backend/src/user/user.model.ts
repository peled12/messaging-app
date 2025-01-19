import { Prisma } from '@prisma/client';

export class User implements Prisma.UserCreateInput {
  id: number;
  username: string;
  password: string;
}
