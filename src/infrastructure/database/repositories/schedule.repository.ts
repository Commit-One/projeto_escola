import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { NotFoundError } from "../../../utils/error";
import { BcryptSecurity } from "../../security/bcrypt";
import { injectable } from "tsyringe";
import { IScheduleRepository } from "../../../domain/repositories/IScheduleRepository";
import { ScheduleEntity } from "../entities/Schedule";
import { IScheduleDTO } from "../../../application/dtos/schedule.dto";
import { Schedule } from "../../../domain/entities/Schedule";
import { ScheduleMapper } from "../mappers/schedule.mapper";
import { scheduleQuery } from "../_queries/schedule.query";

@injectable()
export class ScheduleTypeOrmRepository implements IScheduleRepository {
  protected readonly _repo: Repository<ScheduleEntity>;
  private readonly _bcryp = new BcryptSecurity();

  constructor() {
    this._repo = AppDataSource.getRepository(ScheduleEntity);
  }

  async create(data: IScheduleDTO): Promise<Schedule> {
    const schedule = ScheduleMapper.toEntity(data);
    await this._repo.save(schedule);
    return ScheduleMapper.toDomain(schedule);
  }

  async getAll(schoolUuid: string): Promise<IScheduleDTO[]> {
    const sql = scheduleQuery.replace("@schoolUuid", schoolUuid);
    const schedules = await this._repo.query(sql);
    return schedules.map(ScheduleMapper.toDomain);
  }

  async update(uuid: string, data: IScheduleDTO): Promise<Schedule> {
    const schedule = await this._repo.findOne({ where: { uuid } });

    if (!schedule) throw new NotFoundError("Agendamento");

    const updatedSchedule = this._repo.merge(schedule, {
      classUuid: data.classUuid,
      event: data.event,
      schoolUuid: data.schoolUuid,
      initialHours: data.initialHours,
      endHours: data.endHours,
      date: data.date,
    });

    await this._repo.save(updatedSchedule);
    return ScheduleMapper.toDomain(updatedSchedule);
  }

  async delete(uuid: string): Promise<boolean> {
    const deleted = await this._repo.delete({ uuid });
    return (deleted.affected ?? 0) > 0;
  }
}
