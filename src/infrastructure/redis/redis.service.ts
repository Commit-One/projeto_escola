import { injectable } from "tsyringe";
import { IRedisService } from "../../domain/contracts/IRedisService";
import { redisClient } from "./redis.connection";

@injectable()
export class RedisService implements IRedisService {
  async set(key: string, value: unknown) {
    await redisClient.set(key, JSON.stringify(value));
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await redisClient.get(key);

    if (!data || data?.length === 0) return null;

    return JSON.parse(data);
  }

  async delete(key: string) {
    await redisClient.del(key);
  }
}
