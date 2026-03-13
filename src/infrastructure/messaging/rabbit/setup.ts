import { RabbitMQConnection } from "./connection";
import { queues } from "./queues";

export async function setupRabbitMQ(): Promise<void> {
  const channel = await RabbitMQConnection.getChannel();

  for (const queue of queues) {
    await channel.assertQueue(queue.name, {
      durable: queue.options.durable,
    });
  }
}
