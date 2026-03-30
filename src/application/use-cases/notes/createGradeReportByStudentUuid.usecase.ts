import { inject, injectable } from "tsyringe";
import { ContainerEnum } from "../../../utils/enum/container";
import { INotesRepository } from "../../../domain/repositories/INotesRepository";
import { GradeReporResponseDTO } from "../../dtos/gradeReport.dto";

@injectable()
export class CreateGradeReportByStudentUuidUseCase {
  constructor(
    @inject(ContainerEnum.NOTES_REPOSITORY)
    private _repo: INotesRepository,
  ) {}

  async execute(studentUuid: string): Promise<GradeReporResponseDTO | null> {
    const grade = await this._repo.gradeReport(studentUuid);
    return grade;
  }
}
