import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { PeriodEntity } from "../entities/PeriodEntity";
import { IPeriodRepository } from "../../../domain/repositories/IPeriodRepository";
import { Period } from "../../../domain/entities/Period";
import { injectable } from "tsyringe";
import { PeriodDTO } from "../../../application/dtos/period.dto";
import { NotFoundError } from "../../../utils/error";
import { PeriodMapper } from "../mappers/period.mapper";

@injectable()
export class PeriodTypeOrmRepository implements IPeriodRepository {
  protected readonly _repo: Repository<PeriodEntity>;

  constructor() {
    this._repo = AppDataSource.getRepository(PeriodEntity);
  }

  async create(name: string, schoolUuid: string): Promise<boolean> {
    const profile = new Period(name, schoolUuid);
    return await this._repo
      .save(profile)
      .then(() => true)
      .catch(() => false);
  }

  async existByName(name: string): Promise<boolean> {
    const exist = await this._repo.exists({ where: { name } });
    return exist;
  }

  async getAll(schoolUuid: string): Promise<PeriodEntity[]> {
    return await this._repo.find({ where: { schoolUuid } });
  }

  async update(uuid: string, data: PeriodDTO): Promise<Period> {
    const entity = await this._repo.findOne({ where: { uuid } });

    if (!entity) throw new NotFoundError("Período não encontrado");

    await this._repo.update({ uuid }, { ...data });
    return PeriodMapper.toDomain(entity);
  }

  async delete(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete({ uuid });
    return (deleted.affected ?? 0) > 0;
  }
}
