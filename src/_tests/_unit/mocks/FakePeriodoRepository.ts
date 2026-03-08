import { IPeriodRepository } from "../../../domain/repositories/IPeriodRepository";

export class FakePeriodoRepository implements IPeriodRepository {
  private profiles: string[] = [];

  async createPeriodo(name: string): Promise<boolean> {
    const success = this.profiles.push(name);
    return !!success;
  }

  async existByName(name: string): Promise<boolean> {
    return this.profiles.includes(name);
  }
}
