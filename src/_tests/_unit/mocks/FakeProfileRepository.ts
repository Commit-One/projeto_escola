import { IProfileRepository } from "../../../domain/repositories/IProfileRepository";
import { Profile } from "../../../domain/entities/Profile";

export class FakeProfileRepository implements IProfileRepository {
  private profiles: string[] = [];

  async create(data: Profile): Promise<Profile> {
    this.profiles.push(data.name);
    return data;
  }

  async delete(uuid: string): Promise<boolean> {
    return false;
  }

  async updateStatus(uuid: string, status: string): Promise<boolean> {
    return false;
  }

  async update(uuid: string, data: Profile): Promise<Profile> {
    return data;
  }

  async createProfile(name: string): Promise<boolean> {
    const success = this.profiles.push(name);
    return !!success;
  }

  async existByName(name: string): Promise<boolean> {
    return this.profiles.includes(name);
  }
}
