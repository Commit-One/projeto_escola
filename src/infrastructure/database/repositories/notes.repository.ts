import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { injectable } from "tsyringe";
import { AppError, NotFoundError } from "../../../utils/error";

import { NotesDTO } from "../../../application/dtos/notes.dto";

import { NotesEntity } from "../entities/NotesEntity";

import { ClassStudentEntity } from "../entities/ClassStudentEntity";
import { StudentEntity } from "../entities/StudentEntity";
import { DisciplineEntity } from "../entities/DisciplineEntity";
import { INotesRepository } from "../../../domain/repositories/INotesRepository";
import { Notes } from "../../../domain/entities/Notes";
import { NotesMapper } from "../mappers/notes.mapper";
import { SchoolEntity } from "../entities/SchoolEntity";
import { PeriodEntity } from "../entities/PeriodEntity";
import { AcademicCycleEntity } from "../entities/AcademicCycleEntity";
import { GradeReporDTO } from "../../../application/dtos/gradeReport.dto";

@injectable()
export class NotesTypeOrmRepository implements INotesRepository {
  protected readonly _repo: Repository<NotesEntity>;
  protected readonly _repoClassStudent: Repository<ClassStudentEntity>;
  protected readonly _repoStudent: Repository<StudentEntity>;
  protected readonly _repoDiscipline: Repository<DisciplineEntity>;
  protected readonly _repoSchool: Repository<SchoolEntity>;
  protected readonly _repoPeriod: Repository<PeriodEntity>;
  protected readonly _repoAcademicCycle: Repository<AcademicCycleEntity>;

  constructor() {
    this._repo = AppDataSource.getRepository(NotesEntity);
    this._repoClassStudent = AppDataSource.getRepository(ClassStudentEntity);
    this._repoStudent = AppDataSource.getRepository(StudentEntity);
    this._repoDiscipline = AppDataSource.getRepository(DisciplineEntity);
    this._repoSchool = AppDataSource.getRepository(SchoolEntity);
    this._repoPeriod = AppDataSource.getRepository(PeriodEntity);
    this._repoAcademicCycle = AppDataSource.getRepository(AcademicCycleEntity);
  }

  async getAll(): Promise<Notes[]> {
    const list = await this._repo.find();
    return list.map((e) => NotesMapper.toDomain(e));
  }

  async create(data: NotesDTO): Promise<Notes> {
    const classStudent = await this._repoClassStudent.findOne({
      where: { uuid: data.classUuid },
    });
    const student = await this._repoStudent.findOne({
      where: { uuid: data.studentUuid },
    });
    const discipline = await this._repoDiscipline.findOne({
      where: { uuid: data.disciplineUuid },
    });
    const school = await this._repoSchool.findOne({
      where: { uuid: data.schoolUuid },
    });
    const period = await this._repoPeriod.findOne({
      where: { uuid: data.periodUuid },
    });
    const academicCycle = await this._repoAcademicCycle.findOne({
      where: { uuid: data.academiccycleUuid },
    });

    if (!student) throw new NotFoundError("Estudante não encontrado");
    if (!school) throw new NotFoundError("Escola não encontrada");
    if (!discipline) throw new NotFoundError("Disciplina não encontrada");
    if (!classStudent) throw new NotFoundError("Classe não encontrada");
    if (!period) throw new NotFoundError("Classe não encontrada");
    if (!academicCycle)
      throw new NotFoundError("Ciclo acadêmico não encontrado");

    const isValid = await this._repo.exists({
      where: {
        schoolUuid: data.schoolUuid,
        disciplineUuid: data.disciplineUuid,
        classUuid: data.classUuid,
        academiccycleUuid: data.academiccycleUuid,
        studentUuid: data.studentUuid,
      },
    });

    if (isValid) throw new AppError("Nota já lançada para esse aluno");

    const entity = NotesMapper.toEntity(data);

    await this._repo.save(entity);
    return NotesMapper.toDomain(entity);
  }

  async getOne(uuid: string): Promise<Notes | null> {
    const Notes = await this._repo.findOne({ where: { uuid } });

    if (!Notes) throw new NotFoundError("Relação de aluno com disciplina");

    return NotesMapper.toDomain(Notes);
  }

  async delete(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete({ uuid });
    return (deleted.affected ?? 0) > 0;
  }

  async update(uuid: string, data: NotesDTO): Promise<Notes> {
    const entity = await this._repo.findOne({ where: { uuid } });

    if (!entity) throw new NotFoundError("Relação aluno disciplina");

    await this._repo.update({ uuid }, { ...data });
    return NotesMapper.toDomain(entity);
  }

  async gradeReport(studentUuid: string): Promise<GradeReporDTO[]> {
    const query = `
      select 
        ts.name as name,
        ts.matriculation,
        ts.cpf,
        tc.name as className,
        tp.name as periodName,
        ts2.name as schoolName,
        ts2.uuid as schoolUuid,
        tac.name  as academyCycle,
        tac.uuid  as academyCycleUuid,
        td.name as disciplineName,
        td.uuid as disciplineUuid,
        tn.note 
      from tb_notes tn 
      inner join tb_student ts on tn.studentUuid = ts.uuid 
      inner join tb_discipline td on tn.disciplineUuid = td.uuid 
      inner join tb_class tc on tn.classUuid = tc.uuid 
      inner join tb_periodo tp on tn.periodUuid = tp.uuid 
      inner join tb_school ts2 on tn.schoolUuid  = ts2.uuid 
      inner join tb_academic_cycle tac on  tn.academiccycleUuid = tac.uuid 
      where tn.studentUuid = "${studentUuid}"
    `;

    const executeSQL = await this._repo.query(query);
    return executeSQL;
  }
}
