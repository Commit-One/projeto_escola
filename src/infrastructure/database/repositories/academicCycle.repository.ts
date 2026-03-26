import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import { AcademicCycleDTO } from "../../../application/dtos/academicCycle.dto";
import { AcademicCycle } from "../../../domain/entities/AcademicCycle";
import { IAcademicCycleRepository } from "../../../domain/repositories/IAcademicCycleRepository";
import { NotFoundError } from "../../../utils/error";
import { AppDataSource } from "../data-source";
import { AcademicCycleEntity } from "../entities/AcademicCycleEntity";
import { AcademicCycleMapper } from "../mappers/academicCycle.mapper";

@injectable()
export class AcademicCycleTypeOrmRepository implements IAcademicCycleRepository {
  protected readonly _repo: Repository<AcademicCycleEntity>;

  constructor() {
    this._repo = AppDataSource.getRepository(AcademicCycleEntity);
  }

  async getOne(uuid: string): Promise<AcademicCycle> {
    const result = await this._repo.findOne({
      where: { uuid },
    });

    if (!result) throw new NotFoundError("AcademicCycle");

    return AcademicCycleMapper.toDomain(result);
  }

  async delete(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete({ uuid });
    return (deleted.affected ?? 0) > 0;
  }

  async getAll(): Promise<AcademicCycle[]> {
    const list = await this._repo.find();
    return list.map((item) => AcademicCycleMapper.toDomain(item));
  }

  async create(data: AcademicCycleDTO): Promise<AcademicCycle> {
    const entity = AcademicCycleMapper.toEntity(data);
    await this._repo.save(entity);
    return AcademicCycleMapper.toDomain(entity);
  }

  async update(
    uuid: string,
    data: AcademicCycleDTO,
  ): Promise<AcademicCycle | null> {
    const exists = await this._repo.exists({
      where: { uuid },
    });

    if (!exists) return null;

    await this._repo.update({ uuid }, { ...data });
    return await this.getOne(uuid);
  }
}
