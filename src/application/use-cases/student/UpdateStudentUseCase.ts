import { Student } from "../../../domain/entities/Student";
import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { ICacheService } from "../../../infra/cache/ICacheService";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { StudentDTO } from "../../dtos/StudentDTO";

export class UpdateStudentUseCase {
  constructor(
    private readonly _repo: IStudentRepository,
    private readonly _cache: ICacheService,
  ) {}

  async execute(uuid: string, data: StudentDTO): Promise<Student> {
    const updated = await this._repo.update(uuid, data);
    if (updated) await this._cache.delete(cacheKeyEnum.STUDENTS);
    return updated;
  }
}
