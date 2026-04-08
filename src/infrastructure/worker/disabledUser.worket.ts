import cron from "node-cron";
import { inject, injectable } from "tsyringe";
import { environment } from "../../main/register";
import { ContainerEnum } from "../../utils/enum/container";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { StatusEnum } from "../../utils/enum/status";

@injectable()
export class DisabledUserWorker {
  constructor(
    @inject(ContainerEnum.USER_REPOSITORY)
    private readonly _repo: IUserRepository,
  ) {
    this.start();
  }

  public start() {
    cron.schedule(environment.CRON_DISABLED_USER, async () => {
      const users = await this._repo.getUsersWithoutAccessForMoreThan3Months();

      for (let index = 0; index < users.length; index++) {
        const element = users[index];

        await this._repo.updateStatus(element.uuid, StatusEnum.DISABLED);
      }
    });
  }
}
