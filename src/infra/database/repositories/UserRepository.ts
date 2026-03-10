import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UserEntity } from "../entities/UserEntity";
import { User } from "../../../domain/entities/User";
import { UserResponseDTO } from "../../../application/dtos/UserDTO";
import { ApplicationError } from "../../../utils/error";
import { BcryptSecurity } from "../../security/bcrypt";
import { StatusEnum } from "../../../utils/enum/status";
import { BaseRepository } from "./BaseRepository";

export class UserTypeOrmRepository
  extends BaseRepository<UserEntity>
  implements IUserRepository {
  protected readonly _repo: Repository<UserEntity>;
  private readonly _bcryp = new BcryptSecurity();

  constructor() {
    const inicialize = AppDataSource.getRepository(UserEntity);
    super(inicialize);
    this._repo = AppDataSource.getRepository(UserEntity);
  }

  async updatePassword(password: string, email: string): Promise<boolean> {
    const user = await this._repo.findOne({ where: { email } });

    if (!user) throw new Error(ApplicationError.user.notFound);
    password = await this._bcryp.hash(password);

    const updated = await this._repo.update({ email }, { password });
    return (updated.affected ?? 0) > 0;
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

  async findByEmail(email: string): Promise<User | null> {
    const user = await this._repo.findOne({ where: { email } })
    if (!user) throw new Error(ApplicationError.user.notFound)
    return user
  }
}
