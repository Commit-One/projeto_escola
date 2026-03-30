import { Request, Response } from "express";
import { Handler } from "../statusHttp";
import { CreateClassStudentuUseCase } from "../../../application/use-cases/classStudent/create.usecase";
import { GetAllClassStudentUseCase } from "../../../application/use-cases/classStudent/getAll.usecase";
import { GetOneClassStudentUseCase } from "../../../application/use-cases/classStudent/getOne.usecase";
import { UpdateClassStudentUseCase } from "../../../application/use-cases/classStudent/update.usecase";
import { DeleteClassStudentUseCase } from "../../../application/use-cases/classStudent/delete.usecase";
import { injectable } from "tsyringe";

@injectable()
export class ClassStudentController {
  constructor(
    private readonly _create: CreateClassStudentuUseCase,
    private readonly _getAll: GetAllClassStudentUseCase,
    private readonly _getOne: GetOneClassStudentUseCase,
    private readonly _update: UpdateClassStudentUseCase,
    private readonly _delete: DeleteClassStudentUseCase,
  ) {}

  async create(req: any, res: Response) {
    try {
      const { name, maxAge, minAge } = req.body;
      const schoolUuid = req.user.escola.uuid;

      const created = await this._create.execute({
        name,
        maxAge,
        minAge,
        schoolUuid,
      });

      return Handler.created(res, created);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getAll(_: Request, res: Response) {
    try {
      const getAll = await this._getAll.execute();
      return Handler.ok(res, getAll);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }

  async getByUuid(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const getOne = await this._getOne.execute(uuid as string);
      return Handler.ok(res, getOne);
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

  async update(req: any, res: Response) {
    try {
      const { name, maxAge, minAge } = req.body;
      const { uuid } = req.params;
      const schoolUuid = req.user.escola.uuid;
      const updated = await this._update.execute(uuid as string, {
        name,
        maxAge,
        minAge,
        schoolUuid,
      });
      return Handler.ok(res, updated);
    } catch (err: unknown) {
      return Handler.error(res, err);
    }
  }
}
