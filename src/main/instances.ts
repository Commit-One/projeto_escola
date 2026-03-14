import { RedisService } from "../infrastructure/redis/redis.service";
import { EnvironmentConfig } from "../infrastructure/config";
import { NotificationConsumer } from "../infrastructure/messaging/rabbit/consumers/notification.consumer";
// import { PaymentConsumer } from "../infrastructure/messaging/rabbit/consumers/payment.consumer";
import { RabbitService } from "../infrastructure/messaging/rabbit/rabbit.service";

export const cacheInstance = new RedisService();
export const rabbitServiceInstance = new RabbitService();
export const environmentConfig = new EnvironmentConfig();

// tsyringe
export async function startConsurmers() {
  new NotificationConsumer(rabbitServiceInstance).execute();
  // new PaymentConsumer(rabbitServiceInstance, ).execute()
}
