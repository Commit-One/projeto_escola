import { RabbitMQConnection } from "./connection";
import { IQueueService } from "../../../domain/contracts/IQueueService";

export class RabbitService implements IQueueService {
  private async getChannel() {
    return await RabbitMQConnection.getChannel();
  }

  async sendToQueue(queueName: string, payload: any): Promise<void> {
    const channel = await this.getChannel();

    await channel.assertQueue(queueName, {
      durable: true,
    });

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)), {
      persistent: true,
      contentType: "application/json",
    });
  }

  async consumerQueue(
    queueName: string,
    callback: (payload: any) => Promise<void>,
  ): Promise<void> {
    const channel = await this.getChannel();

    await channel.assertQueue(queueName, {
      durable: true,
    });

    await channel.consume(queueName, async (message) => {
      if (!message) return null;

      try {
        const payload = JSON.parse(message.content.toString());
        await callback(payload);
        channel.ack(message);
      } catch (error) {
        console.error(`Erro ao consumir fila ${queueName}:`, error);
        channel.nack(message, false, false);
      }
    });
  }
}
