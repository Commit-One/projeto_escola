import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { IClassStudentRepository } from "../../../domain/repositories/IClassStudentRepository";
import { ClassStudent } from "../../../domain/entities/ClassStudent";
import { ClassStudentEntity } from "../entities/ClassStudentEntity";
import { NotFoundError } from "../../../utils/error";
import { ClassIStudentDTO } from "../../../application/dtos/classStudent.dto";
import { ClassStudentMapper } from "../mappers/classStudent.mapper";
import { injectable } from "tsyringe";

@injectable()
export class ClassStudentTypeOrmRepository implements IClassStudentRepository {
  protected readonly _repo: Repository<ClassStudentEntity>;

  constructor() {
    this._repo = AppDataSource.getRepository(ClassStudentEntity);
  }

  async getOne(uuid: string): Promise<ClassStudent | null> {
    const find = await this._repo.findOne({ where: { uuid } });
    if (find) throw new NotFoundError("Classe");
    return ClassStudentMapper.toDomain(find!);
  }

  async updateStatus(uuid: string, status: string): Promise<boolean> {
    const updated = await this._repo.update({ uuid }, { status } as any);
    return (updated.affected ?? 0) > 0;
  }

  async delete(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete({ uuid });
    return (deleted.affected ?? 0) > 0;
  }

  async update(uuid: string, data: ClassIStudentDTO): Promise<ClassStudent> {
    const entity = await this._repo.findOne({ where: { uuid } });

    if (!entity) throw new NotFoundError("Classe");

    await this._repo.update({ uuid }, { ...data });
    return ClassStudentMapper.toDomain(entity);
  }

  async getAll(): Promise<ClassStudent[]> {
    const list = await this._repo.find();
    return list.map((e) => ClassStudentMapper.toDomain(e));
  }

  async existByName(name: string): Promise<boolean> {
    const exist = await this._repo.exists({ where: { name } });
    return exist;
  }

  async create(data: ClassIStudentDTO): Promise<ClassStudent> {
    const entity = ClassStudentMapper.toEntity(data);
    await this._repo.save(entity);
    return ClassStudentMapper.toDomain(entity);
  }
}
