import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { PeriodEntity } from "../entities/PeriodEntity";
import { IPeriodRepository } from "../../../domain/repositories/IPeriodRepository";
import { Period } from "../../../domain/entities/Period";

export class PeriodTypeOrmRepository implements IPeriodRepository {
  protected readonly _repo: Repository<PeriodEntity>;

  constructor() {
    this._repo = AppDataSource.getRepository(PeriodEntity);
  }

  async create(name: string): Promise<boolean> {
    const profile = new Period(name)
    return await this._repo.save(profile).then(() => true).catch(() => false)
  }

  async existByName(name: string): Promise<boolean> {
    const exist = await this._repo.findOne({ where: { name } });
    return !!exist?.uuid;
  }
}
