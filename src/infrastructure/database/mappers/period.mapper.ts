import { Period } from "../../../domain/entities/Period";
import { PeriodEntity } from "../entities/PeriodEntity";

export class PeriodMapper {
  static toDomain(entity: PeriodEntity): Period {
    return new Period(entity.name, entity.schoolUuid, {
      uuid: entity.uuid,
      createdAt: entity.createdAt,
      enable: entity.enable,
    });
  }

  static toEntity(entity: Period): PeriodEntity {
    const periodEntity = new PeriodEntity();

    periodEntity.name = entity.name;
    periodEntity.schoolUuid = entity.schoolUuid;

    return periodEntity;
  }
}
