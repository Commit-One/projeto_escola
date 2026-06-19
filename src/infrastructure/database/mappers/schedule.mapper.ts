import { IScheduleDTO } from "../../../application/dtos/schedule.dto";
import { Schedule } from "../../../domain/entities/Schedule";
import { ScheduleEntity } from "../entities/Schedule";

export class ScheduleMapper {
  static toDomain(entity: ScheduleEntity | any): Schedule {
    return new Schedule(
      entity.classUuid,
      entity.event,
      entity.schoolUuid,
      entity.initialHours,
      entity.endHours,
      new Date(entity.date),
      entity.name,
      {
        createdAt: entity.createdAt,
        enable: entity.enable,
        uuid: entity.uuid,
      },
    );
  }

  static toEntity(data: Schedule | IScheduleDTO): ScheduleEntity {
    const entity = new ScheduleEntity();

    entity.classUuid = data.classUuid;
    entity.event = data.event;
    entity.schoolUuid = data.schoolUuid;
    entity.initialHours = data.initialHours;
    entity.endHours = data.endHours;
    entity.date = new Date(data.date);

    return entity;
  }
}
