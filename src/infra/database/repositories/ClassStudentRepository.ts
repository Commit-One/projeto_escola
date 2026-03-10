import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { IClassStudentRepository } from "../../../domain/repositories/IClassStudentRepository";
import { ClassStudent } from "../../../domain/entities/ClassStudent";
import { ClassStudentDTO } from "../../../application/dtos/ClassStudentDTO";
import { ClassStudentEntity } from "../entities/ClassStudentEntity";

export class ClassStudentTypeOrmRepository implements IClassStudentRepository {
  private readonly _repo: Repository<ClassStudentEntity>;

  constructor() {
    this._repo = AppDataSource.getRepository(ClassStudentEntity);
  }

  async create(data: ClassStudentDTO): Promise<ClassStudent> {
    const classStudent = new ClassStudent(data.name, data.maxAge, data.minAge);
    await this._repo.save(classStudent);

    return classStudent;
  }

  async getAll(): Promise<ClassStudent[]> {
    const list = await this._repo.find();
    return list;
  }

  async getOne(uuid: string): Promise<ClassStudent | null> {
    return await this._repo.findOne({ where: { uuid } });
  }

  async update(uuid: string, data: ClassStudentDTO): Promise<ClassStudent> {
    await this._repo.update({ uuid }, data);
    const updated = await this._repo.findOne({ where: { uuid } });
    return updated as ClassStudent;
  }
  async delete(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete({ uuid });
    return (deleted.affected ?? 0) > 0;
  }

  async existByName(name: string): Promise<boolean> {
    const exist = await this._repo.findOne({ where: { name } });
    return !!exist?.uuid;
  }
}
