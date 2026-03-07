import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { ProfileEntity } from "../entities/ProfilesEntity";
import { ILoginRepository } from "../../../domain/repositories/ILoginRepository";
import { LoginDTO } from "../../../application/dtos/LoginDTO";
import { User } from "../../../domain/entities/User";
import { UserEntity } from "../entities/UserEntity";
import { SchoolEntity } from "../entities/SchoolEntity";

export class LoginTypeOrmRepository implements ILoginRepository {
  private readonly _repoProfile: Repository<ProfileEntity>;
  private readonly _repoUser: Repository<UserEntity>;
  private readonly _repoSchool: Repository<SchoolEntity>;

  constructor() {
    this._repoProfile = AppDataSource.getRepository(ProfileEntity);
    this._repoUser = AppDataSource.getRepository(UserEntity);
    this._repoSchool = AppDataSource.getRepository(SchoolEntity);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this._repoUser.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    return new User(
      user.email,
      user.password,
      user.escolaUuid,
      user.profileUuid,
      user.name,
    );
  }

  async schemaDatabase(email: string): Promise<LoginDTO> {
    const user = await this._repoUser.findOne({ where: { email } });
    const profile = await this._repoProfile.findOne({
      where: { uuid: user?.profileUuid },
    });
    const school = await this._repoSchool.findOne({
      where: { uuid: user?.escolaUuid },
    });

    const result: LoginDTO = {
      escola: {
        name: school!.name,
        uuid: school!.uuid,
      },
      profile: {
        name: profile!.name,
        uuid: profile!.uuid,
      },
      user: {
        email: user!.email,
        name: user!.email,
        uuid: user!.uuid,
      },
    };

    return result;
  }
}
