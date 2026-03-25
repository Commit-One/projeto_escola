import { Request, Response } from "express";
import { Handler } from "../statusHttp";
import { injectable } from "tsyringe";
import { CreateStudentDisciplineUseCase } from "../../../application/use-cases/studentDiscipline/create.usecase";
import { GetAllStudentDisciplineUseCase } from "../../../application/use-cases/studentDiscipline/getAll.usecase";
import { GetOneStudentDisciplineUseCase } from "../../../application/use-cases/studentDiscipline/getOne.usecase";
import { DeleteStudentDisciplineUseCase } from "../../../application/use-cases/studentDiscipline/delete.usecase";
import { UpdateStudentDisciplineUseCase } from "../../../application/use-cases/studentDiscipline/update.usecase";
import { StudentDisciplineDTO } from "../../../application/dtos/studentDiscipline.dto";

@injectable()
export class StudentDisciplineController {
  constructor(
    private readonly _create: CreateStudentDisciplineUseCase,
    private readonly _getAll: GetAllStudentDisciplineUseCase,
    private readonly _getOne: GetOneStudentDisciplineUseCase,
    private readonly _delete: DeleteStudentDisciplineUseCase,
    private readonly _update: UpdateStudentDisciplineUseCase,
  ) {}

  async getAll(_: Request, res: Response) {
    try {
      const list = await this._getAll.execute();
      return Handler.ok(res, list);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { classUuid, disciplineUuid, note, schoolUuid, studentUuid } =
        req.body;

      const data: StudentDisciplineDTO = {
        classUuid,
        disciplineUuid,
        note,
        schoolUuid,
        studentUuid,
      };

      const created = await this._create.execute(data);
      return Handler.created(res, created);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const displine = await this._getOne.execute(uuid as string);
      return Handler.ok(res, displine);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const deleted = await this._delete.execute(uuid as string);
      return Handler.ok(res, deleted);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { uuid } = req.params;

      const { classUuid, disciplineUuid, note, schoolUuid, studentUuid } =
        req.body;

      const data: StudentDisciplineDTO = {
        classUuid,
        disciplineUuid,
        note,
        schoolUuid,
        studentUuid,
      };

      const updated = await this._update.execute(uuid as string, data);
      return Handler.ok(res, updated);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }
}
