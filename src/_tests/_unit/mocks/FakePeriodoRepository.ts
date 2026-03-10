import { IPeriodRepository } from "../../../domain/repositories/IPeriodRepository";
import { Period } from "../../../domain/entities/Period";

export class FakePeriodoRepository implements IPeriodRepository {
  private profiles: string[] = [];

  async create(data: Period): Promise<Period> {
    this.profiles.push(data.name);
    return data;
  }

  async delete(uuid: string): Promise<boolean> {
    return false;
  }

  async updateStatus(uuid: string, status: string): Promise<boolean> {
    return false;
  }

  async update(uuid: string, data: Period): Promise<Period> {
    return data;
  }

  async createPeriodo(name: string): Promise<boolean> {
    const success = this.profiles.push(name);
    return !!success;
  }

  async existByName(name: string): Promise<boolean> {
    return this.profiles.some((p) => p.toLowerCase() === name.toLowerCase());
  }
}
