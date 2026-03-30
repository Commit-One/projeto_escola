import { inject, injectable } from "tsyringe";
import { IProfileRepository } from "../../../domain/repositories/IProfileRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { ContainerEnum } from "../../../utils/enum/container";
import { logger } from "../../../infrastructure/logger";

@injectable()
export class CreateProfileUseCase {
  constructor(
    @inject(ContainerEnum.PROFILE_REPOSITORY)
    private _profileRepository: IProfileRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(): Promise<boolean> {
    const listProfile = ["admin", "teacher", "student", "employee"];

    for (const profile of listProfile) {
      const isExist = await this._profileRepository.existByName(profile);

      if (!isExist) {
        await this._profileRepository.create(profile);
      }
    }

    await this._cache.set(cacheKeyEnum.PROFILE, listProfile);

    logger.info({
      message: "Perfis criados com sucesso",
      profiles: listProfile,
    });

    return true;
  }
}
