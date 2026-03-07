import { IProfileRepository } from "../../../domain/repositories/IProfileRepository";

export class FakeProfileRepository implements IProfileRepository {
  private profiles: string[] = [];

  async createProfile(name: string): Promise<boolean> {
    const success = this.profiles.push(name);
    return !!success;
  }

  async existByName(name: string): Promise<boolean> {
    return this.profiles.includes(name);
  }
}
