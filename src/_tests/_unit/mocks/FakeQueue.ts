import { IQueueService } from "../../../domain/contracts/IQueueService";

export class FakeQueue implements IQueueService {
  public messages: { queue: string; payload: unknown }[] = [];

  async sendToQueue<T>(queue: string, payload: T): Promise<void> {
    this.messages.push({ queue, payload });
  }

  async consumerQueue(
    queue: string,
    callback: (payload: any) => Promise<void>,
  ): Promise<void> {
    const message = this.messages.find((item) => item.queue === queue);

    if (message) {
      await callback(message.payload);
    }
  }
}
