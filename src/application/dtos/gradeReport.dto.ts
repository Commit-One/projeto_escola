export interface GradeReporResponseDTO {
  student: {
    name: string;
    matricularion: string;
    cpf: string;
    uuid: string;
    className: string;
    periodName: string;
  };
  school: {
    name: string;
    uuid: string;
  };
  grade: [
    {
      academyCycle: string;
      academyCycleUuid: string;
      values: [
        {
          disciplineName: string;
          disciplineUuid: string;
          note: number;
          isApproved: boolean;
        },
      ];
    },
  ];
}

export interface GradeReporDTO {
  studentName: string;
  studentUuid: string;
  studentMatriculation: string;
  studentCpf: string;
  className: string;
  periodName: string;
  schoolName: string;
  schoolUuid: string;
  academyCycle: string;
  academyCycleUuid: string;
  disciplineName: string;
  disciplineUuid: string;
  note: number;
  isApproved: boolean;
}
