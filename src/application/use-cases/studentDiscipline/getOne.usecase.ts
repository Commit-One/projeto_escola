import { inject, injectable } from "tsyringe";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { ContainerEnum } from "../../../utils/enum/container";
import { IStudentDisciplineRepository } from "../../../domain/repositories/IStudentDisciplineRepository";
import { StudentDiscipline } from "../../../domain/entities/StudentDiscipline";

@injectable()
export class GetOneStudentDisciplineUseCase {
  constructor(
    @inject(ContainerEnum.DISCIPLINE_REPOSITORY)
    private _repo: IStudentDisciplineRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string): Promise<StudentDiscipline | null> {
    const cached = await this._cache.get<StudentDiscipline[]>(
      cacheKeyEnum.STUDENT_DISCIPLINE,
    );
    let discipline;

    if (!cached) discipline = await this._repo.getOne(uuid);
    else discipline = cached.find((s) => s.uuid.includes(uuid));

    return discipline ?? null;
  }
}
