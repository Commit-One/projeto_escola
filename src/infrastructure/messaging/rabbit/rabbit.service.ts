import { injectable } from "tsyringe";
import { RabbitMQConnection } from "./connection";
import { IQueueService } from "../../../domain/contracts/IQueueService";
import { IRabbitQueueConfig } from "./queues/interface";

@injectable()
export class RabbitService implements IQueueService {
  private async getChannel() {
    return await RabbitMQConnection.getChannel();
  }

  async sendToQueue(
    queueName: string,
    payload: any,
    headers: Record<string, unknown> = {},
  ): Promise<void> {
    const channel = await this.getChannel();

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)), {
      persistent: true,
      contentType: "application/json",
      headers,
    });
  }

  async consumerQueue(
    queue: IRabbitQueueConfig,
    callback: (payload: any) => Promise<void>,
  ): Promise<void> {
    const channel = await this.getChannel();

    await channel.consume(queue.main.name, async (message) => {
      if (!message) return;

      try {
        const payload = JSON.parse(message.content.toString());

        await callback(payload);

        channel.ack(message);
      } catch (error) {
        const retryCount = Number(
          message.properties.headers?.["x-retry-count"] || 0,
        );

        if (retryCount < 3) {
          await this.sendToQueue(
            queue.retry.name,
            JSON.parse(message.content.toString()),
            {
              ...message.properties.headers,
              "x-retry-count": retryCount + 1,
            },
          );

          channel.ack(message);
          return;
        }

        await this.sendToQueue(
          queue.dlq.name,
          JSON.parse(message.content.toString()),
          {
            ...message.properties.headers,
            "x-retry-count": retryCount + 1,
            "x-error-message":
              error instanceof Error ? error.message : "Erro desconhecido",
          },
        );

        channel.ack(message);
      }
    });
  }
}
