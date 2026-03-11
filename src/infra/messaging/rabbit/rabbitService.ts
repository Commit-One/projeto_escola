import { RabbitMQConnection } from "./connection";
import { IQueueService } from "../../../domain/contracts/IQueueService";

export class RabbitService implements IQueueService {
  async sendToQueue(queueName: string, payload: any): Promise<void> {

    console.log(queueName, ">>> CHEGOU AQUI")
    console.log(payload, ">>> CHEGOU AQUI")

    const channel = await RabbitMQConnection.getChannel();

    await channel.assertQueue(queueName, {
      durable: true,
    });

    channel.sendToQueue(
      queueName,
      Buffer.from(JSON.stringify(payload)),
      {
        persistent: true,
        contentType: "application/json",
      }
    );
  }
}