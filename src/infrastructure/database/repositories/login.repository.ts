import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { ProfileEntity } from "../entities/ProfilesEntity";
import { ILoginRepository } from "../../../domain/repositories/ILoginRepository";
import { LoginDTO } from "../../../application/dtos/login.dto";
import { User } from "../../../domain/entities/User";
import { UserEntity } from "../entities/UserEntity";
import { SchoolEntity } from "../entities/SchoolEntity";
import { NotFoundError } from "../../../utils/error";
import { UserMapper } from "../mappers/user.mapper";
import { LoginMapper } from "../mappers/login.mapper";
import { injectable } from "tsyringe";

@injectable()
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
    if (!user) throw new NotFoundError("Usuário");

    return UserMapper.toDomain(user);
  }

  async schemaDatabase(email: string): Promise<LoginDTO> {
    const user = await this._repoUser.findOne({ where: { email } });
    if (!user) throw new NotFoundError("Usuário");

    const profile = await this._repoProfile.findOne({
      where: { uuid: user?.profileUuid },
    });
    if (!profile) throw new NotFoundError("Perfil");

    const school = await this._repoSchool.findOne({
      where: { uuid: user?.schoolUuid },
    });

    if (!school) throw new NotFoundError("Escola");

    return LoginMapper.toResponse(user, profile, school);
  }
}
