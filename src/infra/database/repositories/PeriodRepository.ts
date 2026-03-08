import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { PeriodEntity } from "../entities/PeriodEntity";
import { Period } from "../../../domain/entities/Period";
import { IPeriodRepository } from "../../../domain/repositories/IPeriodRepository";

export class PeriodTypeOrmRepository implements IPeriodRepository {
  private readonly _repo: Repository<PeriodEntity>;

  constructor() {
    this._repo = AppDataSource.getRepository(PeriodEntity);
  }

  async existByName(name: string): Promise<boolean> {
    const exist = await this._repo.findOne({ where: { name } });

    return !!exist?.uuid;
  }

  async createPeriodo(name: string): Promise<boolean> {
    const periodo = new Period(name);

    await this._repo.save(periodo);
    return true;
  }
}
