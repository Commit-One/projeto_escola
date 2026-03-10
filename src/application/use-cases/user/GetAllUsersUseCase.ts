import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { ICacheService } from "../../../infra/cache/ICacheService";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { UserResponseDTO } from "../../dtos/UserDTO";

export class GetAllUsersUserCase {
  constructor(
    private _repo: IUserRepository,
    private _cache: ICacheService,
  ) {}

  async execute() {
    const cachedusers = await this._cache.get<UserResponseDTO[]>(
      cacheKeyEnum.USERS,
    );

    if (cachedusers) return cachedusers;

    const users = await this._repo.getAll();
    await this._cache.set(cacheKeyEnum.USERS, users);

    return users;
  }
}
