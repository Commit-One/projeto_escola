import { ICacheService } from "../../../domain/contracts/ICacheService";
import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { StudentResponseDTO } from "../../dtos/student.dto";

export class GetOneStudentUseCase {
  constructor(private readonly _repo: IStudentRepository, private readonly _cache: ICacheService) { }

  async execute(uuid: string): Promise<StudentResponseDTO | null> {
    const cached =
      (await this._cache.get<StudentResponseDTO[]>(cacheKeyEnum.STUDENTS)) ??
      [];
    if (cached.length > 1) return cached.find(c => c.uuid === uuid) ?? null;

    return await this._repo.getOne(uuid)

  }
}
