import { container } from "tsyringe";
import { NotificationConsumer } from "../infrastructure/messaging/rabbit/consumers/notification.consumer";
import { PaymentConsumer } from "../infrastructure/messaging/rabbit/consumers/payment.consumer";

export function startConsumers() {
  container.resolve(NotificationConsumer).execute();
  container.resolve(PaymentConsumer).execute();
}
