import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { injectable } from "tsyringe";
import { NotFoundError } from "../../../utils/error";
import { IStudentDisciplineRepository } from "../../../domain/repositories/IStudentDisciplineRepository";
import { StudentDisciplineDTO } from "../../../application/dtos/studentDiscipline.dto";
import { StudentDiscipline } from "../../../domain/entities/StudentDiscipline";
import { StudentDisciplineEntity } from "../entities/StudentDisciplineEntity";
import { StudentDisciplineMapper } from "../mappers/studentDiscipline.mapper";
import { ClassStudentEntity } from "../entities/ClassStudentEntity";
import { StudentEntity } from "../entities/StudentEntity";
import { DisciplineEntity } from "../entities/DisciplineEntity";

@injectable()
export class StudentDisciplineTypeOrmRepository implements IStudentDisciplineRepository {
  protected readonly _repo: Repository<StudentDisciplineEntity>;
  protected readonly _repoClassStudent: Repository<ClassStudentEntity>;
  protected readonly _repoStudent: Repository<StudentEntity>;
  protected readonly _repoDiscipline: Repository<DisciplineEntity>;

  constructor() {
    this._repo = AppDataSource.getRepository(StudentDisciplineEntity);
    this._repoClassStudent = AppDataSource.getRepository(ClassStudentEntity);
    this._repoStudent = AppDataSource.getRepository(StudentEntity);
    this._repoDiscipline = AppDataSource.getRepository(DisciplineEntity);
  }

  async getAll(): Promise<StudentDiscipline[]> {
    const list = await this._repo.find();
    return list.map((e) => StudentDisciplineMapper.toDomain(e));
  }

  async create(data: StudentDisciplineDTO): Promise<StudentDiscipline> {
    const classStudent = await this._repoClassStudent.findOne({
      where: { uuid: data.classUuid },
    });
    const student = await this._repoStudent.findOne({
      where: { uuid: data.studentUuid },
    });
    const discipline = await this._repoDiscipline.findOne({
      where: { uuid: data.disciplineUuid },
    });

    if (!classStudent) throw new NotFoundError("Classe não encontrada");

    if (!student) throw new NotFoundError("Estudante não encontrado");

    if (!discipline) throw new NotFoundError("Disciplina não encontrada");

    const entity = await this._repo.create(
      StudentDisciplineMapper.toEntity(data),
    );
    await this._repo.save(entity);
    return StudentDisciplineMapper.toDomain(entity);
  }

  async getOne(uuid: string): Promise<StudentDiscipline | null> {
    const studentDiscipline = await this._repo.findOne({ where: { uuid } });

    if (!studentDiscipline)
      throw new NotFoundError("Relação de aluno com disciplina");

    return StudentDisciplineMapper.toDomain(studentDiscipline);
  }

  async delete(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete({ uuid });
    return (deleted.affected ?? 0) > 0;
  }

  async update(
    uuid: string,
    data: StudentDisciplineDTO,
  ): Promise<StudentDiscipline> {
    const entity = await this._repo.findOne({ where: { uuid } });

    if (!entity) throw new NotFoundError("Relação aluno disciplina");

    await this._repo.update({ uuid }, { ...data });
    return StudentDisciplineMapper.toDomain(entity);
  }
}
