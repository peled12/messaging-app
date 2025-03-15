import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RedisService } from 'src/redis/redis.service';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly redisService: RedisService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // get the token from request header
    const token = request.headers.authorization?.split(' ')[1];

    // check if the token is in the blacklist (Redis)
    if (token) {
      const isBlacklisted = await this.redisService.getValue(
        `blacklist:${token}`,
      );
      if (isBlacklisted) {
        throw new UnauthorizedException('Token has been blacklisted');
      }
    }

    // defult AuthGuard behavior if the token is not blacklisted
    return super.canActivate(context) as boolean;
  }
}
