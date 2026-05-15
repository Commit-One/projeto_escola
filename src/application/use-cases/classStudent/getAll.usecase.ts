import { inject, injectable } from "tsyringe";
import { IRedisService } from "../../../domain/contracts/IRedisService";
import { ClassStudent } from "../../../domain/entities/ClassStudent";
import { IClassStudentRepository } from "../../../domain/repositories/IClassStudentRepository";
import { cacheKeyEnum } from "../../../utils/enum/cacheKey";
import { ContainerEnum } from "../../../utils/enum/container";

@injectable()
export class GetAllClassStudentUseCase {
  constructor(
    @inject(ContainerEnum.CLASS_STUDENT_REPOSITORY)
    private _classRepository: IClassStudentRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(schoolUuid: string): Promise<ClassStudent[] | null> {
    const cachedClass = await this._cache.get<ClassStudent[]>(
      cacheKeyEnum.CLASS,
    );

    if (cachedClass)
      return cachedClass.filter((c) => c.schoolUuid === schoolUuid);

    const classStudents = await this._classRepository.getAll(schoolUuid);
    await this._cache.set(cacheKeyEnum.CLASS, classStudents);
    return classStudents;
  }
}
