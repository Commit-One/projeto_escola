import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";
import { StatusEnum } from "../../../utils/enum/status";
import { logger } from "../../../infrastructure/logger";

@injectable()
export class UpdateStatusUserUseCase {
  constructor(
    @inject(ContainerEnum.USER_REPOSITORY)
    private _repo: IUserRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private _cache: IRedisService,
  ) {}

  async execute(uuid: string, status: StatusEnum) {
    const updated = await this._repo.updateStatus(uuid, status);

    if (!updated) {
      logger.info({
        message: "Erro ao atualizado o status do usuário",
        userUuid: uuid,
      });
      return;
    }

    await this._cache.delete(cacheKeyEnum.USERS);

    logger.info({
      message: "Status do usuário atualizado com sucesso",
      userUuid: uuid,
    });

    return true;
  }
}
