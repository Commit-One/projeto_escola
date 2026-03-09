import { Repository } from "typeorm";
import { ISchoolRepository } from "../../../domain/repositories/ISchoolRepository";
import { School } from "../../../domain/entities/School";
import { SchoolEntity } from "../entities/SchoolEntity";
import { AppDataSource } from "../data-source";
import { SchoolDTO } from "../../../application/dtos/SchoolDTO";
import { User } from "../../../domain/entities/User";
import { UserEntity } from "../entities/UserEntity";
import { ProfileEntity } from "../entities/ProfilesEntity";
import { EnvironmentConfig } from "../../config";
import { ProfileEnum } from "../../../utils/enum/profile";
import { BcryptSecurity } from "../../security/bcrypt";
import { ApplicationError } from "../../../utils/error";
import { StatusEnum } from "../../../utils/enum/status";

export class SchoolTypeOrmRepository implements ISchoolRepository {
  private readonly _repo: Repository<SchoolEntity>;

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

      await _repoSchool.update({ uuid }, { status });
      await _repoUser.update({ schoolUuid: school?.uuid }, { status });
      await queryRunner.commitTransaction();

      return true;
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
      const config = new EnvironmentConfig();
      const schoolRepository = queryRunner.manager.getRepository(SchoolEntity);
      const userRepository = queryRunner.manager.getRepository(UserEntity);
      const profileRepository =
        queryRunner.manager.getRepository(ProfileEntity);

      const profileAdmin = await profileRepository.findOne({
        where: { name: ProfileEnum.ADMIN },
      });

      if (!profileAdmin?.uuid) {
        new Error(ApplicationError.profile.profileNotFound);
      }

      const school = new School(
        data.name,
        data.address,
        data.phone,
        data.email,
        data.nameDirector,
      );

      const user = new User(
        data.email,
        config.PASSWORD_DEFAULT,
        school.uuid,
        profileAdmin?.uuid as string,
        data.nameDirector,
      );

      user.password = await new BcryptSecurity().hash(config.PASSWORD_DEFAULT);

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

    return new School(
      schoolData.name,
      schoolData.address,
      schoolData.phone,
      schoolData.email,
      schoolData.nameDirector,
    );
  }

  async delete(uuid: string): Promise<boolean> {
    await this._repo.delete({ uuid });

    return true;
  }

  async update(uuid: string, data: SchoolDTO): Promise<School> {
    await this._repo.update({ uuid }, { ...data });
    return new School(
      data.name,
      data.address,
      data.phone,
      data.email,
      data.nameDirector,
    );
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
