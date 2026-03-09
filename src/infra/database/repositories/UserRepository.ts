import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UserEntity } from "../entities/UserEntity";
import { User } from "../../../domain/entities/User";
import { UserResponseDTO } from "../../../application/dtos/UserDTO";
import { ApplicationError } from "../../../utils/error";
import { BcryptSecurity } from "../../security/bcrypt";
import { StatusEnum } from "../../../utils/enum/status";

export class UserTypeOrmRepository implements IUserRepository {
  private readonly _repo: Repository<UserEntity>;

  constructor() {
    this._repo = AppDataSource.getRepository(UserEntity);
  }

  async updateStatus(uuid: string, status: StatusEnum): Promise<boolean> {
    const updated = await this._repo.update({ uuid }, { status });
    return (updated.affected ?? 0) > 0;
  }

  async updatePassword(password: string, email: string): Promise<boolean> {
    const findUser = await this._repo.findOne({ where: { email } });

    if (!findUser) {
      throw new Error(ApplicationError.user.notFound);
    }

    const user = new User(
      email,
      password,
      findUser.schoolUuid,
      findUser.profileUuid,
      findUser.name,
    );

    findUser.password = await new BcryptSecurity().hash(password);

    await this._repo.save(findUser);

    return true;
  }

  create(user: User): Promise<void> {
    const entity = this._repo.create({
      email: user.email,
      password: user.password,
      uuid: user.uuid,
      createdAt: user.createdAt,
      enable: user.enable,
      schoolUuid: user.schoolUuid,
      profileUuid: user.profileUuid,
    });

    return this._repo.save(entity).then((entity) => {});
  }

  getAll(): Promise<UserResponseDTO[]> {
    return this._repo
      .find({ where: { status: StatusEnum.ACTIVE } })
      .then((entities) => {
        return entities.map((entity) => {
          return {
            email: entity.email,
            name: entity.name,
            sstatus: entity.status,
          };
        });
      });
  }

  delete(uuid: string): Promise<boolean> {
    return this._repo.delete({ uuid }).then(() => true);
  }

  findByEmail(email: string): Promise<User | null> {
    const query = `SELECT * FROM tb_user WHERE LOWER(email) = LOWER("${email}")`;

    return this._repo.query(query);
  }
}
