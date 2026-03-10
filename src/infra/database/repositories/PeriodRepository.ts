import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { PeriodEntity } from "../entities/PeriodEntity";
import { IPeriodRepository } from "../../../domain/repositories/IPeriodRepository";
import { BaseRepository } from "./BaseRepository";

export class PeriodTypeOrmRepository extends BaseRepository<PeriodEntity> implements IPeriodRepository {
  protected readonly _repo: Repository<PeriodEntity>;

  constructor() {
    const inicialize = AppDataSource.getRepository(PeriodEntity);
    super(inicialize);
    this._repo = AppDataSource.getRepository(PeriodEntity);
  }

  async existByName(name: string): Promise<boolean> {
    const exist = await this._repo.findOne({ where: { name } });

    return !!exist?.uuid;
  }
}
