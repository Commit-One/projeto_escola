import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { StudentEntity } from "../entities/StudentEntity";
import {
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
import { replace } from "../../../utils/functions/replace";
import { injectable } from "tsyringe";

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
    const isExist = await this._repo.exists({
      where: { cpf: replace(data.cpf) },
    });

    if (isExist) throw new AppError("Já possuimos um registro com esse CPF");

    const profile = await this._repoProfile.findOne({
      where: { name: ProfileEnum.STUDENT },
    });

    if (!profile) throw new NotFoundError("Perfil");

    const school = await this._repoSchool.findOne({
      where: { uuid: data.schoolUuid },
    });
    if (!school) throw new NotFoundError("Escola");

    const classStudent = await this._repoClass.findOne({
      where: { uuid: data.classUuid },
    });
    if (!classStudent) throw new NotFoundError("Classe");

    const period = await this._repoPeriod.findOne({
      where: { uuid: data.periodUuid },
    });
    if (!period) throw new NotFoundError("Período");

    const student = StudentMapper.toDomain(data);

    await this._repo.save(student);

    return StudentMapper.toResponse(
      student,
      school,
      profile,
      period,
      classStudent,
    );
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

  async getAll(): Promise<StudentResponseDTO[]> {
    const query = `
      SELECT 
        ts.name,
        ts.matriculation,
        ts.uuid as studentUuid,
        ts.dateBirth,
        ts.status as studentStatus,
        ts.dayPayment,
        ts.discount,
        ts.hasDiscount,
        ts.dateMatriculation,        
        ts.phone,
        ts.nameFather,
        ts.nameMother,
        ts2.uuid as schoolUuid,
        ts2.name as schoolName,
        tp.uuid  as profileUuid,
        tp.name  as profileName,
        tp2.uuid as periodUuid,
        tp2.name as periodName,
        tc.name as className,
        tc.uuid as classUuid
      FROM tb_student ts 
      inner join tb_school ts2 on ts2.uuid = ts.schoolUuid 
      inner join tb_profile tp on tp.uuid = ts.profileUuid 
      inner join tb_periodo tp2 on tp2.uuid = ts.periodUuid 
      inner join tb_class tc on tc.uuid = ts.classStudentUuid 
  `;

    const students = await this._repo.query(query);
    return students.map((e: any) => StudentMapper.toQuery(e));
  }
}
