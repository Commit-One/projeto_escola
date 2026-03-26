import { GradeReporDTO } from "../../../application/dtos/gradeReport.dto";
import { CreateGradeValeuObject } from "../../../domain/valuesObject/createGrade";

describe("CreateGradeValeuObject", () => {
  it("deve montar o boletim corretamente para um único aluno", () => {
    const data: GradeReporDTO[] = [
      {
        academyCycle: "1º Bimestre",
        academyCycleUuid: "cycle-1",
        className: "Turma A",
        disciplineName: "Matemática",
        disciplineUuid: "disc-1",
        note: 8,
        periodName: "Manhã",
        schoolName: "Escola Teste",
        schoolUuid: "school-1",
        studentCpf: "12345678900",
        studentMatriculation: "MAT-001",
        studentName: "João",
        studentUuid: "student-1",
      },
    ];

    const result = CreateGradeValeuObject.execute(data);

    expect(result).toEqual({
      school: {
        name: "Escola Teste",
        uuid: "school-1",
      },
      student: {
        className: "Turma A",
        cpf: "12345678900",
        matricularion: "MAT-001",
        name: "João",
        periodName: "Manhã",
        uuid: "student-1",
      },
      grade: [
        {
          academyCycle: "1º Bimestre",
          academyCycleUuid: "cycle-1",
          values: [
            {
              disciplineName: "Matemática",
              disciplineUuid: "disc-1",
              note: 8,
            },
          ],
        },
      ],
    });
  });

  it("deve agrupar disciplinas no mesmo ciclo acadêmico", () => {
    const data: GradeReporDTO[] = [
      {
        academyCycle: "1º Bimestre",
        academyCycleUuid: "cycle-1",
        className: "Turma A",
        disciplineName: "Matemática",
        disciplineUuid: "disc-1",
        note: 8,
        periodName: "Manhã",
        schoolName: "Escola Teste",
        schoolUuid: "school-1",
        studentCpf: "12345678900",
        studentMatriculation: "MAT-001",
        studentName: "João",
        studentUuid: "student-1",
      },
      {
        academyCycle: "1º Bimestre",
        academyCycleUuid: "cycle-1",
        className: "Turma A",
        disciplineName: "Português",
        disciplineUuid: "disc-2",
        note: 9,
        periodName: "Manhã",
        schoolName: "Escola Teste",
        schoolUuid: "school-1",
        studentCpf: "12345678900",
        studentMatriculation: "MAT-001",
        studentName: "João",
        studentUuid: "student-1",
      },
    ];

    const result = CreateGradeValeuObject.execute(data);

    expect(result.grade).toHaveLength(1);
    expect(result.grade[0].values).toHaveLength(2);
    expect(result.grade[0].values).toEqual([
      {
        disciplineName: "Matemática",
        disciplineUuid: "disc-1",
        note: 8,
      },
      {
        disciplineName: "Português",
        disciplineUuid: "disc-2",
        note: 9,
      },
    ]);
  });

  it("deve criar ciclos diferentes para o mesmo aluno", () => {
    const data: GradeReporDTO[] = [
      {
        academyCycle: "1º Bimestre",
        academyCycleUuid: "cycle-1",
        className: "Turma A",
        disciplineName: "Matemática",
        disciplineUuid: "disc-1",
        note: 8,
        periodName: "Manhã",
        schoolName: "Escola Teste",
        schoolUuid: "school-1",
        studentCpf: "12345678900",
        studentMatriculation: "MAT-001",
        studentName: "João",
        studentUuid: "student-1",
      },
      {
        academyCycle: "2º Bimestre",
        academyCycleUuid: "cycle-2",
        className: "Turma A",
        disciplineName: "Matemática",
        disciplineUuid: "disc-1",
        note: 7,
        periodName: "Manhã",
        schoolName: "Escola Teste",
        schoolUuid: "school-1",
        studentCpf: "12345678900",
        studentMatriculation: "MAT-001",
        studentName: "João",
        studentUuid: "student-1",
      },
    ];

    const result = CreateGradeValeuObject.execute(data);

    expect(result.grade).toHaveLength(2);
    expect(result.grade).toEqual([
      {
        academyCycle: "1º Bimestre",
        academyCycleUuid: "cycle-1",
        values: [
          {
            disciplineName: "Matemática",
            disciplineUuid: "disc-1",
            note: 8,
          },
        ],
      },
      {
        academyCycle: "2º Bimestre",
        academyCycleUuid: "cycle-2",
        values: [
          {
            disciplineName: "Matemática",
            disciplineUuid: "disc-1",
            note: 7,
          },
        ],
      },
    ]);
  });

  it("deve retornar apenas o primeiro aluno quando houver mais de um", () => {
    const data: GradeReporDTO[] = [
      {
        academyCycle: "1º Bimestre",
        academyCycleUuid: "cycle-1",
        className: "Turma A",
        disciplineName: "Matemática",
        disciplineUuid: "disc-1",
        note: 8,
        periodName: "Manhã",
        schoolName: "Escola Teste",
        schoolUuid: "school-1",
        studentCpf: "12345678900",
        studentMatriculation: "MAT-001",
        studentName: "João",
        studentUuid: "student-1",
      },
      {
        academyCycle: "1º Bimestre",
        academyCycleUuid: "cycle-1",
        className: "Turma B",
        disciplineName: "História",
        disciplineUuid: "disc-3",
        note: 10,
        periodName: "Tarde",
        schoolName: "Escola Teste",
        schoolUuid: "school-1",
        studentCpf: "99999999999",
        studentMatriculation: "MAT-002",
        studentName: "Maria",
        studentUuid: "student-2",
      },
    ];

    const result = CreateGradeValeuObject.execute(data);

    expect(result.student.uuid).toBe("student-1");
    expect(result.student.name).toBe("João");
  });
});
