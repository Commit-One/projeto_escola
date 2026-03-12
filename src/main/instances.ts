import { CacheService } from "../infrastructure/cache/ICacheService";
import { EnvironmentConfig } from "../infrastructure/config";
import { RabbitService } from "../infrastructure/messaging/rabbit/rabbitService";
import { NotificationWorker } from "../infrastructure/worker/notification.worker";

export const cacheInstance = new CacheService();
export const rabbitServiceInstance = new RabbitService();
export const environmentConfig = new EnvironmentConfig();

export async function startWorkers() {
    new NotificationWorker().execute()
}
