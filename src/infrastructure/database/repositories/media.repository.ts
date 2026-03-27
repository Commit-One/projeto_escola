import { injectable } from "tsyringe";
import { Repository } from "typeorm";
import { MediaDTO } from "../../../application/dtos/media.dto";
import { Media } from "../../../domain/entities/Media";
import { IMediaRepository } from "../../../domain/repositories/IMediaRepository";
import { NotFoundError } from "../../../utils/error";
import { AppDataSource } from "../data-source";
import { MediaEntity } from "../entities/MediaEntity";
import { MediaMapper } from "../mappers/media.mapper";

@injectable()
export class MediaTypeOrmRepository implements IMediaRepository {
  protected readonly _repo: Repository<MediaEntity>;

  constructor() {
    this._repo = AppDataSource.getRepository(MediaEntity);
  }

  async getOne(uuid: string): Promise<Media> {
    const result = await this._repo.findOne({
      where: { uuid },
    });

    if (!result) throw new NotFoundError("Media");

    return MediaMapper.toDomain(result);
  }

  async delete(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete({ uuid });
    return (deleted.affected ?? 0) > 0;
  }

  async getAll(): Promise<Media[]> {
    const list = await this._repo.find();
    return list.map((item) => MediaMapper.toDomain(item));
  }

  async create(data: MediaDTO): Promise<Media> {
    const entity = MediaMapper.toEntity(data);
    await this._repo.save(entity);
    return MediaMapper.toDomain(entity);
  }

  async update(uuid: string, data: MediaDTO): Promise<Media | null> {
    const exists = await this._repo.exists({
      where: { uuid },
    });

    if (!exists) return null;

    await this._repo.update({ uuid }, { ...data });
    return await this.getOne(uuid);
  }
}
