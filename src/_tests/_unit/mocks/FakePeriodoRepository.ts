import { IPeriodRepository } from "../../../domain/repositories/IPeriodRepository";
import { PeriodEntity } from "../../../infrastructure/database/entities/PeriodEntity";

export class FakePeriodoRepository implements IPeriodRepository {
  private profiles: string[] = [];

  async create(name: string): Promise<boolean> {
    const success = this.profiles.push(name);
    return !!success;
  }

  async existByName(name: string): Promise<boolean> {
    return this.profiles.some((p) => p.toLowerCase() === name.toLowerCase());
  }

  async getAll(): Promise<PeriodEntity[] | null> {
    return [];
  }
}
