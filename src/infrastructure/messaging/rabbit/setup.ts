import { assertQueue } from "../../../utils/helpers/assertQueue";
import { RabbitMQConnection } from "./connection";
import { queues } from "./queues";

export async function setupRabbitMQ(): Promise<void> {
  const channel = await RabbitMQConnection.getChannel();

  for (const queue of queues) {
    await assertQueue(channel, queue.main);
    await assertQueue(channel, queue.retry);
    await assertQueue(channel, queue.dlq);
  }

  // startConsumers();
}
