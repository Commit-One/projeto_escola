import { AcademicCycleDTO } from "../../../application/dtos/academicCycle.dto";
import { AcademicCycle } from "../../../domain/entities/AcademicCycle";
import { AcademicCycleEntity } from "../entities/AcademicCycleEntity";

export class AcademicCycleMapper {
  static toDomain(entity: AcademicCycleEntity): AcademicCycle {
    return new AcademicCycle(entity.name, {
      createdAt: entity.createdAt,
      enable: entity.enable,
      uuid: entity.uuid,
    });
  }

  static toEntity(data: AcademicCycle | AcademicCycleDTO): AcademicCycleEntity {
    const entity = new AcademicCycleEntity();

    entity.name = data.name;

    return entity;
  }
}
