import { paymentQueue } from "../queues/payment.queue";
import { RabbitService } from "../rabbit.service";

export class NotificationConsumer {
  constructor(private readonly rabbit: RabbitService) {}

  async execute() {
    await this.rabbit.consumerQueue(paymentQueue.name, async (payload) => {
      console.log("Mensagem recebida:", payload);
    });
  }
}
