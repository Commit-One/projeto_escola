import { IRedisService } from "../../../domain/contracts/IRedisService";
import { IClassPeriodRepository } from "../../../domain/repositories/IClassPeriodRepository";
import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { StudentDTO, StudentResponseDTO } from "../../dtos/student.dto";
import { inject, injectable } from "tsyringe";
import { ContainerEnum } from "../../../utils/enum/container";
import { logger } from "../../../infrastructure/logger";
import { NotFoundError } from "../../../utils/error";

@injectable()
export class CreateStudentUseCase {
  constructor(
    @inject(ContainerEnum.STUDENT_REPOSITORY)
    private readonly _repo: IStudentRepository,

    @inject(ContainerEnum.CLASS_PERIOD_REPOSITORY)
    private readonly _repoClassPeriod: IClassPeriodRepository,

    @inject(ContainerEnum.REDIS_SERVICE)
    private readonly _cache: IRedisService,
  ) {}

  async execute(data: StudentDTO): Promise<StudentResponseDTO | null> {
    const classPeriod = await this._repoClassPeriod.getByClassPeriodUuid(
      data.classUuid,
      data.periodUuid,
    );

    if (!classPeriod) {
      logger.error({ message: "Regra não encontrada" });
      throw new NotFoundError("Regra");
    }

    const student = await this._repo.create(data);
    if (!student) {
      logger.error({ message: "Erro ao criar estudante" });
      return null;
    }

    logger.info({
      message: "Estudante criado com sucesso",
      studentUuid: student.uuid,
    });

    return student;
  }
}
