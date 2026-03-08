import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { PeriodoEntity } from "../entities/PeriodoEntity";
import { Periodo } from "../../../domain/entities/Periodo";
import { IPeriodoRepository } from "../../../domain/repositories/IPeriodoRepository";

export class PeriodoTypeOrmRepository implements IPeriodoRepository {
  private readonly _repo: Repository<PeriodoEntity>;

  constructor() {
    this._repo = AppDataSource.getRepository(PeriodoEntity);
  }

  async existByName(name: string): Promise<boolean> {
    const exist = await this._repo.findOne({ where: { name } });

    return !!exist?.uuid;
  }

  async createPeriodo(name: string): Promise<boolean> {
    const periodo = new Periodo(name);

    await this._repo.save(periodo);
    return true;
  }
}
