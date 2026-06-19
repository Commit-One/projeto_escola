import { IScheduleDTO } from "../../application/dtos/schedule.dto";
import { Schedule } from "../entities/Schedule";

export interface IScheduleRepository {
  getAll(schoolUuid: string): Promise<IScheduleDTO[]>;
  create(data: IScheduleDTO): Promise<Schedule>;
  delete(uuid: string): Promise<boolean>;
  update(uuid: string, data: IScheduleDTO): Promise<Schedule>;
}
