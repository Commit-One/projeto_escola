import { ClassPeriodDTO } from "../../../application/dtos/classPeriod.dto";
import { ClassPeriod } from "../../../domain/entities/ClassPeriod";
import { ClassPeriodEntity } from "../entities/ClassPeriodEntity";

export class ClassPeriodMapper {
  static toDomain(entity: ClassPeriodEntity): ClassPeriod {
    return new ClassPeriod(entity.value, entity.classUuid, entity.periodUuid, {
      createdAt: entity.createdAt,
      enable: entity.enable,
      uuid: entity.uuid,
    });
  }

  static toEntity(data: ClassPeriod | ClassPeriodDTO): ClassPeriodEntity {
    const entity = new ClassPeriodEntity();

    entity.classUuid = data.classUuid;
    entity.periodUuid = data.periodUuid;
    entity.value = data.value;

    return entity;
  }
}
