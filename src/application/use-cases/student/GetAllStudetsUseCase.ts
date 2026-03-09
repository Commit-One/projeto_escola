import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { ICacheRepository } from "../../../infra/cache/cache.repository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { StudentResponseDTO } from "../../dtos/StudentDTO";

export class GetAllStudetsUseCase {
  constructor(
    private readonly _repo: IStudentRepository,
    private readonly _cache: ICacheRepository,
  ) {}

  async execute(): Promise<StudentResponseDTO[]> {
    const cached: any = await this._cache.get<StudentResponseDTO[]>(
      cacheKeyEnum.STUDENTS,
    );

    if (cached) return cached;

    return await this._repo.getAll();
  }
}
