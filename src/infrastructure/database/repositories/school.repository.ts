import { ILike, Repository } from "typeorm";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { School } from "../../../domain/entities/School";
import { SchoolEntity } from "../entities/SchoolEntity";
import { AppDataSource } from "../data-source";
import { User } from "../../../domain/entities/User";
import { UserEntity } from "../entities/UserEntity";
import { ProfileEntity } from "../entities/ProfilesEntity";
import { ProfileEnum } from "../../../utils/enum/profile";
import { BcryptSecurity } from "../../security/bcrypt";
import { AppError, NotFoundError } from "../../../utils/error";
import { StatusEnum } from "../../../utils/enum/status";
import { SchoolDTO } from "../../../application/dtos/school.dto";
import { SchoolMapper } from "../mappers/school.mapper";
import { replace } from "../../../utils/helpers/replace";
import { environment } from "../../../main/register";

export class SchoolTypeOrmRepository implements ISchoolRepository {
  protected readonly _repo: Repository<SchoolEntity>;
  private readonly _bcryp = new BcryptSecurity();

  constructor() {
    this._repo = AppDataSource.getRepository(SchoolEntity);
  }

  async delete(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete({ uuid });
    return (deleted.affected ?? 0) > 0;
  }

  async update(uuid: string, data: SchoolDTO): Promise<School> {
    const school = await this._repo.findOne({ where: { uuid } });

    if (!school) throw new NotFoundError("Escola");

    await this._repo.update({ uuid }, { ...data });
    await this._repo.findOne({ where: { uuid } });

    return SchoolMapper.toDomain(school);
  }

  async updateStatus(uuid: string, status: StatusEnum): Promise<boolean> {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const _repoSchool = queryRunner.manager.getRepository(SchoolEntity);
      const _repoUser = queryRunner.manager.getRepository(UserEntity);

      const school = await _repoSchool.findOne({ where: { uuid } });
      const updated = await _repoSchool.update({ uuid }, { status });

      await _repoUser.update({ schoolUuid: school!.uuid }, { status });
      await queryRunner.commitTransaction();

      return (updated.affected ?? 0) > 0;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async create(data: SchoolDTO): Promise<School> {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const schoolRepository = queryRunner.manager.getRepository(SchoolEntity);

      const isExist = await schoolRepository.exists({
        where: { cnpj: replace(data.cnpj) },
      });

      if (isExist) throw new AppError("Já possuimos um registro com esse CNPJ");

      const userRepository = queryRunner.manager.getRepository(UserEntity);
      const profileRepository =
        queryRunner.manager.getRepository(ProfileEntity);

      const profileAdmin = await profileRepository.findOne({
        where: { name: ProfileEnum.ADMIN },
      });

      if (!profileAdmin) throw new NotFoundError("Perfil");

      const hashedPassword = await this._bcryp.hash(
        environment.PASSWORD_DEFAULT,
      );

      const mapper = SchoolMapper.toEntity(data);
      const entity = await schoolRepository.save(mapper);

      const user = new User(
        data.email,
        hashedPassword,
        entity.uuid,
        profileAdmin.uuid,
        data.nameDirector,
      );
      user.last_access = new Date();

      await userRepository.save(user);
      await queryRunner.commitTransaction();
      return SchoolMapper.toDomain(entity);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findByName(name: string): Promise<School | null> {
    const schoolEntity = await this._repo.findOne({
      where: { name: ILike(name) },
    });
    if (!schoolEntity) throw new NotFoundError("Escola");
    return SchoolMapper.toDomain(schoolEntity);
  }

  async getAll(): Promise<School[]> {
    const entities = await this._repo.find({
      where: { status: StatusEnum.ACTIVE },
    });

    return entities.map((e) => SchoolMapper.toDomain(e));
  }
}
