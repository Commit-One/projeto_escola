import { NotesDTO } from "../../../application/dtos/notes.dto";
import { Notes } from "../../../domain/entities/Notes";
import { NotesEntity } from "../entities/NotesEntity";

export class NotesMapper {
  static toDomain(entity: NotesEntity): Notes {
    return new Notes(
      entity.studentUuid,
      entity.disciplineUuid,
      entity.classUuid,
      entity.periodUuid,
      entity.schoolUuid,
      entity.academiccycleUuid,
      entity.note,
      {
        uuid: entity.uuid,
        createdAt: entity.createdAt,
        enable: entity.enable,
      },
    );
  }

  static toEntity(data: NotesDTO): NotesEntity {
    const entity = new NotesEntity();

    entity.studentUuid = data.studentUuid;
    entity.schoolUuid = data.schoolUuid;
    entity.classUuid = data.classUuid;
    entity.periodUuid = data.periodUuid;
    entity.disciplineUuid = data.disciplineUuid;
    entity.academiccycleUuid = data.academiccycleUuid;
    entity.note = data.note;

    return entity;
  }
}
