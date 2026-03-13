import { ICacheService } from "../../../domain/contracts/ICacheService";
import { ClassStudent } from "../../../domain/entities/ClassStudent";
import { IClassStudentRepository } from "../../../domain/repositories/IClassStudentRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ClassIStudentDTO } from "../../dtos/classStudent.dto";

export class CreateClassStudentuUseCase {
  constructor(
    private _classRepository: IClassStudentRepository,
    private readonly _cache: ICacheService,
  ) {}

  async execute(data: ClassIStudentDTO): Promise<ClassStudent> {
    const created = await this._classRepository.create(data);
    await this._cache.delete(cacheKeyEnum.CLASS);
    return created;
  }
}
