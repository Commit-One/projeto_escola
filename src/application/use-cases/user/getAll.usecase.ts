import { ICacheService } from "../../../domain/contracts/ICacheService";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";

export class GetAllUsersUserCase {
  constructor(
    private _repo: IUserRepository,
    private _cache: ICacheService,
  ) {}

  async execute() {
    const cachedusers = await this._cache.get<
      { email: string; status: string }[]
    >(cacheKeyEnum.USERS);

    if (cachedusers) return cachedusers;

    const users = await this._repo.getAll();
    await this._cache.set(cacheKeyEnum.USERS, users);

    return users;
  }
}
