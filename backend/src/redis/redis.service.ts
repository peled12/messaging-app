import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

// TODO: switch to a remote redis server

@Injectable()
export class RedisService {
  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    });
  }

  // set a value in Redis
  async setValue(key: string, value: string, expirationInSeconds?: number) {
    await this.redis.set(key, value);
    if (expirationInSeconds) {
      await this.redis.expire(key, expirationInSeconds);
    }
  }

  // get a value from Redis
  async getValue(key: string) {
    return this.redis.get(key);
  }

  // delete a value from Redis
  async deleteValue(key: string) {
    return this.redis.del(key);
  }
}
