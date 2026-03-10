import { Repository } from "typeorm";
import { ObjectLiteral } from "typeorm";

export class BaseRepository<T extends ObjectLiteral> {
  constructor(protected readonly _repo: Repository<T>) {}

  async delete(uuid: string): Promise<boolean> {
    return await this._repo
      .delete({ uuid } as any)
      .then(() => true)
      .catch(() => false);
  }

  async updateStatus(uuid: string, status: string): Promise<boolean> {
    return await this._repo
      .update({ uuid } as any, { status } as any)
      .then(() => true)
      .catch(() => false);
  }

  async create(data: any): Promise<boolean> {
    const entity = this._repo.create(data);
    await this._repo.create(entity);
    return true;
  }
}
