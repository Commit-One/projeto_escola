import { redisClient } from "./cache.connection";

export class ICacheRepository {
  async set(key: string, value: unknown) {
    await redisClient.set(key, JSON.stringify(value));
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  }

  async delete(key: string) {
    await redisClient.del(key);
  }
}
