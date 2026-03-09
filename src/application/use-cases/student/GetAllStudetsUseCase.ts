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
    const cached =
      (await this._cache.get<StudentResponseDTO[]>(cacheKeyEnum.STUDENTS)) ??
      [];

    if (cached.length > 1) return cached;

    const students = await this._repo.getAll();
    await this._cache.set(cacheKeyEnum.STUDENTS, students);

    return students;
  }
}
