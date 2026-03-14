import { inject, injectable } from "tsyringe";
import { IProfileRepository } from "../../../domain/repositories/IProfileRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class CreateProfileUseCase {
  constructor(
    @inject(ContainerEnum.PROFILE_REPOSITORY)
    private _profileRepository: IProfileRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(): Promise<boolean> {
    const listProfile = ["admin", "teacher", "student"];

    listProfile.forEach(async (p) => {
      const isExist = await this._profileRepository.existByName(p);

      if (!isExist) {
        await this._profileRepository.create(p);
      }
    });

    await this._cache.set(cacheKeyEnum.PROFILE, listProfile);

    return true;
  }
}
