import {
  GradeReporDTO,
  GradeReporResponseDTO,
} from "../../application/dtos/gradeReport.dto";

export class CreateGradeBuilders {
  public static execute(data: GradeReporDTO[]): GradeReporResponseDTO {
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
