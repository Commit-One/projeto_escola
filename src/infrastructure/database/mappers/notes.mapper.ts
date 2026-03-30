import {
  GradeReporDTO,
  GradeReporResponseDTO,
} from "../../../application/dtos/gradeReport.dto";
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

  static toGradeRepport(data: GradeReporDTO[]): GradeReporResponseDTO {
    const response: GradeReporResponseDTO[] = [];

    for (const item of data) {
      const studentGroup = response.find(
        (r) => r.student.uuid === item.studentUuid,
      );

      if (studentGroup) {
        const academicCycleGroup = studentGroup.grade.find(
          (g) => g.academyCycleUuid === item.academyCycleUuid,
        );

        if (academicCycleGroup) {
          academicCycleGroup.values.push({
            disciplineName: item.disciplineName,
            disciplineUuid: item.disciplineUuid,
            note: item.note,
            isApproved: item.isApproved,
          });
        } else {
          studentGroup.grade.push({
            academyCycle: item.academyCycle,
            academyCycleUuid: item.academyCycleUuid,
            values: [
              {
                disciplineUuid: item.disciplineUuid,
                disciplineName: item.disciplineName,
                note: item.note,
                isApproved: item.isApproved,
              },
            ],
          });
        }
      } else {
        response.push({
          grade: [
            {
              academyCycle: item.academyCycle,
              academyCycleUuid: item.academyCycleUuid,
              values: [
                {
                  disciplineUuid: item.disciplineUuid,
                  disciplineName: item.disciplineName,
                  note: item.note,
                  isApproved: item.isApproved,
                },
              ],
            },
          ],
          school: {
            name: item.schoolName,
            uuid: item.schoolUuid,
          },
          student: {
            className: item.className,
            cpf: item.studentCpf,
            matricularion: item.studentMatriculation,
            name: item.studentName,
            periodName: item.periodName,
            uuid: item.studentUuid,
          },
        });
      }
    }

    return response[0];
  }
}
