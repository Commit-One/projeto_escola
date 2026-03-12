import { notificationQueue } from "../queues/notification.queue";
import { RabbitService } from "../rabbitService";

export class NotificationConsumer {
  constructor(private readonly rabbit: RabbitService) { }

  async execute() {
    await this.rabbit.consumerQueue(notificationQueue.name, async (payload) => {
      console.log("Mensagem recebida:", payload);
    });
  }
}