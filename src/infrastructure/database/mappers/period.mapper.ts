import { Period } from "../../../domain/entities/Period";
import { PeriodEntity } from "../entities/PeriodEntity";

export class PeriodMapper {
  static toDomain(entity: PeriodEntity): Period {
    return new Period(entity.name, {
      uuid: entity.uuid,
      createdAt: entity.createdAt,
      enable: entity.enable,
    });
  }

  static toEntity(entity: Period): PeriodEntity {
    const periodEntity = new PeriodEntity();

    periodEntity.name = entity.name;

    return periodEntity;
  }
}
