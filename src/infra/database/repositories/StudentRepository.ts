import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { Student } from "../../../domain/entities/Student";
import { StudentEntity } from "../entities/StudentEntity";
import { StatusEnum } from "../../../utils/enum/status";
import {
  StudentDTO,
  StudentResponseDTO,
} from "../../../application/dtos/StudentDTO";
import { ProfileEntity } from "../entities/ProfilesEntity";
import { SchoolEntity } from "../entities/SchoolEntity";
import { PeriodEntity } from "../entities/PeriodEntity";
import { ProfileEnum } from "../../../utils/enum/profile";
import { ApplicationError } from "../../../utils/error";

export class StudentTypeOrmRepository implements IStudentRepository {
  private readonly _repo: Repository<StudentEntity>;
  private readonly _repoProfile: Repository<ProfileEntity>;
  private readonly _repoSchool: Repository<SchoolEntity>;
  private readonly _repoPeriod: Repository<PeriodEntity>;

  constructor() {
    this._repo = AppDataSource.getRepository(StudentEntity);
    this._repoProfile = AppDataSource.getRepository(ProfileEntity);
    this._repoSchool = AppDataSource.getRepository(SchoolEntity);
    this._repoPeriod = AppDataSource.getRepository(PeriodEntity);
  }

  async updateStatus(uuid: string, status: StatusEnum): Promise<boolean> {
    const updated = await this._repo.update({ uuid }, { status });
    return (updated.affected ?? 0) > 0;
  }

  async create(data: StudentDTO): Promise<StudentResponseDTO | null> {
    const profileStudent = await this._repoProfile.findOne({
      where: { name: ProfileEnum.STUDENT },
    });

    if (!profileStudent) {
      throw new Error(ApplicationError.profile.notFound);
    }

    const student = new Student(
      data.schoolUuid,
      data.matriculation,
      data.dateBirth,
      StatusEnum.ACTIVE,
      data.nameMother,
      data.nameFather,
      data.name,
      data.phone,
      data.classStudent,
      data.periodUuid,
      data.dateMatriculation,
      data.hasDiscount,
      data.discount,
      data.datePayment,
      profileStudent!.uuid,
    );

    const created = await this._repo.save(student);
    const findOne = await this.getOne(created.uuid);

    return findOne;
  }

  async update(uuid: string, data: StudentDTO): Promise<Student> {
    await this._repo.update({ uuid }, { ...data });
    const updated = await this._repo.findOne({ where: { uuid } });
    return updated as Student;
  }

  async delete(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete({ uuid });
    return (deleted.affected ?? 0) > 0;
  }

  async getOne(uuid: string): Promise<StudentResponseDTO | null> {
    const student = await this._repo.findOne({ where: { uuid } });
    if (!student) throw new Error(ApplicationError.student.notFound);

    const profile = await this._repoProfile.findOne({
      where: { uuid: student!.profileUuid },
    });
    if (!profile) throw new Error(ApplicationError.profile.notFound);

    const period = await this._repoPeriod.findOne({
      where: { uuid: student!.periodUuid },
    });
    if (!period) throw new Error(ApplicationError.period.notFound);

    const school = await this._repoSchool.findOne({
      where: { uuid: student!.schoolUuid },
    });
    if (!school) throw new Error(ApplicationError.school.notFound);

    const response: StudentResponseDTO = {
      escola: {
        name: school!.name,
        uuid: school!.uuid,
      },
      periodo: {
        name: period!.name,
        uuid: period!.uuid,
      },
      profile: {
        name: profile!.name,
        uuid: profile!.uuid,
      },
      name: student!.name,
      matriculation: student!.matriculation,
      dateBirth: student!.dateBirth,
      status: student!.status,
      nameMother: student!.nameMother,
      nameFather: student!.nameFather,
      phone: student!.phone,
      classStudent: student!.classStudent,
      dateMatriculation: student!.dateMatriculation,
      hasDiscount: student!.hasDiscount,
      discount: student!.discount,
      datePayment: student!.datePayment,
      uuid: student!.uuid,
    };

    return response;
  }

  async getAll(): Promise<StudentResponseDTO[]> {
    const query = `
      SELECT 
        ts.name,
        ts.matriculation,
        ts.uuid as studentUuid,
        ts.dateBirth,
        ts.status as studentStatus,
        ts.datePayment,
        ts.discount,
        ts.hasDiscount,
        ts.dateMatriculation,
        ts.classStudent,
        ts.phone,
        ts.nameFather,
        ts.nameMother,
        ts2.uuid as schoolUuid,
        ts2.name as schoolName,
        tp.uuid  as profileUuid,
        tp.name  as profileName,
        tp2.uuid as periodUuid,
        tp2.name as periodName
      FROM tb_student ts 
      inner join tb_school ts2 on ts2.uuid = ts.schoolUuid 
      inner join tb_profile tp on tp.uuid = ts.profileUuid 
      inner join tb_periodo tp2 on tp2.uuid = ts.periodUuid 
  `;

    const students = await this._repo.query(query);

    return students.map((e: any) => {
      return {
        escola: {
          name: e.schoolName,
          uuid: e!.schoolUuid,
        },
        periodo: {
          name: e!.periodName,
          uuid: e!.periodUuid,
        },
        profile: {
          name: e!.profileName,
          uuid: e!.profileUuid,
        },
        name: e!.name,
        matriculation: e!.matriculation,
        dateBirth: e!.dateBirth,
        status: e!.studentStatus,
        nameMother: e!.nameMother,
        nameFather: e!.nameFather,
        phone: e!.phone,
        classStudent: e!.classStudent,
        dateMatriculation: e!.dateMatriculation,
        hasDiscount: e!.hasDiscount,
        discount: e!.discount,
        datePayment: e!.datePayment,
        uuid: e.studentUuid,
      };
    });
  }
}
