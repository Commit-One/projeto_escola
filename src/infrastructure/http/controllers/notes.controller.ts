import { Request, Response } from "express";
import { Handler } from "../statusHttp";
import { injectable } from "tsyringe";
import { CreateNotesUseCase } from "../../../application/use-cases/notes/create.usecase";
import { GetAllNotesUseCase } from "../../../application/use-cases/notes/getAll.usecase";
import { GetOneNotesUseCase } from "../../../application/use-cases/notes/getOne.usecase";
import { DeleteNotesUseCase } from "../../../application/use-cases/notes/delete.usecase";
import { UpdateNotesUseCase } from "../../../application/use-cases/notes/update.usecase";
import { NotesDTO } from "../../../application/dtos/notes.dto";
import { CreateGradeReportByStudentUuidUseCase } from "../../../application/use-cases/notes/createGradeReportByStudentUuid.usecase";

@injectable()
export class NotesController {
  constructor(
    private readonly _create: CreateNotesUseCase,
    private readonly _getAll: GetAllNotesUseCase,
    private readonly _getOne: GetOneNotesUseCase,
    private readonly _delete: DeleteNotesUseCase,
    private readonly _update: UpdateNotesUseCase,
    private readonly _gradeByStudent: CreateGradeReportByStudentUuidUseCase,
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
      const {
        classUuid,
        disciplineUuid,
        note,
        schoolUuid,
        studentUuid,
        periodUuid,
        academiccycleUuid,
      } = req.body;

      const data: NotesDTO = {
        classUuid,
        disciplineUuid,
        note,
        academiccycleUuid,
        schoolUuid,
        periodUuid,
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

  async createGradeByStudentUuid(req: Request, res: Response) {
    try {
      const { studentUuid } = req.params;
      const deleted = await this._gradeByStudent.execute(studentUuid as string);
      return Handler.ok(res, deleted);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { uuid } = req.params;

      const {
        classUuid,
        disciplineUuid,
        note,
        schoolUuid,
        studentUuid,
        periodUuid,
        academiccycleUuid,
      } = req.body;

      const data: NotesDTO = {
        classUuid,
        periodUuid,
        disciplineUuid,
        academiccycleUuid,
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
