import { inject, injectable } from "tsyringe";
import { IStudentRepository } from "../../../domain/repositories/IStudentRepository";
import { ContainerEnum } from "../../../utils/enum/container";
import { logger } from "../../../infrastructure/logger";
import { StatisticsStudentByStatusDTO } from "../../dtos/student.dto";

@injectable()
export class GetStatisticsUsecase {
  constructor(
    @inject(ContainerEnum.STUDENT_REPOSITORY)
    private readonly _repo: IStudentRepository,
  ) {}

  async execute(schoolUuid: string): Promise<StatisticsStudentByStatusDTO> {
    const getData = await this._repo.statistics(schoolUuid);

    logger.info({
      message: "Status do aluno atualizado com sucesso",
      schoolId: schoolUuid,
    });

    return getData;
  }
}
