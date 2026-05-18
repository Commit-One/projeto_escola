import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { StudentEntity } from "../entities/StudentEntity";
import {
  StatisticsStudentByStatusDTO,
  StudentDTO,
  StudentResponseDTO,
} from "../../../application/dtos/student.dto";
import { ProfileEntity } from "../entities/ProfilesEntity";
import { SchoolEntity } from "../entities/SchoolEntity";
import { PeriodEntity } from "../entities/PeriodEntity";
import { ProfileEnum } from "../../../utils/enum/profile";
import { AppError, NotFoundError } from "../../../utils/error";
import { ClassStudentEntity } from "../entities/ClassStudentEntity";
import { StudentMapper } from "../mappers/student.mapper";
import { replace } from "../../../utils/helpers/replace";
import { injectable } from "tsyringe";
import {
  studentsQuery,
  studentStatisticsQuery,
} from "../_queries/students.query";
import { PaymentEntity } from "../entities/PaymentEntity";
import { PaymentTypeOrmRepository } from "./payment.repository";
import { ClassPeriodEntity } from "../entities/ClassPeriodEntity";

@injectable()
export class StudentTypeOrmRepository implements IStudentRepository {
  protected readonly _repo: Repository<StudentEntity>;
  private readonly _repoProfile: Repository<ProfileEntity>;
  private readonly _repoSchool: Repository<SchoolEntity>;
  private readonly _repoPeriod: Repository<PeriodEntity>;
  private readonly _repoClass: Repository<ClassStudentEntity>;

  constructor() {
    this._repo = AppDataSource.getRepository(StudentEntity);
    this._repoProfile = AppDataSource.getRepository(ProfileEntity);
    this._repoSchool = AppDataSource.getRepository(SchoolEntity);
    this._repoPeriod = AppDataSource.getRepository(PeriodEntity);
    this._repoClass = AppDataSource.getRepository(ClassStudentEntity);
  }

  async updateStatus(uuid: string, status: string): Promise<boolean> {
    const updated = await this._repo.update({ uuid }, { status } as any);
    return (updated.affected ?? 0) > 0;
  }

  async delete(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete({ uuid });
    return (deleted.affected ?? 0) > 0;
  }

  async update(uuid: string, data: StudentDTO): Promise<StudentResponseDTO> {
    const student = await this._repo.findOne({ where: { uuid } });

    if (!student) throw new NotFoundError("Aluno");

    await this._repo.update({ uuid }, { ...data });
    return await this.getOne(uuid);
  }

  async create(data: StudentDTO): Promise<StudentResponseDTO> {
    const queryRunner = AppDataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const _repo = queryRunner.manager.getRepository(StudentEntity);
      const _repoProfile = queryRunner.manager.getRepository(ProfileEntity);
      const _repoSchool = queryRunner.manager.getRepository(SchoolEntity);
      const _repoPeriod = queryRunner.manager.getRepository(PeriodEntity);
      const _repoClass = queryRunner.manager.getRepository(ClassStudentEntity);
      const _repoRules = queryRunner.manager.getRepository(ClassPeriodEntity);
      const _paymentRepository = new PaymentTypeOrmRepository(
        queryRunner.manager.getRepository(PaymentEntity),
      );

      const isExist = await _repo.exists({
        where: { cpf: replace(data.cpf) },
      });
      if (isExist) throw new AppError("Já possuimos um registro com esse CPF");

      const profile = await _repoProfile.findOne({
        where: { name: ProfileEnum.STUDENT },
      });
      if (!profile) throw new NotFoundError("Perfil");

      const school = await _repoSchool.findOne({
        where: { uuid: data.schoolUuid },
      });
      if (!school) throw new NotFoundError("Escola");

      const classStudent = await _repoClass.findOne({
        where: { uuid: data.classUuid },
      });
      if (!classStudent) throw new NotFoundError("Classe");

      const period = await _repoPeriod.findOne({
        where: { uuid: data.periodUuid },
      });
      if (!period) throw new NotFoundError("Período");

      const rules = await _repoRules.findOne({
        where: {
          classUuid: classStudent.uuid,
          periodUuid: period.uuid,
        },
      });
      if (!rules) throw new NotFoundError("Regra");

      data.profileUuid = profile.uuid;
      const student = StudentMapper.toDomain(data);

      await _repo.save(student);
      await _paymentRepository.createAllPayments({
        discount: data.discount,
        discountApplied: !!data.hasDiscount,
        schoolUuid: data.schoolUuid,
        studentUuid: student.uuid,
        value: rules.value,
        dayPayment: data.dayPayment,
      });

      await queryRunner.commitTransaction();
      return StudentMapper.toResponse(
        student,
        school,
        profile,
        period,
        classStudent,
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getOne(uuid: string): Promise<StudentResponseDTO> {
    const student = await this._repo.findOne({ where: { uuid } });
    if (!student) throw new NotFoundError("Aluno");

    const profile = await this._repoProfile.findOne({
      where: { uuid: student!.profileUuid },
    });
    if (!profile) throw new NotFoundError("Perfil");

    const period = await this._repoPeriod.findOne({
      where: { uuid: student!.periodUuid },
    });
    if (!period) throw new NotFoundError("Período");

    const school = await this._repoSchool.findOne({
      where: { uuid: student!.schoolUuid },
    });
    if (!school) throw new NotFoundError("Escola");

    const classStudent = await this._repoClass.findOne({
      where: { uuid: student!.classUuid },
    });
    if (!classStudent) throw new NotFoundError("Classe");

    return StudentMapper.toResponse(
      student,
      school,
      profile,
      period,
      classStudent,
    );
  }

  async getAll(schoolUuid: string): Promise<StudentResponseDTO[]> {
    const students = await this._repo.query(
      studentsQuery.replace("@SchollUuid", schoolUuid),
    );
    return students.map((e: any) => StudentMapper.toQuery(e));
  }

  async statistics(schoolUuid: string): Promise<StatisticsStudentByStatusDTO> {
    const stats = await this._repo.query(
      studentStatisticsQuery.replace(/@SchollUuid/g, schoolUuid),
    );
    return stats;
  }
}
