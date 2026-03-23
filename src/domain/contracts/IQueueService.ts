import { IRabbitQueueConfig } from "../../infrastructure/messaging/rabbit/queues/interface";

export interface IQueueService {
  sendToQueue(
    queueName: string,
    payload: any,
    headers?: Record<string, unknown>,
  ): Promise<void>;

  consumerQueue(
    queue: IRabbitQueueConfig,
    callback: (payload: any) => Promise<void>,
  ): Promise<void>;
}
