import { ICacheService } from "../../../domain/contracts/ICacheService";
import { ClassStudent } from "../../../domain/entities/ClassStudent";
import { IClassStudentRepository } from "../../../domain/repositories/IClassStudentRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ClassIStudentDTO } from "../../dtos/classStudent.dto";

export class UpdateClassStudentUseCase {
  constructor(
    private _classRepository: IClassStudentRepository,
    private readonly _cache: ICacheService,
  ) {}

  async execute(uuid: string, data: ClassIStudentDTO): Promise<ClassStudent> {
    const classStudent = await this._classRepository.update(uuid, data);
    if (classStudent) await this._cache.delete(cacheKeyEnum.CLASS);
    return classStudent;
  }
}
