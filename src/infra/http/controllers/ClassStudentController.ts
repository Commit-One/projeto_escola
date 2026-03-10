import { Request, Response } from "express";
import { handler } from "../statusHttp";
import { CreateClassStudentuUseCase } from "../../../application/use-cases/classStudent/CreateClassStudentUseCase";
import { GetAllClassStudentUseCase } from "../../../application/use-cases/classStudent/GetAllClassStudentUseCase";
import { GetOneClassStudentUseCase } from "../../../application/use-cases/classStudent/GetOneClassStudentUseCase";
import { UpdateClassStudentUseCase } from "../../../application/use-cases/classStudent/UpdateClassStudentUseCase";
import { DeleteClassStudentUseCase } from "../../../application/use-cases/classStudent/DeleteClassStudentUseCase";

export class ClassStudentController {
  constructor(
    private readonly _create: CreateClassStudentuUseCase,
    private readonly _getAll: GetAllClassStudentUseCase,
    private readonly _getOne: GetOneClassStudentUseCase,
    private readonly _update: UpdateClassStudentUseCase,
    private readonly _delete: DeleteClassStudentUseCase,
  ) {}

  async create(req: Request, res: Response) {
    try {
      const { name, maxAge, minAge } = req.body;
      const created = await this._create.execute({ name, maxAge, minAge });
      return handler.created(res, created);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async getAll(_: Request, res: Response) {
    try {
      const getAll = await this._getAll.execute();
      return handler.ok(res, getAll);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async geByUuid(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const getOne = await this._getOne.execute(uuid as string);
      return handler.ok(res, getOne);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const deleted = await this._delete.execute(uuid as string);
      return handler.ok(res, deleted);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { name, maxAge, minAge } = req.body;
      const { uuid } = req.params;
      const updated = await this._update.execute(uuid as string, {
        name,
        maxAge,
        minAge,
      });
      return handler.ok(res, updated);
    } catch (err: unknown) {
      return handler.error(res, err);
    }
  }
}
