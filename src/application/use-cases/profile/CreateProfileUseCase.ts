import { IProfileRepository } from "../../../domain/repositories/IProfileRepository";
import { ICacheRepository } from "../../../infra/cache/cache.repository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

export class CreateProfileUseCase {
  constructor(
    private _profileRepository: IProfileRepository,
    private readonly _cache: ICacheRepository,
  ) {}

  async execute(): Promise<boolean> {
    const listProfile = ["admin", "teacher", "student"];

    listProfile.forEach(async (profile) => {
      const isExist = await this._profileRepository.existByName(profile);

      if (!isExist) await this._profileRepository.createProfile(profile);
    });

    await this._cache.set(cacheKeyEnum.PROFILE, listProfile);

    return true;
  }
}
