import { Repository } from "typeorm";
import { ClassPeriodEntity } from "../entities/ClassPeriodEntity";
import { AppDataSource } from "../data-source";
import { IClassPeriodRepository } from "../../../domain/repositories/IClassPeriodRepository";
import { ClassPeriod } from "../../../domain/entities/ClassPeriod";
import { AppError, NotFoundError } from "../../../utils/error";
import { ClassPeriodMapper } from "../mappers/classPeriod.mapper";
import { ClassPeriodDTO } from "../../../application/dtos/classPeriod.dto";
import { ClassStudentEntity } from "../entities/ClassStudentEntity";
import { PeriodEntity } from "../entities/PeriodEntity";
import { injectable } from "tsyringe";

@injectable()
export class ClassPeriodTypeOrmRepository implements IClassPeriodRepository {
  protected readonly _repo: Repository<ClassPeriodEntity>;
  protected readonly _repoClass: Repository<ClassStudentEntity>;
  protected readonly _repoPeriod: Repository<PeriodEntity>;

  constructor() {
    this._repo = AppDataSource.getRepository(ClassPeriodEntity);
    this._repoClass = AppDataSource.getRepository(ClassStudentEntity);
    this._repoPeriod = AppDataSource.getRepository(PeriodEntity);
  }

  async delete(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete({ uuid });
    return (deleted.affected ?? 0) > 0;
  }

  async update(uuid: string, data: ClassPeriodDTO): Promise<ClassPeriod> {
    await this._repo.update({ uuid }, { ...data });
    return await this.getOne(uuid);
  }

  async getOne(uuid: string): Promise<ClassPeriod> {
    const result = await this._repo.findOne({
      where: { uuid: uuid },
    });

    if (!result) throw new NotFoundError("Regra");

    return ClassPeriodMapper.toDomain(result);
  }

  async getAll(): Promise<ClassPeriod[]> {
    const list = await this._repo.find();
    return list.map((e) => ClassPeriodMapper.toDomain(e));
  }

  async create(data: ClassPeriodDTO): Promise<ClassPeriod> {
    const classExist = await this._repoClass.exists({
      where: { uuid: data.classUuid },
    });

    if (!classExist) throw new AppError("Classe não existente");

    const periodExist = await this._repoPeriod.exists({
      where: { uuid: data.periodUuid },
    });

    if (!periodExist) throw new AppError("Período não existente");

    const classPeriod = await this._repo.findOne({
      where: {
        classUuid: data.classUuid,
        periodUuid: data.periodUuid,
      },
    });

    if (classPeriod)
      throw new AppError("Já existe uma regra com essas informações");

    const entity = ClassPeriodMapper.toEntity(data);
    await this._repo.save(entity);
    return ClassPeriodMapper.toDomain(entity);
  }

  async getByClassPeriodUuid(
    classUuid: string,
    periodUuid: string,
  ): Promise<ClassPeriod> {
    const classPeriod = await this._repo.findOne({
      where: { classUuid, periodUuid },
    });

    if (!classPeriod) throw new AppError("Regra não encontrada");

    return ClassPeriodMapper.toDomain(classPeriod);
  }
}
