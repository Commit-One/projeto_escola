import { createClient } from "redis";
import { EnvironmentConfig } from "../config";

const config = new EnvironmentConfig();

export const redisClient = createClient({
  url: config.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}
