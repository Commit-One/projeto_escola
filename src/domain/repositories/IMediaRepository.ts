import { MediaDTO } from "../../application/dtos/media.dto";
import { Media } from "../entities/Media";

export interface IMediaRepository {
  getOne(uuid: string): Promise<Media | null>;
  delete(uuid: string): Promise<boolean>;
  getAll(): Promise<Media[]>;
  create(data: MediaDTO): Promise<Media>;
  update(uuid: string, data: MediaDTO): Promise<Media | null>;
}
