import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { ProfileEntity } from "../entities/ProfilesEntity";
import { IProfileRepository } from "../../../domain/repositories/IProfileRepository";
import { BaseRepository } from "./BaseRepository";

export class ProfileTypeOrmRepository extends BaseRepository<ProfileEntity> implements IProfileRepository {
  protected readonly _repo: Repository<ProfileEntity>;

  constructor() {
    const inicialize = AppDataSource.getRepository(ProfileEntity);
    super(inicialize);
    this._repo = AppDataSource.getRepository(ProfileEntity);
  }

  async existByName(name: string): Promise<boolean> {
    const exist = await this._repo.findOne({ where: { name } });
    return !!exist?.uuid;
  }
}
