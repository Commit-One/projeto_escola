import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class GetAllUsersUserCase {
  constructor(
    @inject(ContainerEnum.USER_REPOSITORY)
    private _repo: IUserRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private _cache: IRedisService,
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
