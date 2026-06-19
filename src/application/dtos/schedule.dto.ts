export interface IScheduleDTO {
  classUuid: string;
  event: string;
  schoolUuid: string;
  initialHours: string;
  date: Date;
  endHours: string;
  name?: string;
}
