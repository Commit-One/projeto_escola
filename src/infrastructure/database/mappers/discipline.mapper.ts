import { Discipline } from "../../../domain/entities/Discipline";
import { DisciplineEntity } from "../entities/DisciplineEntity";

export class DisciplineMapper {
  static toDomain(entity: DisciplineEntity): Discipline {
    return new Discipline(entity.name, entity.schoolUuid, {
      uuid: entity.uuid,
      createdAt: entity.createdAt,
      enable: entity.enable,
    });
  }

  static toEntity(data: Discipline): DisciplineEntity {
    const entity = new DisciplineEntity();

    entity.name = data.name;
    entity.schoolUuid = data.schoolUuid;
    entity.uuid = data.uuid;
    entity.createdAt = data.createdAt;
    entity.enable = data.enable;

    return entity;
  }
}
