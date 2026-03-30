import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import { EmployeeDTO } from "../../../application/dtos/employee.dto";
import { Employee } from "../../../domain/entities/Employee";
import { IEmployeeRepository } from "../../../domain/repositories/IEmployeeRepository";
import { AppError, NotFoundError } from "../../../utils/error";
import { AppDataSource } from "../data-source";
import { EmployeeEntity } from "../entities/EmployeeEntity";
import { EmployeeMapper } from "../mappers/employee.mapper";
import { SchoolEntity } from "../entities/SchoolEntity";
import { StatusEnum } from "../../../utils/enum/status";
import { UserEntity } from "../entities/UserEntity";
import { ProfileEntity } from "../entities/ProfilesEntity";
import { BcryptSecurity } from "../../security/bcrypt";
import { environment } from "../../../main/register";

@injectable()
export class EmployeeTypeOrmRepository implements IEmployeeRepository {
  protected readonly _repo: Repository<EmployeeEntity>;
  protected readonly _repoSchool: Repository<SchoolEntity>;
  private readonly _bcryp = new BcryptSecurity();

  constructor() {
    this._repo = AppDataSource.getRepository(EmployeeEntity);
    this._repoSchool = AppDataSource.getRepository(SchoolEntity);
  }

  async getOne(uuid: string): Promise<Employee> {
    const result = await this._repo.findOne({
      where: { uuid },
    });

    if (!result) throw new NotFoundError("Employee");

    return EmployeeMapper.toDomain(result);
  }

  async delete(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete({ uuid });
    return (deleted.affected ?? 0) > 0;
  }

  async getAll(): Promise<Employee[]> {
    const list = await this._repo.find();
    return list.map((item) => EmployeeMapper.toDomain(item));
  }

  async create(data: EmployeeDTO): Promise<Employee> {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const _repo = queryRunner.manager.getRepository(EmployeeEntity);
      const _repoUser = queryRunner.manager.getRepository(UserEntity);
      const _repoSchool = queryRunner.manager.getRepository(SchoolEntity);
      const _repoProfile = queryRunner.manager.getRepository(ProfileEntity);

      const school = await _repoSchool.findOne({
        where: { uuid: data.schoolUuid },
      });
      if (!school) throw new NotFoundError("School");

      const profile = await _repoProfile.findOne({
        where: { uuid: data.profileUuid },
      });
      if (!profile) throw new NotFoundError("Profile");

      const isExist = await _repoUser.exist({
        where: { email: data.email },
      });
      if (isExist) throw new AppError("Email já cadastrado", 400);

      const hashedPassword = await this._bcryp.hash(
        environment.PASSWORD_DEFAULT,
      );

      const user = new UserEntity();
      user.name = data.name;
      user.email = data.email;
      user.password = hashedPassword;
      user.profileUuid = profile.uuid;
      user.schoolUuid = school.uuid;
      user.status = StatusEnum.ACTIVE;

      const employee = EmployeeMapper.toEntity(data);
      await _repo.save(employee);
      await _repoUser.save(user);
      await queryRunner.commitTransaction();
      return EmployeeMapper.toDomain(employee);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(uuid: string, data: EmployeeDTO): Promise<Employee | null> {
    const exists = await this._repo.exists({
      where: { uuid },
    });

    if (!exists) return null;

    await this._repo.update({ uuid }, { ...data });
    return await this.getOne(uuid);
  }

  async updateStatus(uuid: string, status: StatusEnum): Promise<boolean> {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const _repo = queryRunner.manager.getRepository(EmployeeEntity);
      const _repoUser = queryRunner.manager.getRepository(UserEntity);

      const employee = await _repo.findOne({ where: { uuid } });
      employee!.status = status;

      const user = await _repoUser.findOne({
        where: { email: employee!.email },
      });
      user!.status = status;

      await _repoUser.save(user as UserEntity);
      await _repo.save(employee as EmployeeEntity);
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
