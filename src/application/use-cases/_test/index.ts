import { IQueueService } from "../../../domain/contracts/IQueueService";
import { QueueEnum } from "../../../utils/enum/queue";
import { inject, injectable } from "tsyringe";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class TestUseCase {
  constructor(
    @inject(ContainerEnum.QUEUE_SERVICE)
    private readonly _queue: IQueueService,
  ) {}

  async execute(): Promise<boolean> {
    await this._queue.sendToQueue(QueueEnum.NOTIFICATION_NAME, { email: null });
    return true;
  }
}
