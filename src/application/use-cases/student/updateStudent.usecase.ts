import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { StudentDTO, StudentResponseDTO } from "../../dtos/student.dto";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class UpdateStudentUseCase {
  constructor(
    @inject(ContainerEnum.STUDENT_REPOSITORY)
    private readonly _repo: IStudentRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(uuid: string, data: StudentDTO): Promise<StudentResponseDTO> {
    const updated = await this._repo.update(uuid, data);
    if (updated) await this._cache.delete(cacheKeyEnum.STUDENTS);
    return updated;
  }
}
