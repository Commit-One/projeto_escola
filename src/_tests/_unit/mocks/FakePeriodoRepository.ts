import { IPeriodoRepository } from "../../../domain/repositories/IPeriodoRepository";

export class FakePeriodoRepository implements IPeriodoRepository {
  private profiles: string[] = [];

  async createPeriodo(name: string): Promise<boolean> {
    const success = this.profiles.push(name);
    return !!success;
  }

  async existByName(name: string): Promise<boolean> {
    return this.profiles.includes(name);
  }
}
