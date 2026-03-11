import { ICacheService } from "../../../domain/contracts/ICacheService";
import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { StudentDTO, StudentResponseDTO } from "../../dtos/StudentDTO";

export class UpdateStudentUseCase {
  constructor(
    private readonly _repo: IStudentRepository,
    private readonly _cache: ICacheService,
  ) {}

  async execute(uuid: string, data: StudentDTO): Promise<StudentResponseDTO> {
    const updated = await this._repo.update(uuid, data);
    if (updated) await this._cache.delete(cacheKeyEnum.STUDENTS);
    return updated;
  }
}
