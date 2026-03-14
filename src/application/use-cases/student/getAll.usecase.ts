import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { StudentResponseDTO } from "../../dtos/student.dto";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class GetAllStudetsUseCase {
  constructor(
    @inject(ContainerEnum.STUDENT_REPOSITORY)
    private readonly _repo: IStudentRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(): Promise<StudentResponseDTO[]> {
    const cached =
      (await this._cache.get<StudentResponseDTO[]>(cacheKeyEnum.STUDENTS)) ??
      [];

    if (cached.length > 1) return cached;

    const students = await this._repo.getAll();
    await this._cache.set(cacheKeyEnum.STUDENTS, students);

    return students;
  }
}
