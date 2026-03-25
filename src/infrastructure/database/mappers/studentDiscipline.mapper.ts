import { StudentDisciplineDTO } from "../../../application/dtos/studentDiscipline.dto";
import { StudentDiscipline } from "../../../domain/entities/StudentDiscipline";
import { StudentDisciplineEntity } from "../entities/StudentDisciplineEntity";

export class StudentDisciplineMapper {
  static toDomain(entity: StudentDisciplineEntity): StudentDiscipline {
    return new StudentDiscipline(
      entity.studentUuid,
      entity.disciplineUuid,
      entity.classUuid,
      entity.schoolUuid,
      entity.note,
      {
        uuid: entity.uuid,
        createdAt: entity.createdAt,
        enable: entity.enable,
      },
    );
  }

  static toEntity(data: StudentDisciplineDTO): StudentDisciplineEntity {
    const entity = new StudentDisciplineEntity();

    entity.studentUuid = data.studentUuid;
    entity.schoolUuid = data.schoolUuid;
    entity.classUuid = data.classUuid;
    entity.disciplineUuid = data.disciplineUuid;
    entity.note = data.note;

    return entity;
  }
}
