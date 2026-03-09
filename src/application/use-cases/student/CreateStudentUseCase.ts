import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { ICacheRepository } from "../../../infra/cache/cache.repository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { StudentDTO, StudentResponseDTO } from "../../dtos/StudentDTO";

export class CreateStudentUseCase {
  constructor(
    private readonly _repo: IStudentRepository,
    private readonly _cache: ICacheRepository,
  ) {}

  async execute(data: StudentDTO): Promise<StudentResponseDTO | null> {
    const created = await this._repo.create(data);
    if (created) await this._cache.delete(cacheKeyEnum.STUDENTS);
    return created;
  }
}
