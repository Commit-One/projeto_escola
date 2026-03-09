import { RedisRepository } from "../../infra/cache/cache.repository";

export const cacheInstance = new RedisRepository();
