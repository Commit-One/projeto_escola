import { IQueueService } from "../../../domain/contracts/IQueueService";
import { IRabbitQueueConfig } from "../../../infrastructure/messaging/rabbit/queues/interface";

export class FakeQueue implements IQueueService {
  public messages: { queue: string; payload: unknown }[] = [];

  async sendToQueue<T>(queue: string, payload: T): Promise<void> {
    this.messages.push({ queue, payload });
  }

  async consumerQueue(
    queue: IRabbitQueueConfig,
    callback: (payload: any) => Promise<void>,
  ): Promise<void> {
    const message = this.messages.find(
      (item) => item.queue === queue.main.name,
    );

    if (message) {
      await callback(message.payload);
    }
  }
}
