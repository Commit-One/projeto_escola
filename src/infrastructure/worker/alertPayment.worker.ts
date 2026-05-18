import cron from "node-cron";
import { inject, injectable } from "tsyringe";
import { environment } from "../../main/register";
import { ContainerEnum } from "../../utils/enum/container";
import { IPaymentRepository } from "../../domain/repositories/IPaymentRepository";

@injectable()
export class AlertPaymentWorker {
  constructor(
    @inject(ContainerEnum.PAYMENT_REPOSITORY)
    private readonly _repo: IPaymentRepository,
  ) {
    this.start();
  }

  public start() {
    cron.schedule(environment.CRON_ALERT_PAYMENT, async () => {
      await this._repo.sendUpcomingPaymentDueAlert();
    });
  }
}
