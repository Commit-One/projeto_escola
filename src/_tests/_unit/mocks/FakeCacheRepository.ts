import { CacheService } from "../../../infrastructure/cache/cache.service";

export class FakeCacheRepository implements CacheService {
  private cache: Record<string, unknown> = {};

  async set(key: string, value: unknown): Promise<void> {
    this.cache[key] = value;
  }

  async get<T>(key: string): Promise<T | null> {
    return (this.cache[key] as T) ?? null;
  }

  async delete(key: string): Promise<void> {
    delete this.cache[key];
  }
}
