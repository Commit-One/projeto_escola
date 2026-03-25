import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { ContainerEnum } from "../../../utils/enum/container";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { IStudentDisciplineRepository } from "../../../domain/repositories/IStudentDisciplineRepository";
import { StudentDiscipline } from "../../../domain/entities/StudentDiscipline";

@injectable()
export class GetAllStudentDisciplineUseCase {
  constructor(
    @inject(ContainerEnum.STUDENT_DISCIPLINE_REPOSITORY)
    private readonly _repo: IStudentDisciplineRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(): Promise<StudentDiscipline[]> {
    const cached = await this._cache.get<StudentDiscipline[]>(
      cacheKeyEnum.STUDENT_DISCIPLINE,
    );

    if (cached) return cached;

    const list = await this._repo.getAll();
    await this._cache.set(cacheKeyEnum.STUDENT_DISCIPLINE, list);
    return list;
  }
}
