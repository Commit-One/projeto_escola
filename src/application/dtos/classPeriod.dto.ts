export interface ClassPeriodDTO {
  classUuid: string;
  periodUuid: string;
  value: number;
  schoolUuid: string;
}

export interface ClassPeriodResponseDTO {
  uuid: string;
  className: string;
  periodName: string;
  value: number;
  createdAt: string;
}
