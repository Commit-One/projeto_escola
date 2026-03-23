import { inject, injectable } from "tsyringe";
import { IQueueService } from "../../../../domain/contracts/IQueueService";
import { ContainerEnum } from "../../../../utils/enum/container";
import { notificationQueue } from "../queues/notification.queue";

@injectable()
export class NotificationConsumer {
  constructor(
    @inject(ContainerEnum.QUEUE_SERVICE)
    private readonly rabbit: IQueueService,
  ) {}

  async execute() {
    await this.rabbit.consumerQueue(notificationQueue, async (payload) => {
      console.log("Mensagem recebida:", payload);
      throw new Error("Erro proposital para teste de retry");
    });
  }
}
