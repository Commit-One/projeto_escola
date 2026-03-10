import { Repository } from "typeorm";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { School } from "../../../domain/entities/School";
import { SchoolEntity } from "../entities/SchoolEntity";
import { AppDataSource } from "../data-source";
import { SchoolDTO } from "../../../application/dtos/SchoolDTO";
import { User } from "../../../domain/entities/User";
import { UserEntity } from "../entities/UserEntity";
import { ProfileEntity } from "../entities/ProfilesEntity";
import { ProfileEnum } from "../../../utils/enum/profile";
import { BcryptSecurity } from "../../security/bcrypt";
import { ApplicationError } from "../../../utils/error";
import { StatusEnum } from "../../../utils/enum/status";
import { environmentConfig } from "../../../main/instances/environment.instance";

export class SchoolTypeOrmRepository implements ISchoolRepository {
  private readonly _repo: Repository<SchoolEntity>;
  private readonly _bcryp = new BcryptSecurity();

  constructor() {
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

  async createSchoolUserTransaction(data: SchoolDTO): Promise<School> {
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

      const school = new School(
        data.name,
        data.address,
        data.phone,
        data.email,
        data.nameDirector,
      );

      const hashedPassword = await this._bcryp.hash(
        environmentConfig.PASSWORD_DEFAULT,
      );
      const user = new User(
        data.email,
        hashedPassword,
        school.uuid,
        profileAdmin.uuid,
        data.nameDirector,
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
    const query = `SELECT * FROM tb_school WHERE LOWER(name) = LOWER("${name}")`;

    const result = await this._repo.query(query);

    if (result.length === 0) {
      return null;
    }
    const schoolData = result[0];
    return schoolData as School;
  }

  async delete(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete({ uuid });
    return (deleted.affected ?? 0) > 0;
  }

  async update(uuid: string, data: SchoolDTO): Promise<School> {
    await this._repo.update({ uuid }, { ...data });
    const updated = await this._repo.findOne({ where: { uuid } });

    if (!updated) throw new Error(ApplicationError.school.notFound);

    return updated as School;
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
