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
import { ApplicationError } from "../../../utils/error";
import { StatusEnum } from "../../../utils/enum/status";
import { environmentConfig } from "../../../main/instances/environment.instance";
import { BaseRepository } from "./BaseRepository";

export class SchoolTypeOrmRepository extends BaseRepository<SchoolEntity> implements ISchoolRepository {
  protected readonly _repo: Repository<SchoolEntity>;
  private readonly _bcryp = new BcryptSecurity();

  constructor() {
    const inicialize = AppDataSource.getRepository(SchoolEntity);
    super(inicialize);
    this._repo = AppDataSource.getRepository(SchoolEntity);
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

  async createSchoolUserTransaction(school: School): Promise<School> {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const schoolRepository = queryRunner.manager.getRepository(SchoolEntity);
      const userRepository = queryRunner.manager.getRepository(UserEntity);
      const profileRepository =
        queryRunner.manager.getRepository(ProfileEntity);

      const profileAdmin = await profileRepository.findOne({
        where: { name: ProfileEnum.ADMIN },
      });

      if (!profileAdmin) {
        throw new Error(ApplicationError.profile.profileNotFound);
      }

      const hashedPassword = await this._bcryp.hash(
        environmentConfig.PASSWORD_DEFAULT,
      );
      const user = new User(
        school.email,
        hashedPassword,
        school.uuid,
        profileAdmin.uuid,
        school.nameDirector,
      );

      await schoolRepository.save(school);
      await userRepository.save(user);

      await queryRunner.commitTransaction();
      return school;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findByName(name: string): Promise<School | null> {
    const school = await this._repo.findOne({ where: { name: ILike(name) } })
    if (!school) return null;

    return school;
  }

  async getAll(): Promise<School[]> {
    const entities = await this._repo.find({
      where: { status: StatusEnum.ACTIVE },
    });

    return entities.map(
      (e) => new School(e.name, e.address, e.phone, e.email, e.nameDirector),
    );
  }
}
