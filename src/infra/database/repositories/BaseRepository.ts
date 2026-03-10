import { Repository } from "typeorm";
import { ObjectLiteral } from "typeorm";
import { IBaseRepository } from "../../../domain/repositories/IBaseRepository";
import { ApplicationError } from "../../../utils/error";

export class BaseRepository<T extends ObjectLiteral> implements IBaseRepository<T>{
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

  async update(uuid: string, data: T): Promise<T> {
    const findOne = await this._repo.findOne({ where: { uuid } as any });
    if (!findOne) throw new Error(ApplicationError.generic.notFound);

    return await this._repo
      .update({ uuid } as any, { ...data } as any)
      .then((e) => e)
      .catch((e) => e);
  }

  async create(data: T): Promise<T> {    
    await this._repo.save(data);
    return data;
  }
}
