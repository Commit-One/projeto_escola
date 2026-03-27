import { MediaDTO } from "../../../application/dtos/media.dto";
import { Media } from "../../../domain/entities/Media";
import { MediaEntity } from "../entities/MediaEntity";

export class MediaMapper {
  static toDomain(entity: MediaEntity): Media {
    return new Media(entity.schoolUuid, entity.media, {
      createdAt: entity.createdAt,
      enable: entity.enable,
      uuid: entity.uuid,
    });
  }

  static toEntity(data: Media | MediaDTO): MediaEntity {
    const entity = new MediaEntity();

    entity.schoolUuid = data.schoolUuid;
    entity.media = data.media;

    return entity;
  }
}
