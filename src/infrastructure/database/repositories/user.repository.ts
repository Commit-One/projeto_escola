import { Repository, LessThan } from "typeorm";
import { AppDataSource } from "../data-source";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { UserEntity } from "../entities/UserEntity";
import { User } from "../../../domain/entities/User";
import { NotFoundError } from "../../../utils/error";
import { BcryptSecurity } from "../../security/bcrypt";
import { StatusEnum } from "../../../utils/enum/status";
import { UserMapper } from "../mappers/user.mapper";
import { injectable } from "tsyringe";

@injectable()
export class UserTypeOrmRepository implements IUserRepository {
  protected readonly _repo: Repository<UserEntity>;
  private readonly _bcryp = new BcryptSecurity();

  constructor() {
    this._repo = AppDataSource.getRepository(UserEntity);
  }

  getUsersWithoutAccessForMoreThan3Months(): Promise<User[]> {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() + 1 - 3);

    const users = this._repo.find({
      where: {
        last_access: LessThan(threeMonthsAgo),
      },
    });

    return users.then((entities) =>
      entities.map((entity: UserEntity) => UserMapper.toDomain(entity)),
    );
  }

  async create(data: User): Promise<User> {
    const user = await this._repo.save(data);
    return UserMapper.toDomain(user);
  }

  async delete(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete({ uuid });
    return (deleted.affected ?? 0) > 0;
  }

  async updateStatus(uuid: string, status: string): Promise<boolean> {
    const updated = await this._repo.update({ uuid }, { status } as any);
    return (updated.affected ?? 0) > 0;
  }

  async update(uuid: string, data: User): Promise<User> {
    const user = await this._repo.findOne({ where: { uuid } });

    if (!user) throw new NotFoundError("Usuáiro");

    await this._repo.update({ uuid }, { ...data });
    const find = await this.findByEmail(user.email)!;
    return find!;
  }

  async updatePassword(password: string, email: string): Promise<boolean> {
    const user = await this._repo.findOne({ where: { email } });

    if (!user) throw new NotFoundError("Usuário");

    password = await this._bcryp.hash(password);

    const updated = await this._repo.update({ email }, { password });
    return (updated.affected ?? 0) > 0;
  }

  async getAll(): Promise<{ email: string; status: string }[]> {
    const entities = await this._repo.find({
      where: { status: StatusEnum.ACTIVE },
    });

    return entities.map((entity) => UserMapper.toResponse(entity));
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this._repo.findOne({ where: { email } });

    if (!user) throw new NotFoundError("Usuário");

    return UserMapper.toDomain(user);
  }
}
