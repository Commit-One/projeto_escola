import { ICacheService } from "../../../domain/contracts/ICacheService";
import { Profile } from "../../../domain/entities/Profile";
import { IProfileRepository } from "../../../domain/repositories/IProfileRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

export class CreateProfileUseCase {
  constructor(
    private _profileRepository: IProfileRepository,
    private readonly _cache: ICacheService,
  ) { }

  async execute(): Promise<boolean> {
    const listProfile = ["admin", "teacher", "student"];

    listProfile.forEach(async (p) => {
      const isExist = await this._profileRepository.existByName(p);
      
      if (!isExist) {        
        await this._profileRepository.create(p)
      }
    });

    await this._cache.set(cacheKeyEnum.PROFILE, listProfile);

    return true;
  }
}
