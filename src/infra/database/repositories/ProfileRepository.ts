import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { ProfileEntity } from "../entities/ProfilesEntity";
import { IProfileRepository } from "../../../domain/repositories/IProfileRepository";
import { Profile } from "../../../domain/entities/Profile";

export class ProfileTypeOrmRepository implements IProfileRepository {
  private readonly _repo: Repository<ProfileEntity>;

  constructor() {
    this._repo = AppDataSource.getRepository(ProfileEntity);
  }

  async existByName(name: string): Promise<boolean> {
    const exist = await this._repo.findOne({ where: { name } });

    return !!exist?.uuid;
  }

  async createProfile(name: string): Promise<boolean> {
    const profile = new Profile(name);

    await this._repo.save(profile);
    return true;
  }
}
